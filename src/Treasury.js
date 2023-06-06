import React from 'react';
//import { Button, ButtonGroup } from '@mui/material';
import { MultifarmProvider, Dashboard, DASHBOARD_TABS_VARIANTS } from "@multifarm/widget";
import "@multifarm/widget/dist/alchemix.css";

export default class Treasury extends React.Component {

    render(){
        let strategyTypesObject = {
            collateral: {
                active: false,
            },
            debt: {
                active: false,
            }
        }
        let apiKey = 'di50relXm_XAKKAUKvZ9Igd9pVzk2gm1';

        return (
            <>
                <div className="section-header">
                    <img src={ require('./logos/treasury_thin.svg').default } alt="Treasury logo" className="image3" />
                    <h2>Treasury</h2>
                </div>

            <div className="section-wrapper">
            <div className="summary">
                There are 6 main treasury addresses of the Alchemix protocol.<br/>
                <span>
                    <a target="_blank" rel="noreferrer" href="https://debank.com/profile/0x9e2b6378ee8ad2a4a95fe481d63caba8fb0ebbf9">
                    Treasury Wallet 1</a>, <a target="_blank" rel="noreferrer" href="https://debank.com/profile/0x8392f6669292fa56123f71949b52d883ae57e225">
                    Treasury Wallet 2</a>, <a target="_blank" rel="noreferrer" href="https://debank.com/profile/0x3216d2a52f0094aa860ca090bc5c335de36e6273">
                    sdCRV Controller</a>, <a target="_blank" rel="noreferrer" href="https://debank.com/profile/0xc224bf25dcc99236f00843c7d8c4194abe8aa94a">
                    Optimism Multisig</a>, <a target="_blank" rel="noreferrer" href="https://debank.com/profile/0x7e108711771dfdb10743f016d46d75a9379ca043">
                    Arbitrum Multisig</a>, <a target="_blank" rel="noreferrer" href="https://debank.com/profile/0x851abef4d67e8bb4ee2f90e5de5e880f6235d028">
                    SDL Controller</a><br/>
                </span>
            </div>
            
            </div>
            <br/>
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