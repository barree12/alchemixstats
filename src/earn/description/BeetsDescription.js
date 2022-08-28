import React, { Component } from 'react';

export default class BeetsDescription extends Component {
  render() {
    return (
      <div className="protocol-description">
        <h3>
          <img src={ require('../../logos/beets_round.png').default } alt="Beets logo" className="image" /> Beethoven X
        </h3>
        <div className="protocol-inner">
          alUSD liquidity on Fantom resides on the Beethoven X AMM, where BEETS (the governance token of Beethoven X) tokens are provided to liquidity providers, along with gALCX rewards.
          <br/>
          <br/>
          <span>
            Website: <a target="_blank" rel="noreferrer" href="https://beets.fi">https://beets.fi</a>
          </span>
        </div>
      </div>);
  }
}