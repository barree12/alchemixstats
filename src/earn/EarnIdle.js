import React, { Component } from 'react';

export default class EarnIdle extends Component {
  render() {
    return (
      <div>
        <div className="earn-yield-protocol-name">
            <img src={ require('../logos/idle_round.png').default } alt="Idle logo" className="image" />
            Idle Finance
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSD Junior Tranche
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.png').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/idle_round.png').default } alt="Idle logo" className="image" />
              <img src={ require('../logos/crv.png').default } alt="Curve logo" className="image" />
              <img src={ require('../logos/cvx.png').default } alt="Convex logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              10.6%
            </div>
          </div>
          
          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSD Senior Tranche
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.png').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/idle_round.png').default } alt="Idle logo" className="image" />
              <img src={ require('../logos/crv.png').default } alt="Curve logo" className="image" />
              <img src={ require('../logos/cvx.png').default } alt="Convex logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              3.3%
            </div>
          </div>
      </div>);
  }
}