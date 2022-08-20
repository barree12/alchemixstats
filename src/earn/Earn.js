import React, { Component } from 'react';
import EarnTokemak from './EarnTokemak';
import EarnPremia from './EarnPremia';
import EarnConvex from './EarnConvex';
import EarnSaddle from './EarnSaddle';
import EarnElement from './EarnElement';
import EarnBeets from './EarnBeets';
import EarnVelo from './EarnVelo';
import EarnIdle from './EarnIdle';
import EarnMStable from './EarnMStable';
import '../App.css';

export default class Earn extends Component {
  render() {
    return <div className="App">
      <div className="header-disclaimer">
        This service provides statistics for the Alchemix dApp (<a target="_blank" rel="noreferrer" href="https://alchemix.fi">alchemix.fi</a>) and associated crypto tokens.
      </div>
      <h1>Alchemix Earn</h1>
      <img className="header-image" src={ require('../logos/alcx_logo.png').default } alt="ALCX logo" /><br/>
        Have you wondered what to do with your alUSD or alETH loan after using the Alchemix vaults?<br />
        An obvious choice is to use Curve, Saddle or other DEXes to exchange the alAssets to other assets (such as DAI or ETH) and utilize them that way.<br />
        While the above is always an option, there are plenty of opportunities to earn yield on alAssets directly.<br />
        These opportunities in most cases provide outsized returns.<br />
      <br/>
      <div className="earn-yield-wrapper">
        <div className="earn-yield">
          <div className="earn-yield-row">
            <div className="earn-yield-strat">
              Strategy
            </div>
            
            <div className="earn-yield-chain">
              Chain
            </div>
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.png').default } alt="alUSD logo" className="image" />/<img src={ require('../logos/aleth.png').default } alt="alETH logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              Rewards
            </div>
            <div className="earn-yield-yield">
              Yield
            </div>
          </div>
          <div>
            Standard Liquidity Pools
          </div> 
          <EarnConvex />
          <EarnVelo />
          <EarnSaddle />
          <EarnBeets />
          <EarnMStable />
          
          <div>Others</div>
          <EarnPremia />
          <EarnTokemak />
          <EarnElement />
          <EarnIdle />
          
        </div>
      </div>

<div>
<h3>Tokemak alUSD Reactor</h3>
  <div>
    Tokemak is a novel protocol designed to generate deep, sustainable liquidity for DeFi and future tokenized applications that will arise throughout the growth and evolution of Web3. It is a decentralized market making platform and a liquidity router.
    <br/>There are currently two Alchemix-related reactors (pools) in Tokemak, one for ALCX, the other for alUSD. Users can deposit ALCX or alUSD and earn a yield on them in Tokemak’s native asset, TOKE.
    <br/>The system then pairs these assets with other tokens in Tokemak, such as ETH, USDC or any other asset that is voted for, creating trading pairs on decentralized exchanges.
    <br/>It is important to note that while these assets are deployed in liquidity pools, Tokemak provides protection from IL (Impermanent Loss) through their mechanics.
    <br/>
    <br/>Website: <a target="_blank" rel="noreferrer" href="https://tokemak.xyz">https://tokemak.xyz</a>
  </div>
</div>

  
  <h3>Premia Finance</h3>
  <span className="earn-summary">
    Premia Finance is a decentralized options protocol, enabling anyone to buy and sell options in a fair and liquidity-efficient way.
    <br/>Premia currently has two pools for Alchemix, the ALCX/DAI and the alETH/alUSD options pools. Users are able to deposit ALCX, DAI, alETH and alUSD and become the underwriters for these assets.
    <br/>Traders buy options to speculate on the price of ALCX and alETH, and the depositors earn the fees paid by the traders.
    <br/>
    <br/>Website: <a target="_blank" rel="noreferrer" href="https://premia.finance">https://premia.finance</a>
  </span>
      <div>
        <h3>Element Finance</h3>
        <span>
        Element Finance is a decentralized finance protocol that enables users to seek high fixed yield income in the DeFi market.
        <br/>This is made possible by the introduction of an internal AMM where these fixed rate tokens can be traded.
        <br/>Variable rate users can deposit any of the 3Crv tokens (DAI, USDC, USDT) as well as alUSD that is deposited into the alUSD3Crv pool and principal tokens are created.
        <br/>Users can buy these principal tokens to get access to a guaranteed fixed yield for a predefined amount of time (usually 6-month terms).
        <br/>
        <br/>Website: <a target="_blank" rel="noreferrer" href="https://www.element.fi">https://www.element.fi</a>
        </span>
      </div>
      <div>
        <h3>Curve & Convex</h3>
        <span>
        The main alAsset liquidity pools reside on Curve.
        <br/>Convex is designed to enchance rewards on Curve pools.
        <br/>Users first need to provide liquidity to one of the alUSD liquidity pools (alUSD3Crv or alUSDFraxBP) and then stake these LP tokens in Convex.
        <br/>
        <br/>Websites: <a target="_blank" rel="noreferrer" href="https://curve.fi">https://curve.fi</a> and <a target="_blank" rel="noreferrer" href="https://www.convexfinance.com">https://www.convexfinance.com</a>
        </span>
      </div>
      <div>
        <h3>Saddle</h3>
        <span>
        Similar to Curve, Saddle also has a gauge system where veSDL holders can direct SDL emissions to Saddle pools.
        <br/>Users need to provide liquidity to the Saddle D4 pool to start earning SDL rewards.
        <br/>
        <br/>Website: <a target="_blank" rel="noreferrer" href="https://saddle.finance">https://saddle.finance</a>
        </span>
      </div>
      <div>
        <h3>Velodrome</h3>
        <span>
        Velodrome Finance is a new AMM on the Optimism L2 chain.
        <br/>Users need to provide liquidity to the alUSD-USDC pool to start earning VELO rewards.
        <br/>
        <br/>Website: <a target="_blank" rel="noreferrer" href="https://velodrome.finance">https://velodrome.finance</a>
        </span>
      </div>
      <div>
        <h3>Beethoven X</h3>
        <span>
        alUSD liquidity on Fantom resides on the Beethoven X AMM, where BEETS (the governance token of Beethoven X) tokens are provided to liquidity providers, along with gALCX rewards.
        <br/>
        <br/>Website: <a target="_blank" rel="noreferrer" href="https://beets.fi">https://beets.fi</a>
        </span>
      </div>
      <div>
        <h3>Idle Finance</h3>
        <span>
        Idle Finance is a decentralized rebalancing protocol that allows users to automatically and algorithmically manage their digital asset allocation among different third-party DeFi protocols.
        <br/>Users can choose to maximize their interest rate returns through the Junior Tranche strategy or minimize their risk exposure through the Senior Tranche allocation strategy.
        <br/>The Senior Tranche is insured by the Junior Tranche in case of a partial loss of funds of the strategy.
        <br/>Idle currently supports the alUSD3Crv Curve pool, meaning users can earn the yield provided by the alUSD3Crv pool with higher or lower yields, depending on their risk appetite.
        <br/>
        <br/>Website: <a target="_blank" rel="noreferrer" href="https://idle.finance">https://idle.finance</a>
        </span>
      </div>
      <div>
        <h3>mStable</h3>
        <span>
        mStable allows users to deposit stablecoins (DAI, USDC, USDT, etc.) and Bitcoin variants (wBTC, renBTC, etc.).
        <br/>These deposits are used as backing for the native mUSD and mBTC tokens that users receive for their deposits.
        <br/>The mUSD stablecoin and the mBTC tokens can be staked in a “Save” contract to receive imUSD and imBTC.
        <br/>These earn yield automatically by depositing the underlying assets into lending platforms.
        <br/>mStable also operates its own AMM (Automatic Market Maker) for mUSD : stablecoin and mBTC : BTC variant pairs, where depositors can earn trading fees and mStable’s native MTA governance token.
        <br/>mStable currently offers support for alUSD in the form of an alUSD/mUSD trading pair.
        <br/>
        <br/>Website: <a target="_blank" rel="noreferrer" href="https://mstable.app">https://mstable.app</a>
        </span>
      </div>
    </div>;
  }
}