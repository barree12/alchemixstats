import React, { Component } from 'react';

export default class TokemakDescription extends Component {
  render() {
    return (
      <div className="protocol-description">
        <h3>
          <img src={ require('../../logos/tokemak.png').default } alt="Tokemak logo" className="image" /> Tokemak
        </h3>
        <div className="protocol-inner">
          Tokemak is a decentralized market making platform and a liquidity router.
          <br/>There are currently two Alchemix-related reactors (pools) in Tokemak, one for ALCX, the other for alUSD. Users can deposit ALCX or alUSD and earn a yield on them in Tokemak’s native asset, TOKE.
          <br/>The system then pairs these assets with other tokens in Tokemak, such as ETH, USDC or any other asset that is voted for, creating trading pairs on decentralized exchanges.
          <br/>It is important to note that while these assets are deployed in liquidity pools, Tokemak provides protection from IL (Impermanent Loss) through their mechanics.
          <br/>
          <br/>
          <span>
            Website: <a target="_blank" rel="noreferrer" href="https://tokemak.xyz">https://tokemak.xyz</a>
          </span>
        </div>
      </div>);
  }
}