import React from 'react';
import ChartCrvPoolRatios from './charts/ChartCrvPoolRatios';
//import { Button, ButtonGroup } from '@mui/material';
import { MultifarmProvider, Dashboard, DASHBOARD_TABS_VARIANTS } from "@multifarm/widget";
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
                <div className="section-header">
                    <img src={ require('./logos/treasury_thin.svg').default } alt="Treasury logo" className="image3" />
                    <h2>Treasury and Elixir</h2>
                </div>

            <div className="section-wrapper">
            <div className="summary">
                There are 5 main treasury addresses of the Alchemix protocol, plus 3 addresses for the alUSD and alETH Elixirs.<br/>
                The Elixirs are the AMOs (Algorithmic Market Operator) of Alchemix.<br/>
                <span>
                    <a target="_blank" rel="noreferrer" href="https://zapper.fi/account/0x9e2b6378ee8ad2a4a95fe481d63caba8fb0ebbf9">
                    Treasury Wallet 1</a>, <a target="_blank" rel="noreferrer" href="https://zapper.fi/account/0x8392f6669292fa56123f71949b52d883ae57e225">
                    Treasury Wallet 2</a>, <a target="_blank" rel="noreferrer" href="https://etherscan.io/address/0x3216d2a52f0094aa860ca090bc5c335de36e6273">
                    sdCRV Controller</a>, <a target="_blank" rel="noreferrer" href="https://optimistic.etherscan.io/address/0xc224bf25dcc99236f00843c7d8c4194abe8aa94a">
                    Optimism Multisig</a>, <a target="_blank" rel="noreferrer" href="https://etherscan.io/address/0x851abef4d67e8bb4ee2f90e5de5e880f6235d028">
                    SDL Controller</a>, <a target="_blank" rel="noreferrer" href="https://zapper.fi/account/0x06378717d86b8cd2dba58c87383da1eda92d3495">
                    alUSDFRAXBP Elixir</a>, <a target="_blank" rel="noreferrer" href="https://zapper.fi/account/0x9735f7d3ea56b454b24ffd74c58e9bd85cfad31b">
                    alUSD3CRV Elixir</a>, <a target="_blank" rel="noreferrer" href="https://zapper.fi/account/0xe761bf731a06fe8259fee05897b2687d56933110">
                    alETH Elixir</a><br/>
                </span>
            </div>
            
            </div>
            <div className="multifarm-switcher-container">
    
            <div className="multifarm-switcher">
                {this.state.activeTab === "treasury" ? 
                <div className="multifarm-switcher-buttons-active" onClick={() => {this.selectTab("treasury")}}>
                    <img src={ require('./logos/treasury_thin.svg').default } alt="treasury logo" className="image-menu" />
                    <div className="multifarm-switcher-buttons-sub-inside">Treasury</div>
                </div> :
                <div className="multifarm-switcher-buttons-inactive" onClick={() => {this.selectTab("treasury")}}>
                    <img src={ require('./logos/treasury_thin.svg').default } alt="treasury logo" className="image-menu" />
                    <div className="multifarm-switcher-buttons-sub-inside">Treasury</div>
                </div>}
                {this.state.activeTab === "elixir" ? 
                <div className="multifarm-switcher-buttons-active" onClick={() => {this.selectTab("elixir")}}>
                    <img src={ require('./logos/transmuter.svg').default } alt="elixir logo" className="image-menu" />
                    <div className="multifarm-switcher-buttons-sub-inside">Elixir</div>
                </div> :
                <div className="multifarm-switcher-buttons-inactive" onClick={() => {this.selectTab("elixir")}}>
                    <img src={ require('./logos/transmuter.svg').default } alt="elixir logo" className="image-menu" />
                    <div className="multifarm-switcher-buttons-sub-inside">Elixir</div>
                </div>}
            </div>
            </div>
            <br/>
            <div className="multifarm-wrapper">
                <MultifarmProvider
                    token={this.state.activeTab === 'treasury' ? apiKey.treasury : apiKey.elixirs}
                    theme="alchemix"
                    provider="alchemix"
                    themeColors="dark"
                    badgePlacement="bottom"
                    strategyTypesConfig={strategyTypesObject}
                    dashboardTabs={[DASHBOARD_TABS_VARIANTS.PORTFOLIO_ALLOCATION, DASHBOARD_TABS_VARIANTS.STRATEGIES_PERFORMANCE]}>
                    <Dashboard />
                </MultifarmProvider>
                {this.state.activeTab === 'treasury' ? '' :
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
                </div>}
            </div>
            </>
        );
    }
}