import React from 'react';
import ChartCrvPoolRatios from './charts/ChartCrvPoolRatios';
//import { Button, ButtonGroup } from '@mui/material';
import { MultifarmProvider, Dashboard, DASHBOARD_TABS_VARIANTS } from "@multifarm/widget";
import "@multifarm/widget/dist/alchemix.css";

export default class Elixir extends React.Component {

    constructor(props) {
        super(props);
      }

    render(){
        let strategyTypesObject = {
            collateral: {
                active: false,
            },
            debt: {
                active: false,
            }
        }
        let apiKey = 'rBs3Kau4a_AQegm2LJQ2ldRBrvCoFfQb';
        return (
            <>
                <div className="section-header">
                    <img src={ require('./logos/transmuter.svg').default } alt="Transmuter logo" className="image3" />
                    <h2>Elixir</h2>
                </div>

            <div className="section-wrapper">
            <div className="summary">
                There are 3 addresses for the alUSD and alETH Elixirs.<br/>
                The Elixirs are the AMOs (Algorithmic Market Operator) of Alchemix.<br/>
                <span>
                    <a target="_blank" rel="noreferrer" href="https://zapper.fi/account/0x06378717d86b8cd2dba58c87383da1eda92d3495">
                    alUSDFRAXBP Elixir</a>, <a target="_blank" rel="noreferrer" href="https://zapper.fi/account/0x9735f7d3ea56b454b24ffd74c58e9bd85cfad31b">
                    alUSD3CRV Elixir</a>, <a target="_blank" rel="noreferrer" href="https://zapper.fi/account/0xe761bf731a06fe8259fee05897b2687d56933110">
                    alETH Elixir</a>
                </span>
            </div>
            </div>
            <div className="section-wrapper">
                <div className="chart-title">
                <h3>Curve Pool Ownership</h3>
                {this.props.multifarmDataLoading ? "Loading..." :
                        <ChartCrvPoolRatios 
                            alAssetCrvSupply={this.props.alAssetCrvSupply}
                            multifarmData={this.props.multifarmData}
                            alEthCrvTotalValue={this.props.alEthCrvTotalValue}
                        />}
                    </div>
            </div>
            <div className="multifarm-wrapper">
                <MultifarmProvider
                    token={apiKey}
                    theme="alchemix"
                    provider="alchemix"
                    themeColors="dark"
                    badgePlacement="bottom"
                    strategyTypesConfig={strategyTypesObject}
                    dashboardTabs={[DASHBOARD_TABS_VARIANTS.PORTFOLIO_ALLOCATION, DASHBOARD_TABS_VARIANTS.STRATEGIES_PERFORMANCE]}>
                    <Dashboard />
                </MultifarmProvider>
            </div>
            </>
        );
    }
}