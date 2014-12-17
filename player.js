var React = require('react'),
    ListGroupItem = require('react-bootstrap/ListGroupItem'),
    Input = require('react-bootstrap/Input'),
    ProgressBar = require('react-bootstrap/ProgressBar'),
    Label = require('react-bootstrap/Label'),
    Glyphicon = require('react-bootstrap/Glyphicon'),
    Button = require('react-bootstrap/Button'),
    ButtonGroup = require('react-bootstrap/ButtonGroup');


Player = React.createClass({
  getInitialState : function() {
    return ({ dmg : 0, show : false });
  },
  handleChange : function(e) {
    this.setState({ dmg : (parseInt(e.target.value, 10) || 0 )});
  },
  handleDamage : function() {
    //this.props.onDmgAdd(this.state.dmg);
    this.props.curr.dmg += this.state.dmg;
    this.setState({ dmg : 0 });

    if (this.props.curr.dmg >= this.props.curr.hp) {
      this.props.curr.dead = true;
    }

    this.props.onDmgAdd({ player : this.props.curr, idx : this.props.idx });
  },
  handleDelay : function() {
    alert("TRIGGER!");
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

    return (
      <ListGroupItem bsStyle={(this.props.curr.active) ? "success" : null} disabled={(this.props.curr.dead) ? true : false } >
        <h3>{this.props.curr.name} <small>@ {this.props.curr.initiative} initiative <Label bsStyle="warning">{((this.props.curr.dmg >= Math.floor(this.props.curr.hp / 2)) && this.props.curr.hp !== 0 && !this.props.curr.dead) ? "bloodied" : ""}</Label> <Label bsStyle="danger">{(this.props.curr.dead) ? "dead" : "" }</Label></small> </h3>
        <ProgressBar className={(this.props.curr.hp === 0) ? "hide" : ""} bsStyle={hpStyle} label={(this.props.curr.hp - this.props.curr.dmg) + " / " + this.props.curr.hp} now={hpPercent} />
        <Input
          disabled={(this.props.curr.dead) ? true : false }
          className={(this.props.curr.hp === 0 || this.state.show === false) ? "hide" : ""}
          type="text" 
          placeholder="damage taken / healed"
          addonBefore={(this.props.curr.hp === 0 || this.state.show === false) ? "" : (this.props.curr.hp - this.props.curr.dmg) +  " / " + this.props.curr.hp}
          onChange={this.handleChange}
          value={(this.state.dmg === 0) ? "" : this.state.dmg}
        />
        <ButtonGroup justified={true} className={(this.props.curr.hp === 0 || this.state.show === false)? "hide" : ""}>
          <ButtonGroup>
            <Button disabled={(this.props.curr.dead) ? true : false } bsStyle="default" onClick={this.handleDamage}>
              Damage
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button disabled={(this.props.curr.dead) ? true : false } bsStyle="default" onClick={this.handleHeal}>
              Heal
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button disabled={(this.props.curr.dead) ? true : false } bsSTyle="default" onClick={this.handleDelay}>
              Delay Turn
            </Button>
          </ButtonGroup>
        </ButtonGroup>
        <Button bsSize="xsmall" className={"options center-block" + ((this.props.curr.hp === 0) ? " hide" : "")} onClick={this.show}><Glyphicon glyph={(this.state.show === false) ? "chevron-down" : "chevron-up"} /></Button>
      </ListGroupItem>
    );
  }
});

module.exports = Player;