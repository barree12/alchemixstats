import React from 'react';
import ChartDaiTVL from './charts/ChartDaiTVL';
import ChartEthTVL from './charts/ChartEthTVL';
import ChartV2AlchemistTVL from './charts/ChartV2AlchemistTVL';
import ChartV2AlchemistEthTVL from './charts/ChartV2AlchemistEthTVL';
import ChartV2AlchemistFtmTVL from './charts/ChartV2AlchemistFtmTVL';
import ChartOptiAlchemistTVL from './charts/ChartOptiAlchemistTVL';
import ChartOptiAlchemistEthTVL from './charts/ChartOptiAlchemistEthTVL';
import FtmSummary from './FtmSummary';
import { Switch } from '@mui/material';
import OptiSummary from './OptiSummary';

export default class Deposits extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          ethCurrencyToggle: true,
        };
        this.toggleEthCurrency = this.toggleEthCurrency.bind(this);
      }

    toggleEthCurrency(){
        this.setState({ ethCurrencyToggle: !this.state.ethCurrencyToggle });
    }

    render(){
        return (
            <>
                <img src={ require('./logos/safe.png').default } alt="Vault logo" className="image3" />
                <h2>Deposits and Staking</h2>
                <div className="summary">
                        In Alchemix V1, both the Alchemist and the Transmuter deployed their DAI and ETH balance into the Yearn DAI and Yearn WETH strategies.<br/>
                        Alchemix V2 introduced additional collateral types and yield sources.<br/>
                        <span>In V2, the transmuters hold a very little amount of assets and the Elixirs (Alchemix AMOs) own the funds that were previously controlled by the transmuters.<br/>The contents of the Elixirs are shown in the <i>Treasury and Elixirs</i> section.</span>
                        Deposit caps are set for each collateral asset. As long as a user can deposit a certain amount of collateral, they are able to take a max loan of 50% of their deposit.<br/>
                        *Please note that the deposit caps are set in USD and ETH, not the token of the underlying vault.<br/>
                        As of 2022 October, V1 contracts have been deprecated.<br/>
                        All remaining funds were moved into a temporary migration contract where users can manually migrate to V2.<br/>
                        Thus, V1 metrics are no longer covered, only the remaining contents of the migration contract.
                        <div className="tvl-tables-2">
                        {this.props.tokenPricesLoading ? "Loading..." :
                        <div className="small-table">
                            <h3>V1 Migrate Contract</h3>
                            <div className="small-table-inner">
                            <span className="small-table-row"><img src={ require('./logos/dai.png').default } alt="DAI logo" className="image" />DAI</span><span className="important-2">${Math.round(this.props.v2Deposit.daiInMigrate*100)/100}M</span>
                            <span className="small-table-row"><img src={ require('./logos/eth.png').default } alt="ETH logo" className="image" />WETH</span><span className="important-2">${Math.round(this.props.wethInMigrateUsd*100)/100}M&nbsp;<i>({Math.round(this.props.v2Deposit.wethInMigrate)} ETH)</i></span>
                            <span className="small-table-row"><img src={ require('./logos/dai.png').default } alt="DAI logo" className="image" />+<img src={ require('./logos/eth.png').default } alt="ETH logo" className="image" /></span><span className="important-2">${Math.round((this.props.v2Deposit.daiInMigrate + this.props.wethInMigrateUsd)*100)/100}M</span>
                            </div>
                        </div>
                        }
                        <div className="small-table">
                            <h3>V2 Deposits and Deposit Caps*</h3>
                            <div className="small-table-inner-2">
                            <span className="small-table-row"></span><span className="table-text-bold">TVL</span><span className="table-text-bold">Deposit cap</span>
                            <span className="small-table-row"><img src={ require('./logos/dai.png').default } alt="DAI logo" className="image" />yvDAI</span><span className="important-2">${this.props.v2DaiTVL}M</span><span className="table-text-bold">${Math.round(this.props.v2Caps.dai/10000)/100}M</span>
                            <span className="small-table-row"><img src={ require('./logos/usdc.png').default } alt="USDC logo" className="image" />yvUSDC</span><span className="important-2">${this.props.v2UsdcTVL}M</span><span className="table-text-bold">${Math.round(this.props.v2Caps.usdc/10000)/100}M</span>
                            <span className="small-table-row"><img src={ require('./logos/usdt.png').default } alt="USDT logo" className="image" />yvUSDT</span><span className="important-2">${this.props.v2UsdtTVL}M</span><span className="table-text-bold">${Math.round(this.props.v2Caps.usdt/10000)/100}M</span>
                            <span className="small-table-row"><img src={ require('./logos/aave_dai.png').default } alt="Aave Dai logo" className="image" />aDAI</span><span className="important-2">${this.props.v2aDaiTVL}M</span><span className="table-text-bold">${Math.round(this.props.v2Caps.aDai/10000)/100}M</span>
                            <span className="small-table-row"><img src={ require('./logos/aave_usdc.png').default } alt="Aave USDC logo" className="image" />aUSDC</span><span className="important-2">${this.props.v2aUsdcTVL}M</span><span className="table-text-bold">${Math.round(this.props.v2Caps.aUsdc/10000)/100}M</span>
                            <span className="small-table-row"><img src={ require('./logos/aave_usdt.png').default } alt="Aave USDT logo" className="image" />aUSDT</span><span className="important-2">${this.props.v2aUsdtTVL}M</span><span className="table-text-bold">${Math.round(this.props.v2Caps.aUsdt/10000)/100}M</span>

                            <span className="small-table-row"><img src={ require('./logos/eth.png').default } alt="ETH logo" className="image" />yvWETH</span><span className="important-4"><span>${this.props.v2EthUsdTVL}M</span><i>({this.props.v2EthTVL} ETH)</i></span><span className="table-text-bold">{Math.round(this.props.v2Caps.eth)} ETH</span>
                            <span className="small-table-row"><img src={ require('./logos/aave_eth.png').default } alt="Aave WETH logo" className="image" />aWETH</span><span className="important-4"><span>${this.props.v2aWethUsdTVL}M</span><i>({this.props.v2aWethTVL} ETH)</i></span><span className="table-text-bold">{Math.round(this.props.v2Caps.aWeth)} ETH</span>
                            <span className="small-table-row"><img src={ require('./logos/steth.png').default } alt="stETH logo" className="image" />wstETH</span><span className="important-4">${this.props.v2StethUsdTVL}M&nbsp;<i>({this.props.v2StethTVL} ETH)</i></span><span className="table-text-bold">{Math.round(this.props.v2Caps.wstEth)} ETH</span>
                            <span className="small-table-row"><img src={ require('./logos/reth.png').default } alt="rETH logo" className="image" />rETH</span><span className="important-4">${this.props.v2RethUsdTVL}M&nbsp;<i>({this.props.v2RethTVL} ETH)</i></span><span className="table-text-bold">{Math.round(this.props.v2Caps.rEth)} ETH</span>

                            <span className="small-table-row-2">TOTAL V2</span><span className="important-3">${Math.round((this.props.v2DaiTVL + this.props.v2UsdcTVL + this.props.v2UsdtTVL + this.props.v2aDaiTVL + this.props.v2aUsdcTVL + this.props.v2aUsdtTVL + this.props.v2EthUsdTVL + this.props.v2aWethUsdTVL + this.props.v2RethUsdTVL + this.props.v2StethUsdTVL)*100)/100}M</span>
                            </div>
                        </div>
                        <div className="small-table">
                            <h3>Staking TVL</h3>
                            <div className="small-table-inner-3">
                            <span className="small-table-row"></span><span></span><span className="table-text-bold">Amount</span><span className="table-text-bold">USD value</span>
                            <span className="small-table-row"><img src={ require('./logos/alcx_logo.png').default } alt="ALCX logo" className="image" /></span><span className="table-text-title">ALCX</span><span className="table-text-bold">{Math.round(this.props.alchemixStaking.alcx)}</span><span className="important-2">${Math.round(this.props.stakedAlcxValue/10000)/100}M</span>
                            <span className="small-table-row"><img src={ require('./logos/alcx_eth_slp.png').default } alt="ALCX/ETH SLP" className="image" /></span><span className="table-text-title">ALCX/ETH SLP</span><span className="table-text-bold">{Math.round(this.props.alchemixStaking.alcxEthSlp)}</span><span className="important-2">${Math.round(this.props.stakingSlpValue/10000)/100}M</span>
                            <span className="small-table-row-2"></span><span></span><span className="important-3">Total</span><span className="important-3">${Math.round((this.props.stakedAlcxValue + this.props.stakingSlpValue)/10000)/100}M</span>
                            </div>
                        </div>
                        </div>
                </div>
                {/*<div className="section-wrapper">
                    <div className="chart-title">
                    <h3>DAI TVL V1</h3>
                    <ChartDaiTVL tvlDates={this.props.vaultV1Tvls.daiTvlDates} daiAlchemistTVL={this.props.vaultV1Tvls.daiAlchemistTVL} daiTransmuterTVL={this.props.vaultV1Tvls.daiTransmuterTVL} />
                    </div>
                    <div className="chart-title">
                    <h3>ETH TVL V1</h3>
                    <div className="toggle-text">
                        $<Switch onChange={this.toggleEthCurrency} checked={this.state.ethCurrencyToggle} />ETH
                    </div>
                    <ChartEthTVL toggle={this.state.ethCurrencyToggle} ethTVLDates={this.props.vaultV1Tvls.ethTVLDates} ethAlchemistTVL={[...this.props.vaultV1Tvls.ethAlchemistTVL]} ethTransmuterTVL={[...this.props.vaultV1Tvls.ethTransmuterTVL]} ethPricesForTVL={this.props.tokenPrices.eth} />
                    </div>
                    </div>*/}

                <div className="section-wrapper">
                    <div className="chart-title">
                    <h3>Alchemist V2 Stablecoin TVL</h3>
                    <ChartV2AlchemistTVL alchemistTvl={this.props.alchemistTvl} />
                    </div>
                    <div className="chart-title">
                    <h3>Alchemist V2 Eth TVL</h3>
                    <ChartV2AlchemistEthTVL alchemistTvl={this.props.alchemistTvl} />
                    </div>
                </div>
                <OptiSummary v2Caps={this.props.v2Caps} optiTvl={this.props.optiTvl}
                    optiAWethTVL={this.props.optiAWethTVL} optiAWethUsdTVL={this.props.optiAWethUsdTVL} />
                <div className="section-wrapper">
                    <div className="chart-title">
                    <h3>Optimism Stablecoin TVL</h3>
                    <ChartOptiAlchemistTVL optiTvl={this.props.optiTvl} />
                    </div>
                    <div className="chart-title">
                    <h3>Optimism Eth TVL</h3>
                    <ChartOptiAlchemistEthTVL optiTvl={this.props.optiTvl} />
                    </div>
                </div>
                <div className="section-wrapper">
                    <FtmSummary v2Caps={this.props.v2Caps} ftmTvl={this.props.ftmTvl} />
                    <div className="chart-title">
                        <h3>Fantom Alchemist TVL</h3>
                        <ChartV2AlchemistFtmTVL ftmTvl={this.props.ftmTvl} />
                    </div>
                </div>
            </>
        );
    }
}