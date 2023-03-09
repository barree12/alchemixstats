import React, { Component } from 'react';

export default class VelodromeDescription extends Component {
  render() {
    return (
      <div className="protocol-description">
        <h3>
          <img src={ require('../../logos/velo_round.png').default } alt="Velodrome logo" className="image" /> Velodrome Finance
        </h3>
        <div className="protocol-inner">
          Velodrome Finance is a new AMM on the Optimism L2 chain.
          <br/>Users need to provide liquidity to one of the five alAsset liquidity pools to start earning VELO rewards.
          <br/>
          <br/>
          <span>
            Website: <a target="_blank" rel="noreferrer" href="https://velodrome.finance">https://velodrome.finance</a>
          </span>
        </div>
      </div>);
  }
}