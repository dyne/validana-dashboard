import React, { Component } from 'react';
import Connect from './components/Connect';
import KeyGen from './components/KeyGen';
import {Layout, Row, Col} from 'antd';
const { Header, Footer, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
        </Header>
        <Layout>
          <Content style={{ padding: '50px' }}>
            <Row gutter={16}>
              <Col span={8}>
                <Connect />
              </Col>
              <Col span={8} offset={8}>
                <KeyGen />
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
