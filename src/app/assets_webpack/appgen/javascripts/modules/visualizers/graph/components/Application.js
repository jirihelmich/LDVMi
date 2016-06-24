import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import BodyPadding from '../../../../components/BodyPadding'
import { Application as ApplicationModel } from '../../../app/models'
import { Visualizer } from '../../../core/models'
import GraphLoader from '../containers/GraphLoader'
import EditableLabel from '../../../app/containers/EditableLabel'
import { getConfiguration, getConfigurationReset } from '../ducks/configuration'

class Application extends Component {
  static propTypes = {
    application: PropTypes.instanceOf(ApplicationModel).isRequired,
    visualizer: PropTypes.instanceOf(Visualizer).isRequired,
    embed: PropTypes.bool
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getConfiguration());
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(getConfigurationReset());
  }

  render() {
    const { application, visualizer, embed } = this.props;
    return (
      <BodyPadding>
        <h3><EditableLabel uri="http://example.org/graph" label="Unnamed graph" /></h3>
        <p>This is the graph visualizer application.</p>
        <p>It runs in {embed ? 'embed' : 'standalone'} mode</p>
        <p>{application.name}</p>
        <p>{visualizer.title}</p>
        <GraphLoader />
      </BodyPadding>
    )
  }
}

export default connect()(Application);
