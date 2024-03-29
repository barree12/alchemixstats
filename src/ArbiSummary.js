import React from 'react';

export default class ArbiSummary extends React.Component {

    render(){
        return (
          <>
            <div className="summary">
                <div className="small-table">
                    <h3>Arbitrum Deposits and Deposit Caps</h3>
                    <div className="small-table-inner-2">
                    <span className="small-table-row"></span><span className="table-text-bold">TVL</span><span className="table-text-bold">Deposit cap</span>
                    <span className="small-table-row"><img src={ require('./logos/aave_usdc.png').default } alt="USDC logo" className="image" />aUSDC</span><span className="important-2">${this.props.arbiTvl.aUsdc[this.props.arbiTvl.aUsdc.length-1]}M</span><span className="table-text-bold">${Math.round(this.props.v2Caps.optiAUsdc/10000)/100}M</span>
                    <span className="small-table-row"><img src={ require('./logos/aave_eth.png').default } alt="Aave WETH logo" className="image" />aWETH</span><span className="important-4"><span>${}M</span><i>({} ETH)</i></span><span className="table-text-bold">{Math.round(this.props.v2Caps.optiAWeth)} ETH</span>
                    <span className="small-table-row-2">TOTAL</span><span className="important-3">${}M</span>
                    </div>
                </div>
            </div>
          </>
        );
    }
}