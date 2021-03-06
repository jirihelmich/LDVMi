package controllers.appgen.api.visualizers

import controllers.api.JsonImplicits._
import model.rdf.sparql.visualization.VisualizationService
import model.appgen.entity.ApplicationId
import model.appgen.rest.GetLabelsRequest.GetLabelsRequest
import model.appgen.rest.Response._
import scaldi.Injector
import play.api.libs.concurrent.Execution.Implicits._
import scala.concurrent.Future

class CommonVisualizerApiController(implicit inj: Injector) extends VisualizerApiController {
  val visualizationService = inject[VisualizationService]

  def getLabels(id: Long) = RestAsyncAction[GetLabelsRequest] { implicit request => json =>
    withEvaluation(ApplicationId(id)) { evaluation =>
      val labels = json.resourceUris.map(uri => {
        // First try to get the label from pipeline output and if that fails
        // try standard dereferencing. We're using this crazy construct to get 'None's for
        // empty localized values (they will translate in nulls on the client).
        val label = visualizationService
          .getLabels(evaluation, uri)
          .flatMap(l => if (l.size == 0) visualizationService.getLabels(uri) else Some(l))
          .flatMap(l => if (l.size == 0) None else Some(l))

        (uri, label)
      }).toMap
      Future(Ok(SuccessResponse(data = Seq("labels" -> labels))))
    }
  }
}
