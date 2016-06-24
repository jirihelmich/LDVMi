import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getGraph, getGraphReset, graphSelector, graphStatusSelector } from '../ducks/graph'
import PromiseResult from '../../../core/components/PromiseResult'
import { PromiseStatus } from '../../../core/models'
import { Graph } from '../models'

class GraphLoader extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    graph: PropTypes.instanceOf(Graph).isRequired,
    status: PropTypes.instanceOf(PromiseStatus).isRequired
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getGraph());
  }
  
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(getGraphReset());
  }

  render() {
    const { graph, status } = this.props;

    if (!status.done) {
      return <PromiseResult status={status} loadingMessage="Loading base graph info..." />
    }

    return (
      <div>
        <p><strong>Graph info</strong></p>
        <p>Node count: {graph.nodeCount}</p>
        <p>Edge count: {graph.edgeCount}</p>
        <p>Directed: {graph.directed ? 'yes' : 'no'}</p>
      </div>
    )
  }
}

const selector = createStructuredSelector({
  graph: graphSelector,
  status: graphStatusSelector
});

export default connect(selector)(GraphLoader);
