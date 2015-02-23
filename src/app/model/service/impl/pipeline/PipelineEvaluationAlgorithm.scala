package model.service.impl.pipeline

import akka.actor.Props
import model.entity._
import model.service.Connected
import model.service.component.{InternalComponent, Run}
import play.api.Play.current
import play.api.db.slick._
import play.api.libs.concurrent.Akka
import scaldi.Injectable


class PipelineEvaluationAlgorithm(evaluation: PipelineEvaluation, reporterProps: Props)
  (implicit val session: Session) extends Connected with Injectable {

  val logger = Akka.system.actorOf(reporterProps)
  logger ! evaluation.uuid.toString

  def run(bindingSet: DataPortBindingSet) {

    val recursivePipelineData = recursivePipeline(bindingSet, 0)

    val instancesById = recursivePipelineData._2.toMap
    val bindings = recursivePipelineData._1

    instancesById.map(i => println(i._1))

    bindings.map { binding =>
      val sourceInstanceId = binding.source.componentInstanceId
      val targetInstanceId = binding.target.componentInstanceId

      println(sourceInstanceId, targetInstanceId)

      instancesById.get(targetInstanceId).map { case (targetInstance, targetHasOutput, _) =>
        println("target OK")
        instancesById.get(sourceInstanceId).map { case (sourceInstance, sourceHasOutput, _) =>
          println("source OK")
          targetInstance.requestDataFrom(sourceInstance, binding.targetId)
        }
      }
    }

    instancesById.map { case (_, (c, _, hasInput)) =>
      if (!hasInput) {
        c.actor ! Run()
      }
    }
  }

  private def recursivePipeline(bindingSet: DataPortBindingSet, level: Integer): (Seq[DataPortBinding], Seq[(ComponentInstanceId, (InternalComponent, Boolean, Boolean))]) = {

    println("original: ")
    println(bindingSet.bindings.map(_.source.componentInstance.id.get))
    println(bindingSet.bindings.map(_.target.componentInstance.id.get))


    if (level > 100) {
      (Seq(), Seq())
    } else {

      val componentInstances = bindingSet.componentInstances

      val recursiveData = componentInstances.map { componentInstance =>

        val componentTemplate = componentInstance.componentTemplate
        val maybeNestedBindingSet = componentTemplate.nestedBindingSet

        maybeNestedBindingSet.map { nbs =>
          val nested = recursivePipeline(nbs, level + 1)

          val fixedBindings = nbs.nestedBindings.map { nestedBinding =>
            val sourcesId = nestedBinding.sourceInstance.map(i => Seq(i.id.get)).getOrElse {
              val portTemplateUri = nestedBinding.sourceTemplate.get.uri
              val portInstance = componentInstance.inputInstances.map(_.dataPortInstance).find(_.dataPortTemplate.uri == portTemplateUri)
              bindingSet.bindings.filter(_.targetId == portInstance.get.id.get).map(_.sourceId)
            }

            val targetIds = nestedBinding.targetInstance.map(i => Seq(i.id.get)).getOrElse {
              val nestedOutputPortInstanceId = componentInstance.outputInstance.get.dataPortInstance.id.get
              bindingSet.bindings.filter(_.sourceId == nestedOutputPortInstanceId).map(_.targetId)
            }

            sourcesId.flatMap { si =>
              targetIds.map { ti =>
                DataPortBinding(None, bindingSet.id.get, si, ti)
              }
            }
          }

          (nested._1 ++ fixedBindings.flatten, nested._2)
        }.getOrElse {

          (
            Seq(),
            Seq((
              componentInstance.id.get,
              (InternalComponent(componentInstance, reporterProps), componentInstance.hasOutput, componentInstance.hasInput)
              ))
            )

        }
      }

      (
        bindingSet.bindings ++ recursiveData.flatMap(_._1),
        recursiveData.flatMap(_._2)
        )
    }
  }

}