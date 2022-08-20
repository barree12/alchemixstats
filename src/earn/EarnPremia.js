import React, { Component } from 'react';

export default class EarnPremia extends Component {
  render() {
    return (
      <div>
        <div className="earn-yield-protocol-name">
          <img src={ require('../logos/premia.png').default } alt="Premia logo" className="image" />
            Premia Finance
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSD Put options pool
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.png').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
            <img src={ require('../logos/premia.png').default } alt="Premia logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              76.6%
            </div>
          </div>
          
          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alETH Call Options pool
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/aleth.png').default } alt="alETH logo" className="image" />
            </div>
            <div className="earn-yield-reward">
            <img src={ require('../logos/premia.png').default } alt="Premia logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              82%
            </div>
          </div>
        </div>);
  }
}