import { Col, Layout, Row } from 'antd';
import React, { Component } from 'react';
import { Client } from 'validana-client';
import Connect from './components/Connect';
import Contracts from './components/Contracts';
import KeyGen from './components/KeyGen';
import Timeline from './components/Timeline';
import Encrypt from './components/Encrypt';

const { Header, Footer, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      client: Client.get(),
      privateKey: null,
      timeline: []
    }

    this.onKeyGenerate = this.onKeyGenerate.bind(this)
    this.onConnect = this.onConnect.bind(this)
  }

  onKeyGenerate(privateKey) {
    this.setState({privateKey: privateKey})
  }

  onConnect() {
    this.setState({client: this.state.client})
    this.state.client.query('time').then(unix => {
      const lastTx = new Date(unix);
      this.setState({timeline: [`Last transaction ${lastTx}`]});
    })
  }

  render() {
    return (
      <Layout className="layout">
        <Header>
        </Header>
        <Layout>
          <Content style={{ padding: '50px' }}>
            <Row gutter={16}>
              <Col span={6}>
                <Connect client={this.state.client} onConnect={this.onConnect}/>
              </Col>
              <Col span={6}>
                <Timeline client={this.state.client} timeline={this.state.timeline}/>
              </Col>
              <Col span={12}>
                <KeyGen onKeyGenerate={this.onKeyGenerate} />
              </Col>
            </Row>
            <br/>
            <Row gutter={16}>
              <Col span={12}>
                <Contracts client={this.state.client} />
              </Col>
              <Col span={12}>
                <Encrypt client={this.state.client} privateKey={this.state.privateKey} />
              </Col>
            </Row>
          </Content>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
          Dyne &copy;2018
        </Footer>
      </Layout>
    );
  }
}

export default App;
