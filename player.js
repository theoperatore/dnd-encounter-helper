var React = require('react'),
    ListGroupItem = require('react-bootstrap/ListGroupItem'),
    Input = require('react-bootstrap/Input'),
    ProgressBar = require('react-bootstrap/ProgressBar'),
    Label = require('react-bootstrap/Label'),
    Glyphicon = require('react-bootstrap/Glyphicon'),
    Button = require('react-bootstrap/Button'),
    ButtonGroup = require('react-bootstrap/ButtonGroup'),
    Modal = require('react-bootstrap/Modal'),
    OverlayMixin = require('react-bootstrap/OverlayMixin');


Player = React.createClass({
  mixins: [OverlayMixin],
  getInitialState : function() {
    return ({ dmg : 0, show : false, isModalOpen : false, delayedAfterIdx : 0 });
  },
  handleToggle : function() {
    this.setState({ isModalOpen : !this.state.isModalOpen });
  },
  handleChange : function(e) {
    this.setState({ dmg : (parseInt(e.target.value, 10) || 0 )});
  },
  handleDamage : function() {
    this.props.curr.dmg += this.state.dmg;
    this.setState({ dmg : 0 });

    if (this.props.curr.dmg >= this.props.curr.hp) {
      this.props.curr.dead = true;
    }

    this.props.onDmgAdd({ player : this.props.curr, idx : this.props.idx });
  },
  handleDelay : function() {
    if (this.props.curr.delayed) {
      this.handleToggle();
    }
    else {
      this.props.curr.delayed = true;
      this.props.onDelay({ player : this.props.curr, idx : this.props.idx });
      this.setState({ show : !this.state.show });
    }
  },
  handleDelayResolved : function() {
    this.props.curr.delayed = false;
    this.props.onDelay({ player: this.props.curr, idx : this.props.idx, delayedToIndex : this.state.delayedAfterIdx});
    this.handleToggle();
    this.setState({ show : !this.state.show });
  },
  handlePlayerSelect : function(e) {
    this.setState({ delayedAfterIdx : e.target.value });
  },
  handleHeal : function() {
    this.props.curr.dmg -= this.state.dmg;
    this.setState({ dmg : 0 });
    this.props.curr.dmg = (this.props.curr.dmg < 0) ? 0 : this.props.curr.dmg;
    this.props.onDmgAdd({ player: this.props.curr, idx : this.props.idx });
  },
  show : function() {
    this.setState({ show : !this.state.show });
  },
  renderOverlay : function() {

    if (!this.state.isModalOpen) {
      return <span></span>;
    }

    var players = [];
    for (var i = 0; i < this.props.players.length; i++) {
      players.push(<option key={i} value={i}>{this.props.players[i].name}</option>);
    }

    return (
      <Modal title="Trigger! Return to initiative order" onRequestHide={this.handleToggle}>
        <div className="modal-body">
          <Input type="select" label="Come after which player?" onChange={this.handlePlayerSelect} defaultValue="0">
            {players}
          </Input>
        </div>
        <div className="modal-footer">
          <Button onClick={this.handleToggle}>Close</Button>
          <Button bsStyle="success" onClick={this.handleDelayResolved}>Ok</Button>
        </div>
      </Modal>
    );
  },
  render : function() {
    var hpStyle, hpPercent;

    if ((this.props.curr.hp - this.props.curr.dmg) <= Math.floor(this.props.curr.hp / 4)) {
      hpStyle = "danger";
    }
    else if ((this.props.curr.hp - this.props.curr.dmg) <= Math.floor(this.props.curr.hp / 2)) {
      hpStyle = "warning";
    }
    else {
      hpStyle ="success";
    }

    hpPercent = (this.props.curr.hp - this.props.curr.dmg <= 0) ? 0 : Math.floor(((this.props.curr.hp - this.props.curr.dmg) / this.props.curr.hp)* 100);

    var style = null;
    if (this.props.curr.active) {
      style = "success";
    }
    else if (this.props.curr.delayed) {
      style="info";
    }

    var before = (this.props.curr.hp === 0 || this.state.show === false) ? "" : <Button disabled={(this.props.curr.dead) ? true : false } onClick={this.handleDamage}>Dmg</Button>;
    var after = (this.props.curr.hp === 0 || this.state.show === false) ? "" : <Button disabled={(this.props.curr.dead) ? true : false } onClick={this.handleHeal}>Heal</Button>;

    return (
      
      <ListGroupItem bsStyle={style} disabled={(this.props.curr.dead) ? true : false } >
        <a className="toggle" href="#?" onClick={this.show}>
        <h3>{this.props.curr.name} <small>@ {this.props.curr.initiative} initiative <Label bsStyle="warning">{((this.props.curr.dmg >= Math.floor(this.props.curr.hp / 2)) && this.props.curr.hp !== 0 && !this.props.curr.dead) ? "bloodied" : ""}</Label> <Label bsStyle="danger">{(this.props.curr.dead) ? "dead" : "" }</Label> <Label bsStyle="info">{(this.props.curr.delayed) ? "delayed" : ""}</Label></small> </h3>
        <ProgressBar className={(this.props.curr.hp === 0) ? "hide" : ""} bsStyle={hpStyle} label={(this.props.curr.hp - this.props.curr.dmg) + " / " + this.props.curr.hp} now={hpPercent} />
        </a>
        <Input
          disabled={(this.props.curr.dead) ? true : false }
          className={(this.props.curr.hp === 0 || this.state.show === false) ? "hide" : ""}
          type="text" 
          placeholder="damage taken / healed"
          buttonBefore={before}
          buttonAfter={after}
          onChange={this.handleChange}
          value={(this.state.dmg === 0) ? "" : this.state.dmg}
        />
          
        <Button 
          disabled={(this.props.curr.dead) ? true : false } 
          bsSTyle="default" 
          onClick={this.handleDelay}
          className={(this.state.show === false) ? "hide" : ""}
        >
          {(this.props.curr.delayed) ? "Trigger!" : "Delay Turn"}
        </Button>
      </ListGroupItem>
    );
  }
});

module.exports = Player;