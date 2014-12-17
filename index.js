/** @jsx React.dom */
var React = require('react'),
    ListGroup = require('react-bootstrap/ListGroup'),
    Header = require('./header'),
    Player = require('./player'),
    App;

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
