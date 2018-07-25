import React, {Component} from 'react';
import {Button} from 'antd';
import {PrivateKey} from 'validana-client'

class KeyGen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            address: '',
            keypair: null,
            privateKey: '',
        }

        this.generateKeyPair = this.generateKeyPair.bind(this);
    }

    generateKeyPair() {
        this.setState({keypair: PrivateKey.generate()}, () => {
            this.setState({
                address: this.state.keypair.getAddress(),
                privateKey: this.state.keypair.toWIF()
            })
        })

        return
    }

    render() {
        return (
            <div>
                <h2>KeyPairs</h2>

                <Button onClick={this.generateKeyPair}>Generate keypairs (private/public) and a address</Button> 
                <br/><br/>
                Private Key: {this.state.privateKey}
                <br/><br/>
                Address: {this.state.address}
            </div>
        )
    }
}

export default KeyGen;
