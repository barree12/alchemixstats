import React from 'react';
import ChartCrvPoolRatios from './charts/ChartCrvPoolRatios';
//import { Button, ButtonGroup } from '@mui/material';
import { styleNumber } from './Functions';
import usdcLogo from './logos/usdc.png';
import usdtLogo from './logos/usdt.png';
import daiLogo from './logos/dai.png';
import ethLogo from './logos/eth.png';
import fraxLogo from './logos/frax.png';
import opLogo from './logos/op.png';
import premiaLogo from './logos/premia.png';
import otherLogo from './logos/other_logo.png';
import alEthLogo from './logos/aleth_blue.svg';
import alcxLogo from './logos/alcx_logo_only.svg';
import alUsdLogo from './logos/alusd.svg';
import arbLogo from './logos/arbi.png';
import crvLogo from './logos/crv.png';
import cvxLogo from './logos/cvx.png';
import sdtLogo from './logos/stakedao.png';
import veloLogo from './logos/velo_round.png';
import auraLogo from './logos/aura.png';
import yfiLogo from './logos/yearn.png';
import ramLogo from './logos/ram.png';
import alusdfraxbpLogo from './logos/frax_crv.png';
import alusd3crvLogo from './logos/alusd_crv.png';
import alEthFrxEthCurveLogo from './logos/aleth_frxeth.png';
import alEthWethVelodromeLogo from './logos/aleth_opti.png';
import alUsdUsdcVelodromeLogo from './logos/alusd_opti.png';
import alEthFrxEthRamsesLogo from './logos/aleth_arbi.png';
import alUsdFraxRamsesLogo from './logos/alusd_arbi.png';
import fxsLogo from './logos/fxs.png';
import aeroLogo from './logos/aero.png';
import LoadingComponent from './LoadingComponent';

export default class Treasury extends React.Component {

    formatArrays(array, length, other){
        let calcArray = array.slice(length);
        let resultArray = array.slice(0,length);
        let totalRest = { symbol: "Other", amount: 0};
        for(let i=0;i<calcArray.length;i++) totalRest.amount += calcArray[i].amount;
        if(array.length > length && other) resultArray.push(totalRest);
        return resultArray;
    }

    getLogo(logo){
        let returnLogo;
        switch(logo){
        case "USDC": returnLogo = usdcLogo;
        break;
        case "USDT": returnLogo = usdtLogo;
        break;
        case "DAI": returnLogo = daiLogo;
        break;
        case "ETH": returnLogo = ethLogo;
        break;
        case "FRAX": returnLogo = fraxLogo;
        break;
        case "OP": returnLogo = opLogo;
        break;
        case "PREMIA": returnLogo = premiaLogo;
        break;
        case "alETH": returnLogo = alEthLogo;
        break;
        case "alUSD": returnLogo = alUsdLogo;
        break;
        case "ALCX": returnLogo = alcxLogo;
        break;
        case "ARB": returnLogo = arbLogo;
        break;
        case "sdCRV": returnLogo = crvLogo;
        break;
        case "CRV": returnLogo = crvLogo;
        break;
        case "CVX": returnLogo = cvxLogo;
        break;
        case "SDT": returnLogo = sdtLogo;
        break;
        case "VELO": returnLogo = veloLogo;
        break;
        case "AURA": returnLogo = auraLogo;
        break;
        case "YFI": returnLogo = yfiLogo;
        break;
        case "RAM": returnLogo = ramLogo;
        break;
        case "alusdfraxbp": returnLogo = alusdfraxbpLogo;
        break;
        case "alusd3crv": returnLogo = alusd3crvLogo;
        break;
        case "alethfrxethcurve": returnLogo = alEthFrxEthCurveLogo;
        break;
        case "alethwethvelo": returnLogo = alEthWethVelodromeLogo;
        break;
        case "alusdusdcvelo": returnLogo = alUsdUsdcVelodromeLogo;
        break;
        case "alethfrxethramses": returnLogo = alEthFrxEthRamsesLogo;
        break;
        case "alusdfraxramses": returnLogo = alUsdFraxRamsesLogo;
        break;
        case "FXS": returnLogo = fxsLogo;
        break;
        case "sdFXS": returnLogo = fxsLogo;
        break;
        case "AERO": returnLogo = aeroLogo;
        break;
        default: returnLogo = otherLogo;
        }
        return returnLogo;
    }

    render(){

        return (
            <>
                <div className="section-header">
                    <img src={ require('./logos/treasury_thin.svg').default } alt="Treasury logo" className="image3" />
                    <h2>Holdings</h2>
                </div>

            <div className="section-wrapper">
            <div className="summary">
                There are 7 main treasury addresses of the Alchemix protocol.<br/>
                <span>
                    <a target="_blank" rel="noreferrer" href="https://debank.com/profile/0x9e2b6378ee8ad2a4a95fe481d63caba8fb0ebbf9">
                    Treasury Wallet 1</a>, <a target="_blank" rel="noreferrer" href="https://debank.com/profile/0x8392f6669292fa56123f71949b52d883ae57e225">
                    Treasury Wallet 2</a>, <a target="_blank" rel="noreferrer" href="https://debank.com/profile/0x3216d2a52f0094aa860ca090bc5c335de36e6273">
                    SDT Controller</a>, <a target="_blank" rel="noreferrer" href="https://debank.com/profile/0xc224bf25dcc99236f00843c7d8c4194abe8aa94a">
                    Optimism Multisig</a>, <a target="_blank" rel="noreferrer" href="https://debank.com/profile/0x7e108711771dfdb10743f016d46d75a9379ca043">
                    Arbitrum Multisig</a>, <a target="_blank" rel="noreferrer" href="https://debank.com/profile/0x24e9cbb9ddda1247ae4b4eeee3c569a2190ac401">
                    Base Multisig</a>, <a target="_blank" rel="noreferrer" href="https://debank.com/profile/0x0f5c3a8b62ff7639895bb9737c5befb711c4f7f4">
                    Metis Multisig</a><br/>
                </span><br/>
                There are 4 addresses for the alUSD and alETH Elixirs.<br/>
                The Elixirs are the AMOs (Algorithmic Market Operator) of Alchemix.<br/>
                <span>
                    <a target="_blank" rel="noreferrer" href="https://debank.com/profile/0x06378717d86b8cd2dba58c87383da1eda92d3495">
                    alUSD-FRAXBP Elixir</a>, <a target="_blank" rel="noreferrer" href="https://debank.com/profile/0x9fb54d1f6f506feb4c65b721be931e59bb538c63">
                    alETH-frxETH Elixir</a>, <a target="_blank" rel="noreferrer" href="https://debank.com/profile/0xb29617209961db995dd30a4ab94ba0034a4284f9">
                    Optimism Elixir</a>, <a target="_blank" rel="noreferrer" href="https://debank.com/profile/0xb10356c80658fc71da0ff4d28052b62f9ed7d7e8">
                    Arbitrum Elixir</a>
                </span>
                {this.props.debankDataLoading ? <LoadingComponent /> :
                <div className="tvl-tables-2">
                        <div className="small-table">
                            <h3>Strategic Holdings</h3>
                            <div className="small-table-inner-map">
                            <div className="map-row"><span className="small-table-row"></span><span className="table-text-bold">USD value</span></div>
                            {this.formatArrays(this.props.debankData.sortedTreasuryStrategicAssets, 9, false).map((asset, index) => {
                              return(
                                <div className="map-row" key={asset.symbol}><span className="small-table-row"><img src={this.getLogo(asset.symbol)} alt="logo" className="image" />{asset.symbol}</span><span className="table-text-bold">${styleNumber(asset.amount)}</span></div>
                              )
                            })}
                            <div className="map-row"><span className="small-table-row-2">TOTAL</span><span className="important-3">${styleNumber(this.props.debankData.totalTreasuryStrategic)}</span></div>
                            </div>
                        </div>
                        <div className="small-table">
                            <h3>Liquid Treasury</h3>
                            <div className="small-table-inner-map">
                            <div className="map-row"><span className="small-table-row"></span><span className="table-text-bold">USD value</span></div>
                            {this.formatArrays(this.props.debankData.sortedTreasuryAssets, 10, true).map((asset, index) => {
                              return(
                                <div className="map-row" key={asset.symbol}><span className="small-table-row"><img src={this.getLogo(asset.symbol)} alt="logo" className="image" />{asset.symbol}</span><span className="table-text-bold">${styleNumber(asset.amount)}</span></div>
                              )
                            })}
                            <div className="map-row"><span className="small-table-row-2">TOTAL</span><span className="important-3">${styleNumber(this.props.debankData.totalTreasury)}</span></div>
                            </div>
                        </div>
                        <div className="small-table">
                            <h3>Elixir</h3>
                            <div className="small-table-inner-map">
                            <div className="map-row"><span className="small-table-row"></span><span className="table-text-bold">USD value</span></div>
                            <div className="map-row"><span className="small-table-row"><img src={this.getLogo("alusdfraxbp")} alt="logo" className="image" />alUSD-FRAXBP</span><span className="table-text-bold">${styleNumber(this.props.debankData.alUsdFraxBpInElixir)}</span></div>
                            <div className="map-row"><span className="small-table-row"><img src={this.getLogo("alethfrxethcurve")} alt="logo" className="image" />alETH-frxETH</span><span className="table-text-bold">${styleNumber(this.props.debankData.alEthFrxEthInElixir)}</span></div>
                            <div className="map-row"><span className="small-table-row"><img src={this.getLogo("alethwethvelo")} alt="logo" className="image" />alETH Velo</span><span className="table-text-bold">${styleNumber(this.props.debankData.alEthWethVeloInElixir)}</span></div>
                            <div className="map-row"><span className="small-table-row"><img src={this.getLogo("alusdusdcvelo")} alt="logo" className="image" />alUSD Velo</span><span className="table-text-bold">${styleNumber(this.props.debankData.alUsdUsdcVeloInElixir)}</span></div>
                            <div className="map-row"><span className="small-table-row"><img src={this.getLogo("alethfrxethramses")} alt="logo" className="image" />alETH Ramses</span><span className="table-text-bold">${styleNumber(this.props.debankData.alEthFrxEthRamsesInElixir)}</span></div>
                            <div className="map-row"><span className="small-table-row"><img src={this.getLogo("alusdfraxramses")} alt="logo" className="image" />alUSD Ramses</span><span className="table-text-bold">${styleNumber(this.props.debankData.alUsdFraxRamsesInElixir)}</span></div>
                              
                            <div className="map-row"><span className="small-table-row-2">TOTAL</span><span className="important-3">${styleNumber(this.props.debankData.totalElixir)}</span></div>
                            </div>
                        </div>
                </div>}
                <div className="section-wrapper">
                    <div className="chart-title">
                        <h3>Liquidity Pool Ownership</h3>
                        {this.props.debankDataLoading ? <LoadingComponent /> :
                            <ChartCrvPoolRatios 
                                alAssetCrvSupply={this.props.alAssetCrvSupply}
                                debankData={this.props.debankData}
                                alEthFrxEthTotalValue={this.props.alEthFrxEthTotalValue}
                        />}
                    </div>
                </div>
            </div>
            
            
            </div>

            </>
        );
    }
}