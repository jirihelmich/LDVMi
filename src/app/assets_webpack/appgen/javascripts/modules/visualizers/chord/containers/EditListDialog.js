import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/lib/text-field'
import Button from '../../../../components/Button'
import IconButton from '../../../../components/IconButton'
import Dialog from '../../../core/containers/Dialog'
import { dialogOpen, dialogClose } from '../../../core/ducks/dialog'
import prefix from '../prefix'
import { NodeList } from '../models'

export const dialogName = prefix('EDIT_LIST_DIALOG');

class EditListDialog extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    list: PropTypes.instanceOf(NodeList).isRequired,
    updateList: PropTypes.func.isRequired
  };

  save() {
    const { dispatch, list, updateList } = this.props;
    updateList(list.id, { name: this.refs.name.getValue() });
    dispatch(dialogClose(dialogName));
  }

  render() {
    const { dispatch, list } = this.props;

    const actions = [
      <Button label="Cancel" onTouchTap={() => dispatch(dialogClose(dialogName))} />,
      <Button label="Save" success raised icon="done" onTouchTap={this.save.bind(this)} />
    ];
    
    return (
      <span>
        <IconButton icon='edit'
          iconStyle={{ color: 'white '}}
          onTouchTap={() => dispatch(dialogOpen(dialogName))} />
        <Dialog name={dialogName} title="Edit list" actions={actions}>
          <TextField
            ref="name"
            floatingLabelText="Name of the list"
            defaultValue={list.name}
            fullWidth
          />
        </Dialog>
      </span>
    );
  }
}

export default connect()(EditListDialog);