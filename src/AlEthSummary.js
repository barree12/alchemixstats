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
        const alEthInFrxEthCrvUsd = Math.round(this.props.lps.alEthInFrxEthCrv*this.props.ethPrice/10000)/100;
        const frxEthInFrxEthCrvUsd = Math.round(this.props.lps.frxEthInFrxEthCrv*this.props.ethPrice/10000)/100;
        const alEthInArbiWethUsd = Math.round(this.props.lps.alEthInArbiWeth*this.props.ethPrice/10000)/100;
        const wethInArbiWethUsd = Math.round(this.props.lps.wethInArbiWeth*this.props.ethPrice/10000)/100;

        return (
            <div className="summary">
                <span>To see the current APR of each pool, head over to the <Link to="/earn">Earn subpage</Link></span>
                {/*<h3>Backing surplus</h3>
                <span>Mainnet backing surplus: <b>{styleNumber(Math.round(this.props.surplus.alEthMainnet))} alETH</b></span>
                <br/>
                <span>(+) Elixir held alETH backing in LPs: <b>{styleNumber(Math.round(this.props.surplus.alEthBackingTokensInElixir))}</b></span>
                <span>(+) ETH in Transmuters: <b>{styleNumber(Math.round(this.props.surplus.ethInTransmuterBuffer))}</b></span>
                <span>(+) Protocol-owned ETH in V1 contracts: <b>{styleNumber(Math.round(this.props.surplus.alEthInV1))}</b></span>
                <span>(+) Elixir held idle alETH: <b>{styleNumber(Math.round(this.props.surplus.alEthInElixir))}</b></span>
                <span>Mainnet alETH supply: <b>{styleNumber(Math.round(this.props.surplus.alEthSupply))}</b></span>                
                <span>(-)Mainnet V2 total debt: <b>{styleNumber(Math.round(this.props.surplus.alEthDebt))}</b></span>
                <span>(-)Mainnet V1 total debt: <b>{styleNumber(Math.round(this.props.surplus.alEthDebtV1))}</b></span>
                <br/>
                Surplus -&gt; alETH_supply - total_debt &gt; protocol_held_funds*/}<br/>
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
                      <span className="table-text-title">Arbi WETH</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alETH</span>
                      <span className="important-2">${alEthInArbiWethUsd}M</span>
                      <span className="important-2"><i>({Math.round(this.props.lps.alEthInArbiWeth)})</i></span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">WETH</span>
                      <span className="important-2">${wethInArbiWethUsd}M</span>
                      <span className="important-2"><i>({Math.round(this.props.lps.wethInArbiWeth)})</i></span>
                    </span>
                    <span className="small-table-cell-disappear">
                      <span></span>
                      <span></span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">Total</span>
                      <span className="important-2">${Math.round((alEthInArbiWethUsd + wethInArbiWethUsd)*100)/100}M</span>
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