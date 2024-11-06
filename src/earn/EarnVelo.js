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
      aprDolaAlUsd: 0,
      aprFraxEth: 0,
      aprFraxUsd: 0,
      aprPxEth: 0
    }

    this.veloStatsContract = new web3optimism.eth.Contract(abis.veloStatsAbi, addresses.veloStats);
  }

  componentDidMount(){
    this.getData();
  }
    
  parseResult(result, prices){
    let tokenPrices = { eth: 0, velo: 0, op: 0 }
    tokenPrices.eth = Math.round(prices.coins["coingecko:ethereum"].price*100)/100
    tokenPrices.velo = Math.round(prices.coins["coingecko:velodrome-finance"].price*100)/100
    tokenPrices.op = Math.round(prices.coins["coingecko:optimism"].price*100)/100
    //console.log(tokenPrices)
    let secondsInAYear = 31556926;
    let alUsdUsdc = "sAMMV2-USDC/alUSD";
    let ethPool = "sAMMV2-alETH/WETH";
    let opAlUsd = "vAMMV2-OP/alUSD";
    let opAlEth = "vAMMV2-alETH/OP";
    let dolaAlUsd = "sAMMV2-DOLA/alUSD";
    let frxEth = "sAMMV2-alETH/frxETH";
    let fraxUsd = "sAMMV2-FRAX/alUSD";
    let pxEthAlEth = 'sAMMV2-pxETH/alETH';
    let alUsdUsdcEmissions = 0;
    let ethEmissions = 0;
    let opAlUsdEmissions = 0;
    let opAlEthEmissions = 0;
    let dolaEmissions = 0;
    let fraxEmissions = 0;
    let frxEthEmissions = 0;
    let alUsdUsdcTvl = 0;
    let ethTvl = 0;
    let opAlUsdTvl = 0;
    let opAlEthTvl = 0;
    let dolaTvl = 0;
    let fraxTvl = 0;
    let frxEthTvl = 0;
    let alUsdUsdcApr = 0;
    let ethApr = 0;
    let opAlUsdApr = 0;
    let opAlEthApr = 0;
    let dolaApr = 0;
    let frxEthApr = 0;
    let fraxApr = 0;
    let pxEthEmissions = 0;
    let pxEthTvl = 0;
    let pxEthApr = 0;
    for(let i=0;i<result.length;i++){
      if(result[i][1] === alUsdUsdc) {
        alUsdUsdcEmissions = result[i][19] * secondsInAYear / Math.pow(10,18) * tokenPrices.velo;
        alUsdUsdcTvl = parseInt(result[i][9]) / Math.pow(10,6) + parseInt(result[i][12]) / Math.pow(10,18);
      }
      if(result[i][1] === ethPool) {
        ethEmissions = result[i][19] * secondsInAYear / Math.pow(10,18) * tokenPrices.velo;
        ethTvl = (parseInt(result[i][9]) / Math.pow(10,18) + parseInt(result[i][12]) / Math.pow(10,18)) * tokenPrices.eth;
      }
      if(result[i][1] === opAlUsd) {
        opAlUsdEmissions = result[i][19] / Math.pow(10,18) * secondsInAYear * tokenPrices.velo;
        opAlUsdTvl = (parseInt(result[i][9]) / Math.pow(10,18)) * tokenPrices.op + parseInt(result[i][12]) / Math.pow(10,18);
      }
      if(result[i][1] === opAlEth) {
        opAlEthEmissions = result[i][19] * secondsInAYear / Math.pow(10,18) * tokenPrices.velo;
        opAlEthTvl = (parseInt(result[i][9]) / Math.pow(10,18)) * tokenPrices.eth + (parseInt(result[i][12]) / Math.pow(10,18)) * tokenPrices.op;
      }
      if(result[i][1] === dolaAlUsd) {
        dolaEmissions = result[i][19] * secondsInAYear / Math.pow(10,18) * tokenPrices.velo;
        dolaTvl = (parseInt(result[i][9]) + parseInt(result[i][12])) / Math.pow(10,18);
      }
      if(result[i][1] === frxEth) {
        frxEthEmissions = result[i][19] * secondsInAYear / Math.pow(10,18) * tokenPrices.velo;
        frxEthTvl = (parseInt(result[i][9]) / Math.pow(10,18) + parseInt(result[i][12]) / Math.pow(10,18)) * tokenPrices.eth;
      }
      if(result[i][1] === fraxUsd) {
        fraxEmissions = result[i][19] * secondsInAYear / Math.pow(10,18) * tokenPrices.velo;
        fraxTvl = (parseInt(result[i][9]) + parseInt(result[i][12])) / Math.pow(10,18);
      }
      if(result[i][1] === pxEthAlEth) {
        pxEthEmissions = result[i][19] * secondsInAYear / Math.pow(10,18) * tokenPrices.velo;
        pxEthTvl = (parseInt(result[i][9]) / Math.pow(10,18) + parseInt(result[i][12]) / Math.pow(10,18)) * tokenPrices.eth;
      }
    }
    alUsdUsdcApr = alUsdUsdcEmissions / alUsdUsdcTvl * 100;
    ethApr = ethEmissions / ethTvl * 100;
    opAlUsdApr = opAlUsdEmissions / opAlUsdTvl * 100;
    opAlEthApr = opAlEthEmissions / opAlEthTvl * 100;
    dolaApr = dolaEmissions / dolaTvl * 100;
    frxEthApr = frxEthEmissions / frxEthTvl * 100;
    fraxApr = fraxEmissions /fraxTvl * 100;
    pxEthApr = pxEthEmissions / pxEthTvl * 100;
    //console.log(maiTvl)
    this.setState({ aprLoading: false, aprStable: alUsdUsdcApr, aprEth: ethApr, aprOpAlUsd: opAlUsdApr, aprOpAlEth: opAlEthApr, aprDolaAlUsd: dolaApr, aprFraxEth: frxEthApr, aprFraxUsd: fraxApr, aprPxEth: pxEthApr })
    //console.log(result)
  }

  getData() {

    Promise.all([this.veloStatsContract.methods.all(500,0).call(),
    this.veloStatsContract.methods.all(500,500).call(),
    fetch("https://coins.llama.fi/prices/current/coingecko:ethereum,coingecko:velodrome-finance,coingecko:optimism?searchWidth=4h").then(res => res.json())
    ])
    .then(([veloStats, veloStats2, prices]) => {
      this.parseResult(veloStats.concat(veloStats2), prices)
    })
    .catch(function(err) {
      console.log(err.message);
    });
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
              <a href="https://velo.drome.eth.limo/deposit?token0=0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85&token1=0xCB8FA9a76b8e203D8C3797bF438d8FB81Ea3326A&type=0" target="_blank" rel="noreferrer">Deposit</a>
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
              <a href="https://velo.drome.eth.limo/deposit?token0=0x2E3D870790dC77A83DD1d18184Acc7439A53f475&token1=0xCB8FA9a76b8e203D8C3797bF438d8FB81Ea3326A&type=0" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSD-DOLA
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
              {this.state.aprLoading ? "0" : Math.round(this.state.aprDolaAlUsd*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://velo.drome.eth.limo/deposit?token0=0x8aE125E8653821E851F12A49F7765db9a9ce7384&token1=0xCB8FA9a76b8e203D8C3797bF438d8FB81Ea3326A&type=0" target="_blank" rel="noreferrer">Deposit</a>
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
              <a href="https://velo.drome.eth.limo/deposit?token0=0x4200000000000000000000000000000000000042&token1=0xCB8FA9a76b8e203D8C3797bF438d8FB81Ea3326A&type=-1" target="_blank" rel="noreferrer">Deposit</a>
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
              <a href="https://velo.drome.eth.limo/deposit?token0=0x3E29D3A9316dAB217754d13b28646B76607c5f04&token1=0x4200000000000000000000000000000000000006&type=0" target="_blank" rel="noreferrer">Deposit</a>
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
              <a href="https://velo.drome.eth.limo/deposit?token0=0x3E29D3A9316dAB217754d13b28646B76607c5f04&token1=0x6806411765Af15Bddd26f8f544A34cC40cb9838B&type=0" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alETH-pxETH
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
              {this.state.aprLoading ? "0" : Math.round(this.state.aprPxEth*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://velo.drome.eth.limo/deposit?token0=0x300d2c875C6fb8Ce4bf5480B4d34b7c9ea8a33A4&token1=0x3E29D3A9316dAB217754d13b28646B76607c5f04&type=0&factory=0xF1046053aa5682b4F9a81b5481394DA16BE5FF5a&chain=10" target="_blank" rel="noreferrer">Deposit</a>
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
              <a href="https://velo.drome.eth.limo/deposit?token0=0x3E29D3A9316dAB217754d13b28646B76607c5f04&token1=0x4200000000000000000000000000000000000042&type=-1" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>
      </div>);
  }
}