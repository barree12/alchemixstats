import React, { Component } from 'react';

export default class EarnSaddle extends Component {
  render() {
    return (
      <div>
        <div className="earn-yield-protocol-name">
            <img src={ require('../logos/saddle.png').default } alt="Saddle logo" className="image" />
            Saddle
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              Saddle D4
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.png').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/saddle.png').default } alt="Saddle logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              3.6%
            </div>
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSDFraxBP
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.png').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/saddle.png').default } alt="Saddle logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              3.6%
            </div>
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSDFraxBP
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/ftm_small.png').default } alt="FTM logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.png').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/saddle.png').default } alt="Saddle logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              3.6%
            </div>
          </div>
          
          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              Saddle alETH
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/aleth.png').default } alt="alETH logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/alcx_logo.png').default } alt="Alchemix logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              12.3%
            </div>
          </div>
      </div>);
  }
}