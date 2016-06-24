import rest from '../../../misc/rest'

export async function getGraph(id) {
  const result = await rest('chordVisualizer/getGraph/' + id, {});
  return result.data.graph;
}
