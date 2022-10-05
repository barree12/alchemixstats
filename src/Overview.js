import React from 'react';
import LoadingComponent from './LoadingComponent';

export default class Overview extends React.Component { 

    render(){
//console.log(this.props.vaultV1Tvls)
        let alUsdLiquidity = this.props.lpsLoading ? 0 : Math.round(this.props.lps.alUsdIn3Crv/10000 + this.props.lps.crv3In3Crv/10000 + this.props.lps.alUsdInD4/10000 + this.props.lps.fraxInD4/10000 + this.props.lps.feiInD4/10000 + this.props.lps.lUsdInD4/10000 + this.props.lps.alUsdInBeets/10000 + this.props.lps.usdcInBeets/10000 + this.props.lps.daiInBeets/10000 + this.props.lps.alUsdInVelodrome/10000 + this.props.lps.usdcInVelodrome/10000 + this.props.lps.alUsdInSaddleFBP/10000 + this.props.lps.fbpInSaddleFBP/10000 + this.props.lps.alUsdInCurveFBP/10000 + this.props.lps.fbpInCurveFBP/10000)/100
        let alEthLiquidity = (this.props.lpsLoading || this.props.tokenPricesLoading) ? 0 : Math.round((this.props.lps.alEthInCrv + this.props.lps.alEthInSaddle + this.props.lps.ethInAlEthCrv + this.props.lps.wethInSaddle + this.props.lps.sEthInSaddle + this.props.lps.alEthInVelodrome + this.props.lps.wethInVelodrome)*this.props.ethPrice[this.props.ethPrice.length-1]/10000)/100;
        let stablecoinDeposits = Math.round((this.props.v1DaiTVL + this.props.v2DaiTVL + this.props.v2UsdcTVL + this.props.v2UsdtTVL + this.props.v2aDaiTVL + this.props.v2aUsdcTVL + this.props.v2aUsdtTVL)*100)/100;
        let ethDeposits = Math.round(this.props.v1EthTVL + this.props.v2EthTVL + this.props.v2aWethTVL + this.props.v2StethTVL + this.props.v2RethTVL);
        let ethDepositsUsd = Math.round((this.props.v1EthUsdTVL + this.props.v2EthUsdTVL + this.props.v2aWethUsdTVL + this.props.v2StethUsdTVL + this.props.v2RethUsdTVL)*100)/100;
        let deposits = Math.round((stablecoinDeposits + ethDepositsUsd)*100)/100;
        let stablecoinDeposits1mAgo = (this.props.vaultTvlsLoading || this.props.alchemistTvlLoading) ? 0 : Math.round((this.props.vaultV1Tvls.daiAlchemistTVL[this.props.vaultV1Tvls.daiAlchemistTVL.length-31] + this.props.alchemistTvl.yvDai[this.props.alchemistTvl.yvDai.length-31] + this.props.alchemistTvl.yvUsdc[this.props.alchemistTvl.yvUsdc.length-31] + this.props.alchemistTvl.yvUsdt[this.props.alchemistTvl.yvUsdt.length-31] + this.props.alchemistTvl.aDai[this.props.alchemistTvl.aDai.length-31] + this.props.alchemistTvl.aUsdc[this.props.alchemistTvl.aUsdc.length-31] + this.props.alchemistTvl.aUsdt[this.props.alchemistTvl.aUsdt.length-31])*100)/100;
        let ethDeposits1mAgo = (this.props.vaultTvlsLoading || this.props.alchemistTvlLoading) ? 0 : Math.round(this.props.vaultV1Tvls.ethAlchemistTVL[this.props.vaultV1Tvls.ethAlchemistTVL.length-31] + this.props.alchemistTvl.yvWeth[this.props.alchemistTvl.yvWeth.length-31] + this.props.alchemistTvl.aWeth[this.props.alchemistTvl.aWeth.length-31] + this.props.alchemistTvl.wstEth[this.props.alchemistTvl.wstEth.length-31] + this.props.alchemistTvl.rEth[this.props.alchemistTvl.rEth.length-31]);
        let ethDepositsUsd1mAgo = this.props.tokenPricesLoading ? 0 : Math.round(this.props.ethPrice[this.props.ethPrice.length-31]*ethDeposits1mAgo/10000)/100;
        let deposits1mAgo = Math.round((stablecoinDeposits1mAgo + ethDepositsUsd1mAgo)*100)/100;
        let stablecoinVaultChange = Math.round((stablecoinDeposits/stablecoinDeposits1mAgo-1)*10000)/100;
        let ethVaultChange = Math.round((ethDeposits/ethDeposits1mAgo-1)*10000)/100;
        let ethVaultUsdChange = Math.round((ethDepositsUsd/ethDepositsUsd1mAgo-1)*10000)/100;
        let depositsChange = Math.round((deposits/deposits1mAgo-1)*10000)/100;
        let ethPriceChange = this.props.tokenPricesLoading ? 0 : Math.round((this.props.ethPrice[this.props.ethPrice.length-1]/this.props.ethPrice[this.props.ethPrice.length-31]-1)*10000)/100;
        
        return (
            <>
                <h2>Protocol Summary</h2>
                <div className="overview">
                    <span>
                        The Q2 2022 Financial report is now available! Access the reports in the <a target="_blank" rel="noreferrer" href="https://alchemix-finance.gitbook.io/user-docs/financial-reports">Alchemix GitBook</a>
                    </span>
                    {(this.props.vaultTvlsLoading || this.props.tokenPricesLoading || this.props.alUsdPegLoading || this.props.alEthPegLoading || this.props.alchemistTvlLoading) ? <LoadingComponent /> :
                    <div className="tvl-tables-3">
                        <div className="small-table-4">
                            <h3>alAsset Liquidity and Pegs</h3>
                            <div className="small-table-inner-7">
                                <span className="small-table-row"><img src={ require('./logos/alusd.png').default } alt="alethcurve logo" className="image" /></span><span className="table-text-bold">alUSD</span><span className="table-text-bold"></span>
                                <span className="small-table-row"></span><span className="table-text-title-margin">Total liquidity</span><span className="important-5">${alUsdLiquidity}M</span>
                                <span className="small-table-row"></span><span className="table-text-title-margin">alUSD peg</span><span className="important-5">{Math.round(this.props.alUsdPeg.dai.peg[this.props.alUsdPeg.dai.peg.length-1]*10000)/10000}</span>
                                <span className="small-table-row"></span><span className="important-4"></span><span className="table-text-bold"></span>
                                <span className="small-table-row"><img src={ require('./logos/aleth.png').default } alt="alethcurve logo" className="image" /></span><span className="table-text-bold">alETH</span><span></span>
                                <span className="small-table-row"></span><span className="table-text-title-margin">Total liquidity</span><span className="important-5">${alEthLiquidity}M</span>
                                <span className="small-table-row"></span><span className="table-text-title-margin">alETH peg</span><span className="important-5">{Math.round(this.props.alEthPeg.peg[this.props.alEthPeg.peg.length-1]*10000)/10000}</span>
                            </div>
                        </div>
                        <div className="small-table-4">
                            <h3>Deposits and Staking</h3>
                            <div className="small-table-inner-10">
                                <span className="small-table-title-wrap"><span className="cell-disappear"></span><span className="table-text-bold">Deposits</span></span>
                                <span className="small-table-content-wrap"><span>({new Date().getMonth()}/{new Date().getDate()})</span><span>({new Date().getMonth()+1}/{new Date().getDate()})</span><span>MoM change %</span></span>
                                <span className="small-table-title-wrap"><span className="cell-disappear"><img src={ require('./logos/dai.png').default } alt="DAI logo" className="image" /></span><span className="table-text-title">Stablecoin Vaults</span></span>
                                <span className="small-table-content-wrap"><span className="important-5">${stablecoinDeposits1mAgo}M</span><span className="important-5">${stablecoinDeposits}M</span><span className="important-5">{stablecoinVaultChange >= 0 ? <span className="change-positive">+{stablecoinVaultChange}%</span> : <span className="change-negative">{stablecoinVaultChange}%</span>}</span></span>
                                <span className="cell-disappear"><span className="cell-disappear"></span><span className="important"></span></span>
                                <span className="cell-disappear"><span className="table-text-bold"></span><span></span><span></span></span>
                                <span className="small-table-title-wrap"><span className="cell-disappear"><img src={ require('./logos/eth.png').default } alt="ETH logo" className="image" /></span><span className="table-text-title">ETH Vaults (ETH)</span></span>
                                <span className="small-table-content-wrap"><span className="table-text-bold">{ethDeposits1mAgo}</span><span className="table-text-bold">{ethDeposits}</span><span className="table-text-bold">{ethVaultChange >= 0 ? <span className="change-positive">+{ethVaultChange}%</span> : <span className="change-negative">{ethVaultChange}%</span>}</span></span>
                                <span className="small-table-title-wrap"><span className="small-table-row"></span><span className="table-text-title">ETH price</span></span>
                                <span className="small-table-content-wrap"><span className="table-text-bold">${Math.round(this.props.ethPrice[this.props.ethPrice.length-31]*100)/100}</span><span className="table-text-bold">${Math.round(this.props.ethPrice[this.props.ethPrice.length-1]*100)/100}</span><span className="change-wrapper">{ethPriceChange >= 0 ? <span className="change-positive">+{ethPriceChange}%</span> : <span className="change-negative">{ethPriceChange}%</span>}</span></span>
                                <span className="small-table-title-wrap"><span className="small-table-row"></span><span className="table-text-title-margin">ETH Vaults ($)</span></span>
                                <span className="small-table-content-wrap"><span className="important-5">${ethDepositsUsd1mAgo}M</span><span className="important-5">${ethDepositsUsd}M</span><span className="important-5">{ethVaultUsdChange >= 0 ? <span className="change-positive">+{ethVaultUsdChange}%</span> : <span className="change-negative">{ethVaultUsdChange}%</span>}</span></span>
                                <span className="cell-disappear"><span className="small-table-row"></span><span className="table-text-title"></span></span>
                                <span className="cell-disappear"><span className="table-text-bold"></span><span></span><span></span></span>
                                <span className="small-table-title-wrap"><span className="small-table-row"></span><span className="important-4">Total</span></span>
                                <span className="small-table-content-wrap"><span className="important-3">${deposits1mAgo}M</span><span className="important-3">${deposits}M</span><span className="important-3">{depositsChange >= 0 ? <span className="change-positive">+{depositsChange}%</span> : <span className="change-negative">{depositsChange}%</span>}</span></span>
                            </div>
                            <div className="small-table-inner-8">
                                <span className="small-table-row"></span><span className="important-4"></span>
                                <span className="table-text-bold"></span><span></span>
                                <span className="small-table-row"></span><span className="table-text-bold">Staking TVL</span>
                                <span>Amount</span><span>USD Value</span>
                                <span className="small-table-row"><img src={ require('./logos/alcx_logo.png').default } alt="ALCX logo" className="image" /></span><span className="table-text-title">ALCX</span>
                                <span className="table-text-bold">{Math.round(this.props.alchemixStaking.alcx)}</span><span className="important-2">${Math.round(this.props.stakedAlcxValue/10000)/100}M</span>
                                <span className="small-table-row"><img src={ require('./logos/alcx_eth_slp.png').default } alt="ALCX/ETH SLP" className="image" /></span><span className="table-text-title">ALCX/ETH SLP</span>
                                <span className="table-text-bold">{Math.round(this.props.alchemixStaking.alcxEthSlp)}</span><span className="important-2">${Math.round(this.props.stakingSlpValue/10000)/100}M</span>
                                <span className="small-table-row-2"></span><span></span>
                                <span className="important-3">Total</span><span className="important-3">${Math.round((this.props.stakedAlcxValue + this.props.stakingSlpValue)/10000)/100}M</span>
                            </div>
                        </div>
                        <div className="small-table-4">
                            <h3>Treasury and Elixirs</h3>
                            <div className="small-table-inner-9">
                                <span className="small-table-row"></span><span className="table-text-bold">Treasury</span><span>USD value</span><span></span>
                                <span className="small-table-row"><img src={ require('./logos/treasury.png').default } alt="alusd3crv logo" className="image" /></span><span className="table-text-title">Total Treasury</span><span className="important-2">${Math.round(this.props.treasuryTotal/10000)/100}M</span><span></span>
                                <span className="small-table-row"><img src={ require('./logos/other_logo.png').default } alt="alusd3crv logo" className="image" /></span><span className="table-text-title">Non-ALCX Treasury</span><span className="important-2">${Math.round(this.props.treasuryNonAlcx/10000)/100}M</span><span></span>
                                <span className="small-table-row"></span><span className="important-4"></span><span className="table-text-bold"></span><span></span>
                                <span className="small-table-row"></span><span className="table-text-bold">Elixirs</span><span>Amount</span><span>USD value</span>
                                <span className="small-table-row"><img src={ require('./logos/alusd_crv.png').default } alt="alusd3crv logo" className="image" /></span><span className="table-text-title">alUSD3Crv</span><span className="table-text-bold">{Math.round(this.props.treasury.cvxAlUsd3CrvElixir/10000)/100}M</span><span className="important-2">${Math.round(this.props.treasury.cvxAlUsd3CrvElixir/10000)/100}M</span>
                                <span className="small-table-row"><img src={ require('./logos/eth_aleth.png').default } alt="alethcurve logo" className="image" /></span><span className="table-text-title">alETHCrv</span><span className="table-text-bold">{Math.round(this.props.treasury.cvxAlEthCrvElixir)}</span><span className="important-2">${Math.round(this.props.elixirCvxAlEthCrvValue/10000)/100}M</span>
                                <span className="small-table-row"><img src={ require('./logos/dai.png').default } alt="DAI logo" className="image" /></span><span className="table-text-title">DAI</span><span className="table-text-bold">{Math.round(this.props.treasury.daiInElixir/10000)/100}M</span><span className="important-2">${Math.round(this.props.treasury.daiInElixir/10000)/100}M</span>
                                <span className="small-table-row"><img src={ require('./logos/eth.png').default } alt="ETH logo" className="image" /></span><span className="table-text-title">ETH</span><span className="table-text-bold">{Math.round(this.props.treasury.wethInElixir)}</span><span className="important-2">${Math.round(this.props.wethInElixirUsd/10000)/100}M</span>
                                <span className="small-table-row-2"></span><span></span><span className="important-3">Total</span><span className="important-3">${Math.round((this.props.elixirCvxAlEthCrvValue+this.props.treasury.cvxAlUsd3CrvElixir+this.props.treasury.daiInElixir+this.props.wethInElixirUsd)/10000)/100}M</span>
                            </div>
                        </div>
                    </div>}
                </div>
            </>
        );
    }
}