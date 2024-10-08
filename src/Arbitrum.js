import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Web3 from 'web3';
import ChartAlusdPrice from './charts/ChartAlusdPrice';
import ChartAlEthPrice from './charts/ChartAlEthPrice';
import { Link } from "react-router-dom";
import { formatDate, datesEqual } from './Functions';
import { addresses, abis } from './Constants';
import ChartArbiAlchemistTVL from './charts/ChartArbiAlchemistTVL';
import ChartArbiAlchemistEthTVL from './charts/ChartArbiAlchemistEthTVL';
import ChartDebtUsd from './charts/ChartDebtUsd';
import ChartDebtEth from './charts/ChartDebtEth';
import DataTable from 'react-data-table-component';
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
import LoadingComponent from './LoadingComponent';

//const web3 = new Web3('https://eth-mainnet.gateway.pokt.network/v1/5f3453978e354ab992c4da79');
//const web3 = new Web3('https://eth-mainnet.g.alchemy.com/v2/m4nhopYhysiwNnoLZ7vnyxxwjHHtYcKP');
const web3 = new Web3('https://rpc.ankr.com/eth');
//const web3ftm = new Web3('https://rpcapi-tracing.fantom.network');
//const web3optimism = new Web3('https://mainnet.optimism.io');
const web3optimism = new Web3('https://opt-mainnet.g.alchemy.com/v2/p9poBr_K0kBvzVt3V6Lo1wasL9r32FpP');
const web3arbitrum = new Web3('https://rpc.ankr.com/arbitrum')

export default class Arbitrum extends React.Component {

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
      debt: {},
      alAssetCrvSupply: {},
      debankData: {},
      alAssetSupply: {},
      positionCount: 0,
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
      debtLoading: true,
      positionCountLoading: true,
      activeTab: 'treasury'
    };
    this.selectTab = this.selectTab.bind(this);

    this.alchemistContract = new web3.eth.Contract(abis.alchemistAbi, addresses.alchemistV2Address);
    this.alchemistEthContract = new web3.eth.Contract(abis.alchemistAbi, addresses.alchemistEthV2Address);
    this.alchemistOptiContract = new web3optimism.eth.Contract(abis.alchemistAbi, addresses.alchemistOptiAddress);
    this.alchemistEthOptiContract = new web3optimism.eth.Contract(abis.alchemistAbi, addresses.alchemistEthOptiAddress);
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
    this.fraxArbitrumContract = new web3arbitrum.eth.Contract(abis.erc20LikeAbi, addresses.arbiFraxContractAddress);
    this.usdsArbitrumContract = new web3arbitrum.eth.Contract(abis.erc20LikeAbi, addresses.arbiUsdsContractAddress);
    this.usxArbitrumContract = new web3arbitrum.eth.Contract(abis.erc20LikeAbi, addresses.arbiUsxContractAddress);
    this.veloStatsContract = new web3optimism.eth.Contract(abis.veloStatsAbi, addresses.veloStats);
    this.nextAlUsdOptimismContract = new web3optimism.eth.Contract(abis.erc20LikeAbi, addresses.nextAlUsdOptimism);

  }

  componentDidMount() {
    this.aggregateWeb3Calls();
    this.getCurvePoolBalances();
    this.getLPs();
    this.getAlUsdPeg();
    this.getCoinGeckoData();
    this.getDebankData();
    this.getGlobalDebt();
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
      this.alchemistEthContract.methods.getUnderlyingTokensPerShare(addresses.yvWethAddress).call(),
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
      this.wethContract.methods.balanceOf(addresses.tempMigrateEthAddress).call(),
      this.daiContract.methods.balanceOf(addresses.tempMigrateDaiAddress).call(),
      this.alEthContract.methods.totalSupply().call(),
      this.alUsdContract.methods.totalSupply().call(),
      this.alUsdOptimismContract.methods.totalSupply().call(),
      this.nextAlUsdOptimismContract.methods.balanceOf(addresses.alUsdOptimismContractAddress).call()
      //this.alchemistEthOptiContract.methods.getUnderlyingTokensPerShare(addresses.optiAWethAddress).call()
    ])
      .then(([daiParams, usdcParams, usdtParams, vaUsdcParams, vaDaiParams, vaFraxParams, daiTokens, usdcTokens, usdtTokens, vaUsdcTokens, vaDaiTokens, vaFraxTokens, ethParams, ethTokens, vaEthParams, vaEthTokens, wstEthParams, wstEthTokens, rEthParams, rEthTokens, sfrxEthParams, sfrxEthTokens, aDaiParams, aUsdcParams, aUsdtParams, aFraxParams, aWethParams, aDaiTokens, aUsdcTokens, aUsdtTokens, aFraxTokens, aWethTokens, optiADaiParams, optiAUsdcParams, optiAUsdtParams, optiAWethParams, wethInMigrate, daiInMigrate, alEthSupply, alUsdSupply, alUsdSupplyOptimism, nextAlUsdSupplyOptimism]) => {
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
        deposit.daiInMigrate = daiInMigrate/Math.pow(10, 24);
        deposit.wethInMigrate = wethInMigrate/Math.pow(10, 18);
        alAssetSupply.alEth = alEthSupply/Math.pow(10, 18);
        alAssetSupply.alUsd = alUsdSupply/Math.pow(10, 18);
        alAssetSupply.alUsdOptimism = alUsdSupplyOptimism/Math.pow(10, 18);
        alAssetSupply.nextAlUsdOptimism = nextAlUsdSupplyOptimism/Math.pow(10, 18);
        this.setState({ v2Caps: v2Caps, tokensPerShare: tokensPerShare, v2Deposit: deposit, alAssetSupply: alAssetSupply, v2CurrentLoading: false });
    })
    .catch(function(err) {
      console.log(err.message);
    });
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
    let lps = { alUsdIn3Crv: 0, crv3In3Crv: 0, alUsdInVelodrome: 0, usdcInVelodrome: 0, alUsdInMaiVelodrome: 0, maiInMaiVelodrome: 0, alEthInVelodrome: 0, wethInVelodrome: 0, alUsdInCurveFBP: 0, fbpInCurveFBP: 0, alEthInVeloFxsEthAlEth: 0, fxsEthInVeloFxsEthAlEth: 0, fraxInVeloFraxAlUsd: 0, alUsdInVeloFraxAlUsd: 0, alEthInFrxEthCrv: 0, frxEthInFrxEthCrv: 0 }
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
      this.veloStatsContract.methods.all(300,0,"0x0000000000000000000000000000000000000000").call()
    ])
    .then(([alUsdIn3Crv, crv3In3Crv, alEthInSaddle, wethInSaddle, sEthInSaddle, alEthInFrxEthCrv, frxEthInFrxEthCrv, alEthInAlEthWethCrv, wethInAlEthWethCrv, alUsdInCurveFBP, fbpInCurveFBP, veloStats]) => {
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

  calculateTokenPrices(prices){
    let tokenPrices = { eth: 0, rEth: 0, wstEth: 0, sfrxEth: 0}
    tokenPrices.eth = Math.round(prices.coins["coingecko:ethereum"].price*100)/100
    tokenPrices.rEth = Math.round(prices.coins["coingecko:rocket-pool-eth"].price*100)/100
    tokenPrices.wstEth = Math.round(prices.coins["coingecko:wrapped-steth"].price*100)/100
    tokenPrices.sfrxEth = Math.round(prices.coins["coingecko:staked-frax-ether"].price*100)/100
    this.setState({ tokenPrices: tokenPrices, tokenPricesLoading: false });
  }

  calculateAlEthPeg(result){
    //console.log(result)
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
          alUsdPeg.usdc.peg[usdcIndex] = usdcPeg[i].outputAmount/Math.pow(10, 12);
          alUsdPeg.usdc.pegPerc[usdcIndex] = (1-usdcPeg[i].outputAmount/Math.pow(10, 12))*(-100);
          usdcIndex++;
      }
      catch (err) {
        console.log(err)
      }
    }
    this.setState({ alUsdPeg: alUsdPeg, alUsdPegLoading: false });
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
    object === "AURA" || object === "FXS" || object === "RAM" || object === "PREMIA" || object === "sdFXS") return true;
    else return false;
  }

  calculateDebankData(treasury1, treasury2, sdCrvController, optimismMs, arbitrumMs, baseMs, tokensTreasury1, tokensTreasury2, tokensSdCrvController, tokensOptimismMs, tokensArbitrumMs, tokensBaseMs, elixir3crv, elixirAlUsdFraxBp, elixirAlEthFrxEth, elixirOpti, elixirArbi, totalElixir3crv, totalElixirAlUsdFraxBp, totalElixirAlEthFrxEth, totalElixirOpti, totalElixirArbi, tokensElixir3crv, tokensElixirAlUsdFraxBp, tokensElixirAlEthFrxEth, tokensElixirOpti, tokensElixirArbi){
    //let totalTreasuryA = totalTreasury1.total_usd_value + totalTreasury2.total_usd_value + totalSdCrvController.total_usd_value + totalOptimismMs.total_usd_value + totalArbitrumMs.total_usd_value;
    let totalTreasury = 0;
    let totalTreasuryStrategic = 0;
    let alcxInTreasury = 0;
    let alUsdCrvInElixir = 0;
    let alUsdInElixir = 0;
    let alUsdAmountInElixir = 0;
    let alEthInElixir = 0;
    let alEthAmountInElixir = 0;
    let alUsdFraxBpInElixir = 0;
    let alEthFrxEthInElixir = 0;
    let alUsdBackingTokensInElixir = 0;
    let alEthBackingTokensInElixir = 0;
    let alUsdInOptimismElixir = 0;
    let alEthInOptimismElixir = 0;
    let symbols = [];
    let elixirSymbols = [];
    let treasuryAssets = {};
    let treasuryAssetsStrategic = {};
    let sortedTreasuryAssets = [];
    let sortedTreasuryStrategicAssets = [];
    let elixirAssets = {};
    let sortedElixirAssets = [];
    let alUsd3CrvConvexId = '0x02e2151d4f351881017abdf2dd2b51150841d5b3';
    let alUsdFraxbpConvexId = '0x41a5881c17185383e19df6fa4ec158a6f4851a69:19';
    let alEthFrxEthConvexId = '0x41a5881c17185383e19df6fa4ec158a6f4851a69:54';

    let tempDebankCalc = {};
    let tokensConcat = tokensTreasury1.concat(tokensTreasury2).concat(tokensSdCrvController).concat(tokensOptimismMs).concat(tokensArbitrumMs).concat(tokensBaseMs);
    let protocolsConcat = treasury1.concat(treasury2).concat(sdCrvController).concat(optimismMs).concat(arbitrumMs).concat(baseMs);
    let elixirTokensConcat = tokensElixir3crv.concat(tokensElixirAlUsdFraxBp).concat(tokensElixirAlEthFrxEth).concat(tokensElixirOpti)//.concat(tokensElixirArbi);
    let elixirProtocolsConcat = elixir3crv.concat(elixirAlUsdFraxBp).concat(elixirAlEthFrxEth).concat(elixirOpti)//.concat(elixirArbi);

    //console.log(elixirProtocolsConcat)

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
          if(elixirProtocolsConcat[i].portfolio_item_list[j].pool.id === "0x172a58d5e8c11ee554b09d924d5e2c3afadd44c0" && (elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "alUSD" || elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "USDC")) alUsdInOptimismElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount;
          else if(elixirProtocolsConcat[i].portfolio_item_list[j].pool.id === "0xb1494dcade9b7678692def8da0129e28a209b026" && (elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "alETH" || elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "ETH")) alEthInOptimismElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount;
          else {
            if(elixirProtocolsConcat[i].portfolio_item_list[j].pool.controller === alUsd3CrvConvexId) alUsdCrvInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
            if(elixirProtocolsConcat[i].portfolio_item_list[j].pool.id === alUsdFraxbpConvexId) alUsdFraxBpInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
            if(elixirProtocolsConcat[i].portfolio_item_list[j].pool.id === alEthFrxEthConvexId) alEthFrxEthInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
            if(elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "alUSD" ||
            elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "FRAX" ||
            elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "USDC" ||
            elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "DAI" ||
            elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "USDT") alUsdBackingTokensInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount;
            if(elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "alETH" ||
            elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].symbol === "frxETH") alEthBackingTokensInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount;
          }
        }
      }
    }

    

    for(let i=0;i<elixirTokensConcat.length;i++){
      //if(elixirTokensConcat[i].symbol !== "alUSD") elixirAssets[elixirTokensConcat[i].symbol] += elixirTokensConcat[i].amount * elixirTokensConcat[i].price;
      if(elixirTokensConcat[i].symbol === "alUSD") {
        alUsdInElixir += elixirTokensConcat[i].amount * elixirTokensConcat[i].price;
        alUsdAmountInElixir += elixirTokensConcat[i].amount;
      }
      if(elixirTokensConcat[i].symbol === "alETH") {
        alEthInElixir += elixirTokensConcat[i].amount * elixirTokensConcat[i].price;
        alEthAmountInElixir += elixirTokensConcat[i].amount;
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
    
    let totalElixir = totalElixir3crv.total_usd_value + totalElixirAlUsdFraxBp.total_usd_value + totalElixirAlEthFrxEth.total_usd_value - alUsdInElixir - alEthInElixir;

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
      alUsdCrvInElixir: alUsdCrvInElixir,
      alUsdInElixir: alUsdInElixir,
      alEthInElixir: alEthInElixir,
      alEthAmountInElixir: alEthAmountInElixir,
      alUsdFraxBpInElixir: alUsdFraxBpInElixir,
      alUsdBackingTokensInElixir: alUsdBackingTokensInElixir,
      alEthBackingTokensInElixir: alEthBackingTokensInElixir,
      alUsdAmountInElixir:alUsdAmountInElixir,
      alUsdInOptimismElixir: alUsdInOptimismElixir
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
    fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0x24e9cbb9ddda1247ae4b4eeee3c569a2190ac401&chain_ids=base", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0x9e2b6378ee8ad2a4a95fe481d63caba8fb0ebbf9&chain_id=eth&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0x8392f6669292fa56123f71949b52d883ae57e225&chain_id=eth&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0x3216d2a52f0094aa860ca090bc5c335de36e6273&chain_id=eth&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0xc224bf25dcc99236f00843c7d8c4194abe8aa94a&chain_id=op&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0x7e108711771dfdb10743f016d46d75a9379ca043&chain_id=arb&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0x24e9cbb9ddda1247ae4b4eeee3c569a2190ac401&chain_id=base&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0x9735f7d3ea56b454b24ffd74c58e9bd85cfad31b&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0x06378717d86b8cd2dba58c87383da1eda92d3495&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0x9fb54d1f6f506feb4c65b721be931e59bb538c63&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0xb29617209961db995dd30a4ab94ba0034a4284f9&chain_ids=op", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/all_complex_protocol_list?id=0xb10356c80658fc71da0ff4d28052b62f9ed7d7e8&chain_ids=arb", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0x9735f7d3ea56b454b24ffd74c58e9bd85cfad31b&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0x06378717d86b8cd2dba58c87383da1eda92d3495&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0x9fb54d1f6f506feb4c65b721be931e59bb538c63&chain_ids=eth", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0xb29617209961db995dd30a4ab94ba0034a4284f9&chain_ids=op", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/total_balance?id=0xb10356c80658fc71da0ff4d28052b62f9ed7d7e8&chain_ids=arb", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0x9735f7d3ea56b454b24ffd74c58e9bd85cfad31b&chain_id=eth&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0x06378717d86b8cd2dba58c87383da1eda92d3495&chain_id=eth&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0x9fb54d1f6f506feb4c65b721be931e59bb538c63&chain_id=eth&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0xb29617209961db995dd30a4ab94ba0034a4284f9&chain_id=op&is_all=false", requestHeader).then(res => res.json()),
    fetch("https://pro-openapi.debank.com/v1/user/token_list?id=0xb10356c80658fc71da0ff4d28052b62f9ed7d7e8&chain_id=arb&is_all=false", requestHeader).then(res => res.json()),
    ])
    .then(([treasury1, treasury2, sdCrvController, optimismMs, arbitrumMs, baseMs, tokensTreasury1, tokensTreasury2, tokensSdCrvController, tokensOptimismMs, tokensArbitrumMs, tokensBaseMs, elixir3crv, elixirAlUsdFraxBp, elixirAlEthFrxEth, elixirOpti, elixirArbi, totalElixir3crv, totalElixirAlUsdFraxBp, totalElixirAlEthFrxEth, totalElixirOpti, totalElixirArbi, tokensElixir3crv, tokensElixirAlUsdFraxBp, tokensElixirAlEthFrxEth, tokensElixirOpti, tokensElixirArbi]) => {
          this.calculateDebankData(treasury1, treasury2, sdCrvController, optimismMs, arbitrumMs, baseMs, tokensTreasury1, tokensTreasury2, tokensSdCrvController, tokensOptimismMs, tokensArbitrumMs, tokensBaseMs, elixir3crv, elixirAlUsdFraxBp, elixirAlEthFrxEth, elixirOpti, elixirArbi, totalElixir3crv, totalElixirAlUsdFraxBp, totalElixirAlEthFrxEth, totalElixirOpti, totalElixirArbi, tokensElixir3crv, tokensElixirAlUsdFraxBp, tokensElixirAlEthFrxEth, tokensElixirOpti, tokensElixirArbi)
      }).catch(function(err) { console.log(err) });
    
  }

  calculateGlobalDebt(result){
    //console.log(result)
      let startDate = new Date(1711407600*1000); //March 16th
      let today = new Date();
      let dateTracker = new Date(result[0].block.timestamp*1000);
      let resultIndex = 0;
      let debt = { date:[], usd: [], eth: [] };
      let tempUsd = 0;
      let tempEth = 0;
      for(let j=0;startDate<today;j++){
  
        for(let i=resultIndex;i<result.length;i++){
          let tempDate = new Date(result[i].block.timestamp*1000);
          if(tempDate>startDate) break;
  
          if(!datesEqual(tempDate, dateTracker)) dateTracker = tempDate;
          //console.log(result[i].alchemist.id === addresses.alchemistV2Address)
          tempUsd = result[i].alchemist.id === addresses.alchemistArbiAddress ? result[i].debt/Math.pow(10, 18) : tempUsd;
          tempEth = result[i].alchemist.id === addresses.alchemistArbiEthAddress ? result[i].debt/Math.pow(10, 12) : tempEth;
          resultIndex++;
        }
        debt.usd[j] = Math.round(tempUsd/10000)/100;
        if(j>0 && !tempUsd) debt.usd[j] = debt.usd[j-1];
        debt.eth[j] = Math.round(tempEth/10000)/100;
        if(j>0 && !tempEth) debt.eth[j] = debt.eth[j-1];
        debt.date[j] = formatDate(startDate, 0);
        startDate.setDate(startDate.getDate() + 1);
        tempUsd = 0;
        tempEth = 0;
      }
      //console.log(debt)
      this.setState({ debt: debt, debtLoading: false });
    }

    calculateUsersWithPositions(result){
      //console.log(result)
      let ids = {}
      let id = 0;
      const data = []
      for(let i=0;i<result.length;i++){
        ids[result[i].account.id] = 1;
        data.push({ id: id, account: result[i].account.id, token: result[i].yieldToken.symbol, amount: result[i].underlyingValue})
        id++;
      }
      console.log(data)
      this.setState({ positionCountLoading: false, positionCount: Object.keys(ids).length, depositorPositions: data })
    }

  getDebtQuery(skip){
    return `{
      alchemistGlobalDebtHistories(
        first: 1000
        skip: ` + skip + `
        orderBy: timestamp
        orderDirection: desc
      ){
        alchemist {
          id
        }
        debt
        block {
          timestamp
        }
      }
    }`
  }

  getGlobalDebt(){
    const globalDebt = this.getDebtQuery(0);

    Promise.all([fetch("https://api.goldsky.com/api/public/project_cltwyhnfyl4z001x17t5odo5x/subgraphs/alchemix-arb/1.0.0/gn", this.getSubgraphRequestOptions(globalDebt)).then(res => res.json())])
      .then(([globalDebt]) => {
        this.calculateGlobalDebt(globalDebt.data.alchemistGlobalDebtHistories.reverse())
    })
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

  getUsersWithPositionsQuery(){
    return `{
      alchemistBalanceHistories {
        account {
          id
        }
        timestamp
        underlyingValue
        alchemist {
          id
        }
        yieldToken {
          id
          name
          symbol
        }
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
    const usersWithPositions = this.getUsersWithPositionsQuery();
    const alchemistTvl = this.getAlchemistTvlQuery(0);
    const alchemistTvlSkip1000 = this.getAlchemistTvlQuery(1000);

    Promise.all([fetch("https://api.goldsky.com/api/public/project_cltwyhnfyl4z001x17t5odo5x/subgraphs/alchemix-mainnet/1.0.1/gn", this.getSubgraphRequestOptions(usdcPegQuery)).then(res => res.json()),
      fetch("https://api.goldsky.com/api/public/project_cltwyhnfyl4z001x17t5odo5x/subgraphs/alchemix-mainnet/1.0.1/gn", this.getSubgraphRequestOptions(alEthPegQuery)).then(res => res.json()),
      fetch("https://api.goldsky.com/api/public/project_cltwyhnfyl4z001x17t5odo5x/subgraphs/alchemix-mainnet/1.0.1/gn", this.getSubgraphRequestOptions(alchemistTvl)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2_optimisim", this.getSubgraphRequestOptions(alchemistTvl)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2_optimisim", this.getSubgraphRequestOptions(alchemistTvlSkip1000)).then(res => res.json()),
      fetch("https://api.goldsky.com/api/public/project_cltwyhnfyl4z001x17t5odo5x/subgraphs/alchemix-arb/1.0.0/gn", this.getSubgraphRequestOptions(usersWithPositions)).then(res => res.json()),
      fetch("https://api.goldsky.com/api/public/project_cltwyhnfyl4z001x17t5odo5x/subgraphs/alchemix-arb/1.0.0/gn", this.getSubgraphRequestOptions(alchemistTvl)).then(res => res.json())])
      .then(([usdcPeg, alEthPeg, alchemistTvl, optiAlchemistTvl, optiAlchemistTvlSkip1000, arbiUsersWithPositions, arbiAlchemistTvl]) => {
        this.calculateAlUsdPeg(usdcPeg.data.poolHistoricalRates.reverse())
        this.calculateAlEthPeg(alEthPeg.data.poolHistoricalRates.reverse())
        this.calculateOptiTvl(optiAlchemistTvl.data.alchemistTVLHistories.concat(optiAlchemistTvlSkip1000.data.alchemistTVLHistories).reverse())
        this.calculateArbiTvl(arbiAlchemistTvl.data.alchemistTVLHistories.reverse())
        this.calculateAlchemistTvl(alchemistTvl.data.alchemistTVLHistories.reverse())
        this.calculateUsersWithPositions(arbiUsersWithPositions.data.alchemistBalanceHistories)
    })
    .catch(function(err) {
      console.log(err.message);
    });
    
  }

  render() {
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

  const columns = [
    {
      name: 'Account',
      selector: row => row.account,
    },
    {
      name: 'Token',
      selector: row => row.token,
    },
    {
      name: 'Amount',
      selector: row => row.amount,
    }
  ];


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


    {this.state.positionCountLoading ? "" : <DataTable
			columns={columns}
			data={this.state.depositorPositions}
      pagination
		/>}

      <h1>General metrics</h1>

      <iframe src="https://dune.com/embeds/3598809/6063422/" width="100%" height="400" title="Chart 1" />

      <iframe src="https://dune.com/embeds/3596709/6059711/" width="100%" height="400" title="Chart 2" />

      4<br/>
      Protocol fees - missing<br/>

      <div className="section-wrapper">
        <div className="tvl-tables-2">
          <div className="small-table">
              <h3>ARB distributed to Depositors</h3>
              <div className="small-table-inner-map">
              <div className="map-row"><span className="small-table-row">Week of Distribution</span><span className="table-text-bold">ARB amount</span></div>
              <div className="map-row"><span className="small-table-row">2024-06-01</span><span className="table-text-bold">800</span></div>
              <div className="map-row"><span className="small-table-row">2024-06-08</span><span className="table-text-bold">800</span></div>
              <div className="map-row"><span className="small-table-row">2024-06-15</span><span className="table-text-bold">800</span></div>
                
              <div className="map-row"><span className="small-table-row-2">TOTAL</span><span className="important-3">75k</span></div>
              </div>
          </div>
          <div className="small-table">
              <h3>ARB distributed to LPs</h3>
              <div className="small-table-inner-map">
              <div className="map-row"><span className="small-table-row">Week of Distribution</span><span className="table-text-bold">ARB amount</span></div>
              <div className="map-row"><span className="small-table-row">2024-06-01</span><span className="table-text-bold">800</span></div>
              <div className="map-row"><span className="small-table-row">2024-06-08</span><span className="table-text-bold">800</span></div>
              <div className="map-row"><span className="small-table-row">2024-06-15</span><span className="table-text-bold">800</span></div>
                
              <div className="map-row"><span className="small-table-row-2">TOTAL</span><span className="important-3">75k</span></div>
              </div>
          </div>
        </div>
      </div>
      7<br/>
      Incentivized Users and their current deposit in Alchemix - Need to check this<br/>

      <h1 id="tvl">CDP metrics</h1>
      {this.state.arbiTvlLoading ? <LoadingComponent /> :
      <div className="section-wrapper">
          <div className="chart-title">
            <h3>Arbitrum Stablecoin TVL</h3>
            <ChartArbiAlchemistTVL arbiTvl={this.state.arbiTvl} />
          </div>
          <div className="chart-title">
            <h3>Arbitrum Eth TVL</h3>
            <ChartArbiAlchemistEthTVL arbiTvl={this.state.arbiTvl} />
          </div>
      </div>}

      <div className="section-wrapper">
        <div className="chart-title">
            <h3>alUSD Alchemist debt</h3>
            {this.state.debtLoading ? <LoadingComponent /> :
            <ChartDebtUsd debt={this.state.debt} />}
            </div>
        <div className="chart-title">
            <h3>alETH Alchemist debt</h3>
            {this.state.debtLoading ? <LoadingComponent /> :
            <ChartDebtEth debt={this.state.debt} />}
        </div>
      </div>

      <iframe src="https://dune.com/embeds/3596721/6059721/" width="100%" height="400" title="Chart 3" />

      <iframe src="https://dune.com/embeds/3596725/6059726/" width="100%" height="400" title="Chart 4" />

      <iframe src="https://dune.com/embeds/3598906/6063602/" width="100%" height="400" title="Chart 5" />
      <iframe src="https://dune.com/embeds/3598873/6063582/" width="100%" height="400" title="Chart 6" />

      <iframe src="https://dune.com/embeds/3596688/6059673/" width="100%" height="400" title="Chart 7" />

      <iframe src="https://dune.com/embeds/3596950/6060151/" width="100%" height="400" title="Chart 8" />

      <iframe src="https://dune.com/embeds/3599123/6063967/" width="100%" height="400" title="Chart 9" />
      <iframe src="https://dune.com/embeds/3599181/6064068/" width="100%" height="400" title="Chart 10" />

      <div className="section-wrapper">
        <div className="chart-title">
          <h3>alUSD Price</h3>          
          {this.state.alUsdPegLoading ? <LoadingComponent /> :
          <ChartAlusdPrice data={this.state.alUsdPeg} />}
        </div>
      </div>

      <div className="section-wrapper">
        <div className="chart-title">
          <h3>alETH Price</h3>          
          {this.state.alEthPegLoading ? <LoadingComponent /> :
          <ChartAlEthPrice alEthPeg={this.state.alEthPeg} />}
        </div>
      </div>

      <iframe src="https://dune.com/embeds/3601394/6067906/" width="100%" height="400" title="Chart 11" />
      <iframe src="https://dune.com/embeds/3601388/6067895/" width="100%" height="400" title="Chart 12" />
      <iframe src="https://dune.com/embeds/3601391/6067901/" width="100%" height="400" title="Chart 13" />
      <iframe src="https://dune.com/embeds/3603283/6071135/" width="100%" height="400" title="Chart 14" />

    </div>
  );
}
}