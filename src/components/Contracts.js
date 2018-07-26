import React, {Component} from 'react';
import {Button, Card, message} from 'antd';

class Contracts extends Component {

    constructor(props) {
        super(props)
        this.getContracts = this.getContracts.bind(this)
        this.state = {
            loading: false,
            contracts: ''
        }
    }

    async getContracts() {
        this.setState({loading: true})
        const contracts = await this.props.client.query("contracts", undefined, true);
        return contracts;
    }

    render() {
        return (
            <Card title="Contracts" bordered={false}>
                <Button type="primary" loading={this.state.loading} onClick={() => {
                    this.getContracts().then(contracts => {
                        if (!contracts.length) {
                            message.warning('No contracts to show')
                        }
                        this.setState({
                            loading: false,
                            contracts: contracts
                        })
                    }).catch(e => {
                        this.setState({loading: false})
                        message.error(e.message);
                    })
                }}>Fetch</Button>

                {this.state.contracts}
            </Card>
        )
    }
}

export default Contracts