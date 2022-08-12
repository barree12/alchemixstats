import React from 'react';
import ChartDebtUsd from './charts/ChartDebtUsd';
import ChartDebtEth from './charts/ChartDebtEth';
import LoadingComponent from './LoadingComponent';
import { addresses } from './Constants';
import { formatDate, datesEqual} from './Functions';

export default class Debt extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          debt: {},
          debtLoading: true,
          ethCurrencyToggle: true,
        };
        this.toggleEthCurrency = this.toggleEthCurrency.bind(this);
      }

    componentDidMount() {
      this.getGlobalDebt();
    }

    toggleEthCurrency(){
        this.setState({ ethCurrencyToggle: !this.state.ethCurrencyToggle });
    }

    calculateGlobalDebt(result){
        let startDate = new Date(1647385201*1000); //March 16th
        let today = new Date();
        let dateTracker = new Date(result[0].block.timestamp*1000);
        let resultIndex = 0;
        let debt = { date:[], usd: [], eth: [] };
        let tempUsd = 0;
        let tempEth = 0;
        for(let j=0;startDate<today;j++){
    
          for(let i=resultIndex;i<result.length;i++){
            let tempDate = new Date(result[i].block.timestamp*1000);
            if(tempDate>startDate) break;
    
            if(!datesEqual(tempDate, dateTracker)) dateTracker = tempDate;
            //console.log(result[i].alchemist.id === addresses.alchemistV2Address)
            tempUsd = result[i].alchemist.id === addresses.alchemistV2Address ? result[i].debt/Math.pow(10, 18) : tempUsd;
            tempEth = result[i].alchemist.id === addresses.alchemistEthV2Address ? result[i].debt/Math.pow(10, 12) : tempEth;
            resultIndex++;
          }
          debt.usd[j] = Math.round(tempUsd/10000)/100;
          if(j>0 && !tempUsd) debt.usd[j] = debt.usd[j-1];
          debt.eth[j] = Math.round(tempEth/10000)/100;
          if(j>0 && !tempEth) debt.eth[j] = debt.eth[j-1];
          debt.date[j] = formatDate(startDate, 0);
          startDate.setDate(startDate.getDate() + 1);
          tempUsd = 0;
          tempEth = 0;
        }
        this.setState({ debt: debt, debtLoading: false });
      }

      getSubgraphRequestOptions(query){
        return {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: query })
        }
      }

      getGlobalDebt(){
        const globalDebt = `{
          alchemistGlobalDebtHistories(
            first: 1000
            orderBy: timestamp
            orderDirection: desc
          ){
            alchemist {
              id
            }
            debt
            block {
              timestamp
            }
          }
        }`
    
        const globalDebtSkip1000 = `{
          alchemistGlobalDebtHistories(
            first: 1000
            skip: 1000
            orderBy: timestamp
            orderDirection: desc
          ){
            alchemist {
              id
            }
            debt
            block {
              timestamp
            }
          }
        }`
    
        Promise.all([fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(globalDebt)).then(res => res.json()),
          fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(globalDebtSkip1000)).then(res => res.json())])
          .then(([globalDebt, globalDebtSkip1000]) => {
            this.calculateGlobalDebt(globalDebt.data.alchemistGlobalDebtHistories.concat(globalDebtSkip1000.data.alchemistGlobalDebtHistories).reverse())
        })
      }

    render(){
        const ethAlchemistUsd = this.state.debtLoading ? 0 : Math.round(this.state.debt.eth[this.state.debt.eth.length-1]*this.props.ethPrice[this.props.ethPrice.length-1]/10000)/100;
        const totalDebt = this.state.debtLoading ? 0 : Math.round((this.state.debt.usd[this.state.debt.usd.length-1]+ethAlchemistUsd)*100)/100;
        const ethTvl = this.props.v2EthTVL + this.props.v2aWethTVL + this.props.v2StethTVL + this.props.v2RethTVL;
        const ethLtv = this.state.debtLoading ? 0 : Math.round(this.state.debt.eth[this.state.debt.eth.length-1]/ethTvl*10000)/100;
        const stableTvl = this.props.v2DaiTVL + this.props.v2UsdcTVL + this.props.v2UsdtTVL + this.props.v2aDaiTVL + this.props.v2aUsdcTVL + this.props.v2aUsdtTVL;
        const stableLtv = this.state.debtLoading ? 0 : Math.round(this.state.debt.usd[this.state.debt.usd.length-1]/stableTvl*10000)/100;
        console.log(stableTvl)
        return (
            <>
                <img src={ require('./logos/debt.png').default } alt="debt logo" className="image3" />
                <h2>User debt</h2>
                <div className="summary">
                    This section shows global user debt across all alchemists.<br/>
                    LTV (Loan-to-Value) is set to a maximum of 50% across the system.<br/>
                    This means that users can take an alAsset loan for up to 50% of their deposited collateral.<br/>
                    If everyone were to constantly max out their allowance, the debt levels would be exactly 50% of the amount of deposits.<br/>
                    Some users do this periodically, other users plan to wait for their loan to be paid off instead.<br/>
                    The table and charts below only show V2 metrics, as V1 is being sunset soon.
                    <div className="small-table">
                    <h3>Current V2 global debt</h3>
                    {this.state.debtLoading ? <LoadingComponent /> :
                    <div className="small-table-inner-12">
                        <span className="small-table-row"></span><span></span><span className="table-text-title">Amount</span><span className="table-text-title">USD value</span><span className="table-text-title">LTV</span>
                        <span className="small-table-row"><img src={ require('./logos/alusd.png').default } alt="alusd logo" className="image" /></span><span className="table-text-title">alUSD</span><span className="table-text-bold">{Math.round(this.state.debt.usd[this.state.debt.usd.length-1]*100)/100}M</span><span className="important-2">${Math.round(this.state.debt.usd[this.state.debt.usd.length-1]*100)/100}M</span><span className="important-2">{stableLtv}%</span>
                        <span className="small-table-row"><img src={ require('./logos/aleth.png').default } alt="aleth logo" className="image" /></span><span className="table-text-title">alETH</span><span className="table-text-bold">{Math.round(this.state.debt.eth[this.state.debt.eth.length-1])}</span><span className="important-2">${ethAlchemistUsd}M</span><span className="important-2">{ethLtv}%</span>
                        {/*<span className="small-table-row"><img src={ require('./logos/alusd_ftm.png').default } alt="alusd ftm logo" className="image" /></span><span className="table-text-title">alUSD FTM</span><span className="table-text-bold">{}M</span><span className="important-2">${}M</span>*/}
                        <span className="small-table-row-2"></span><span></span><span className="important-3">Total</span><span className="important-3">${totalDebt}M</span>
                    </div>}
                    </div>
                </div>
                <div className="section-wrapper">
                    <div className="chart-title">
                        <h3>alUSD Alchemist debt</h3>
                        {this.state.debtLoading ? <LoadingComponent /> :
                        <ChartDebtUsd debt={this.state.debt} toggle={this.state.ethCurrencyToggle} />}
                        </div>
                    <div className="chart-title">
                        <h3>alETH Alchemist debt</h3>
                        {this.state.debtLoading ? <LoadingComponent /> :
                        <ChartDebtEth debt={this.state.debt} />}
                    </div>
                </div>
            </>
        );
    }
}