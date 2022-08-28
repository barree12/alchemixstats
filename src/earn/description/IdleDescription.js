import React, { Component } from 'react';

export default class IdleDescription extends Component {
  render() {
    return (
      <div className="protocol-description">
        <h3>
          <img src={ require('../../logos/idle_round.png').default } alt="Idle logo" className="image" /> Idle Finance
        </h3>
        <div className="protocol-inner">
          Idle Finance is a decentralized rebalancing protocol that allows users to automatically and algorithmically manage their digital asset allocation among different third-party DeFi protocols.
          <br/>Users can choose to maximize their interest rate returns through the Junior Tranche strategy or minimize their risk exposure through the Senior Tranche allocation strategy.
          <br/>The Senior Tranche is insured by the Junior Tranche in case of a partial loss of funds of the strategy.
          <br/>Idle currently supports the alUSD3Crv Curve pool, meaning users can earn the yield provided by the alUSD3Crv pool with higher or lower yields, depending on their risk appetite.
          <br/>
          <br/>
          <span>
            Website: <a target="_blank" rel="noreferrer" href="https://idle.finance">https://idle.finance</a>
          </span>
        </div>
      </div>);
  }
}