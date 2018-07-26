import { Button, Card, Input, message } from 'antd';
import React, { Component } from 'react';
import { Crypto } from 'validana-client';

const { TextArea } = Input;

class Encrypt extends Component {
    constructor(props) {
        super(props)
        this.state = {
            raw: ''
        }
        this.updateValue = this.updateValue.bind(this)
        this.sign = this.sign.bind(this)
    }

    sign() {
        if (this.props.privateKey === null) {
            message.error("Please generate a private key before")
            return
        }
        const result = Crypto.binaryToBase64(this.props.privateKey.sign(this.state.raw))
        this.setState({raw: result})
    }

    updateValue(e) {
        this.setState({raw: e.target.value})
    }

    render() {
        return (
            <Card title="Sign data with your Private key (base64)">
                <TextArea rows={4} onChange={this.updateValue} value={this.state.raw}/>
                <br/><br/>
                <Button type="primary" onClick={this.sign}>Sign</Button>
            </Card>
        )
    }
}

export default Encrypt