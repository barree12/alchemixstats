import React from 'react';
import LoadingComponent from './LoadingComponent';
//import { formatDateNumber } from './Functions';

export default class Overview extends React.Component { 

    render(){
//console.log(this.props.vaultV1Tvls)
        let alUsdLiquidity = this.props.lpsLoading ? 0 : Math.round(this.props.lps.alUsdIn3Crv/10000 + this.props.lps.crv3In3Crv/10000 + this.props.lps.alUsdInVelodrome/10000 + this.props.lps.usdcInVelodrome/10000 + this.props.lps.alUsdInCurveFBP/10000 + this.props.lps.fbpInCurveFBP/10000 + this.props.lps.alUsdInCurveDola/10000 + this.props.lps.sdolaInCurveDola/10000 + this.props.lps.alUsdInRamsesFrax/10000 + this.props.lps.fraxInRamsesFrax/10000 + this.props.lps.alUsdInVeloDolaAlUsd/10000 + this.props.lps.dolaInVeloDolaAlUsd/10000)/100;
        let alEthLiquidity = (this.props.lpsLoading || this.props.tokenPricesLoading) ? 0 : Math.round((this.props.lps.alEthInAlEthWethCrv + this.props.lps.alEthInSaddle + this.props.lps.wethInAlEthWethCrv + this.props.lps.wethInSaddle + this.props.lps.sEthInSaddle + this.props.lps.alEthInVelodrome + this.props.lps.wethInVelodrome + this.props.lps.alEthInVeloFxsEthAlEth + this.props.lps.fxsEthInVeloFxsEthAlEth + this.props.lps.alEthInFrxEthCrv + this.props.lps.frxEthInFrxEthCrv + this.props.lps.pxEthInVeloAlEth + this.props.lps.alEthInVeloAlEth + this.props.lps.pxEthInCurvePxEth + this.props.lps.alEthInCurvePxEth +  this.props.lps.frxEthInRamsesFrxEth + this.props.lps.alEthInRamsesFrxEth)*this.props.ethPrice/10000)/100;
        //let stablecoinDeposits = this.props.v2CurrentLoading ? 0 : Math.round((this.props.v2Deposit.daiInMigrate + this.props.v2DaiTVL + this.props.v2UsdcTVL + this.props.v2UsdtTVL + this.props.v2aDaiTVL + this.props.v2aUsdcTVL + this.props.v2aUsdtTVL + this.props.v2vaUsdcTVL + this.props.v2vaDaiTVL)*100)/100;
        //let ethDeposits = this.props.v2CurrentLoading ? 0 : Math.round(this.props.v2Deposit.wethInMigrate + this.props.v2EthTVL + this.props.v2aWethTVL + this.props.v2StethTVL + this.props.v2RethTVL + this.props.v2vaEthTVL + this.props.v2sfrxEthTVL);
        //let ethDepositsUsd = Math.round((this.props.wethInMigrateUsd + this.props.v2EthUsdTVL + this.props.v2aWethUsdTVL + this.props.v2StethUsdTVL + this.props.v2RethUsdTVL + this.props.v2vaEthUsdTVL + this.props.v2sfrxEthUsdTVL)*100)/100;
        let deposits = Math.round((this.props.stablecoinDeposits + this.props.ethDepositsUsd)*100)/100;
        //let stablecoinDeposits1mAgo = (this.props.alchemistTvlLoading || this.props.v2CurrentLoading) ? 0 : Math.round((this.props.v2Deposit.daiInMigrate + this.props.alchemistTvl.yvDai[this.props.alchemistTvl.yvDai.length-31] + this.props.alchemistTvl.yvUsdc[this.props.alchemistTvl.yvUsdc.length-31] + this.props.alchemistTvl.yvUsdt[this.props.alchemistTvl.yvUsdt.length-31] + this.props.alchemistTvl.aDai[this.props.alchemistTvl.aDai.length-31] + this.props.alchemistTvl.aUsdc[this.props.alchemistTvl.aUsdc.length-31] + this.props.alchemistTvl.aUsdt[this.props.alchemistTvl.aUsdt.length-31])*100)/100;
        //let ethDeposits1mAgo = (this.props.alchemistTvlLoading || this.props.v2CurrentLoading) ? 0 : Math.round(this.props.v2Deposit.wethInMigrate + (this.props.alchemistTvl.yvWeth[this.props.alchemistTvl.yvWeth.length-31] * this.props.tokensPerShare.eth) + (this.props.alchemistTvl.aWeth[this.props.alchemistTvl.aWeth.length-31] * this.props.tokensPerShare.aWeth) + (this.props.alchemistTvl.wstEth[this.props.alchemistTvl.wstEth.length-31] * this.props.tokensPerShare.wstEth) + (this.props.alchemistTvl.rEth[this.props.alchemistTvl.rEth.length-31] * this.props.tokensPerShare.rEth) + (this.props.alchemistTvl.frxEth[this.props.alchemistTvl.frxEth.length-31] * this.props.tokensPerShare.sfrxEth) + (this.props.alchemistTvl.vaEth[this.props.alchemistTvl.vaEth.length-31] * this.props.tokensPerShare.vaEth));
        //let ethDepositsUsd1mAgo = this.props.tokenPricesLoading ? 0 : Math.round(this.props.ethPrice*ethDeposits1mAgo/10000)/100;
        //let deposits1mAgo = Math.round((stablecoinDeposits1mAgo + ethDepositsUsd1mAgo)*100)/100;
        //let stablecoinVaultChange = Math.round((stablecoinDeposits/stablecoinDeposits1mAgo-1)*10000)/100;
        //let ethVaultChange = Math.round((ethDeposits/ethDeposits1mAgo-1)*10000)/100;
        //let ethVaultUsdChange = Math.round((ethDepositsUsd/ethDepositsUsd1mAgo-1)*10000)/100;
        //let depositsChange = Math.round((deposits/deposits1mAgo-1)*10000)/100;
        //console.log(this.props.lps.alUsdInCurveDola)
        //let ethPriceChange = this.props.tokenPricesLoading ? 0 : Math.round((this.props.ethPrice/this.props.ethPrice-1)*10000)/100;
        //let alUsdCollateralNotReceived = (stablecoinDeposits === 0 || this.props.debankData.alUsdCrvInElixir === 0 || this.props.alAssetSupply.alUsd === 0 || this.props.debankData.alUsdInElixir === 0 || this.props.debankData.alUsdFraxBpInElixir === 0);
        //let alEthCollateralNotReceived = (ethDeposits === 0 || this.props.debankData.alEthCrvEthInElixir === 0 || this.props.alAssetSupply.alEth === 0 || this.props.debankData.alEthInElixir === 0);
        //let alUsdCollateralRatio = (this.props.debankDataLoading || this.props.v2CurrentLoading) ? 0 : (stablecoinDeposits*1000000 + this.props.debankData.alUsdCrvInElixir + this.props.debankData.alUsdFraxBpInElixir) / (this.props.alAssetSupply.alUsd - this.props.debankData.alUsdInElixir);
        //let alEthCollateralRatio = (this.props.debankDataLoading || this.props.v2CurrentLoading) ? 0 : (ethDeposits + this.props.debankData.alEthFrxEthInElixir) / (this.props.alAssetSupply.alEth - this.props.debankData.alEthAmountInElixir);
        return (
            <>
                <h2>Protocol Summary</h2>
                <div className="overview">
                    <span className="flex-row">
                        <span>Total Protocol TVL:&nbsp;</span>
                        <div className="important">${Math.round(deposits*100+this.props.debankData.totalElixir/10000)/100}M</div>
                    </span>
                    <br/>
                    <span>
                        The Alchemix quarterly financial reports are available in the <a target="_blank" rel="noreferrer" href="https://alchemix-finance.gitbook.io/user-docs/resources/audits-and-reports/financial-reports">Alchemix GitBook</a><br/>
                        Dune dashboards also exist that provide further details on Alchemix related contracts, like the <a target="_blank" rel="noreferrer" href="https://dune.com/alchemix/arbitrum-grant-metrics">Arbitrum</a> dashboard.<br/>
                        An <a target="_blank" rel="noreferrer" href="https://app.alphaday.com/b/alchemix/">information dashboard</a> is maintained by Alphaday, where you can keep up to date with all things Alchemix!
                    </span>
                    {(this.props.tokenPricesLoading || this.props.alUsdPegLoading || this.props.alEthPegLoading || this.props.alchemistTvlLoading || this.props.v2CurrentLoading || this.props.debankDataLoading) ? <LoadingComponent /> :
                    <div className="tvl-tables-3">
                        <div className="small-table-4">
                            <h3>alAssets</h3>
                            <div className="small-table-inner-7">
                                <span className="small-table-row"><img src={ require('./logos/alusd.svg').default } alt="alethcurve logo" className="image" /></span><span className="table-text-bold">alUSD</span><span className="table-text-bold"></span>
                                <span className="small-table-row"></span><span className="table-text-title-margin">Total liquidity</span><span className="important-5">${alUsdLiquidity}M</span>
                                <span className="small-table-row"></span><span className="table-text-title-margin">alUSD price</span><span className="important-5">{Math.round(this.props.alUsdPeg.usdc.peg[this.props.alUsdPeg.usdc.peg.length-1]*10000)/10000}</span>
                                {/*<span className="small-table-row"></span><span className="table-text-title-margin">Collat. ratio</span><span className="important-5">{/*alUsdCollateralNotReceived ? "-" : Math.round(alUsdCollateralRatio*100)}-</span>*/}
                                <span className="small-table-row"></span><span className="important-4"></span><span className="table-text-bold"></span>
                                <span className="small-table-row"><img src={ require('./logos/aleth_blue.svg').default } alt="alethcurve logo" className="image" /></span><span className="table-text-bold">alETH</span><span></span>
                                <span className="small-table-row"></span><span className="table-text-title-margin">Total liquidity</span><span className="important-5">${alEthLiquidity}M</span>
                                <span className="small-table-row"></span><span className="table-text-title-margin">alETH price</span><span className="important-5">{Math.round(this.props.alEthPeg.peg[this.props.alEthPeg.peg.length-1]*10000)/10000}</span>
                                {/*<span className="small-table-row"></span><span className="table-text-title-margin">Collat. ratio</span><span className="important-5">{/*alEthCollateralNotReceived ? "-" : Math.round(alEthCollateralRatio*100)}-</span>*/}
                            </div>
                        </div>
                        <div className="small-table-4">
                            <h3>Deposits</h3>
                            <div className="small-table-inner-9">
                                <span className="small-table-row"><img src={ require('./logos/dai.png').default } alt="dai logo" className="image" /></span><span className="table-text-title">Stable Vaults</span><span className="important-2">${this.props.stablecoinDeposits}M</span>
                                <span className="small-table-row"><img src={ require('./logos/eth.png').default } alt="eth logo" className="image" /></span><span className="table-text-title">ETH Vaults</span><span className="important-2">{this.props.ethDeposits} ETH</span>
                                <span className="small-table-row"></span><span className="table-text-title">ETH price</span><span className="important-2">${Math.round(this.props.ethPrice*100)/100}</span>
                                <span className="small-table-row"></span><span className="table-text-title">ETH Vaults ($)</span><span className="important-2">${this.props.ethDepositsUsd}M</span>
                                <span className="small-table-row"></span><span className="important-4"></span><span className="table-text-bold"></span>
                                <span className="small-table-row"></span><span className="table-text-bold">TOTAL</span><span className="important-2">${deposits}M</span>
                            </div>
                            
                        </div>
                        <div className="small-table-4">
                            <h3>Treasury and Elixirs</h3>
                            <div className="small-table-inner-9">
                                <span className="small-table-row"></span><span className="table-text-bold">Treasury</span><span>USD value</span>
                                <span className="small-table-row"><img src={ require('./logos/treasury_thin.svg').default } alt="alusd3crv logo" className="image" /></span><span className="table-text-title">Total Treasury</span><span className="important-2">${Math.round((this.props.debankData.totalTreasury + this.props.debankData.totalTreasuryStrategic)/10000)/100}M</span>
                                <span className="small-table-row"><img src={ require('./logos/other_logo.png').default } alt="alusd3crv logo" className="image" /></span><span className="table-text-title">Non-ALCX Treasury</span><span className="important-2">${Math.round(this.props.debankData.nonAlcxTreasury/10000)/100}M</span>
                                <span className="small-table-row"></span><span className="important-4"></span><span className="table-text-bold"></span>
                                <span className="small-table-row"></span><span className="table-text-bold">Elixirs</span><span>USD value</span>
                                <span className="small-table-row"><img src={ require('./logos/transmuter.svg').default } alt="alusd3crv logo" className="image" /></span><span className="table-text-title">Total Elixirs</span><span className="important-2">${Math.round(this.props.debankData.totalElixir/10000)/100}M</span>

                                {/*<span className="small-table-row"><img src={ require('./logos/alusd_crv.png').default } alt="alusd3crv logo" className="image" /></span><span className="table-text-title">alUSD3Crv</span><span className="table-text-bold">{Math.round(this.props.treasury.cvxAlUsd3CrvElixir/10000)/100}M</span><span className="important-2">${Math.round(this.props.treasury.cvxAlUsd3CrvElixir/10000)/100}M</span>
                                <span className="small-table-row"><img src={ require('./logos/eth_aleth.png').default } alt="alethcurve logo" className="image" /></span><span className="table-text-title">alETHCrv</span><span className="table-text-bold">{Math.round(this.props.treasury.cvxAlEthCrvElixir)}</span><span className="important-2">${Math.round(this.props.elixirCvxAlEthCrvValue/10000)/100}M</span>
                                <span className="small-table-row"><img src={ require('./logos/dai.png').default } alt="DAI logo" className="image" /></span><span className="table-text-title">DAI</span><span className="table-text-bold">{Math.round(this.props.treasury.daiInElixir/10000)/100}M</span><span className="important-2">${Math.round(this.props.treasury.daiInElixir/10000)/100}M</span>
                                <span className="small-table-row"><img src={ require('./logos/eth.png').default } alt="ETH logo" className="image" /></span><span className="table-text-title">ETH</span><span className="table-text-bold">{Math.round(this.props.treasury.wethInElixir)}</span><span className="important-2">${Math.round(this.props.wethInElixirUsd/10000)/100}M</span>
        <span className="small-table-row-2"></span><span></span><span className="important-3">Total</span><span className="important-3">${Math.round((this.props.elixirCvxAlEthCrvValue+this.props.treasury.cvxAlUsd3CrvElixir+this.props.treasury.daiInElixir+this.props.wethInElixirUsd)/10000)/100}M</span>*/}
                            </div>
                        </div>
                    </div>}
                </div>
            </>
        );
    }
}