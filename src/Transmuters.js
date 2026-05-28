import React from 'react';
import ChartMainnetTransmuterUsd from './charts/ChartMainnetTransmuterUsd';
import ChartMainnetTransmuterEth from './charts/ChartMainnetTransmuterEth';
import ChartOptiTransmuterUsd from './charts/ChartOptiTransmuterUsd';
import ChartOptiTransmuterEth from './charts/ChartOptiTransmuterEth';
import ChartArbiTransmuterUsd from './charts/ChartArbiTransmuterUsd';
import ChartArbiTransmuterEth from './charts/ChartArbiTransmuterEth';
//import { Switch } from '@mui/material';
import OptiSummary from './OptiSummary';
import ArbiSummary from './ArbiSummary';
import LoadingComponent from './LoadingComponent';
import { formatDate, datesEqual, wait  } from './Functions';

export default class Transmuters extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };
      }

      componentDidMount(){
      }



    render(){
        return (
            <>
                <div className="section-header">
                    <img src={ require('./logos/vaults.svg').default } alt="Vault logo" className="image3" />
                    <h2>Transmuters</h2>
                </div>
                <div className="summary">
                </div>

                <div className="section-wrapper">
                    <div className="chart-title">
                      <h3>Mainnet USD Transmuter TVL</h3>
                      <ChartMainnetTransmuterUsd transmuterStats={this.props.transmuterStats} />
                    </div>
                    <div className="chart-title">
                      <h3>Mainnet ETH Transmuter TVL</h3>
                      <ChartMainnetTransmuterEth transmuterStats={this.props.transmuterStats} />
                    </div>
                </div>
                <div className="section-wrapper">
                    <div className="chart-title">
                    <h3>Optimism USD Transmuter TVL</h3>
                    <ChartOptiTransmuterUsd transmuterStats={this.props.transmuterStats} />
                    </div>
                    <div className="chart-title">
                    <h3>Optimism ETH Transmuter TVL</h3>
                    <ChartOptiTransmuterEth transmuterStats={this.props.transmuterStats} />
                    </div>
                </div>
                <div className="section-wrapper">
                    <div className="chart-title">
                    <h3>Arbitrum USD Transmuter TVL</h3>
                    <ChartArbiTransmuterUsd transmuterStats={this.props.transmuterStats} />
                    </div>
                    <div className="chart-title">
                    <h3>Arbitrum ETH Transmuter TVL</h3>
                    <ChartArbiTransmuterEth transmuterStats={this.props.transmuterStats} />
                    </div>
                </div>
            </>
        );
    }
}