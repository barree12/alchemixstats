import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Web3 from 'web3';
import Deposits from './Deposits';
import AlAssets from './AlAssets';
import Harvests from './Harvests';
import Emissions from './Emissions';
import Overview from './Overview';
import Revenues from './Revenues';
import Treasury from './Treasury';
import Transmuters from './Transmuters';
import { Link } from "react-router-dom";
import { formatDate, datesEqual, wait } from './Functions';
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
const web3 = new Web3('https://eth-mainnet.g.alchemy.com/v2/m4nhopYhysiwNnoLZ7vnyxxwjHHtYcKP');
//const web3 = new Web3('https://eth-mainnet.g.alchemy.com/v2/demo');
//const web3ftm = new Web3('https://rpcapi-tracing.fantom.network');
//const web3optimism = new Web3('https://mainnet.optimism.io');
const web3optimism = new Web3('https://opt-mainnet.g.alchemy.com/v2/p9poBr_K0kBvzVt3V6Lo1wasL9r32FpP');
const web3arbitrum = new Web3('https://rpc.ankr.com/arbitrum')
const web3metis = new Web3('https://metis-mainnet.public.blastapi.io')

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
      alchemistTvl: {},
      optiTvl: {},
      arbiTvl: {},
      harvests: {},
      transmuters: {},
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
      optiTvlLoading: true,
      arbiTvlLoading: true,
      harvestsLoading: true,
      alUsdLoading: true,
      debankDataLoading: true,
      activeTab: 'treasury'
    };
    this.selectTab = this.selectTab.bind(this);

    this.alchemistContract = new web3.eth.Contract(abis.alchemistAbi, addresses.alchemistV2Address);
    this.alchemistEthContract = new web3.eth.Contract(abis.alchemistAbi, addresses.alchemistEthV2Address);
    this.alchemistOptiContract = new web3optimism.eth.Contract(abis.alchemistAbi, addresses.alchemistOptiAddress);
    this.alchemistEthOptiContract = new web3optimism.eth.Contract(abis.alchemistAbi, addresses.alchemistEthOptiAddress);
    this.alchemistArbiContract = new web3arbitrum.eth.Contract(abis.alchemistAbi, addresses.alchemistArbiAddress);
    this.alchemistEthArbiContract = new web3arbitrum.eth.Contract(abis.alchemistAbi, addresses.alchemistArbiEthAddress);
    this.cvxAlUsd3CrvStakingContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.cvxAlUsd3CrvStakingContractAddress);
    this.cvxAlEthCrvStakingContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.cvxAlEthCrvStakingContractAddress);
    this.vlCvxTrackerContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.vlCvxTrackerAddress);
    this.alcxContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alcxAddress);
    this.masterChefContract = new web3.eth.Contract(abis.masterChefAbi, addresses.masterChefAddress);
    this.wethContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.wethAddress);
    this.alUsd3CrvContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alUsd3CrvContractAddress);
    this.alUsdContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alUsdAddress);
    this.fraxContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.fraxAddress);
    this.crv3Contract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.crv3Address);
    this.alEthFrxEthContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.frxEthAlEthContractAddress);
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
    this.curveFBPContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.curveFBPContractAddress);
    this.alUsdFraxBpContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alUsdFBPCurveContractAddress);
    this.alUsdArbitrumContract = new web3arbitrum.eth.Contract(abis.erc20LikeAbi, addresses.arbiAlUsdContractAddress);
    this.alEthArbitrumContract = new web3arbitrum.eth.Contract(abis.erc20LikeAbi, addresses.arbitrumAlEthContractAddress);
    this.fraxArbitrumContract = new web3arbitrum.eth.Contract(abis.erc20LikeAbi, addresses.arbiFraxContractAddress);
    this.usdsArbitrumContract = new web3arbitrum.eth.Contract(abis.erc20LikeAbi, addresses.arbiUsdsContractAddress);
    this.usxArbitrumContract = new web3arbitrum.eth.Contract(abis.erc20LikeAbi, addresses.arbiUsxContractAddress);
    this.veloStatsContract = new web3optimism.eth.Contract(abis.veloStatsAbi, addresses.veloStats);
    this.alUsdMetisContract = new web3metis.eth.Contract(abis.erc20LikeAbi, addresses.metisAlUsdContractAddress);
    this.alEthMetisContract = new web3metis.eth.Contract(abis.erc20LikeAbi, addresses.metisAlEthContractAddress);
  }

  componentDidMount() {
    this.aggregateWeb3Calls();
    this.getCurvePoolBalances();
    this.getLPs();
    this.getAlUsdPeg();
    this.getCoinGeckoData();
    this.getDebankData();
  }

  selectTab(active){
    this.setState({ activeTab: active });
  }

  /*calculateAlUsdArrays(result){
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
      this.setState({ dates: dates, prices: prices, volumes: volumes, alUsdMarketcaps: alUsdMarketcaps, alUsdMarketcapDates: alUsdMarketcapDates, alUsdLoading: false });
    }
  } */

  aggregateWeb3Calls(){
    let v2Caps = {}
    let tokensPerShare = { dai: 0, usdc: 0, usdt: 0, eth: 0, wstEth: 0, rEth: 0, aDai: 0, aUsdc: 0, aUsdt: 0, aWeth: 0, vaUsdc: 0, vaDai: 0, vaEth: 0 }
    let deposit = { dai: 0, usdc: 0, usdt: 0, eth: 0, wstEth: 0, rEth: 0, aDai: 0, aUsdc: 0, aUsdt: 0, aWeth: 0, vaUsdc: 0, vaDai: 0, vaEth: 0, daiInMigrate: 0, wethInMigrate: 0 }
    let alAssetSupply = {alEth: 0, alUsd: 0, alUsdOptimism: 0, nextAlUsdOptimism: 0}

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
      //this.nextAlUsdOptimismContract.methods.balanceOf(addresses.alUsdOptimismContractAddress).call()
      //this.alchemistEthOptiContract.methods.getUnderlyingTokensPerShare(addresses.optiAWethAddress).call()
    ])
      .then(([daiParams, usdcParams, usdtParams, vaUsdcParams, vaDaiParams, vaFraxParams, daiTokens, usdcTokens, usdtTokens, vaUsdcTokens, vaDaiTokens, vaFraxTokens, ethParams]) => {
        wait(2000);
        Promise.all([this.alchemistEthContract.methods.getUnderlyingTokensPerShare(addresses.yvWethAddress).call(),
          this.alchemistEthContract.methods.getYieldTokenParameters(addresses.vaEthAddress).call(),
          this.alchemistEthContract.methods.getUnderlyingTokensPerShare(addresses.vaEthAddress).call(),
          this.alchemistEthContract.methods.getYieldTokenParameters(addresses.wstEthAddress).call(),
          this.alchemistEthContract.methods.getUnderlyingTokensPerShare(addresses.wstEthAddress).call(),
          this.alchemistEthContract.methods.getYieldTokenParameters(addresses.rEthAddress).call(),
          this.alchemistEthContract.methods.getUnderlyingTokensPerShare(addresses.rEthAddress).call(),
          this.alchemistEthContract.methods.getYieldTokenParameters(addresses.sfrxEthAddress).call(),
          this.alchemistEthContract.methods.getUnderlyingTokensPerShare(addresses.sfrxEthAddress).call(),
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
          this.alchemistEthOptiContract.methods.getYieldTokenParameters(addresses.optiWstEthAddress).call(),
          this.alchemistEthOptiContract.methods.getYieldTokenParameters(addresses.optiYvWethAddress).call(),
          this.alchemistArbiContract.methods.getYieldTokenParameters(addresses.arbiAUsdcAddress).call(),
          this.alchemistEthArbiContract.methods.getYieldTokenParameters(addresses.arbiWstEthAddress).call(),
          this.wethContract.methods.balanceOf(addresses.tempMigrateEthAddress).call(),
          this.daiContract.methods.balanceOf(addresses.tempMigrateDaiAddress).call(),
          this.alEthContract.methods.totalSupply().call(),
          this.alUsdContract.methods.totalSupply().call(),
          this.alUsdOptimismContract.methods.totalSupply().call(),
          this.alUsdArbitrumContract.methods.totalSupply().call(),
          this.alUsdMetisContract.methods.totalSupply().call(),
          this.alEthOptimismContract.methods.totalSupply().call(),
          this.alEthArbitrumContract.methods.totalSupply().call(),
          this.alEthMetisContract.methods.totalSupply().call()])
        .then(([ethTokens, vaEthParams, vaEthTokens, wstEthParams, wstEthTokens, rEthParams, rEthTokens, sfrxEthParams, sfrxEthTokens, aDaiParams, aUsdcParams, aUsdtParams, aFraxParams, aWethParams, aDaiTokens, aUsdcTokens, aUsdtTokens, aFraxTokens, aWethTokens, optiADaiParams, optiAUsdcParams, optiAUsdtParams, optiAWethParams, optiWstEthParams, optiYvWethParams, arbiAUsdcParams, arbiWstEthParams, wethInMigrate, daiInMigrate, alEthSupply, alUsdSupply, alUsdSupplyOptimism, alUsdSupplyArbitrum, alUsdSupplyMetis, alEthSupplyOptimism, alEthSupplyArbitrum, alEthSupplyMetis]) => {
        v2Caps.dai = daiParams[4]/Math.pow(10, daiParams[0]);
        v2Caps.optiADai = optiADaiParams[4]/Math.pow(10, optiADaiParams[0]);
        v2Caps.usdc = usdcParams[4]/Math.pow(10, usdcParams[0]);
        v2Caps.optiAUsdc = optiAUsdcParams[4]/Math.pow(10, optiAUsdcParams[0]);
        v2Caps.usdt = usdtParams[4]/Math.pow(10, usdtParams[0]);
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
        v2Caps.optiWstEth = optiWstEthParams[4]/Math.pow(10, optiWstEthParams[0]);
        v2Caps.optiYvWeth = optiYvWethParams[4]/Math.pow(10, optiYvWethParams[0]);
        v2Caps.arbiAUsdc = arbiAUsdcParams[4]/Math.pow(10, arbiAUsdcParams[0]);
        v2Caps.arbiWstEth = arbiWstEthParams[4]/Math.pow(10, arbiWstEthParams[0]);
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
        deposit.vaDai = vaDaiParams[8]/Math.pow(10, 24);
        deposit.vaFrax = vaFraxParams[8]/Math.pow(10, 24);
        deposit.vaEth = vaEthParams[8]/Math.pow(10, 18);
        deposit.optiADai = optiADaiParams[8]/Math.pow(10, 24);
        deposit.optiAUsdc = optiAUsdcParams[8]/Math.pow(10, 12);
        deposit.optiAUsdt = optiAUsdtParams[8]/Math.pow(10, 12);
        deposit.optiAWeth = optiAWethParams[8]/Math.pow(10, 18);
        deposit.optiWstEth = optiWstEthParams[8]/Math.pow(10, 18);
        deposit.optiYvWeth = optiYvWethParams[8]/Math.pow(10, 18);
        deposit.daiInMigrate = daiInMigrate/Math.pow(10, 24);
        deposit.wethInMigrate = wethInMigrate/Math.pow(10, 18);
        alAssetSupply.alEth = alEthSupply/Math.pow(10, 18);
        alAssetSupply.alEthOptimism = alEthSupplyOptimism/Math.pow(10, 18);
        alAssetSupply.alEthArbitrum = alEthSupplyArbitrum/Math.pow(10, 18);
        alAssetSupply.alEthMetis = alEthSupplyMetis/Math.pow(10, 18);
        alAssetSupply.alUsd = alUsdSupply/Math.pow(10, 18);
        alAssetSupply.alUsdOptimism = alUsdSupplyOptimism/Math.pow(10, 18);
        alAssetSupply.alUsdArbitrum = alUsdSupplyArbitrum/Math.pow(10, 18);
        alAssetSupply.alUsdMetis = alUsdSupplyMetis/Math.pow(10, 18);
        this.setState({ v2Caps: v2Caps, tokensPerShare: tokensPerShare, v2Deposit: deposit, alAssetSupply: alAssetSupply, v2CurrentLoading: false });
        }).catch(function(err) { console.log(err.message) });
      }).catch(function(err) { console.log(err.message); });
  }

  getCurvePoolBalances(){
    let alAssetCrvSupply = { alUsd3Crv: 0, alEthFrxEthValue: 0, alUsdFraxBp: 0 };
    Promise.all([
      this.alUsd3CrvContract.methods.totalSupply().call(),
      this.alEthFrxEthContract.methods.totalSupply().call(),
      this.alEthFrxEthContract.methods.get_virtual_price().call(),
      this.alUsdFraxBpContract.methods.totalSupply().call(),
    ])
    .then(([alUsd3CrvSupply, alEthFrxEthSupply, alEthFrxEthVirtualPrice, alUsdFraxBpCrvSupply]) => {
      alAssetCrvSupply.alUsd3Crv = alUsd3CrvSupply/Math.pow(10, 18);
      alAssetCrvSupply.alEthFrxEthValue = (alEthFrxEthSupply/Math.pow(10, 18))*(alEthFrxEthVirtualPrice/Math.pow(10, 18));
      alAssetCrvSupply.alUsdFraxBp = alUsdFraxBpCrvSupply/Math.pow(10, 18);
      this.setState({ alAssetCrvSupply: alAssetCrvSupply, stakingLoading: false })
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
    let pxEthAlEth = 'sAMMV2-pxETH/alETH';
    let lps = { alUsdIn3Crv: 0, crv3In3Crv: 0, alUsdInVelodrome: 0, usdcInVelodrome: 0, alUsdInMaiVelodrome: 0, maiInMaiVelodrome: 0, alEthInVelodrome: 0, wethInVelodrome: 0, alUsdInCurveFBP: 0, fbpInCurveFBP: 0, alEthInVeloFxsEthAlEth: 0, fxsEthInVeloFxsEthAlEth: 0, fraxInVeloFraxAlUsd: 0, alUsdInVeloFraxAlUsd: 0, alEthInFrxEthCrv: 0, frxEthInFrxEthCrv: 0, pxEthInVeloAlEth: 0, alEthInVeloAlEth: 0 }
    Promise.all([this.alUsdContract.methods.balanceOf(addresses.alUsd3CrvContractAddress).call(),
      this.crv3Contract.methods.balanceOf(addresses.alUsd3CrvContractAddress).call(),
      this.alEthContract.methods.balanceOf(addresses.saddleAlEthPoolContractAddress).call(),
      this.wethContract.methods.balanceOf(addresses.saddleAlEthPoolContractAddress).call(),
      this.sEthContract.methods.balanceOf(addresses.saddleAlEthPoolContractAddress).call(),
      this.alEthContract.methods.balanceOf(addresses.frxEthAlEthContractAddress).call(),
      this.frxEthContract.methods.balanceOf(addresses.frxEthAlEthContractAddress).call(),
      this.alEthContract.methods.balanceOf(addresses.curveAlEthWethPoolContractAddress).call(),
      this.wethContract.methods.balanceOf(addresses.curveAlEthWethPoolContractAddress).call(),
      this.alUsdContract.methods.balanceOf(addresses.alUsdFBPCurveContractAddress).call(),
      this.curveFBPContract.methods.balanceOf(addresses.alUsdFBPCurveContractAddress).call(),
      //this.alEthContract.methods.balanceOf(addresses.pcsAlEthAddress).call(),
      //this.wethContract.methods.balanceOf(addresses.pcsAlEthAddress).call(),
      this.veloStatsContract.methods.all(480,0).call(),
      this.veloStatsContract.methods.all(480,480).call()
    ])
    .then(([alUsdIn3Crv, crv3In3Crv, alEthInSaddle, wethInSaddle, sEthInSaddle, alEthInFrxEthCrv, frxEthInFrxEthCrv, alEthInAlEthWethCrv, wethInAlEthWethCrv, alUsdInCurveFBP, fbpInCurveFBP, veloStats1, veloStats2]) => {
      lps.alUsdIn3Crv = alUsdIn3Crv/Math.pow(10, 18);
      lps.crv3In3Crv = crv3In3Crv/Math.pow(10, 18);
      lps.alEthInSaddle = alEthInSaddle/Math.pow(10, 18);
      lps.wethInSaddle = wethInSaddle/Math.pow(10, 18);
      lps.sEthInSaddle = sEthInSaddle/Math.pow(10, 18);
      lps.alEthInFrxEthCrv = alEthInFrxEthCrv/Math.pow(10, 18);
      lps.frxEthInFrxEthCrv = frxEthInFrxEthCrv/Math.pow(10, 18);
      lps.alEthInAlEthWethCrv = alEthInAlEthWethCrv/Math.pow(10, 18);
      lps.wethInAlEthWethCrv = wethInAlEthWethCrv/Math.pow(10, 18);
      lps.alUsdInCurveFBP = alUsdInCurveFBP/Math.pow(10, 18);
      lps.fbpInCurveFBP = fbpInCurveFBP/Math.pow(10, 18);
      let veloStats = veloStats1.concat(veloStats2)
      console.log(veloStats)
      for(let i=0;i<veloStats.length;i++){
        if(veloStats[i][1] === alUsdUsdc) {
          lps.alUsdInVelodrome = parseInt(veloStats[i][12]) / Math.pow(10,18);
          lps.usdcInVelodrome = parseInt(veloStats[i][9]) / Math.pow(10,6);
        }
        if(veloStats[i][1] === ethPool) {
          lps.alEthInVelodrome = parseInt(veloStats[i][9]) / Math.pow(10,18);
          lps.wethInVelodrome = parseInt(veloStats[i][12]) / Math.pow(10,18);
        }
        if(veloStats[i][1] === maiAlUsd) {
          lps.alUsdInMaiVelodrome = parseInt(veloStats[i][9]) / Math.pow(10,18);
          lps.maiInMaiVelodrome = parseInt(veloStats[i][12]) / Math.pow(10,18);
        }
        if(veloStats[i][1] === frxEth) {
          lps.alEthInVeloFxsEthAlEth = parseInt(veloStats[i][9]) / Math.pow(10,18);
          lps.fxsEthInVeloFxsEthAlEth = parseInt(veloStats[i][12]) / Math.pow(10,18);
        }
        if(veloStats[i][1] === fraxUsd) {
          lps.fraxInVeloFraxAlUsd = parseInt(veloStats[i][9]) / Math.pow(10,18);
          lps.alUsdInVeloFraxAlUsd = parseInt(veloStats[i][12]) / Math.pow(10,18);
        }
        if(veloStats[i][1] === pxEthAlEth) {
          //console.log("found")
          lps.pxEthInVeloAlEth = parseInt(veloStats[i][9]) / Math.pow(10,18);
          lps.alEthInVeloAlEth = parseInt(veloStats[i][12]) / Math.pow(10,18);
        }
      }
      this.setState({ lps: lps, lpsLoading: false })
    })
    .catch(function(err) {
      console.log(err.message);
    });
  }

  calculateTokenPrices(prices){
    let tokenPrices = { eth: 0, rEth: 0, wstEth: 0, sfrxEth: 0}
    tokenPrices.eth = Math.round(prices.coins["coingecko:ethereum"].price*100)/100
    tokenPrices.rEth = Math.round(prices.coins["coingecko:rocket-pool-eth"].price*100)/100
    tokenPrices.wstEth = Math.round(prices.coins["coingecko:wrapped-steth"].price*100)/100
    tokenPrices.sfrxEth = Math.round(prices.coins["coingecko:staked-frax-ether"].price*100)/100
    this.setState({ tokenPrices: tokenPrices, tokenPricesLoading: false });
  }

  calculateAlEthPeg(result){
    let alEthPeg = { date: [], peg: [], pegPerc: [] }
    let inputAmount = 2 * Math.pow(10,18);
    for(let i=0;i<result.length;i++){
      try {
        alEthPeg.date[i] = Number(result[i].timestamp*1000); 
        alEthPeg.peg[i] = inputAmount/result[i].outputAmount;
        //alEthPeg.peg[i] = result[i].outputAmount/Math.pow(10, 18)/500;
        alEthPeg.pegPerc[i] = (1-alEthPeg.peg[i])*(-100);
      }
      catch (err) {
        console.log(err);
      }
    }
    //console.log(alEthPeg.pegPerc)
    this.setState({ alEthPeg: alEthPeg, alEthPegLoading: false });
  }

  calculateAlUsdPeg(usdcPeg){
    let usdcIndex = 0;
    let alUsdPeg = { usdc: { date: [], peg: [], pegPerc: [] }};
    for(let i=0;i<usdcPeg.length;i++){
      try {
          alUsdPeg.usdc.date[usdcIndex] = Number(usdcPeg[i].timestamp*1000);
          alUsdPeg.usdc.peg[usdcIndex] = usdcPeg[i].outputAmount/Math.pow(10, 9);
          alUsdPeg.usdc.pegPerc[usdcIndex] = (1-usdcPeg[i].outputAmount/Math.pow(10, 9))*(-100);
          usdcIndex++;
      }
      catch (err) {
        console.log(err)
      }
    }
    this.setState({ alUsdPeg: alUsdPeg, alUsdPegLoading: false });
  }

  calculateOptiTvl(result){
    let dayTracker = 0;
    let alchemistTvl = { date:[], ysDAI: [], aOptDAI: [], ysUSDC: [], aOptUSDC: [], wstETH: [], ysWETH: [], aOptUSDT: [], aOptWETH: [] };
    for(let i=0;i<result.length;i++){
      if(i!==0 && result[i].day !== result[i-1].day) dayTracker++;
      alchemistTvl.date[dayTracker] = result[i].day.split(" ")[0];
      if(result[i].blockchain === "optimism" && result[i].token_symbol === "aOptDAI") alchemistTvl.aOptDAI[dayTracker] = Math.round(result[i].balance/10000)/100;
      if(result[i].blockchain === "optimism" && result[i].token_symbol === "ysUSDC") alchemistTvl.ysUSDC[dayTracker] = Math.round(result[i].balance/10000)/100;
      if(result[i].blockchain === "optimism" && result[i].token_symbol === "aOptUSDC") alchemistTvl.aOptUSDC[dayTracker] = Math.round(result[i].balance/10000)/100;
      if(result[i].blockchain === "optimism" && result[i].token_symbol === "ysDAI") alchemistTvl.ysDAI[dayTracker] = Math.round(result[i].balance/10000)/100;
      if(result[i].blockchain === "optimism" && result[i].token_symbol === "aOptUSDT") alchemistTvl.aOptUSDT[dayTracker] = Math.round(result[i].balance/10000)/100;
      if(result[i].blockchain === "optimism" && result[i].token_symbol === "ysWETH") alchemistTvl.ysWETH[dayTracker] = Math.round(result[i].balance*100)/100;
      if(result[i].blockchain === "optimism" && result[i].token_symbol === "aOptWETH") alchemistTvl.aOptWETH[dayTracker] = Math.round(result[i].balance*100)/100;
      if(result[i].blockchain === "optimism" && result[i].token_symbol === "wstETH") alchemistTvl.wstETH[dayTracker] = Math.round(result[i].balance*100)/100;
    }
    //console.log(alchemistTvl)
    this.setState({ optiTvl: alchemistTvl, optiTvlLoading: false })
  }

  calculateArbiTvl(result){
    let dayTracker = 0;
    let arbiStart = false;
    let alchemistTvl = { date:[], wstEth: [], aUsdc: [] };
    for(let i=0;i<result.length;i++){
      if(result[i].blockchain === "arbitrum") arbiStart = true;
      if(arbiStart){
        if(i!==0 && result[i].day !== result[i-1].day) dayTracker++;
        alchemistTvl.date[dayTracker] = result[i].day.split(" ")[0];
        if(result[i].blockchain === "arbitrum" && result[i].token_symbol === "aArbUSDCn") alchemistTvl.aUsdc[dayTracker] = Math.round(result[i].balance/10000)/100;
        if(result[i].blockchain === "arbitrum" && result[i].token_symbol === "wstETH") alchemistTvl.wstEth[dayTracker] = Math.round(result[i].balance*100)/100;
      }
    }
    
    //console.log(alchemistTvl)
    this.setState({ arbiTvl: alchemistTvl, arbiTvlLoading: false })
  }

  /*calculateOptiTvl(result){
    console.log(result)
    let startDate = new Date(1664365762*1000); //2022 Sept 28th
    let today = new Date();
    let dateTracker = new Date(result[0].timestamp*1000);
    let resultIndex = 0;
    let optiTvl = { date:[], aDai: [], aUsdc: [], aUsdt: [], aWeth: [], yvDai: [], yvUsdc: [], wstETH: [], yvWeth: [] };
    let tempaDai = 0;
    let tempaUsdc = 0;
    let tempaUsdt = 0;
    let tempaWeth = 0;
    let tempYvDai = 0;
    let tempYvUsdc = 0;
    let tempYvWeth = 0;
    let tempWstEth = 0;
    for(let j=0;startDate<today;j++){

      for(let i=resultIndex;i<result.length;i++){
        let tempDate = new Date(result[i].timestamp*1000);
        if(tempDate>startDate) break;

        if(!datesEqual(tempDate, dateTracker)) dateTracker = tempDate;

        tempaDai = result[i].token.symbol === "s_aOptDAI" && result[i].amount ? result[i].amount/Math.pow(10, 18) : tempaDai;
        tempaUsdc = result[i].token.symbol === "s_aOptUSDC" && result[i].amount ? result[i].amount/Math.pow(10, 6) : tempaUsdc;
        tempaUsdt = result[i].token.symbol === "s_aOptUSDT" && result[i].amount ? result[i].amount/Math.pow(10, 6) : tempaUsdt;
        tempaWeth = result[i].token.symbol === "s_aOptWETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempaWeth;
        tempYvDai = result[i].token.symbol === "" && result[i].amount ? result[i].amount/Math.pow(10, 18) : tempYvDai;
        tempYvUsdc = result[i].token.symbol === "" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempYvUsdc;
        tempYvWeth = result[i].token.symbol === "" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempYvWeth;
        tempWstEth = result[i].token.symbol === "wstETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempWstEth;
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
      optiTvl.wstETH[j] = Math.round(tempWstEth/10000)/100;
      if(j>0 && !tempWstEth) optiTvl.wstETH[j] = optiTvl.wstETH[j-1];
      optiTvl.date[j] = formatDate(startDate, 0);
      startDate.setDate(startDate.getDate() + 1);
      /*tempaDai = 0;
      tempaUsdc = 0;
      tempaUsdt = 0;
    }
    console.log(optiTvl)
    this.setState({ optiTvl: optiTvl, optiTvlLoading: false });
  }

  calculateArbiTvl(result){
    //console.log(result)
    let startDate = new Date(1711407600*1000); //2024-03-26
    let today = new Date();
    let dateTracker = new Date(result[0].timestamp*1000);
    let resultIndex = 0;
    let arbiTvl = { date:[], wstEth: [], aUsdc: [] };
    let tempWstEth = 0;
    let tempAUsdc = 0;
    for(let j=0;startDate<today;j++){

      for(let i=resultIndex;i<result.length;i++){
        let tempDate = new Date(result[i].timestamp*1000);
        if(tempDate>startDate) break;

        if(!datesEqual(tempDate, dateTracker)) dateTracker = tempDate;

        tempWstEth = result[i].token.symbol === "wstETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempWstEth;
        tempAUsdc = result[i].token.symbol === "s_aArbUSDC" && result[i].amount ? result[i].amount/Math.pow(10, 6) : tempAUsdc;
        resultIndex++;
      }
      arbiTvl.wstEth[j] = Math.round(tempWstEth/10000)/100;
      if(j>0 && !tempWstEth) arbiTvl.wstEth[j] = arbiTvl.wstEth[j-1];
      arbiTvl.aUsdc[j] = Math.round(tempAUsdc/10000)/100;
      if(j>0 && !tempAUsdc) arbiTvl.aUsdc[j] = arbiTvl.aUsdc[j-1];
      arbiTvl.date[j] = formatDate(startDate, 0);
      startDate.setDate(startDate.getDate() + 1);
    }
    //console.log(arbiTvl)
    this.setState({ arbiTvl: arbiTvl, arbiTvlLoading: false });
  }*/

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

  calculateAlcxData(prices, alcxSupply){
    let burnAmount = 478612;
    let alcxData = { 
      currentSupply: Math.round(alcxSupply/Math.pow(10,18)-burnAmount), 
      price: Math.round(prices.coins["coingecko:alchemix"].price*100)/100,
      marketcap: Math.round((alcxSupply/Math.pow(10,18)-burnAmount)*prices.coins["coingecko:alchemix"].price/10000)/100
    }
    this.setState({ 
      alcxData: alcxData,
      alcxDataLoading: false 
    });
  }

  getCoinGeckoData(){
    Promise.all([fetch("https://coins.llama.fi/prices/current/coingecko:ethereum,coingecko:wrapped-steth,coingecko:rocket-pool-eth,coingecko:staked-frax-ether,coingecko:alchemix?searchWidth=4h").then(res => res.json()),
      this.alcxContract.methods.totalSupply().call()])
      .then(([prices, alcxSupply]) => {
        this.calculateTokenPrices(prices)
        this.calculateAlcxData(prices, alcxSupply);
    })
    .catch(function(err) {
      console.log(err.message);
    });
  }

  isStrategic(object){
    if(object === "sdCRV" || object === "CVX" || object === "VELO" || object === "SDT" || object === "AERO" || 
    object === "AURA" || object === "FXS" || object === "RAM" || object === "PREMIA") return true;
    else return false;
  }

  calculateDebankData(data){
    //treasury1, treasury2, sdCrvController, optimismMs, arbitrumMs, baseMs, metisMs, tokensTreasury1, tokensTreasury2, tokensSdCrvController, tokensOptimismMs, tokensArbitrumMs, tokensBaseMs, tokensMetisMs, elixirAlUsdFraxBp, elixirAlEthFrxEth, elixirOpti, elixirArbi, totalElixirAlUsdFraxBp, totalElixirAlEthFrxEth, totalElixirOpti, totalElixirArbi, tokensElixirAlUsdFraxBp, tokensElixirAlEthFrxEth, tokensElixirOpti, tokensElixirArbi, ramsesAlEthFrxEthPool, ramsesAlUsdFraxPool, veloAlEthWethPool, veloAlUsdUsdcPool){
    //let totalTreasuryA = totalTreasury1.total_usd_value + totalTreasury2.total_usd_value + totalSdCrvController.total_usd_value + totalOptimismMs.total_usd_value + totalArbitrumMs.total_usd_value;
    let totalTreasury = 0;
    let totalTreasuryStrategic = 0;
    let alcxInTreasury = 0;
    let alUsdInElixir = 0;
    let alUsdAmountInElixir = 0;
    let alEthInElixir = 0;
    let alEthAmountInElixir = 0;
    let alUsdFraxBpInElixir = 0;
    let alEthFrxEthInElixir = 0;
    let alUsdFraxArbiInElixir = 0;
    let alEthFrxEthArbiInElixir = 0;
    let alUsdUsdcVeloInElixir = 0;
    let alEthWethVeloInElixir = 0;
    let alEthFrxEthVeloInElixir = 0;
    let alEthPxEthVeloInElixir = 0;
    let alUsdBackingTokensInElixir = 0;
    let alEthBackingTokensInElixir = 0;
    let alUsdOptimismBackingTokensInElixir = 0;
    let alEthOptimismBackingTokensInElixir = 0;
    let alUsdArbitrumBackingTokensInElixir = 0;
    let alEthArbitrumBackingTokensInElixir = 0;
    let alUsdAmountInOptimismElixir = 0;
    let alEthAmountInOptimismElixir = 0;
    let symbols = [];
    let elixirSymbols = [];
    let treasuryAssets = {};
    let treasuryAssetsStrategic = {};
    let sortedTreasuryAssets = [];
    let sortedTreasuryStrategicAssets = [];
    let elixirAssets = {};
    let sortedElixirAssets = [];
    //let alUsd3CrvConvexId = '0x02e2151d4f351881017abdf2dd2b51150841d5b3';
    let alUsdFraxbpConvexId = '0x41a5881c17185383e19df6fa4ec158a6f4851a69:19';
    let alEthFrxEthConvexId = '0x41a5881c17185383e19df6fa4ec158a6f4851a69:54';
    let alEthFrxEthRamsesId = '0xc3f26d2fa16129a8d4a5a0f94d25f2cdd9005cdb';
    let alUsdFraxRamsesId = '0x43fbf34df6da5fc66e15e023d3b690fd0de33cd7';
    let alEthWethVelodromeId = '0xc16adbf2d01d6524b79cbb610ce31d5db80eee3c';
    let alUsdUsdcVelodromeId = '0xe8b219c285e4e4ec28ac80fdc4b9739b18cb8890';
    let alEthPxEthVelodromeId = '0x28cd6d3471e031f8b380a64e9da3b9b12a473186';
    let alEthFrxEthVelodromeId = '0xfc0b9a9c2b63e6acaca91a77a80bfa83c615e6c5';
    let ramsesAlEthFrxEthAddress = '0xfb4fe921f724f3c7b610a826c827f9f6ecef6886';
    let ramsesAlUsdFraxAddress = '0xfd599db360cd9713657c95df66650a427d213010';
    let veloAlEthWethAddress = '0xa1055762336F92b4B8d2eDC032A0Ce45ead6280a';
    let veloAlUsdUsdcAddress = '0x124d69daeda338b1b31ffc8e429e39c9a991164e';
    let veloAlEthFrxEthAddress = '0x1ad06ca54de04dbe9e2817f4c13ecb406dcbeaf0';
    let veloAlEthPxEthAddress = '0x03799d6a59624abdd50f8774d360a64f4fbfdcf5';
    
    let tempDebankCalc = {};
    //let tokensConcat = tokensTreasury1.concat(tokensTreasury2).concat(tokensSdCrvController).concat(tokensOptimismMs).concat(tokensArbitrumMs).concat(tokensBaseMs).concat(tokensMetisMs);
    //let protocolsConcat = treasury1.concat(treasury2).concat(sdCrvController).concat(optimismMs).concat(arbitrumMs).concat(baseMs).concat(metisMs);
    //let elixirTokensConcat = tokensElixirAlUsdFraxBp.concat(tokensElixirAlEthFrxEth).concat(tokensElixirOpti).concat(tokensElixirArbi);
    //let elixirProtocolsConcat = elixirAlUsdFraxBp.concat(elixirAlEthFrxEth).concat(elixirOpti).concat(elixirArbi);
    let tokensConcat = [];
    let protocolsConcat = [];
    let elixirTokensConcat = [];
    let elixirProtocolsConcat = [];

    let ramsesAlEthFrxEthPool;
    let ramsesAlUsdFraxPool;
    let veloAlEthWethPool;
    let veloAlUsdUsdcPool;
    let veloAlEthFrxEthPool;
    let veloAlEthPxEthPool;

    for(let i=0;i<data.pools.length;i++){
      if(data.pools[i].address === ramsesAlEthFrxEthAddress) ramsesAlEthFrxEthPool = data.pools[i].total_balance.total_usd_value;
      if(data.pools[i].address === ramsesAlUsdFraxAddress) ramsesAlUsdFraxPool = data.pools[i].total_balance.total_usd_value;
      if(data.pools[i].address === veloAlEthWethAddress) veloAlEthWethPool = data.pools[i].total_balance.total_usd_value;
      if(data.pools[i].address === veloAlUsdUsdcAddress) veloAlUsdUsdcPool = data.pools[i].total_balance.total_usd_value;
      if(data.pools[i].address === veloAlEthFrxEthAddress) veloAlEthFrxEthPool = data.pools[i].total_balance.total_usd_value;
      if(data.pools[i].address === veloAlEthPxEthAddress) veloAlEthPxEthPool = data.pools[i].total_balance.total_usd_value;
    }


    for(let i=0;i<data.treasury.length;i++){
      tokensConcat = tokensConcat.concat(data.treasury[i].tokenList)
      protocolsConcat = protocolsConcat.concat(data.treasury[i].complexList)
    }

    for(let i=0;i<data.elixir.length;i++){
      elixirTokensConcat = elixirTokensConcat.concat(data.elixir[i].tokenList)
      elixirProtocolsConcat = elixirProtocolsConcat.concat(data.elixir[i].complexList)
    }


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
      if(this.isStrategic(filteredSymbols[i])) treasuryAssetsStrategic[filteredSymbols[i]] = 0
      else treasuryAssets[filteredSymbols[i]] = 0
    }

    for(let i=0;i<protocolsConcat.length;i++){
      for(let j=0;j<protocolsConcat[i].portfolio_item_list.length;j++){
        for(let k=0;k<protocolsConcat[i].portfolio_item_list[j].asset_token_list.length;k++){
          if(this.isStrategic(protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol)) {
            treasuryAssetsStrategic[protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol] += protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
            totalTreasuryStrategic += protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
          }
          else {
            treasuryAssets[protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol] += protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
            if(protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "ALCX") alcxInTreasury += protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
            totalTreasury += protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;

          }
        }
      }
    }

    treasuryAssetsStrategic["FXS"] += treasuryAssets["sdFXS"];
    treasuryAssets["sdFXS"] = 0;

    for(let i=0;i<tokensConcat.length;i++){
      if(this.isStrategic(tokensConcat[i].symbol)) {
        treasuryAssetsStrategic[tokensConcat[i].symbol] += tokensConcat[i].amount * tokensConcat[i].price;
        totalTreasuryStrategic += tokensConcat[i].amount * tokensConcat[i].price;
      }
      else {
        treasuryAssets[tokensConcat[i].symbol] += tokensConcat[i].amount * tokensConcat[i].price;
        if(tokensConcat[i].symbol === "ALCX") alcxInTreasury += tokensConcat[i].amount * tokensConcat[i].price;
        totalTreasury += tokensConcat[i].amount * tokensConcat[i].price;
      }
    }

    /*for(let i=0;i<protocolsConcat.length;i++){
      for(let j=0;j<protocolsConcat[i].portfolio_item_list.length;j++){
        for(let k=0;k<protocolsConcat[i].portfolio_item_list[j].asset_token_list.length;k++){
          treasuryAssetsStrategic[protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol] += protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
          if(protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "ALCX") alcxInTreasury += protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * protocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
        }
      }
    }
    for(let i=0;i<tokensConcat.length;i++){
      treasuryAssetsStrategic[tokensConcat[i].symbol] += tokensConcat[i].amount * tokensConcat[i].price;
    }*/



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


    let largestValueStrategic = 0;
    let largestIndexStrategic = 0;
    for(let i=0;i<filteredSymbols.length;i++){
      for(let j=0;j<filteredSymbols.length;j++){
        if(treasuryAssetsStrategic[filteredSymbols[j]] > largestValueStrategic) {
          largestValueStrategic = treasuryAssetsStrategic[filteredSymbols[j]];
          largestIndexStrategic = j;
        }
      }
      let pushObject = {
        symbol: filteredSymbols[largestIndexStrategic],
        amount: treasuryAssetsStrategic[filteredSymbols[largestIndexStrategic]]
      };
      sortedTreasuryStrategicAssets.push(pushObject)
      filteredSymbols.splice(largestIndexStrategic, 1);
      largestIndexStrategic = 0;
      largestValueStrategic = 0;
    }

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

    //console.log(elixirProtocolsConcat)

    for(let i=0;i<elixirProtocolsConcat.length;i++){
      for(let j=0;j<elixirProtocolsConcat[i].portfolio_item_list.length;j++){
        for(let k=0;k<elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list.length;k++){
          elixirAssets[elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol] += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
          //if(elixirProtocolsConcat[i].portfolio_item_list[j].pool.id === "0x172a58d5e8c11ee554b09d924d5e2c3afadd44c0" && (elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "alUSD" || elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "USDC")) alUsdOptimismBackingTokensInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount;
          if(elixirProtocolsConcat[i].portfolio_item_list[j].pool.id === "0xb1494dcade9b7678692def8da0129e28a209b026" && (elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "alETH" || elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "ETH")) alEthOptimismBackingTokensInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount;
          else if(elixirProtocolsConcat[i].portfolio_item_list[j].pool.id === alUsdUsdcVelodromeId) {
            if(elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "alUSD" || elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "USDC") alUsdOptimismBackingTokensInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount;
            alUsdUsdcVeloInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
          }
          else if(elixirProtocolsConcat[i].portfolio_item_list[j].pool.id === alEthWethVelodromeId) alEthWethVeloInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
          else if(elixirProtocolsConcat[i].portfolio_item_list[j].pool.id === alEthFrxEthVelodromeId) alEthFrxEthVeloInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
          else if(elixirProtocolsConcat[i].portfolio_item_list[j].pool.id === alEthPxEthVelodromeId) alEthPxEthVeloInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
          else if(elixirProtocolsConcat[i].portfolio_item_list[j].pool.id === alUsdFraxRamsesId) {
            if(elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "alUSD" || elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "FRAX") alUsdArbitrumBackingTokensInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount;
            alUsdFraxArbiInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
          }
          else if(elixirProtocolsConcat[i].portfolio_item_list[j].pool.id === alEthFrxEthRamsesId) {
            if(elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "alETH" || elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "frxETH") alEthArbitrumBackingTokensInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount;
            alEthFrxEthArbiInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
          } 
          else {
            if(elixirProtocolsConcat[i].portfolio_item_list[j].pool.id === alUsdFraxbpConvexId) alUsdFraxBpInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
            if(elixirProtocolsConcat[i].portfolio_item_list[j].pool.id === alEthFrxEthConvexId) alEthFrxEthInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
            if(elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "alUSD" ||
            elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "FRAX" ||
            elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "USDC") alUsdBackingTokensInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount;
            if(elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "alETH" ||
            elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "frxETH") alEthBackingTokensInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount;
          }
        }
      }
    }

    

    for(let i=0;i<elixirTokensConcat.length;i++){
      //if(elixirTokensConcat[i].symbol !== "alUSD") elixirAssets[elixirTokensConcat[i].symbol] += elixirTokensConcat[i].amount * elixirTokensConcat[i].price;
      if(elixirTokensConcat[i].symbol === "alUSD") {
        if(elixirTokensConcat[i].chain === "eth"){
          alUsdInElixir += elixirTokensConcat[i].amount * elixirTokensConcat[i].price;
          alUsdAmountInElixir += elixirTokensConcat[i].amount;
        }
        if(elixirTokensConcat[i].chain === "op"){
          alUsdAmountInOptimismElixir += elixirTokensConcat[i].amount;
        }
      }
      if(elixirTokensConcat[i].symbol === "alETH") {
        if(elixirTokensConcat[i].chain === "eth"){
          alEthInElixir += elixirTokensConcat[i].amount * elixirTokensConcat[i].price;
          alEthAmountInElixir += elixirTokensConcat[i].amount;
        }
        if(elixirTokensConcat[i].chain === "op"){
          alEthAmountInOptimismElixir += elixirTokensConcat[i].amount;
        }
      }
    }

    /*let elixirLargestValue = 0;
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
    }*/
    
    let totalElixir = alEthFrxEthInElixir + alUsdFraxBpInElixir + alEthFrxEthArbiInElixir + alUsdFraxArbiInElixir + alEthWethVeloInElixir + alUsdUsdcVeloInElixir + alEthFrxEthVeloInElixir + alEthPxEthVeloInElixir;

    tempDebankCalc = {
      totalTreasury: totalTreasury,
      totalTreasuryStrategic: totalTreasuryStrategic,
      totalElixir: totalElixir,
      sortedTreasuryAssets: sortedTreasuryAssets,
      sortedTreasuryStrategicAssets: sortedTreasuryStrategicAssets,
      sortedElixirAssets: sortedElixirAssets,
      nonAlcxTreasury: totalTreasury + totalTreasuryStrategic - alcxInTreasury,
      alcxInTreasury: alcxInTreasury,
      alEthFrxEthInElixir: alEthFrxEthInElixir,
      alEthFrxEthRamsesInElixir: alEthFrxEthArbiInElixir,
      alUsdFraxRamsesInElixir: alUsdFraxArbiInElixir,
      alEthWethVeloInElixir: alEthWethVeloInElixir,
      alUsdUsdcVeloInElixir: alUsdUsdcVeloInElixir,
      alEthFrxEthVeloInElixir: alEthFrxEthVeloInElixir,
      alEthPxEthVeloInElixir: alEthPxEthVeloInElixir,
      alEthOptimismBackingTokensInElixir: alEthOptimismBackingTokensInElixir,
      alUsdOptimismBackingTokensInElixir: alUsdOptimismBackingTokensInElixir,
      alEthArbitrumBackingTokensInElixir: alEthArbitrumBackingTokensInElixir,
      alUsdArbitrumBackingTokensInElixir: alUsdArbitrumBackingTokensInElixir,
      alUsdInElixir: alUsdInElixir,
      alEthInElixir: alEthInElixir,
      alEthAmountInElixir: alEthAmountInElixir,
      alUsdAmountInOptimismElixir: alUsdAmountInOptimismElixir,
      alEthAmountInOptimismElixir: alEthAmountInOptimismElixir,
      alUsdFraxBpInElixir: alUsdFraxBpInElixir,
      alUsdBackingTokensInElixir: alUsdBackingTokensInElixir,
      alEthBackingTokensInElixir: alEthBackingTokensInElixir,
      alUsdAmountInElixir: alUsdAmountInElixir,
      ramsesAlEthFrxEthPool: ramsesAlEthFrxEthPool,
      ramsesAlUsdFraxPool: ramsesAlUsdFraxPool,
      veloAlEthWethPool: veloAlEthWethPool,
      veloAlUsdUsdcPool: veloAlUsdUsdcPool,
      veloAlEthFrxEthPool: veloAlEthFrxEthPool,
      veloAlEthPxEthPool: veloAlEthPxEthPool
    }
    this.setState({ debankDataLoading: false, debankData: tempDebankCalc })
  }

  getDebankData(){
      
      let authorizationHeader = {
        method: 'GET',
        headers: { 
          'pinata_api_key': '7237805a818b4433e8a1',
          'pinata_secret_api_key': '1b5bf925a71ba50d2649a1861e00210ac142a74a20562f743f160d6d820cad23'
        }
      }
      fetch("https://api.pinata.cloud/data/pinList?includeCount=false&metadata[name]=debank.json&status=pinned&pageLimit=1000", authorizationHeader).then(res => res.json()).then(
          (result) => { 
            //console.log(result);

            let url = "https://ipfs.imimim.info/ipfs/" + result.rows[0].ipfs_pin_hash;
            fetch(url).then(res => res.json()).then(
              (result2) => { 
                this.calculateDebankData(result2) },
              (error) => { console.log(error) })
          
          },
          (error) => { console.log(error) })


    /*
    let requestHeader = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        //'AccessKey': '472fd8246ad62e329d470811c36759d49708c2fc'
      }
    }

    Promise.all([fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0x9e2b6378ee8ad2a4a95fe481d63caba8fb0ebbf9&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0x8392f6669292fa56123f71949b52d883ae57e225&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0x3216d2a52f0094aa860ca090bc5c335de36e6273&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0xc224bf25dcc99236f00843c7d8c4194abe8aa94a&chain_ids=op", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0x7e108711771dfdb10743f016d46d75a9379ca043&chain_ids=arb", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0x24e9cbb9ddda1247ae4b4eeee3c569a2190ac401&chain_ids=base", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0x0f5c3a8b62ff7639895bb9737c5befb711c4f7f4&chain_ids=metis", requestHeader).then(res => res.json()),
    //fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0x9e2b6378ee8ad2a4a95fe481d63caba8fb0ebbf9&chain_ids=eth", requestHeader).then(res => res.json()),
    //fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0x8392f6669292fa56123f71949b52d883ae57e225&chain_ids=eth", requestHeader).then(res => res.json()),
    //fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0x3216d2a52f0094aa860ca090bc5c335de36e6273&chain_ids=eth", requestHeader).then(res => res.json()),
    //fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0xc224bf25dcc99236f00843c7d8c4194abe8aa94a&chain_ids=op", requestHeader).then(res => res.json()),
    //fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0x7e108711771dfdb10743f016d46d75a9379ca043&chain_ids=arb", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0x9e2b6378ee8ad2a4a95fe481d63caba8fb0ebbf9&chain_id=eth&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0x8392f6669292fa56123f71949b52d883ae57e225&chain_id=eth&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0x3216d2a52f0094aa860ca090bc5c335de36e6273&chain_id=eth&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0xc224bf25dcc99236f00843c7d8c4194abe8aa94a&chain_id=op&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0x7e108711771dfdb10743f016d46d75a9379ca043&chain_id=arb&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0x24e9cbb9ddda1247ae4b4eeee3c569a2190ac401&chain_id=base&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0x0f5c3a8b62ff7639895bb9737c5befb711c4f7f4&chain_id=metis&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0x06378717d86b8cd2dba58c87383da1eda92d3495&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0x9fb54d1f6f506feb4c65b721be931e59bb538c63&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0xb29617209961db995dd30a4ab94ba0034a4284f9&chain_ids=op", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0xb10356c80658fc71da0ff4d28052b62f9ed7d7e8&chain_ids=arb", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0x06378717d86b8cd2dba58c87383da1eda92d3495&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0x9fb54d1f6f506feb4c65b721be931e59bb538c63&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0xb29617209961db995dd30a4ab94ba0034a4284f9&chain_ids=op", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0xb10356c80658fc71da0ff4d28052b62f9ed7d7e8&chain_ids=arb", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0x06378717d86b8cd2dba58c87383da1eda92d3495&chain_id=eth&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0x9fb54d1f6f506feb4c65b721be931e59bb538c63&chain_id=eth&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0xb29617209961db995dd30a4ab94ba0034a4284f9&chain_id=op&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0xb10356c80658fc71da0ff4d28052b62f9ed7d7e8&chain_id=arb&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0xfb4fe921f724f3c7b610a826c827f9f6ecef6886&chain_ids=arb", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0xfd599db360cd9713657c95df66650a427d213010&chain_ids=arb", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0xa1055762336F92b4B8d2eDC032A0Ce45ead6280a&chain_ids=op", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0x124d69daeda338b1b31ffc8e429e39c9a991164e&chain_ids=op", requestHeader).then(res => res.json()),

    ])
    .then(([treasury1, treasury2, sdCrvController, optimismMs, arbitrumMs, baseMs, metisMs, tokensTreasury1, tokensTreasury2, tokensSdCrvController, tokensOptimismMs, tokensArbitrumMs, tokensBaseMs, tokensMetisMs, elixirAlUsdFraxBp, elixirAlEthFrxEth, elixirOpti, elixirArbi, totalElixirAlUsdFraxBp, totalElixirAlEthFrxEth, totalElixirOpti, totalElixirArbi, tokensElixirAlUsdFraxBp, tokensElixirAlEthFrxEth, tokensElixirOpti, tokensElixirArbi, ramsesAlEthFrxEthPool, ramsesAlUsdFraxPool, veloAlEthWethPool, veloAlUsdUsdcPool]) => {
          this.calculateDebankData(treasury1, treasury2, sdCrvController, optimismMs, arbitrumMs, baseMs, metisMs, tokensTreasury1, tokensTreasury2, tokensSdCrvController, tokensOptimismMs, tokensArbitrumMs, tokensBaseMs, tokensMetisMs, elixirAlUsdFraxBp, elixirAlEthFrxEth, elixirOpti, elixirArbi, totalElixirAlUsdFraxBp, totalElixirAlEthFrxEth, totalElixirOpti, totalElixirArbi, tokensElixirAlUsdFraxBp, tokensElixirAlEthFrxEth, tokensElixirOpti, tokensElixirArbi, ramsesAlEthFrxEthPool, ramsesAlUsdFraxPool, veloAlEthWethPool, veloAlUsdUsdcPool)
      }).catch(function(err) { console.log(err) });*/
    
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

  getPegQuery2(alAsset, collateralToken, tradeSize, skip){
    return `{
      poolHistoricalRates(
        first: 1000
        orderBy: timestamp
        orderDirection: desc
      ) {
        inputAmount
        outputAmount
        timestamp
        inputToken
        outputToken
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
    const usdcPegQuery = this.getPegQuery(addresses.alUsdAddress, addresses.usdcAddress, Math.pow(10, 21), 0);
    const alEthPegQuery = this.getPegQuery(addresses.frxEthAddress, addresses.frxEthAddress, Math.pow(10,18)*2, 0);
    const alchemistTvl = this.getAlchemistTvlQuery(0);

    let authorizationHeader = {
      method: 'GET',
      headers: { 
        'pinata_api_key': '7237805a818b4433e8a1',
        'pinata_secret_api_key': '1b5bf925a71ba50d2649a1861e00210ac142a74a20562f743f160d6d820cad23'
      }
    }

    Promise.all([fetch("https://gateway-arbitrum.network.thegraph.com/api/c1a654d7642ea0e30d259cd58e8b41d5/subgraphs/id/FQHEgGziETEqw7oV32wLvFGCPthqj5YDMm7jhVtLn5PJ", this.getSubgraphRequestOptions(usdcPegQuery)).then(res => res.json()),
      fetch("https://gateway-arbitrum.network.thegraph.com/api/c1a654d7642ea0e30d259cd58e8b41d5/subgraphs/id/FQHEgGziETEqw7oV32wLvFGCPthqj5YDMm7jhVtLn5PJ", this.getSubgraphRequestOptions(alEthPegQuery)).then(res => res.json()),
      fetch("https://api.goldsky.com/api/public/project_cltwyhnfyl4z001x17t5odo5x/subgraphs/alchemix-mainnet/1.0.1/gn", this.getSubgraphRequestOptions(alchemistTvl)).then(res => res.json()),
      fetch("https://api.pinata.cloud/data/pinList?includeCount=false&metadata[name]=tvlHistory.json&status=pinned", authorizationHeader).then(res => res.json()),
      fetch("https://gateway.thegraph.com/api/c1a654d7642ea0e30d259cd58e8b41d5/subgraphs/id/Dgjyhh69XooHPd4JjvT3ik9FaGAR3w7sUSQyQ1YDakGp", this.getSubgraphRequestOptions(alchemistTvl)).then(res => res.json())])
      .then(([usdcPeg, alEthPeg, alchemistTvl, ipfsOptiFile, arbiAlchemistTvl]) => {
        this.calculateAlUsdPeg(usdcPeg.data.poolHistoricalRates.reverse())
        this.calculateAlEthPeg(alEthPeg.data.poolHistoricalRates.reverse())
        //this.calculateOptiTvl(optiAlchemistTvl.result.rows)
        //this.calculateArbiTvl(arbiAlchemistTvl.data.alchemistTVLHistories.reverse())
        this.calculateAlchemistTvl(alchemistTvl.data.alchemistTVLHistories.reverse())
        //console.log(ipfsOptiFile)
        let url = "https://ipfs.imimim.info/ipfs/" + ipfsOptiFile.rows[0].ipfs_pin_hash;
        fetch(url).then(res => res.json()).then(
          (l2AlchemistTvl) => { 
            this.calculateOptiTvl(l2AlchemistTvl)
            this.calculateArbiTvl(l2AlchemistTvl)
          },
          (error) => { console.log(error) })
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
  let v2EthUsdTVL = (this.state.tokenPricesLoading || this.state.v2CurrentLoading) ? 0 : Math.round(v2EthTVL*this.state.tokenPrices.eth/10000)/100;
  let v2vaEthTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.vaEth*this.state.tokensPerShare.vaEth);
  let v2vaEthUsdTVL = (this.state.tokenPricesLoading || this.state.v2CurrentLoading) ? 0 : Math.round(v2vaEthTVL*this.state.tokenPrices.eth/10000)/100;
  let arbiAUsdcTVL = this.state.arbiTvlLoading ? 0 : Math.round(this.state.arbiTvl.aUsdc[this.state.arbiTvl.aUsdc.length-1]*100)/100;
  let v2aWethTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.aWeth*this.state.tokensPerShare.aWeth);
  let v2aWethUsdTVL = (this.state.tokenPricesLoading || this.state.v2CurrentLoading) ? 0 : Math.round(v2aWethTVL*this.state.tokenPrices.eth/10000)/100;
  let optiAWethTVL = this.state.optiTvlLoading ? 0 : Math.round(this.state.optiTvl.aOptWETH[this.state.optiTvl.aOptWETH.length-1]*100)/100;
  let optiAWethUsdTVL = (this.state.tokenPricesLoading || this.state.optiTvlLoading) ? 0 : Math.round(optiAWethTVL*this.state.tokenPrices.eth/10000)/100;
  let optiWstEthTVL = this.state.optiTvlLoading ? 0 : Math.round(this.state.optiTvl.wstETH[this.state.optiTvl.wstETH.length-1]*100)/100;
  let optiWstEthUsdTVL = (this.state.tokenPricesLoading || this.state.optiTvlLoading) ? 0 : Math.round(optiWstEthTVL*this.state.tokenPrices.eth/10000)/100;
  let optiYvWethTVL = this.state.optiTvlLoading ? 0 : Math.round(this.state.optiTvl.ysWETH[this.state.optiTvl.ysWETH.length-1]*100)/100;
  let optiYvWethUsdTVL = (this.state.tokenPricesLoading || this.state.optiTvlLoading) ? 0 : Math.round(optiYvWethTVL*this.state.tokenPrices.eth/10000)/100;
  let arbiWstEthTVL = this.state.arbiTvlLoading ? 0 : Math.round(this.state.arbiTvl.wstEth[this.state.arbiTvl.wstEth.length-1]*100)/100;
  let arbiWstEthUsdTVL = (this.state.tokenPricesLoading || this.state.arbiTvlLoading) ? 0 : Math.round(arbiWstEthTVL*this.state.tokenPrices.eth/10000)/100;
  let v2RethTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.rEth*this.state.tokensPerShare.rEth);
  let v2RethUsdTVL = (this.state.tokenPricesLoading || this.state.v2CurrentLoading) ? 0 : Math.round(this.state.v2Deposit.rEth*this.state.tokenPrices.rEth/10000)/100;
  let v2SfrxEthTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.sfrxEth*this.state.tokensPerShare.sfrxEth);
  let v2SfrxEthUsdTVL = (this.state.tokenPricesLoading || this.state.v2CurrentLoading) ? 0 : Math.round(this.state.v2Deposit.sfrxEth*this.state.tokenPrices.sfrxEth/10000)/100;
  let v2StethTVL = this.state.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.wstEth*this.state.tokensPerShare.wstEth);
  let v2StethUsdTVL = (this.state.v2CurrentLoading || this.state.tokenPricesLoading) ? 0 : Math.round(this.state.v2Deposit.wstEth*this.state.tokenPrices.wstEth/10000)/100;
  let alcxTotalMarketcap = (this.state.alcxDataLoading || this.state.debankDataLoading) ? 0 : Math.round(this.state.alcxData.marketcap*100 + this.state.debankData.alcxInTreasury/10000)/100;
  let alEthFrxEthTotalValue = (this.state.tokenPricesLoading || this.state.stakingLoading) ? 0 : this.state.alAssetCrvSupply.alEthFrxEthValue * this.state.tokenPrices.eth;
  let wethInMigrateUsd = (this.state.v2CurrentLoading || this.state.tokenPricesLoading) ? 0 : this.state.v2Deposit.wethInMigrate*this.state.tokenPrices.eth/Math.pow(10,6);
  let ethDeposits = this.props.v2CurrentLoading ? 0 : Math.round(this.state.v2Deposit.wethInMigrate + v2EthTVL + v2aWethTVL + v2StethTVL + v2RethTVL + v2vaEthTVL + v2SfrxEthTVL + optiAWethTVL + optiWstEthTVL + optiYvWethTVL + arbiWstEthTVL);
  let stablecoinDeposits = this.props.v2CurrentLoading ? 0 : Math.round((this.state.v2Deposit.daiInMigrate + v2DaiTVL + v2UsdcTVL + v2UsdtTVL + v2aDaiTVL + v2aUsdcTVL + v2aUsdtTVL + v2vaUsdcTVL + v2vaDaiTVL + this.state.v2Deposit.optiADai + this.state.v2Deposit.optiAUsdc + this.state.v2Deposit.optiAUsdt + arbiAUsdcTVL)*100)/100;
  let ethDepositsUsd = Math.round((wethInMigrateUsd + v2EthUsdTVL + v2aWethUsdTVL + v2StethUsdTVL + v2RethUsdTVL + v2vaEthUsdTVL + v2SfrxEthUsdTVL + optiAWethUsdTVL + optiWstEthUsdTVL + optiYvWethUsdTVL + arbiWstEthUsdTVL)*100)/100;
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
        alAssetSupply={this.state.alAssetSupply} ethDeposits={ethDeposits} stablecoinDeposits={stablecoinDeposits} ethDepositsUsd={ethDepositsUsd}
        alchemistTvl={this.state.alchemistTvl} lps={this.state.lps} ethPrice={this.state.tokenPrices.eth}
        alUsdPeg={this.state.alUsdPeg} alEthPeg={this.state.alEthPeg} v2Caps={this.state.v2Caps}
        tokenPricesLoading={this.state.tokenPricesLoading} debankData={this.state.debankData} tokensPerShare={this.state.tokensPerShare}
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
                {this.state.activeTab === "transmuters" ? 
                <div className="general-switcher-buttons-active" onClick={() => {this.selectTab("transmuters")}}>
                    <img src={ require('./logos/other_logo.png').default } alt="alethcurve logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Other</div>
                </div> :
                <div className="general-switcher-buttons-inactive" onClick={() => {this.selectTab("transmuters")}}>
                    <img src={ require('./logos/other_logo.png').default } alt="alethcurve logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Other</div>
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
          <div className="general-switcher-container">
              <div className="menu-switcher">
                {this.state.activeTab === "transmuters" ? 
                <div className="general-switcher-buttons-active" onClick={() => {this.selectTab("transmuters")}}>
                    <img src={ require('./logos/other_logo.png').default } alt="revenues logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Other</div>
                </div> :
                <div className="general-switcher-buttons-inactive" onClick={() => {this.selectTab("transmuters")}}>
                    <img src={ require('./logos/other_logo.png').default } alt="revenues logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Other</div>
                </div>}
            </div>
          </div>
      </div>
      <br/>
      <br/>
      {this.state.activeTab !== "emissions" ? "" :
      <Emissions alcxData={this.state.alcxData} alcxDataLoading={this.state.alcxDataLoading} alcxTotalMarketcap={alcxTotalMarketcap} />
      }
      {this.state.activeTab !== "deposits" ? "" : ((this.state.tokenPricesLoading || this.state.v2CurrentLoading || this.state.alchemistTvlLoading || this.state.optiTvlLoading) || this.state.arbiTvlLoading ? "Loading..." :
        <Deposits
          v2DaiTVL={v2DaiTVL} v2UsdcTVL={v2UsdcTVL} v2UsdtTVL={v2UsdtTVL} v2vaUsdcTVL={v2vaUsdcTVL} v2vaDaiTVL={v2vaDaiTVL} v2vaEthTVL={v2vaEthTVL} v2vaEthUsdTVL={v2vaEthUsdTVL} 
          v2Caps={this.state.v2Caps} v2EthUsdTVL={v2EthUsdTVL} v2StethUsdTVL={v2StethUsdTVL} v2RethUsdTVL={v2RethUsdTVL} v2EthTVL={v2EthTVL}
          v2StethTVL={v2StethTVL} v2RethTVL={v2RethTVL} v2aDaiTVL={v2aDaiTVL} v2aUsdcTVL={v2aUsdcTVL} v2aUsdtTVL={v2aUsdtTVL} 
          v2aWethTVL={v2aWethTVL} v2aWethUsdTVL={v2aWethUsdTVL} alchemixStaking={this.state.alchemixStaking}
          v2Deposit={this.state.v2Deposit} wethInMigrateUsd={wethInMigrateUsd} optiYvWethTVL={optiYvWethTVL} optiYvWethUsdTVL={optiYvWethUsdTVL}
          tokenPrices={this.state.tokenPrices} v2aFraxTVL={v2aFraxTVL} v2vaFraxTVL={v2vaFraxTVL} arbiTvl={this.state.arbiTvl}
          alchemistTvl={this.state.alchemistTvl} optiTvl={this.state.optiTvl} optiAWethTVL={optiAWethTVL} optiAWethUsdTVL={optiAWethUsdTVL}
          v2sfrxEthTVL={v2SfrxEthTVL} v2sfrxEthUsdTVL={v2SfrxEthUsdTVL} optiWstEthTVL={optiWstEthTVL} optiWstEthUsdTVL={optiWstEthUsdTVL}
          arbiWstEthTVL={arbiWstEthTVL} arbiWstEthUsdTVL={arbiWstEthUsdTVL}
        />)}

      {this.state.activeTab !== "treasury" ? "" :
      <Treasury
        debankData={this.state.debankData}
        debankDataLoading={this.state.debankDataLoading}
        alAssetCrvSupply={this.state.alAssetCrvSupply}
        alEthFrxEthTotalValue={alEthFrxEthTotalValue}
        />}
      
      {this.state.activeTab !== "revenues" ? "" : 
      <Revenues ethPrice={this.state.tokenPrices.eth} v2EthTVL={v2EthTVL} v2StethTVL={v2StethTVL} v2RethTVL={v2RethTVL}
      v2DaiTVL={v2DaiTVL} v2UsdcTVL={v2UsdcTVL} v2UsdtTVL={v2UsdtTVL}
      v2aDaiTVL={v2aDaiTVL} v2aUsdcTVL={v2aUsdcTVL} v2aUsdtTVL={v2aUsdtTVL} v2aWethTVL={v2aWethTVL} />
      }

      {this.state.activeTab !== "alassets" ? "" : ((this.state.alUsdPegLoading || this.state.alEthPegLoading || this.state.lpsLoading || this.state.tokenPricesLoading || this.state.v2CurrentLoading || this.state.debankDataLoading) ? "Loading..." :
      <AlAssets 
          alUsdPeg={this.state.alUsdPeg} alEthPeg={this.state.alEthPeg} lps={this.state.lps} ethPrice={this.state.tokenPrices.eth}
          alAssetSupply={this.state.alAssetSupply} debankData={this.state.debankData}
      />)
      }

      {this.state.activeTab !== "harvests" ? "" :
      <Harvests harvests={this.state.harvests} />
      }

      {this.state.activeTab !== "transmuters" ? "" :
      <Transmuters transmuters={this.state.transmuters} />
      }

    </div>
  );
}
}