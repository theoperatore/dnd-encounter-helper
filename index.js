/** @jsx React.dom */
var React = require('react'),
    ListGroup = require('react-bootstrap/ListGroup'),
    ListGroupItem = require('react-bootstrap/ListGroupItem'),
    Input = require('react-bootstrap/Input'),
    Label = require('react-bootstrap/Label'),
    Button = require('react-bootstrap/Button'),
    Header = require('./header'),
    App, Player;

Player = React.createClass({
  getInitialState : function() {
    return ({ dmg : 0 });
  },
  handleChange : function(e) {
    this.setState({ dmg : (parseInt(e.target.value, 10) || 0 )});
  },
  handleSubmit : function() {
    //this.props.onDmgAdd(this.state.dmg);
    this.props.curr.dmg += this.state.dmg;
    this.setState({ dmg : 0 });

    if (this.props.curr.dmg >= this.props.curr.hp) {
      this.props.curr.dead = true;
    }

    this.props.onDmgAdd({ player : this.props.curr, idx : this.props.idx });
  },
  render : function() {
    return (
      <ListGroupItem bsStyle={(this.props.curr.active) ? "success" : null} disabled={(this.props.curr.dead) ? true : false }>
        <h3>{this.props.curr.name} <small>@ {this.props.curr.initiative} initiative</small></h3>
        <p><Label bsStyle="warning">{((this.props.curr.dmg >= Math.floor(this.props.curr.hp / 2)) && this.props.curr.hp !== 0) ? "bloodied" : ""}</Label> <Label bsStyle="danger">{(this.props.curr.dead) ? "dead" : "" }</Label></p>
        <Input
          disabled={(this.props.curr.dead) ? true : false }
          className={(this.props.curr.hp === 0) ? "hide" : ""}
          type="text" 
          placeholder="damage taken"
          addonAfter={this.props.curr.hp}
          addonBefore={this.props.curr.dmg}
          onChange={this.handleChange}
          value={(this.state.dmg === 0) ? "" : this.state.dmg}
        />
        <Button className={(this.props.curr.hp === 0)? "hide" : ""} disabled={(this.props.curr.dead) ? true : false } bsStyle="default" onClick={this.handleSubmit}>
          Add Damage
        </Button>
      </ListGroupItem>
    );
  }
});

App = React.createClass({
  getInitialState : function() {
    var local = JSON.parse(localStorage.getItem("__dnd_companion_encounter_helper_players")) || [];
    return ({ players : local, active_idx : 0 });
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
    this.setState({ players : [] });
  },
  start : function() {
    var tmp = this.state.players,
        idx = this.state.active_idx;

    while(tmp[idx].dead === true || tmp[idx].delayed === true) {
      idx++;
    }

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
  },
  handleDmgAdd : function(player) {
    var tmp = this.state.players;

    tmp[player.idx] = player.player;
    this.setState({ players : tmp });
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
