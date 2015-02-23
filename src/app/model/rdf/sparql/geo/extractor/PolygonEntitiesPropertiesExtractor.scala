package model.rdf.sparql.geo.extractor

import com.hp.hpl.jena.query.QuerySolution
import com.hp.hpl.jena.rdf.model.{Literal, Resource}
import model.rdf.Property
import model.rdf.extractor.SimpleQueryExecutionResultExtractor
import model.rdf.sparql.geo.query.PolygonEntitiesPropertiesQuery


class PolygonEntitiesPropertiesExtractor extends SimpleQueryExecutionResultExtractor[PolygonEntitiesPropertiesQuery, Property] {

  override def getPropertyVariableName: String = PolygonEntitiesPropertiesQuery.NodeVariables.VALUE_PROPERTY_VARIABLE.toString

  override def withResourceSolution(resource: Resource, qs: QuerySolution): Option[Property] = {
    val label = getLabel(qs, PolygonEntitiesPropertiesQuery.LabelVariables)
    Some(new Property(label, Some(resource.getURI)))
  }

  override def withLiteralSolution(literal: Literal): Option[Property] = {
    Some(new Property(Some(localizedLabel(literal)), None))
  }
}