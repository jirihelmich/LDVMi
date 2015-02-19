package controllers

import play.api.mvc._
import scaldi.{Injectable, Injector}

class VisualizationController(implicit inj: Injector) extends Controller with Injectable {

  def index() = Action {
    Ok(views.html.angular.visualizations())
  }

}