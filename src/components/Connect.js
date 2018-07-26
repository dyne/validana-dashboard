import React, { Component } from 'react';
import {Input, Button, Card, message} from 'antd';


class Connect extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            prefix: 'test',
            server: 'localhost:8080/v1'
        }
        this.connect = this.connect.bind(this)
        this.handlePrefixChange = this.handlePrefixChange.bind(this)
        this.handleServerChange = this.handleServerChange.bind(this)
    }

    connect() {
        const address = `ws://${this.state.server}`
        
        if (this.props.client.isConnected() === 0) {
            message.warning("The connection is already estabilished")
            return
        }

        message.loading(`Connecting to ${address}`, 2.5)
                .then(() => {
                    this.props.client.init(this.state.prefix, address, address)
                    message.success('Connection successful', 2.5)
                }).catch(e => {
                    console.error(e);
                });
    }

    handleServerChange(e) {
        this.setState({server: e.target.value})
    }

    handlePrefixChange(e) {
        this.setState({prefix: e.target.value})
    }

    render() {
        return (
            <Card title="Connect">
                <label htmlFor="prefix">the prefix as in VPROC_SIGNPREFIX</label>
                <Input name="prefix" defaultValue={this.state.prefix} onChange={this.handlePrefixChange}/>
                <br/><br/>
                <label htmlFor="server">WebSocket server url</label>
                <Input name="server" addonBefore="ws://" defaultValue={this.state.server} onChange={this.handleServerChange}/>
                <br/>
                <br/>
                <Button onClick={this.connect} type="primary">Connect</Button>
            </Card>
        )
    }
}

export default Connect;