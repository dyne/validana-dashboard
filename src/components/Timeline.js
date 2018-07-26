import React, {Component} from 'react';
import {Card, Timeline as Time} from 'antd'; 

class Timeline extends Component {
    constructor(props) {
        super(props)
        this.getStartColor = this.getStartColor.bind(this)
        this.renderTimeline = this.renderTimeline.bind(this)
    }

    getStartColor() {
        return this.props.client.isConnected() === 0 ? "green" : "red";
    }

    renderTimeline() {
        return this.props.timeline.map((item, i) => (
            <Time.Item key={i} color="blue">{item}</Time.Item>
        ))
    }

    render() {
        return (
            <Card title="Timeline">
                <Time>
                    <Time.Item color={this.getStartColor()}>Connected</Time.Item>
                    {this.renderTimeline()}
                </Time>
            </Card>
        )
    }
}

export default Timeline;