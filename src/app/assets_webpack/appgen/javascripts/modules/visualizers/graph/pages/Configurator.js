import React, { Component, PropTypes } from 'react'
import BodyPadding from '../../../../components/BodyPadding'
import { Application } from '../../../app/models'
import { Visualizer } from '../../../core/models'
import GraphLoader from '../containers/GraphLoader'
import EditableLabel from '../../../app/containers/EditableLabel'
import SaveButton from '../containers/SaveButton'
import { getConfiguration, getConfigurationReset } from '../ducks/configuration'

class Configurator extends Component {
  static propTypes = {
    application: PropTypes.instanceOf(Application).isRequired,
    visualizer: PropTypes.instanceOf(Visualizer).isRequired
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
    const { application, visualizer } = this.props;
    return (
      <BodyPadding>
        <h3><EditableLabel uri="http://example.org/graph" label="Unnamed graph" /></h3>
        <p>This is the graph visualizer configurator.</p>
        <p>{application.name}</p>
        <p>{visualizer.title}</p>
        <GraphLoader />
        <SaveButton />
      </BodyPadding>
    )
  }
}

export default Configurator;
