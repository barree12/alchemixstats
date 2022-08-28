import React, { Component } from 'react';
import Web3 from 'web3';
import { addresses, abis } from '../Constants';

const web3 = new Web3('https://eth-mainnet.gateway.pokt.network/v1/5f3453978e354ab992c4da79');

export default class EarnPremia extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      aprLoading: true,
      callApr: 0,
      putApr: 0
    }

    this.premiaMiningContract = new web3.eth.Contract(abis.premiaMiningAbi, addresses.premiaMiningProxyAddress);
    
  }

  componentDidMount(){
    this.getData();
  }

  calculateApr(subgraphCallPool, subgraphPutPool, premiaPerYear, totalAllocationPoints, callPoolWeight, putPoolWeight, premiaPrice){
    let callPoolEmissions = callPoolWeight[0] / totalAllocationPoints * premiaPerYear * premiaPrice.prices[premiaPrice.prices.length-1][1] / Math.pow(10, 18);
    let putPoolEmissions = putPoolWeight[0] / totalAllocationPoints * premiaPerYear * premiaPrice.prices[premiaPrice.prices.length-1][1] / Math.pow(10, 18);
    let callPoolEmissionsApr = callPoolEmissions / (subgraphCallPool.netSizeInUsd / Math.pow(10, 18));
    let putPoolEmissionsApr = putPoolEmissions / (subgraphPutPool.netSizeInUsd / Math.pow(10, 18));
    this.setState({ aprLoading: false, callApr: subgraphCallPool.annualPercentageReturn / Math.pow(10, 18) + callPoolEmissionsApr*100, putApr: subgraphPutPool.annualPercentageReturn / Math.pow(10, 18) + putPoolEmissionsApr*100 })
  }

  getSubgraphRequestOptions(query){
    return {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query })
    }
  }
    
  getData() {
    let callPoolQuery=`{
      pool (id:"0xbc6da0fe9ad5f3b0d58160288917aa56653660e9/0x0100546f2cd4c9d97f798ffc9755e47865ff7ee6-CALL"){
        id
        name
        annualPercentageReturn
        netSizeInUsd
      }
    }`
    let putPoolQuery=`{
      pool (id:"0xbc6da0fe9ad5f3b0d58160288917aa56653660e9/0x0100546f2cd4c9d97f798ffc9755e47865ff7ee6-PUT"){
        id
        name
        annualPercentageReturn
        netSizeInUsd
      }
    }`

    Promise.all([fetch("https://api.thegraph.com/subgraphs/name/premiafinance/premiav2", this.getSubgraphRequestOptions(callPoolQuery)).then(res => res.json()),
    fetch("https://api.thegraph.com/subgraphs/name/premiafinance/premiav2", this.getSubgraphRequestOptions(putPoolQuery)).then(res => res.json()),
    this.premiaMiningContract.methods.getPremiaPerYear().call(),
    this.premiaMiningContract.methods.getTotalAllocationPoints().call(),
    this.premiaMiningContract.methods.getPoolInfo(addresses.premiaAlEthPoolAddress,true).call(),
    this.premiaMiningContract.methods.getPoolInfo(addresses.premiaAlEthPoolAddress,false).call(),
    fetch("https://api.coingecko.com/api/v3/coins/premia/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
    ])
    .then(([subgraphCallPool, subgraphPutPool, premiaPerYear, totalAllocationPoints, callPoolWeight, putPoolWeight, premiaPrice]) => {
      this.calculateApr(subgraphCallPool.data.pool, subgraphPutPool.data.pool, premiaPerYear, totalAllocationPoints, callPoolWeight, putPoolWeight, premiaPrice);
    })
    .catch(function(err) {
      console.log(err.message);
    });
  }
  
  render() {
    return (
      <div>
        <div className="earn-yield-protocol-name">
          <img src={ require('../logos/premia.png').default } alt="Premia logo" className="image" /> Premia Finance
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alETH Call options pool
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/aleth.png').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
            <img src={ require('../logos/premia.png').default } alt="Premia logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.callApr*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://app.premia.finance/pools/alETH-alUSD" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>
          
          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSD Put options pool
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.png').default } alt="alETH logo" className="image" />
            </div>
            <div className="earn-yield-reward">
            <img src={ require('../logos/premia.png').default } alt="Premia logo" className="image" />
            </div>
            <div className="earn-yield-yield">
            {this.state.aprLoading ? "0" : Math.round(this.state.putApr*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://app.premia.finance/pools/alETH-alUSD" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>
        </div>);
  }
}