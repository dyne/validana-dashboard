import React, { Component } from 'react';
import Connect from './components/Connect';
import KeyGen from './components/KeyGen';
import {Layout, Row, Col} from 'antd';
import Contracts from './components/Contracts';
import {Client} from 'validana-client';

const { Header, Footer, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props)

    this.client = Client.get()
    this.privateKey = ''
  }

  render() {
    return (
      <Layout className="layout">
        <Header>
        </Header>
        <Layout>
          <Content style={{ padding: '50px' }}>
            <Row gutter={16}>
              <Col span={8}>
                <Connect client={this.client} />
              </Col>
              <Col span={8} offset={8}>
                <KeyGen privateKey={this.privateKey} />
              </Col>
            </Row>
            <br/>
            <Row gutter={16}>
              <Col span={12}>
                <Contracts client={this.client} />
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
