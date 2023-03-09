import React from 'react';

export default class AlEthSummary extends React.Component {

    render(){
        const alEthInCrvUsd = Math.round(this.props.lps.alEthInCrv*this.props.ethPrice[this.props.ethPrice.length-1]/10000)/100;
        const alEthInSaddleUsd = Math.round(this.props.lps.alEthInSaddle*this.props.ethPrice[this.props.ethPrice.length-1]/10000)/100;
        const ethInCrvUsd = Math.round(this.props.lps.ethInAlEthCrv*this.props.ethPrice[this.props.ethPrice.length-1]/10000)/100;
        const wethInSaddleUsd = Math.round(this.props.lps.wethInSaddle*this.props.ethPrice[this.props.ethPrice.length-1]/10000)/100;
        const sEthInSaddleUsd = Math.round(this.props.lps.sEthInSaddle*this.props.ethPrice[this.props.ethPrice.length-1]/10000)/100;
        const alEthInVelodromeUsd = Math.round(this.props.lps.alEthInVelodrome*this.props.ethPrice[this.props.ethPrice.length-1]/10000)/100;
        const wethInVelodromeUsd = Math.round(this.props.lps.wethInVelodrome*this.props.ethPrice[this.props.ethPrice.length-1]/10000)/100;
        return (
            <div className="summary">
                alETH supply grows when people deposit collateral assets and borrow alETH against them.<br/>
                The supply contracts when people repay their outstanding debt using alETH or when they use the transmuter to exchange alETH for collateral assets.<br/>
                In these cases the protocol burns the alETH tokens and the total supply decreases.<br></br>
                Currently, the following collateral types are supported:<br/>
                <div className="small-table-2">
                <div className="tokens"><img src={ require('./logos/eth.png').default } alt="eth token" className="image" />ETH</div>
                <div className="tokens"><img src={ require('./logos/weth.png').default } alt="weth token" className="image" />WETH</div>
                <div className="tokens"><img src={ require('./logos/steth.png').default } alt="wstETH token" className="image" />wstETH</div>
                <div className="tokens"><img src={ require('./logos/reth.png').default } alt="reth token" className="image" />rETH</div>
                </div>
                The protocol deploys collateral assets into one of the supported yield strategies.<br/>
                In the case of rETH, it is only possible to deposit rETH, which is the yield strategy itself.<br/>
                Currently supported general yield options:
                <div className="small-table-2">
                <div className="tokens"><img src={ require('./logos/yearn_weth.png').default } alt="yearn weth token" className="image" /><a target="_blank" rel="noreferrer" href="https://yearn.finance/#/vault/0xa258C4606Ca8206D8aA700cE2143D7db854D168c">Yearn WETH</a></div>
                <div className="tokens"><img src={ require('./logos/aave_eth.png').default } alt="aave weth token" className="image" /><a target="_blank" rel="noreferrer" href="https://app.aave.com/reserve-overview/?underlyingAsset=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&marketName=proto_mainnet">Aave WETH</a></div>
                <div className="tokens"><img src={ require('./logos/steth.png').default } alt="wstETH token" className="image" /><a target="_blank" rel="noreferrer" href="https://lido.fi/ethereum">wstETH</a></div>
                </div>
                The transmuter always exchanges 1 alETH for 1 ETH<br/>
                Thus it is an important goal of the protocol to maintain a price that is reasonably close to 1 ETH for alETH.<br/>
                <h3>Liquidity pools</h3>
                <div className="small-table-3">
                  <div className="small-table-inner-5">
                    <span className="small-table-cell-title">
                      <img src={ require('./logos/eth_aleth.png').default } alt="alUsd logo" className="image" />
                      <span className="table-text-title">alETHCrv</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alETH</span>
                      <span className="important-2">${alEthInCrvUsd}M</span>
                      <span className="important-2"><i>({Math.round(this.props.lps.alEthInCrv)})</i></span>
                    </span> 
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">ETH</span>
                      <span className="important-2">${ethInCrvUsd}M</span>
                      <span className="important-2"><i>({Math.round(this.props.lps.ethInAlEthCrv)})</i></span>
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
                  <div className="small-table-inner-5">
                    <span className="small-table-cell-title">
                      <img src={ require('./logos/aleth_opti.png').default } alt="alEth optimism logo" className="image" />
                      <span className="table-text-title">alETH Velodrome</span>
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
                      <img src={ require('./logos/aleth_saddle.png').default } alt="D3 Cruve pool logo" className="image" />
                      <span className="table-text-title">Saddle alETH</span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">alETH</span>
                      <span className="important-2">${alEthInSaddleUsd}M</span>
                      <span className="important-2"><i>({Math.round(this.props.lps.alEthInSaddle)})</i></span>
                    </span>
                    <span className="small-table-cell">
                      <span className="table-text-bold-2">WETH</span>
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