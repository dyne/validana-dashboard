import React, { Component } from 'react';
import './App.css';
import {Client, PrivateKey} from 'validana-client';

class App extends Component {
  constructor() {
    super();
    this.privateKey = PrivateKey.generate()
    this.client = Client.get()
    this.state = {
      prefix: 't_',
      server: 'ws://localhost:8080'
    }

    this.connect = this.connect.bind(this);
  }

  connect() {
    this.client.init(this.state.prefix, this.state.server)
  }

  render() {
    return (
      <div className="App">
        <br/>
        <label htmlFor="prefix">Prefix (VPROC_SIGNPREFIX)  </label>
        <input type="text" name="prefix" defaultValue={this.state.prefix} />
        <br/><br/>
        <label htmlFor="server">WS url server   </label>
        <input type="text" name="server" defaultValue={this.state.server} />
        <br/><br/>
        <button onClick={this.connect}>Connect</button>
      </div>
    );
  }
}

export default App;
