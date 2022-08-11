import React from 'react';
import './App.css';
import Web3 from 'web3';
import ChartCrvPoolRatios from './charts/ChartCrvPoolRatios';
//import ChartQuartiles from './charts/ChartQuartiles';
import Deposits from './Deposits';
import AlAssets from './AlAssets';
import Harvests from './Harvests';
import Emissions from './Emissions';
import Overview from './Overview';
import Debt from './Debt';
import { formatDate, datesEqual} from './Functions';
import { addresses, abis } from './Constants';
import { Button, ButtonGroup } from '@mui/material';

//const web3 = new Web3('https://mainnet.strongblock.com/acffa3b1546d7f2fa9e6e4d974497e331f2f82d7');
const web3 = new Web3('https://eth-mainnet.gateway.pokt.network/v1/5f3453978e354ab992c4da79');
const web3ftm = new Web3('https://rpcapi-tracing.fantom.network');
const web3optimism = new Web3('https://mainnet.optimism.io');

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dates: [],
      prices: [],
      volumes: [],
      alUsdMarketcaps: [],
      alUsdMarketcapDates: [],
      vaultV1Tvls: {},
      tokenPrices: {},
      alcxData: {},
      alUsdPeg: {},
      alEthPeg: {},
      v2Caps: {},
      v2Deposit: {},
      tokensPerShare: {},
      treasury: {},
      lps: {},
      alcxEthSlp: {},
      alchemixStaking: {},
      alchemistTvl: {},
      ftmTvl: {},
      harvests: {},
      alAssetCrvSupply: {},
      tokenPricesLoading: true,
      vaultTvlsLoading: true,
      v2CurrentLoading: true,
      treasuryLoading: true,
      lpsLoading: true,
      alUsdPegLoading: true,
      alEthPegLoading: true,
      alcxDataLoading: true,
      alchemistTvlLoading: true,
      ftmTvlLoading: true,
      harvestsLoading: true,
      alUsdLoading: true,
      activeTab: 'emissions'
    };
    this.selectTab = this.selectTab.bind(this);

    this.alchemistContract = new web3.eth.Contract(abis.alchemistAbi, addresses.alchemistV2Address);
    this.alchemistEthContract = new web3.eth.Contract(abis.alchemistAbi, addresses.alchemistEthV2Address);
    this.alchemistFtmContract = new web3ftm.eth.Contract(abis.alchemistAbi, addresses.ftmAlchemistContractAddress);
    this.cvxAlUsd3CrvStakingContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.cvxAlUsd3CrvStakingContractAddress);
    this.cvxAlEthCrvStakingContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.cvxAlEthCrvStakingContractAddress);
    this.vlCvxTrackerContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.vlCvxTrackerAddress);
    this.tAlcxContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.tAlcxAddress);
    this.alcxContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alcxAddress);
    this.tokeStakingContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.tokeStakingContractAddress);
    this.masterChefContract = new web3.eth.Contract(abis.masterChefAbi, addresses.masterChefAddress);
    this.alcxEthSlpContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alcxEthSlpAddress);
    this.wethContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.wethAddress);
    //this.abraAlcxCauldronContract = new web3.eth.Contract(abis.abraCauldronAbi, addresses.abraAlcxCauldronAddress);
    this.saddleAlEthContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.saddleAlEthContractAddress);
    this.alUsd3CrvContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alUsd3CrvContractAddress);
    this.alUsdContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alUsdAddress);
    this.fraxContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.fraxAddress);
    this.feiContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.feiAddress);
    this.lUsdContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.lUsdAddress);
    this.crv3Contract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.crv3Address);
    this.alEthCrvContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alEthCrvContractAddress);
    this.veSdtContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.veSdtContractAddress);
    this.sdCrvContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.sdCrvGaugeContractAddress);
    this.sEthContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.sEthAddress);
    this.alEthContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alEthAddress);
    this.daiContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.daiAddress);
    this.alUsdOptimismContract = new web3optimism.eth.Contract(abis.erc20LikeAbi, addresses.alUsdOptimismContractAddress);
    this.alEthOptimismContract = new web3optimism.eth.Contract(abis.erc20LikeAbi, addresses.alEthOptimismContractAddress);
    this.usdcOptimismContract = new web3optimism.eth.Contract(abis.erc20LikeAbi, addresses.usdcOptimismContractAddress);
    this.wethOptimismContract = new web3optimism.eth.Contract(abis.erc20LikeAbi, addresses.wethOptimismContractAddress);
    this.beetsVaultContract = new web3ftm.eth.Contract(abis.beetsVaultAbi, addresses.beetsVaultContractAddress);
    this.saddleFBPContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.saddleFBPContractAddress);
    this.curveFBPContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.curveFBPContractAddress);
  }

  componentDidMount() {
    this.getFlipsideCryptoData();
    this.aggregateWeb3Calls();
    this.getTreasury();
    this.getLPs();
    this.getAlUsdPeg();
    this.getCoinGeckoData();
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
      this.setState({ dates: dates, prices: prices, volumes: volumes, alUsdMarketcaps: alUsdMarketcaps, alUsdMarketcapDates: alUsdMarketcapDates, alUsdLoading: false });
    }
  } 

  aggregateWeb3Calls(){
    let v2Caps = { dai: 0, usdc: 0, usdt: 0, eth: 0, wstEth: 0, rEth: 0 }
    let tokensPerShare = { dai: 0, usdc: 0, usdt: 0, eth: 0, wstEth: 0, rEth: 0 }
    let deposit = { dai: 0, usdc: 0, usdt: 0, eth: 0, wstEth: 0, rEth: 0 }

    Promise.all([this.alchemistContract.methods.getYieldTokenParameters(addresses.yvDaiAddress).call(),
      this.alchemistContract.methods.getYieldTokenParameters(addresses.yvUsdcAddress).call(),
      this.alchemistContract.methods.getYieldTokenParameters(addresses.yvUsdtAddress).call(),
      this.alchemistContract.methods.getUnderlyingTokensPerShare(addresses.yvDaiAddress).call(),
      this.alchemistContract.methods.getUnderlyingTokensPerShare(addresses.yvUsdcAddress).call(),
      this.alchemistContract.methods.getUnderlyingTokensPerShare(addresses.yvUsdtAddress).call(),
      this.alchemistEthContract.methods.getYieldTokenParameters(addresses.yvWethAddress).call(),
      this.alchemistEthContract.methods.getUnderlyingTokensPerShare(addresses.yvWethAddress).call(),
      this.alchemistEthContract.methods.getYieldTokenParameters(addresses.wstEthAddress).call(),
      this.alchemistEthContract.methods.getUnderlyingTokensPerShare(addresses.wstEthAddress).call(),
      this.alchemistEthContract.methods.getYieldTokenParameters(addresses.rEthAddress).call(),
      this.alchemistEthContract.methods.getUnderlyingTokensPerShare(addresses.rEthAddress).call(),
      this.alchemistFtmContract.methods.getYieldTokenParameters(addresses.ftmYvDaiAddress).call(),
      this.alchemistFtmContract.methods.getYieldTokenParameters(addresses.ftmYvUsdcAddress).call(),
      this.alchemistFtmContract.methods.getYieldTokenParameters(addresses.ftmYvUsdtAddress).call()
    ])
      .then(([daiParams, usdcParams, usdtParams, daiTokens, usdcTokens, usdtTokens, ethParams, ethTokens, wstEthParams, wstEthTokens, rEthParams, rEthTokens, ftmDaiParams, ftmUsdcParams, ftmUsdtParams]) => {
        v2Caps.dai = daiParams[4]/Math.pow(10, daiParams[0]);
        v2Caps.ftmDai = ftmDaiParams[4]/Math.pow(10, ftmDaiParams[0]);
        v2Caps.usdc = usdcParams[4]/Math.pow(10, usdcParams[0]);
        v2Caps.ftmUsdc = ftmUsdcParams[4]/Math.pow(10, ftmUsdcParams[0]);
        v2Caps.usdt = usdtParams[4]/Math.pow(10, usdtParams[0]);
        v2Caps.ftmUsdt = ftmUsdtParams[4]/Math.pow(10, ftmUsdtParams[0]);
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
    let treasury = {tAlcx : 0, alcx: 0, cvxAlUsd3CrvElixir: 0, cvxAlUsd3CrvTreasury: 0, cvxAlEthCrvTreasury: 0, vlCvx: 0, alcxEthSlpOwned: 0, alcxEthSlpOwnedRatio: 0, sdt: 0, sdCrv: 0, wethInElixir: 0, daiInElixir: 0 }
    let alcxEthSlp = { alcx: 0, weth: 0 }
    let alchemixStaking = { alcx: 0, tAlcx: 0, alcxEthSlp: 0, alcxEthSlpStakingRatio: 0, saddleAlEth: 0 }
    let alAssetCrvSupply = { alUsd3Crv: 0, alEthCrv: 0 };
    Promise.all([this.tAlcxContract.methods.balanceOf(addresses.treasuryWallet1Address).call(),
      this.tAlcxContract.methods.balanceOf(addresses.alchemixStakingAddress).call(),
      this.alcxContract.methods.balanceOf(addresses.treasuryWallet1Address).call(),
      this.alcxContract.methods.balanceOf(addresses.treasuryWallet2Address).call(),
      this.alcxContract.methods.balanceOf(addresses.alcxEthSlpAddress).call(),
      this.alcxContract.methods.balanceOf(addresses.alchemixStakingAddress).call(),
      this.wethContract.methods.balanceOf(addresses.alcxEthSlpAddress).call(),
      this.wethContract.methods.balanceOf(addresses.elixirAlEthAddress).call(),
      this.daiContract.methods.balanceOf(addresses.elixirAddress).call(),
      this.cvxAlUsd3CrvStakingContract.methods.balanceOf(addresses.elixirAddress).call(),
      this.cvxAlEthCrvStakingContract.methods.balanceOf(addresses.elixirAlEthAddress).call(),
      //this.cvxAlUsd3CrvStakingContract.methods.balanceOf(addresses.treasuryWallet1Address).call(),
      this.cvxAlEthCrvStakingContract.methods.balanceOf(addresses.treasuryWallet1Address).call(),
      this.alUsd3CrvContract.methods.totalSupply().call(),
      this.alEthCrvContract.methods.totalSupply().call(),
      this.vlCvxTrackerContract.methods.balanceOf(addresses.treasuryWallet1Address).call(),
      this.tokeStakingContract.methods.balanceOf(addresses.treasuryWallet1Address).call(),
      this.masterChefContract.methods.userInfo('0', addresses.treasuryWallet1Address).call(),
      this.alcxEthSlpContract.methods.totalSupply().call(),
      this.alcxEthSlpContract.methods.balanceOf(addresses.masterChefAddress).call(),
      this.saddleAlEthContract.methods.balanceOf(addresses.alchemixStakingAddress).call(),
      this.saddleAlEthContract.methods.balanceOf(addresses.saddleStakingContractAddress).call(),
      this.veSdtContract.methods.balanceOf(addresses.sdtControllerContractAddress).call(),
      this.sdCrvContract.methods.balanceOf(addresses.sdtControllerContractAddress).call()
    ])
    .then(([tAlcx, stakedTAlcx, alcx1, alcx2, alcxInSlp, stakedAlcx, wethInSlp, wethInElixir, daiInElixir, cvxAlUsd3CrvElixir, cvxAlEthCrvElixir, cvxAlEthCrvTreasury, alUsd3CrvSupply, alEthCrvSupply, vlCvx, stakedToke, alcxEthSlpOwned, alcxEthSlpTotalSupply, stakedAlcxEth, stakedSaddleAlEthAlchemix, stakedSaddleAlEthSaddle, sdt, sdCrv]) => {
      treasury.tAlcx = tAlcx/Math.pow(10, 18);
      treasury.alcx = Math.round(alcx1/Math.pow(10, 18) + alcx2/Math.pow(10, 18));
      // + abraAlcx/Math.pow(10, 18));
      treasury.cvxAlUsd3CrvElixir = cvxAlUsd3CrvElixir/Math.pow(10, 18);
      treasury.cvxAlEthCrvElixir = cvxAlEthCrvElixir/Math.pow(10, 18);
      //treasury.cvxAlUsd3CrvTreasury = cvxAlUsd3CrvTreasury/Math.pow(10, 18);
      treasury.cvxAlEthCrvTreasury = cvxAlEthCrvTreasury/Math.pow(10, 18);
      treasury.vlCvx = vlCvx/Math.pow(10, 18);
      treasury.stakedToke = stakedToke/Math.pow(10, 18);
      treasury.alcxEthSlpOwned = alcxEthSlpOwned[0]/Math.pow(10, 18);
      treasury.alcxEthSlpOwnedRatio = alcxEthSlpOwned[0]/alcxEthSlpTotalSupply;
      alcxEthSlp.alcx = alcxInSlp/Math.pow(10, 18);
      alcxEthSlp.weth = wethInSlp/Math.pow(10, 18);
      treasury.sdt = sdt/Math.pow(10, 18);
      treasury.sdCrv = sdCrv/Math.pow(10, 18);
      alchemixStaking.alcx = stakedAlcx/Math.pow(10, 18);
      alchemixStaking.tAlcx = stakedTAlcx/Math.pow(10, 18);
      alchemixStaking.alcxEthSlp = stakedAlcxEth/Math.pow(10, 18);
      alchemixStaking.alcxEthSlpStakingRatio = stakedAlcxEth/alcxEthSlpTotalSupply;
      alchemixStaking.saddleAlEth = stakedSaddleAlEthAlchemix/Math.pow(10, 18) + stakedSaddleAlEthSaddle/Math.pow(10, 18);
      alAssetCrvSupply.alUsd3Crv = alUsd3CrvSupply/Math.pow(10, 18);
      alAssetCrvSupply.alEthCrv = alEthCrvSupply/Math.pow(10, 18);
      treasury.daiInElixir = daiInElixir/Math.pow(10, 18);
      treasury.wethInElixir = wethInElixir/Math.pow(10, 18);
      this.setState({ treasury: treasury, alcxEthSlp: alcxEthSlp, alchemixStaking: alchemixStaking, alAssetCrvSupply: alAssetCrvSupply, treasuryLoading: false })
    });
  }

  getLPs(){
    let lps = { alUsdIn3Crv: 0, crv3In3Crv: 0, alUsdInD4: 0, fraxInD4: 0, feiInD4: 0, lUsdInD4: 0, ethInAlEthCrv: 0, alUsdInVelodrome: 0, usdcInVelodrome: 0, alEthInVelodrome: 0, wethInVelodrome: 0, alUsdInBeets: 0, usdcInBeets: 0, daiInBeets: 0, alUsdInSaddleFBP: 0, fbpInSaddleFBP: 0, alUsdInCurveFBP: 0, fbpInCurveFBP: 0 }
    Promise.all([this.alUsdContract.methods.balanceOf(addresses.alUsd3CrvContractAddress).call(),
      this.alUsdContract.methods.balanceOf(addresses.saddled4ContractAddress).call(),
      this.crv3Contract.methods.balanceOf(addresses.alUsd3CrvContractAddress).call(),
      this.fraxContract.methods.balanceOf(addresses.saddled4ContractAddress).call(),
      this.feiContract.methods.balanceOf(addresses.saddled4ContractAddress).call(),
      this.lUsdContract.methods.balanceOf(addresses.saddled4ContractAddress).call(),
      this.alEthContract.methods.balanceOf(addresses.alEthCrvContractAddress).call(),
      this.alEthContract.methods.balanceOf(addresses.saddleAlEthPoolContractAddress).call(),
      web3.eth.getBalance(addresses.alEthCrvContractAddress),
      this.wethContract.methods.balanceOf(addresses.saddleAlEthPoolContractAddress).call(),
      this.sEthContract.methods.balanceOf(addresses.saddleAlEthPoolContractAddress).call(),
      this.alUsdOptimismContract.methods.balanceOf(addresses.alUsdVelodromeContractAddress).call(),
      this.usdcOptimismContract.methods.balanceOf(addresses.alUsdVelodromeContractAddress).call(),
      this.alEthOptimismContract.methods.balanceOf(addresses.alEthVelodromeContractAddress).call(),
      this.wethOptimismContract.methods.balanceOf(addresses.alEthVelodromeContractAddress).call(),
      this.beetsVaultContract.methods.getPoolTokens(addresses.alUsdBeetsPoolId).call(),
      this.beetsVaultContract.methods.getPoolTokens(addresses.beetsYearnUsdPoolId).call(),
      this.alUsdContract.methods.balanceOf(addresses.alUsdFBPSaddleContractAddress).call(),
      this.saddleFBPContract.methods.balanceOf(addresses.alUsdFBPSaddleContractAddress).call(),
      this.alUsdContract.methods.balanceOf(addresses.alUsdFBPCurveContractAddress).call(),
      this.curveFBPContract.methods.balanceOf(addresses.alUsdFBPCurveContractAddress).call(),
    ])
    .then(([alUsdIn3Crv, alUsdInD4, crv3In3Crv, fraxInD4, feiInD4, lUsdInD4, alEthInCrv, alEthInSaddle, ethInAlEthCrv, wethInSaddle, sEthInSaddle, alUsdInVelodrome, usdcInVelodrome, alEthInVelodrome, wethInVelodrome, alUsdBeets, yearnUsdBeets, alUsdInSaddleFBP, fbpInSaddleFBP, alUsdInCurveFBP, fbpInCurveFBP]) => {
      lps.alUsdIn3Crv = alUsdIn3Crv/Math.pow(10, 18);
      lps.alUsdInD4 = alUsdInD4/Math.pow(10, 18);
      lps.crv3In3Crv = crv3In3Crv/Math.pow(10, 18);
      lps.fraxInD4 = fraxInD4/Math.pow(10, 18);
      lps.feiInD4 = feiInD4/Math.pow(10, 18);
      lps.lUsdInD4 = lUsdInD4/Math.pow(10, 18);
      lps.alEthInCrv = alEthInCrv/Math.pow(10, 18);
      lps.alEthInSaddle = alEthInSaddle/Math.pow(10, 18);
      lps.ethInAlEthCrv = ethInAlEthCrv/Math.pow(10, 18);
      lps.wethInSaddle = wethInSaddle/Math.pow(10, 18);
      lps.sEthInSaddle = sEthInSaddle/Math.pow(10, 18);
      lps.alUsdInVelodrome = alUsdInVelodrome/Math.pow(10, 18);
      lps.usdcInVelodrome = usdcInVelodrome/Math.pow(10, 6);
      lps.alEthInVelodrome = alEthInVelodrome/Math.pow(10, 18);
      lps.wethInVelodrome = wethInVelodrome/Math.pow(10, 18);
      lps.alUsdInBeets = alUsdBeets[3][2]/Math.pow(10, 18);
      lps.usdcInBeets = alUsdBeets[3][0]/Math.pow(10, 18)*(yearnUsdBeets[3][1]/Math.pow(10, 18)/(yearnUsdBeets[3][1]/Math.pow(10, 18)+yearnUsdBeets[3][0]/Math.pow(10, 18)));
      lps.daiInBeets = alUsdBeets[3][0]/Math.pow(10, 18)*(yearnUsdBeets[3][0]/Math.pow(10, 18)/(yearnUsdBeets[3][1]/Math.pow(10, 18)+yearnUsdBeets[3][0]/Math.pow(10, 18)));
      lps.alUsdInSaddleFBP = alUsdInSaddleFBP/Math.pow(10, 18);
      lps.fbpInSaddleFBP = fbpInSaddleFBP/Math.pow(10, 18);
      lps.alUsdInCurveFBP = alUsdInCurveFBP/Math.pow(10, 18);
      lps.fbpInCurveFBP = fbpInCurveFBP/Math.pow(10, 18);
      //console.log(lps.daiInBeets)
      this.setState({ lps: lps, lpsLoading: false })
    });
  }

  calculateVaultTVLs(daiAlchemist, daiTransmuter, EthAlchemist, EthTransmuter){
    let vaultV1Tvls = { daiTvlDates: [], daiAlchemistTVL: [], daiTransmuterTVL: [], ethTVLDates: [], ethAlchemistTVL: [], ethTransmuterTVL: [] }
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
      this.setState({ vaultV1Tvls: vaultV1Tvls, vaultTvlsLoading: false })
  }

  calculateTokenPrices(eth, rEth, wstEth, toke, cvx, sdt, crv){
    let tokenPrices = { eth: [], rEth: [], wstEth: [], toke: [], cvx: [], sdt: [], crv: [] }
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
    for(let i=0;i<crv.prices.length;i++){
      tokenPrices.crv[i] = crv.prices[i][1]; 
    }
    this.setState({ tokenPrices: tokenPrices, tokenPricesLoading: false });
  }

  calculateAlEthPeg(result, result5k){
    //let alEthDate = new Date();
    let index = 0;
    let alEthPeg = { date: [], peg: [], pegPerc: [], peg5k: [], peg5kPerc: [] }
    for(let i=0;i<result.length;i++){
      try {
        let tempDate = new Date(result[i].timestamp*1000);
        //if(!datesEqual(tempDate, alEthDate)){
          alEthPeg.date[index] = formatDate(tempDate, 0); 
          alEthPeg.peg[index] = result[i].outputAmount/Math.pow(10, 18)/500;
          alEthPeg.pegPerc[index] = (1-result[i].outputAmount/Math.pow(10, 18)/500)*(-100);
          if(result.length === result5k.length){
            alEthPeg.peg5k[index] = result5k[i].outputAmount/Math.pow(10, 19)/500;
            alEthPeg.peg5kPerc[index] = (1-result5k[i].outputAmount/Math.pow(10, 19)/500)*(-100);
          }
          index++;
          //alEthDate = tempDate;
        }
      //}
      catch (err) {
        console.log(err);
      }
    }
    this.setState({ alEthPeg: alEthPeg, alEthPegLoading: false });
  }

  calculateAlUsdPeg(daiPeg, usdcPeg, usdtPeg, dai10mPeg, usdc10mPeg, usdt10mPeg){
    //let daiDate = new Date();
    //let usdcDate = new Date();
    //let usdtDate = new Date();
    let daiIndex = 0;
    let usdcIndex = 0;
    let usdtIndex = 0;
    let alUsdPeg = {dai: { date: [], peg: [], pegPerc: [], peg10m: [], peg10mPerc: [] }, usdc: { date: [], peg: [], pegPerc: [], peg10m: [], peg10mPerc: [] }, usdt: { date: [], peg: [], pegPerc: [], peg10m: [], peg10mPerc: [] }};
    for(let i=0;i<daiPeg.length;i++){
      try {
        let tempDaiDate = new Date(daiPeg[i].timestamp*1000);
        let tempUsdcDate = new Date(usdcPeg[i].timestamp*1000);
        let tempUsdtDate = new Date(usdtPeg[i].timestamp*1000);
        //if(!datesEqual(tempDaiDate, daiDate)){
          alUsdPeg.dai.date[daiIndex] = formatDate(tempDaiDate, 0); 
          alUsdPeg.dai.peg[daiIndex] = daiPeg[i].outputAmount/Math.pow(10, 24);
          alUsdPeg.dai.pegPerc[daiIndex] = (1-daiPeg[i].outputAmount/Math.pow(10, 24))*(-100);
          if(daiPeg.length === dai10mPeg.length){
            alUsdPeg.dai.peg10m[daiIndex] = dai10mPeg[i].outputAmount/Math.pow(10, 25);
            alUsdPeg.dai.peg10mPerc[daiIndex] = (1-dai10mPeg[i].outputAmount/Math.pow(10, 25))*(-100);
          }
          daiIndex++;
          //daiDate = tempDaiDate;
        //}
        //if(!datesEqual(tempUsdcDate, usdcDate)){
          alUsdPeg.usdc.date[usdcIndex] = formatDate(tempUsdcDate, 0); 
          alUsdPeg.usdc.peg[usdcIndex] = usdcPeg[i].outputAmount/Math.pow(10, 12);
          alUsdPeg.usdc.pegPerc[usdcIndex] = (1-usdcPeg[i].outputAmount/Math.pow(10, 12))*(-100);
          if(usdcPeg.length === usdc10mPeg.length){
            alUsdPeg.usdc.peg10m[usdcIndex] = usdc10mPeg[i].outputAmount/Math.pow(10, 13);
            alUsdPeg.usdc.peg10mPerc[usdcIndex] = (1-usdc10mPeg[i].outputAmount/Math.pow(10, 13))*(-100);
          }
          usdcIndex++;
          //usdcDate = tempUsdcDate;
        //}
        //if(!datesEqual(tempUsdtDate, usdtDate)){
          alUsdPeg.usdt.date[usdtIndex] = formatDate(tempUsdtDate, 0); 
          alUsdPeg.usdt.peg[usdtIndex] = usdtPeg[i].outputAmount/Math.pow(10, 12);
          alUsdPeg.usdt.pegPerc[usdtIndex] = (1-usdtPeg[i].outputAmount/Math.pow(10, 12))*(-100);
          if(usdtPeg.length === usdt10mPeg.length){
            alUsdPeg.usdt.peg10m[usdtIndex] = usdt10mPeg[i].outputAmount/Math.pow(10, 13);
            alUsdPeg.usdt.peg10mPerc[usdtIndex] = (1-usdt10mPeg[i].outputAmount/Math.pow(10, 13))*(-100);
          }
          usdtIndex++;
          //usdtDate = tempUsdtDate;
        //}
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

  calculateAlchemistTvl(result){
    //console.log(result)
    let startDate = new Date(1647385201*1000); //March 16th
    let today = new Date();
    let dateTracker = new Date(result[0].timestamp*1000);
    let resultIndex = 0;
    let alchemistTvl = { date:[], yvDai: [], yvUsdc: [], yvUsdt: [], yvWeth: [], wstEth: [], rEth: [], aWeth: [], aUsdc: [], aDai: [], aUsdt: [] };
    let tempYvDai = 0;
    let tempYvUsdc = 0;
    let tempYvUsdt = 0;
    let tempADai = 0;
    let tempAUsdc = 0;
    let tempAUsdt = 0;
    let tempYvWeth = 0;
    let tempAWeth = 0;
    let tempWstEth = 0;
    let tempReth = 0;
    for(let j=0;startDate<today;j++){

      for(let i=resultIndex;i<result.length;i++){
        let tempDate = new Date(result[i].timestamp*1000);
        if(tempDate>startDate) break;

        if(!datesEqual(tempDate, dateTracker)) dateTracker = tempDate;

        tempYvDai = result[i].token.symbol === "yvDAI" && result[i].amount ? result[i].amount/Math.pow(10, 18) : tempYvDai;
        tempYvUsdc = result[i].token.symbol === "yvUSDC" && result[i].amount ? result[i].amount/Math.pow(10, 6) : tempYvUsdc;
        tempYvUsdt = result[i].token.symbol === "yvUSDT" && result[i].amount ? result[i].amount/Math.pow(10, 6) : tempYvUsdt;
        tempADai = result[i].token.symbol === "s_aDAI" && result[i].amount ? result[i].amount/Math.pow(10, 18) : tempADai;
        tempAUsdc = result[i].token.symbol === "s_aUSDC" && result[i].amount ? result[i].amount/Math.pow(10, 6) : tempAUsdc;
        tempAUsdt = result[i].token.symbol === "s_aUSDT" && result[i].amount ? result[i].amount/Math.pow(10, 6) : tempAUsdt;
        tempYvWeth = result[i].token.symbol === "yvWETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempYvWeth;
        tempAWeth = result[i].token.symbol === "s_aWETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempAWeth;
        tempWstEth = result[i].token.symbol === "wstETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempWstEth;
        tempReth = result[i].token.symbol === "rETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempReth;
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
      alchemistTvl.yvWeth[j] = Math.round(tempYvWeth/10000)/100;
      if(j>0 && !tempYvWeth) alchemistTvl.yvWeth[j] = alchemistTvl.yvWeth[j-1];
      alchemistTvl.aWeth[j] = Math.round(tempAWeth/10000)/100;
      if(j>0 && !tempAWeth) alchemistTvl.aWeth[j] = alchemistTvl.aWeth[j-1];
      alchemistTvl.wstEth[j] = Math.round(tempWstEth/10000)/100;
      if(j>0 && !tempWstEth) alchemistTvl.wstEth[j] = alchemistTvl.wstEth[j-1];
      alchemistTvl.rEth[j] = Math.round(tempReth/10000)/100;
      if(j>0 && !tempReth) alchemistTvl.rEth[j] = alchemistTvl.rEth[j-1];
      alchemistTvl.date[j] = formatDate(startDate, 0);
      startDate.setDate(startDate.getDate() + 1);
      /*tempYvDai = 0;
      tempYvUsdc = 0;
      tempYvUsdt = 0;*/
    }
    this.setState({ alchemistTvl: alchemistTvl, alchemistTvlLoading: false });
  }

  /*calculateAlchemistTvlTemp(result){
    //console.log(result)
    let startDate = new Date(1647385201*1000); //March 16th
    let today = new Date();
    let dateTracker = new Date(result[0].timestamp*1000);
    let resultIndex = 0;
    let alchemistTvl = { date:[], yvDai: [], yvUsdc: [], yvUsdt: [], yvWeth: [], wstEth: [], rEth: [] };
    let tempYvDai = 0;
    let tempYvUsdc = 0;
    let tempYvUsdt = 0;
    let tempYvWeth = 0;
    let tempWstEth = 0;
    let tempReth = 0;

      for(let i=resultIndex;i<result.length;i++){
        let tempDate = new Date(result[i].timestamp*1000);


        tempYvDai = result[i].token.symbol === "yvDAI" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempYvDai;
        tempYvUsdc = result[i].token.symbol === "yvUSDC" && result[i].amount ? result[i].amount/Math.pow(10, 0) : tempYvUsdc;
        tempYvUsdt = result[i].token.symbol === "yvUSDT" && result[i].amount ? result[i].amount/Math.pow(10, 0) : tempYvUsdt;
        tempYvWeth = result[i].token.symbol === "yvWETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempYvWeth;
        tempWstEth = result[i].token.symbol === "wstETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempWstEth;
        tempReth = result[i].token.symbol === "rETH" && result[i].amount ? result[i].amount/Math.pow(10, 12) : tempReth;

  
      alchemistTvl.yvDai[i] = Math.round(tempYvDai/10000)/100;
      if(i>0 && !tempYvDai) alchemistTvl.yvDai[i] = alchemistTvl.yvDai[i-1];
      alchemistTvl.yvUsdc[i] = Math.round(tempYvUsdc/10000)/100;
      if(i>0 && !tempYvUsdc) alchemistTvl.yvUsdc[i] = alchemistTvl.yvUsdc[i-1];
      alchemistTvl.yvUsdt[i] = Math.round(tempYvUsdt/10000)/100;
      if(i>0 && !tempYvUsdt) alchemistTvl.yvUsdt[i] = alchemistTvl.yvUsdt[i-1];
      alchemistTvl.yvWeth[i] = Math.round(tempYvWeth/10000)/100;
      if(i>0 && !tempYvWeth) alchemistTvl.yvWeth[i] = alchemistTvl.yvWeth[i-1];
      alchemistTvl.wstEth[i] = Math.round(tempWstEth/10000)/100;
      if(i>0 && !tempWstEth) alchemistTvl.wstEth[i] = alchemistTvl.wstEth[i-1];
      alchemistTvl.rEth[i] = Math.round(tempReth/10000)/100;
      if(i>0 && !tempReth) alchemistTvl.rEth[i] = alchemistTvl.rEth[i-1];
      alchemistTvl.date[i] = tempDate;
      tempYvDai = 0;
      tempYvUsdc = 0;
      tempYvUsdt = 0;
    }
    console.log(alchemistTvl)
    this.setState({ alchemistTvl: alchemistTvl, alchemistTvlLoading: false });
  }*/

  calculateHarvests(result){
    //console.log(result)
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

        tempYvDai = result[i].yieldToken === addresses.yvDaiAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempYvDai) : tempYvDai;
        tempYvUsdc = result[i].yieldToken === addresses.yvUsdcAddress ? (result[i].totalHarvested/Math.pow(10, 6) + tempYvUsdc) : tempYvUsdc;
        tempYvUsdt = result[i].yieldToken === addresses.yvUsdtAddress ? (result[i].totalHarvested/Math.pow(10, 6) + tempYvUsdt) : tempYvUsdt;
        tempYvWeth = result[i].yieldToken === addresses.yvWethAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempYvWeth) : tempYvWeth;
        tempWstEth = result[i].yieldToken === addresses.wstEthAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempWstEth) : tempWstEth;
        tempReth = result[i].yieldToken === addresses.rEthAddress ? (result[i].totalHarvested/Math.pow(10, 18) + tempReth) : tempReth;
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

  /*logCapIncreases(result){
    //console.log(result)
    let temp = { yvDai: [], yvUsdc: [], yvUsdt: [], yvWeth: [], wstEth: [], rEth: [] }
    for(let i=0;i<result.length;i++){
      if(result[i].yieldToken === addresses.yvDaiAddress) temp.yvDai.push({ date: new Date(result[i].timestamp*1000), value: result[i].maximumExpectedValue/Math.pow(10, 18) })
      if(result[i].yieldToken === addresses.yvUsdcAddress) temp.yvUsdc.push({ date: new Date(result[i].timestamp*1000), value: result[i].maximumExpectedValue/Math.pow(10, 6) })
      if(result[i].yieldToken === addresses.yvUsdtAddress) temp.yvUsdt.push({ date: new Date(result[i].timestamp*1000), value: result[i].maximumExpectedValue/Math.pow(10, 6) })
      if(result[i].yieldToken === addresses.yvWethAddress) temp.yvWeth.push({ date: new Date(result[i].timestamp*1000), value: result[i].maximumExpectedValue/1.0031/Math.pow(10, 18) })
      if(result[i].yieldToken === addresses.wstEthAddress) temp.wstEth.push({ date: new Date(result[i].timestamp*1000), value: result[i].maximumExpectedValue/1.0663/Math.pow(10, 18) })
      if(result[i].yieldToken === addresses.rEthAddress) temp.rEth.push({ date: new Date(result[i].timestamp*1000), value: result[i].maximumExpectedValue/1.0198/Math.pow(10, 18) })
    }
  }*/

  getFlipsideCryptoData(){
    Promise.all([fetch("https://api.flipsidecrypto.com/api/v2/queries/a29262d6-7878-4c8e-8d4e-a62f414c846f/data/latest").then(res => res.json()),
      fetch("https://api.flipsidecrypto.com/api/v2/queries/6a72370b-6c81-4b3f-9691-cfdb0a3118d3/data/latest").then(res => res.json()),
      fetch("https://api.flipsidecrypto.com/api/v2/queries/925c5328-386f-44c1-bfe9-18a796201fff/data/latest").then(res => res.json()),
      fetch("https://api.flipsidecrypto.com/api/v2/queries/c837204d-27a8-4f0d-b0f0-6d340e5de0e8/data/latest").then(res => res.json()),
    ])
      .then(([daiAlchemistTvl, daiTransmuterTvl, ethAlchemistTvl, ethTransmuterTvl]) => {
        this.calculateVaultTVLs(daiAlchemistTvl, daiTransmuterTvl, ethAlchemistTvl, ethTransmuterTvl);
    })
  }
  
  getCoinGeckoData(){
    Promise.all([fetch("https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
      fetch("https://api.coingecko.com/api/v3/coins/wrapped-steth/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
      fetch("https://api.coingecko.com/api/v3/coins/rocket-pool-eth/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
      fetch("https://api.coingecko.com/api/v3/coins/tokemak/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
      fetch("https://api.coingecko.com/api/v3/coins/convex-finance/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
      fetch("https://api.coingecko.com/api/v3/coins/stake-dao/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
      fetch("https://api.coingecko.com/api/v3/coins/curve-dao-token/market_chart/range?vs_currency=usd&from=1627596000&to=4627596000").then(res => res.json()),
      fetch("https://api.coingecko.com/api/v3/coins/alchemix-usd/market_chart?vs_currency=usd&days=max&interval=daily").then(res => res.json()),
      fetch("https://api.coingecko.com/api/v3/coins/alchemix/market_chart?vs_currency=usd&days=max&interval=daily").then(res => res.json())
    ])
      .then(([ethPrice, wstEthPrice, rEthPrice, tokePrice, cvxPrice, sdtPrice, crvPrice, alUsdData, alcxData]) => {
        this.calculateTokenPrices(ethPrice, rEthPrice, wstEthPrice, tokePrice, cvxPrice, sdtPrice, crvPrice);
        this.calculateAlUsdArrays(alUsdData);
        this.calculateAlcxArrays(alcxData);
        //console.log(alcxData)
    })
  }

  getPegQuery(alAsset, collateralToken, tradeSize){
    return `{
      poolHistoricalRates(
        first: 1000
        where: {inputToken: "` + alAsset + `", outputToken: "` + collateralToken + `", inputAmount: "` + tradeSize.toLocaleString('fullwide', {useGrouping:false}) + `"}
        orderBy: timestamp
        orderDirection: desc
      ) {
        outputAmount
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
    const daiPegQuery = this.getPegQuery(addresses.alUsdAddress, addresses.daiAddress, Math.pow(10, 24))
    const daiPeg10mQuery = this.getPegQuery(addresses.alUsdAddress, addresses.daiAddress, Math.pow(10, 25))
    const usdcPegQuery = this.getPegQuery(addresses.alUsdAddress, addresses.usdcAddress, Math.pow(10, 24))
    const usdcPeg10mQuery = this.getPegQuery(addresses.alUsdAddress, addresses.usdcAddress, Math.pow(10, 25))
    const usdtPegQuery = this.getPegQuery(addresses.alUsdAddress, addresses.usdtAddress, Math.pow(10, 24))
    const usdtPeg10mQuery = this.getPegQuery(addresses.alUsdAddress, addresses.usdtAddress, Math.pow(10, 25))
    const alEthPegQuery = this.getPegQuery(addresses.alEthAddress, addresses.ethAddress, Math.pow(10,20)*5)
    const alEthPeg5kQuery = this.getPegQuery(addresses.alEthAddress, addresses.ethAddress, Math.pow(10, 21)*5)
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
    const alchemistTvl = `{
      alchemistTVLHistories(
        first: 1000
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

    const alchemistTvlSkip = `{
      alchemistTVLHistories(
        first: 1000
        skip: 1000
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

    /*const depositCapIncreases = `{
      alchemistMaximumExpectedValueUpdatedEvents(
        orderBy: timestamp
        orderDirection: desc
      ){
        id
        timestamp
        yieldToken
        maximumExpectedValue
      }      
    }`*/

    Promise.all([fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(daiPegQuery)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(daiPeg10mQuery)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(usdcPegQuery)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(usdcPeg10mQuery)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(usdtPegQuery)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(usdtPeg10mQuery)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(alEthPegQuery)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(alEthPeg5kQuery)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(alchemistTvl)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2", this.getSubgraphRequestOptions(alchemistTvlSkip)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2_ftm", this.getSubgraphRequestOptions(alchemistTvl)).then(res => res.json()),
      fetch("https://api.thegraph.com/subgraphs/name/alchemix-finance/alchemix_v2_dev", this.getSubgraphRequestOptions(harvestsQuery)).then(res => res.json())])
      .then(([daiPeg, dai10mPeg, usdcPeg, usdc10mPeg, usdtPeg, usdt10mPeg, alEthPeg, alEth5kPeg, alchemistTvl, alchemistTvlSkip, ftmAlchemistTvl, harvests]) => {
        this.calculateAlUsdPeg(daiPeg.data.poolHistoricalRates.reverse(), usdcPeg.data.poolHistoricalRates.reverse(), usdtPeg.data.poolHistoricalRates.reverse(), dai10mPeg.data.poolHistoricalRates.reverse(), usdc10mPeg.data.poolHistoricalRates.reverse(), usdt10mPeg.data.poolHistoricalRates.reverse())
        this.calculateAlEthPeg(alEthPeg.data.poolHistoricalRates.reverse(), alEth5kPeg.data.poolHistoricalRates.reverse())
        this.calculateHarvests(harvests.data.alchemistHarvestEvents.reverse())
        this.calculateFtmTvl(ftmAlchemistTvl.data.alchemistTVLHistories.reverse())
        this.calculateAlchemistTvl(alchemistTvl.data.alchemistTVLHistories.concat(alchemistTvlSkip.data.alchemistTVLHistories).reverse())
        //this.logCapIncreases(depositCapIncreases.data.alchemistMaximumExpectedValueUpdatedEvents.reverse())
    })
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
  //let circulatingMarketcap = this.state.alcxDataLoading ? 0 : Math.round(this.state.alcxData.marketcap*100 - treasuryAlcxValue/10000 - treasuryTAlcxValue/10000)/100;
  let alcxTotalMarketcap = this.state.alcxDataLoading ? 0 : Math.round(this.state.alcxData.marketcap*100 + treasuryAlcxValue/10000)/100;
  let alEthCrvTotalValue = (this.state.tokenPricesLoading || this.state.treasuryLoading) ? 0 : this.state.alAssetCrvSupply.alEthCrv * this.state.tokenPrices.eth[this.state.tokenPrices.eth.length-1];
  let sdtValue = (this.state.treasuryLoading || this.state.tokenPricesLoading) ? 0 : this.state.treasury.sdt * this.state.tokenPrices.sdt[this.state.tokenPrices.sdt.length-1];
  let sdCrvValue = (this.state.treasuryLoading || this.state.tokenPricesLoading) ? 0 : this.state.treasury.sdCrv * this.state.tokenPrices.crv[this.state.tokenPrices.crv.length-1];
  let treasuryTotal = (this.state.treasuryLoading || this.state.alcxDataLoading || this.state.tokenPricesLoading) ? 0 : treasuryAlcxValue+treasuryCvxAlEthCrvValue+treasuryCvxValue+treasuryTAlcxValue+treasuryTokeValue+treasurySlpValue+sdtValue+sdCrvValue+treasuryOther+this.state.treasury.cvxAlUsd3CrvTreasury;
  let treasuryNonAlcx = (this.state.treasuryLoading || this.state.alcxDataLoading || this.state.tokenPricesLoading) ? 0 : treasuryCvxAlEthCrvValue+treasuryCvxValue+treasuryTokeValue+treasurySlpValue+sdtValue+sdCrvValue+treasuryOther+this.state.treasury.cvxAlUsd3CrvTreasury;
  let wethInElixirUsd = (this.state.treasuryLoading || this.state.tokenPricesLoading) ? 0 : this.state.treasury.wethInElixir*this.state.tokenPrices.eth[this.state.tokenPrices.eth.length-1];

  return (
    <div className="App">
      <div className="header-disclaimer">
        This service provides statistics for the Alchemix dApp (<a target="_blank" rel="noreferrer" href="https://alchemix.fi">alchemix.fi</a>) and associated crypto tokens.
      </div>
      <h1>Alchemix Statistics</h1>
      <img className="header-image" src={ require('./logos/alcx_logo.png').default } alt="ALCX logo" />
      {(this.state.vaultTvlsLoading || this.state.tokenPricesLoading || this.state.alUsdPegLoading || this.state.alEthPegLoading || this.state.alchemistTvlLoading) ? "Loading..." :
      <Overview 
        v1DaiTVL={v1DaiTVL} v1EthUsdTVL={v1EthUsdTVL} v1EthTVL={v1EthTVL} v2DaiTVL={v2DaiTVL} v2UsdcTVL={v2UsdcTVL} v2UsdtTVL={v2UsdtTVL}
        v2Caps={this.state.v2Caps} v2EthUsdTVL={v2EthUsdTVL} v2StethUsdTVL={v2StethUsdTVL} v2RethUsdTVL={v2RethUsdTVL} v2EthTVL={v2EthTVL}
        v2StethTVL={v2StethTVL} v2RethTVL={v2RethTVL} alchemixStaking={this.state.alchemixStaking}
        stakedAlcxValue={stakedAlcxValue} stakedTAlcxValue={stakedTAlcxValue} stakingSlpValue={stakingSlpValue} stakingSaddleAlEthValue={stakingSaddleAlEthValue}
        vaultV1Tvls={this.state.vaultV1Tvls} tokenPrices={this.state.tokenPrices} ftmTvl={this.state.ftmTvl}
        alchemistTvl={this.state.alchemistTvl} elixirCvxAlEthCrvValue={elixirCvxAlEthCrvValue} treasury={this.state.treasury}
        treasuryTotal={treasuryTotal} treasuryNonAlcx={treasuryNonAlcx} lps={this.state.lps} ethPrice={this.state.tokenPrices.eth}
        alUsdPeg={this.state.alUsdPeg} alEthPeg={this.state.alEthPeg} wethInElixirUsd={wethInElixirUsd}
      />}
      <div className="button-group-large-screen">
      <ButtonGroup size="medium">
        <Button variant={this.state.activeTab === "emissions" ? "contained" : "outlined"} color="inherit" onClick={() => {this.selectTab("emissions")}}>ALCX Emissions</Button>
        <Button variant={this.state.activeTab === "deposits" ? "contained" : "outlined"} color="inherit" onClick={() => {this.selectTab("deposits")}}>Deposits and Staking</Button>
        <Button variant={this.state.activeTab === "treasury" ? "contained" : "outlined"} color="inherit" onClick={() => {this.selectTab("treasury")}}>Treasury and Elixirs</Button>
        <Button variant={this.state.activeTab === "debt" ? "contained" : "outlined"} color="inherit" onClick={() => {this.selectTab("debt")}}>User Debt</Button>
        <Button variant={this.state.activeTab === "alassets" ? "contained" : "outlined"} color="inherit" onClick={() => {this.selectTab("alassets")}}>alAssets</Button>
        <Button variant={this.state.activeTab === "harvests" ? "contained" : "outlined"} color="inherit" onClick={() => {this.selectTab("harvests")}}>Harvests</Button>
      </ButtonGroup>
      </div>
      <br/>
      <div className="button-group-small-screen">
      <div className="button-group-top">
        <ButtonGroup size="medium">
          <Button variant={this.state.activeTab === "emissions" ? "contained" : "outlined"} color="inherit" onClick={() => {this.selectTab("emissions")}}>ALCX Emissions</Button>
          <Button variant={this.state.activeTab === "deposits" ? "contained" : "outlined"} color="inherit" onClick={() => {this.selectTab("deposits")}}>Deposits and Staking</Button>
          <Button variant={this.state.activeTab === "treasury" ? "contained" : "outlined"} color="inherit" onClick={() => {this.selectTab("treasury")}}>Treasury and Elixirs</Button>
        </ButtonGroup>
      </div>
      <div className="button-group-lower">
        <ButtonGroup size="medium">
          <Button variant={this.state.activeTab === "debt" ? "contained" : "outlined"} color="inherit" onClick={() => {this.selectTab("debt")}}>User Debt</Button>
          <Button variant={this.state.activeTab === "alassets" ? "contained" : "outlined"} color="inherit" onClick={() => {this.selectTab("alassets")}}>alAssets</Button>
          <Button variant={this.state.activeTab === "harvests" ? "contained" : "outlined"} color="inherit" onClick={() => {this.selectTab("harvests")}}>Harvests</Button>
        </ButtonGroup>
      </div>
      </div>
      <br/>
      <br/>
      {this.state.activeTab !== "emissions" ? "" :
      <Emissions alcxData={this.state.alcxData} alcxDataLoading={this.state.alcxDataLoading} alcxTotalMarketcap={alcxTotalMarketcap} />
      }
      {this.state.activeTab !== "deposits" ? "" : ((this.state.vaultTvlsLoading || this.state.tokenPricesLoading || this.state.v2CurrentLoading || this.state.ftmTvlLoading || this.state.alchemistTvlLoading) ? "Loading..." :
        <Deposits
          v1DaiTVL={v1DaiTVL} v1EthUsdTVL={v1EthUsdTVL} v1EthTVL={v1EthTVL} v2DaiTVL={v2DaiTVL} v2UsdcTVL={v2UsdcTVL} v2UsdtTVL={v2UsdtTVL}
          v2Caps={this.state.v2Caps} v2EthUsdTVL={v2EthUsdTVL} v2StethUsdTVL={v2StethUsdTVL} v2RethUsdTVL={v2RethUsdTVL} v2EthTVL={v2EthTVL}
          v2StethTVL={v2StethTVL} v2RethTVL={v2RethTVL} alchemixStaking={this.state.alchemixStaking}
          stakedAlcxValue={stakedAlcxValue} stakedTAlcxValue={stakedTAlcxValue} stakingSlpValue={stakingSlpValue} stakingSaddleAlEthValue={stakingSaddleAlEthValue}
          vaultV1Tvls={this.state.vaultV1Tvls} tokenPrices={this.state.tokenPrices} ftmTvl={this.state.ftmTvl}
          alchemistTvl={this.state.alchemistTvl}
        />)}
      {this.state.activeTab !== "treasury" ? "" :
      <>
      <img src={ require('./logos/treasury.png').default } alt="Treasury logo" className="image3" />
      <h2>Treasury and Elixirs</h2>
      <div className="section-wrapper">
      <div className="summary">
          There are 2 main treasury addresses of the Alchemix protocol, plus 2 addresses for the alUSD and alETH Elixirs.<br/>
          The Elixirs are the AMOs (Algorithmic Market Operator) of Alchemix.<br/>
          The funds in the Elixirs should generally grow, but the protocol can utilize and effectively spend the funds for peg stabilization purposes.<br/>
          Other than the big items listed below, the wallets hold roughly another ${Math.round(treasuryOther/10000)/100}M of various stablecoins and multiple other assets.<br/>
          These are mostly just leftovers, strategically unimportant for the protocol.
          <span>
            <a target="_blank" rel="noreferrer" href="https://zapper.fi/account/0x9e2b6378ee8ad2a4a95fe481d63caba8fb0ebbf9">
              Treasury Wallet 1</a>, <a target="_blank" rel="noreferrer" href="https://zapper.fi/account/0x8392f6669292fa56123f71949b52d883ae57e225">
              Treasury Wallet 2</a>, <a target="_blank" rel="noreferrer" href="https://etherscan.io/address/0x3216d2a52f0094aa860ca090bc5c335de36e6273">
              sdCRV Controller</a>, <a target="_blank" rel="noreferrer" href="https://zapper.fi/account/0x9735f7d3ea56b454b24ffd74c58e9bd85cfad31b">
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
                <span className="small-table-row"><img src={ require('./logos/talcx.png').default } alt="tALCX logo" className="image" /></span><span className="table-text-title">tALCX</span><span className="table-text-bold">{Math.round(this.state.treasury.tAlcx*100)/100}</span><span className="important-2">${Math.round(treasuryTAlcxValue/10000)/100}M</span>
                <span className="small-table-row"><img src={ require('./logos/tokemak.png').default } alt="TOKE logo" className="image" /></span><span className="table-text-title">TOKE</span><span className="table-text-bold">{Math.round(this.state.treasury.stakedToke)}</span><span className="important-2">${Math.round(treasuryTokeValue/10000)/100}M</span>
                <span className="small-table-row"><img src={ require('./logos/eth_aleth.png').default } alt="alethcurve logo" className="image" /></span><span className="table-text-title">alETHCrv</span><span className="table-text-bold">{Math.round(this.state.treasury.cvxAlEthCrvTreasury*100)/100}</span><span className="important-2">${Math.round(treasuryCvxAlEthCrvValue/10000)/100}M</span>
                <span className="small-table-row"><img src={ require('./logos/alcx_eth_slp.png').default } alt="alcxethslp logo" className="image" /></span><span className="table-text-title">ALCX/ETH SLP</span><span className="table-text-bold">{Math.round(this.state.treasury.alcxEthSlpOwned*100)/100}</span><span className="important-2">${Math.round(treasurySlpValue/10000)/100}M</span>
                <span className="small-table-row"><img src={ require('./logos/stakedao.png').default } alt="sdt logo" className="image" /></span><span className="table-text-title">StakeDAO</span><span className="table-text-bold">{Math.round(this.state.treasury.sdt)}</span><span className="important-2">${Math.round(sdtValue/10000)/100}M</span>
                <span className="small-table-row"><img src={ require('./logos/sd_crv.png').default } alt="sdCrv logo" className="image" /></span><span className="table-text-title">sdCRV</span><span className="table-text-bold">{Math.round(this.state.treasury.sdCrv)}</span><span className="important-2">${Math.round(sdCrvValue/10000)/100}M</span>
                <span className="small-table-row"><img src={ require('./logos/other_logo.png').default } alt="circle" className="image" /></span><span className="table-text-title">Other</span><span className="table-text-bold"></span><span className="important-2">${Math.round(treasuryOther/10000)/100}M</span>
                <span className="small-table-row-2"></span><span></span><span className="important-3">Total</span><span className="important-3">${Math.round(treasuryTotal/10000)/100}M</span>
                <span className="small-table-row-2"></span><span></span><span className="important-3">Non-ALCX</span><span className="important-3">${Math.round(treasuryNonAlcx/10000)/100}M</span>
              </div>
            </div>
            <div className="small-table">
            <h3>Elixir contents</h3>
              <div className="small-table-inner-3">
                <span className="small-table-row"></span><span></span><span className="table-text-bold">Amount</span><span className="table-text-bold">USD value</span>
                <span className="small-table-row"><img src={ require('./logos/alusd_crv.png').default } alt="alusd3crv logo" className="image" /></span><span className="table-text-title">alUSD3Crv</span><span className="table-text-bold">{Math.round(this.state.treasury.cvxAlUsd3CrvElixir/10000)/100}M</span><span className="important-2">${Math.round(this.state.treasury.cvxAlUsd3CrvElixir/10000)/100}M</span>
                <span className="small-table-row"><img src={ require('./logos/eth_aleth.png').default } alt="alethcurve logo" className="image" /></span><span className="table-text-title">alETHCrv</span><span className="table-text-bold">{Math.round(this.state.treasury.cvxAlEthCrvElixir*100)/100}</span><span className="important-2">${Math.round(elixirCvxAlEthCrvValue/10000)/100}M</span>
                <span className="small-table-row"><img src={ require('./logos/dai.png').default } alt="DAI logo" className="image" /></span><span className="table-text-title">DAI</span><span className="table-text-bold">{Math.round(this.state.treasury.daiInElixir/10000)/100}M</span><span className="important-2">${Math.round(this.state.treasury.daiInElixir/10000)/100}M</span>
                <span className="small-table-row"><img src={ require('./logos/eth.png').default } alt="ETH logo" className="image" /></span><span className="table-text-title">ETH</span><span className="table-text-bold">{Math.round(this.state.treasury.wethInElixir*100)/100}</span><span className="important-2">${Math.round(wethInElixirUsd/10000)/100}M</span>
                <span className="small-table-row-2"></span><span></span><span className="important-3">Total</span><span className="important-3">${Math.round((elixirCvxAlEthCrvValue+this.state.treasury.cvxAlUsd3CrvElixir+this.state.treasury.daiInElixir+wethInElixirUsd)/10000)/100}M</span>
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
      </>}
      
      {this.state.activeTab !== "debt" ? "" : 
      <Debt ethPrice={this.state.tokenPrices.eth} v2EthTVL={v2EthTVL} v2StethTVL={v2StethTVL} v2RethTVL={v2RethTVL}
      v2DaiTVL={v2DaiTVL} v2UsdcTVL={v2UsdcTVL} v2UsdtTVL={v2UsdtTVL} />
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