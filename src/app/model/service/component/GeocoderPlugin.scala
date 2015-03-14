package model.service.component

import java.util.UUID

import akka.actor.Props
import model.entity.ComponentInstance
import model.rdf.sparql.GenericSparqlEndpoint
import play.api.Play.current
import play.api.libs.concurrent.Akka

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.collection.JavaConversions._

class GeocoderPlugin(internalComponent: InternalComponent) extends AnalyzerPlugin {
  override def run(dataReferences: Seq[DataReference], reporterProps: Props): Future[(String, Option[String])] = {
    val endpointUrl = "http://live.payola.cz:8890/sparql"
    val resultGraph = "urn:" + UUID.randomUUID().toString

    val reporter = Akka.system.actorOf(reporterProps)
    reporter ! "Running GEO-coder"

    Future {

      val referencesByPortUris = dataReferencesByPortTemplateUri(dataReferences)
      val datasetRef = referencesByPortUris("http://ldvm.opendata.cz/resource/template/analyzer/ruian/geocoder/input/dataset")
      val geoRef = referencesByPortUris("http://ldvm.opendata.cz/resource/template/analyzer/ruian/geocoder/input/ruian")

      if(datasetRef.isDefined && geoRef.isDefined){
        try {

        val geoQueryPattern =
          """
            |prefix xsd:	<http://www.w3.org/2001/XMLSchema#>
            |		prefix rdf:	<http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            |		prefix skos:	<http://www.w3.org/2004/02/skos/core#>
            |		prefix s:	<http://schema.org/>
            |		prefix ogcgml:	<http://www.opengis.net/ont/gml#>
            |		prefix ruian:	<http://ruian.linked.opendata.cz/ontology/>
            |		CONSTRUCT {
            |		  <%o%>	ruian:definicniBod	?definicniBod .
            |
            |
            |		  ?definicniBod	rdf:type	ogcgml:MultiPoint ;
            |			  ogcgml:pointMember	?pointMember .
            |
            |		  ?pointMember rdf:type	ogcgml:Point ;
            |			  s:geo ?geo .
            |		  ?geo	rdf:type	s:GeoCoordinates ;
            |			  s:longitude	?lng ;
            |			  s:latitude	?lat .
            |		} WHERE {
            |		  <%o%>	ruian:definicniBod	?definicniBod .
            |
            |
            |		  ?definicniBod	rdf:type	ogcgml:MultiPoint ;
            |			  ogcgml:pointMember	?pointMember .
            |
            |		  ?pointMember rdf:type	ogcgml:Point ;
            |			  s:geo ?geo .
            |		  ?geo	rdf:type	s:GeoCoordinates ;
            |			  s:longitude	?lng ;
            |			  s:latitude	?lat .
            |		}
          """.stripMargin
        val geoEndpoint = new GenericSparqlEndpoint(geoRef.get.endpointUri, geoRef.get.graphUri.toSeq, List())

        val dataQuery = "CONSTRUCT { ?s ?p ?o } WHERE { ?s ?p ?o }"
        val dataEndpoint = new GenericSparqlEndpoint(datasetRef.get.endpointUri, datasetRef.get.graphUri.toSeq, List())
        val dataModel = dataEndpoint.queryExecutionFactory()(dataQuery).execConstruct()

        // for each entity from model having geolink, add another data
        val p = dataModel.getProperty("http://ruian.linked.opendata.cz/ontology/links/obec")
        val entities = dataModel.listObjectsOfProperty(p).toList
        entities.foreach { e =>
          val q = geoQueryPattern.replaceAll("%o%",e.asResource().getURI)
          val model = geoEndpoint.queryExecutionFactory()(q).execConstruct()

          dataModel.add(model)
        }


        pushToTripleStore(dataModel, endpointUrl, resultGraph)(reporterProps)
      } catch {
        case e: org.apache.jena.atlas.web.HttpException => {
          println(e.getResponse)
        }
        case e: Throwable => {
          println(e)
        }
      }
      }

      (endpointUrl, Some(resultGraph))
    }
  }

  override def componentInstance: ComponentInstance = internalComponent.componentInstance
}