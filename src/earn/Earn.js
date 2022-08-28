import React, { Component } from 'react';
import EarnTokemak from './EarnTokemak';
import EarnPremia from './EarnPremia';
import EarnConvex from './EarnConvex';
import EarnSaddle from './EarnSaddle';
import EarnElement from './EarnElement';
import EarnBeets from './EarnBeets';
import EarnVelo from './EarnVelo';
import EarnIdle from './EarnIdle';
import '../App.css';
import TokemakDescription from './description/TokemakDescription';
import ConvexDescription from './description/ConvexDescription';
import SaddleDescription from './description/SaddleDescription';
import VelodromeDescription from './description/VelodromeDescription';
import BeetsDescription from './description/BeetsDescription';
import PremiaDescription from './description/PremiaDescription';
import IdleDescription from './description/IdleDescription';
import ElementDescription from './description/ElementDescription';
import { Link } from 'react-router-dom';

export default class Earn extends Component {
  render() {
    return <div className="App">
      <div className="header-disclaimer">
        This service provides statistics for the Alchemix dApp (<a target="_blank" rel="noreferrer" href="https://alchemix.fi">alchemix.fi</a>) and associated crypto tokens.
      </div>
      <h1>Alchemix Earn</h1>
      <img className="header-image" src={ require('../logos/alcx_logo.png').default } alt="ALCX logo" /><br/>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="switcher">
          Switch to Alchemix Stats <img className="image2" src={ require('../logos/arrow.png').default } alt="arrow" /><br/>
        </div>
      </Link>
      <br/>
        Have you wondered what to do with your alUSD or alETH loan after using the Alchemix vaults?<br />
        While swapping to other assets is always an option, there are plenty of opportunities to earn yield on alAssets directly.<br />
        These opportunities in most cases provide good potential returns.<br />
      <br/>
      <div className="earn-yield-wrapper">
        <br/>
        <h2>
          Standard Liquidity Pools
        </h2>
        <span>
          Liquidity pools are what AAMs (Automated Market Makers) rely on to facilitate token swaps.
          <br/>Users provide (usually) 2 tokens in a pair, for example ETH and DAI and whenever someone wants to trade ETH to DAI or vica versa, the funds in this token pair are used to complete the exchange.
          <br/>These pairs are called liquidity pools, as they provide the required liquidity.
          <br/>Even though the pools below are stable pairs, meaning that all tokens should converge to the same price, please make sure you understand the concept of IL (Impermanent Loss) and other risks before providing liquidity to a pool.
        </span>
        <br/>
        <div className="earn-yield">
          
          <div className="earn-yield-row">
            <div className="earn-yield-strat">
              <b>Strategy</b>
            </div>
            <div className="earn-yield-chain">
              <b>Chain</b>
            </div>
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.png').default } alt="alUSD logo" className="image" />/<img src={ require('../logos/aleth.png').default } alt="alETH logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <b>Rewards</b>
            </div>
            <div className="earn-yield-yield">
              <b>Yield</b>
            </div>
            <div className="earn-yield-link">
              <b>Link</b>
            </div>
          </div>
          
          <EarnConvex />
          <EarnSaddle />
          <EarnVelo />
          <EarnBeets />
          </div>
          <br/>
          <br/>
          <h2>Other Opportunities</h2>
          <span>
            Some of the opportunities below might utilize liquidity pools in the background.
            <br/>We separated them out into this section, as they enable different/interesting use-cases on top of those liquidity pools.
            <br/>Please make sure you understand the risks associated with each protocol.
          </span>
          <br/>
          <div className="earn-yield-wrapper">
          
          <div className="earn-yield-row">
            <div className="earn-yield-strat">
              <b>Strategy</b>
            </div>
            <div className="earn-yield-chain">
              <b>Chain</b>
            </div>
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.png').default } alt="alUSD logo" className="image" />/<img src={ require('../logos/aleth.png').default } alt="alETH logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <b>Rewards</b>
            </div>
            <div className="earn-yield-yield">
              <b>Yield</b>
            </div>
            <div className="earn-yield-link">
              <b>Link</b>
            </div>
          </div>
          <EarnPremia />
          <EarnTokemak />
          <EarnIdle />
          <EarnElement />
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <h2>Protocol Descriptions</h2>
      <div className="description-all">
        <ConvexDescription />
        <SaddleDescription />
        <VelodromeDescription />
        <BeetsDescription />

        <PremiaDescription />
        <TokemakDescription />
        <IdleDescription />
        <ElementDescription />
      </div>

    </div>;
  }
}