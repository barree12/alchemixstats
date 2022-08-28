import React, { Component } from 'react';

export default class PremiaDescription extends Component {
  render() {
    return (
      <div className="protocol-description">
        <h3>
          <img src={ require('../../logos/premia.png').default } alt="Premia logo" className="image" /> Premia Finance
        </h3>
        <div className="protocol-inner">
          Premia Finance is a decentralized options protocol, enabling anyone to buy and sell options in a fair and liquidity-efficient way.
          <br/>Premia currently has two pools for Alchemix, the ALCX/DAI and the alETH/alUSD options pools. Users are able to deposit ALCX, DAI, alETH and alUSD and become the underwriters for these assets.
          <br/>Traders buy options to speculate on the price of ALCX and alETH, and the depositors earn the fees paid by the traders.
          <br/>Make sure you understand the risks involved in underwriting options! Deposits can have negative returns!
          <br/>
          <br/>
          <span>
            Website: <a target="_blank" rel="noreferrer" href="https://premia.finance">https://premia.finance</a>
          </span>
        </div>
      </div>);
  }
}