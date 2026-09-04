import React from 'react';
import LoadingComponent from './LoadingComponent';
import ChartRevenues from './charts/ChartRevenues';
import { addresses, abis } from './Constants';

export default class Revenues extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          revenue: {},
          protocolFees: {},
          revenueLoading: true,
          ethCurrencyToggle: true,
        };
      }

    componentDidMount() {
      this.getRevenues();
    }

    getDetailedRevenue(revenues, subgraphResult){
      console.log(revenues)
      let revenueArray = {
        treasury: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        elixir: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        harvest: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      }
      let protocolFees = {};
      let dateHelper = new Date();
      let currentDate = new Date(dateHelper.getFullYear(), dateHelper.getMonth(), 0);
      let accruedSharesUsd = 0;
      let accruedSharesEth = 0;
      //console.log(currentDate)      
      
        for(let i=0;i<revenues.length;i++){
          
          //let revenueDate = revenues[i].DateTime.split(" ")[0]
          let [year, month, day] = revenues[i].date.split('-');
          let date = new Date(+year, month - 1, +day);
          let monthDifference = 12 * (currentDate.getFullYear() - date.getFullYear()) + (currentDate.getMonth() - date.getMonth());
          //let monthDifference = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 31))
          //console.log(monthDifference)
          //if(month === currentDate.getMonth() && year === currentDate.getFullYear()){
            if(revenues[i].category === 'MYT performance fees') revenueArray.harvest[monthDifference+1] += parseInt(revenues[i].usdValue) 
            else if(revenues[i].category === 'Elixir Revenue') revenueArray.elixir[monthDifference+1] += parseInt(revenues[i].usdValue)
            else { revenueArray.treasury[monthDifference+1] += parseInt(revenues[i].usdValue)
            //if(parseInt(revenues[i].usdValue) > 1000000) console.log(i)
            }
          //}
        }

        for(let i=0;i<subgraphResult.length;i++){
          if(subgraphResult[i].myt === addresses.mainnetUsdcMyt || subgraphResult[i].myt === addresses.optimismUsdcMyt) accruedSharesUsd += parseInt(subgraphResult[i].performanceFeeShares)
          else if(subgraphResult[i].myt === addresses.mainnetEthMyt || subgraphResult[i].myt === addresses.optimismEthMyt) accruedSharesEth += parseInt(subgraphResult[i].performanceFeeShares)
        }
      protocolFees.usdc = accruedSharesUsd/Math.pow(10, 18)
      protocolFees.eth = accruedSharesEth/Math.pow(10, 18)
      this.setState({ revenueLoading: false, revenue: revenueArray, protocolFees: protocolFees })
    }

    getSubgraphQuery(){
      return `{
        mytAccrueInterests(orderBy: "timestamp", orderDirection: "desc", limit: 1000) {
          items {
            performanceFeeShares
            myt
            chain
            timestamp
          }
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

    getRevenues(){

      const subgraphQuery = this.getSubgraphQuery();
      
      let authorizationHeader = {
        method: 'GET',
        headers: { 
          'pinata_api_key': '7237805a818b4433e8a1',
          'pinata_secret_api_key': '1b5bf925a71ba50d2649a1861e00210ac142a74a20562f743f160d6d820cad23'
        }
      }

      Promise.all([
        fetch("https://api.pinata.cloud/data/pinList?includeCount=false&metadata[name]=den_revenue.json&status=pinned&pageLimit=1000", authorizationHeader).then(res => res.json()),
        fetch("https://ponder.alchemix.fi", this.getSubgraphRequestOptions(subgraphQuery)).then(res => res.json()),
      ])
      .then(([result, subgraphResult]) => {
        console.log(subgraphResult)
        let url = "https://ipfs.imimim.info/ipfs/" + result.rows[0].ipfs_pin_hash;
              fetch(url).then(res => res.json()).then(
                (result2) => { 
                  this.getDetailedRevenue(result2, subgraphResult.data.mytAccrueInterests.items) },
                (error) => { console.log(error) })

      })
      .catch(function(err) {
        console.log(err.message);
      });

      /*fetch("https://api.pinata.cloud/data/pinList?includeCount=false&metadata[name]=den_revenue.json&status=pinned&pageLimit=1000", authorizationHeader).then(res => res.json()).then(
          (result) => { 
            console.log(result);

            let url = "https://ipfs.imimim.info/ipfs/" + result.rows[0].ipfs_pin_hash;
            fetch(url).then(res => res.json()).then(
              (result2) => { 
                this.getDetailedRevenue(result2) },
              (error) => { console.log(error) })
          
          },
          (error) => { console.log(error) })*/

    }

    render(){
        let harvestRevenue = this.state.revenueLoading ? 0 : (this.state.revenue.harvest[1] + this.state.revenue.harvest[2] + this.state.revenue.harvest[3])*4/1000000;
        let treasuryRevenue = this.state.revenueLoading ? 0 : (this.state.revenue.treasury[1] + this.state.revenue.treasury[2] + this.state.revenue.treasury[3])*4/1000000;
        let elixirRevenue = this.state.revenueLoading ? 0 : (this.state.revenue.elixir[1] + this.state.revenue.elixir[2] + this.state.revenue.elixir[3])*4/1000000;
        let totalRevenue = harvestRevenue + treasuryRevenue + elixirRevenue;
        return (
            <>
                <div className="section-header">
                    <img src={ require('./logos/debt_thin.svg').default } alt="revenues logo" className="image3" />
                    <h2>Revenue</h2>
                </div>
                <div className="summary">
                  Alchemix collects revenue from 3 main sources.<br/>
                  <span><b>1. Performance Fees:</b> User deposits in Alchemix vaults generate yield.<br/>The system periodically harvests the yield and currently takes a 15% fee from the harvested amount.</span>
                  <span><b>2. Treasury:</b> The protocol owns a large amount of assets to provide a runway for operations and to serve the strategic needs of the system.<br/>The exact contents of the treasury are shown under the <i>Holdings</i> tab.</span>
                  <span><b>3. Elixirs:</b> This is the PCV (Protocol Controlled Value) of Alchemix.<br/>The protocol does not own these funds, but temporarily has access to the funds and is free to use them and earn money on them.<br/>The exact contents of the elixirs are shown under the <i>Holdings</i> tab.</span>
                  <span>*USD values are calculated when the revenues are claimed.</span><br/>
                    {/*<br/>The table below shows annualized revenue based on the last 3 full months of data.*
                    <div className="small-table">
                    {/*<h3>Annualized Revenue</h3>*/}
                    {this.state.revenueLoading ? <LoadingComponent /> : <>
                    <span>Total accrued USDC MYT Performance Fees: <b>{Math.round(this.state.protocolFees.usdc * 100) / 100} USDC</b></span>
                    <span>Total accrued ETH MYT Performance Fees: <b>{Math.round(this.state.protocolFees.eth * 100) / 100} ETH</b></span>
                    {/*<div className="small-table-inner-9">
                        <span className="small-table-row"></span><span></span><span className="table-text-title">Amount</span>
                        <span className="small-table-row"><img src={ require('./logos/harvests_thin.svg').default } alt="harvests logo" className="image" /></span><span className="table-text-title">Harvests</span><span className="table-text-bold">${Math.round(harvestRevenue*100)/100}M</span>
                        <span className="small-table-row"><img src={ require('./logos/treasury_thin.svg').default } alt="treasury logo" className="image" /></span><span className="table-text-title">Treasury</span><span className="table-text-bold">${Math.round(treasuryRevenue*100)/100}M</span>
                        <span className="small-table-row"><img src={ require('./logos/transmuter.svg').default } alt="elixir logo" className="image" /></span><span className="table-text-title">Elixirs</span><span className="table-text-bold">${Math.round(elixirRevenue*100)/100}M</span>
                        <span className="small-table-row-2"></span><span className="important-3">Total</span><span className="important-3">${Math.round(totalRevenue*100)/100}M</span>
                    </div>*/}
                    </>}
                    </div>
                {/*</div>*/}
                <div className="section-wrapper">
                    <div className="chart-title">
                      <h3>Revenue by month</h3>
                      {this.state.revenueLoading ? <LoadingComponent /> :
                        <ChartRevenues revenue={this.state.revenue} />
                      }
                    </div>
                </div>
            </>
        );
    }
}