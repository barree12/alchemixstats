import React, { Component } from 'react';

export default class EarnElement extends Component {
  render() {
    return (
      <div>
        <div className="earn-yield-protocol-name">
          <img src={ require('../logos/element_round.png').default } alt="Element Finance logo" className="image" />
            Element Finance
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSD fixed term
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.png').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
            <img src={ require('../logos/crv.png').default } alt="Curve logo" className="image" />
            <img src={ require('../logos/cvx.png').default } alt="Convex logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              10.4%
            </div>
          </div>
      </div>);
  }
}