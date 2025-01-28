import React, { Component } from 'react';
import Web3 from 'web3';
import { addresses, abis } from '../Constants';

const web3optimism = new Web3('https://opt-mainnet.g.alchemy.com/v2/p9poBr_K0kBvzVt3V6Lo1wasL9r32FpP');

export default class EarnVelo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      aprsLoading: true,
      aprs: {}
    }

    this.veloStatsContract = new web3optimism.eth.Contract(abis.veloStatsAbi, addresses.veloStats);
  }

  componentDidMount(){
    this.getData();
  }
    
  parseResult(pools){
    //console.log(pools);
    //let tokenPrices = { eth: 0, velo: 0, op: 0 }
    //tokenPrices.eth = Math.round(prices.coins["coingecko:ethereum"].price*100)/100
    //tokenPrices.velo = Math.round(prices.coins["coingecko:velodrome-finance"].price*100)/100
    //tokenPrices.op = Math.round(prices.coins["coingecko:optimism"].price*100)/100
    //console.log(veloPrice)
    //let secondsInAYear = 31556926;
    let alUsdFrax = "0xfd599db360cd9713657c95df66650a427d213010";
    //let alUsdGrai = "0x774b4eefba334d7230de02c02ab390f8d5d17bf1";
    let alUsdAlEth = "0xb69d60d0690733c0cc4db1c1aedeeaa308f30328";
    let alEthAlcx = "0x9c99764ad164360cf85eda42fa2f4166b6cba2a4";
    let alEthFrxEth ="0xfb4fe921f724f3c7b610a826c827f9f6ecef6886";
    //let alEthGrai = "0xf6052c1d99f32e5710639183201090e21366619c";
    //let alEthWoEth = "0x5853fbe1622ccf426a601e323df7a4abd531b243";
    //let alUsdAlEthSubgraph = "0xb69d60d0690733c0cc4db1c1aedeeaa308f30328";
    //let alEthWoEthSubgraph = "0x5853fbe1622ccf426a601e323df7a4abd531b243";
    //let alUsdAlcxSubgraph = "0x4ec7d79277c478975dc76274bb0157e7088612c2";
    //let alUsdUsdc = "0xb1736c14d949c49668a280222888d3695e96c69a";
    //let alEthWeth = "0xeb047610c8d099aef19a7362ff3fb8cc56e7d5bb";
    //let alUsdAlcx = "0x4ec7d79277c478975dc76274bb0157e7088612c2";
    let aprs = { alUsdFrax: 0, alUsdAlEth: 0, alEthAlcx: 0, alEthFrxEth: 0 }
    
    for(let i=0;i<pools.pairs.length;i++){
      if(pools.pairs[i].id === alUsdFrax) {
        aprs.alUsdFrax = pools.pairs[i].lpApr;
      }
      if(pools.pairs[i].id === alUsdAlEth) {
        aprs.alUsdAlEth = pools.pairs[i].lpApr;
      }
      if(pools.pairs[i].id === alEthFrxEth) {
        aprs.alEthFrxEth = pools.pairs[i].lpApr;
      }
      if(pools.pairs[i].id === alEthAlcx) {
        aprs.alEthAlcx = pools.pairs[i].lpApr;
      }
    }

    this.setState({ aprsLoading: false, aprs: aprs })
  }

  getData() {

    /*const subgraphQuery = `{
      pools (first: 1000) {
        id
        token0 {
          symbol
        }
        token1 {
          symbol
        }
        gauge {
          epochRewards {
            rewardAmount
            rewardRate
            rewardToken {
              id
            }
            period
          }
        }
      }
    }`*/

      Promise.all([fetch("https://api-v2-production-a6e6.up.railway.app/mixed-pairs").then(res => res.json())
      //fetch("https://api.thegraph.com/subgraphs/name/ramsesexchange/concentrated-liquidity-graph", this.getSubgraphRequestOptions(subgraphQuery)).then(res => res.json()),
      //fetch("https://coins.llama.fi/prices/current/coingecko:ethereum,coingecko:velodrome-finance,coingecko:optimism?searchWidth=4h").then(res => res.json())
      ])
      .then(([pools]) => {
        this.parseResult(pools)
      })
      .catch(function(err) {
        console.log(err.message);
      });
  }

  render() {
    return (
      <div>
        <div className="earn-yield-protocol-name">
            <img src={ require('../logos/ram.png').default } alt="Ramses logo" className="image" /> Ramses
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSD-FRAX
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/arbi.png').default } alt="Arbitrum logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.svg').default } alt="alUSD logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/ram.png').default } alt="Ramses logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprsLoading ? "0" : Math.round(this.state.aprs.alUsdFrax*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://app.ramses.exchange/manage/v1/0xfd599db360cd9713657c95df66650a427d213010" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>
          
          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alUSD-alETH
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/arbi.png').default } alt="Arbitrum logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/alusd.svg').default } alt="alUSD logo" className="image" />
              <img src={ require('../logos/aleth_blue.svg').default } alt="alETH logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/ram.png').default } alt="Ramses logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprsLoading ? "0" : Math.round(this.state.aprs.alUsdAlEth*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://app.ramses.exchange/liquidity/v2/0xb69d60d0690733c0cc4db1c1aedeeaa308f30328" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alETH-frxETH
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/arbi.png').default } alt="Arbitrum logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/aleth_blue.svg').default } alt="alETH logo" className="image" />
            </div>
            <div className="earn-yield-reward">
              <img src={ require('../logos/ram.png').default } alt="Ramses logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprsLoading ? "0" : Math.round(this.state.aprs.alEthFrxEth*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://app.ramses.exchange/manage/v1/0xfb4fe921f724f3c7b610a826c827f9f6ecef6886" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>

          <div className="earn-yield-row">
            
            <div className="earn-yield-strat">
              alETH-ALCX
            </div>
            <div className="earn-yield-chain">
              <img src={ require('../logos/arbi.png').default } alt="Arbitrum logo" className="image" />
            </div>
            
            <div className="earn-yield-alasset">
              <img src={ require('../logos/aleth_blue.svg').default } alt="alETH logo" className="image" />
              <img src={ require('../logos/alcx_logo.png').default } alt="ALCX logo" className="image" />
            </div>
            <div className="earn-yield-reward">
             <img src={ require('../logos/ram.png').default } alt="Ramses logo" className="image" />
            </div>
            <div className="earn-yield-yield">
              {this.state.aprsLoading ? "0" : Math.round(this.state.aprs.alEthAlcx*100)/100}%
            </div>
            <div className="earn-yield-link">
              <a href="https://app.ramses.exchange/manage/v1/0x9c99764ad164360cf85eda42fa2f4166b6cba2a4" target="_blank" rel="noreferrer">Deposit</a>
            </div>
          </div>

      </div>);
  }
}