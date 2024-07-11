import React from 'react';

export default class OptiSummary extends React.Component {

    render(){
        return (
          <>
            <div className="summary">
                <div className="small-table">
                    <h3>Optimism Deposits and Deposit Caps</h3>
                    <div className="small-table-inner-2">
                    <span className="small-table-row"></span><span className="table-text-bold">TVL</span><span className="table-text-bold">Deposit cap</span>
                    <span className="small-table-row"><img src={ require('./logos/aave_dai.png').default } alt="DAI logo" className="image" />aDAI</span><span className="important-2">${this.props.optiTvl.aDai[this.props.optiTvl.aDai.length-1]}M</span><span className="table-text-bold">${Math.round(this.props.v2Caps.optiADai/10000)/100}M</span>
                    <span className="small-table-row"><img src={ require('./logos/aave_usdc.png').default } alt="USDC logo" className="image" />aUSDC</span><span className="important-2">${this.props.optiTvl.aUsdc[this.props.optiTvl.aUsdc.length-1]}M</span><span className="table-text-bold">${Math.round(this.props.v2Caps.optiAUsdc/10000)/100}M</span>
                    <span className="small-table-row"><img src={ require('./logos/aave_usdt.png').default } alt="USDT logo" className="image" />aUSDT</span><span className="important-2">${this.props.optiTvl.aUsdt[this.props.optiTvl.aUsdt.length-1]}M</span><span className="table-text-bold">${Math.round(this.props.v2Caps.optiAUsdt/10000)/100}M</span>
                    <span className="small-table-row"><img src={ require('./logos/aave_eth.png').default } alt="Aave WETH logo" className="image" />aWETH</span><span className="important-4"><span>${this.props.optiAWethUsdTVL}M</span><i>({this.props.optiAWethTVL} ETH)</i></span><span className="table-text-bold">{Math.round(this.props.v2Caps.optiAWeth)} ETH</span>
                    <span className="small-table-row"><img src={ require('./logos/steth.png').default } alt="wstETH logo" className="image" />wstETH</span><span className="important-4"><span>${this.props.optiWstEthUsdTVL}M</span><i>({this.props.optiWstEthTVL} ETH)</i></span><span className="table-text-bold"></span>
                    <span className="small-table-row-2">TOTAL</span><span className="important-3">${Math.round((this.props.optiTvl.aDai[this.props.optiTvl.aDai.length-1] + this.props.optiTvl.aUsdc[this.props.optiTvl.aUsdc.length-1] + this.props.optiTvl.aUsdt[this.props.optiTvl.aUsdt.length-1] + this.props.optiAWethUsdTVL + this.props.optiWstEthUsdTVL)*100)/100}M</span>
                    </div>
                </div>
            </div>
          </>
        );
    }
}