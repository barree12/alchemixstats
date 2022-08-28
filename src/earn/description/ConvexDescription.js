import React, { Component } from 'react';

export default class ConvexDescription extends Component {
  render() {
    return (
      <div className="protocol-description">
        <h3>
          <img src={ require('../../logos/crv.png').default } alt="Curve logo" className="image" /> Curve & <img src={ require('../../logos/cvx.png').default } alt="Convex logo" className="image" /> Convex
        </h3>
        <div className="protocol-inner">
        The main alAsset liquidity pools reside on Curve.
        <br/>Convex is designed to enchance rewards on Curve pools.
        <br/>Users first need to provide liquidity to one of the alUSD liquidity pools (alUSD3Crv or alUSDFraxBP) or to the alETH liquidity pool (alETHCrv) on the Curve UI and then stake these LP tokens in Convex.
        <br/>
        <br/>
        <span>
          Websites: <a target="_blank" rel="noreferrer" href="https://curve.fi">https://curve.fi</a> and <a target="_blank" rel="noreferrer" href="https://www.convexfinance.com">https://www.convexfinance.com</a>
        </span>
        </div>
      </div>);
  }
}