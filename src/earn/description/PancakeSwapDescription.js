import React, { Component } from 'react';

export default class VelodromeDescription extends Component {
  render() {
    return (
      <div className="protocol-description">
        <h3>
          <img src={ require('../../logos/cake.png').default } alt="PCS logo" className="image" /> PancakeSwap
        </h3>
        <div className="protocol-inner">
          PancakeSwap is the largest AMM on the Binance Smart Chain.
          <br/>They have also expanded to Ethereum and Aptos.
          <br/>There is a currently an alETH-ETH concentrated liquidity pool on Ethereum that liquidity providers can deposit to. 
          <br/>
          <br/>
          <span>
            Website: <a target="_blank" rel="noreferrer" href="https://pancakeswap.finance">https://pancakeswap.finance</a>
          </span>
        </div>
      </div>);
  }
}