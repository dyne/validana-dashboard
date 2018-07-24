import React, { Component } from 'react';
import {Client} from 'validana-client';
import {Row, Col, Input, Button, message} from 'antd';


class Connect extends Component {
    constructor(props) {
        super(props)
        
        this.client = Client.get()
        this.state = {
            prefix: 't_',
            server: '127.0.0.1:8080'
        }
        this.connect = this.connect.bind(this)
    }

    connect() {
        const address = `ws://${this.state.server}`
        message.loading(`Connecting to ${address}`, 2.5)
                .then(() => {
                    this.client.init(this.state.prefix, address)
                    message.success('Connection successful', 2.5)
                });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={6}>
                        <label htmlFor="prefix">the prefix as in VPROC_SIGNPREFIX</label>
                        <Input name="prefix" defaultValue={this.state.prefix}></Input>
                        <br/>
                        <label htmlFor="server">WebSocket server url</label>
                        <Input name="server" addonBefore="ws://" defaultValue={this.state.server}></Input>
                        <br/>
                        <br/>
                        <Button onClick={this.connect}>Connect</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Connect;