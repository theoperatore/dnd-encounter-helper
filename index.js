/** @jsx React.dom */
var React = require('react'),
    ListGroup = require('react-bootstrap/ListGroup'),
    Menu = require('./menu'),
    Player = require('./player');

var App = React.createClass({
  getInitialState : function() {
    var local = JSON.parse(localStorage.getItem("__dnd_companion_encounter_helper_players")) || [];
    return (
      { 
        players : local,
        activated : false
      }
    );
  },
  componentWillMount: function () {
    var tmp = this.state.players.slice();

    for (var i = 0; i < tmp.length; i++) {
      if (tmp[i].active) {
        this.setState({ activated : true });
        break;
      }
    }
  },
  handleAdd : function(data) {
    var tmp = this.state.players.slice();

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
    var tmp = this.state.players.slice(),
        idx = 0;

    for (var i = 0; i < tmp.length; i++) {
      if (tmp[i].active) {
        idx = i;
        break;
      }
    }

    tmp[idx].active = true;
    this.setState({ players : tmp, activated : true });
  },
  next : function() {
    var curr = 0;
    var next = 1;
    var tmp = this.state.players;

    for (var i = 0; i < tmp.length; i++) {
      if (tmp[i].active) {
        curr = i;
        break;
      }
    }

    next = (curr + 1) % tmp.length;
    while (tmp[next] && (tmp[next].dead || tmp[next].delayed)) {

      // prevent an infinite loop; break if we've gone around the horn
      if (next === curr) break;

      // search for the next character
      next = ((next + 1) % tmp.length);
    }

    tmp[curr].active = false;
    tmp[next].active = true;

    this.setState({ players : tmp });
    localStorage.setItem("__dnd_companion_encounter_helper_players", JSON.stringify(tmp));
  },
  stop : function() {
    var tmp = this.state.players;
    var idx = -1;

    for (var i = 0; i < tmp.length; i++) {
      if (tmp[i].active) {
        idx = i;
        break;
      }
    }

    if (idx === -1) return;

    tmp[idx].active = false;
    this.setState({ players : tmp, activated : false });
    localStorage.setItem("__dnd_companion_encounter_helper_players", JSON.stringify(tmp));
  },
  handleDmgAdd : function(player) {
    var tmp = this.state.players;

    tmp[player.idx] = player.player;
    this.setState({ players : tmp });
    localStorage.setItem("__dnd_companion_encounter_helper_players", JSON.stringify(tmp));
  },
  handleDelay : function(data) {
    var tmp = this.state.players;

    if (data.resolveDelay) {
      tmp.splice(data.idx, 1);
      tmp.splice(data.delayedToIndex, 0, data.player);
      this.setState({ players: tmp });
      localStorage.setItem("__dnd_companion_encounter_helper_players", JSON.stringify(tmp));
    }
    else {
      tmp[data.idx] = data.player;
      this.setState({ players: tmp });
      localStorage.setItem("__dnd_companion_encounter_helper_players", JSON.stringify(tmp));
    }

  },
  render : function() {
    var players = [];

    for (var i = 0, curr; i < this.state.players.length; i++) {
      curr = this.state.players[i];
      
      players.push(<Player key={i} idx={i} curr={curr} players={this.state.players} onDelay={this.handleDelay} onDmgAdd={this.handleDmgAdd} />);
    }

    return (
      <div>
        <Menu start={this.start} next={this.next} num={this.state.players.length} activated={this.state.activated} onAdd={this.handleAdd} onStop={this.stop} onClear={this.handleClear} />
        <ListGroup>
          {players}
        </ListGroup>
        <div className="spacer"></div>
      </div>
    );
  }
});


React.render(<App />, document.body);
