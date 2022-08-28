import React, { Component } from 'react';

export default class ElementDescription extends Component {
  render() {
    return (
      <div className="protocol-description">
        <h3>
          <img src={ require('../../logos/element_round.png').default } alt="Element logo" className="image" /> Element Finance
        </h3>
        <div className="protocol-inner">
          Element Finance is a decentralized finance protocol that enables users to seek high fixed yield income in the DeFi market.
          <br/>This is made possible by the introduction of an internal AMM where these fixed rate tokens can be traded.
          <br/>Variable rate users can deposit any of the 3Crv tokens (DAI, USDC, USDT) as well as alUSD that is deposited into the alUSD3Crv pool and principal tokens are created.
          <br/>Users can buy these principal tokens to get access to a guaranteed fixed yield for a predefined amount of time (usually 6-month terms).
          <br/>
          <br/>
          <span>
            Website: <a target="_blank" rel="noreferrer" href="https://www.element.fi">https://www.element.fi</a>
          </span>
        </div>
      </div>);
  }
}