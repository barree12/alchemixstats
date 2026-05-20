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
          alchemistTvl: {},
          alchemistTvlLoading: true
        };
        this.toggleEthCurrency = this.toggleEthCurrency.bind(this);
      }

      componentDidMount(){
        this.getData();
      }

    toggleEthCurrency(){
        this.setState({ ethCurrencyToggle: !this.state.ethCurrencyToggle });
    }

    calculateAlchemistTvl(result){
        let startDate = new Date(1647385201*1000); //March 16th
        let today = new Date();
        let dateTracker = new Date(result[0].timestamp*1000);
        let resultIndex = 0;
        let alchemistTvl = { date:[], yvDai: [], yvUsdc: [], yvUsdt: [], yvWeth: [], wstEth: [], rEth: [], aWeth: [], aUsdc: [], aDai: [], aUsdt: [], pxEth: [], vaUsdc: [], vaDai: [], vaFrax: [], vaEth: [], frxEth: [] };
        let tempYvDai = 0;
        let tempYvUsdc = 0;
        let tempYvUsdt = 0;
        let tempADai = 0;
        let tempAUsdc = 0;
        let tempAUsdt = 0;
        let tempPxEth = 0;
        let tempVaUsdc = 0;
        let tempVaDai = 0;
        let tempVaFrax = 0;
        let tempYvWeth = 0;
        let tempAWeth = 0;
        let tempWstEth = 0;
        let tempReth = 0;
        let tempVaEth = 0;
        let tempFrxEth = 0;
        for(let j=0;startDate<today;j++){
    
          for(let i=resultIndex;i<result.length;i++){
            let tempDate = new Date(result[i].timestamp*1000);
            if(tempDate>startDate) break;
    
            if(!datesEqual(tempDate, dateTracker)) dateTracker = tempDate;
    
            tempYvDai = result[i].token.symbol === "yvDAI" && result[i].amount ? result[i].amount/Math.pow(10, 18) : tempYvDai;
            tempYvUsdc = result[i].token.symbol === "yvUSDC" && result[i].amount ? result[i].amount/Math.pow(10, 6) : tempYvUsdc;
            tempYvUsdt = result[i].token.symbol === "yvUSDT" && result[i].amount ? result[i].amount/Math.pow(10, 6) : tempYvUsdt;
            tempADai = result[i].token.symbol === "s_aDAI" && result[i].amount ? result[i].amount/Math.pow(10, 18) : tempADai;
            tempPxEth = result[i].token.symbol === "apxETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempPxEth;
            tempAUsdc = result[i].token.symbol === "s_aUSDC" && result[i].amount ? result[i].amount/Math.pow(10, 6) : tempAUsdc;
            tempAUsdt = result[i].token.symbol === "s_aUSDT" && result[i].amount ? result[i].amount/Math.pow(10, 6) : tempAUsdt;
            tempVaUsdc = result[i].token.symbol === "vaUSDC" && result[i].amount ? result[i].amount/Math.pow(10, 18) : tempVaUsdc;
            tempVaDai = result[i].token.symbol === "vaDAI" && result[i].amount ? result[i].amount/Math.pow(10, 18) : tempVaDai;
            tempVaFrax = result[i].token.symbol === "vaFRAX" && result[i].amount ? result[i].amount/Math.pow(10, 18) : tempVaFrax;
            tempYvWeth = result[i].token.symbol === "yvWETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempYvWeth;
            tempAWeth = result[i].token.symbol === "s_aWETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempAWeth;
            tempWstEth = result[i].token.symbol === "wstETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempWstEth;
            tempReth = result[i].token.symbol === "rETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempReth;
            tempVaEth = result[i].token.symbol === "vaETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempVaEth;
            tempFrxEth = result[i].token.symbol === "sfrxETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempFrxEth;
            resultIndex++;
          }
          alchemistTvl.yvDai[j] = Math.round(tempYvDai/10000)/100;
          if(j>0 && !tempYvDai) alchemistTvl.yvDai[j] = alchemistTvl.yvDai[j-1];
          alchemistTvl.yvUsdc[j] = Math.round(tempYvUsdc/10000)/100;
          if(j>0 && !tempYvUsdc) alchemistTvl.yvUsdc[j] = alchemistTvl.yvUsdc[j-1];
          alchemistTvl.yvUsdt[j] = Math.round(tempYvUsdt/10000)/100;
          if(j>0 && !tempYvUsdt) alchemistTvl.yvUsdt[j] = alchemistTvl.yvUsdt[j-1];
          alchemistTvl.aDai[j] = Math.round(tempADai/10000)/100;
          if(j>0 && !tempADai) alchemistTvl.aDai[j] = alchemistTvl.aDai[j-1];
          alchemistTvl.aUsdc[j] = Math.round(tempAUsdc/10000)/100;
          if(j>0 && !tempAUsdc) alchemistTvl.aUsdc[j] = alchemistTvl.aUsdc[j-1];
          alchemistTvl.aUsdt[j] = Math.round(tempAUsdt/10000)/100;
          if(j>0 && !tempAUsdt) alchemistTvl.aUsdt[j] = alchemistTvl.aUsdt[j-1];
          alchemistTvl.pxEth[j] = Math.round(tempPxEth/10000)/100;
          if(j>0 && !tempPxEth) alchemistTvl.pxEth[j] = alchemistTvl.pxEth[j-1];
          alchemistTvl.vaUsdc[j] = Math.round(tempVaUsdc/10000)/100;
          if(j>0 && !tempVaUsdc) alchemistTvl.vaUsdc[j] = alchemistTvl.vaUsdc[j-1];
          alchemistTvl.vaDai[j] = Math.round(tempVaDai/10000)/100;
          if(j>0 && !tempVaDai) alchemistTvl.vaDai[j] = alchemistTvl.vaDai[j-1];
          alchemistTvl.vaFrax[j] = Math.round(tempVaFrax/10000)/100;
          if(j>0 && !tempVaFrax) alchemistTvl.vaFrax[j] = alchemistTvl.vaFrax[j-1];
          alchemistTvl.yvWeth[j] = Math.round(tempYvWeth/10000)/100;
          if(j>0 && !tempYvWeth) alchemistTvl.yvWeth[j] = alchemistTvl.yvWeth[j-1];
          alchemistTvl.aWeth[j] = Math.round(tempAWeth/10000)/100;
          if(j>0 && !tempAWeth) alchemistTvl.aWeth[j] = alchemistTvl.aWeth[j-1];
          alchemistTvl.wstEth[j] = Math.round(tempWstEth/10000)/100;
          if(j>0 && !tempWstEth) alchemistTvl.wstEth[j] = alchemistTvl.wstEth[j-1];
          alchemistTvl.rEth[j] = Math.round(tempReth/10000)/100;
          if(j>0 && !tempReth) alchemistTvl.rEth[j] = alchemistTvl.rEth[j-1];
          alchemistTvl.vaEth[j] = Math.round(tempVaEth/10000)/100;
          if(j>0 && !tempVaEth) alchemistTvl.vaEth[j] = alchemistTvl.vaEth[j-1];
          alchemistTvl.frxEth[j] = Math.round(tempFrxEth/10000)/100;
          if(j>0 && !tempFrxEth) alchemistTvl.frxEth[j] = alchemistTvl.frxEth[j-1];
          alchemistTvl.date[j] = formatDate(startDate, 0);
          startDate.setDate(startDate.getDate() + 1);
          /*tempYvDai = 0;
          tempYvUsdc = 0;
          tempYvUsdt = 0;*/
        }
        this.setState({ alchemistTvl: alchemistTvl, alchemistTvlLoading: false });
      }

      getAlchemistTvlQuery(skip){
        return `{
          alchemistTVLHistories(
            first: 1000
            skip: ` + skip + `
            orderBy: timestamp
            orderDirection: desc
          )
          {
            token
              {
                symbol
              }
            amount
            timestamp
          }
        }`
      }

    getSubgraphRequestOptions(query){
        return {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: query })
        }
      }

    getData(){
        const alchemistTvl = this.getAlchemistTvlQuery(0);
        const alchemistTvlSkip1000 = this.getAlchemistTvlQuery(1000)
        const alchemistTvlSkip2000 = this.getAlchemistTvlQuery(2000)
        const alchemistTvlSkip3000 = this.getAlchemistTvlQuery(3000)
        const alchemistTvlSkip4000 = this.getAlchemistTvlQuery(4000)
        const alchemistTvlSkip5000 = this.getAlchemistTvlQuery(5000)
        //const alchemistTvlSkip6000 = this.getAlchemistTvlQuery(5001)

        Promise.all([fetch("https://gateway-arbitrum.network.thegraph.com/api/c1a654d7642ea0e30d259cd58e8b41d5/subgraphs/id/FQHEgGziETEqw7oV32wLvFGCPthqj5YDMm7jhVtLn5PJ", this.getSubgraphRequestOptions(alchemistTvl)).then(res => res.json()),
            fetch("https://gateway-arbitrum.network.thegraph.com/api/c1a654d7642ea0e30d259cd58e8b41d5/subgraphs/id/FQHEgGziETEqw7oV32wLvFGCPthqj5YDMm7jhVtLn5PJ", this.getSubgraphRequestOptions(alchemistTvlSkip1000)).then(res => res.json()),
            fetch("https://gateway-arbitrum.network.thegraph.com/api/c1a654d7642ea0e30d259cd58e8b41d5/subgraphs/id/FQHEgGziETEqw7oV32wLvFGCPthqj5YDMm7jhVtLn5PJ", this.getSubgraphRequestOptions(alchemistTvlSkip2000)).then(res => res.json())
          ])
            .then(([tvl1, tvl2, tvl3]) => {
                wait(1500);
                Promise.all([fetch("https://gateway-arbitrum.network.thegraph.com/api/c1a654d7642ea0e30d259cd58e8b41d5/subgraphs/id/FQHEgGziETEqw7oV32wLvFGCPthqj5YDMm7jhVtLn5PJ", this.getSubgraphRequestOptions(alchemistTvlSkip3000)).then(res => res.json()),
                fetch("https://gateway-arbitrum.network.thegraph.com/api/c1a654d7642ea0e30d259cd58e8b41d5/subgraphs/id/FQHEgGziETEqw7oV32wLvFGCPthqj5YDMm7jhVtLn5PJ", this.getSubgraphRequestOptions(alchemistTvlSkip4000)).then(res => res.json()),
                fetch("https://gateway-arbitrum.network.thegraph.com/api/c1a654d7642ea0e30d259cd58e8b41d5/subgraphs/id/FQHEgGziETEqw7oV32wLvFGCPthqj5YDMm7jhVtLn5PJ", this.getSubgraphRequestOptions(alchemistTvlSkip5000)).then(res => res.json())])
                .then(([tvl4, tvl5, tvl6]) => {
                    this.calculateAlchemistTvl(tvl6.data.alchemistTVLHistories.reverse().concat(tvl5.data.alchemistTVLHistories.reverse().concat(tvl4.data.alchemistTVLHistories.reverse().concat(tvl3.data.alchemistTVLHistories.reverse().concat(tvl2.data.alchemistTVLHistories.reverse().concat(tvl1.data.alchemistTVLHistories.reverse().concat()))))))
                    }).catch(function(err) { console.log(err.message) });
        }).catch(function(err) { console.log(err.message) });
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
                    {this.state.alchemistStatsLoading ? <LoadingComponent /> :
                    <ChartMainnetAlchemistUsdTVL alchemistStats={this.props.alchemistStats} />}
                    </div>
                    <div className="chart-title">
                    <h3>Alchemist V3 ETH TVL</h3>
                    {this.state.alchemistStatsLoading ? <LoadingComponent /> :
                    <ChartMainnetAlchemistEthTVL alchemistStats={this.props.alchemistStats} />}
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