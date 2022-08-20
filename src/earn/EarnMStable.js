import React, { Component } from 'react';

export default class EarnMStable extends Component {
  render() {
    return (
      <div>
          <div className="earn-yield-protocol-name">
            <img src={ require('../logos/mstable_round.png').default } alt="mStable logo" className="image" />
            mStable
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSD feeder pool
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.png').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/mstable_round.png').default } alt="mStable logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              1.6%
            </div>
          </div>
      </div>);
  }
}