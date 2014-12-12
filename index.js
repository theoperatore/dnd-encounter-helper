/** @jsx React.dom */
var React = require('react'),
    ListGroup = require('react-bootstrap/ListGroup'),
    ListGroupItem = require('react-bootstrap/ListGroupItem'),
    Input = require('react-bootstrap/Input'),
    Label = require('react-bootstrap/Label'),
    Button = require('react-bootstrap/Button'),
    ButtonGroup = require('react-bootstrap/ButtonGroup'),
    ProgressBar = require('react-bootstrap/ProgressBar'),
    Glyphicon = require('react-bootstrap/Glyphicon'),
    Header = require('./header'),
    App, Player;

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
  handleDelay : function() {},
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
        <h3>{this.props.curr.name} <small>@ {this.props.curr.initiative} initiative <Label bsStyle="warning">{((this.props.curr.dmg >= Math.floor(this.props.curr.hp / 2)) && this.props.curr.hp !== 0) ? "bloodied" : ""}</Label> <Label bsStyle="danger">{(this.props.curr.dead) ? "dead" : "" }</Label></small> </h3>
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
              Add Damage
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button disabled={(this.props.curr.dead) ? true : false } bsStyle="default" onClick={this.handleHeal}>
              Heal Damage
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

App = React.createClass({
  getInitialState : function() {
    var local = JSON.parse(localStorage.getItem("__dnd_companion_encounter_helper_players")) || [],
        turn_idx = parseInt(JSON.parse(localStorage.getItem("__dnd_companion_encounter_helper_idx")),10) || 0
    return (
      { 
        players : local,
        active_idx : turn_idx
      }
    );
  },
  handleAdd : function(data) {
    console.log("adding", data);
    var tmp = this.state.players;

    tmp.push(
      { 
        name: data.name,
        initiative : data.initiative,
        hp: data.hp,
        dmg : 0,
        active : false,
        dead : false,
        delayed : false
      }
    );

    // sort when adding
    tmp.sort(function(a,b) {
      if (a.initiative > b.initiative) return -1;
      if (a.initiative < b.initiative) return 1;
      return 0;
    });

    localStorage.setItem("__dnd_companion_encounter_helper_players", JSON.stringify(tmp));
    this.setState({ players : tmp });
  },
  handleClear : function() {
    console.log("clearing all");
    localStorage.removeItem("__dnd_companion_encounter_helper_players");
    localStorage.removeItem("__dnd_companion_encounter_helper_idx");
    this.setState({ players : [], active_idx : 0 });
  },
  start : function() {
    var tmp = this.state.players,
        idx = this.state.active_idx;

    while(tmp[idx].dead === true || tmp[idx].delayed === true) {
      idx++;
    }

    console.log("indexes", this.state.active_idx, idx);
    tmp[idx].active = true;
    this.setState({ players : tmp, active_idx : idx });
  },
  next : function() {
    var next = (this.state.active_idx + 1) % this.state.players.length,
        tmp = this.state.players;

    while (tmp[next].dead === true || tmp[next].delayed === true) {
      next++;
    }

    tmp[this.state.active_idx].active = false;
    tmp[next].active = true;

    this.setState({ players : tmp, active_idx : next });
    localStorage.setItem("__dnd_companion_encounter_helper_players", JSON.stringify(tmp));
    localStorage.setItem("__dnd_companion_encounter_helper_idx", JSON.stringify(next));
  },
  handleDmgAdd : function(player) {
    var tmp = this.state.players;

    tmp[player.idx] = player.player;
    this.setState({ players : tmp });
    localStorage.setItem("__dnd_companion_encounter_helper_players", JSON.stringify(tmp));
    localStorage.setItem("__dnd_companion_encounter_helper_idx", JSON.stringify(this.state.active_idx));
  },
  render : function() {
    var players = [];

    for (var i = 0, curr; i < this.state.players.length; i++) {
      curr = this.state.players[i];
      
      players.push(<Player key={i} idx={i} curr={curr} onDmgAdd={this.handleDmgAdd} />);
    }

    return (
      <div>
        <Header start={this.start} next={this.next} num={this.state.players.length} onAdd={this.handleAdd} onClear={this.handleClear} />
        <ListGroup>
          {players}
        </ListGroup>
        <div className="spacer"></div>
      </div>
    );
  }
});


React.render(<App />, document.body);
