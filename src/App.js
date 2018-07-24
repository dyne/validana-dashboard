import React, { Component } from 'react';
import Connect from './components/Connect';
import {Layout} from 'antd';
const { Header, Footer, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
        </Header>
        <Layout>
          <Content style={{ padding: '50px' }}>
            <Connect />
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
