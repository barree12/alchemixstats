import React from 'react';
import ChartHarvestsUsd from './charts/ChartHarvestsUsd';
import ChartHarvestsEth from './charts/ChartHarvestsEth';

export default class Harvests extends React.Component {

    render(){
        return (
            <>
                <div className="section-header">
                    <img src={ require('./logos/harvests_thin.svg').default } alt="harvest logo" className="image3" />
                    <h2>Harvests</h2>
                </div>
                <div className="summary">
                    Harvests are denominated in the underlying assets, i.e. DAI, USDC, USDT, ETH, etc. and not the yield token that is harvested.<br/>
                    Thus the legends on the charts only show which vault was harvested, but the displayed value is in the underlying asset.
                </div>
                <div className="section-wrapper">
                    <div className="chart-title">
                    <h3>Stablecoin Harvests</h3>
                        <ChartHarvestsUsd harvests={this.props.harvests} />
                    </div>
                    <div className="chart-title">
                    <h3>Eth Harvests</h3>
                        <ChartHarvestsEth harvests={this.props.harvests} />
                    </div>
                </div>
            </>
        );
    }
}