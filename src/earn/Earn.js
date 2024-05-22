import React, { Component } from 'react';
//import EarnPremia from './EarnPremia';
import EarnConvex from './EarnConvex';
import EarnVelo from './EarnVelo';
import EarnRamses from './EarnRamses';
//import EarnPancakeSwap from './EarnPancakeSwap';
import '../App.css';
import ConvexDescription from './description/ConvexDescription';
import VelodromeDescription from './description/VelodromeDescription';
import PremiaDescription from './description/PremiaDescription';
import IdleDescription from './description/IdleDescription';
//import PancakeSwapDescription from './description/PancakeSwapDescription';
import { Link } from 'react-router-dom';

export default class Earn extends Component {
  render() {
    return <div className="App">
      <div className="header-container">
        <div className="header-style">
          <img className="alchemix-logo" src={ require('../logos/alchemix-earn-logo.svg').default } alt="ALCX earn logo" />
        </div>
        <div className="header-switcher">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img className="header-button" src={ require('../logos/stats_inactive.svg').default } alt="stats button" />
          </Link>
          <Link to="/earn" style={{ textDecoration: 'none' }}>
            <img className="header-button" src={ require('../logos/earn_active.svg').default } alt="earn button" />
          </Link>
        </div>
      </div>
      <div className="earn-top">
        Have you wondered what to do with your alUSD or alETH loan after using the Alchemix vaults?<br />
        While swapping to other assets is always an option, there are plenty of opportunities to earn yield on alAssets directly.<br />
        These opportunities in most cases provide good potential returns.
      </div>
      <div className="earn-yield-wrapper">
        <h2>
          Standard Liquidity Pools
        </h2>
        <span>
          Liquidity pools are what AMMs (Automated Market Makers) rely on to facilitate token swaps.
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
              <img src={ require('../logos/alusd.svg').default } alt="alUSD logo" className="image" />/<img src={ require('../logos/aleth_blue.svg').default } alt="alETH logo" className="image" />
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
          <EarnVelo />
          <EarnRamses />
          {/*<EarnPancakeSwap />*/}
          </div>
          <br/>
          <h2>
            Compounder services
          </h2>
          Compounder services deploy in the pools displayed above, but automate the reward collection and reinvestment cycle.
          <br/>After depositing, users do not need to do anything just let compound interest work its magic.
          <br/>On occasion, these services provide additional incentives on top of the base yield, so make sure to check them out.
          <br/>
          <div className="compounders">
            <div className="compounder-row">
              <div className="earn-yield-protocol-name">
                <img src={ require('../logos/beefy.png').default } alt="Convex logo" className="image" /> Beefy Finance
              </div>
              <div className="earn-yield-link-2"><a href="https://beefy.com" target="_blank" rel="noreferrer">Go to Beefy</a></div>
            </div>
            <div className="compounder-row">
              <div className="earn-yield-protocol-name">
                <img src={ require('../logos/pickle.png').default } alt="Convex logo" className="image" /> Pickle Finance
              </div>
              <div className="earn-yield-link-2"><a href="https://www.pickle.finance" target="_blank" rel="noreferrer">Go to Pickle</a></div>
            </div>
            <div className="compounder-row">
              <div className="earn-yield-protocol-name">
                <img src={ require('../logos/concentrator.png').default } alt="Convex logo" className="image" /> Concentrator
              </div>
              <div className="earn-yield-link-2"><a href="https://concentrator.aladdin.club" target="_blank" rel="noreferrer">Go to Concentrator</a></div>
            </div>
          </div>
            
          <br/>
          {/*<h2>Other Opportunities</h2>
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
              <img src={ require('../logos/alusd.svg').default } alt="alUSD logo" className="image" />/<img src={ require('../logos/aleth_blue.svg').default } alt="alETH logo" className="image" />
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
          {/*<EarnTokemak />}
          <EarnIdle />
          {<EarnElement />}
  </div>*/}
      </div>
      <br/>
      <h2>Protocol Descriptions</h2>
      <div className="description-all">
        <ConvexDescription />
        <VelodromeDescription />
        <PremiaDescription />
        {/*<BeetsDescription />*/}
        {/*<PancakeSwapDescription />*/}
        <IdleDescription />

      </div>

    </div>;
  }
}