import React from 'react';
import ChartDaiTVL from './charts/ChartDaiTVL';
import ChartEthTVL from './charts/ChartEthTVL';
import ChartV2AlchemistTVL from './charts/ChartV2AlchemistTVL';
import ChartV2AlchemistEthTVL from './charts/ChartV2AlchemistEthTVL';
import ChartV2AlchemistFtmTVL from './charts/ChartV2AlchemistFtmTVL';
import FtmSummary from './FtmSummary';
import { Switch } from '@mui/material';

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
                        In Alchemix V1 only one collateral type is accepted both for alUSD and alETH, DAI and ETH.<br/>
                        Both the Alchemist and the Transmuter deploy their DAI and ETH balance into the Yearn DAI and Yearn WETH strategies.<br/>
                        Alchemix V2 introduces additional collateral types and yield sources.<br/>
                        <span>In V2, the transmuters hold a very little amount of assets and the Elixirs (Alchemix AMOs) own the funds that were previously controlled by the transmuters.<br/>The contents of the Elixirs are shown in the <i>Treasury and AMO</i> section.</span>
                        Deposit caps are set for each collateral asset. As long as a user can deposit a certain amount of collateral, they are able to take a max loan of 50% of their deposit.<br/>
                        *Please note that for wstETH and rETH the deposit cap is set in ETH, not wstETH and rETH.<br/>
                        This is different from V1, where debt caps were set, but no deposit caps, meaning that someone could deposit collateral and not be able to take out a loan on that if the system was already at maximum debt cap.<br/>
                        **The Staking table shows assets that are directly incentivized by ALCX emissions. Please note that technically the whole ALCX/ETH SLP and a part of the Saddle alETH pool are not staked in Alchemix contracts, but Sushiswap and Saddle contracts.<br/>
                        <div className="tvl-tables-2">
                        {this.props.tokenPricesLoading ? "Loading..." :
                        <div className="small-table">
                            <h3>V1 Deposits</h3>
                            <div className="small-table-inner">
                            <span className="small-table-row"><img src={ require('./logos/dai.png').default } alt="DAI logo" className="image" />yvDAI</span><span className="important-2">${this.props.v1DaiTVL}M</span>
                            <span className="small-table-row"><img src={ require('./logos/eth.png').default } alt="ETH logo" className="image" />yvWETH</span><span className="important-2">${this.props.v1EthUsdTVL}M&nbsp;<i>({this.props.v1EthTVL} ETH)</i></span>
                            <span className="small-table-row"><img src={ require('./logos/dai.png').default } alt="DAI logo" className="image" />+<img src={ require('./logos/eth.png').default } alt="ETH logo" className="image" /></span><span className="important-2">${Math.round((this.props.v1DaiTVL + this.props.v1EthUsdTVL)*100)/100}M</span>
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

                            <span className="small-table-row"><img src={ require('./logos/eth.png').default } alt="ETH logo" className="image" />yvWETH</span><span className="important-4"><span>${this.props.v2EthUsdTVL}M</span><i>({this.props.v2EthTVL} ETH)</i></span><span className="table-text-bold">{Math.round(this.props.v2Caps.eth)} ETH</span>
                            <span className="small-table-row"><img src={ require('./logos/steth.png').default } alt="stETH logo" className="image" />wstETH</span><span className="important-4">${this.props.v2StethUsdTVL}M&nbsp;<i>({this.props.v2StethTVL} ETH)</i></span><span className="table-text-bold">{Math.round(this.props.v2Caps.wstEth)} ETH</span>
                            <span className="small-table-row"><img src={ require('./logos/reth.png').default } alt="rETH logo" className="image" />rETH</span><span className="important-4">${this.props.v2RethUsdTVL}M&nbsp;<i>({this.props.v2RethTVL} ETH)</i></span><span className="table-text-bold">{Math.round(this.props.v2Caps.rEth)} ETH</span>

                            <span className="small-table-row-2">TOTAL V2</span><span className="important-3">${Math.round((this.props.v2DaiTVL + this.props.v2UsdcTVL + this.props.v2UsdtTVL + this.props.v2EthUsdTVL + this.props.v2RethUsdTVL + this.props.v2StethUsdTVL)*100)/100}M</span>
                            </div>
                        </div>
                        <div className="small-table">
                            <h3>Staking TVL**</h3>
                            <div className="small-table-inner-3">
                            <span className="small-table-row"></span><span></span><span className="table-text-bold">Amount</span><span className="table-text-bold">USD value</span>
                            <span className="small-table-row"><img src={ require('./logos/alcx_logo.png').default } alt="ALCX logo" className="image" /></span><span className="table-text-title">ALCX</span><span className="table-text-bold">{Math.round(this.props.alchemixStaking.alcx)}</span><span className="important-2">${Math.round(this.props.stakedAlcxValue/10000)/100}M</span>
                            <span className="small-table-row"><img src={ require('./logos/talcx.png').default } alt="tALCX logo" className="image" /></span><span className="table-text-title">tALCX</span><span className="table-text-bold">{Math.round(this.props.alchemixStaking.tAlcx)}</span><span className="important-2">${Math.round(this.props.stakedTAlcxValue/10000)/100}M</span>
                            <span className="small-table-row"><img src={ require('./logos/alcx_eth_slp.png').default } alt="ALCX/ETH SLP" className="image" /></span><span className="table-text-title">ALCX/ETH SLP</span><span className="table-text-bold">{Math.round(this.props.alchemixStaking.alcxEthSlp)}</span><span className="important-2">${Math.round(this.props.stakingSlpValue/10000)/100}M</span>
                            <span className="small-table-row"><img src={ require('./logos/aleth_saddle.png').default } alt="Saddle alETH" className="image" /></span><span className="table-text-title">Saddle alETH</span><span className="table-text-bold">{Math.round(this.props.alchemixStaking.saddleAlEth)}</span><span className="important-2">${Math.round(this.props.stakingSaddleAlEthValue/10000)/100}M</span>
                            <span className="small-table-row-2"></span><span></span><span className="important-3">Total</span><span className="important-3">${Math.round((this.props.stakedAlcxValue + this.props.stakedTAlcxValue + this.props.stakingSlpValue + this.props.stakingSaddleAlEthValue)/10000)/100}M</span>
                            </div>
                        </div>
                        </div>
                </div>
                <div className="section-wrapper">
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
                </div>

                <div className="section-wrapper">
                    <div className="chart-title">
                    <h3>Alchemist V2 Stablecoin TVL</h3>
                    {/*<ChartV2AlchemistTVL v2AlchemistTVL={this.props.vaultV2Tvls.alchemist} />*/}
                    <ChartV2AlchemistTVL alchemistTvl={this.props.alchemistTvl} />
                    </div>
                    <div className="chart-title">
                    <h3>Alchemist V2 Eth TVL</h3>
                    {/*<ChartV2AlchemistEthTVL v2AlchemistEthTVL={this.props.vaultV2Tvls.alchemistEth} />*/}
                    <ChartV2AlchemistEthTVL alchemistTvl={this.props.alchemistTvl} />
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