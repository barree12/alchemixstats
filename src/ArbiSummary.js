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
                        <span className="small-table-row"><img src={ require('./logos/usdc.png').default } alt="USDC logo" className="image" />USDC</span><span className="important-2">${this.props.alchemistStats.usdArbitrumMyt[this.props.alchemistStats.usdArbitrumMyt.length-1]}M</span><span className="table-text-bold">${}M</span>
                        <span className="small-table-row"><img src={ require('./logos/eth.png').default } alt="ETH logo" className="image" />WETH</span><span className="important-4"><span>${this.props.v3ArbitrumAlchemistEthTvlUsd}M</span><i>({this.props.alchemistStats.ethArbitrumMyt[this.props.alchemistStats.ethArbitrumMyt.length-1]} ETH)</i></span><span className="table-text-bold">{} ETH</span>

                        <span className="small-table-row-2">TOTAL</span><span className="important-3">${Math.round((this.props.alchemistStats.usdArbitrumMyt[this.props.alchemistStats.usdArbitrumMyt.length-1] + this.props.v3ArbitrumAlchemistEthTvlUsd)*100)/100}M</span>
                    </div>
                </div>
            </div>
          </>
        );
    }
}