import React, { Component } from 'react';
import Web3 from 'web3';
import { addresses, abis } from '../Constants';

const web3optimism = new Web3('https://opt-mainnet.g.alchemy.com/v2/p9poBr_K0kBvzVt3V6Lo1wasL9r32FpP');

export default class EarnVelo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      aprLoading: true,
      aprStable: 0,
      aprEth: 0,
      aprOpAlUsd: 0,
      aprOpAlEth: 0,
      aprMaiAlUsd: 0,
      aprFraxEth: 0,
      aprFraxUsd: 0
    }

    this.veloStatsContract = new web3optimism.eth.Contract(abis.veloStatsAbi, addresses.veloStats);
  }

  componentDidMount(){
    this.getData();
  }
    
  parseResult(result, veloPrice){
    console.log(result);
    //console.log(veloPrice)
    let secondsInAYear = 31556926;
    let alUsdUsdc = "sAMMV2-USDC/alUSD";
    let ethPool = "sAMMV2-alETH/WETH";
    let opAlUsd = "vAMMV2-OP/alUSD";
    let opAlEth = "vAMMV2-alETH/OP";
    let maiAlUsd = "sAMMV2-alUSD/MAI";
    let frxEth = "sAMMV2-alETH/frxETH";
    let fraxUsd = "sAMMV2-FRAX/alUSD";
    let alUsdUsdcEmissions = 0;
    let ethEmissions = 0;
    let opAlUsdEmissions = 0;
    let opAlEthEmissions = 0;
    let maiEmissions = 0;
    let fraxEmissions = 0;
    let frxEthEmissions = 0;
    let alUsdUsdcTvl = 0;
    let ethTvl = 0;
    let opAlUsdTvl = 0;
    let opAlEthTvl = 0;
    let maiTvl = 0;
    let fraxTvl = 0;
    let frxEthTvl = 0;
    let alUsdUsdcApr = 0;
    let ethApr = 0;
    let opAlUsdApr = 0;
    let opAlEthApr = 0;
    let maiApr = 0;
    let frxEthApr = 0;
    let fraxApr = 0;
    for(let i=0;i<result.length;i++){
      if(result[i][1] === alUsdUsdc) {
        alUsdUsdcEmissions = result[i][17] * secondsInAYear / Math.pow(10,18) * veloPrice.prices[veloPrice.prices.length-1][1];
        alUsdUsdcTvl = (parseInt(result[i][6]) + parseInt(result[i][9])) / Math.pow(10,18);
      }
      if(result[i][1] === ethPool) ethEmissions = result[i][17] * secondsInAYear / Math.pow(10,18) * veloPrice.prices[veloPrice.prices.length-1][1];
      if(result[i][1] === opAlUsd) opAlUsdEmissions = result[i][17] * secondsInAYear / Math.pow(10,18) * veloPrice.prices[veloPrice.prices.length-1][1];
      if(result[i][1] === opAlEth) opAlEthEmissions = result[i][17] * secondsInAYear / Math.pow(10,18) * veloPrice.prices[veloPrice.prices.length-1][1];
      if(result[i][1] === maiAlUsd) {
        maiEmissions = result[i][17] * secondsInAYear / Math.pow(10,18) * veloPrice.prices[veloPrice.prices.length-1][1];
        maiTvl = (parseInt(result[i][6]) + parseInt(result[i][9])) / Math.pow(10,18);
      }
      if(result[i][1] === frxEth) frxEthEmissions = result[i][17] * secondsInAYear / Math.pow(10,18) * veloPrice.prices[veloPrice.prices.length-1][1];
      if(result[i][1] === fraxUsd) {
        fraxEmissions = result[i][17] * secondsInAYear / Math.pow(10,18) * veloPrice.prices[veloPrice.prices.length-1][1];
        fraxTvl = (parseInt(result[i][6]) + parseInt(result[i][9])) / Math.pow(10,18);
      }
    }
    alUsdUsdcApr = alUsdUsdcEmissions / alUsdUsdcTvl * 100;
    ethApr = 0;
    opAlUsdApr = 0;
    opAlEthApr = 0;
    maiApr = maiEmissions / maiTvl * 100;
    frxEthApr = 0;
    fraxApr = fraxEmissions /fraxTvl * 100;
    console.log(maiTvl)
    this.setState({ aprLoading: false, aprStable: alUsdUsdcApr, aprEth: ethApr, aprOpAlUsd: opAlUsdApr, aprOpAlEth: opAlEthApr, aprMaiAlUsd: maiApr, aprFraxEth: frxEthApr, aprFraxUsd: fraxApr })
    console.log(result)
  }

  getData() {

    Promise.all([this.veloStatsContract.methods.all(1000,0,"0x0000000000000000000000000000000000000000").call(),
    fetch("https://api.coingecko.com/api/v3/coins/velodrome-finance/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json())
    ])
    .then(([veloStats, veloPrice]) => {
      this.parseResult(veloStats, veloPrice)
    })
    .catch(function(err) {
      console.log(err.message);
    });

    /*this.veloStatsContract.methods.all(1000,0,"0x0000000000000000000000000000000000000000").call()
      .then(
        (result) => {
          this.parseResult(result)
        },
        (error) => {
          console.log(error)
        }
      )*/
    }

  render() {
    return (
      <div>
        <div className="earn-yield-protocol-name">
            <img src={ require('../logos/velo_round.png').default } alt="Velodrome logo" className="image" /> Velodrome
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSD-USDC
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/op.png').default } alt="Optimism logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.svg').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/velo_round.png').default } alt="Velodrome logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.aprStable*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://app.velodrome.finance/liquidity/manage?address=0xe75a3f4bf99882ad9f8aebab2115873315425d00" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSD-FRAX
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/op.png').default } alt="Optimism logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.svg').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/velo_round.png').default } alt="Velodrome logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.aprFraxUsd*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://app.velodrome.finance/liquidity/manage?address=0x27fcbf9832d9a23b595169d0c5a4a090ba55b634" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSD-MAI
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/op.png').default } alt="Optimism logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.svg').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/velo_round.png').default } alt="Velodrome logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.aprMaiAlUsd*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://app.velodrome.finance/liquidity/manage?address=0x16e7e0960a74b0ea3e61118a0c0eae8f83d43d7c" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>
          
          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSD-OP
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/op.png').default } alt="Optimism logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.svg').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/velo_round.png').default } alt="Velodrome logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.aprOpAlUsd*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://app.velodrome.finance/liquidity/manage?address=0x78fa29412998acedd7728b4cf5623ee5e2f8f589" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alETH-WETH
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/op.png').default } alt="Optimism logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/aleth_blue.svg').default } alt="alETH logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/velo_round.png').default } alt="Velodrome logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.aprEth*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://app.velodrome.finance/liquidity/manage?address=0x6fd5bee1ddb4dbbb0b7368b080ab99b8ba765902" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alETH-frxETH
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/op.png').default } alt="Optimism logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/aleth_blue.svg').default } alt="alETH logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/velo_round.png').default } alt="Velodrome logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.aprFraxEth*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://app.velodrome.finance/liquidity/manage?address=0x87383ec35af6f0d58db242960898ac4d8c9f83a6" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alETH-OP
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/op.png').default } alt="Optimism logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/aleth_blue.svg').default } alt="alETH logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/velo_round.png').default } alt="Velodrome logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprLoading ? "0" : Math.round(this.state.aprOpAlEth*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://app.velodrome.finance/liquidity/manage?address=0x49b5c691685aaeeaaaff57ab6ccef081a165f5bb" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>
      </div>);
  }
}