import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Web3 from 'web3';
//import ChartQuartiles from './charts/ChartQuartiles';
import Deposits from './Deposits';
import AlAssets from './AlAssets';
import Harvests from './Harvests';
import Emissions from './Emissions';
import Overview from './Overview';
//import Debt from './Debt';
import Revenues from './Revenues';
import Treasury from './Treasury';
import Elixir from './Elixir';
import { Link } from "react-router-dom";
import { formatDate, datesEqual } from './Functions';
import { addresses, abis } from './Constants';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

//const web3 = new Web3('https://eth-mainnet.gateway.pokt.network/v1/5f3453978e354ab992c4da79');
//const web3 = new Web3('https://eth-mainnet.g.alchemy.com/v2/m4nhopYhysiwNnoLZ7vnyxxwjHHtYcKP');
const web3 = new Web3('https://rpc.ankr.com/eth');
const web3ftm = new Web3('https://rpcapi-tracing.fantom.network');
//const web3optimism = new Web3('https://mainnet.optimism.io');
const web3optimism = new Web3('https://opt-mainnet.g.alchemy.com/v2/p9poBr_K0kBvzVt3V6Lo1wasL9r32FpP');
const web3arbitrum = new Web3('https://rpc.ankr.com/arbitrum')

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dates: [],
      prices: [],
      volumes: [],
      alUsdMarketcaps: [],
      alUsdMarketcapDates: [],
      tokenPrices: {},
      alcxData: {},
      alUsdPeg: {},
      alEthPeg: {},
      v2Caps: {},
      v2Deposit: {},
      tokensPerShare: {},
      lps: {},
      alcxEthSlp: {},
      alchemixStaking: {},
      alchemistTvl: {},
      ftmTvl: {},
      optiTvl: {},
      harvests: {},
      alAssetCrvSupply: {},
      debankData: {},
      alAssetSupply: {},
      tokenPricesLoading: true,
      v2CurrentLoading: true,
      stakingLoading: true,
      lpsLoading: true,
      alUsdPegLoading: true,
      alEthPegLoading: true,
      alcxDataLoading: true,
      alchemistTvlLoading: true,
      ftmTvlLoading: true,
      optiTvlLoading: true,
      harvestsLoading: true,
      alUsdLoading: true,
      debankDataLoading: true,
      activeTab: 'treasury'
    };
    this.selectTab = this.selectTab.bind(this);

    this.alchemistContract = new web3.eth.Contract(abis.alchemistAbi, addresses.alchemistV2Address);
    this.alchemistEthContract = new web3.eth.Contract(abis.alchemistAbi, addresses.alchemistEthV2Address);
    this.alchemistFtmContract = new web3ftm.eth.Contract(abis.alchemistAbi, addresses.ftmAlchemistContractAddress);
    this.alchemistOptiContract = new web3optimism.eth.Contract(abis.alchemistAbi, addresses.alchemistOptiAddress);
    this.alchemistEthOptiContract = new web3optimism.eth.Contract(abis.alchemistAbi, addresses.alchemistEthOptiAddress);
    this.cvxAlUsd3CrvStakingContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.cvxAlUsd3CrvStakingContractAddress);
    this.cvxAlEthCrvStakingContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.cvxAlEthCrvStakingContractAddress);
    this.vlCvxTrackerContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.vlCvxTrackerAddress);
    //this.tAlcxContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.tAlcxAddress);
    this.alcxContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alcxAddress);
    this.masterChefContract = new web3.eth.Contract(abis.masterChefAbi, addresses.masterChefAddress);
    this.alcxEthSlpContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alcxEthSlpAddress);
    this.wethContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.wethAddress);
    this.saddleAlEthContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.saddleAlEthContractAddress);
    this.alUsd3CrvContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alUsd3CrvContractAddress);
    this.alUsdContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alUsdAddress);
    this.fraxContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.fraxAddress);
    //this.feiContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.feiAddress);
    //this.lUsdContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.lUsdAddress);
    this.crv3Contract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.crv3Address);
    this.alEthCrvContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alEthCrvContractAddress);
    this.veSdtContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.veSdtContractAddress);
    this.sdCrvContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.sdCrvGaugeContractAddress);
    this.sEthContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.sEthAddress);
    this.alEthContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alEthAddress);
    this.frxEthContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.frxEthAddress);
    this.daiContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.daiAddress);
    this.alUsdOptimismContract = new web3optimism.eth.Contract(abis.erc20LikeAbi, addresses.alUsdOptimismContractAddress);
    this.alEthOptimismContract = new web3optimism.eth.Contract(abis.erc20LikeAbi, addresses.alEthOptimismContractAddress);
    this.usdcOptimismContract = new web3optimism.eth.Contract(abis.erc20LikeAbi, addresses.usdcOptimismContractAddress);
    this.wethOptimismContract = new web3optimism.eth.Contract(abis.erc20LikeAbi, addresses.wethOptimismContractAddress);
    this.maiOptimismContract = new web3optimism.eth.Contract(abis.erc20LikeAbi, addresses.maiOptimismContractAddress);
    this.fraxOptimismContract = new web3optimism.eth.Contract(abis.erc20LikeAbi, addresses.optiFraxAddress);
    this.fxsEthOptimismContract = new web3optimism.eth.Contract(abis.erc20LikeAbi, addresses.optiFxsEthAddress);
    //this.beetsVaultContract = new web3ftm.eth.Contract(abis.beetsVaultAbi, addresses.beetsVaultContractAddress);
    this.saddleFBPContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.saddleFBPContractAddress);
    this.curveFBPContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.curveFBPContractAddress);
    this.alUsdFraxBpContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alUsdFBPCurveContractAddress);
    this.alUsdArbitrumContract = new web3arbitrum.eth.Contract(abis.erc20LikeAbi, addresses.arbiAlUsdContractAddress);
    this.fraxArbitrumContract = new web3arbitrum.eth.Contract(abis.erc20LikeAbi, addresses.arbiFraxContractAddress);
    this.usdsArbitrumContract = new web3arbitrum.eth.Contract(abis.erc20LikeAbi, addresses.arbiUsdsContractAddress);
    this.usxArbitrumContract = new web3arbitrum.eth.Contract(abis.erc20LikeAbi, addresses.arbiUsxContractAddress);
    this.veloStatsContract = new web3optimism.eth.Contract(abis.veloStatsAbi, addresses.veloStats);

  }

  componentDidMount() {
    this.aggregateWeb3Calls();
    this.getTreasury();
    this.getLPs();
    this.getAlUsdPeg();
    this.getCoinGeckoData();
    this.getDebankData();
  }

  selectTab(active){
    this.setState({ activeTab: active });
  }

  calculateAlUsdArrays(result){
    if(result && result.prices.length === result.total_volumes.length && result.prices.length === result.market_caps.length) {
      let dates = [];
      let prices = [];
      let volumes = [];
      let alUsdMarketcaps = [];
      let alUsdMarketcapDates = [];
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
        alUsdMarketcapDates[counter] = formatDate(tempDate, 0);
        alUsdMarketcaps[counter] = Math.round(result.market_caps[i][1]/10000)/100;
        if(result.market_caps[i][1] !== 0) counter++;
      }
      //console.log(result)
      this.setState({ dates: dates, prices: prices, volumes: volumes, alUsdMarketcaps: alUsdMarketcaps, alUsdMarketcapDates: alUsdMarketcapDates, alUsdLoading: false });
    }
  } 

  aggregateWeb3Calls(){
    let v2Caps = {}
    let tokensPerShare = { dai: 0, usdc: 0, usdt: 0, eth: 0, wstEth: 0, rEth: 0, aDai: 0, aUsdc: 0, aUsdt: 0, aWeth: 0, vaUsdc: 0, vaDai: 0, vaEth: 0 }
    let deposit = { dai: 0, usdc: 0, usdt: 0, eth: 0, wstEth: 0, rEth: 0, aDai: 0, aUsdc: 0, aUsdt: 0, aWeth: 0, vaUsdc: 0, vaDai: 0, vaEth: 0, daiInMigrate: 0, wethInMigrate: 0 }
    let alAssetSupply = {alEth: 0, alUsd: 0}

    Promise.all([this.alchemistContract.methods.getYieldTokenParameters(addresses.yvDaiAddress).call(),
      this.alchemistContract.methods.getYieldTokenParameters(addresses.yvUsdcAddress).call(),
      this.alchemistContract.methods.getYieldTokenParameters(addresses.yvUsdtAddress).call(),
      this.alchemistContract.methods.getYieldTokenParameters(addresses.vaUsdcAddress).call(),
      this.alchemistContract.methods.getYieldTokenParameters(addresses.vaDaiAddress).call(),
      this.alchemistContract.methods.getYieldTokenParameters(addresses.vaFraxAddress).call(),
      this.alchemistContract.methods.getUnderlyingTokensPerShare(addresses.yvDaiAddress).call(),
      this.alchemistContract.methods.getUnderlyingTokensPerShare(addresses.yvUsdcAddress).call(),
      this.alchemistContract.methods.getUnderlyingTokensPerShare(addresses.yvUsdtAddress).call(),
      this.alchemistContract.methods.getUnderlyingTokensPerShare(addresses.vaUsdcAddress).call(),
      this.alchemistContract.methods.getUnderlyingTokensPerShare(addresses.vaDaiAddress).call(),
      this.alchemistContract.methods.getUnderlyingTokensPerShare(addresses.vaFraxAddress).call(),
      this.alchemistEthContract.methods.getYieldTokenParameters(addresses.yvWethAddress).call(),
      this.alchemistEthContract.methods.getUnderlyingTokensPerShare(addresses.yvWethAddress).call(),
      this.alchemistEthContract.methods.getYieldTokenParameters(addresses.vaEthAddress).call(),
      this.alchemistEthContract.methods.getUnderlyingTokensPerShare(addresses.vaEthAddress).call(),
      this.alchemistEthContract.methods.getYieldTokenParameters(addresses.wstEthAddress).call(),
      this.alchemistEthContract.methods.getUnderlyingTokensPerShare(addresses.wstEthAddress).call(),
      this.alchemistEthContract.methods.getYieldTokenParameters(addresses.rEthAddress).call(),
      this.alchemistEthContract.methods.getUnderlyingTokensPerShare(addresses.rEthAddress).call(),
      this.alchemistEthContract.methods.getYieldTokenParameters(addresses.sfrxEthAddress).call(),
      this.alchemistEthContract.methods.getUnderlyingTokensPerShare(addresses.sfrxEthAddress).call(),
      this.alchemistFtmContract.methods.getYieldTokenParameters(addresses.ftmYvDaiAddress).call(),
      this.alchemistFtmContract.methods.getYieldTokenParameters(addresses.ftmYvUsdcAddress).call(),
      this.alchemistFtmContract.methods.getYieldTokenParameters(addresses.ftmYvUsdtAddress).call(),
      this.alchemistContract.methods.getYieldTokenParameters(addresses.aDaiAddress).call(),
      this.alchemistContract.methods.getYieldTokenParameters(addresses.aUsdcAddress).call(),
      this.alchemistContract.methods.getYieldTokenParameters(addresses.aUsdtAddress).call(),
      this.alchemistContract.methods.getYieldTokenParameters(addresses.aFraxAddress).call(),
      this.alchemistEthContract.methods.getYieldTokenParameters(addresses.aWethAddress).call(),
      this.alchemistContract.methods.getUnderlyingTokensPerShare(addresses.aDaiAddress).call(),
      this.alchemistContract.methods.getUnderlyingTokensPerShare(addresses.aUsdcAddress).call(),
      this.alchemistContract.methods.getUnderlyingTokensPerShare(addresses.aUsdtAddress).call(),
      this.alchemistContract.methods.getUnderlyingTokensPerShare(addresses.aFraxAddress).call(),
      this.alchemistEthContract.methods.getUnderlyingTokensPerShare(addresses.aWethAddress).call(),
      this.alchemistOptiContract.methods.getYieldTokenParameters(addresses.optiADaiAddress).call(),
      this.alchemistOptiContract.methods.getYieldTokenParameters(addresses.optiAUsdcAddress).call(),
      this.alchemistOptiContract.methods.getYieldTokenParameters(addresses.optiAUsdtAddress).call(),
      this.alchemistEthOptiContract.methods.getYieldTokenParameters(addresses.optiAWethAddress).call(),
      this.wethContract.methods.balanceOf(addresses.tempMigrateEthAddress).call(),
      this.daiContract.methods.balanceOf(addresses.tempMigrateDaiAddress).call(),
      this.alEthContract.methods.totalSupply().call(),
      this.alUsdContract.methods.totalSupply().call()
      //this.alchemistEthOptiContract.methods.getUnderlyingTokensPerShare(addresses.optiAWethAddress).call()
    ])
      .then(([daiParams, usdcParams, usdtParams, vaUsdcParams, vaDaiParams, vaFraxParams, daiTokens, usdcTokens, usdtTokens, vaUsdcTokens, vaDaiTokens, vaFraxTokens, ethParams, ethTokens, vaEthParams, vaEthTokens, wstEthParams, wstEthTokens, rEthParams, rEthTokens, sfrxEthParams, sfrxEthTokens, ftmDaiParams, ftmUsdcParams, ftmUsdtParams, aDaiParams, aUsdcParams, aUsdtParams, aFraxParams, aWethParams, aDaiTokens, aUsdcTokens, aUsdtTokens, aFraxTokens, aWethTokens, optiADaiParams, optiAUsdcParams, optiAUsdtParams, optiAWethParams, wethInMigrate, daiInMigrate, alEthSupply, alUsdSupply]) => {
        v2Caps.dai = daiParams[4]/Math.pow(10, daiParams[0]);
        v2Caps.ftmDai = ftmDaiParams[4]/Math.pow(10, ftmDaiParams[0]);
        v2Caps.optiADai = optiADaiParams[4]/Math.pow(10, optiADaiParams[0]);
        v2Caps.usdc = usdcParams[4]/Math.pow(10, usdcParams[0]);
        v2Caps.ftmUsdc = ftmUsdcParams[4]/Math.pow(10, ftmUsdcParams[0]);
        v2Caps.optiAUsdc = optiAUsdcParams[4]/Math.pow(10, optiAUsdcParams[0]);
        v2Caps.usdt = usdtParams[4]/Math.pow(10, usdtParams[0]);
        v2Caps.ftmUsdt = ftmUsdtParams[4]/Math.pow(10, ftmUsdtParams[0]);
        v2Caps.optiAUsdt = optiAUsdtParams[4]/Math.pow(10, optiAUsdtParams[0]);
        v2Caps.eth = ethParams[4]/Math.pow(10, ethParams[0]);
        v2Caps.wstEth = wstEthParams[4]/Math.pow(10, wstEthParams[0]);
        v2Caps.rEth = rEthParams[4]/Math.pow(10, rEthParams[0]);
        v2Caps.sfrxEth = sfrxEthParams[4]/Math.pow(10, sfrxEthParams[0]);
        v2Caps.aDai = aDaiParams[4]/Math.pow(10, aDaiParams[0]);
        v2Caps.aUsdc = aUsdcParams[4]/Math.pow(10, aUsdcParams[0]);
        v2Caps.aUsdt = aUsdtParams[4]/Math.pow(10, aUsdtParams[0]);
        v2Caps.aFrax = aFraxParams[4]/Math.pow(10, aFraxParams[0]);
        v2Caps.aWeth = aWethParams[4]/Math.pow(10, aWethParams[0]);
        v2Caps.optiAWeth = optiAWethParams[4]/Math.pow(10, optiAWethParams[0]);
        v2Caps.vaUsdc = vaUsdcParams[4]/Math.pow(10, 6);
        v2Caps.vaDai = vaDaiParams[4]/Math.pow(10, vaDaiParams[0]);
        v2Caps.vaFrax = vaFraxParams[4]/Math.pow(10, vaFraxParams[0]);
        v2Caps.vaEth = vaEthParams[4]/Math.pow(10, vaEthParams[0]);
        tokensPerShare.dai = daiTokens/Math.pow(10, 18);
        tokensPerShare.usdc = usdcTokens/Math.pow(10, 6);
        tokensPerShare.usdt = usdtTokens/Math.pow(10, 6);
        tokensPerShare.eth = ethTokens/Math.pow(10, 18);
        tokensPerShare.wstEth = wstEthTokens/Math.pow(10, 18);
        tokensPerShare.rEth = rEthTokens/Math.pow(10, 18);
        tokensPerShare.sfrxEth = sfrxEthTokens/Math.pow(10, 18);
        tokensPerShare.aDai = aDaiTokens/Math.pow(10, 18);
        tokensPerShare.aUsdc = aUsdcTokens/Math.pow(10, 6);
        tokensPerShare.aUsdt = aUsdtTokens/Math.pow(10, 6);
        tokensPerShare.aFrax = aFraxTokens/Math.pow(10, 18);
        tokensPerShare.aWeth = aWethTokens/Math.pow(10, 18);
        //tokensPerShare.optiAWeth = optiAWethTokens/Math.pow(10, 18);
        tokensPerShare.vaDai = vaDaiTokens/Math.pow(10, 18);
        tokensPerShare.vaUsdc = vaUsdcTokens/Math.pow(10, 6);
        tokensPerShare.vaFrax = vaFraxTokens/Math.pow(10, 18);
        tokensPerShare.vaEth = vaEthTokens/Math.pow(10, 18);
        deposit.dai = daiParams[8]/Math.pow(10, 24);
        deposit.usdc = usdcParams[8]/Math.pow(10, 12);
        deposit.usdt = usdtParams[8]/Math.pow(10, 12);
        deposit.eth = ethParams[8]/Math.pow(10, 18);
        deposit.wstEth = wstEthParams[8]/Math.pow(10, 18);
        deposit.rEth = rEthParams[8]/Math.pow(10, 18);
        deposit.sfrxEth = sfrxEthParams[8]/Math.pow(10, 18);
        deposit.aDai = aDaiParams[8]/Math.pow(10, 24);
        deposit.aUsdc = aUsdcParams[8]/Math.pow(10, 12);
        deposit.aUsdt = aUsdtParams[8]/Math.pow(10, 12);
        deposit.aFrax = aFraxParams[8]/Math.pow(10, 24);
        deposit.aWeth = aWethParams[8]/Math.pow(10, 18);
        deposit.vaUsdc = vaUsdcParams[8]/Math.pow(10, 24);
        deposit.vaDai = vaDaiParams[8]/Math.pow(10, 12);
        deposit.vaFrax = vaFraxParams[8]/Math.pow(10, 24);
        deposit.vaEth = vaEthParams[8]/Math.pow(10, 18);
        deposit.daiInMigrate = daiInMigrate/Math.pow(10, 24);
        deposit.wethInMigrate = wethInMigrate/Math.pow(10, 18);
        alAssetSupply.alEth = alEthSupply/Math.pow(10, 18);
        alAssetSupply.alUsd = alUsdSupply/Math.pow(10, 18);
        this.setState({ v2Caps: v2Caps, tokensPerShare: tokensPerShare, v2Deposit: deposit, alAssetSupply: alAssetSupply, v2CurrentLoading: false });
    })
    .catch(function(err) {
      console.log(err.message);
    });
  }

  getTreasury(){
    let alcxEthSlp = { alcx: 0, weth: 0 }
    let alchemixStaking = { alcx: 0, alcxEthSlp: 0, alcxEthSlpStakingRatio: 0 }
    let alAssetCrvSupply = { alUsd3Crv: 0, alEthCrv: 0, alUsdFraxBp: 0 };
    Promise.all([
      this.alcxContract.methods.balanceOf(addresses.alcxEthSlpAddress).call(),
      this.alcxContract.methods.balanceOf(addresses.alchemixStakingAddress).call(),
      this.wethContract.methods.balanceOf(addresses.alcxEthSlpAddress).call(),
      this.alUsd3CrvContract.methods.totalSupply().call(),
      this.alEthCrvContract.methods.totalSupply().call(),
      this.alUsdFraxBpContract.methods.totalSupply().call(),
      this.alcxEthSlpContract.methods.totalSupply().call(),
      this.alcxEthSlpContract.methods.balanceOf(addresses.masterChefAddress).call(),
    ])
    .then(([alcxInSlp, stakedAlcx, wethInSlp, alUsd3CrvSupply, alEthCrvSupply, alUsdFraxBpCrvSupply, alcxEthSlpTotalSupply, stakedAlcxEth]) => {
      alcxEthSlp.alcx = alcxInSlp/Math.pow(10, 18);
      alcxEthSlp.weth = wethInSlp/Math.pow(10, 18);
      alchemixStaking.alcx = stakedAlcx/Math.pow(10, 18);
      alchemixStaking.alcxEthSlp = stakedAlcxEth/Math.pow(10, 18);
      alchemixStaking.alcxEthSlpStakingRatio = stakedAlcxEth/alcxEthSlpTotalSupply;
      alAssetCrvSupply.alUsd3Crv = alUsd3CrvSupply/Math.pow(10, 18);
      alAssetCrvSupply.alEthCrv = alEthCrvSupply/Math.pow(10, 18);
      alAssetCrvSupply.alUsdFraxBp = alUsdFraxBpCrvSupply/Math.pow(10, 18);
      this.setState({ alcxEthSlp: alcxEthSlp, alchemixStaking: alchemixStaking, alAssetCrvSupply: alAssetCrvSupply, stakingLoading: false })
    })
    .catch(function(err) {
      console.log(err.message);
    });
  }

  getLPs(){
    let alUsdUsdc = "sAMMV2-USDC/alUSD";
    let ethPool = "sAMMV2-alETH/WETH";
    let maiAlUsd = "sAMMV2-alUSD/MAI";
    let frxEth = "sAMMV2-alETH/frxETH";
    let fraxUsd = "sAMMV2-FRAX/alUSD";
    let lps = { alUsdIn3Crv: 0, crv3In3Crv: 0, alEthInCrv: 0, ethInAlEthCrv: 0, alUsdInVelodrome: 0, usdcInVelodrome: 0, alUsdInMaiVelodrome: 0, maiInMaiVelodrome: 0, alEthInVelodrome: 0, wethInVelodrome: 0, alUsdInCurveFBP: 0, fbpInCurveFBP: 0, alEthInVeloFxsEthAlEth: 0, fxsEthInVeloFxsEthAlEth: 0, fraxInVeloFraxAlUsd: 0, alUsdInVeloFraxAlUsd: 0, alUsdInL2d4: 0, fraxInL2d4: 0, usxInL2d4: 0, usdsInL2d4: 0, alEthInFrxEthCrv: 0, frxEthInFrxEthCrv: 0 }
    Promise.all([this.alUsdContract.methods.balanceOf(addresses.alUsd3CrvContractAddress).call(),
      this.crv3Contract.methods.balanceOf(addresses.alUsd3CrvContractAddress).call(),
      this.alEthContract.methods.balanceOf(addresses.alEthCrvContractAddress).call(),
      this.alEthContract.methods.balanceOf(addresses.saddleAlEthPoolContractAddress).call(),
      web3.eth.getBalance(addresses.alEthCrvContractAddress),
      this.wethContract.methods.balanceOf(addresses.saddleAlEthPoolContractAddress).call(),
      this.sEthContract.methods.balanceOf(addresses.saddleAlEthPoolContractAddress).call(),
      this.alEthContract.methods.balanceOf(addresses.frxEthAlEthContractAddress).call(),
      this.frxEthContract.methods.balanceOf(addresses.frxEthAlEthContractAddress).call(),
      this.alUsdContract.methods.balanceOf(addresses.alUsdFBPCurveContractAddress).call(),
      this.curveFBPContract.methods.balanceOf(addresses.alUsdFBPCurveContractAddress).call(),
      //this.alEthContract.methods.balanceOf(addresses.pcsAlEthAddress).call(),
      //this.wethContract.methods.balanceOf(addresses.pcsAlEthAddress).call(),
      this.alUsdArbitrumContract.methods.balanceOf(addresses.l2d4Address).call(),
      this.fraxArbitrumContract.methods.balanceOf(addresses.l2d4Address).call(),
      this.usxArbitrumContract.methods.balanceOf(addresses.l2d4Address).call(),
      this.usdsArbitrumContract.methods.balanceOf(addresses.l2d4Address).call(),
      this.veloStatsContract.methods.all(1000,0,"0x0000000000000000000000000000000000000000").call()
    ])
    .then(([alUsdIn3Crv, crv3In3Crv, alEthInCrv, alEthInSaddle, ethInAlEthCrv, wethInSaddle, sEthInSaddle, alEthInFrxEthCrv, frxEthInFrxEthCrv, alUsdInCurveFBP, fbpInCurveFBP, alUsdInL2d4, fraxInL2d4, usxInL2d4, usdsInL2d4, veloStats]) => {
      lps.alUsdIn3Crv = alUsdIn3Crv/Math.pow(10, 18);
      lps.crv3In3Crv = crv3In3Crv/Math.pow(10, 18);
      lps.alEthInCrv = alEthInCrv/Math.pow(10, 18);
      lps.alEthInSaddle = alEthInSaddle/Math.pow(10, 18);
      lps.ethInAlEthCrv = ethInAlEthCrv/Math.pow(10, 18);
      lps.wethInSaddle = wethInSaddle/Math.pow(10, 18);
      lps.sEthInSaddle = sEthInSaddle/Math.pow(10, 18);
      lps.alEthInFrxEthCrv = alEthInFrxEthCrv/Math.pow(10, 18);
      lps.frxEthInFrxEthCrv = frxEthInFrxEthCrv/Math.pow(10, 18);
      lps.alUsdInCurveFBP = alUsdInCurveFBP/Math.pow(10, 18);
      lps.fbpInCurveFBP = fbpInCurveFBP/Math.pow(10, 18);
      //lps.alEthInPcs = alEthInPcs/Math.pow(10, 18);
      //lps.ethInPcs = ethInPcs/Math.pow(10, 18);
      lps.alUsdInL2d4 = alUsdInL2d4/Math.pow(10, 18);
      lps.fraxInL2d4 = fraxInL2d4/Math.pow(10, 18);
      lps.usxInL2d4 = usxInL2d4/Math.pow(10, 18);
      lps.usdsInL2d4 = usdsInL2d4/Math.pow(10, 18);
      for(let i=0;i<veloStats.length;i++){
        if(veloStats[i][1] === alUsdUsdc) {
          lps.alUsdInVelodrome = parseInt(veloStats[i][9]) / Math.pow(10,18);
          lps.usdcInVelodrome = parseInt(veloStats[i][6]) / Math.pow(10,6);
        }
        if(veloStats[i][1] === ethPool) {
          lps.alEthInVelodrome = parseInt(veloStats[i][6]) / Math.pow(10,18);
          lps.wethInVelodrome = parseInt(veloStats[i][9]) / Math.pow(10,18);
        }
        if(veloStats[i][1] === maiAlUsd) {
          lps.alUsdInMaiVelodrome = parseInt(veloStats[i][6]) / Math.pow(10,18);
          lps.maiInMaiVelodrome = parseInt(veloStats[i][9]) / Math.pow(10,18);
        }
        if(veloStats[i][1] === frxEth) {
          lps.alEthInVeloFxsEthAlEth = parseInt(veloStats[i][6]) / Math.pow(10,18);
          lps.fxsEthInVeloFxsEthAlEth = parseInt(veloStats[i][9]) / Math.pow(10,18);
        }
        if(veloStats[i][1] === fraxUsd) {
          lps.fraxInVeloFraxAlUsd = parseInt(veloStats[i][6]) / Math.pow(10,18);
          lps.alUsdInVeloFraxAlUsd = parseInt(veloStats[i][9]) / Math.pow(10,18);
        }
      }
      this.setState({ lps: lps, lpsLoading: false })
    })
    .catch(function(err) {
      console.log(err.message);
    });
  }

  calculateTokenPrices(eth, rEth, wstEth, sfrxEth, cvx, sdt, crv){
    let tokenPrices = { eth: [], rEth: [], wstEth: [], sfrxEth: [], cvx: [], sdt: [], crv: [] }
    for(let i=0;i<eth.prices.length;i++){
      tokenPrices.eth[i] = eth.prices[i][1]; 
    }
    for(let i=0;i<rEth.prices.length;i++){
      tokenPrices.rEth[i] = rEth.prices[i][1]; 
    }
    for(let i=0;i<wstEth.prices.length;i++){
      tokenPrices.wstEth[i] = wstEth.prices[i][1]; 
    }
    for(let i=0;i<sfrxEth.prices.length;i++){
      tokenPrices.sfrxEth[i] = sfrxEth.prices[i][1]; 
    }
    for(let i=0;i<cvx.prices.length;i++){
      tokenPrices.cvx[i] = cvx.prices[i][1]; 
    }
    for(let i=0;i<sdt.prices.length;i++){
      tokenPrices.sdt[i] = sdt.prices[i][1]; 
    }
    for(let i=0;i<crv.prices.length;i++){
      tokenPrices.crv[i] = crv.prices[i][1]; 
    }
    this.setState({ tokenPrices: tokenPrices, tokenPricesLoading: false });
  }

  calculateAlEthPeg(result, result5k){
    let alEthPeg = { date: [], peg: [], pegPerc: [], peg5k: [], peg5kPerc: [] }
    for(let i=0;i<result.length;i++){
      try {
        //alEthPeg.date[index] = formatDate(tempDate, 0);
        alEthPeg.date[i] = Number(result[i].timestamp*1000); 
        alEthPeg.peg[i] = result[i].outputAmount/Math.pow(10, 18)/500;
        alEthPeg.pegPerc[i] = (1-result[i].outputAmount/Math.pow(10, 18)/500)*(-100);
        if(result.length === result5k.length){
          alEthPeg.peg5k[i] = result5k[i].outputAmount/Math.pow(10, 19)/500;
          alEthPeg.peg5kPerc[i] = (1-result5k[i].outputAmount/Math.pow(10, 19)/500)*(-100);
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    this.setState({ alEthPeg: alEthPeg, alEthPegLoading: false });
  }

  calculateAlUsdPeg(daiPeg, usdcPeg, usdtPeg, dai10mPeg, usdc10mPeg, usdt10mPeg){
    let daiIndex = 0;
    let usdcIndex = 0;
    let usdtIndex = 0;
    let alUsdPeg = {dai: { date: [], peg: [], pegPerc: [], peg10m: [], peg10mPerc: [] }, usdc: { date: [], peg: [], pegPerc: [], peg10m: [], peg10mPerc: [] }, usdt: { date: [], peg: [], pegPerc: [], peg10m: [], peg10mPerc: [] }};
    for(let i=0;i<daiPeg.length;i++){
      try {
          alUsdPeg.dai.date[daiIndex] = Number(daiPeg[i].timestamp*1000);
          alUsdPeg.dai.peg[daiIndex] = daiPeg[i].outputAmount/Math.pow(10, 24);
          alUsdPeg.dai.pegPerc[daiIndex] = (1-daiPeg[i].outputAmount/Math.pow(10, 24))*(-100);
          if(daiPeg.length === dai10mPeg.length){
            alUsdPeg.dai.peg10m[daiIndex] = dai10mPeg[i].outputAmount/Math.pow(10, 25);
            alUsdPeg.dai.peg10mPerc[daiIndex] = (1-dai10mPeg[i].outputAmount/Math.pow(10, 25))*(-100);
          }
          daiIndex++;

          alUsdPeg.usdc.date[usdcIndex] = Number(usdcPeg[i].timestamp*1000);
          alUsdPeg.usdc.peg[usdcIndex] = usdcPeg[i].outputAmount/Math.pow(10, 12);
          alUsdPeg.usdc.pegPerc[usdcIndex] = (1-usdcPeg[i].outputAmount/Math.pow(10, 12))*(-100);
          if(usdcPeg.length === usdc10mPeg.length){
            alUsdPeg.usdc.peg10m[usdcIndex] = usdc10mPeg[i].outputAmount/Math.pow(10, 13);
            alUsdPeg.usdc.peg10mPerc[usdcIndex] = (1-usdc10mPeg[i].outputAmount/Math.pow(10, 13))*(-100);
          }
          usdcIndex++;

          alUsdPeg.usdt.date[usdtIndex] = Number(usdtPeg[i].timestamp*1000);
          alUsdPeg.usdt.peg[usdtIndex] = usdtPeg[i].outputAmount/Math.pow(10, 12);
          alUsdPeg.usdt.pegPerc[usdtIndex] = (1-usdtPeg[i].outputAmount/Math.pow(10, 12))*(-100);
          if(usdtPeg.length === usdt10mPeg.length){
            alUsdPeg.usdt.peg10m[usdtIndex] = usdt10mPeg[i].outputAmount/Math.pow(10, 13);
            alUsdPeg.usdt.peg10mPerc[usdtIndex] = (1-usdt10mPeg[i].outputAmount/Math.pow(10, 13))*(-100);
          }
          usdtIndex++;
      }
      catch (err) {
        console.log(err)
      }
    }
    this.setState({ alUsdPeg: alUsdPeg, alUsdPegLoading: false });
  }

  calculateFtmTvl(result){
    //console.log(result)
    let startDate = new Date(1651701610*1000); //May 5th
    let today = new Date();
    let dateTracker = new Date(result[0].timestamp*1000);
    let resultIndex = 0;
    let ftmTvl = { date:[], yvDai: [], yvUsdc: [], yvUsdt: [] };
    let tempYvDai = 0;
    let tempYvUsdc = 0;
    let tempYvUsdt = 0;
    for(let j=0;startDate<today;j++){

      for(let i=resultIndex;i<result.length;i++){
        let tempDate = new Date(result[i].timestamp*1000);
        if(tempDate>startDate) break;

        if(!datesEqual(tempDate, dateTracker)) dateTracker = tempDate;

        tempYvDai = result[i].token.symbol === "yvDAI" && result[i].amount ? result[i].amount/Math.pow(10, 18) : tempYvDai;
        tempYvUsdc = result[i].token.symbol === "yvUSDC" && result[i].amount ? result[i].amount/Math.pow(10, 6) : tempYvUsdc;
        tempYvUsdt = result[i].token.symbol === "yvUSDT" && result[i].amount ? result[i].amount/Math.pow(10, 6) : tempYvUsdt;
        resultIndex++;
      }
      ftmTvl.yvDai[j] = Math.round(tempYvDai/10000)/100;
      if(j>0 && !tempYvDai) ftmTvl.yvDai[j] = ftmTvl.yvDai[j-1];
      ftmTvl.yvUsdc[j] = Math.round(tempYvUsdc/10000)/100;
      if(j>0 && !tempYvUsdc) ftmTvl.yvUsdc[j] = ftmTvl.yvUsdc[j-1];
      ftmTvl.yvUsdt[j] = Math.round(tempYvUsdt/10000)/100;
      if(j>0 && !tempYvUsdt) ftmTvl.yvUsdt[j] = ftmTvl.yvUsdt[j-1];
      ftmTvl.date[j] = formatDate(startDate, 0);
      startDate.setDate(startDate.getDate() + 1);
      tempYvDai = 0;
      tempYvUsdc = 0;
      tempYvUsdt = 0;
    }
    this.setState({ ftmTvl: ftmTvl, ftmTvlLoading: false });
  }

  calculateOptiTvl(result){
    //console.log(result)
    let startDate = new Date(1664365762*1000); //Sept 28th
    let today = new Date();
    let dateTracker = new Date(result[0].timestamp*1000);
    let resultIndex = 0;
    let optiTvl = { date:[], aDai: [], aUsdc: [], aUsdt: [], aWeth: [] };
    let tempaDai = 0;
    let tempaUsdc = 0;
    let tempaUsdt = 0;
    let tempaWeth = 0;
    for(let j=0;startDate<today;j++){

      for(let i=resultIndex;i<result.length;i++){
        let tempDate = new Date(result[i].timestamp*1000);
        if(tempDate>startDate) break;

        if(!datesEqual(tempDate, dateTracker)) dateTracker = tempDate;

        tempaDai = result[i].token.symbol === "s_aOptDAI" && result[i].amount ? result[i].amount/Math.pow(10, 18) : tempaDai;
        tempaUsdc = result[i].token.symbol === "s_aOptUSDC" && result[i].amount ? result[i].amount/Math.pow(10, 6) : tempaUsdc;
        tempaUsdt = result[i].token.symbol === "s_aOptUSDT" && result[i].amount ? result[i].amount/Math.pow(10, 6) : tempaUsdt;
        tempaWeth = result[i].token.symbol === "s_aOptWETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempaWeth;
        resultIndex++;
      }
      optiTvl.aDai[j] = Math.round(tempaDai/10000)/100;
      if(j>0 && !tempaDai) optiTvl.aDai[j] = optiTvl.aDai[j-1];
      optiTvl.aUsdc[j] = Math.round(tempaUsdc/10000)/100;
      if(j>0 && !tempaUsdc) optiTvl.aUsdc[j] = optiTvl.aUsdc[j-1];
      optiTvl.aUsdt[j] = Math.round(tempaUsdt/10000)/100;
      if(j>0 && !tempaUsdt) optiTvl.aUsdt[j] = optiTvl.aUsdt[j-1];
      optiTvl.aWeth[j] = Math.round(tempaWeth/10000)/100;
      if(j>0 && !tempaWeth) optiTvl.aWeth[j] = optiTvl.aWeth[j-1];
      optiTvl.date[j] = formatDate(startDate, 0);
      startDate.setDate(startDate.getDate() + 1);
      /*tempaDai = 0;
      tempaUsdc = 0;
      tempaUsdt = 0;*/
    }
    this.setState({ optiTvl: optiTvl, optiTvlLoading: false });
  }

  calculateAlchemistTvl(result){
    //console.log(result)
    let startDate = new Date(1647385201*1000); //March 16th
    let today = new Date();
    let dateTracker = new Date(result[0].timestamp*1000);
    let resultIndex = 0;
    let alchemistTvl = { date:[], yvDai: [], yvUsdc: [], yvUsdt: [], yvWeth: [], wstEth: [], rEth: [], aWeth: [], aUsdc: [], aDai: [], aUsdt: [], aFrax: [], vaUsdc: [], vaDai: [], vaFrax: [], vaEth: [], frxEth: [] };
    let tempYvDai = 0;
    let tempYvUsdc = 0;
    let tempYvUsdt = 0;
    let tempADai = 0;
    let tempAUsdc = 0;
    let tempAUsdt = 0;
    let tempAFrax = 0;
    let tempVaUsdc = 0;
    let tempVaDai = 0;
    let tempVaFrax = 0;
    let tempYvWeth = 0;
    let tempAWeth = 0;
    let tempWstEth = 0;
    let tempReth = 0;
    let tempVaEth = 0;
    let tempFrxEth = 0;
    for(let j=0;startDate<today;j++){

      for(let i=resultIndex;i<result.length;i++){
        let tempDate = new Date(result[i].timestamp*1000);
        if(tempDate>startDate) break;

        if(!datesEqual(tempDate, dateTracker)) dateTracker = tempDate;

        tempYvDai = result[i].token.symbol === "yvDAI" && result[i].amount ? result[i].amount/Math.pow(10, 18) : tempYvDai;
        tempYvUsdc = result[i].token.symbol === "yvUSDC" && result[i].amount ? result[i].amount/Math.pow(10, 6) : tempYvUsdc;
        tempYvUsdt = result[i].token.symbol === "yvUSDT" && result[i].amount ? result[i].amount/Math.pow(10, 6) : tempYvUsdt;
        tempADai = result[i].token.symbol === "s_aDAI" && result[i].amount ? result[i].amount/Math.pow(10, 18) : tempADai;
        tempAFrax = result[i].token.symbol === "s_aFRAX" && result[i].amount ? result[i].amount/Math.pow(10, 18) : tempAFrax;
        tempAUsdc = result[i].token.symbol === "s_aUSDC" && result[i].amount ? result[i].amount/Math.pow(10, 6) : tempAUsdc;
        tempAUsdt = result[i].token.symbol === "s_aUSDT" && result[i].amount ? result[i].amount/Math.pow(10, 6) : tempAUsdt;
        tempVaUsdc = result[i].token.symbol === "vaUSDC" && result[i].amount ? result[i].amount/Math.pow(10, 18) : tempVaUsdc;
        tempVaDai = result[i].token.symbol === "vaDAI" && result[i].amount ? result[i].amount/Math.pow(10, 6) : tempVaDai;
        tempVaFrax = result[i].token.symbol === "vaFRAX" && result[i].amount ? result[i].amount/Math.pow(10, 18) : tempVaFrax;
        tempYvWeth = result[i].token.symbol === "yvWETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempYvWeth;
        tempAWeth = result[i].token.symbol === "s_aWETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempAWeth;
        tempWstEth = result[i].token.symbol === "wstETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempWstEth;
        tempReth = result[i].token.symbol === "rETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempReth;
        tempVaEth = result[i].token.symbol === "vaETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempVaEth;
        tempFrxEth = result[i].token.symbol === "sfrxETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempFrxEth;
        resultIndex++;
      }
      alchemistTvl.yvDai[j] = Math.round(tempYvDai/10000)/100;
      if(j>0 && !tempYvDai) alchemistTvl.yvDai[j] = alchemistTvl.yvDai[j-1];
      alchemistTvl.yvUsdc[j] = Math.round(tempYvUsdc/10000)/100;
      if(j>0 && !tempYvUsdc) alchemistTvl.yvUsdc[j] = alchemistTvl.yvUsdc[j-1];
      alchemistTvl.yvUsdt[j] = Math.round(tempYvUsdt/10000)/100;
      if(j>0 && !tempYvUsdt) alchemistTvl.yvUsdt[j] = alchemistTvl.yvUsdt[j-1];
      alchemistTvl.aDai[j] = Math.round(tempADai/10000)/100;
      if(j>0 && !tempADai) alchemistTvl.aDai[j] = alchemistTvl.aDai[j-1];
      alchemistTvl.aUsdc[j] = Math.round(tempAUsdc/10000)/100;
      if(j>0 && !tempAUsdc) alchemistTvl.aUsdc[j] = alchemistTvl.aUsdc[j-1];
      alchemistTvl.aUsdt[j] = Math.round(tempAUsdt/10000)/100;
      if(j>0 && !tempAUsdt) alchemistTvl.aUsdt[j] = alchemistTvl.aUsdt[j-1];
      alchemistTvl.aFrax[j] = Math.round(tempAFrax/10000)/100;
      if(j>0 && !tempAFrax) alchemistTvl.aFrax[j] = alchemistTvl.aFrax[j-1];
      alchemistTvl.vaUsdc[j] = Math.round(tempVaUsdc/10000)/100;
      if(j>0 && !tempVaUsdc) alchemistTvl.vaUsdc[j] = alchemistTvl.vaUsdc[j-1];
      alchemistTvl.vaDai[j] = Math.round(tempVaDai/10000)/100;
      if(j>0 && !tempVaDai) alchemistTvl.vaDai[j] = alchemistTvl.vaDai[j-1];
      alchemistTvl.vaFrax[j] = Math.round(tempVaFrax/10000)/100;
      if(j>0 && !tempVaFrax) alchemistTvl.vaFrax[j] = alchemistTvl.vaFrax[j-1];
      alchemistTvl.yvWeth[j] = Math.round(tempYvWeth/10000)/100;
      if(j>0 && !tempYvWeth) alchemistTvl.yvWeth[j] = alchemistTvl.yvWeth[j-1];
      alchemistTvl.aWeth[j] = Math.round(tempAWeth/10000)/100;
      if(j>0 && !tempAWeth) alchemistTvl.aWeth[j] = alchemistTvl.aWeth[j-1];
      alchemistTvl.wstEth[j] = Math.round(tempWstEth/10000)/100;
      if(j>0 && !tempWstEth) alchemistTvl.wstEth[j] = alchemistTvl.wstEth[j-1];
      alchemistTvl.rEth[j] = Math.round(tempReth/10000)/100;
      if(j>0 && !tempReth) alchemistTvl.rEth[j] = alchemistTvl.rEth[j-1];
      alchemistTvl.vaEth[j] = Math.round(tempVaEth/10000)/100;
      if(j>0 && !tempVaEth) alchemistTvl.vaEth[j] = alchemistTvl.vaEth[j-1];
      alchemistTvl.frxEth[j] = Math.round(tempFrxEth/10000)/100;
      if(j>0 && !tempFrxEth) alchemistTvl.frxEth[j] = alchemistTvl.frxEth[j-1];
      alchemistTvl.date[j] = formatDate(startDate, 0);
      startDate.setDate(startDate.getDate() + 1);
      /*tempYvDai = 0;
      tempYvUsdc = 0;
      tempYvUsdt = 0;*/
    }
    this.setState({ alchemistTvl: alchemistTvl, alchemistTvlLoading: false });
  }

  calculateHarvests(result){
    //console.log(result)
    let startDate = new Date(1648591199*1000); //March 29th
    let today = new Date();
    let dateTracker = new Date(result[0].timestamp*1000);
    let resultIndex = 0;
    let harvests = { date:[], yvDai: [], yvUsdc: [], yvUsdt: [], aDai: [], aUsdc: [], aUsdt: [], yvWeth: [], wstEth: [], rEth: [], aWeth: []};
    let tempYvDai = 0;
    let tempYvUsdc = 0;
    let tempYvUsdt = 0;
    let tempADai = 0;
    let tempAUsdc = 0;
    let tempAUsdt = 0;
    let tempYvWeth = 0;
    let tempWstEth = 0;
    let tempReth = 0;
    let tempAWeth = 0;
    for(let j=0;startDate<today;j++){

      for(let i=resultIndex;i<result.length;i++){
        let tempDate = new Date(result[i].timestamp*1000);
        if(tempDate>startDate) break;

        if(!datesEqual(tempDate, dateTracker)) dateTracker = tempDate;

        tempYvDai = result[i].yieldToken === addresses.yvDaiAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempYvDai) : tempYvDai;
        tempYvUsdc = result[i].yieldToken === addresses.yvUsdcAddress ? (result[i].totalHarvested/Math.pow(10, 6) + tempYvUsdc) : tempYvUsdc;
        tempYvUsdt = result[i].yieldToken === addresses.yvUsdtAddress ? (result[i].totalHarvested/Math.pow(10, 6) + tempYvUsdt) : tempYvUsdt;
        tempADai = result[i].yieldToken === addresses.aDaiAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempADai) : tempADai;
        tempAUsdc = result[i].yieldToken === addresses.aUsdcAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempAUsdc) : tempAUsdc;
        tempAUsdt = result[i].yieldToken === addresses.aUsdtAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempAUsdt) : tempAUsdt;
        tempYvWeth = result[i].yieldToken === addresses.yvWethAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempYvWeth) : tempYvWeth;
        tempWstEth = result[i].yieldToken === addresses.wstEthAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempWstEth) : tempWstEth;
        tempReth = result[i].yieldToken === addresses.rEthAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempReth) : tempReth;
        tempAWeth = result[i].yieldToken === addresses.aWethAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempAWeth) : tempAWeth;
        resultIndex++;
      }
      harvests.yvDai[j] = Math.round(tempYvDai);
      harvests.yvUsdc[j] = Math.round(tempYvUsdc);
      harvests.yvUsdt[j] = Math.round(tempYvUsdt);
      harvests.aDai[j] = Math.round(tempADai);
      harvests.aUsdc[j] = Math.round(tempAUsdc);
      harvests.aUsdt[j] = Math.round(tempAUsdt);
      harvests.yvWeth[j] = Math.round(tempYvWeth*1000)/1000;
      harvests.wstEth[j] = Math.round(tempWstEth*1000)/1000;
      harvests.rEth[j] = Math.round(tempReth*1000)/1000;
      harvests.aWeth[j] = Math.round(tempAWeth*1000)/1000;
      harvests.date[j] = formatDate(startDate, 0);
      startDate.setDate(startDate.getDate() + 1);
      tempYvDai = 0;
      tempYvUsdc = 0;
      tempYvUsdt = 0;
      tempADai = 0;
      tempAUsdc = 0;
      tempAUsdt = 0;
      tempYvWeth = 0;
      tempWstEth = 0;
      tempReth = 0;
      tempAWeth = 0;
    }
    //console.log(harvests)
    this.setState({ harvests: harvests, harvestsLoading: false });
  }

  calculateAlcxArrays(result){
    //let burnAmount = 478612;
    let alcxData = { 
      currentSupply: Math.round(result.market_caps[result.market_caps.length-1][1]/result.prices[result.prices.length-1][1]), 
      price: Math.round(result.prices[result.prices.length-1][1]*100)/100,
      marketcap: Math.round(result.market_caps[result.market_caps.length-1][1]/10000)/100
    }
    this.setState({ 
      alcxData: alcxData,
      alcxDataLoading: false 
    });
  }
  
  getCoinGeckoData(){
    Promise.all([fetch("https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
      fetch("https://api.coingecko.com/api/v3/coins/wrapped-steth/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
      fetch("https://api.coingecko.com/api/v3/coins/rocket-pool-eth/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
      fetch("https://api.coingecko.com/api/v3/coins/staked-frax-ether/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
      fetch("https://api.coingecko.com/api/v3/coins/convex-finance/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
      fetch("https://api.coingecko.com/api/v3/coins/stake-dao/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
      fetch("https://api.coingecko.com/api/v3/coins/curve-dao-token/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
      fetch("https://api.coingecko.com/api/v3/coins/alchemix-usd/market_chart?vs_currency=usd&days=max&interval=daily").then(res => res.json()),
      fetch("https://api.coingecko.com/api/v3/coins/alchemix/market_chart?vs_currency=usd&days=max&interval=daily").then(res => res.json())
    ])
      .then(([ethPrice, wstEthPrice, rEthPrice, sfrxEthPrice, cvxPrice, sdtPrice, crvPrice, alUsdData, alcxData]) => {
        this.calculateTokenPrices(ethPrice, rEthPrice, wstEthPrice, sfrxEthPrice, cvxPrice, sdtPrice, crvPrice);
        this.calculateAlUsdArrays(alUsdData);
        this.calculateAlcxArrays(alcxData);
    })
    .catch(function(err) {
      console.log(err.message);
    });
  }

  calculateDebankData(treasury1, treasury2, sdCrvController, optimismMs, arbitrumMs, totalTreasury1, totalTreasury2, totalSdCrvController, totalOptimismMs, totalArbitrumMs, tokensTreasury1, tokensTreasury2, tokensSdCrvController, tokensOptimismMs, tokensArbitrumMs, elixir3crv, elixirAlUsdFraxBp, totalElixir3crv, totalElixirAlUsdFraxBp, tokensElixir3crv, tokensElixirAlUsdFraxBp){
    let totalTreasury = totalTreasury1.total_usd_value + totalTreasury2.total_usd_value + totalSdCrvController.total_usd_value + totalOptimismMs.total_usd_value + totalArbitrumMs.total_usd_value;
    let alcxInTreasury = 0;
    let alEthCrvInElixir = 0;
    let alEthCrvEthInElixir = 0;
    let alUsdCrvInElixir = 0;
    let alEthCrvInTreasury = 0;
    let alUsdCrvInTreasury = 0;
    let alUsdInElixir = 0;
    let alEthInElixir = 0;
    let alUsdFraxBpInElixir = 0;
    let symbols = [];
    let elixirSymbols = [];
    let treasuryAssets = {};
    let sortedTreasuryAssets = [];
    let elixirAssets = {};
    let sortedElixirAssets = [];

    let tempDebankCalc = {};
    let tokensConcat = tokensTreasury1.concat(tokensTreasury2).concat(tokensSdCrvController).concat(tokensOptimismMs).concat(tokensArbitrumMs);
    let protocolsConcat = treasury1.concat(treasury2).concat(sdCrvController).concat(optimismMs).concat(arbitrumMs);
    let elixirTokensConcat = tokensElixir3crv.concat(tokensElixirAlUsdFraxBp);
    let elixirProtocolsConcat = elixir3crv.concat(elixirAlUsdFraxBp);


    //Calculate treasury
    for(let i=0;i<protocolsConcat.length;i++){
      for(let j=0;j<protocolsConcat[i].portfolio_item_list.length;j++){
        for(let k=0;k<protocolsConcat[i].portfolio_item_list[j].asset_token_list.length;k++){
          symbols[symbols.length] = protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol;
        }
      }
    }

    for(let i=0;i<tokensConcat.length;i++){
      symbols[symbols.length] = tokensConcat[i].symbol;
    }

    let filteredSymbols = [...new Set(symbols)]
    for(let i=0;i<filteredSymbols.length;i++){
      treasuryAssets[filteredSymbols[i]] = 0
    }

    for(let i=0;i<protocolsConcat.length;i++){
      for(let j=0;j<protocolsConcat[i].portfolio_item_list.length;j++){
        for(let k=0;k<protocolsConcat[i].portfolio_item_list[j].asset_token_list.length;k++){
          treasuryAssets[protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol] += protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
          if(protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "ALCX") alcxInTreasury += protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
        }
      }
    }

    for(let i=0;i<tokensConcat.length;i++){
      treasuryAssets[tokensConcat[i].symbol] += tokensConcat[i].amount * tokensConcat[i].price;
      if(tokensConcat[i].symbol === "ALCX") alcxInTreasury += tokensConcat[i].amount * tokensConcat[i].price;
    }

    let largestValue = 0;
    let largestIndex = 0;
    for(let i=0;i<filteredSymbols.length;i++){
      for(let j=0;j<filteredSymbols.length;j++){
        if(treasuryAssets[filteredSymbols[j]] > largestValue) {
          largestValue = treasuryAssets[filteredSymbols[j]];
          largestIndex = j;
        }
      }
      let pushObject = {
        symbol: filteredSymbols[largestIndex],
        amount: treasuryAssets[filteredSymbols[largestIndex]]
      };
      sortedTreasuryAssets.push(pushObject)
      filteredSymbols.splice(largestIndex, 1);
      largestIndex = 0;
      largestValue = 0;
    }

    console.log(elixirProtocolsConcat)

    //Calculate Elixirs
    for(let i=0;i<elixirProtocolsConcat.length;i++){
      for(let j=0;j<elixirProtocolsConcat[i].portfolio_item_list.length;j++){
        for(let k=0;k<elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list.length;k++){
          elixirSymbols[elixirSymbols.length] = elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol;
        }
      }
    }

    for(let i=0;i<elixirTokensConcat.length;i++){
      elixirSymbols[elixirSymbols.length] = elixirTokensConcat[i].symbol;
    }

    let elixirFilteredSymbols = [...new Set(elixirSymbols)]
    for(let i=0;i<elixirFilteredSymbols.length;i++){
      elixirAssets[elixirFilteredSymbols[i]] = 0
    }

    for(let i=0;i<elixirProtocolsConcat.length;i++){
      for(let j=0;j<elixirProtocolsConcat[i].portfolio_item_list.length;j++){
        for(let k=0;k<elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list.length;k++){
          elixirAssets[elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol] += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
          //if(elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "alUSD") alUsdInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
        }
      }
    }

    for(let i=0;i<elixirTokensConcat.length;i++){
      if(elixirTokensConcat[i].symbol !== "alUSD") elixirAssets[elixirTokensConcat[i].symbol] += elixirTokensConcat[i].amount * elixirTokensConcat[i].price;
      if(elixirTokensConcat[i].symbol === "alUSD") alUsdInElixir += elixirTokensConcat[i].amount * elixirTokensConcat[i].price;
    }

    let elixirLargestValue = 0;
    let elixirLargestIndex = 0;
    for(let i=0;i<elixirFilteredSymbols.length;i++){
      for(let j=0;j<elixirFilteredSymbols.length;j++){
        if(elixirAssets[elixirFilteredSymbols[j]] > elixirLargestValue) {
          elixirLargestValue = elixirAssets[elixirFilteredSymbols[j]];
          elixirLargestIndex = j;
        }
      }
      let pushObject = {
        symbol: elixirFilteredSymbols[elixirLargestIndex],
        amount: elixirAssets[elixirFilteredSymbols[elixirLargestIndex]]
      };
      sortedElixirAssets.push(pushObject)
      elixirFilteredSymbols.splice(elixirLargestIndex, 1);
      elixirLargestIndex = 0;
      elixirLargestValue = 0;
    }

    console.log(sortedElixirAssets)
    
    let totalElixir = totalElixir3crv.total_usd_value + totalElixirAlUsdFraxBp.total_usd_value - alUsdInElixir;

    tempDebankCalc = {
      totalTreasury: totalTreasury,
      totalElixir: totalElixir,
      sortedTreasuryAssets: sortedTreasuryAssets,
      sortedElixirAssets: sortedElixirAssets,
      nonAlcxTreasury: totalTreasury - alcxInTreasury,
      alcxInTreasury: alcxInTreasury,
      alEthCrvInElixir: alEthCrvInElixir,
      alEthCrvEthInElixir: alEthCrvEthInElixir,
      alUsdCrvInElixir: alUsdCrvInElixir,
      alEthCrvInTreasury: alEthCrvInTreasury,
      alUsdCrvInTreasury: alUsdCrvInTreasury,
      alUsdInElixir: alUsdInElixir,
      alEthInElixir: alEthInElixir,
      alUsdFraxBpInElixir: alUsdFraxBpInElixir,
    }
    this.setState({ debankDataLoading: false, debankData: tempDebankCalc })
  }

  getDebankData(){
    let requestHeader = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'AccessKey': 'a200a96baf7b82432d441cfab1307dcc6a7d7cf3'
      }
    }

    Promise.all([fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0x9e2b6378ee8ad2a4a95fe481d63caba8fb0ebbf9&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0x8392f6669292fa56123f71949b52d883ae57e225&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0x3216d2a52f0094aa860ca090bc5c335de36e6273&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0xc224bf25dcc99236f00843c7d8c4194abe8aa94a&chain_ids=op", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0x7e108711771dfdb10743f016d46d75a9379ca043&chain_ids=arb", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0x9e2b6378ee8ad2a4a95fe481d63caba8fb0ebbf9&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0x8392f6669292fa56123f71949b52d883ae57e225&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0x3216d2a52f0094aa860ca090bc5c335de36e6273&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0xc224bf25dcc99236f00843c7d8c4194abe8aa94a&chain_ids=op", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0x7e108711771dfdb10743f016d46d75a9379ca043&chain_ids=arb", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0x9e2b6378ee8ad2a4a95fe481d63caba8fb0ebbf9&chain_id=eth&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0x8392f6669292fa56123f71949b52d883ae57e225&chain_id=eth&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0x3216d2a52f0094aa860ca090bc5c335de36e6273&chain_id=eth&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0xc224bf25dcc99236f00843c7d8c4194abe8aa94a&chain_id=op&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0x7e108711771dfdb10743f016d46d75a9379ca043&chain_id=arb&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0x9735f7d3ea56b454b24ffd74c58e9bd85cfad31b&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0x06378717d86b8cd2dba58c87383da1eda92d3495&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0x9735f7d3ea56b454b24ffd74c58e9bd85cfad31b&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0x06378717d86b8cd2dba58c87383da1eda92d3495&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0x9735f7d3ea56b454b24ffd74c58e9bd85cfad31b&chain_id=eth&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0x06378717d86b8cd2dba58c87383da1eda92d3495&chain_id=eth&is_all=false", requestHeader).then(res => res.json()),
    ])
    .then(([treasury1, treasury2, sdCrvController, optimismMs, arbitrumMs, totalTreasury1, totalTreasury2, totalSdCrvController, totalOptimismMs, totalArbitrumMs, tokensTreasury1, tokensTreasury2, tokensSdCrvController, tokensOptimismMs, tokensArbitrumMs, elixir3crv, elixirAlUsdFraxBp, totalElixir3crv, totalElixirAlUsdFraxBp, tokensElixir3crv, tokensElixirAlUsdFraxBp]) => {
          this.calculateDebankData(treasury1, treasury2, sdCrvController, optimismMs, arbitrumMs, totalTreasury1, totalTreasury2, totalSdCrvController, totalOptimismMs, totalArbitrumMs, tokensTreasury1, tokensTreasury2, tokensSdCrvController, tokensOptimismMs, tokensArbitrumMs, elixir3crv, elixirAlUsdFraxBp, totalElixir3crv, totalElixirAlUsdFraxBp, tokensElixir3crv, tokensElixirAlUsdFraxBp)
      }).catch(function(err) { console.log(err) });
    
  }

  getPegQuery(alAsset, collateralToken, tradeSize, skip){
    return `{
      poolHistoricalRates(
        first: 1000
        skip: ` + skip + `
        where: {inputToken: "` + alAsset + `", outputToken: "` + collateralToken + `", inputAmount: "` + tradeSize.toLocaleString('fullwide', {useGrouping:false}) + `"}
        orderBy: timestamp
        orderDirection: desc
      ) {
        outputAmount
        timestamp
      }
    }`
  }

  getAlchemistTvlQuery(skip){
    return `{
      alchemistTVLHistories(
        first: 1000
        skip: ` + skip + `
        orderBy: timestamp
        orderDirection: desc
      )
      {
        token
          {
            symbol
          }
        amount
        timestamp
      }
    }`
  }

  getSubgraphRequestOptions(query){
    return {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query })
    }
  }

  getAlUsdPeg(){
    const daiPegQuery = this.getPegQuery(addresses.alUsdAddress, addresses.daiAddress, Math.pow(10, 24), 0)
    const daiPegQuerySkip1000 = this.getPegQuery(addresses.alUsdAddress, addresses.daiAddress, Math.pow(10, 24), 1000)
    const daiPeg10mQuery = this.getPegQuery(addresses.alUsdAddress, addresses.daiAddress, Math.pow(10, 25), 0)
    const daiPeg10mQuerySkip1000 = this.getPegQuery(addresses.alUsdAddress, addresses.daiAddress, Math.pow(10, 25), 1000)
    const usdcPegQuery = this.getPegQuery(addresses.alUsdAddress, addresses.usdcAddress, Math.pow(10, 24), 0)
    const usdcPegQuerySkip1000 = this.getPegQuery(addresses.alUsdAddress, addresses.usdcAddress, Math.pow(10, 24), 1000)
    const usdcPeg10mQuery = this.getPegQuery(addresses.alUsdAddress, addresses.usdcAddress, Math.pow(10, 25), 0)
    const usdcPeg10mQuerySkip1000 = this.getPegQuery(addresses.alUsdAddress, addresses.usdcAddress, Math.pow(10, 25), 1000)
    const usdtPegQuery = this.getPegQuery(addresses.alUsdAddress, addresses.usdtAddress, Math.pow(10, 24), 0)
    const usdtPegQuerySkip1000 = this.getPegQuery(addresses.alUsdAddress, addresses.usdtAddress, Math.pow(10, 24), 1000)
    const usdtPeg10mQuery = this.getPegQuery(addresses.alUsdAddress, addresses.usdtAddress, Math.pow(10, 25), 0)
    const usdtPeg10mQuerySkip1000 = this.getPegQuery(addresses.alUsdAddress, addresses.usdtAddress, Math.pow(10, 25), 1000)
    const alEthPegQuery = this.getPegQuery(addresses.alEthAddress, addresses.ethAddress, Math.pow(10,20)*5, 0)
    const alEthPeg5kQuery = this.getPegQuery(addresses.alEthAddress, addresses.ethAddress, Math.pow(10, 21)*5, 0)
    const alEthPegQuerySkip1000 = this.getPegQuery(addresses.alEthAddress, addresses.ethAddress, Math.pow(10,20)*5, 1000)
    const alEthPeg5kQuerySkip1000 = this.getPegQuery(addresses.alEthAddress, addresses.ethAddress, Math.pow(10, 21)*5, 1000)
    const alchemistTvl = this.getAlchemistTvlQuery(0)
    const alchemistTvlSkip1000 = this.getAlchemistTvlQuery(1000)
    const alchemistTvlSkip2000 = this.getAlchemistTvlQuery(2000)
    const alchemistTvlSkip3000 = this.getAlchemistTvlQuery(3000)
    const alchemistTvlSkip4000 = this.getAlchemistTvlQuery(4000)
    const alchemistTvlSkip5000 = this.getAlchemistTvlQuery(5000)
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

    Promise.all([fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(daiPegQuery)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(daiPegQuerySkip1000)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(daiPeg10mQuery)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(daiPeg10mQuerySkip1000)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(usdcPegQuery)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(usdcPegQuerySkip1000)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(usdcPeg10mQuery)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(usdcPeg10mQuerySkip1000)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(usdtPegQuery)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(usdtPegQuerySkip1000)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(usdtPeg10mQuery)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(usdtPeg10mQuerySkip1000)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(alEthPegQuery)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(alEthPeg5kQuery)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(alEthPegQuerySkip1000)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(alEthPeg5kQuerySkip1000)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(alchemistTvl)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(alchemistTvlSkip1000)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(alchemistTvlSkip2000)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(alchemistTvlSkip3000)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(alchemistTvlSkip4000)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(alchemistTvlSkip5000)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2_ftm", this.getSubgraphRequestOptions(alchemistTvl)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2_ftm", this.getSubgraphRequestOptions(alchemistTvlSkip1000)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2_optimisim", this.getSubgraphRequestOptions(alchemistTvl)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2_optimisim", this.getSubgraphRequestOptions(alchemistTvlSkip1000)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2_dev", this.getSubgraphRequestOptions(harvestsQuery)).then(res => res.json())])
      .then(([daiPeg, daiPegSkip1000, dai10mPeg, dai10mPegSkip1000, usdcPeg, usdcPegSkip1000, usdc10mPeg, usdc10mPegSkip1000, usdtPeg, usdtPegSkip1000, usdt10mPeg, usdt10mPegSkip1000, alEthPeg, alEth5kPeg, alEthPegSkip1000, alEth5kPegSkip1000, alchemistTvl, alchemistTvlSkip1000, alchemistTvlSkip2000, alchemistTvlSkip3000, alchemistTvlSkip4000, alchemistTvlSkip5000, ftmAlchemistTvl, ftmAlchemistTvlSkip1000, optiAlchemistTvl, optiAlchemistTvlSkip1000, harvests]) => {
        this.calculateAlUsdPeg(daiPeg.data.poolHistoricalRates.concat(daiPegSkip1000.data.poolHistoricalRates).reverse(), usdcPeg.data.poolHistoricalRates.concat(usdcPegSkip1000.data.poolHistoricalRates).reverse(), usdtPeg.data.poolHistoricalRates.concat(usdtPegSkip1000.data.poolHistoricalRates).reverse(), dai10mPeg.data.poolHistoricalRates.concat(dai10mPegSkip1000.data.poolHistoricalRates).reverse(), usdc10mPeg.data.poolHistoricalRates.concat(usdc10mPegSkip1000.data.poolHistoricalRates).reverse(), usdt10mPeg.data.poolHistoricalRates.concat(usdt10mPegSkip1000.data.poolHistoricalRates).reverse())
        this.calculateAlEthPeg(alEthPeg.data.poolHistoricalRates.concat(alEthPegSkip1000.data.poolHistoricalRates).reverse(), alEth5kPeg.data.poolHistoricalRates.concat(alEth5kPegSkip1000.data.poolHistoricalRates).reverse())
        this.calculateHarvests(harvests.data.alchemistHarvestEvents.reverse())
        this.calculateFtmTvl(ftmAlchemistTvl.data.alchemistTVLHistories.concat(ftmAlchemistTvlSkip1000.data.alchemistTVLHistories).reverse())
        this.calculateOptiTvl(optiAlchemistTvl.data.alchemistTVLHistories.concat(optiAlchemistTvlSkip1000.data.alchemistTVLHistories).reverse())
        this.calculateAlchemistTvl(alchemistTvl.data.alchemistTVLHistories.concat(alchemistTvlSkip1000.data.alchemistTVLHistories.concat(alchemistTvlSkip2000.data.alchemistTVLHistories.concat(alchemistTvlSkip3000.data.alchemistTVLHistories.concat(alchemistTvlSkip4000.data.alchemistTVLHistories.concat(alchemistTvlSkip5000.data.alchemistTVLHistories))))).reverse())
    })
    .catch(function(err) {
      console.log(err.message);
    });
  }

  render() {

  let v2DaiTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.dai*this.state.tokensPerShare.dai*100)/100;
  let v2UsdcTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.usdc*this.state.tokensPerShare.usdc*100)/100;
  let v2UsdtTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.usdt*this.state.tokensPerShare.usdt*100)/100;
  let v2aDaiTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.aDai*this.state.tokensPerShare.aDai*100)/100;
  let v2aUsdcTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.aUsdc*this.state.tokensPerShare.aUsdc*100)/100;
  let v2aUsdtTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.aUsdt*this.state.tokensPerShare.aUsdt*100)/100;
  let v2aFraxTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.aFrax*this.state.tokensPerShare.aFrax*100)/100;
  let v2vaUsdcTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.vaUsdc*this.state.tokensPerShare.vaUsdc*100)/100;
  let v2vaDaiTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.vaDai*this.state.tokensPerShare.vaDai*100)/100;
  let v2vaFraxTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.vaFrax*this.state.tokensPerShare.vaFrax*100)/100;
  let v2EthTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.eth*this.state.tokensPerShare.eth);
  let v2EthUsdTVL = (this.state.tokenPricesLoading || this.state.v2CurrentLoading) ? 0 : Math.round(v2EthTVL*this.state.tokenPrices.eth[this.state.tokenPrices.eth.length-1]/10000)/100;
  let v2vaEthTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.vaEth*this.state.tokensPerShare.vaEth);
  let v2vaEthUsdTVL = (this.state.tokenPricesLoading || this.state.v2CurrentLoading) ? 0 : Math.round(v2vaEthTVL*this.state.tokenPrices.eth[this.state.tokenPrices.eth.length-1]/10000)/100;
  let v2aWethTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.aWeth*this.state.tokensPerShare.aWeth);
  let v2aWethUsdTVL = (this.state.tokenPricesLoading || this.state.v2CurrentLoading) ? 0 : Math.round(v2aWethTVL*this.state.tokenPrices.eth[this.state.tokenPrices.eth.length-1]/10000)/100;
  let optiAWethTVL = this.state.optiTvlLoading ? 0 : Math.round(this.state.optiTvl.aWeth[this.state.optiTvl.aWeth.length-1]*100)/100;
  let optiAWethUsdTVL = (this.state.tokenPricesLoading || this.state.optiTvlLoading) ? 0 : Math.round(optiAWethTVL*this.state.tokenPrices.eth[this.state.tokenPrices.eth.length-1]/10000)/100;
  let v2RethTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.rEth*this.state.tokensPerShare.rEth);
  let v2RethUsdTVL = (this.state.tokenPricesLoading || this.state.v2CurrentLoading) ? 0 : Math.round(this.state.v2Deposit.rEth*this.state.tokenPrices.rEth[this.state.tokenPrices.rEth.length-1]/10000)/100;
  let v2SfrxEthTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.sfrxEth*this.state.tokensPerShare.sfrxEth);
  let v2SfrxEthUsdTVL = (this.state.tokenPricesLoading || this.state.v2CurrentLoading) ? 0 : Math.round(this.state.v2Deposit.sfrxEth*this.state.tokenPrices.sfrxEth[this.state.tokenPrices.sfrxEth.length-1]/10000)/100;
  let v2StethTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.wstEth*this.state.tokensPerShare.wstEth);
  let v2StethUsdTVL = (this.state.v2CurrentLoading || this.state.tokenPricesLoading) ? 0 : Math.round(this.state.v2Deposit.wstEth*this.state.tokenPrices.wstEth[this.state.tokenPrices.wstEth.length-1]/10000)/100;
  let stakedAlcxValue = (this.state.stakingLoading || this.state.alcxDataLoading) ? 0 : this.state.alchemixStaking.alcx*this.state.alcxData.price;
  let stakingSlpValue = (this.state.stakingLoading || this.state.alcxDataLoading || this.state.tokenPricesLoading) ? 0 : (this.state.alcxEthSlp.alcx*this.state.alcxData.price+this.state.alcxEthSlp.weth*this.state.tokenPrices.eth[this.state.tokenPrices.eth.length-1])*this.state.alchemixStaking.alcxEthSlpStakingRatio;
  let alcxTotalMarketcap = (this.state.alcxDataLoading || this.state.debankDataLoading) ? 0 : Math.round(this.state.alcxData.marketcap*100 + this.state.debankData.alcxInTreasury/10000)/100;
  let alEthCrvTotalValue = (this.state.tokenPricesLoading || this.state.stakingLoading) ? 0 : this.state.alAssetCrvSupply.alEthCrv * this.state.tokenPrices.eth[this.state.tokenPrices.eth.length-1];
  let wethInMigrateUsd = (this.state.v2CurrentLoading || this.state.tokenPricesLoading) ? 0 : this.state.v2Deposit.wethInMigrate*this.state.tokenPrices.eth[this.state.tokenPrices.eth.length-1]/Math.pow(10,6);
  ChartJS.register(
    CategoryScale,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
  )

  return (
    <div className="App">
      <div className="header-container">
        <div className="header-style">
          <img className="alchemix-logo" src={ require('./logos/alchemix-stats-logo.svg').default } alt="ALCX logo" />
        </div>
        <div className="header-switcher">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img className="header-button" src={ require('./logos/stats_active.svg').default } alt="stats button" />
          </Link>
          <Link to="/earn" style={{ textDecoration: 'none' }}>
            <img className="header-button" src={ require('./logos/earn_inactive.svg').default } alt="earn button" />
          </Link>
        </div>
      </div>
      <br/>
      <Overview 
        v2DaiTVL={v2DaiTVL} v2UsdcTVL={v2UsdcTVL} v2UsdtTVL={v2UsdtTVL} v2vaUsdcTVL={v2vaUsdcTVL} v2vaDaiTVL={v2vaDaiTVL} v2vaEthTVL={v2vaEthTVL} v2vaEthUsdTVL={v2vaEthUsdTVL}
        v2Caps={this.state.v2Caps} v2EthUsdTVL={v2EthUsdTVL} v2StethUsdTVL={v2StethUsdTVL} v2RethUsdTVL={v2RethUsdTVL} v2EthTVL={v2EthTVL}
        v2StethTVL={v2StethTVL} v2RethTVL={v2RethTVL} alchemixStaking={this.state.alchemixStaking}
        v2aDaiTVL={v2aDaiTVL} v2aUsdcTVL={v2aUsdcTVL} v2aUsdtTVL={v2aUsdtTVL} v2aWethTVL={v2aWethTVL} v2aWethUsdTVL={v2aWethUsdTVL}
        stakedAlcxValue={stakedAlcxValue} stakingSlpValue={stakingSlpValue} v2aFraxTVL={v2aFraxTVL} v2vaFraxTVL={v2vaFraxTVL}
        tokenPrices={this.state.tokenPrices} ftmTvl={this.state.ftmTvl} alAssetSupply={this.state.alAssetSupply}
        alchemistTvl={this.state.alchemistTvl} lps={this.state.lps} ethPrice={this.state.tokenPrices.eth}
        alUsdPeg={this.state.alUsdPeg} alEthPeg={this.state.alEthPeg} v2sfrxEthTVL={v2SfrxEthTVL} v2sfrxEthUsdTVL={v2SfrxEthUsdTVL}
        tokenPricesLoading={this.state.tokenPricesLoading} debankData={this.state.debankData}
        alUsdPegLoading={this.state.alUsdPegLoading} alEthPegLoading={this.state.alEthPegLoading} alchemistTvlLoading={this.state.alchemistTvlLoading}
        lpsLoading={this.state.lpsLoading} wethInMigrateUsd={wethInMigrateUsd} v2Deposit={this.state.v2Deposit}
        v2CurrentLoading={this.state.v2CurrentLoading} debankDataLoading={this.state.debankDataLoading}
      />
      <div className="button-group-large-screen">
      <div className="general-switcher-container">
    
            <div className="menu-switcher">
                {this.state.activeTab === "treasury" ? 
                <div className="general-switcher-buttons-active" onClick={() => {this.selectTab("treasury")}}>
                    <img src={ require('./logos/treasury_thin.svg').default } alt="alethcurve logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Holdings</div>
                </div> :
                <div className="general-switcher-buttons-inactive" onClick={() => {this.selectTab("treasury")}}>
                    <img src={ require('./logos/treasury_thin.svg').default } alt="alethcurve logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Holdings</div>
                </div>}
                {this.state.activeTab === "emissions" ? 
                <div className="general-switcher-buttons-active" onClick={() => {this.selectTab("emissions")}}>
                    <img src={ require('./logos/alcx_logo_only.svg').default } alt="alcx logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">ALCX Emissions</div>
                </div> :
                <div className="general-switcher-buttons-inactive" onClick={() => {this.selectTab("emissions")}}>
                    <img src={ require('./logos/alcx_logo_only.svg').default } alt="alcx logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">ALCX Emissions</div>
                </div>}
                {this.state.activeTab === "deposits" ? 
                <div className="general-switcher-buttons-active" onClick={() => {this.selectTab("deposits")}}>
                    <img src={ require('./logos/vaults.svg').default } alt="vaults logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Deposits</div>
                </div> :
                <div className="general-switcher-buttons-inactive" onClick={() => {this.selectTab("deposits")}}>
                    <img src={ require('./logos/vaults.svg').default } alt="vaults logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Deposits</div>
                </div>}
                {this.state.activeTab === "revenues" ? 
                <div className="general-switcher-buttons-active" onClick={() => {this.selectTab("revenues")}}>
                    <img src={ require('./logos/debt_thin.svg').default } alt="revenues logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Revenue</div>
                </div> :
                <div className="general-switcher-buttons-inactive" onClick={() => {this.selectTab("revenues")}}>
                    <img src={ require('./logos/debt_thin.svg').default } alt="revenues logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Revenue</div>
                </div>}
                {this.state.activeTab === "alassets" ? 
                <div className="general-switcher-buttons-active" onClick={() => {this.selectTab("alassets")}}>
                    <img src={ require('./logos/alusd.svg').default } alt="alethcurve logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">alAssets</div>
                </div> :
                <div className="general-switcher-buttons-inactive" onClick={() => {this.selectTab("alassets")}}>
                    <img src={ require('./logos/alusd.svg').default } alt="alethcurve logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">alAssets</div>
                </div>}
                {this.state.activeTab === "harvests" ? 
                <div className="general-switcher-buttons-active" onClick={() => {this.selectTab("harvests")}}>
                    <img src={ require('./logos/harvests_thin.svg').default } alt="alethcurve logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Harvests</div>
                </div> :
                <div className="general-switcher-buttons-inactive" onClick={() => {this.selectTab("harvests")}}>
                    <img src={ require('./logos/harvests_thin.svg').default } alt="alethcurve logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Harvests</div>
                </div>}
            </div>
          </div>
      </div>
      <br/>
      <div className="button-group-small-screen">
          <div className="general-switcher-container">
    
            <div className="menu-switcher">
                {this.state.activeTab === "treasury" ? 
                <div className="general-switcher-buttons-active" onClick={() => {this.selectTab("treasury")}}>
                    <img src={ require('./logos/treasury_thin.svg').default } alt="treasury logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Holdings</div>
                </div> :
                <div className="general-switcher-buttons-inactive" onClick={() => {this.selectTab("treasury")}}>
                    <img src={ require('./logos/treasury_thin.svg').default } alt="treasury logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Holdings</div>
                </div>}
                {this.state.activeTab === "emissions" ? 
                <div className="general-switcher-buttons-active" onClick={() => {this.selectTab("emissions")}}>
                    <img src={ require('./logos/alcx_logo_only.svg').default } alt="alcx logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">ALCX Emissions</div>
                </div> :
                <div className="general-switcher-buttons-inactive" onClick={() => {this.selectTab("emissions")}}>
                    <img src={ require('./logos/alcx_logo_only.svg').default } alt="alcx logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">ALCX Emissions</div>
                </div>}
                {this.state.activeTab === "deposits" ? 
                <div className="general-switcher-buttons-active" onClick={() => {this.selectTab("deposits")}}>
                    <img src={ require('./logos/vaults.svg').default } alt="vaults logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Deposits</div>
                </div> :
                <div className="general-switcher-buttons-inactive" onClick={() => {this.selectTab("deposits")}}>
                    <img src={ require('./logos/vaults.svg').default } alt="vaults logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Deposits</div>
                </div>}
              </div>
            </div>
          <div className="general-switcher-container">
              <div className="menu-switcher">
                {this.state.activeTab === "revenues" ? 
                <div className="general-switcher-buttons-active" onClick={() => {this.selectTab("revenues")}}>
                    <img src={ require('./logos/debt_thin.svg').default } alt="revenues logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Revenue</div>
                </div> :
                <div className="general-switcher-buttons-inactive" onClick={() => {this.selectTab("revenues")}}>
                    <img src={ require('./logos/debt_thin.svg').default } alt="revenues logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Revenue</div>
                </div>}
                {this.state.activeTab === "alassets" ? 
                <div className="general-switcher-buttons-active" onClick={() => {this.selectTab("alassets")}}>
                    <img src={ require('./logos/alusd.svg').default } alt="alassets logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">alAssets</div>
                </div> :
                <div className="general-switcher-buttons-inactive" onClick={() => {this.selectTab("alassets")}}>
                    <img src={ require('./logos/alusd.svg').default } alt="alassets logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">alAssets</div>
                </div>}
                {this.state.activeTab === "harvests" ? 
                <div className="general-switcher-buttons-active" onClick={() => {this.selectTab("harvests")}}>
                    <img src={ require('./logos/harvests_thin.svg').default } alt="harvests logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Harvests</div>
                </div> :
                <div className="general-switcher-buttons-inactive" onClick={() => {this.selectTab("harvests")}}>
                    <img src={ require('./logos/harvests_thin.svg').default } alt="harvests logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Harvests</div>
                </div>}
            </div>
          </div>

      </div>
      <br/>
      <br/>
      {this.state.activeTab !== "emissions" ? "" :
      <Emissions alcxData={this.state.alcxData} alcxDataLoading={this.state.alcxDataLoading} alcxTotalMarketcap={alcxTotalMarketcap} />
      }
      {this.state.activeTab !== "deposits" ? "" : ((this.state.tokenPricesLoading || this.state.v2CurrentLoading || this.state.ftmTvlLoading || this.state.alchemistTvlLoading || this.state.optiTvlLoading) ? "Loading..." :
        <Deposits
          v2DaiTVL={v2DaiTVL} v2UsdcTVL={v2UsdcTVL} v2UsdtTVL={v2UsdtTVL} v2vaUsdcTVL={v2vaUsdcTVL} v2vaDaiTVL={v2vaDaiTVL} v2vaEthTVL={v2vaEthTVL} v2vaEthUsdTVL={v2vaEthUsdTVL} 
          v2Caps={this.state.v2Caps} v2EthUsdTVL={v2EthUsdTVL} v2StethUsdTVL={v2StethUsdTVL} v2RethUsdTVL={v2RethUsdTVL} v2EthTVL={v2EthTVL}
          v2StethTVL={v2StethTVL} v2RethTVL={v2RethTVL} v2aDaiTVL={v2aDaiTVL} v2aUsdcTVL={v2aUsdcTVL} v2aUsdtTVL={v2aUsdtTVL} 
          v2aWethTVL={v2aWethTVL} v2aWethUsdTVL={v2aWethUsdTVL} alchemixStaking={this.state.alchemixStaking}
          stakedAlcxValue={stakedAlcxValue} stakingSlpValue={stakingSlpValue} v2Deposit={this.state.v2Deposit} wethInMigrateUsd={wethInMigrateUsd}
          tokenPrices={this.state.tokenPrices} ftmTvl={this.state.ftmTvl} v2aFraxTVL={v2aFraxTVL} v2vaFraxTVL={v2vaFraxTVL}
          alchemistTvl={this.state.alchemistTvl} optiTvl={this.state.optiTvl} optiAWethTVL={optiAWethTVL} optiAWethUsdTVL={optiAWethUsdTVL}
          v2sfrxEthTVL={v2SfrxEthTVL} v2sfrxEthUsdTVL={v2SfrxEthUsdTVL}
        />)}

      {this.state.activeTab !== "treasury" ? "" :
      <Treasury
        debankData={this.state.debankData}
        debankDataLoading={this.state.debankDataLoading}
        alAssetCrvSupply={this.state.alAssetCrvSupply}
        alEthCrvTotalValue={alEthCrvTotalValue}
        />}
      
      {this.state.activeTab !== "revenues" ? "" : 
      <Revenues ethPrice={this.state.tokenPrices.eth} v2EthTVL={v2EthTVL} v2StethTVL={v2StethTVL} v2RethTVL={v2RethTVL}
      v2DaiTVL={v2DaiTVL} v2UsdcTVL={v2UsdcTVL} v2UsdtTVL={v2UsdtTVL}
      v2aDaiTVL={v2aDaiTVL} v2aUsdcTVL={v2aUsdcTVL} v2aUsdtTVL={v2aUsdtTVL} v2aWethTVL={v2aWethTVL} />
      }

      {this.state.activeTab !== "alassets" ? "" : ((this.state.alUsdLoading || this.state.alUsdPegLoading || this.state.alEthPegLoading || this.state.lpsLoading || this.state.tokenPricesLoading) ? "Loading..." :
      <AlAssets 
          alUsdMarketcapDates={this.state.alUsdMarketcapDates} alUsdMarketcaps={this.state.alUsdMarketcaps}
          alUsdPeg={this.state.alUsdPeg} alEthPeg={this.state.alEthPeg} lps={this.state.lps} ethPrice={this.state.tokenPrices.eth}
      />)
      }

      {this.state.activeTab !== "harvests" ? "" : (this.state.harvestsLoading ? "Loading..." :
      <Harvests harvests={this.state.harvests} />)
      }

    </div>
  );
}
}