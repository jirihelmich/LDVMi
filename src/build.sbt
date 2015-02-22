import play.PlayScala

name := """payola-viz"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.1"

resolvers ++= Seq(
  Resolver.sonatypeRepo("releases"),
  Resolver.sonatypeRepo("snapshots")
)

libraryDependencies ++= Seq(
  jdbc,
  anorm,
  cache,
  ws,
  filters,
  "com.typesafe.slick" %% "slick" % "2.1.0",
  "org.webjars" %% "webjars-play" % "2.3.0-1",
  "org.webjars" % "angularjs" % "1.2.24",
  "org.webjars" % "bootstrap" % "3.2.0",
  "org.webjars" % "requirejs-domready" % "2.0.1-2",
  "org.webjars" % "angular-ui" % "0.4.0-3",
  "org.webjars" % "angular-ui-bootstrap" % "0.11.0-2",
  "org.webjars" % "angular-loading-bar" % "0.5.1",
  "org.webjars" % "underscorejs" % "1.6.0-3",
  "org.webjars" % "highcharts" % "4.0.3",
  "org.webjars" % "highcharts-ng" % "0.0.6",
  "org.webjars" % "ng-table" % "0.3.3",
  "org.webjars" % "jquery" % "2.1.1",
  "org.webjars" % "angular-moment" % "0.8.2",
  "org.webjars" % "momentjs" % "2.8.3",
  "org.webjars" % "when-node" % "3.5.2-3",
  "org.webjars" % "react" % "0.12.2",
  "org.webjars" % "react-bootstrap" % "0.13.2",
  "org.webjars" % "react-router" % "0.11.6",
  "org.webjars" % "Rest" % "1.2.0",
  "org.webjars" % "jsx-requirejs-plugin" % "0.5.1",
  "org.scalaj" %% "scalaj-http" % "0.3.16",
  "org.scaldi" % "scaldi-play_2.11" % "0.4.1",
  "org.apache.jena" % "jena" % "2.12.0",
  "org.apache.jena" % "jena-arq" % "2.12.0",
  "com.typesafe.play" %% "play-slick" % "0.8.0",
  "com.newrelic.agent.java" % "newrelic-api" % "3.8.1",
  "joda-time" % "joda-time" % "2.4",
  "org.joda" % "joda-convert" % "1.6",
  "com.github.tototoshi" %% "slick-joda-mapper" % "1.2.0",
  "com.vividsolutions" % "jts" % "1.8",
  "org.webjars" % "openlayers" % "3.0.0",
  "org.webjars" % "webjars-locator" % "0.21",
  "org.webjars" % "requirejs-plugins" % "3ff54566f8",
  "org.webjars" % "lodash" % "3.1.0"
)

JsEngineKeys.engineType := JsEngineKeys.EngineType.Node

//pipelineStages := Seq(rjs, digest, gzip)
