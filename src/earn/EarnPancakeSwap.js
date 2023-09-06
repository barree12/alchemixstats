import React, { Component } from 'react';
import Web3 from 'web3';
import { addresses, abis } from '../Constants';

const web3 = new Web3('https://eth-mainnet.gateway.pokt.network/v1/5f3453978e354ab992c4da79');

export default class EarnPancakeSwap extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      aprLoading: true,
      poolApr: 0,
    }

    this.pcsChefContract = new web3.eth.Contract(abis.pcsChefAbi, addresses.pcsChefAddress);
    
  }

  componentDidMount(){
    this.getData();
  }

  calculateData(cakePerSecond, totalAllocPoint, poolInfo, cakePrice){
    console.log(poolInfo);
    let cakePerYear = cakePerSecond / Math.pow(10,30) * 31536000;
    let poolEmissions = cakePerYear * cakePrice.prices[cakePrice.prices.length-1][1] * (parseInt(poolInfo[0]) / totalAllocPoint);
    let poolApr = poolEmissions / (parseInt(poolInfo[5]) / Math.pow(10,17))
    this.setState({ aprLoading: false, poolApr: poolApr })
  }
    
  getData() {
    

    Promise.all([this.pcsChefContract.methods.latestPeriodCakePerSecond().call(),
      this.pcsChefContract.methods.totalAllocPoint().call(),
      this.pcsChefContract.methods.poolInfo(15).call(),
      fetch("https://api.coingecko.com/api/v3/coins/pancakeswap-token/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json())
    ])
    .then(([cakePerSecond, totalAllocPoint, poolInfo, cakePrice]) => {
      this.calculateData(cakePerSecond, totalAllocPoint, poolInfo, cakePrice)
    })
    .catch(function(err) {
      console.log(err.message);
    });
  }
  
  render() {
    return (
      <div>
        <div className="earn-yield-protocol-name">
          <img src={ require('../logos/cake.png').default } alt="Premia logo" className="image" /> PancakeSwap
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alETH-ETH
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/eth.png').default } alt="ETH logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/aleth_blue.svg').default } alt="alETH logo" className="image" />
            </div>
            <div className="earn-yield-reward">
            <img src={ require('../logos/cake.png').default } alt="CAKE logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.poolApr*10000)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://pancakeswap.finance/info/v3/eth/pairs/0xa6f73c2B591D88843ffDaa526BaC2463b7f23411?chain=eth" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>
        </div>);
  }
}