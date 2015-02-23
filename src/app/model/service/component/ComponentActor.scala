package model.service.component

import akka.actor.{Actor, ActorRef, Props}
import play.api.libs.concurrent.Akka

import play.api.Play.current
import scala.collection.mutable.ArrayBuffer
import scala.concurrent.ExecutionContext.Implicits.global
import model.service.Connected

case class RequestBinding(remoteActor: ActorRef, bindingMessage: BindMessage)

case class BindMessage(portUri: String)

case class DataReference(portUri: String, endpointUri: String, graphUri: Option[String])

case class Failure(reason: String)

case class Run()

object ComponentActor {
  def props(component: InternalComponent, reporterProps: Props) = Props(new ComponentActor(component, reporterProps))
}

class ComponentActor(component: InternalComponent, reporterProps: Props) extends Actor with Connected {

  private val outgoingBindings = new ArrayBuffer[(ActorRef, String)]()
  private val expectedDataRefSenders = new ArrayBuffer[ActorRef]()
  private val dataReferencesBySender = new ArrayBuffer[(ActorRef, DataReference)]
  private val allInputUris = withSession { implicit session => component.componentInstance.inputInstances.map(_.dataPortInstance.uri).distinct }
  private val logger = Akka.system.actorOf(reporterProps)

  def setResponse(sender: ActorRef, dataRef: DataReference) = dataReferencesBySender.append((sender, dataRef))

  def receive = {
    case requestBinding: RequestBinding => {
      expectedDataRefSenders.append(requestBinding.remoteActor)
      requestBinding.remoteActor ! requestBinding.bindingMessage
    }
    case bind: BindMessage => {
      logger ! component.componentInstance.stringDescription + " bound to " + bind.portUri + " for " + sender().toString()
      saveBinding((sender(), bind.portUri))
    }
    case dataReference: DataReference => {
      logger ! component.componentInstance.stringDescription + " got dataRef " + dataReference
      setResponse(sender(), dataReference)

      val coveredInputUris = dataReferencesBySender.map { case (_, DataReference(portUri, _, _)) => portUri }.distinct
      val canExecute = (coveredInputUris == allInputUris) && (expectedDataRefSenders.isEmpty || (dataReferencesBySender.map(_._1).toSeq == expectedDataRefSenders.toSeq))
      if (canExecute) {
        if(component.isVisualizer){
          logger ! "==== DONE ===="
        }else{
          val eventualDataReference = component.evaluate(dataReferencesBySender.map(_._2).toSeq)

          eventualDataReference.onSuccess{ case (endpoint, graph) =>
            outgoingBindings.map { case (acceptor, port) =>
              acceptor ! DataReference(port, endpoint, graph)
            }
          }

          eventualDataReference.onFailure { case t =>
            self ! Failure("Component instance with ID " + component.componentInstance.id.map(_.toString).get + " has failed (" + t.getMessage + ").")
          }
        }
      }
    }
    case run: Run => {
      logger ! component.componentInstance.stringDescription + " got Run message "
      if(component.isDataSource){
        val maybeDsConfig = component.dataSourceConfiguration
        maybeDsConfig.map { dsConfig =>
          outgoingBindings.map { case (acceptor, port) =>
            logger ! "Sending dr from " + self
            acceptor ! DataReference(port, dsConfig._1, dsConfig._2)
          }
        }
      }
    }
    case failure: Failure => {
      outgoingBindings.map { case (acceptor, port) =>
        acceptor ! failure
      }
    }
  }

  def saveBinding(binding: (ActorRef, String)) = outgoingBindings.append(binding)
}