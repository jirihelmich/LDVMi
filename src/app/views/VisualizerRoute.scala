package views

import model.entity.PipelineEvaluationId

object VisualizerRoute {

  def route(visualizerTemplateUri: String, evaluationId: PipelineEvaluationId) : String = {


    println(visualizerTemplateUri)

    val pattern = visualizerTemplateUri match {
      case "http://linked.opendata.cz/resource/ldvm/visualizer/treemap/TreemapVisualizerTemplate" => "/visualize/treemap/%ei"
      case "http://linked.opendata.cz/resource/ldvm/visualizer/gmaps/PolygonMapsVisualizerTemplate" => "/visualize/map#/id/%ei"
      case "http://linked.opendata.cz/resource/ldvm/visualizer/gmaps/GoogleMapsVisualizerTemplate" => "/visualize/map#/markers/%ei"
      case "http://linked.opendata.cz/resource/ldvm/visualizer/data-cube-simple/DataCubeVisualizerTemplate" => "/visualize/datacube#/id/%ei"
      case _ => "/404"
    }

    pattern.replace("%ei", evaluationId.id.toString)

  }
  
}
