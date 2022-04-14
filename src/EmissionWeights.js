import React from 'react';

export default class EmissionWeights extends React.Component {

    render(){
        return (
            <div className="content-tab">
                <div className="box-wrapper">
                    <h3>Emission Weights</h3>
                    <div className="weight-table">
                    <div className="weight-table-column">
                        <span className="table-title">Staking (42%)</span>
                        <div className="weight-table-row">
                        <img src={ require('./logos/alcx_eth_slp.png').default } alt="ALCX-ETH SLP" className="image" />
                        <div className="table-item-1">ALCX/ETH SLP</div>
                        <div className="table-item-2">20%</div>
                        </div>
                        <div className="weight-table-row">
                        <img src={ require('./logos/talcx.png').default } alt="tALCX" className="image" />
                        <div className="table-item-1">tALCX</div>
                        <div className="table-item-2">12%</div>
                        </div>
                        <div className="weight-table-row">
                        <img src={ require('./logos/alcx_logo.png').default } alt="ALCX" className="image" />
                        <div className="table-item-1">ALCX</div>
                        <div className="table-item-2">10%</div>
                        </div>
                    </div>
                    <div className="weight-table-column">
                        <span className="table-title">Bonds (40%)</span>
                        <div className="weight-table-row">
                        <img src={ require('./logos/cvx.png').default } alt="CVX logo" className="image" />
                        <div className="table-item-1">CVX</div>
                        <div className="table-item-2">17.5%</div>
                        </div>
                        <div className="weight-table-row">
                        <img src={ require('./logos/alcx_eth_slp.png').default } alt="ALCX-ETH SLP" className="image" />
                        <div className="table-item-1">ALCX/ETH SLP</div>
                        <div className="table-item-2">10%</div>
                        </div>
                        <div className="weight-table-row">
                        <img src={ require('./logos/eth.png').default } alt="ETH logo" className="image" />
                        <div className="table-item-1">ETH</div>
                        <div className="table-item-2">5%</div>
                        </div>
                        <div className="weight-table-row">
                        <img src={ require('./logos/dai.png').default } alt="DAI logo" className="image" />
                        <div className="table-item-1">DAI</div>
                        <div className="table-item-2">5%</div>
                        </div>
                        <div className="weight-table-row">
                        <img src={ require('./logos/tokemak.png').default } alt="Toke" className="image" />
                        <div className="table-item-1">Toke</div>
                        <div className="table-item-2">2.5%</div>
                        </div>
                    </div>
                    <div className="weight-table-column">
                        <span className="table-title">alAsset liquidity (18%)</span>
                        <div className="weight-table-row">
                        <img src={ require('./logos/alusd.png').default } alt="alUSD" className="image" />
                        <div className="table-item-1">alUSD3CRV</div>
                        <div className="table-item-2">8%</div>
                        </div>
                        <div className="weight-table-row">
                        <img src={ require('./logos/eth_aleth.png').default } alt="alETH-ETH" className="image" />
                        <div className="table-item-1">alETHCRV</div>
                        <div className="table-item-2">6%</div>
                        </div>
                        <div className="weight-table-row">
                        <img src={ require('./logos/d3pool.png').default } alt="d3pool" className="image" />
                        <div className="table-item-1">d3pool</div>
                        <div className="table-item-2">2%</div>
                        </div>
                        <div className="weight-table-row">
                        <img src={ require('./logos/aleth_saddle.png').default } alt="alETH Saddle" className="image" />
                        <div className="table-item-1">alETHSaddle</div>
                        <div className="table-item-2">2%</div>
                        </div>
                    </div>
                    </div>
                    <div className="normal-content">Latest adjustments to emissions: <a target="_blank" rel="noreferrer" href="https://snapshot.org/#/alchemixstakers.eth/proposal/0xe111e77d0bcc78d2c7c994c38ec1e915b1b50a306f9d90fa09b1e78db71eba12">
                    AIP-31</a>, <a target="_blank" rel="noreferrer" href="https://snapshot.org/#/alchemixstakers.eth/proposal/0xa1737555482930ca3687b3ed0c955f32fe204b19216290b43a77c099a41ebf85">
                    AIP-32</a>, <a target="_blank" rel="noreferrer" href="https://snapshot.org/#/alchemixstakers.eth/proposal/0xe476e3a4bc6749e3e980b2aed3db7af63e95792ff45c626d717a213dcae96e41">
                    AIP-34</a></div>
                </div>
            </div>
        );
    }
}