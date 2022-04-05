import React from 'react';
import './App.css';
import Web3 from 'web3';
import ChartDonut from './ChartDonut';
import ChartEmissions from './ChartEmissions';
import ChartInflation from './ChartInflation';
import ChartAlusdSupply from './ChartAlusdSupply';
import ChartAlusdPrice from './ChartAlusdPrice';
import ChartAlethSupply from './ChartAlethSupply';
import CurrentALCXSupply from './CurrentALCXSupply';
import ChartDaiTVL from './ChartDaiTVL';
import ChartEthTVL from './ChartEthTVL';
import ChartV2AlchemistTVL from './ChartV2AlchemistTVL';
import ChartV2AlchemistEthTVL from './ChartV2AlchemistEthTVL';
import {emissionWeek, tokenEmission, currentStats, futureInflation} from './Functions';
import { Switch } from '@mui/material';

let date = new Date();
let today = {
  year: date.getFullYear(),
  month: date.getMonth(),
  day: date.getDate()
}
let yvDaiAddress = '0xda816459f1ab5631232fe5e97a05bbbb94970c95';
let yvUsdcAddress = '0xa354f35829ae975e850e23e9615b11da1b3dc4de';
let yvUsdtAddress = '0x7da96a3891add058ada2e826306d812c638d87a7';
let yvWethAddress = '0xa258c4606ca8206d8aa700ce2143d7db854d168c';
let wstEthAddress = '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0';
let rEthAddress = '0xae78736cd615f374d3085123a210448e74fc6393';

const web3 = new Web3('https://mainnet.strongblock.com/acffa3b1546d7f2fa9e6e4d974497e331f2f82d7');
const alchemistAbi = [{
	constant: true,
	inputs: [{
		name: 'yieldToken',
		type: 'address'
	}],
	name: 'getYieldTokenParameters',
	outputs: [{
		name: 'params',
		type: 'tuple',
		components: [
			{ type: "uint8", name: "decimals" },
			{ type: "address", name: "underlyingToken" },
			{ type: "address", name: "adapter" },
			{ type: "uint256", name: "maximumLoss" },
			{ type: "uint256", name: "expectedValue" },
			{ type: "uint256", name: "totalShares" },
			{ type: "bool", name: "enabled" },
      { type: "uint256", name: "something" },
      { type: "uint256", name: "something2" }]
	}],
  payable: false,
	stateMutability: 'view',
	type: 'function'
},
{
	constant: true,
	inputs: [{
		name: 'yieldToken',
		type: 'address'
	}],
	name: 'getUnderlyingTokensPerShare',
	outputs: [{
		name: 'rate',
		type: 'uint256'
	}],
  payable: false,
	stateMutability: 'view',
	type: 'function'
}];

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dates: [],
      prices: [],
      volumes: [],
      marketcaps: [],
      marketcapDates: [],
      tvlDates: [],
      daiAlchemistTVL: [],
      daiTransmuterTVL: [],
      ethTVLDates: [],
      ethAlchemistTVL: [],
      ethTransmuterTVL: [],
      ethPricesForTVL: [],
      rethPricesForTVL: [],
      stethPricesForTVL: [],
      v2AlchemistTVL: {},
      v2AlchemistEthTVL: {},
      v2Caps: {},
      v2Deposit: {},
      tokensPerShare: {},
      ethCurrencyToggle: true,
      ethPricesForTVLLoading: true,
      rethPricesForTVLLoading: true,
      stethPricesForTVLLoading: true,
      ethTransmuterTVLLoading: true,
      ethAlchemistTVLLoading: true,
      daiTransmuterTVLLoading: true,
      daiAlchemistTVLLoading: true,
      v2AlchemistTVLLoading: true,
      v2AlchemistEthTVLLoading: true,
      v2CurrentLoading: true,
      isLoading: true,
    };

    this.toggleEthCurrency = this.toggleEthCurrency.bind(this);
    this.alchemistContract = new web3.eth.Contract(
      alchemistAbi,
      // Alchemist V2 address
      '0x5C6374a2ac4EBC38DeA0Fc1F8716e5Ea1AdD94dd'
    );
    this.alchemistEthContract = new web3.eth.Contract(
      alchemistAbi,
      // Alchemist Eth V2 address
      '0x062Bf725dC4cDF947aa79Ca2aaCCD4F385b13b5c'
    );
  }

  componentDidMount() {
    this.getData();
    this.getDaiAlchemistTVL();
    this.getDaiTransmuterTVL();
    this.getEthAlchemistTVL();
    this.getEthTransmuterTVL();
    this.getV2AlchemistTVL();
    this.getV2AlchemistEthTVL();
    this.getEthPrice();
    this.getRETHPrice();
    this.getWstETHPrice();
    this.aggregateWeb3Calls();
  }

  calculateArrays(result){
    if(result && result.prices.length === result.total_volumes.length && result.prices.length === result.market_caps.length) {
      let dates = [];
      let prices = [];
      let volumes = [];
      let marketcaps = [];
      let marketcapDates = [];
      let tempDate;
      let counter = 0;
      for(let i=0;i<result.prices.length;i++){
        tempDate = new Date(result.prices[i][0]);
        dates[i] = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
        prices[i] = result.prices[i][1];
        volumes[i] = result.total_volumes[i][1]; 
      }
      for (let i=0;i<result.market_caps.length;i++) {
        tempDate = new Date(result.market_caps[i][0]);
        marketcapDates[counter] = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate();
        marketcaps[counter] = Math.round(result.market_caps[i][1]/10000)/100;
        if(result.market_caps[i][1] !== 0) counter++;
      }
      this.setState({ dates: dates, prices: prices, volumes: volumes, marketcaps: marketcaps, marketcapDates: marketcapDates, isLoading: false });
    }
  } 

  aggregateWeb3Calls(){
    let v2Caps = {
      dai: 0,
      usdc: 0,
      usdt: 0,
      eth: 0,
      wstEth: 0,
      rEth: 0
    }
    let tokensPerShare = {
      dai: 0,
      usdc: 0,
      usdt: 0,
      eth: 0,
      wstEth: 0
    }
    let deposit = {
      dai: 0,
      usdc: 0,
      usdt: 0,
      eth: 0,
      wstEth: 0,
      rEth: 0
    }

    Promise.all([this.alchemistContract.methods.getYieldTokenParameters(yvDaiAddress).call(),
      this.alchemistContract.methods.getYieldTokenParameters(yvUsdcAddress).call(),
      this.alchemistContract.methods.getYieldTokenParameters(yvUsdtAddress).call(),
      this.alchemistContract.methods.getUnderlyingTokensPerShare(yvDaiAddress).call(),
      this.alchemistContract.methods.getUnderlyingTokensPerShare(yvUsdcAddress).call(),
      this.alchemistContract.methods.getUnderlyingTokensPerShare(yvUsdtAddress).call(),
      this.alchemistEthContract.methods.getYieldTokenParameters(yvWethAddress).call(),
      this.alchemistEthContract.methods.getUnderlyingTokensPerShare(yvWethAddress).call(),
      this.alchemistEthContract.methods.getYieldTokenParameters(wstEthAddress).call(),
      this.alchemistEthContract.methods.getUnderlyingTokensPerShare(wstEthAddress).call(),
      this.alchemistEthContract.methods.getYieldTokenParameters(rEthAddress).call()])
      .then(([daiParams, usdcParams, usdtParams, daiTokens, usdcTokens, usdtTokens, ethParams, ethTokens, wstEthParams, wstEthTokens, rEthParams]) => {
        v2Caps.dai = daiParams[4]/Math.pow(10, daiParams[0]);
        v2Caps.usdc = usdcParams[4]/Math.pow(10, usdcParams[0]);
        v2Caps.usdt = usdtParams[4]/Math.pow(10, usdtParams[0]);
        v2Caps.eth = ethParams[4]/Math.pow(10, ethParams[0]);
        v2Caps.wstEth = wstEthParams[4]/Math.pow(10, wstEthParams[0]);
        v2Caps.rEth = rEthParams[4]/Math.pow(10, rEthParams[0]);
        tokensPerShare.dai = daiTokens/Math.pow(10, 18);
        tokensPerShare.usdc = usdcTokens/Math.pow(10, 6);
        tokensPerShare.usdt = usdtTokens/Math.pow(10, 6);
        tokensPerShare.eth = ethTokens/Math.pow(10, 18);
        tokensPerShare.wstEth = wstEthTokens/Math.pow(10, 18);
        deposit.dai = daiParams[8]/Math.pow(10, 24);
        deposit.usdc = usdcParams[8]/Math.pow(10, 12);
        deposit.usdt = usdtParams[8]/Math.pow(10, 12);
        deposit.eth = ethParams[8]/Math.pow(10, 18);
        deposit.wstEth = wstEthParams[8]/Math.pow(10, 18);
        deposit.rEth = rEthParams[8]/Math.pow(10, 18);
        console.log(ethParams[8]);
        this.setState({ v2Caps: v2Caps, tokensPerShare: tokensPerShare, v2Deposit: deposit, v2CurrentLoading: false });
    });
  }

  calculateDaiAlchemistTVL(result){
    if(result){
      let tvlDates = [];
      let daiAlchemistTVL = [];
      for(let i=0;i<result.length;i++){
        tvlDates[i] = result[i].BALANCE_DATE;
        daiAlchemistTVL[i] = Math.round(result[i].TOTAL/10000)/100;
      }
      this.setState({ tvlDates: tvlDates, daiAlchemistTVL: daiAlchemistTVL, daiAlchemistTVLLoading: false })
    }
  }

  calculateDaiTransmuterTVL(result){
    if(result){
      let daiTransmuterTVL = [];
      for(let i=0;i<result.length;i++){
        daiTransmuterTVL[i] = Math.round(result[i].TOTAL/10000)/100;
      }
      this.setState({ daiTransmuterTVL: daiTransmuterTVL, daiTransmuterTVLLoading: false })
    }
  }

  calculateEthAlchemistTVL(result){
    if(result){
      let ethTVLDates = [];
      let ethAlchemistTVL = [];
      for(let i=0;i<result.length;i++){
        ethTVLDates[i] = result[i].BALANCE_DATE;
        ethAlchemistTVL[i] = Math.round(result[i].TOTAL);
      }
      this.setState({ ethTVLDates: ethTVLDates, ethAlchemistTVL: ethAlchemistTVL, ethAlchemistTVLLoading: false })
    }
  }

  calculateEthTransmuterTVL(result){
    if(result){
      let ethTransmuterTVL = [];
      for(let i=0;i<result.length;i++){
        ethTransmuterTVL[i] = Math.round(result[i].TOTAL);
      }
      this.setState({ ethTransmuterTVL: ethTransmuterTVL, ethTransmuterTVLLoading: false })
    }
  }

  calculateEthPrice(result){
    let ethPricesForTVL = [];
    for(let i=0;i<result.prices.length;i++){
      ethPricesForTVL[i] = result.prices[i][1]; 
    }
    this.setState({ ethPricesForTVL: ethPricesForTVL, ethPricesForTVLLoading: false });
  }

  calculateRETHPrice(result){
    let rethPricesForTVL = [];
    for(let i=0;i<result.prices.length;i++){
      rethPricesForTVL[i] = result.prices[i][1]; 
    }
    this.setState({ rethPricesForTVL: rethPricesForTVL, rethPricesForTVLLoading: false });
  }

  calculateWstETHPrice(result){
    let stethPricesForTVL = [];
    for(let i=0;i<result.prices.length;i++){
      stethPricesForTVL[i] = result.prices[i][1]; 
    }
    this.setState({ stethPricesForTVL: stethPricesForTVL, stethPricesForTVLLoading: false });
  }

  calculateV2AlchemistTVL(result){
    if(result){
      let v2AlchemistTVL = {
        balance_date: [],
        dai: [],
        usdc: [],
        usdt: []
      };
      for(let i=0;i<result.length;i++){
        v2AlchemistTVL.balance_date[i] = result[i].BALANCE_DATE;
        v2AlchemistTVL.dai[i] = Math.round(result[i].DAI/10000)/100;
        v2AlchemistTVL.usdc[i] = Math.round(result[i].USDC/10000)/100;
        v2AlchemistTVL.usdt[i] = Math.round(result[i].USDT/10000)/100;
      }
      this.setState({ v2AlchemistTVL: v2AlchemistTVL, v2AlchemistTVLLoading: false })
    }
  }

  calculateV2AlchemistEthTVL(result){
    if(result){
      let v2AlchemistEthTVL = {
        balance_date: [],
        eth: [],
        reth: [],
        steth: []
      };
      for(let i=0;i<result.length;i++){
        v2AlchemistEthTVL.balance_date[i] = result[i].BALANCE_DATE;
        v2AlchemistEthTVL.eth[i] = Math.round(result[i].ETH*100)/100;
        v2AlchemistEthTVL.reth[i] = Math.round(result[i].RETH*100)/100;
        v2AlchemistEthTVL.steth[i] = Math.round(result[i].STETH*100)/100;
      }
      this.setState({ v2AlchemistEthTVL: v2AlchemistEthTVL, v2AlchemistEthTVLLoading: false })
    }
  }

  getData() {
    fetch("https://api.coingecko.com/api/v3/coins/alchemix-usd/market_chart?vs_currency=usd&days=max&interval=daily")
      .then(res => res.json())
      .then(
        (result) => {
          this.calculateArrays(result)
        },
        (error) => {
          console.log(error)
        }
      )
  }

  getDaiAlchemistTVL() {
    fetch("https://api.flipsidecrypto.com/api/v2/queries/a29262d6-7878-4c8e-8d4e-a62f414c846f/data/latest")
      .then(res => res.json())
      .then(
        (result) => {
          this.calculateDaiAlchemistTVL(result)
        },
        (error) => {
          console.log(error)
        }
      )
  }

  getDaiTransmuterTVL() {
    fetch("https://api.flipsidecrypto.com/api/v2/queries/6a72370b-6c81-4b3f-9691-cfdb0a3118d3/data/latest")
      .then(res => res.json())
      .then(
        (result) => {
          this.calculateDaiTransmuterTVL(result)
        },
        (error) => {
          console.log(error)
        }
      )
  }

  getEthAlchemistTVL() {
    fetch("https://api.flipsidecrypto.com/api/v2/queries/925c5328-386f-44c1-bfe9-18a796201fff/data/latest")
      .then(res => res.json())
      .then(
        (result) => {
          this.calculateEthAlchemistTVL(result)
        },
        (error) => {
          console.log(error)
        }
      )
  }

  getEthTransmuterTVL() {
    fetch("https://api.flipsidecrypto.com/api/v2/queries/c837204d-27a8-4f0d-b0f0-6d340e5de0e8/data/latest")
      .then(res => res.json())
      .then(
        (result) => {
          this.calculateEthTransmuterTVL(result)
        },
        (error) => {
          console.log(error)
        }
      )
  }

  getEthPrice(){
    fetch("https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000")
    .then(res => res.json())
    .then(
      (result) => {
        this.calculateEthPrice(result)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  getRETHPrice(){
    fetch("https://api.coingecko.com/api/v3/coins/rocket-pool-eth/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000")
    .then(res => res.json())
    .then(
      (result) => {
        this.calculateRETHPrice(result)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  getWstETHPrice(){
    fetch("https://api.coingecko.com/api/v3/coins/wrapped-steth/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000")
    .then(res => res.json())
    .then(
      (result) => {
        this.calculateWstETHPrice(result)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  getV2AlchemistTVL(){
    fetch("https://api.flipsidecrypto.com/api/v2/queries/6f29b174-9b21-43cf-a359-fd82c22fd22a/data/latest")
    .then(res => res.json())
    .then(
      (result) => {
        this.calculateV2AlchemistTVL(result)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  getV2AlchemistEthTVL(){
    fetch("https://api.flipsidecrypto.com/api/v2/queries/b9235fa9-79a7-454d-a42a-d5d2e294487b/data/latest")
    .then(res => res.json())
    .then(
      (result) => {
        this.calculateV2AlchemistEthTVL(result)
      },
      (error) => {
        console.log(error)
      }
    )
  }


  toggleEthCurrency(){
    if(this.state.ethCurrencyToggle) this.setState({ ethCurrencyToggle: false });
    else this.setState({ ethCurrencyToggle: true });
  }

  render() {

  let v1DaiTVL = (this.state.daiAlchemistTVLLoading || this.state.daiTransmuterTVLLoading || this.state.v2CurrentLoading) ? 0 : Math.round((this.state.daiAlchemistTVL[this.state.daiAlchemistTVL.length-1]+this.state.daiTransmuterTVL[this.state.daiTransmuterTVL.length-1])*100*this.state.tokensPerShare.dai)/100;
  let v1EthTVL = (this.state.ethAlchemistTVLLoading || this.state.ethTransmuterTVLLoading || this.state.v2CurrentLoading) ? 0 : Math.round((this.state.ethAlchemistTVL[this.state.ethAlchemistTVL.length-1]+this.state.ethTransmuterTVL[this.state.ethTransmuterTVL.length-1])*this.state.tokensPerShare.eth);
  let v1EthUsdTVL = (this.state.ethAlchemistTVLLoading || this.state.ethTransmuterTVLLoading || this.state.ethPricesForTVLLoading) ? 0 : Math.round(v1EthTVL*this.state.ethPricesForTVL[this.state.ethPricesForTVL.length-1]/10000)/100;
  let v2DaiTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.dai*this.state.tokensPerShare.dai*100)/100;
  let v2UsdcTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.usdc*this.state.tokensPerShare.usdc*100)/100;
  let v2UsdtTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.usdt*this.state.tokensPerShare.usdt*100)/100;
  let v2EthTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.eth*this.state.tokensPerShare.eth);
  let v2EthUsdTVL = (this.state.ethPricesForTVLLoading || this.state.v2CurrentLoading) ? 0 : Math.round(v2EthTVL*this.state.ethPricesForTVL[this.state.ethPricesForTVL.length-1]/10000)/100;
  let v2RethTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.rEth*100)/100;
  let v2RethUsdTVL = (this.state.rethPricesForTVLLoading || this.state.v2CurrentLoading) ? 0 : Math.round(v2RethTVL*this.state.rethPricesForTVL[this.state.rethPricesForTVL.length-1]/10000)/100;
  let v2StethTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.wstEth*this.state.tokensPerShare.wstEth*100)/100;
  let v2StethUsdTVL = (this.state.v2CurrentLoading || this.state.stethPricesForTVLLoading) ? 0 : Math.round(this.state.v2Deposit.wstEth*this.state.stethPricesForTVL[this.state.stethPricesForTVL.length-1]/10000)/100;

  return (
    <div className="App">
      <div className="header-disclaimer">This service provides statistics for the Alchemix dApp (<a target="_blank" rel="noreferrer" href="https://alchemix.fi">alchemix.fi</a>) and associated crypto tokens.
      The service is unofficial and is not connected to the core team.</div>
      <h1>Alchemix Statistics</h1>
      <img className="header-image" src={ require('./logos/alcx_logo.png').default } alt="ALCX logo" />
      <h2>ALCX Emissions</h2>
      <div className="summary">
        <span>We are in <span className="important">Week {emissionWeek()}</span> of  emissions.</span>
        <span>The protocol is currently emitting <span className="important">{tokenEmission()} <img src={ require('./logos/alcx_logo.png').default } alt="ALCX" className="image2" />ALCX/week.</span></span>
        <span>Current inflation is <span className="important">{currentStats().currentInflation}%/week</span> ({currentStats().currentInflationAnnual}% annually)</span>
        <span><img src={ require('./logos/alcx_logo.png').default } alt="ALCX" className="image2" />ALCX supply growth compared to today, 1 year from now ({today.year+1}-{today.month+1}-{today.day}): <span className="important">{futureInflation(1).totalInflation}%</span> Forward-looking inflation 1 year from now: <span className="important">{futureInflation(1).forwardInflation}%</span></span>
        <span><img src={ require('./logos/alcx_logo.png').default } alt="ALCX" className="image2" />ALCX supply growth compared to today, 2 years from now ({today.year+2}-{today.month+1}-{today.day}): <span className="important">{futureInflation(2).totalInflation}%</span> Forward-looking inflation 2 years from now: <span className="important">{futureInflation(2).forwardInflation}%</span></span>
        <span><img src={ require('./logos/alcx_logo.png').default } alt="ALCX" className="image2" />ALCX supply growth compared to today, 3 years from now ({today.year+3}-{today.month+1}-{today.day}): <span className="important">{futureInflation(3).totalInflation}%</span> Forward-looking inflation 3 years from now: <span className="important">{futureInflation(3).forwardInflation}%</span></span>
        <br/>
        <span>Official emission schedule: <a target="_blank" rel="noreferrer" href="https://alchemix-finance.gitbook.io/alchemix-finance/token-distribution/alcx-monetary-policy">ALCX Monetary Policy</a></span>
        <br/>
        <CurrentALCXSupply />
      </div>

      <div className="section-wrapper">
        <div className="chart-title">
          <h3>Emission Schedule</h3>   
          <ChartEmissions />
        </div>
        <div className="chart-title">
          <h3 className="inflation-title">ALCX Inflation</h3>
          <span className="chart-title-explain">(annualized forward-looking)</span>
          <ChartInflation />
        </div>
      </div>

      <div className="section-wrapper">
        <div className="content-tab">
          <div className="box-wrapper">
            <h3>Emission Weights</h3>
            <div className="weight-table">
              <div className="weight-table-column">
                <span className="table-title">Staking (42%)</span>
                <div className="weight-table-row">
                  <img src={ require('./logos/alcx_eth_slp.png').default } alt="ALCX-ETH SLP" className="image" />
                  <div className="table-item-1">ALCX/ETH SLP</div>
                  <div className="table-item-2">20%</div>
                </div>
                <div className="weight-table-row">
                  <img src={ require('./logos/talcx.png').default } alt="tALCX" className="image" />
                  <div className="table-item-1">tALCX</div>
                  <div className="table-item-2">12%</div>
                </div>
                <div className="weight-table-row">
                  <img src={ require('./logos/alcx_logo.png').default } alt="ALCX" className="image" />
                  <div className="table-item-1">ALCX</div>
                  <div className="table-item-2">10%</div>
                </div>
              </div>
              <div className="weight-table-column">
                <span className="table-title">Bonds (40%)</span>
                <div className="weight-table-row">
                  <img src={ require('./logos/cvx.png').default } alt="CVX logo" className="image" />
                  <div className="table-item-1">CVX</div>
                  <div className="table-item-2">17.5%</div>
                </div>
                <div className="weight-table-row">
                  <img src={ require('./logos/alcx_eth_slp.png').default } alt="ALCX-ETH SLP" className="image" />
                  <div className="table-item-1">ALCX/ETH SLP</div>
                  <div className="table-item-2">10%</div>
                </div>
                <div className="weight-table-row">
                  <img src={ require('./logos/eth.png').default } alt="ETH logo" className="image" />
                  <div className="table-item-1">ETH</div>
                  <div className="table-item-2">5%</div>
                </div>
                <div className="weight-table-row">
                  <img src={ require('./logos/dai.png').default } alt="DAI logo" className="image" />
                  <div className="table-item-1">DAI</div>
                  <div className="table-item-2">5%</div>
                </div>
                <div className="weight-table-row">
                  <img src={ require('./logos/tokemak.png').default } alt="Toke" className="image" />
                  <div className="table-item-1">Toke</div>
                  <div className="table-item-2">2.5%</div>
                </div>
              </div>
              <div className="weight-table-column">
                <span className="table-title">alAsset liquidity (18%)</span>
                <div className="weight-table-row">
                  <img src={ require('./logos/alusd.png').default } alt="alUSD" className="image" />
                  <div className="table-item-1">alUSD3CRV</div>
                  <div className="table-item-2">8%</div>
                </div>
                <div className="weight-table-row">
                  <img src={ require('./logos/eth_aleth.png').default } alt="alETH-ETH" className="image" />
                  <div className="table-item-1">alETHCRV</div>
                  <div className="table-item-2">6%</div>
                </div>
                <div className="weight-table-row">
                  <img src={ require('./logos/d3pool.png').default } alt="d3pool" className="image" />
                  <div className="table-item-1">d3pool</div>
                  <div className="table-item-2">2%</div>
                </div>
                <div className="weight-table-row">
                  <img src={ require('./logos/aleth_saddle.png').default } alt="alETH Saddle" className="image" />
                  <div className="table-item-1">alETHSaddle</div>
                  <div className="table-item-2">2%</div>
                </div>
              </div>
            </div>
            <div className="normal-content">Latest adjustments to emissions: <a target="_blank" rel="noreferrer" href="https://snapshot.org/#/alchemixstakers.eth/proposal/0xe111e77d0bcc78d2c7c994c38ec1e915b1b50a306f9d90fa09b1e78db71eba12">
              AIP-31</a>, <a target="_blank" rel="noreferrer" href="https://snapshot.org/#/alchemixstakers.eth/proposal/0xa1737555482930ca3687b3ed0c955f32fe204b19216290b43a77c099a41ebf85">
              AIP-32</a>, <a target="_blank" rel="noreferrer" href="https://snapshot.org/#/alchemixstakers.eth/proposal/0xe476e3a4bc6749e3e980b2aed3db7af63e95792ff45c626d717a213dcae96e41">
              AIP-34</a></div>
          </div>
        </div>
        <ChartDonut />
      </div>

      <h2>TVL and Deposit Caps</h2>
      <div className="summary">
            In Alchemix V1 only one collateral type is accepted both for alUSD and alETH, DAI and ETH.<br/>
            Both the Alchemist and the Transmuter deploy their DAI and ETH balance into the Yearn DAI and Yearn WETH strategies.<br/>
            Alchemix V2 introduces additional collateral types and yield sources.<br/>
            Total TVL for ETH variants and stablecoins though is not sufficient to see what assets the protocol controls, as there are assets owned by the treasury that generate yield and are beneficial for the protocol (Pool2 (ALCX/ETH SLP) tokens, CVX, TOKE tokens, etc.)<br/>
            Deposit caps are set for each collateral asset. As long as a user can deposit a certain amount of collateral, they are able to take a max loan of 50% of their deposit.<br/>
            Please note that for wstETH the deposit cap is set in ETH, not wstETH.<br/>
            This is different from V1, where debt caps were set, but no deposit caps, meaning that someone could deposit collateral and not be able to take out a loan on that if the system was already at maximum debt cap.<br/>
            <br/>
            <div className="tvl-tables">
              {(this.state.daiAlchemistTVLLoading || this.state.daiTransmuterTVLLoading || this.state.ethAlchemistTVLLoading || this.state.ethTransmuterTVLLoading || this.state.ethPricesForTVLLoading) ? "Loading..." :
              <div className="small-table">
                <h3>V1 TVL</h3>
                <div className="small-table-inner">
                  <span className="small-table-row"><img src={ require('./logos/dai.png').default } alt="DAI logo" className="image" />yvDAI</span><span className="important-2">${v1DaiTVL}M</span>
                  <span className="small-table-row"><img src={ require('./logos/eth.png').default } alt="ETH logo" className="image" />yvWETH</span><span className="important-2">${v1EthUsdTVL}M&nbsp;<i>({v1EthTVL} ETH)</i></span>
                  <span className="small-table-row"><img src={ require('./logos/dai.png').default } alt="DAI logo" className="image" />+<img src={ require('./logos/eth.png').default } alt="ETH logo" className="image" /></span><span className="important-2">${Math.round((v1DaiTVL + v1EthUsdTVL)*100)/100}M</span>
                </div>
              </div>
              }
              {(this.state.v2AlchemistTVLLoading || this.state.v2AlchemistEthTVLLoading || this.state.ethPricesForTVLLoading || this.state.v2CurrentLoading) ? "Loading..." :
              <div className="small-table">
                <h3>V2 TVL and Deposit Caps</h3>
                <div className="small-table-inner-2">
                  <span className="small-table-row"></span><span>TVL</span><span>Deposit cap</span>
                  <span className="small-table-row"><img src={ require('./logos/dai.png').default } alt="DAI logo" className="image" />yvDAI</span><span className="important-2">${v2DaiTVL}M</span><span className="important-2">${Math.round(this.state.v2Caps.dai/10000)/100}M</span>
                  <span className="small-table-row"><img src={ require('./logos/usdc.png').default } alt="USDC logo" className="image" />yvUSDC</span><span className="important-2">${v2UsdcTVL}M</span><span className="important-2">${Math.round(this.state.v2Caps.usdc/10000)/100}M</span>
                  <span className="small-table-row"><img src={ require('./logos/usdt.png').default } alt="USDT logo" className="image" />yvUSDT</span><span className="important-2">${v2UsdtTVL}M</span><span className="important-2">${Math.round(this.state.v2Caps.usdt/10000)/100}M</span>

                  <span className="small-table-row"><img src={ require('./logos/eth.png').default } alt="ETH logo" className="image" />yvWETH</span><span className="important-4"><span>${v2EthUsdTVL}M</span><i>({v2EthTVL} ETH)</i></span><span className="important-2">{Math.round(this.state.v2Caps.eth)} ETH</span>
                  <span className="small-table-row"><img src={ require('./logos/steth.png').default } alt="stETH logo" className="image" />wstETH</span><span className="important-4">${v2StethUsdTVL}M&nbsp;<i>({v2StethTVL} ETH)</i></span><span className="important-2">{Math.round(this.state.v2Caps.wstEth)} ETH</span>
                  <span className="small-table-row"><img src={ require('./logos/reth.png').default } alt="rETH logo" className="image" />rETH</span><span className="important-4">${v2RethUsdTVL}M&nbsp;<i>({v2RethTVL} rETH)</i></span><span className="important-2">{Math.round(this.state.v2Caps.rEth)} rETH</span>

                  <span className="small-table-row-2">TOTAL V2</span><span className="important-3">${Math.round((v2DaiTVL + v2UsdcTVL + v2UsdtTVL + v2EthUsdTVL + v2RethUsdTVL + v2StethUsdTVL)*100)/100}M</span>
                </div>
              </div>
              }
            </div>
      </div>
      <div className="section-wrapper">
        <div className="chart-title">
          <h3>DAI TVL V1</h3>
          {(this.state.daiAlchemistTVLLoading || this.state.daiTransmuterTVLLoading ) ? "Loading..." :
          <ChartDaiTVL tvlDates={this.state.tvlDates} daiAlchemistTVL={this.state.daiAlchemistTVL} daiTransmuterTVL={this.state.daiTransmuterTVL} />
          }
        </div>
        <div className="chart-title">
          <h3>ETH TVL V1</h3>
          <div className="toggle-text">
            $
            <Switch onChange={this.toggleEthCurrency} checked={this.state.ethCurrencyToggle} />
            ETH
          </div>
          
          {(this.state.ethAlchemistTVLLoading || this.state.ethTransmuterTVLLoading || this.state.ethPricesForTVLLoading) ? "Loading..." :
          <ChartEthTVL toggle={this.state.ethCurrencyToggle} ethTVLDates={this.state.ethTVLDates} ethAlchemistTVL={[...this.state.ethAlchemistTVL]} ethTransmuterTVL={[...this.state.ethTransmuterTVL]} ethPricesForTVL={this.state.ethPricesForTVL} />
          }
        </div>
      </div>

      <div className="section-wrapper">
        <div className="chart-title">
          <h3>Alchemist V2 Stablecoin TVL</h3>
          {(this.state.v2AlchemistTVLLoading ) ? "Loading..." :
          <ChartV2AlchemistTVL v2AlchemistTVL={this.state.v2AlchemistTVL} />
          }
        </div>
        <div className="chart-title">
          <h3>Alchemist V2 Eth TVL</h3>
          {(this.state.v2AlchemistEthTVLLoading ) ? "Loading..." :
          <ChartV2AlchemistEthTVL v2AlchemistEthTVL={this.state.v2AlchemistEthTVL} />
          }
        </div>
      </div>

      <img src={ require('./logos/alusd.png').default } alt="alUSD logo" className="image3" />
      <h2>alUSD</h2>
      <div className="summary">
      alUSD supply grows when people deposit collateral assets and borrow alUSD against them.<br/>
          The supply contracts when people repay their outstanding debt using alUSD or when they use the transmuter to exchange alUSD for collateral assets.<br/>
          In these cases the protocol burns the alUSD tokens and the total supply decreases.<br/><br/>
          Since the launch of Alchemix V2, the following collateral types are supported:<br/>
          <div className="small-table-2">
            <div className="tokens"><img src={ require('./logos/dai.png').default } alt="dai token" className="image" />DAI</div>
            <div className="tokens"><img src={ require('./logos/usdt.png').default } alt="usdt token" className="image" />USDT</div>
            <div className="tokens"><img src={ require('./logos/usdc.png').default } alt="usdc token" className="image" />USDC</div>
          </div>
          The protocol deploys collateral assets into one of the supported yield strategies. Currently supported yield options:
          <div className="small-table-2">
            <div className="tokens"><img src={ require('./logos/yearn_dai.png').default } alt="yearn dai token" className="image" /><a target="_blank" rel="noreferrer" href="https://yearn.finance/#/vault/0xdA816459F1AB5631232FE5e97a05BBBb94970c95">Yearn DAI</a></div>
            <div className="tokens"><img src={ require('./logos/yearn_usdt.png').default } alt="yearn usdt token" className="image" /><a target="_blank" rel="noreferrer" href="https://yearn.finance/#/vault/0x7Da96a3891Add058AdA2E826306D812C638D87a7">Yearn USDT</a></div>
            <div className="tokens"><img src={ require('./logos/yearn_usdc.png').default } alt="yearn usdc token" className="image" /><a target="_blank" rel="noreferrer" href="https://yearn.finance/#/vault/0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE">Yearn USDC</a></div>
          </div>
          The protocol assumes every alUSD is worth $1 and the transmuter exchanges alUSD for $1 worth of any collateral asset.<br/>
          Thus it is the primary goal of the protocol to maintain the peg ($1 value) for alUSD.
        
      </div>
      <div className="section-wrapper">
        <div className="chart-title">
          <h3>alUSD Total Supply</h3>
          {this.state.isLoading === true ? "Loading..." :
          <ChartAlusdSupply marketcapDates={this.state.marketcapDates} marketcaps={this.state.marketcaps} />
          }
        </div>
        <div className="chart-title">
          <h3>alUSD Price</h3>
          {this.state.isLoading === true ? "Loading..." :
          <ChartAlusdPrice dates={this.state.dates} prices={this.state.prices} />
          }
        </div>
      </div>

      <img src={ require('./logos/aleth.png').default } alt="alETH logo" className="image3" />
      <h2>alETH</h2>
      <div className="summary">
        
        
        
      </div>
      <div className="section-wrapper">
        <div className="content-tab">
          <h3>alETH Total Supply</h3>
          alETH supply grows when people deposit collateral assets and borrow alETH against them.<br/>
          The supply contracts when people repay their outstanding debt using alETH or when they use the transmuter to exchange alETH for collateral assets.<br/>
          In these cases the protocol burns the alETH tokens and the total supply decreases.<br></br>
          Currently, the following collateral types are supported:<br/>
          <div className="small-table-2">
            <div className="tokens"><img src={ require('./logos/eth.png').default } alt="eth token" className="image" />ETH</div>
            <div className="tokens"><img src={ require('./logos/weth.png').default } alt="weth token" className="image" />WETH</div>
            <div className="tokens"><img src={ require('./logos/steth.png').default } alt="steth token" className="image" />wstETH</div>
            <div className="tokens"><img src={ require('./logos/reth.png').default } alt="reth token" className="image" />rETH</div>
          </div>
          The protocol deploys collateral assets into one of the supported yield strategies.<br/>
          In the case of RETH and wstETH, the tokens are already yield bearing, so there is no need for an additional yield strategy.<br/>
          Currently supported general yield options:
          <div className="tokens"><img src={ require('./logos/yearn_weth.png').default } alt="yearn weth token" className="image" /><a target="_blank" rel="noreferrer" href="https://yearn.finance/#/vault/0xa258C4606Ca8206D8aA700cE2143D7db854D168c">Yearn WETH</a></div>
        </div>
        <ChartAlethSupply />
      </div>

      <div className="footer">
        With issues or suggestions about the site, find me in the Alchemix Discord (Barree #2314)
      </div>
    </div>
  );
}
}