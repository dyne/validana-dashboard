import React, {Component} from 'react';
import {Button, Card, Table, message} from 'antd';
import {Crypto} from 'validana-client';

class Contracts extends Component {

    constructor(props) {
        super(props)
        this.getContracts = this.getContracts.bind(this)
        this.createContract = this.createContract.bind(this)
        this.state = {
            loading: false,
            contracts: []
        }

        this.contractsColumns = [{
                title: 'Type',
                dataIndex: 'type',
              }, {
                title: 'Version',
                dataIndex: 'version',
              }, {
                title: 'Description',
                dataIndex: 'description',
              }, {
                title: 'Hash',
                dataIndex: 'hash'
              }];
    }

    getContracts() {
        this.setState({loading: true})
        const contracts = this.props.client.query("contracts", undefined, true);

        contracts.then(contracts => {
            if (!contracts.length) {
                message.warning('No contracts to show')
            }
            this.setState({
                loading: false,
                contracts: [...this.state.contracts, ...contracts]
            })
        }).catch(e => {
            this.setState({loading: false})
            message.error(e.message);
        })
    }

    createContract() {
        // https://github.com/Coinversable/validana-processor/wiki/Interacting#example-create-smart-contract
        const payload = {
            "type": "Institutution",
            "version": "1.0",
            "description": "Create or (un)withdraw an institution.",
            "template": '{"receiver":{"type":"addr","desc":"Address van de onderwijsinstelling.","name":"Onderwijsinstelling"},"name":{"type":"str","desc":"Naam van onderwijsinstelling.","name":"Naam"},"allow":{"type":"bool","desc":"Toestaan of niet meer toestaan.","name":"Toegestaan"}}',
            "init": "YXdhaXQgcXVlcnkoIkNSRUFURSIsICJpbnN0aXR1dGlvbnMiLCAiKGluc3RpdHV0aW9uIFZBUkNIQVIoMzUpIFBSSU1BUlkgS0VZIE5PVCBOVUxMLCAiDQogICAgKyAibmFtZSBWQVJDSEFSKDEyOCkgTk9UIE5VTEwsIGFsbG93ZWQgQk9PTCBOT1QgTlVMTCk7IiwgW10pOw==",  
            "code": "Ly9Pbmx5IHN1cmYgaXMgYWxsb3dlZCB0byBjcmVhdGUgYW5kIHdpdGhkcmF3IGluc3RpdHV0aW9ucw0KaWYgKGZyb20gIT09IHByb2Nlc3Nvcikgew0KICAgIHJldHVybiAiT25seSBTVVJGIGlzIGFsbG93ZWQgdG8gY3JlYXRlLyh1bil3aXRoZHJhdyBpbnN0aXR1dGlvbnMuIjsNCn0NCmlmIChwYXlsb2FkLmFsbG93KSB7DQogICAgLy9XZSBvbmx5IGNhcmUgYWJvdXQgdGhlIG5hbWUgbGVuZ3RoIGlmIHdlIGFjdHVhbGx5IHVzZSBpdC4NCiAgICBpZiAocGF5bG9hZC5uYW1lLmxlbmd0aCA9PT0gMCB8fCBwYXlsb2FkLm5hbWUubGVuZ3RoID4gMTI4KSB7DQogICAgICAgIHJldHVybiAiSW52YWxpZCBuYW1lLiI7DQogICAgfQ0KICAgIC8vQ3JlYXRlIG9yIHVud2l0aGRyYXcgaW5zdHV0aXRpb24NCiAgICBhd2FpdCBxdWVyeSgiSU5TRVJUIiwgImluc3RpdHV0aW9ucyIsICIoaW5zdGl0dXRpb24sIG5hbWUsIGFsbG93ZWQpIFZBTFVFUyAoJDEsICQyLCB0cnVlKSBPTiBDT05GTElDVCAiDQogICAgICAgICsgIk9OIENPTlNUUkFJTlQgaW5zdGl0dXRpb25zX3BrZXkgRE8gVVBEQVRFIFNFVCBuYW1lID0gJDIsIGFsbG93ZWQgPSB0cnVlOyIsIFtwYXlsb2FkLnJlY2VpdmVyLCBwYXlsb2FkLm5hbWVdKTsNCn0NCmVsc2Ugew0KICAgIC8vV2l0aGRyYXcgYW4gaW5zdGl0dXRpb24NCiAgICBjb25zdCBjaGFuZ2VkID0gYXdhaXQgcXVlcnkoIlVQREFURSIsICJpbnN0aXR1dGlvbnMiLCAiU0VUIGFsbG93ZWQgPSBmYWxzZSBXSEVSRSBpbnN0aXR1dGlvbiA9ICQxOyIsIFtwYXlsb2FkLnJlY2VpdmVyXSk7DQogICAgaWYgKGNoYW5nZWQucm93Q291bnQgPT09IDApIHsNCiAgICAgICAgcmV0dXJuICJJbnN0aXR1dGlvbiBkb2VzIG5vdCBleGlzdC4iOw0KICAgIH0NCn0NCnJldHVybiAiT0siOw=="
        }
        const contractHash = Buffer.alloc(32, 0);
        const transactionId = Crypto.id()
        const privateKey = this.props.privateKey

        this.props.client.signAndSend(privateKey, transactionId, contractHash, payload, 0).then(()=> {
            this.props.client.getProcessedTx(transactionId).then(() => {
                message.success('Contract sucessfully created')
            }).catch(e=> {
                message.error(e.message);          
            })
        }).catch(e=> {
            message.error(e.message);          
        })
    }

    render() {
        return (
            <Card title="Contracts" bordered={false}>
                <Button type="primary" loading={this.state.loading} onClick={this.getContracts}>Fetch</Button> &nbsp;
                <Button type="primary" onClick={this.createContract}>New</Button>
                <br/><br/>
                <Table dataSource={this.state.contracts} columns={this.contractsColumns} rowKey={record => { console.log(record); return record.hash }} />
            </Card>
        )
    }
}

export default Contracts