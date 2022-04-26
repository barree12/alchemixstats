import React from 'react';
import './App.css';
import Web3 from 'web3';
import ChartDonut from './charts/ChartDonut';
import ChartEmissions from './charts/ChartEmissions';
import ChartInflation from './charts/ChartInflation';
import ChartAlusdSupply from './charts/ChartAlusdSupply';
import ChartAlusdPrice from './charts/ChartAlusdPrice';
import ChartAlEthPrice from './charts/ChartAlEthPrice';
import ChartAlethSupply from './charts/ChartAlethSupply';
import ChartDaiTVL from './charts/ChartDaiTVL';
import ChartEthTVL from './charts/ChartEthTVL';
import ChartV2AlchemistTVL from './charts/ChartV2AlchemistTVL';
import ChartV2AlchemistEthTVL from './charts/ChartV2AlchemistEthTVL';
import ChartHarvestsUsd from './charts/ChartHarvestsUsd';
import ChartHarvestsEth from './charts/ChartHarvestsEth';
import ChartCrvPoolRatios from './charts/ChartCrvPoolRatios';
import EmissionWeights from './EmissionWeights';
import AlEthSummary from './AlEthSummary';
import AlUsdSummary from './AlUsdSummary';
import {emissionWeek, tokenEmission, currentStats, futureInflation, formatDate, datesEqual} from './Functions';
import { Switch, Button, ButtonGroup } from '@mui/material';

let treasuryWallet1Address = '0x9e2b6378ee8ad2a4a95fe481d63caba8fb0ebbf9';
let treasuryWallet2Address = '0x8392f6669292fa56123f71949b52d883ae57e225';
let elixirAddress = '0x9735f7d3ea56b454b24ffd74c58e9bd85cfad31b';
let elixirAlEthAddress = '0xe761bf731a06fe8259fee05897b2687d56933110';
let cvxAlUsd3CrvStakingContractAddress = '0x02e2151d4f351881017abdf2dd2b51150841d5b3';
let cvxAlEthCrvStakingContractAddress = '0x48Bc302d8295FeA1f8c3e7F57D4dDC9981FEE410';
let vlCvxTrackerAddress = '0x72a19342e8F1838460eBFCCEf09F6585e32db86E';
let tokeStakingContractAddress = '0x96f98ed74639689c3a11daf38ef86e59f43417d3';
let masterChefAddress = '0xef0881ec094552b2e128cf945ef17a6752b4ec5d';
let alcxEthSlpAddress = '0xc3f279090a47e80990fe3a9c30d24cb117ef91a8';
let abraAlcxCauldronAddress = '0x7b7473a76d6ae86ce19f7352a1e89f6c9dc39020';
let alchemistEthV2Address = '0x062Bf725dC4cDF947aa79Ca2aaCCD4F385b13b5c';
let alchemistV2Address = '0x5C6374a2ac4EBC38DeA0Fc1F8716e5Ea1AdD94dd';
let yvDaiAddress = '0xda816459f1ab5631232fe5e97a05bbbb94970c95';
let yvUsdcAddress = '0xa354f35829ae975e850e23e9615b11da1b3dc4de';
let yvUsdtAddress = '0x7da96a3891add058ada2e826306d812c638d87a7';
let yvWethAddress = '0xa258c4606ca8206d8aa700ce2143d7db854d168c';
let wstEthAddress = '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0';
let rEthAddress = '0xae78736cd615f374d3085123a210448e74fc6393';
let tAlcxAddress = '0xD3B5D9a561c293Fb42b446FE7e237DaA9BF9AA84';
let alcxAddress = '0xdBdb4d16EdA451D0503b854CF79D55697F90c8DF';
let wethAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
let alchemixStakingAddress = '0xab8e74017a8cc7c15ffccd726603790d26d7deca';
let saddleAlEthContractAddress = '0xc9da65931ABf0Ed1b74Ce5ad8c041C4220940368';
let saddleStakingContractAddress = '0x691ef79e40d909c715be5e9e93738b3ff7d58534';
let alUsd3CrvContractAddress = '0x43b4fdfd4ff969587185cdb6f0bd875c5fc83f8c';
let alEthCrvContractAddress = '0xc4c319e2d4d66cca4464c0c2b32c9bd23ebe784e';
let sdtContractAddress = '0x73968b9a57c6e53d41345fd57a6e6ae27d6cdb2f';

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
const erc20LikeAbi = [{
    constant: true,
    inputs: [{
        name: '_owner',
        type: 'address'
      }],
    name: 'balanceOf',
    outputs: [{
        name: 'balance',
        type: 'uint256'
      }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
},
{
  constant: true,
  inputs: [],
  name: 'totalSupply',
  outputs: [{
      name: 'supply',
      type: 'uint256'
    }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}];
const masterChefAbi = [{
  constant: true,
  inputs: [{
      name: 'pid',
      type: 'uint256'
    },
    {
      name: '_owner',
      type: 'address'
    },
  ],
  name: 'userInfo',
  outputs: [{
      name: 'amount',
      type: 'uint256'
    },
    {
      name: 'rewardDebt',
      type: 'int256'
    }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
}];
const abraCauldronAbi = [{
  constant: true,
  inputs: [{
      name: '_owner',
      type: 'address'
    }],
  name: 'userBorrowPart',
  outputs: [{
      name: 'balance',
      type: 'uint256'
    }],
  payable: false,
  stateMutability: 'view',
  type: 'function'
},
{
  constant: true,
  inputs: [{
      name: '_owner',
      type: 'address'
    }],
  name: 'userCollateralShare',
  outputs: [{
      name: 'balance',
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
      vaultV1Tvls: {},
      vaultV2Tvls: {},
      tokenPrices: {},
      alcxData: {},
      alUsdPeg: {},
      alEthPeg: {},
      v2Caps: {},
      v2Deposit: {},
      tokensPerShare: {},
      treasury: {},
      alcxEthSlp: {},
      alchemixStaking: {},
      alUsdPegActive: { dai: true, usdc: false, usdt: false },
      harvests: {},
      alAssetCrvSupply: {},
      ethCurrencyToggle: true,
      alUsdPegToggle: true,
      alEthPegToggle: true,
      tokenPricesLoading: true,
      vaultTvlsLoading: true,
      v2CurrentLoading: true,
      treasuryLoading: true,
      alUsdPegLoading: true,
      alEthPegLoading: true,
      alcxDataLoading: true,
      harvestsLoading: true,
      isLoading: true,
    };

    this.toggleEthCurrency = this.toggleEthCurrency.bind(this);
    this.toggleAlUsdPeg = this.toggleAlUsdPeg.bind(this);
    this.toggleAlEthPeg = this.toggleAlEthPeg.bind(this);
    this.alUsdPegClick = this.alUsdPegClick.bind(this);
    this.alchemistContract = new web3.eth.Contract(alchemistAbi, alchemistV2Address);
    this.alchemistEthContract = new web3.eth.Contract(alchemistAbi, alchemistEthV2Address);
    this.cvxAlUsd3CrvStakingContract = new web3.eth.Contract(erc20LikeAbi, cvxAlUsd3CrvStakingContractAddress);
    this.cvxAlEthCrvStakingContract = new web3.eth.Contract(erc20LikeAbi, cvxAlEthCrvStakingContractAddress);
    this.vlCvxTrackerContract = new web3.eth.Contract(erc20LikeAbi, vlCvxTrackerAddress);
    this.tAlcxContract = new web3.eth.Contract(erc20LikeAbi, tAlcxAddress);
    this.alcxContract = new web3.eth.Contract(erc20LikeAbi, alcxAddress);
    this.tokeStakingContract = new web3.eth.Contract(erc20LikeAbi, tokeStakingContractAddress);
    this.masterChefContract = new web3.eth.Contract(masterChefAbi, masterChefAddress);
    this.alcxEthSlpContract = new web3.eth.Contract(erc20LikeAbi, alcxEthSlpAddress);
    this.wethContract = new web3.eth.Contract(erc20LikeAbi, wethAddress);
    this.abraAlcxCauldronContract = new web3.eth.Contract(abraCauldronAbi, abraAlcxCauldronAddress);
    this.saddleAlEthContract = new web3.eth.Contract(erc20LikeAbi, saddleAlEthContractAddress);
    this.alUsd3CrvContract = new web3.eth.Contract(erc20LikeAbi, alUsd3CrvContractAddress);
    this.alEthCrvContract = new web3.eth.Contract(erc20LikeAbi, alEthCrvContractAddress);
    this.sdtContract = new web3.eth.Contract(erc20LikeAbi, sdtContractAddress);
  }

  componentDidMount() {
    this.getData();
    this.getAlcxData();
    this.getFlipsideCryptoData();
    this.aggregateWeb3Calls();
    this.getTreasury();
    this.getAlUsdPeg();
    this.getCoinGeckoData();
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
        dates[i] = formatDate(tempDate, 0);
        prices[i] = result.prices[i][1];
        volumes[i] = result.total_volumes[i][1]; 
      }
      for (let i=0;i<result.market_caps.length;i++) {
        tempDate = new Date(result.market_caps[i][0]);
        marketcapDates[counter] = formatDate(tempDate, 0);
        marketcaps[counter] = Math.round(result.market_caps[i][1]/10000)/100;
        if(result.market_caps[i][1] !== 0) counter++;
      }
      this.setState({ dates: dates, prices: prices, volumes: volumes, marketcaps: marketcaps, marketcapDates: marketcapDates, isLoading: false });
    }
  } 

  aggregateWeb3Calls(){
    let v2Caps = { dai: 0, usdc: 0, usdt: 0, eth: 0, wstEth: 0, rEth: 0 }
    let tokensPerShare = { dai: 0, usdc: 0, usdt: 0, eth: 0, wstEth: 0, rEth: 0 }
    let deposit = { dai: 0, usdc: 0, usdt: 0, eth: 0, wstEth: 0, rEth: 0 }

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
      this.alchemistEthContract.methods.getYieldTokenParameters(rEthAddress).call(),
      this.alchemistEthContract.methods.getUnderlyingTokensPerShare(rEthAddress).call()])
      .then(([daiParams, usdcParams, usdtParams, daiTokens, usdcTokens, usdtTokens, ethParams, ethTokens, wstEthParams, wstEthTokens, rEthParams, rEthTokens]) => {
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
        tokensPerShare.rEth = rEthTokens/Math.pow(10, 18);
        deposit.dai = daiParams[8]/Math.pow(10, 24);
        deposit.usdc = usdcParams[8]/Math.pow(10, 12);
        deposit.usdt = usdtParams[8]/Math.pow(10, 12);
        deposit.eth = ethParams[8]/Math.pow(10, 18);
        deposit.wstEth = wstEthParams[8]/Math.pow(10, 18);
        deposit.rEth = rEthParams[8]/Math.pow(10, 18);
        this.setState({ v2Caps: v2Caps, tokensPerShare: tokensPerShare, v2Deposit: deposit, v2CurrentLoading: false });
    });
  }

  getTreasury(){
    let treasury = {tAlcx : 0, alcx: 0, cvxAlUsd3CrvElixir: 0, cvxAlUsd3CrvTreasury: 0, cvxAlEthCrvTreasury: 0, vlCvx: 0, alcxEthSlpOwned: 0, alcxEthSlpOwnedRatio: 0, abraDebt: 0, sdt: 0 }
    let alcxEthSlp = { alcx: 0, weth: 0 }
    let alchemixStaking = { alcx: 0, tAlcx: 0, alcxEthSlp: 0, alcxEthSlpStakingRatio: 0, saddleAlEth: 0 }
    let alAssetCrvSupply = { alUsd3Crv: 0, alEthCrv: 0 };
    Promise.all([this.tAlcxContract.methods.balanceOf(treasuryWallet1Address).call(),
      this.tAlcxContract.methods.balanceOf(alchemixStakingAddress).call(),
      this.alcxContract.methods.balanceOf(treasuryWallet1Address).call(),
      this.alcxContract.methods.balanceOf(treasuryWallet2Address).call(),
      this.alcxContract.methods.balanceOf(alcxEthSlpAddress).call(),
      this.alcxContract.methods.balanceOf(alchemixStakingAddress).call(),
      this.wethContract.methods.balanceOf(alcxEthSlpAddress).call(),
      this.cvxAlUsd3CrvStakingContract.methods.balanceOf(elixirAddress).call(),
      this.cvxAlEthCrvStakingContract.methods.balanceOf(elixirAlEthAddress).call(),
      this.cvxAlUsd3CrvStakingContract.methods.balanceOf(treasuryWallet1Address).call(),
      this.cvxAlEthCrvStakingContract.methods.balanceOf(treasuryWallet1Address).call(),
      this.alUsd3CrvContract.methods.totalSupply().call(),
      this.alEthCrvContract.methods.totalSupply().call(),
      this.vlCvxTrackerContract.methods.balanceOf(treasuryWallet1Address).call(),
      this.tokeStakingContract.methods.balanceOf(treasuryWallet1Address).call(),
      this.masterChefContract.methods.userInfo('0', treasuryWallet1Address).call(),
      this.alcxEthSlpContract.methods.totalSupply().call(),
      this.alcxEthSlpContract.methods.balanceOf(masterChefAddress).call(),
      this.abraAlcxCauldronContract.methods.userCollateralShare(treasuryWallet1Address).call(),
      this.abraAlcxCauldronContract.methods.userBorrowPart(treasuryWallet1Address).call(),
      this.saddleAlEthContract.methods.balanceOf(alchemixStakingAddress).call(),
      this.saddleAlEthContract.methods.balanceOf(saddleStakingContractAddress).call(),
      this.sdtContract.methods.balanceOf(treasuryWallet1Address).call()
    ])
    .then(([tAlcx, stakedTAlcx, alcx1, alcx2, alcxInSlp, stakedAlcx, wethInSlp, cvxAlUsd3CrvElixir, cvxAlEthCrvElixir, cvxAlUsd3CrvTreasury, cvxAlEthCrvTreasury, alUsd3CrvSupply, alEthCrvSupply, vlCvx, stakedToke, alcxEthSlpOwned, alcxEthSlpTotalSupply, stakedAlcxEth, abraAlcx, abraDebt, stakedSaddleAlEthAlchemix, stakedSaddleAlEthSaddle, sdt]) => {
      treasury.tAlcx = tAlcx/Math.pow(10, 18);
      treasury.alcx = Math.round(alcx1/Math.pow(10, 18) + alcx2/Math.pow(10, 18) + abraAlcx/Math.pow(10, 18));
      treasury.cvxAlUsd3CrvElixir = cvxAlUsd3CrvElixir/Math.pow(10, 18);
      treasury.cvxAlEthCrvElixir = cvxAlEthCrvElixir/Math.pow(10, 18);
      treasury.cvxAlUsd3CrvTreasury = cvxAlUsd3CrvTreasury/Math.pow(10, 18);
      treasury.cvxAlEthCrvTreasury = cvxAlEthCrvTreasury/Math.pow(10, 18);
      treasury.vlCvx = vlCvx/Math.pow(10, 18);
      treasury.stakedToke = stakedToke/Math.pow(10, 18);
      treasury.alcxEthSlpOwned = alcxEthSlpOwned[0]/Math.pow(10, 18);
      treasury.alcxEthSlpOwnedRatio = alcxEthSlpOwned[0]/alcxEthSlpTotalSupply;
      alcxEthSlp.alcx = alcxInSlp/Math.pow(10, 18);
      alcxEthSlp.weth = wethInSlp/Math.pow(10, 18);
      treasury.abraDebt = abraDebt/Math.pow(10, 18);
      treasury.sdt = sdt/Math.pow(10, 18);
      alchemixStaking.alcx = stakedAlcx/Math.pow(10, 18);
      alchemixStaking.tAlcx = stakedTAlcx/Math.pow(10, 18);
      alchemixStaking.alcxEthSlp = stakedAlcxEth/Math.pow(10, 18);
      alchemixStaking.alcxEthSlpStakingRatio = stakedAlcxEth/alcxEthSlpTotalSupply;
      alchemixStaking.saddleAlEth = stakedSaddleAlEthAlchemix/Math.pow(10, 18) + stakedSaddleAlEthSaddle/Math.pow(10, 18);
      alAssetCrvSupply.alUsd3Crv = alUsd3CrvSupply/Math.pow(10, 18);
      alAssetCrvSupply.alEthCrv = alEthCrvSupply/Math.pow(10, 18);
      this.setState({ treasury: treasury, alcxEthSlp: alcxEthSlp, alchemixStaking: alchemixStaking, alAssetCrvSupply: alAssetCrvSupply, treasuryLoading: false })
    });
  }

  calculateVaultTVLs(daiAlchemist, daiTransmuter, EthAlchemist, EthTransmuter, AlchemistV2, AlchemistV2Eth){
    let vaultV1Tvls = { daiTvlDates: [], daiAlchemistTVL: [], daiTransmuterTVL: [], ethTVLDates: [], ethAlchemistTVL: [], ethTransmuterTVL: [] }
    let vaultV2Tvls = { alchemist: { balance_date: [], dai: [], usdc: [], usdt: [] }, alchemistEth: { balance_date: [], eth: [], reth: [], steth: [] } }
      for(let i=0;i<daiAlchemist.length;i++){
        vaultV1Tvls.daiTvlDates[i] = daiAlchemist[i].BALANCE_DATE;
        vaultV1Tvls.daiAlchemistTVL[i] = Math.round(daiAlchemist[i].TOTAL/10000)/100;
      }
      for(let i=0;i<daiTransmuter.length;i++){
        vaultV1Tvls.daiTransmuterTVL[i] = Math.round(daiTransmuter[i].TOTAL/10000)/100;
      }
      for(let i=0;i<EthAlchemist.length;i++){
        vaultV1Tvls.ethTVLDates[i] = EthAlchemist[i].BALANCE_DATE;
        vaultV1Tvls.ethAlchemistTVL[i] = Math.round(EthAlchemist[i].TOTAL);
      }
      for(let i=0;i<EthTransmuter.length;i++){
        vaultV1Tvls.ethTransmuterTVL[i] = Math.round(EthTransmuter[i].TOTAL);
      }
      for(let i=0;i<AlchemistV2.length;i++){
        vaultV2Tvls.alchemist.balance_date[i] = AlchemistV2[i].BALANCE_DATE;
        vaultV2Tvls.alchemist.dai[i] = Math.round(AlchemistV2[i].DAI/10000)/100;
        vaultV2Tvls.alchemist.usdc[i] = Math.round(AlchemistV2[i].USDC/10000)/100;
        vaultV2Tvls.alchemist.usdt[i] = Math.round(AlchemistV2[i].USDT/10000)/100;
      }
      for(let i=0;i<AlchemistV2Eth.length;i++){
        vaultV2Tvls.alchemistEth.balance_date[i] = AlchemistV2Eth[i].BALANCE_DATE;
        vaultV2Tvls.alchemistEth.eth[i] = Math.round(AlchemistV2Eth[i].ETH*100)/100;
        vaultV2Tvls.alchemistEth.reth[i] = Math.round(AlchemistV2Eth[i].RETH*100)/100;
        vaultV2Tvls.alchemistEth.steth[i] = Math.round(AlchemistV2Eth[i].STETH*100)/100;
      }
      this.setState({ vaultV1Tvls: vaultV1Tvls, vaultV2Tvls: vaultV2Tvls, vaultTvlsLoading: false })
  }

  calculateTokenPrices(eth, rEth, wstEth, toke, cvx, sdt){
    let tokenPrices = { eth: [], rEth: [], wstEth: [], toke: [], cvx: [], sdt: [] }
    for(let i=0;i<eth.prices.length;i++){
      tokenPrices.eth[i] = eth.prices[i][1]; 
    }
    for(let i=0;i<rEth.prices.length;i++){
      tokenPrices.rEth[i] = rEth.prices[i][1]; 
    }
    for(let i=0;i<wstEth.prices.length;i++){
      tokenPrices.wstEth[i] = wstEth.prices[i][1]; 
    }
    for(let i=0;i<toke.prices.length;i++){
      tokenPrices.toke[i] = toke.prices[i][1]; 
    }
    for(let i=0;i<cvx.prices.length;i++){
      tokenPrices.cvx[i] = cvx.prices[i][1]; 
    }
    for(let i=0;i<sdt.prices.length;i++){
      tokenPrices.sdt[i] = sdt.prices[i][1]; 
    }
    this.setState({ tokenPrices: tokenPrices, tokenPricesLoading: false });
  }

  calculateAlEthPeg(result){
    let alEthDate = new Date();
    let index = 0;
    let alEthPeg = { date: [], peg: [], pegPerc: [] }
    for(let i=0;i<result.length;i++){
      try {
        let tempDate = new Date(result[i].timestamp*1000);
        if(!datesEqual(tempDate, alEthDate)){
          alEthPeg.date[index] = formatDate(tempDate, 0); 
          alEthPeg.peg[index] = result[i].outputAmount/Math.pow(10, 18)/500;
          alEthPeg.pegPerc[index] = (1-result[i].outputAmount/Math.pow(10, 18)/500)*(-100);
          index++;
          alEthDate = tempDate;
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    this.setState({ alEthPeg: alEthPeg, alEthPegLoading: false });
  }

  calculateAlUsdPeg(daiPeg, usdcPeg, usdtPeg){
    let daiDate = new Date();
    let usdcDate = new Date();
    let usdtDate = new Date();
    let daiIndex = 0;
    let usdcIndex = 0;
    let usdtIndex = 0;
    let alUsdPeg = {dai: { date: [], peg: [], pegPerc: [] }, usdc: { date: [], peg: [], pegPerc: [] }, usdt: { date: [], peg: [], pegPerc: [] }};
    for(let i=0;i<daiPeg.length;i++){
      try {
        let tempDaiDate = new Date(daiPeg[i].timestamp*1000);
        let tempUsdcDate = new Date(usdcPeg[i].timestamp*1000);
        let tempUsdtDate = new Date(usdtPeg[i].timestamp*1000);
        if(!datesEqual(tempDaiDate, daiDate)){
          alUsdPeg.dai.date[daiIndex] = formatDate(tempDaiDate, 0); 
          alUsdPeg.dai.peg[daiIndex] = daiPeg[i].outputAmount/Math.pow(10, 24);
          alUsdPeg.dai.pegPerc[daiIndex] = (1-daiPeg[i].outputAmount/Math.pow(10, 24))*(-100);
          daiIndex++;
          daiDate = tempDaiDate;
        }
        if(!datesEqual(tempUsdcDate, usdcDate)){
          alUsdPeg.usdc.date[usdcIndex] = formatDate(tempUsdcDate, 0); 
          alUsdPeg.usdc.peg[usdcIndex] = usdcPeg[i].outputAmount/Math.pow(10, 12);
          alUsdPeg.usdc.pegPerc[usdcIndex] = (1-usdcPeg[i].outputAmount/Math.pow(10, 12))*(-100);
          usdcIndex++;
          usdcDate = tempUsdcDate;
        }
        if(!datesEqual(tempUsdtDate, usdtDate)){
          alUsdPeg.usdt.date[usdtIndex] = formatDate(tempUsdtDate, 0); 
          alUsdPeg.usdt.peg[usdtIndex] = usdtPeg[i].outputAmount/Math.pow(10, 12);
          alUsdPeg.usdt.pegPerc[usdtIndex] = (1-usdtPeg[i].outputAmount/Math.pow(10, 12))*(-100);
          usdtIndex++;
          usdtDate = tempUsdtDate;
        }
      }
      catch (err) {
        console.log(err)
      }
    }
    this.setState({ alUsdPeg: alUsdPeg, alUsdPegLoading: false });
  }

  calculateHarvests(result){
    let startDate = new Date(1648591199*1000); //March 29th
    let today = new Date();
    let dateTracker = new Date(result[0].timestamp*1000);
    let resultIndex = 0;
    let harvests = { date:[], yvDai: [], yvUsdc: [], yvUsdt: [], yvWeth: [], wstEth: [], rEth: [], };
    let tempYvDai = 0;
    let tempYvUsdc = 0;
    let tempYvUsdt = 0;
    let tempYvWeth = 0;
    let tempWstEth = 0;
    let tempReth = 0;
    for(let j=0;startDate<today;j++){

      for(let i=resultIndex;i<result.length;i++){
        let tempDate = new Date(result[i].timestamp*1000);
        if(tempDate>startDate) break;

        if(!datesEqual(tempDate, dateTracker)) dateTracker = tempDate;

        tempYvDai = result[i].yieldToken === yvDaiAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempYvDai) : tempYvDai;
        tempYvUsdc = result[i].yieldToken === yvUsdcAddress ? (result[i].totalHarvested/Math.pow(10, 6) + tempYvUsdc) : tempYvUsdc;
        tempYvUsdt = result[i].yieldToken === yvUsdtAddress ? (result[i].totalHarvested/Math.pow(10, 6) + tempYvUsdt) : tempYvUsdt;
        tempYvWeth = result[i].yieldToken === yvWethAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempYvWeth) : tempYvWeth;
        tempWstEth = result[i].yieldToken === wstEthAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempWstEth) : tempWstEth;
        tempReth = result[i].yieldToken === rEthAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempReth) : tempReth;
        resultIndex++;
      }
      harvests.yvDai[j] = Math.round(tempYvDai);
      harvests.yvUsdc[j] = Math.round(tempYvUsdc);
      harvests.yvUsdt[j] = Math.round(tempYvUsdt);
      harvests.yvWeth[j] = Math.round(tempYvWeth*1000)/1000;
      harvests.wstEth[j] = Math.round(tempWstEth*1000)/1000;
      harvests.rEth[j] = Math.round(tempReth*1000)/1000;
      harvests.date[j] = formatDate(startDate, 0);
      startDate.setDate(startDate.getDate() + 1);
      tempYvDai = 0;
      tempYvUsdc = 0;
      tempYvUsdt = 0;
      tempYvWeth = 0;
      tempWstEth = 0;
      tempReth = 0;
    }
    this.setState({ harvests: harvests, harvestsLoading: false });
  }

  calculateAlcxArrays(result){
    let burnAmount = 478612;
    let alcxData = { 
      currentSupply: Math.round(result[0].TOTAL-burnAmount), 
      price: Math.round(result[0].PRICE*100)/100, 
      marketcap: Math.round((result[0].TOTAL-burnAmount)*result[0].PRICE/10000)/100 
    }
    this.setState({ 
      alcxData: alcxData,
      alcxDataLoading: false 
    });
  }

  getAlcxData() {
    fetch("https://api.flipsidecrypto.com/api/v2/queries/b678a8e7-ea8b-4080-bb37-00c6ca93c760/data/latest")
      .then(res => res.json())
      .then((result) => { this.calculateAlcxArrays(result) },
        (error) => { console.log(error) })
  }

  getData() {
    fetch("https://api.coingecko.com/api/v3/coins/alchemix-usd/market_chart?vs_currency=usd&days=max&interval=daily")
      .then(res => res.json())
      .then((result) => { this.calculateArrays(result) },
        (error) => { console.log(error) })
  }

  getFlipsideCryptoData(){
    Promise.all([fetch("https://api.flipsidecrypto.com/api/v2/queries/a29262d6-7878-4c8e-8d4e-a62f414c846f/data/latest").then(res => res.json()),
      fetch("https://api.flipsidecrypto.com/api/v2/queries/6a72370b-6c81-4b3f-9691-cfdb0a3118d3/data/latest").then(res => res.json()),
      fetch("https://api.flipsidecrypto.com/api/v2/queries/925c5328-386f-44c1-bfe9-18a796201fff/data/latest").then(res => res.json()),
      fetch("https://api.flipsidecrypto.com/api/v2/queries/c837204d-27a8-4f0d-b0f0-6d340e5de0e8/data/latest").then(res => res.json()),
      fetch("https://api.flipsidecrypto.com/api/v2/queries/6f29b174-9b21-43cf-a359-fd82c22fd22a/data/latest").then(res => res.json()),
      fetch("https://api.flipsidecrypto.com/api/v2/queries/b9235fa9-79a7-454d-a42a-d5d2e294487b/data/latest").then(res => res.json()),
    ])
      .then(([daiAlchemistTvl, daiTransmuterTvl, ethAlchemistTvl, ethTransmuterTvl, v2AlchemistTvl, v2AlchemistEthTvl]) => {
        this.calculateVaultTVLs(daiAlchemistTvl, daiTransmuterTvl, ethAlchemistTvl, ethTransmuterTvl, v2AlchemistTvl, v2AlchemistEthTvl);
    })
  }
  
  getCoinGeckoData(){
    Promise.all([fetch("https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
      fetch("https://api.coingecko.com/api/v3/coins/wrapped-steth/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
      fetch("https://api.coingecko.com/api/v3/coins/rocket-pool-eth/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
      fetch("https://api.coingecko.com/api/v3/coins/tokemak/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
      fetch("https://api.coingecko.com/api/v3/coins/convex-finance/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
      fetch("https://api.coingecko.com/api/v3/coins/stake-dao/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json())
    ])
      .then(([ethPrice, wstEthPrice, rEthPrice, tokePrice, cvxPrice, sdtPrice]) => {
        this.calculateTokenPrices(ethPrice, rEthPrice, wstEthPrice, tokePrice, cvxPrice, sdtPrice);
    })
  }

  getAlUsdPeg(){
    const daiPegQuery = `{
        poolHistoricalRates(
          first: 1000
          where: {inputToken: "0xbc6da0fe9ad5f3b0d58160288917aa56653660e9", outputToken: "0x6b175474e89094c44da98b954eedeac495271d0f", inputAmount: "1000000000000000000000000"}
          orderBy: timestamp
          orderDirection: desc
        ) {
          outputAmount
          timestamp
        }
      }`
    const usdcPegQuery = `{
        poolHistoricalRates(
          first: 1000
          where: {inputToken: "0xbc6da0fe9ad5f3b0d58160288917aa56653660e9", outputToken: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", inputAmount: "1000000000000000000000000"}
          orderBy: timestamp
          orderDirection: desc
        ) {
          outputAmount
          timestamp
        }
      }`
    const usdtPegQuery = `{
        poolHistoricalRates(
          first: 1000
          where: {inputToken: "0xbc6da0fe9ad5f3b0d58160288917aa56653660e9", outputToken: "0xdac17f958d2ee523a2206206994597c13d831ec7", inputAmount: "1000000000000000000000000"}
          orderBy: timestamp
          orderDirection: desc
        ) {
          outputAmount
          timestamp
        }
      }`
    const alEthPegQuery = `{
        poolHistoricalRates(
          first: 900
          where: {inputToken: "0x0100546f2cd4c9d97f798ffc9755e47865ff7ee6", outputToken: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", inputAmount: "500000000000000000000"}
          orderBy: timestamp
          orderDirection: desc
        ) {
          outputAmount
          timestamp
        }
      }`
    const harvestsQuery = `{
      alchemistHarvestEvents(
        first: 1000
        orderBy: timestamp
        orderDirection: desc
        ){
        timestamp,
        yieldToken,
        totalHarvested,
        contract {
          id
        }
      }
    }`
    const daiRequestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: daiPegQuery })
    };
    const usdcRequestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: usdcPegQuery })
    };
    const usdtRequestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: usdtPegQuery })
    };
    const alEthRequestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: alEthPegQuery })
    };
    const harvestsRequestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: harvestsQuery })
    };

    Promise.all([fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", daiRequestOptions).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", usdcRequestOptions).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", usdtRequestOptions).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", alEthRequestOptions).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", harvestsRequestOptions).then(res => res.json())])
      .then(([daiPeg, usdcPeg, usdtPeg, alEthPeg, harvests]) => {
        this.calculateAlUsdPeg(daiPeg.data.poolHistoricalRates.reverse(), usdcPeg.data.poolHistoricalRates.reverse(), usdtPeg.data.poolHistoricalRates.reverse())
        this.calculateAlEthPeg(alEthPeg.data.poolHistoricalRates.reverse())
        this.calculateHarvests(harvests.data.alchemistHarvestEvents.reverse())
    })
  }


  toggleEthCurrency(){
    this.setState({ ethCurrencyToggle: !this.state.ethCurrencyToggle });
  }

  toggleAlUsdPeg(){
    this.setState({ alUsdPegToggle: !this.state.alUsdPegToggle });
  }

  toggleAlEthPeg(){
    this.setState({ alEthPegToggle: !this.state.alEthPegToggle });
  }

  alUsdPegClick(token){
    let alUsdPegActive = { dai: false, usdc: false, usdt: false };
    if(token === "dai") alUsdPegActive.dai = true;
    if(token === "usdc") alUsdPegActive.usdc = true;
    if(token === "usdt") alUsdPegActive.usdt = true;
    this.setState({ alUsdPegActive: alUsdPegActive });
  }

  render() {

  let v1DaiTVL = (this.state.vaultTvlsLoading || this.state.v2CurrentLoading) ? 0 : Math.round((this.state.vaultV1Tvls.daiAlchemistTVL[this.state.vaultV1Tvls.daiAlchemistTVL.length-1]+this.state.vaultV1Tvls.daiTransmuterTVL[this.state.vaultV1Tvls.daiTransmuterTVL.length-1])*100*this.state.tokensPerShare.dai)/100;
  let v1EthTVL = (this.state.vaultTvlsLoading || this.state.v2CurrentLoading) ? 0 : Math.round((this.state.vaultV1Tvls.ethAlchemistTVL[this.state.vaultV1Tvls.ethAlchemistTVL.length-1]+this.state.vaultV1Tvls.ethTransmuterTVL[this.state.vaultV1Tvls.ethTransmuterTVL.length-1])*this.state.tokensPerShare.eth);
  let v1EthUsdTVL = (this.state.vaultTvlsLoading || this.state.tokenPricesLoading) ? 0 : Math.round(v1EthTVL*this.state.tokenPrices.eth[this.state.tokenPrices.eth.length-1]/10000)/100;
  let v2DaiTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.dai*this.state.tokensPerShare.dai*100)/100;
  let v2UsdcTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.usdc*this.state.tokensPerShare.usdc*100)/100;
  let v2UsdtTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.usdt*this.state.tokensPerShare.usdt*100)/100;
  let v2EthTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.eth*this.state.tokensPerShare.eth);
  let v2EthUsdTVL = (this.state.tokenPricesLoading || this.state.v2CurrentLoading) ? 0 : Math.round(v2EthTVL*this.state.tokenPrices.eth[this.state.tokenPrices.eth.length-1]/10000)/100;
  let v2RethTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.rEth*this.state.tokensPerShare.rEth*100)/100;
  let v2RethUsdTVL = (this.state.tokenPricesLoading || this.state.v2CurrentLoading) ? 0 : Math.round(this.state.v2Deposit.rEth*this.state.tokenPrices.rEth[this.state.tokenPrices.rEth.length-1]/10000)/100;
  let v2StethTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.wstEth*this.state.tokensPerShare.wstEth*100)/100;
  let v2StethUsdTVL = (this.state.v2CurrentLoading || this.state.tokenPricesLoading) ? 0 : Math.round(this.state.v2Deposit.wstEth*this.state.tokenPrices.wstEth[this.state.tokenPrices.wstEth.length-1]/10000)/100;
  let treasuryAlcxValue = (this.state.alcxDataLoading || this.state.treasuryLoading) ? 0 : this.state.treasury.alcx*this.state.alcxData.price;
  let treasuryTAlcxValue = (this.state.alcxDataLoading || this.state.treasuryLoading) ? 0 : this.state.treasury.tAlcx*this.state.alcxData.price;
  let treasuryCvxAlEthCrvValue = (this.state.tokenPricesLoading || this.state.treasuryLoading) ? 0 : this.state.treasury.cvxAlEthCrvTreasury*this.state.tokenPrices.eth[this.state.tokenPrices.eth.length-1];
  let elixirCvxAlEthCrvValue = (this.state.tokenPricesLoading || this.state.treasuryLoading) ? 0 : this.state.treasury.cvxAlEthCrvElixir*this.state.tokenPrices.eth[this.state.tokenPrices.eth.length-1];  
  let treasuryTokeValue = (this.state.tokenPricesLoading || this.state.treasuryLoading) ? 0 : this.state.treasury.stakedToke*this.state.tokenPrices.toke[this.state.tokenPrices.toke.length-1];
  let treasuryCvxValue = (this.state.tokenPricesLoading || this.state.treasuryLoading) ? 0 : this.state.treasury.vlCvx*this.state.tokenPrices.cvx[this.state.tokenPrices.cvx.length-1];
  let treasurySlpValue = (this.state.treasuryLoading || this.state.alcxDataLoading || this.state.tokenPricesLoading) ? 0 : (this.state.alcxEthSlp.alcx*this.state.alcxData.price+this.state.alcxEthSlp.weth*this.state.tokenPrices.eth[this.state.tokenPrices.eth.length-1])*this.state.treasury.alcxEthSlpOwnedRatio;
  let treasuryOther = 1000000;
  let stakedAlcxValue = (this.state.treasuryLoading || this.state.alcxDataLoading) ? 0 : this.state.alchemixStaking.alcx*this.state.alcxData.price;
  let stakedTAlcxValue = (this.state.treasuryLoading || this.state.alcxDataLoading) ? 0 : this.state.alchemixStaking.tAlcx*this.state.alcxData.price;
  let stakingSlpValue = (this.state.treasuryLoading || this.state.alcxDataLoading || this.state.tokenPricesLoading) ? 0 : (this.state.alcxEthSlp.alcx*this.state.alcxData.price+this.state.alcxEthSlp.weth*this.state.tokenPrices.eth[this.state.tokenPrices.eth.length-1])*this.state.alchemixStaking.alcxEthSlpStakingRatio;
  let stakingSaddleAlEthValue = (this.state.tokenPricesLoading || this.state.treasuryLoading) ? 0 : this.state.alchemixStaking.saddleAlEth*this.state.tokenPrices.eth[this.state.tokenPrices.eth.length-1];
  let circulatingMarketcap = this.state.alcxDataLoading ? 0 : Math.round(this.state.alcxData.marketcap*100 - treasuryAlcxValue/10000 - treasuryTAlcxValue/10000)/100;
  let alEthCrvTotalValue = (this.state.tokenPricesLoading || this.state.treasuryLoading) ? 0 : this.state.alAssetCrvSupply.alEthCrv * this.state.tokenPrices.eth[this.state.tokenPrices.eth.length-1];
  let sdtValue = (this.state.treasuryLoading || this.state.tokenPricesLoading) ? 0 : this.state.treasury.sdt * this.state.tokenPrices.sdt[this.state.tokenPrices.sdt.length-1];

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
        <span><img src={ require('./logos/alcx_logo.png').default } alt="ALCX" className="image2" />ALCX supply growth compared to today, 1 year from now ({formatDate(new Date(), 1)}): <span className="important">{futureInflation(1).totalInflation}%</span> Forward-looking inflation 1 year from now: <span className="important">{futureInflation(1).forwardInflation}%</span></span>
        <span><img src={ require('./logos/alcx_logo.png').default } alt="ALCX" className="image2" />ALCX supply growth compared to today, 2 years from now ({formatDate(new Date(), 2)}): <span className="important">{futureInflation(2).totalInflation}%</span> Forward-looking inflation 2 years from now: <span className="important">{futureInflation(2).forwardInflation}%</span></span>
        <span><img src={ require('./logos/alcx_logo.png').default } alt="ALCX" className="image2" />ALCX supply growth compared to today, 3 years from now ({formatDate(new Date(), 3)}): <span className="important">{futureInflation(3).totalInflation}%</span> Forward-looking inflation 3 years from now: <span className="important">{futureInflation(3).forwardInflation}%</span></span>
        <br/>
        <span>Official emission schedule: <a target="_blank" rel="noreferrer" href="https://alchemix-finance.gitbook.io/alchemix-finance/token-distribution/alcx-monetary-policy">ALCX Monetary Policy</a></span>
        <br/>
        {this.state.alcxDataLoading ? "Loading..." : 
          <span>
            <img src={ require('./logos/alcx_logo.png').default } alt="ALCX" className="image2" />ALCX price: <span className="important">${this.state.alcxData.price}</span> <img src={ require('./logos/alcx_logo.png').default } alt="ALCX" className="image2" />ALCX supply (incl. treasury assets): <span className="important">{this.state.alcxData.currentSupply}</span> Circulating Marketcap: <span className="important">${circulatingMarketcap}M</span> Total Marketcap: <span className="important">${this.state.alcxData.marketcap}M</span>
          </span>
        }
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
        <EmissionWeights />
        <ChartDonut />
      </div>

      <img src={ require('./logos/safe.png').default } alt="Vault logo" className="image3" />
      <h2>Deposits and Staking</h2>
      <div className="summary">
            In Alchemix V1 only one collateral type is accepted both for alUSD and alETH, DAI and ETH.<br/>
            Both the Alchemist and the Transmuter deploy their DAI and ETH balance into the Yearn DAI and Yearn WETH strategies.<br/>
            Alchemix V2 introduces additional collateral types and yield sources.<br/>
            <span>In V2, the transmuters hold a very little amount of assets and the Elixirs (Alchemix AMOs) own the funds that were previously controlled by the transmuters.<br/>The contents of the Elixirs are shown in the <i>Treasury and AMO</i> section.</span>
            Deposit caps are set for each collateral asset. As long as a user can deposit a certain amount of collateral, they are able to take a max loan of 50% of their deposit.<br/>
            *Please note that for wstETH and rETH the deposit cap is set in ETH, not wstETH and rETH.<br/>
            This is different from V1, where debt caps were set, but no deposit caps, meaning that someone could deposit collateral and not be able to take out a loan on that if the system was already at maximum debt cap.<br/>
            **The Staking table shows assets that are directly incentivized by ALCX emissions. Please note that technically the whole ALCX/ETH SLP and a part of the SaddlealETH pool are not staked in Alchemix contracts, but Sushiswap and Saddle contracts.<br/>
            ***The current data provider provides inconsistent data, as it is unfortunately visible on the charts. Switching to a new data source is in progress.<br/>
            <div className="tvl-tables-2">
              {(this.state.vaultTVLsLoading || this.state.tokenPricesLoading) ? "Loading..." :
              <div className="small-table">
                <h3>V1 Deposits</h3>
                <div className="small-table-inner">
                  <span className="small-table-row"><img src={ require('./logos/dai.png').default } alt="DAI logo" className="image" />yvDAI</span><span className="important-2">${v1DaiTVL}M</span>
                  <span className="small-table-row"><img src={ require('./logos/eth.png').default } alt="ETH logo" className="image" />yvWETH</span><span className="important-2">${v1EthUsdTVL}M&nbsp;<i>({v1EthTVL} ETH)</i></span>
                  <span className="small-table-row"><img src={ require('./logos/dai.png').default } alt="DAI logo" className="image" />+<img src={ require('./logos/eth.png').default } alt="ETH logo" className="image" /></span><span className="important-2">${Math.round((v1DaiTVL + v1EthUsdTVL)*100)/100}M</span>
                </div>
              </div>
              }
              {(this.state.vaultTvlsLoading || this.state.tokenPricesLoading || this.state.v2CurrentLoading) ? "Loading..." :
              <div className="small-table">
                <h3>V2 Deposits and Deposit Caps*</h3>
                <div className="small-table-inner-2">
                  <span className="small-table-row"></span><span className="table-text-bold">TVL</span><span className="table-text-bold">Deposit cap</span>
                  <span className="small-table-row"><img src={ require('./logos/dai.png').default } alt="DAI logo" className="image" />yvDAI</span><span className="important-2">${v2DaiTVL}M</span><span className="table-text-bold">${Math.round(this.state.v2Caps.dai/10000)/100}M</span>
                  <span className="small-table-row"><img src={ require('./logos/usdc.png').default } alt="USDC logo" className="image" />yvUSDC</span><span className="important-2">${v2UsdcTVL}M</span><span className="table-text-bold">${Math.round(this.state.v2Caps.usdc/10000)/100}M</span>
                  <span className="small-table-row"><img src={ require('./logos/usdt.png').default } alt="USDT logo" className="image" />yvUSDT</span><span className="important-2">${v2UsdtTVL}M</span><span className="table-text-bold">${Math.round(this.state.v2Caps.usdt/10000)/100}M</span>

                  <span className="small-table-row"><img src={ require('./logos/eth.png').default } alt="ETH logo" className="image" />yvWETH</span><span className="important-4"><span>${v2EthUsdTVL}M</span><i>({v2EthTVL} ETH)</i></span><span className="table-text-bold">{Math.round(this.state.v2Caps.eth)} ETH</span>
                  <span className="small-table-row"><img src={ require('./logos/steth.png').default } alt="stETH logo" className="image" />wstETH</span><span className="important-4">${v2StethUsdTVL}M&nbsp;<i>({v2StethTVL} ETH)</i></span><span className="table-text-bold">{Math.round(this.state.v2Caps.wstEth)} ETH</span>
                  <span className="small-table-row"><img src={ require('./logos/reth.png').default } alt="rETH logo" className="image" />rETH</span><span className="important-4">${v2RethUsdTVL}M&nbsp;<i>({v2RethTVL} ETH)</i></span><span className="table-text-bold">{Math.round(this.state.v2Caps.rEth)} ETH</span>

                  <span className="small-table-row-2">TOTAL V2</span><span className="important-3">${Math.round((v2DaiTVL + v2UsdcTVL + v2UsdtTVL + v2EthUsdTVL + v2RethUsdTVL + v2StethUsdTVL)*100)/100}M</span>
                </div>
              </div>
              }
              {(this.state.treasuryLoading) ? "Loading..." :
              <div className="small-table">
                <h3>Staking TVL**</h3>
                <div className="small-table-inner-3">
                  <span className="small-table-row"></span><span></span><span className="table-text-bold">Amount</span><span className="table-text-bold">USD value</span>
                  <span className="small-table-row"><img src={ require('./logos/alcx_logo.png').default } alt="ALCX logo" className="image" /></span><span className="table-text-title">ALCX</span><span className="table-text-bold">{Math.round(this.state.alchemixStaking.alcx)}</span><span className="important-2">${Math.round(stakedAlcxValue/10000)/100}M</span>
                  <span className="small-table-row"><img src={ require('./logos/talcx.png').default } alt="tALCX logo" className="image" /></span><span className="table-text-title">tALCX</span><span className="table-text-bold">{Math.round(this.state.alchemixStaking.tAlcx)}</span><span className="important-2">${Math.round(stakedTAlcxValue/10000)/100}M</span>
                  <span className="small-table-row"><img src={ require('./logos/alcx_eth_slp.png').default } alt="ALCX/ETH SLP" className="image" /></span><span className="table-text-title">ALCX/ETH SLP</span><span className="table-text-bold">{Math.round(this.state.alchemixStaking.alcxEthSlp)}</span><span className="important-2">${Math.round(stakingSlpValue/10000)/100}M</span>
                  <span className="small-table-row"><img src={ require('./logos/aleth_saddle.png').default } alt="Saddle alETH" className="image" /></span><span className="table-text-title">Saddle alETH</span><span className="table-text-bold">{Math.round(this.state.alchemixStaking.saddleAlEth)}</span><span className="important-2">${Math.round(stakingSaddleAlEthValue/10000)/100}M</span>
                  <span className="small-table-row-2"></span><span></span><span className="important-3">Total</span><span className="important-3">${Math.round((stakedAlcxValue + stakedTAlcxValue + stakingSlpValue + stakingSaddleAlEthValue)/10000)/100}M</span>
                </div>
              </div>
              }
            </div>
      </div>
      <div className="section-wrapper">
        <div className="chart-title">
          <h3>DAI TVL V1</h3>
          {this.state.vaultTvlsLoading ? "Loading..." :
          <ChartDaiTVL tvlDates={this.state.vaultV1Tvls.daiTvlDates} daiAlchemistTVL={this.state.vaultV1Tvls.daiAlchemistTVL} daiTransmuterTVL={this.state.vaultV1Tvls.daiTransmuterTVL} />
          }
        </div>
        <div className="chart-title">
          <h3>ETH TVL V1</h3>
          <div className="toggle-text">
            $<Switch onChange={this.toggleEthCurrency} checked={this.state.ethCurrencyToggle} />ETH
          </div>
          
          {(this.state.vaultTvlsLoading || this.state.tokenPricesLoading) ? "Loading..." :
          <ChartEthTVL toggle={this.state.ethCurrencyToggle} ethTVLDates={this.state.vaultV1Tvls.ethTVLDates} ethAlchemistTVL={[...this.state.vaultV1Tvls.ethAlchemistTVL]} ethTransmuterTVL={[...this.state.vaultV1Tvls.ethTransmuterTVL]} ethPricesForTVL={this.state.tokenPrices.eth} />
          }
        </div>
      </div>

      <div className="section-wrapper">
        <div className="chart-title">
          <h3>Alchemist V2 Stablecoin TVL***</h3>
          {(this.state.vaultTvlsLoading ) ? "Loading..." :
          <ChartV2AlchemistTVL v2AlchemistTVL={this.state.vaultV2Tvls.alchemist} />
          }
        </div>
        <div className="chart-title">
          <h3>Alchemist V2 Eth TVL***</h3>
          {(this.state.vaultTvlsLoading ) ? "Loading..." :
          <ChartV2AlchemistEthTVL v2AlchemistEthTVL={this.state.vaultV2Tvls.alchemistEth} />
          }
        </div>
      </div>
      <img src={ require('./logos/treasury.png').default } alt="Treasury logo" className="image3" />
      <h2>Treasury and AMO</h2>
      <div className="section-wrapper">
      <div className="summary">
          There are 2 main treasury addresses of the Alchemix protocol, plus 2 addresses for the alUSD and alETH Elixirs.<br/>
          The Elixirs are the AMOs (Algorithmic Market Operator) of Alchemix.<br/>
          The funds in the Elixirs should generally grow, but the protocol can utilize and effectively spend the funds for peg stabilization purposes.<br/>
          Other than the big items listed below, the wallets hold roughly another $1M of various stablecoins and multiple other assets.<br/>
          These are mostly just leftovers, strategically unimportant for the protocol.
          <span>
            <a target="_blank" rel="noreferrer" href="https://zapper.fi/account/0x9e2b6378ee8ad2a4a95fe481d63caba8fb0ebbf9">
              Treasury Wallet 1</a>, <a target="_blank" rel="noreferrer" href="https://zapper.fi/account/0x8392f6669292fa56123f71949b52d883ae57e225">
              Treasury Wallet 2</a>, <a target="_blank" rel="noreferrer" href="https://zapper.fi/account/0x9735f7d3ea56b454b24ffd74c58e9bd85cfad31b">
              alUSD Elixir</a>, <a target="_blank" rel="noreferrer" href="https://zapper.fi/account/0xe761bf731a06fe8259fee05897b2687d56933110">
              alETH Elixir</a><br/>
          </span>
          {this.state.treasuryLoading ? "Loading..." :
          <div className="tvl-tables">
            <div className="small-table">
            <h3>Treasury contents</h3>
              <div className="small-table-inner-3">
                <span className="small-table-row"></span><span></span><span className="table-text-bold">Amount</span><span className="table-text-bold">USD value</span>
                <span className="small-table-row"><img src={ require('./logos/alcx_logo.png').default } alt="ALCX logo" className="image" /></span><span className="table-text-title">ALCX</span><span className="table-text-bold">{Math.round(this.state.treasury.alcx*100)/100}</span><span className="important-2">${Math.round(treasuryAlcxValue/10000)/100}M</span>
                <span className="small-table-row"><img src={ require('./logos/cvx.png').default } alt="CVX logo" className="image" /></span><span className="table-text-title">vlCVX</span><span className="table-text-bold">{Math.round(this.state.treasury.vlCvx)}</span><span className="important-2">${Math.round(treasuryCvxValue/10000)/100}M</span>
                <span className="small-table-row"><img src={ require('./logos/alusd.png').default } alt="alusd3crv logo" className="image" /></span><span className="table-text-title">alUSD3Crv</span><span className="table-text-bold">{Math.round(this.state.treasury.cvxAlUsd3CrvTreasury/10000)/100}M</span><span className="important-2">${Math.round(this.state.treasury.cvxAlUsd3CrvTreasury/10000)/100}M</span>
                <span className="small-table-row"><img src={ require('./logos/talcx.png').default } alt="tALCX logo" className="image" /></span><span className="table-text-title">tALCX</span><span className="table-text-bold">{Math.round(this.state.treasury.tAlcx*100)/100}</span><span className="important-2">${Math.round(treasuryTAlcxValue/10000)/100}M</span>
                <span className="small-table-row"><img src={ require('./logos/tokemak.png').default } alt="TOKE logo" className="image" /></span><span className="table-text-title">TOKE</span><span className="table-text-bold">{Math.round(this.state.treasury.stakedToke)}</span><span className="important-2">${Math.round(treasuryTokeValue/10000)/100}M</span>
                <span className="small-table-row"><img src={ require('./logos/eth_aleth.png').default } alt="alethcurve logo" className="image" /></span><span className="table-text-title">alETHCrv</span><span className="table-text-bold">{Math.round(this.state.treasury.cvxAlEthCrvTreasury*100)/100}</span><span className="important-2">${Math.round(treasuryCvxAlEthCrvValue/10000)/100}M</span>
                <span className="small-table-row"><img src={ require('./logos/alcx_eth_slp.png').default } alt="alcxethslp logo" className="image" /></span><span className="table-text-title">ALCX/ETH SLP</span><span className="table-text-bold">{Math.round(this.state.treasury.alcxEthSlpOwned*100)/100}</span><span className="important-2">${Math.round(treasurySlpValue/10000)/100}M</span>
                <span className="small-table-row"><img src={ require('./logos/stakedao.png').default } alt="sdt logo" className="image" /></span><span className="table-text-title">StakeDAO</span><span className="table-text-bold">{Math.round(this.state.treasury.sdt)}</span><span className="important-2">${Math.round(sdtValue/10000)/100}M</span>
                <span className="small-table-row"><img src={ require('./logos/other_logo.png').default } alt="circle" className="image" /></span><span className="table-text-title">Other</span><span className="table-text-bold"></span><span className="important-2">${Math.round(treasuryOther/1000000)}M</span>
                <span className="small-table-row"><img src={ require('./logos/abra.png').default } alt="abra logo" className="image" /></span><span className="table-text-title">Debt</span><span className="table-text-bold"></span><span className="important-2">-${Math.round(this.state.treasury.abraDebt/10000)/100}M</span>
                <span className="small-table-row-2"></span><span></span><span className="important-3">Total</span><span className="important-3">${Math.round((treasuryAlcxValue+treasuryCvxAlEthCrvValue+treasuryCvxValue+treasuryTAlcxValue+treasuryTokeValue+treasurySlpValue+sdtValue+treasuryOther+this.state.treasury.cvxAlUsd3CrvTreasury-this.state.treasury.abraDebt)/10000)/100}M</span>
                <span className="small-table-row-2"></span><span></span><span className="important-3">-(t)ALCX</span><span className="important-3">${Math.round((treasuryCvxAlEthCrvValue+treasuryCvxValue+treasuryTokeValue+treasurySlpValue+sdtValue+treasuryOther+this.state.treasury.cvxAlUsd3CrvTreasury-this.state.treasury.abraDebt)/10000)/100}M</span>
              </div>
            </div>
            <div className="small-table">
            <h3>Elixir contents</h3>
              <div className="small-table-inner-3">
                <span className="small-table-row"></span><span></span><span className="table-text-bold">Amount</span><span className="table-text-bold">USD value</span>
                <span className="small-table-row"><img src={ require('./logos/alusd.png').default } alt="alusd3crv logo" className="image" /></span><span className="table-text-title">alUSD3Crv</span><span className="table-text-bold">{Math.round(this.state.treasury.cvxAlUsd3CrvElixir/10000)/100}M</span><span className="important-2">${Math.round(this.state.treasury.cvxAlUsd3CrvElixir/10000)/100}M</span>
                <span className="small-table-row"><img src={ require('./logos/eth_aleth.png').default } alt="alethcurve logo" className="image" /></span><span className="table-text-title">alETHCrv</span><span className="table-text-bold">{Math.round(this.state.treasury.cvxAlEthCrvElixir*100)/100}</span><span className="important-2">${Math.round(elixirCvxAlEthCrvValue/10000)/100}M</span>
                <span className="small-table-row-2"></span><span></span><span className="important-3">Total</span><span className="important-3">${Math.round((elixirCvxAlEthCrvValue+this.state.treasury.cvxAlUsd3CrvElixir)/10000)/100}M</span>
              </div>
            </div>
          </div>
          }
        </div>
      </div>
      <div className="section-wrapper">
        <div className="chart-title">
          <h3>Curve Pool Ownership</h3>
          {this.state.treasuryLoading ? "Loading..." :
            <ChartCrvPoolRatios 
              alAssetCrvSupply={this.state.alAssetCrvSupply} 
              alUsd3CrvTreasury={this.state.treasury.cvxAlUsd3CrvTreasury}
              alUsd3CrvElixir={this.state.treasury.cvxAlUsd3CrvElixir}
              alEthCrvTreasury={treasuryCvxAlEthCrvValue}
              alEthCrvElixir={elixirCvxAlEthCrvValue}
              alEthCrvTotalValue={alEthCrvTotalValue}
            />
          }
        </div>
      </div>
      <img src={ require('./logos/alusd.png').default } alt="alUSD logo" className="image3" />
      <h2>alUSD</h2>
      <AlUsdSummary />
      <div className="section-wrapper">
        <div className="chart-title">
          <h3>alUSD Total Supply</h3>
          {this.state.isLoading === true ? "Loading..." :
          <ChartAlusdSupply marketcapDates={this.state.marketcapDates} marketcaps={this.state.marketcaps} />
          }
        </div>
        <div className="chart-title">
          <h3>alUSD Peg</h3>
          <div className="button-container">
            <ButtonGroup size="small">
              <Button variant={this.state.alUsdPegActive.dai ? "contained" : "outlined"} color="inherit" onClick={() => {this.alUsdPegClick("dai")}}>DAI</Button>
              <Button variant={this.state.alUsdPegActive.usdc ? "contained" : "outlined"} color="inherit" onClick={() => {this.alUsdPegClick("usdc")}}>USDC</Button>
              <Button variant={this.state.alUsdPegActive.usdt ? "contained" : "outlined"} color="inherit" onClick={() => {this.alUsdPegClick("usdt")}}>USDT</Button>
            </ButtonGroup>
            <div className="toggle-text">
              $<Switch onChange={this.toggleAlUsdPeg} checked={this.state.alUsdPegToggle} />%
            </div>
          </div>
          
          {this.state.alUsdPegLoading ? "Loading..." :
            <ChartAlusdPrice data={this.state.alUsdPeg} active={this.state.alUsdPegActive} toggle={this.state.alUsdPegToggle} />
          }
        </div>
      </div>

      <img src={ require('./logos/aleth.png').default } alt="alETH logo" className="image3" />
      <h2>alETH</h2>
      <AlEthSummary />
      <div className="section-wrapper">
        <div className="chart-title">
          <h3>alETH Total Supply</h3>
          <ChartAlethSupply />
        </div>
        <div className="chart-title">
          <h3>alETH Peg</h3>
          <div className="toggle-text">
            ETH<Switch onChange={this.toggleAlEthPeg} checked={this.state.alEthPegToggle} />%
          </div>
          {this.state.alEthPegLoading ? "Loading..." :
            <ChartAlEthPrice data={this.state.alEthPeg} toggle={this.state.alEthPegToggle} />
          }
        </div>
      </div>

      <img src={ require('./logos/harvest.png').default } alt="harvest icon" className="image3" />
      <h2>Harvests V2</h2>
      <div className="summary">
        Harvests are denominated in the underlying assets, i.e. DAI, USDC, USDT, ETH, etc. and not the yield token that is harvested.<br/>
        Thus the legends on the charts only show which vault was harvested, but the displayed value is in the underlying asset.
      </div>
      <div className="section-wrapper">
        <div className="chart-title">
          <h3>Stablecoin Harvests</h3>
          {this.state.harvestsLoading ? "Loading..." :
            <ChartHarvestsUsd harvests={this.state.harvests} />
          }
        </div>
        <div className="chart-title">
          <h3>Eth Harvests</h3>
          {this.state.harvestsLoading ? "Loading..." :
            <ChartHarvestsEth harvests={this.state.harvests} />
          }
        </div>
        </div>

      <div className="footer">
        With issues or suggestions about the site, find me in the Alchemix Discord (Barree #2314)
      </div>
    </div>
  );
}
}