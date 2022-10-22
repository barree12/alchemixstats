import React from 'react';
import ChartCrvPoolRatios from './charts/ChartCrvPoolRatios';
import { Button, ButtonGroup } from '@mui/material';
import { MultifarmProvider, Dashboard, DASHBOARD_TABS_VARIANTS, extendTheme, defaultTheme } from "@multifarm/widget";
import "@multifarm/widget/dist/alchemix.css";

export default class Treasury extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          activeTab: 'treasury'
        };
        this.selectTab = this.selectTab.bind(this);
      }

    selectTab(tab){
        this.setState({ activeTab: tab });
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
        let apiKey = {
            treasury: 'di50relXm_XAKKAUKvZ9Igd9pVzk2gm1',
            elixirs: 'rBs3Kau4a_AQegm2LJQ2ldRBrvCoFfQb'
        }
        return (
            <>
            <img src={ require('./logos/treasury.png').default } alt="Treasury logo" className="image3" />
            <h2>Treasury and Elixirs</h2>
            <div className="section-wrapper">
            <div className="summary">
                There are 2 main treasury addresses of the Alchemix protocol, plus 2 addresses for the alUSD and alETH Elixirs.<br/>
                The Elixirs are the AMOs (Algorithmic Market Operator) of Alchemix.<br/>
                <span>
                    <a target="_blank" rel="noreferrer" href="https://zapper.fi/account/0x9e2b6378ee8ad2a4a95fe481d63caba8fb0ebbf9">
                    Treasury Wallet 1</a>, <a target="_blank" rel="noreferrer" href="https://zapper.fi/account/0x8392f6669292fa56123f71949b52d883ae57e225">
                    Treasury Wallet 2</a>, <a target="_blank" rel="noreferrer" href="https://etherscan.io/address/0x3216d2a52f0094aa860ca090bc5c335de36e6273">
                    sdCRV Controller</a>, <a target="_blank" rel="noreferrer" href="https://zapper.fi/account/0x9735f7d3ea56b454b24ffd74c58e9bd85cfad31b">
                    alUSD Elixir</a>, <a target="_blank" rel="noreferrer" href="https://zapper.fi/account/0xe761bf731a06fe8259fee05897b2687d56933110">
                    alETH Elixir</a><br/>
                </span>
            </div>
            
            </div>
            <div>
            <ButtonGroup size="medium">
                <Button variant={this.state.activeTab === "treasury" ? "contained" : "outlined"} color="inherit" onClick={() => {this.selectTab("treasury")}}>Treasury</Button>
                <Button variant={this.state.activeTab === "elixir" ? "contained" : "outlined"} color="inherit" onClick={() => {this.selectTab("elixir")}}>Elixirs</Button>
            </ButtonGroup>
            </div>
            <div className="multifarm-wrapper">
                <MultifarmProvider
                    token={this.state.activeTab === 'treasury' ? apiKey.treasury : apiKey.elixirs}
                    theme="alchemix"
                    provider="alchemix"
                    themeColors="light"
                    badgePlacement="bottom"
                    strategyTypesConfig={strategyTypesObject}
                    dashboardTabs={[DASHBOARD_TABS_VARIANTS.PORTFOLIO_ALLOCATION, DASHBOARD_TABS_VARIANTS.STRATEGIES_PERFORMANCE]}>
                    <Dashboard />
                </MultifarmProvider>
                {this.state.activeTab === 'treasury' ? '' :
                <div className="section-wrapper">
                <div className="chart-title">
                <h3>Curve Pool Ownership</h3>
                {this.props.treasuryLoading ? "Loading..." :
                        <ChartCrvPoolRatios 
                            alAssetCrvSupply={this.props.alAssetCrvSupply} 
                            alUsd3CrvTreasury={this.props.alUsd3CrvTreasury}
                            alUsd3CrvElixir={this.props.alUsd3CrvElixir}
                            alEthCrvTreasury={this.props.alEthCrvTreasury}
                            alEthCrvElixir={this.props.alEthCrvElixir}
                            alEthCrvTotalValue={this.props.alEthCrvTotalValue}
                        />}
                    </div>
                </div>}
            </div>
            </>
        );
    }
}