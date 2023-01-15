import React, { Component } from 'react';
import Web3 from 'web3';
import { addresses, abis } from '../Constants';

const web3 = new Web3('https://eth-mainnet.gateway.pokt.network/v1/5f3453978e354ab992c4da79');
const gaugeController = "0x99Cb6c36816dE2131eF2626bb5dEF7E5cc8b9B14";
const d4Gauge = "0x702c1b8Ec3A77009D5898e18DA8F8959B6dF2093";
const fraxbpGauge = "0x953693DCB2E9DDC0c1398C1b540b81b63ceA5e16";
const blocksPerYear = 2350000;

export default class EarnSaddle extends Component {

  constructor(props) {
    super(props);

    this.state = {
      aprLoading: true,
      d4AprEmissions: 0,
      d4AprFees: 0,
      fraxbpAprEmissions: 0,
      alEthAprEmissions: 0,
      alEthAprFees: 0
    }

    this.saddleGaugeController = new web3.eth.Contract(abis.saddleGaugeControllerAbi, gaugeController);
    this.saddleGauge = new web3.eth.Contract(abis.saddleGaugeAbi, d4Gauge);
    //this.alUsdContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alUsdAddress);
    //this.saddleFraxBPContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.saddleFBPContractAddress);
    this.saddleD4LPTokenContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.saddled4LPToken);
    this.saddleAlUsdFraxbpTokenContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.saddleAlUsdFraxbpLPToken);
    this.alchemixStakingContract = new web3.eth.Contract(abis.alchemixStakingAbi, addresses.alchemixStakingAddress);
  }

  componentDidMount(){
    this.getData();
  }

  calculateApr(subgraphResponse, inflation, d4Weight, fraxBPWeight, d4Staked, alUsdFraxbpStaked, alEthRewardRate, alEthTotalDeposited, sdlPrice, alcxPrice, ethPrice){
    let d4TVL = 0;
    let d4Fees = 0;
    let alEthTVL = 0;
    let alEthFees = 0;
    let d4Emissions = d4Weight * inflation * 31536000 / Math.pow(10, 36) * sdlPrice.prices[sdlPrice.prices.length-1][1];
    let fraxbpEmissions = fraxBPWeight * inflation *31536000 / Math.pow(10, 36) * sdlPrice.prices[sdlPrice.prices.length-1][1];
    let d4AprFees = 0;
    let d4AprEmissions = 0;
    let fraxbpAprEmissions = 0;
    let alEthAprFees = 0;
    let alEthRewards = alEthRewardRate * blocksPerYear / Math.pow(10, 18) * alcxPrice.prices[alcxPrice.prices.length-1][1];
    let alEthPoolValue = alEthTotalDeposited / Math.pow(10, 18) * ethPrice.prices[ethPrice.prices.length-1][1];
    let alEthAprEmissions = alEthRewards / alEthPoolValue;
    for(let i=0;i<subgraphResponse.length;i++){
      if(subgraphResponse[i].id.split("-")[0] === addresses.saddled4ContractAddress) {
        d4TVL = subgraphResponse[i].totalValueLockedUSD;
        d4Fees = subgraphResponse[i].dailySupplySideRevenueUSD * 365;
        break;
      }
      
    }
    for(let i=0;i<subgraphResponse.length;i++){
      if(subgraphResponse[i].id.split("-")[0] === addresses.saddleAlEthPoolContractAddress) {
        alEthTVL = subgraphResponse[i].totalValueLockedUSD;
        alEthFees = subgraphResponse[i].dailySupplySideRevenueUSD * 365;
        break;
      } 

    }
    d4AprFees = d4Fees / d4TVL * 100;
    d4AprEmissions = d4Emissions / d4Staked * Math.pow(10, 18) * 100;
    fraxbpAprEmissions = fraxbpEmissions / alUsdFraxbpStaked * Math.pow(10, 18) * 100;
    alEthAprFees = alEthFees / alEthTVL * 100;
    this.setState({ arpLoading: false, d4AprEmissions: d4AprEmissions, d4AprFees: d4AprFees, fraxbpAprEmissions: fraxbpAprEmissions, alEthAprFees: alEthAprFees, alEthAprEmissions: alEthAprEmissions })
  }

  getSubgraphRequestOptions(query){
    return {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query })
    }
  }
    
  getData() {
    let query=`{
      liquidityPoolDailySnapshots(
        orderBy: timestamp
        orderDirection: desc
      )
      {
        id
        totalValueLockedUSD
        dailySupplySideRevenueUSD
      }
    }`

    Promise.all([fetch("https://api.thegraph.com/subgraphs/name/messari/saddle-finance-ethereum", this.getSubgraphRequestOptions(query)).then(res => res.json()),
    this.saddleGauge.methods.inflation_rate().call(),
    this.saddleGaugeController.methods.gauge_relative_weight(d4Gauge).call(),
    this.saddleGaugeController.methods.gauge_relative_weight(fraxbpGauge).call(),
    this.saddleD4LPTokenContract.methods.balanceOf(d4Gauge).call(),
    this.saddleAlUsdFraxbpTokenContract.methods.balanceOf(fraxbpGauge).call(),
    this.alchemixStakingContract.methods.getPoolRewardRate(6).call(),
    this.alchemixStakingContract.methods.getPoolTotalDeposited(6).call(),
    fetch("https://api.coingecko.com/api/v3/coins/saddle-finance/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
    fetch("https://api.coingecko.com/api/v3/coins/alchemix/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
    fetch("https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
    ])
    .then(([subgraphResponse, inflation, d4Weight, fraxBPWeight, d4Staked, alUsdFraxbpStaked, alEthRewardRate, alEthTotalDeposited, sdlPrice, alcxPrice, ethPrice]) => {
      this.calculateApr(subgraphResponse.data.liquidityPoolDailySnapshots, inflation, d4Weight, fraxBPWeight, d4Staked, alUsdFraxbpStaked, alEthRewardRate, alEthTotalDeposited, sdlPrice, alcxPrice, ethPrice);
    })
    .catch(function(err) {
      console.log(err.message);
    });
  }


  render() {
    return (
      <div>
        <div className="earn-yield-protocol-name">
            <img src={ require('../logos/saddle.png').default } alt="Saddle logo" className="image" /> Saddle
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              Saddle D4
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.svg').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/saddle.png').default } alt="Saddle logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.aprLoading ? "0" : <span>{Math.round((this.state.d4AprFees + this.state.d4AprEmissions / 2.5) * 100)/100}%</span>}
            </div>
            <div className="earn-yield-link">
              <a href="https://saddle.exchange/#/pools/D4/deposit" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>

          {/*<div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSDFraxBP
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.svg').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/saddle.png').default } alt="Saddle logo" className="image" />
            </div>
            <div className="earn-yield-yield">
            {this.aprLoading ? "0" : <span>{Math.round(this.state.fraxbpAprEmissions / 2.5 * 100)/100}%</span>}
            </div>
            <div className="earn-yield-link">
              <a href="https://saddle.exchange/#/pools/FRAXBP-alUSD/deposit" target="_blank" rel="noreferrer">Deposit</a>
            </div>
    </div>*/}
          
          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              Saddle alETH
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            <div className="earn-yield-alasset">
              <img src={ require('../logos/aleth_blue.svg').default } alt="alETH logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/alcx_logo.png').default } alt="Alchemix logo" className="image" />
            </div>
            <div className="earn-yield-yield">
            {this.aprLoading ? "0" : <span>{Math.round(this.state.alEthAprFees * 100 + this.state.alEthAprEmissions * 10000)/100}</span>}%
            </div>
            <div className="earn-yield-link">
              <a href="https://alchemix.fi/farms" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>
      </div>);
  }
}