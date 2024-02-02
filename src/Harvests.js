import React from 'react';
import ChartHarvestsUsd from './charts/ChartHarvestsUsd';
import ChartHarvestsEth from './charts/ChartHarvestsEth';
import { addresses } from './Constants';
import { formatDate, datesEqual } from './Functions';
import LoadingComponent from './LoadingComponent';

export default class Harvests extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          harvestsLoading: true,
          harvests: 0
        }
      }
    
      componentDidMount(){
        this.getHarvests();
      }

    getSubgraphRequestOptions(query){
        return {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: query })
        }
    }
    
    calculateHarvests(result){
        //console.log(result)
        let startDate = new Date(1648591199*1000); //March 29th
        let today = new Date();
        let dateTracker = new Date(result[0].timestamp*1000);
        let resultIndex = 0;
        let harvests = { date:[], yvDai: [], yvUsdc: [], yvUsdt: [], aDai: [], aUsdc: [], aUsdt: [], yvWeth: [], wstEth: [], rEth: [], aWeth: []};
        let tempYvDai = 0;
        let tempYvUsdc = 0;
        let tempYvUsdt = 0;
        let tempADai = 0;
        let tempAUsdc = 0;
        let tempAUsdt = 0;
        let tempYvWeth = 0;
        let tempWstEth = 0;
        let tempReth = 0;
        let tempAWeth = 0;
        for(let j=0;startDate<today;j++){
    
          for(let i=resultIndex;i<result.length;i++){
            let tempDate = new Date(result[i].timestamp*1000);
            if(tempDate>startDate) break;
    
            if(!datesEqual(tempDate, dateTracker)) dateTracker = tempDate;
    
            tempYvDai = result[i].yieldToken === addresses.yvDaiAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempYvDai) : tempYvDai;
            tempYvUsdc = result[i].yieldToken === addresses.yvUsdcAddress ? (result[i].totalHarvested/Math.pow(10, 6) + tempYvUsdc) : tempYvUsdc;
            tempYvUsdt = result[i].yieldToken === addresses.yvUsdtAddress ? (result[i].totalHarvested/Math.pow(10, 6) + tempYvUsdt) : tempYvUsdt;
            tempADai = result[i].yieldToken === addresses.aDaiAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempADai) : tempADai;
            tempAUsdc = result[i].yieldToken === addresses.aUsdcAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempAUsdc) : tempAUsdc;
            tempAUsdt = result[i].yieldToken === addresses.aUsdtAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempAUsdt) : tempAUsdt;
            tempYvWeth = result[i].yieldToken === addresses.yvWethAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempYvWeth) : tempYvWeth;
            tempWstEth = result[i].yieldToken === addresses.wstEthAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempWstEth) : tempWstEth;
            tempReth = result[i].yieldToken === addresses.rEthAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempReth) : tempReth;
            tempAWeth = result[i].yieldToken === addresses.aWethAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempAWeth) : tempAWeth;
            resultIndex++;
          }
          harvests.yvDai[j] = Math.round(tempYvDai);
          harvests.yvUsdc[j] = Math.round(tempYvUsdc);
          harvests.yvUsdt[j] = Math.round(tempYvUsdt);
          harvests.aDai[j] = Math.round(tempADai);
          harvests.aUsdc[j] = Math.round(tempAUsdc);
          harvests.aUsdt[j] = Math.round(tempAUsdt);
          harvests.yvWeth[j] = Math.round(tempYvWeth*1000)/1000;
          harvests.wstEth[j] = Math.round(tempWstEth*1000)/1000;
          harvests.rEth[j] = Math.round(tempReth*1000)/1000;
          harvests.aWeth[j] = Math.round(tempAWeth*1000)/1000;
          harvests.date[j] = formatDate(startDate, 0);
          startDate.setDate(startDate.getDate() + 1);
          tempYvDai = 0;
          tempYvUsdc = 0;
          tempYvUsdt = 0;
          tempADai = 0;
          tempAUsdc = 0;
          tempAUsdt = 0;
          tempYvWeth = 0;
          tempWstEth = 0;
          tempReth = 0;
          tempAWeth = 0;
        }
        //console.log(harvests)
        this.setState({ harvests: harvests, harvestsLoading: false });
    }

    getHarvests(){
        const harvestsQuery = `{
            alchemistHarvestEvents(
              first: 1000
              orderBy: timestamp
              orderDirection: desc
              ){
              timestamp,
              yieldToken,
              totalHarvested,
              contract {
                id
              }
            }
          }`

          fetch("https://subgraph.satsuma-prod.com/de91695d5fb0/alchemix--802384/alchemix-v2/api", this.getSubgraphRequestOptions(harvestsQuery))
          .then(res => res.json()).then((result) => {
              this.calculateHarvests(result.data.alchemistHarvestEvents.reverse())
            },
            (error) => { console.log(error) })

    }

    render(){
        return (
            <>
                <div className="section-header">
                    <img src={ require('./logos/harvests_thin.svg').default } alt="harvest logo" className="image3" />
                    <h2>Harvests</h2>
                </div>
                <div className="summary">
                    Harvests are denominated in the underlying assets, i.e. DAI, USDC, USDT, ETH, etc. and not the yield token that is harvested.<br/>
                    Thus the legends on the charts only show which vault was harvested, but the displayed value is in the underlying asset.
                </div>
                <div className="section-wrapper">
                    <div className="chart-title">
                    <h3>Stablecoin Harvests</h3>
                    { this.state.harvestsLoading ? <LoadingComponent /> :
                        <ChartHarvestsUsd harvests={this.state.harvests} />
                    }
                    </div>
                    <div className="chart-title">
                    <h3>Eth Harvests</h3>
                    { this.state.harvestsLoading ? <LoadingComponent /> :
                        <ChartHarvestsEth harvests={this.state.harvests} />
                    }
                    </div>
                </div>
            </>
        );
    }
}