import React from 'react';

export default class EmissionWeights extends React.Component {

    render(){
        return (
            <div className="content-tab">
                <div className="box-wrapper">
                    <h3>Emission Weights</h3>
                    <div className="weight-table">
                        <div className="weight-table-column">
                            <span className="table-title">Staking (33%)</span>
                            <div className="weight-table-row">
                            <img src={ require('./logos/alcx_eth.png').default } alt="ALCX-ETH BPT" className="image" />
                            <div className="table-item-1">ALCX-ETH BPT</div>
                            <div className="table-item-2">20%</div>
                            </div>
                            <div className="weight-table-row">
                            <img src={ require('./logos/alcx_logo.png').default } alt="ALCX" className="image" />
                            <div className="table-item-1">gALCX</div>
                            <div className="table-item-2">13%</div>
                            </div>
                        </div>
                        <div className="weight-table-column">
                            <span className="table-title">alAssets (67%)</span>
                            <div className="weight-table-row">
                            <img src={ require('./logos/eth_aleth.png').default } alt="alETH-ETH" className="image" />
                            <div className="table-item-1">alETH Curve</div>
                            <div className="table-item-2">-</div>
                            </div>
                            <div className="weight-table-row">
                            <img src={ require('./logos/frax_crv.png').default } alt="d3pool" className="image" />
                            <div className="table-item-1">FraxBP Curve</div>
                            <div className="table-item-2">31%</div>
                            </div>
                            <div className="weight-table-row">
                            <img src={ require('./logos/alusd_crv.png').default } alt="alUSD" className="image" />
                            <div className="table-item-1">alUSD3CRV</div>
                            <div className="table-item-2">5%</div>
                            </div>
                        </div>
                        {/*<div className="weight-table-column">
                            <span className="table-title">FTM & Arbitrum (2.5%)</span>
                            <div className="weight-table-row">
                            <img src={ require('./logos/alusd_beets.png').default } alt="alUSD-USDC pool" className="image" />
                            <div className="table-item-1">Beets alUSD</div>
                            <div className="table-item-2">1%</div>
                            </div>
                            <div className="weight-table-row">
                            <img src={ require('./logos/alcx_ftm.png').default } alt="gALCX-FTM LP" className="image" />
                            <div className="table-item-1">SpookySwap gALCX/FTM</div>
                            <div className="table-item-2">0.5%</div>
                            </div>
                            <div className="weight-table-row">
                            <img src={ require('./logos/l2d4.png').default } alt="l2d4" className="image" />
                            <div className="table-item-1">Saddle L2D4</div>
                            <div className="table-item-2">1%</div>
                            </div>
        </div>*/}
                    </div>
                    <br/>
                    <span>alETH incentives were halted after the Curve hack. They are expected to be restarted after affected LPs are partially reimbursed.</span>
                    <span>Some gauges require a constant amount of rewards in terms of ALCX, so percentages can change slightly as a result of decreasing overall emissions.</span>
                </div>
            </div>
        );
    }
}