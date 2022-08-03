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
                            <img src={ require('./logos/alcx_eth_slp.png').default } alt="ALCX-ETH SLP" className="image" />
                            <div className="table-item-1">ALCX/ETH SLP</div>
                            <div className="table-item-2">20%</div>
                            </div>
                            <div className="weight-table-row">
                            <img src={ require('./logos/alcx_logo.png').default } alt="ALCX" className="image" />
                            <div className="table-item-1">gALCX</div>
                            <div className="table-item-2">13%</div>
                            </div>
                        </div>
                        <div className="weight-table-column">
                            <span className="table-title">alAsset liquidity (24%)</span>
                            <div className="weight-table-row">
                            <img src={ require('./logos/alusd_crv.png').default } alt="alUSD" className="image" />
                            <div className="table-item-1">alUSD3Crv</div>
                            <div className="table-item-2">11%</div>
                            </div>
                            <div className="weight-table-row">
                            <img src={ require('./logos/eth_aleth.png').default } alt="alETH-ETH" className="image" />
                            <div className="table-item-1">alETHCrv</div>
                            <div className="table-item-2">9%</div>
                            </div>
                            <div className="weight-table-row">
                            <img src={ require('./logos/frax_crv.png').default } alt="d3pool" className="image" />
                            <div className="table-item-1">FraxBPCrv</div>
                            <div className="table-item-2">2%</div>
                            </div>
                            <div className="weight-table-row">
                            <img src={ require('./logos/aleth_saddle.png').default } alt="alETH Saddle" className="image" />
                            <div className="table-item-1">Saddle alETH</div>
                            <div className="table-item-2">2%</div>
                            </div>
                        </div>
                        <div className="weight-table-column">
                            <span className="table-title">Fantom (4%)</span>
                            <div className="weight-table-row">
                            <img src={ require('./logos/alusd_beets.png').default } alt="alUSD-USDC pool" className="image" />
                            <div className="table-item-1">Beethoven X alUSD</div>
                            <div className="table-item-2">2.5%</div>
                            </div>
                            <div className="weight-table-row">
                            <img src={ require('./logos/alcx_ftm.png').default } alt="gALCX-FTM LP" className="image" />
                            <div className="table-item-1">Spooky Swap gALCX/FTM LP</div>
                            <div className="table-item-2">0.83%</div>
                            </div>
                            <div className="weight-table-row">
                            <img src={ require('./logos/alcx_ftm.png').default } alt="gALCX-FTM LP" className="image" />
                            <div className="table-item-1">Spirit Swap gALCX/FTM LP</div>
                            <div className="table-item-2">0.66%</div>
                            </div>
                        </div>
                    </div>
                    <div className="normal-content">As per AIP-51, 39% of emissions that were previously allocated to Olympus Pro bonds and tALCX staking have been paused and the emissions are redirected to the Alchemix Treasury.<br /></div>
                    <div className="normal-content">Latest adjustments to emissions: <a target="_blank" rel="noreferrer" href="https://snapshot.org/#/alchemixstakers.eth/proposal/0xe111e77d0bcc78d2c7c994c38ec1e915b1b50a306f9d90fa09b1e78db71eba12">
                    AIP-31</a>, <a target="_blank" rel="noreferrer" href="https://snapshot.org/#/alchemixstakers.eth/proposal/0xa1737555482930ca3687b3ed0c955f32fe204b19216290b43a77c099a41ebf85">
                    AIP-32</a>, <a target="_blank" rel="noreferrer" href="https://snapshot.org/#/alchemixstakers.eth/proposal/0xe476e3a4bc6749e3e980b2aed3db7af63e95792ff45c626d717a213dcae96e41">
                    AIP-34</a>, <a target="_blank" rel="noreferrer" href="https://snapshot.org/#/alchemixstakers.eth/proposal/0x38c2fb21a39ee061ef5b7113d3cd8b8e4954f0a0388749d62199a8d524e69b17">
                    AIP-42</a>, <a target="_blank" rel="noreferrer" href="https://snapshot.org/#/alchemixstakers.eth/proposal/0xbe4447d9317aa275662d09be1e37236e7f84c57c30c598d13d0dc7f1ce06449a">
                    AIP-49</a>, <a target="_blank" rel="noreferrer" href="https://snapshot.org/#/alchemixstakers.eth/proposal/0x96325f7f574c52c9ee8f9bec50595c6e6fe7523662b521f799213ead02d2fc3a">
                    AIP-51a</a>, <a target="_blank" rel="noreferrer" href="https://snapshot.org/#/alchemixstakers.eth/proposal/0xabc7d124a1a3777f6e9dbcf27278249288ca9f26fc9e642b0a4af8685fa6ce0a">
                    AIP-53</a></div>
                </div>
            </div>
        );
    }
}