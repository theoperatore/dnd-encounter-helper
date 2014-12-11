/** @jsx React.dom */
var React = require('react'),
    ListGroup = require('react-bootstrap/ListGroup'),
    ListGroupItem = require('react-bootstrap/ListGroupItem'),
    Input = require('react-bootstrap/Input'),
    Header = require('./header'),
    App;

App = React.createClass({
  getInitialState : function() {
    var local = JSON.parse(localStorage.getItem("players")) || [];
    return ({ players : [], active_idx : 0 });
  },
  handleAdd : function(data) {
    console.log("adding", data);
    var tmp = this.state.players;
    tmp.push({ name: data.name, initiative : data.initiative, hp: data.hp, active : false });

    // sort when adding
    tmp.sort(function(a,b) {
      if (a.initiative > b.initiative) return -1;
      if (a.initiative < b.initiative) return 1;
      return 0;
    });

    localStorage.setItem("players", JSON.stringify(tmp));
    this.setState({ players : tmp });
  },
  handleClear : function() {
    console.log("clearing all");
    this.setState({ players : [] });
  },
  start : function() {
    var tmp = this.state.players;
    tmp[this.state.active_idx].active = true;
    this.setState({ players : tmp });
  },
  next : function() {
    var next = (this.state.active_idx + 1) % this.state.players.length,
        tmp = this.state.players;

    tmp[this.state.active_idx].active = false;
    tmp[next].active = true;

    this.setState({ players : tmp, active_idx : next });
  },
  render : function() {
    var players = [];

    for (var i = 0, curr, out; i < this.state.players.length; i++) {
      curr = this.state.players[i];
      if (curr.active) {
        out = <ListGroupItem bsStyle="success" key={i}>
                <h3>{curr.name} <small>@ {curr.initiative} initiative</small></h3>
              </ListGroupItem>;
      }
      else {
        out = <ListGroupItem key={i}>
                <h3>{curr.name} <small>@ {curr.initiative} initiative</small></h3>
              </ListGroupItem>
      }
      players.push(out);
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
