import React, {Component} from 'react';
import {Button, Card, Input} from 'antd';
import {PrivateKey} from 'validana-client'

class KeyGen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            address: '',
            keypair: null,
            privateKey: '',
            startingKey: false
        }

        this.generateKeyPair = this.generateKeyPair.bind(this);
        this.updateStartingKey = this.updateStartingKey.bind(this);
    }

    generateKeyPair() {
        const pk = this.state.startingKey ? new PrivateKey(new Buffer(this.state.startingKey)) : PrivateKey.generate()
        this.setState({keypair: pk}, () => {
            this.setState({
                address: this.state.keypair.getAddress(),
                privateKey: this.state.keypair.toWIF()
            })
            this.props.onKeyGenerate(this.state.keypair)
        })

        return
    }

    updateStartingKey(e) {
        this.setState({startingKey: e.target.value})
    }

    render() {
        return (
            <Card title="Private Key">
                <Input onBlur={this.updateStartingKey} placeholder="Leave empty to generate a new one"/>
                <br/><br/>
                <Button type="primary" onClick={this.generateKeyPair}>Generate</Button> 
                <br/><br/>
                Private Key: {this.state.privateKey}
                <br/><br/>
                Address: {this.state.address}
            </Card>
        )
    }
}

export default KeyGen;
