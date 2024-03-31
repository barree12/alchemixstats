import React from 'react';
import { Link } from "react-router-dom";
import { styleNumber } from './Functions';

export default class AlEthSummary extends React.Component {

    render(){
        const alEthInCrvUsd = Math.round(this.props.lps.alEthInAlEthWethCrv*this.props.ethPrice/10000)/100;
        const alEthInSaddleUsd = Math.round(this.props.lps.alEthInSaddle*this.props.ethPrice/10000)/100;
        const ethInCrvUsd = Math.round(this.props.lps.wethInAlEthWethCrv*this.props.ethPrice/10000)/100;
        const wethInSaddleUsd = Math.round(this.props.lps.wethInSaddle*this.props.ethPrice/10000)/100;
        const sEthInSaddleUsd = Math.round(this.props.lps.sEthInSaddle*this.props.ethPrice/10000)/100;
        const alEthInVelodromeUsd = Math.round(this.props.lps.alEthInVelodrome*this.props.ethPrice/10000)/100;
        const wethInVelodromeUsd = Math.round(this.props.lps.wethInVelodrome*this.props.ethPrice/10000)/100;
        const alEthInVeloFxsEthAlEthUsd = Math.round(this.props.lps.alEthInVeloFxsEthAlEth*this.props.ethPrice/10000)/100;
        const fxsEthInVeloFxsEthAlEthUsd = Math.round(this.props.lps.fxsEthInVeloFxsEthAlEth*this.props.ethPrice/10000)/100;
        const alEthInFrxEthCrvUsd = Math.round(this.props.lps.alEthInFrxEthCrv*this.props.ethPrice/10000)/100;
        const frxEthInFrxEthCrvUsd = Math.round(this.props.lps.frxEthInFrxEthCrv*this.props.ethPrice/10000)/100;
        return (
            <div className="summary">
                alETH supply grows when people deposit collateral assets and borrow alETH against them.<br/>
                The supply contracts when people repay their outstanding debt using alETH or when they use the transmuter to exchange alETH for collateral assets.<br/>
                In these cases the protocol burns the alETH tokens and the total supply decreases.<br></br>
                Currently, the following collateral types are supported:<br/>
                <div className="small-table-2">
                <div className="tokens"><img src={ require('./logos/eth.png').default } alt="eth token" className="image" />ETH</div>
                <div className="tokens"><img src={ require('./logos/steth.png').default } alt="wstETH token" className="image" />wstETH</div>
                <div className="tokens"><img src={ require('./logos/reth.png').default } alt="reth token" className="image" />rETH</div>
                <div className="tokens"><img src={ require('./logos/frxeth.png').default } alt="frxeth token" className="image" />frxETH</div>
                </div>
                The transmuter always exchanges 1 alETH for 1 ETH<br/>
                Thus it is an important goal of the protocol to maintain a price that is reasonably close to 1 ETH for alETH.<br/>
                <br/>
                <span>To see the current APR of each pool, head over to the <Link to="/earn">Earn subpage</Link></span>
                <h3>Backing surplus</h3>
                <span>Mainnet backing surplus: <b>{styleNumber(Math.round(this.props.surplus.alEthMainnet))} alETH</b></span>
                <h3>Liquidity pools</h3>
                <div className="small-table-3">
                  <div className="small-table-inner-5">
                    <span className="small-table-cell-title">
                      <img src={ require('./logos/aleth_frxeth.png').default } alt="alEth FrxEth logo" className="image" />
                      <span className="table-text-title">Curve frxETH</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alETH</span>
                      <span className="important-2">${alEthInFrxEthCrvUsd}M</span>
                      <span className="important-2"><i>({Math.round(this.props.lps.alEthInFrxEthCrv)})</i></span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">frxETH</span>
                      <span className="important-2">${frxEthInFrxEthCrvUsd}M</span>
                      <span className="important-2"><i>({Math.round(this.props.lps.frxEthInFrxEthCrv)})</i></span>
                    </span>
                    <span className="small-table-cell-disappear">
                      <span></span>
                      <span></span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">Total</span>
                      <span className="important-2">${Math.round((alEthInFrxEthCrvUsd + frxEthInFrxEthCrvUsd)*100)/100}M</span>
                    </span>
                  </div>
                  <div className="small-table-inner-5">
                    <span className="small-table-cell-title">
                      <img src={ require('./logos/aleth_opti.png').default } alt="alEth optimism logo" className="image" />
                      <span className="table-text-title">Velo alETH</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alETH</span>
                      <span className="important-2">${alEthInVelodromeUsd}M</span>
                      <span className="important-2"><i>({Math.round(this.props.lps.alEthInVelodrome)})</i></span>
                    </span> 
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">ETH</span>
                      <span className="important-2">${wethInVelodromeUsd}M</span>
                      <span className="important-2"><i>({Math.round(this.props.lps.wethInVelodrome)})</i></span>
                    </span>  
                    <span className="small-table-cell">
                      <span></span>
                      <span></span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">Total</span>
                      <span className="important-2">${Math.round((alEthInVelodromeUsd + wethInVelodromeUsd)*100)/100}M</span>
                    </span>
                  </div>
                  <div className="small-table-inner-5">
                    <span className="small-table-cell-title">
                      <img src={ require('./logos/eth_aleth.png').default } alt="alUsd logo" className="image" />
                      <span className="table-text-title">Curve alETH</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alETH</span>
                      <span className="important-2">${alEthInCrvUsd}M</span>
                      <span className="important-2"><i>({Math.round(this.props.lps.alEthInAlEthWethCrv)})</i></span>
                    </span> 
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">ETH</span>
                      <span className="important-2">${ethInCrvUsd}M</span>
                      <span className="important-2"><i>({Math.round(this.props.lps.wethInAlEthWethCrv)})</i></span>
                    </span>  
                    <span className="small-table-cell">
                      <span></span>
                      <span></span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">Total</span>
                      <span className="important-2">${Math.round((alEthInCrvUsd + ethInCrvUsd)*100)/100}M</span>
                    </span>
                  </div>
                </div>
                <div className="small-table-3">
                  <div className="small-table-inner-13">
                    <span className="small-table-cell-title">
                      <img src={ require('./logos/aleth_frxeth.png').default } alt="alEth frxEth logo" className="image" />
                      <span className="table-text-title">Velo frxETH</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alETH</span>
                      <span className="important-2">${alEthInVeloFxsEthAlEthUsd}M</span>
                      <span className="important-2"><i>({Math.round(this.props.lps.alEthInVeloFxsEthAlEth)})</i></span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">frxETH</span>
                      <span className="important-2">${fxsEthInVeloFxsEthAlEthUsd}M</span>
                      <span className="important-2"><i>({Math.round(this.props.lps.fxsEthInVeloFxsEthAlEth)})</i></span>
                    </span>
                    <span className="small-table-cell-disappear">
                      <span></span>
                      <span></span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">Total</span>
                      <span className="important-2">${Math.round((alEthInVeloFxsEthAlEthUsd + fxsEthInVeloFxsEthAlEthUsd)*100)/100}M</span>
                    </span>
                  </div>
                  <div className="small-table-inner-5">
                    <span className="small-table-cell-title">
                      <img src={ require('./logos/aleth_saddle.png').default } alt="alEth Saddle logo" className="image" />
                      <span className="table-text-title">Saddle alETH</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alETH</span>
                      <span className="important-2">${alEthInSaddleUsd}M</span>
                      <span className="important-2"><i>({Math.round(this.props.lps.alEthInSaddle)})</i></span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">ETH</span>
                      <span className="important-2">${wethInSaddleUsd}M</span>
                      <span className="important-2"><i>({Math.round(this.props.lps.wethInSaddle)})</i></span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">sETH</span>
                      <span className="important-2">${sEthInSaddleUsd}M</span>
                      <span className="important-2"><i>({Math.round(this.props.lps.sEthInSaddle)})</i></span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">Total</span>
                      <span className="important-2">${Math.round((alEthInSaddleUsd + wethInSaddleUsd + sEthInSaddleUsd)*100)/100}M</span>
                    </span>
                  </div>
                </div>
            </div>
        );
    }
}


/*
<div className="small-table-inner-13">
                    <span className="small-table-cell-title">
                      <img src={ require('./logos/aleth_pcs.png').default } alt="alEth Pcs logo" className="image" />
                      <span className="table-text-title">PCS alETH</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alETH</span>
                      <span className="important-2">${alEthInPcsUsd}M</span>
                      <span className="important-2"><i>({Math.round(this.props.lps.alEthInPcs)})</i></span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">ETH</span>
                      <span className="important-2">${ethInPcsUsd}M</span>
                      <span className="important-2"><i>({Math.round(this.props.lps.ethInPcs)})</i></span>
                    </span>
                    <span className="small-table-cell-disappear">
                      <span></span>
                      <span></span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">Total</span>
                      <span className="important-2">${Math.round((alEthInPcsUsd + ethInPcsUsd)*100)/100}M</span>
                    </span>
                  </div>*/