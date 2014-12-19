/** @jsx React.DOM */
var React = require('react'),
    ButtonGroup = require('react-bootstrap/ButtonGroup'),
    Button = require('react-bootstrap/Button'),
    Modal = require('react-bootstrap/Modal'),
    ModalTrigger = require('react-bootstrap/ModalTrigger'),
    Input = require('react-bootstrap/Input');

var Add = React.createClass({
  getInitialState : function() {
    return (
      { 
        nameValue : "",
        initValue : 0,
        hpValue : 0
      }
    );
  },
  handleNameChange : function(e) {
    this.setState({ nameValue : e.target.value });
  },
  handleInitChange : function(e) {
    this.setState({ initValue: e.target.value });
  },
  handleHpChange : function(e) {
    this.setState({ hpValue : e.target.value });
  },
  onAdd : function() {

    // let parent know about change
    this.props.onAdd({
      name : this.state.nameValue,
      initiative : parseInt(this.state.initValue, 10) || 0,
      hp : this.state.hpValue
    });

    // close this modal
    this.props.onRequestHide();
  },
  render : function() {
    return (
        <Modal {...this.props} title="Add to Initiative Order" >
          <div className="modal-body">
            <Input 
              value={this.state.nameValue}
              addonBefore="Name"
              type="text"
              onChange={this.handleNameChange}
            />

            <Input 
              value={(this.state.initValue === 0)?"":this.state.initValue}
              addonBefore="Init"
              type="text"
              onChange={this.handleInitChange}
            />

            <Input
              value={(this.state.hpValue === 0)?"":this.state.hpValue}
              addonBefore="HP "
              type="text"
              onChange={this.handleHpChange}
            />

          </div>
          <div className="modal-footer">
            <Button onClick={this.props.onRequestHide}>Cancel</Button>
            <Button onClick={this.onAdd} bsStyle="primary">Add</Button>
          </div>
        </Modal>
    );
  }
});


var Menu = React.createClass({
  displayName: 'Menu',
  getInitialState : function() {
    return ({ activated : false });
  },
  handleAdd : function(data) {
    //console.log("got data", data);

    // pass up data to content
    this.props.onAdd(data);
  },
  handleStart : function(e) {
    if (!this.state.activated) {
      this.setState({ activated : true });
      this.props.start();
    }
    else {
      this.props.next();
    }
  },
  handleClear : function() {
    this.setState({ activated : false });
    this.props.onClear();
  },
  render: function () {
    return (
      <ButtonGroup className="fixed" justified={true}>
        <ModalTrigger modal={ <Add onAdd={this.handleAdd} />}>
          <ButtonGroup>
            <Button bsSize="large" bsStyle="primary">Add</Button>
          </ButtonGroup>
        </ModalTrigger>
        <ButtonGroup>
          <Button onClick={this.handleStart} disabled={(this.props.num !== 0) ? false : true} bsSize="large" bsStyle="success">{(this.state.activated) ? "Next" : "Start" }</Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button onClick={this.handleClear} disabled={(this.props.num !== 0) ? false : true} bsSize="large" bsStyle="danger">Clear</Button>
        </ButtonGroup>
      </ButtonGroup>
    );
  }
});

module.exports = Menu;