import React from 'react';
import LoadingComponent from './LoadingComponent';
import ChartRevenues from './charts/ChartRevenues';
import { formatDate, datesEqual} from './Functions';

export default class Revenues extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          revenue: {},
          revenueLoading: true,
          ethCurrencyToggle: true,
        };
      }

    componentDidMount() {
      this.getRevenues();
    }

    getDetailedRevenue(revenues){
      let revenueArray = {
        treasury: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        elixir: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        harvest: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      }
      let dateHelper = new Date();
      let currentDate = new Date(dateHelper.getFullYear(), dateHelper.getMonth(), 0);
      
      //console.log(currentDate)      
      
        for(let i=0;i<revenues.length;i++){
          
          let revenueDate = revenues[i].DateTime.split(" ")[0]
          let [month, day, year] = revenueDate.split('/');
          let date = new Date(+year, month - 1, +day);

          let monthDifference = Math.floor((currentDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 30))
          //console.log(monthDifference)
          //if(month === currentDate.getMonth() && year === currentDate.getFullYear()){
            if(revenues[i].Revenue_Type === 'Harvest') revenueArray.harvest[monthDifference+1] += parseInt(revenues[i].Value)
            if(revenues[i].Revenue_Type === 'Treasury') revenueArray.treasury[monthDifference+1] += parseInt(revenues[i].Value)
            if(revenues[i].Revenue_Type === 'Elixir_FRAX' || revenues[i].Revenue_Type === 'Elixir_alUSD' || revenues[i].Revenue_Type === 'Elixir_alETH') revenueArray.elixir[monthDifference+1] += parseInt(revenues[i].Value)
          //}
        }
      this.setState({ revenueLoading: false, revenue: revenueArray })
    }

    getRevenues(){
      
      let authorizationHeader = {
        method: 'GET',
        headers: { 
          'pinata_api_key': '7237805a818b4433e8a1',
          'pinata_secret_api_key': '1b5bf925a71ba50d2649a1861e00210ac142a74a20562f743f160d6d820cad23'
        }
      }
      fetch("https://api.pinata.cloud/data/pinList?includeCount=false&metadata[name]=protocol_revenue.json&status=pinned&pageLimit=1000", authorizationHeader).then(res => res.json()).then(
          (result) => { 
            console.log(result);

            let url = "https://ipfs.imimim.info/ipfs/" + result.rows[0].ipfs_pin_hash;
            fetch(url).then(res => res.json()).then(
              (result2) => { 
                this.getDetailedRevenue(result2) },
              (error) => { console.log(error) })
          
          },
          (error) => { console.log(error) })
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
                  <span><b>1. Harvests:</b> User deposits in Alchemix vaults generate yield.<br/>The system periodically harvests the yield and currently takes a 10% fee from the harvested amount.<br/>The composition of user deposits is visible under the <i>Deposits</i> tab.</span>
                  <span><b>2. Treasury:</b> The protocol owns a large amount of assets to provide a runway for operations and to serve the strategic needs of the system.<br/>The exact contents of the treasury are shown under the <i>Treasury</i> tab.</span>
                  <span><b>3. Elixirs:</b> This the the PCV (Protocol Controlled Value) of Alchemix.<br/>The protocol does not own these funds, but temporarily has access to the funds and is free to use them and earn money on them.<br/>The exact contents of the elixirs are shown under the <i>Elixir</i> tab.</span>
                    <br/>The table below shows annualized revenue based on the last 3 full months of data.
                    <div className="small-table">
                    <h3>Annualized Revenue</h3>
                    {this.state.revenueLoading ? <LoadingComponent /> :
                    <div className="small-table-inner-9">
                        <span className="small-table-row"></span><span></span><span className="table-text-title">Amount</span>
                        <span className="small-table-row"><img src={ require('./logos/harvests_thin.svg').default } alt="harvests logo" className="image" /></span><span className="table-text-title">Harvests</span><span className="table-text-bold">${Math.round(harvestRevenue*100)/100}M</span>
                        <span className="small-table-row"><img src={ require('./logos/treasury_thin.svg').default } alt="treasury logo" className="image" /></span><span className="table-text-title">Treasury</span><span className="table-text-bold">${Math.round(treasuryRevenue*100)/100}M</span>
                        <span className="small-table-row"><img src={ require('./logos/transmuter.svg').default } alt="elixir logo" className="image" /></span><span className="table-text-title">Elixirs</span><span className="table-text-bold">${Math.round(elixirRevenue*100)/100}M</span>
                        <span className="small-table-row-2"></span><span className="important-3">Total</span><span className="important-3">${Math.round(totalRevenue*100)/100}M</span>
                    </div>}
                    </div>
                </div>
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