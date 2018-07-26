import React, { Component } from 'react';
import Connect from './components/Connect';
import KeyGen from './components/KeyGen';
import {Layout, Row, Col} from 'antd';
import Timeline from './components/Timeline';
import Contracts from './components/Contracts';
import {Client} from 'validana-client';

const { Header, Footer, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      client: Client.get(),
      timeline: []
    }

    this.privateKey = ''
    this.onKeyGenerate = this.onKeyGenerate.bind(this)
    this.onConnect = this.onConnect.bind(this)
  }

  onKeyGenerate(privateKey) {
    this.privateKey = privateKey
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
              <Col span={12}></Col>
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
