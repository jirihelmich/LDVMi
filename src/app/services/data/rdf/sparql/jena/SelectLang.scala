package services.data.rdf.sparql.jena

class SelectLang extends SparqlResultLang {
  override def acceptType: String = "application/sparql-results+xml"
}