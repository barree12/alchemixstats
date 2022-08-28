import React, { Component } from 'react';

export default class SaddleDescription extends Component {
  render() {
    return (
      <div className="protocol-description">
        <h3>
          <img src={ require('../../logos/saddle.png').default } alt="Saddle logo" className="image" /> Saddle
        </h3>
        <div className="protocol-inner">
          Similar to Curve, Saddle also has a gauge system where veSDL holders can direct SDL emissions to Saddle pools.
          <br/>Users need to provide liquidity to the Saddle D4 pool or the FraxBP-alUSD pool to be able to earn SDL rewards.
          <br/>Make sure you stake your LP tokens in the Saddle farms to collect the rewards!
          <br/>alETH liquidity can also be provided on saddle in the Saddle alETH pool.
          <br/>These LP tokens need to be staked in the Alchemix staking contract using the main Alchemix UI (under the Farms menu item)!
          <br/>
          <br/>
          <span>
            Website: <a target="_blank" rel="noreferrer" href="https://saddle.finance">https://saddle.finance</a>
          </span>
        </div>
      </div>);
  }
}