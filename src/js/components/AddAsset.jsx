var React = require('react');
var ReactTypeahead = require('../../../node_modules/react-typeahead/src/react-typeahead');
var Icon = require('./Icon.jsx');
var TeamActions = require('../actions/TeamActions');
var _ = require('lodash');

var AddAsset = React.createClass({
  getInitialState: function() {
    return {
      isOpen: false,
      assetName: ''
    }
  },
  handleOpen: function() {
    this.setState({isOpen: true});
  },
  handleClose: function() {
    this.setState({isOpen: false});
  },
  handleAdd: function( e ) {
    if (this.state.assetName.length < 3) {
      return;
    }
    TeamActions.addAsset({
      id: this.props.teamName,
      resourceName: this.props.resourceName,
      assetData: {new: this.state.assetName}
    });
    this.setState({isOpen: false});
  },
  onKeyDown: function( e ) {
    if (e.key === 'Enter') {
      this.handleAdd();
    }
  },
  onChange: function( e ) {
    this.state.assetName = e.target.value;
    this.setState(this.state);
  },
  render: function() {
    if (this.state.isOpen) {
      return (
        <span className="add-item">
          <input type="text" ref="input" onChange={this.onChange} placeholder="Asset name" onKeyDown={this.onKeyDown} />
          <Icon ref="plus-icon" type={['plus', 'action']} className="cf-form_input-icon" disabled={this.state.assetName.length < 3} title="Add new asset" onClick={this.handleAdd} />
          <Icon ref="minus-icon" type={['delete', 'action']} className="cf-form_input-icon" title="Cancel" onClick={this.handleClose} />
        </span>
      );
    } else {
      return (
        <span className="add-item">
          <span>{this.props.isAddingAsset + '' }</span>
          <Icon ref="plus-icon" type={['plus', 'action']} title="Add new asset" onClick={this.handleOpen} />
        </span>
      )
    }
  }
});

module.exports = AddAsset;
