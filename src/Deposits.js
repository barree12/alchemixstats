import React from 'react';
import ChartMainnetAlchemistUsdTVL from './charts/ChartMainnetAlchemistUsdTVL';
import ChartMainnetAlchemistEthTVL from './charts/ChartMainnetAlchemistEthTVL';
import ChartOptiAlchemistTVL from './charts/ChartOptiAlchemistTVL';
import ChartOptiAlchemistEthTVL from './charts/ChartOptiAlchemistEthTVL';
import ChartArbiAlchemistTVL from './charts/ChartArbiAlchemistTVL';
import ChartArbiAlchemistEthTVL from './charts/ChartArbiAlchemistEthTVL';
//import { Switch } from '@mui/material';
import OptiSummary from './OptiSummary';
import ArbiSummary from './ArbiSummary';
import LoadingComponent from './LoadingComponent';
import { formatDate, datesEqual, wait  } from './Functions';

export default class Deposits extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          ethCurrencyToggle: true,
        };
        this.toggleEthCurrency = this.toggleEthCurrency.bind(this);
      }

      componentDidMount(){
      }

    toggleEthCurrency(){
        this.setState({ ethCurrencyToggle: !this.state.ethCurrencyToggle });
    }



    render(){
        return (
            <>
                <div className="section-header">
                    <img src={ require('./logos/vaults.svg').default } alt="Vault logo" className="image3" />
                    <h2>Deposits</h2>
                </div>
                <div className="summary">
                        Alchemix is currently running on its v3 contracts. All deposits from v1 and v2 have been migrated to v3.<br/>
                        Below, you can find the total value of deposits in Alchemist v3, as well as the deposit cap for each token. <br/>
                        The charts show the historical TVL of the v3 Alchemists on mainnet, Optimism, and Arbitrum.
                        <div className="tvl-tables-2">
                        <div className="small-table">
                            <h3>Alchemist Deposits</h3>
                            <div className="small-table-inner-2">
                            <span className="small-table-row"></span><span className="table-text-bold">TVL</span><span className="table-text-bold">Deposit cap</span>
                            <span className="small-table-row"><img src={ require('./logos/usdc.png').default } alt="USDC logo" className="image" />USDC</span><span className="important-2">${this.props.alchemistStats.usdMainnetMyt[this.props.alchemistStats.usdMainnetMyt.length-1]}M</span><span className="table-text-bold">${}M</span>
                            <span className="small-table-row"><img src={ require('./logos/eth.png').default } alt="ETH logo" className="image" />WETH</span><span className="important-4"><span>${this.props.v3MainnetAlchemistEthTvlUsd}M</span><i>({this.props.alchemistStats.ethMainnetMyt[this.props.alchemistStats.ethMainnetMyt.length-1]} ETH)</i></span><span className="table-text-bold">{} ETH</span>

                            <span className="small-table-row-2">TOTAL</span><span className="important-3">${Math.round((this.props.alchemistStats.usdMainnetMyt[this.props.alchemistStats.usdMainnetMyt.length-1] + this.props.v3MainnetAlchemistEthTvlUsd)*100)/100}M</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section-wrapper">
                    <div className="chart-title">
                      <h3>Alchemist V3 Stablecoin TVL</h3>
                      <ChartMainnetAlchemistUsdTVL alchemistStats={this.props.alchemistStats} />
                    </div>
                    <div className="chart-title">
                      <h3>Alchemist V3 ETH TVL</h3>
                      <ChartMainnetAlchemistEthTVL alchemistStats={this.props.alchemistStats} />
                    </div>
                </div>
                <OptiSummary alchemistStats={this.props.alchemistStats} v3OptimismAlchemistEthTvlUsd={this.props.v3OptimismAlchemistEthTvlUsd} />
                <div className="section-wrapper">
                    <div className="chart-title">
                    <h3>Optimism Stablecoin TVL</h3>
                    <ChartOptiAlchemistTVL alchemistStats={this.props.alchemistStats} />
                    </div>
                    <div className="chart-title">
                    <h3>Optimism ETH TVL</h3>
                    <ChartOptiAlchemistEthTVL alchemistStats={this.props.alchemistStats} />
                    </div>
                </div>
                
                <ArbiSummary alchemistStats={this.props.alchemistStats} v3ArbitrumAlchemistEthTvlUsd={this.props.v3ArbitrumAlchemistEthTvlUsd} />
                <div className="section-wrapper">
                    <div className="chart-title">
                    <h3>Arbitrum Stablecoin TVL</h3>
                    <ChartArbiAlchemistTVL alchemistStats={this.props.alchemistStats} />
                    </div>
                    <div className="chart-title">
                    <h3>Arbitrum ETH TVL</h3>
                    <ChartArbiAlchemistEthTVL alchemistStats={this.props.alchemistStats} />
                    </div>
                </div>
            </>
        );
    }
}