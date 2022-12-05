import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';

import db from '../db'

import ActionBlock from './ActionBlock';
import Action_Block_Test from '../images/Action_Block_Test.png';

class ActionDeck extends Component {
    constructor(props) {
        super(props);
    }

    copyActions() {
        var toCopy = Object.entries(this.props.current_actions).sort((action1, action2) => db.actions[action1[0]].cost[0] - db.actions[action2[0]].cost[0]).map((mapped) => mapped[1] == 2 ? db.actions[mapped[0]].name + '\n' + db.actions[mapped[0]].name : db.actions[mapped[0]].name).toString().replaceAll(',', '\n').replaceAll('Shaken\n Not Purred', 'Shaken, Not Purred')
        navigator.clipboard.writeText(toCopy);
    }

    render() {  
        var actions = Object.entries(this.props.current_actions).map((mapped) => mapped[0]);
        actions.sort((action1, action2) => db.actions[action1].cost[0] - db.actions[action2].cost[0]);
        const a1 = actions.map((action) => <ActionBlock name={action} key={action} url={db.actions[action].hi_res_image} count={this.props.current_actions[action]} cost={db.actions[action].cost} removeFromDeck={this.props.removeFromDeck}/>)
        return (
            <div height="850">
                <div height="850">
            <Row>
                {a1}
            </Row>
                </div>
            <p className={this.props.dark? 'fontWhite' : 'font'}>{this.props.total_actions} / 30</p><button className="exportDeck" onClick={() => this.copyActions()}>Add Cards to Clipboard (for sim)</button>
            </div>
        )
    }
}

export default ActionDeck