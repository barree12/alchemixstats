import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Web3 from 'web3';
import Deposits from './Deposits';
import AlAssets from './AlAssets';
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
//FOR TESTING - const web3 = new Web3('https://eth-mainnet.g.alchemy.com/v2/m4nhopYhysiwNnoLZ7vnyxxwjHHtYcKP');
const web3 = new Web3('https://eth-mainnet.public.blastapi.io');
//const web3ftm = new Web3('https://rpcapi-tracing.fantom.network');
//const web3optimism = new Web3('https://mainnet.optimism.io');
const web3optimism = new Web3('https://opt-mainnet.g.alchemy.com/v2/p9poBr_K0kBvzVt3V6Lo1wasL9r32FpP');
const web3arbitrum = new Web3('https://arb1.arbitrum.io/rpc')
//const web3metis = new Web3('https://metis-mainnet.public.blastapi.io')

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
      lps: {},
      transmuters: {},
      alAssetCrvSupply: {},
      debankData: {},
      alAssetSupply: {},
      alchemistStats: {},
      transmuterStats: {},
      tokenPricesLoading: true,
      v2CurrentLoading: true,
      stakingLoading: true,
      lpsLoading: true,
      alUsdPegLoading: true,
      alEthPegLoading: true,
      alcxDataLoading: true,
      alchemistStatsLoading: true,
      transmuterStatsLoading: true,
      alUsdLoading: true,
      debankDataLoading: true,
      activeTab: 'treasury'
    };
    this.selectTab = this.selectTab.bind(this);

    this.cvxAlUsd3CrvStakingContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.cvxAlUsd3CrvStakingContractAddress);
    this.cvxAlEthCrvStakingContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.cvxAlEthCrvStakingContractAddress);
    //this.vlCvxTrackerContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.vlCvxTrackerAddress);
    this.alcxContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alcxAddress);
    //this.masterChefContract = new web3.eth.Contract(abis.masterChefAbi, addresses.masterChefAddress);
    this.wethContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.wethAddress);
    this.alUsd3CrvContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alUsd3CrvContractAddress);
    this.alUsdSdolaContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alUsdSdolaContractAddress);
    this.alUsdContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alUsdAddress);
    this.fraxContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.fraxAddress);
    this.crv3Contract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.crv3Address);
    this.alEthFrxEthContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.frxEthAlEthContractAddress);
    this.frxUsdContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.frxUsdContractAddress);
    //this.sdCrvContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.sdCrvGaugeContractAddress);
    this.sEthContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.sEthAddress);
    this.alEthContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alEthAddress);
    this.frxEthContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.frxEthAddress);
    this.daiContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.daiAddress);
    this.alUsdOptimismContract = new web3optimism.eth.Contract(abis.erc20LikeAbi, addresses.alUsdOptimismContractAddress);
    this.alEthOptimismContract = new web3optimism.eth.Contract(abis.erc20LikeAbi, addresses.alEthOptimismContractAddress);
    this.usdcOptimismContract = new web3optimism.eth.Contract(abis.erc20LikeAbi, addresses.usdcOptimismContractAddress);
    this.wethOptimismContract = new web3optimism.eth.Contract(abis.erc20LikeAbi, addresses.wethOptimismContractAddress);
    this.alUsdArbitrumContract = new web3arbitrum.eth.Contract(abis.erc20LikeAbi, addresses.arbiAlUsdContractAddress);
    this.alEthArbitrumContract = new web3arbitrum.eth.Contract(abis.erc20LikeAbi, addresses.arbitrumAlEthContractAddress);
    this.veloStatsContract = new web3optimism.eth.Contract(abis.veloStatsAbi, addresses.veloStats);
    this.sDolaContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.sDolaContractAddress);
    this.pxEthContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.pxEthContractAddress);
    this.alUsdUsdcArbi = new web3arbitrum.eth.Contract(abis.erc20LikeAbi, addresses.curveArbiAlUsdUsdcContractAddress);
    this.alEthWethArbi = new web3arbitrum.eth.Contract(abis.erc20LikeAbi, addresses.curveArbiAlEthWethContractAddress);
    this.wethArbitrumContract = new web3arbitrum.eth.Contract(abis.erc20LikeAbi, addresses.wethArbitrumContractAddress);
    this.usdcArbitrumContract = new web3arbitrum.eth.Contract(abis.erc20LikeAbi, addresses.usdcArbitrumContractAddress);
    this.alUsdFrxUsdCurve = new web3.eth.Contract(abis.erc20LikeAbi, addresses.alUsdFrxUsdCurveContractAddress);
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

  aggregateWeb3Calls(){

    let authorizationHeader = {
      method: 'GET',
      headers: { 
        'pinata_api_key': '7237805a818b4433e8a1',
        'pinata_secret_api_key': '1b5bf925a71ba50d2649a1861e00210ac142a74a20562f743f160d6d820cad23'
      }
    }

    let alAssetSupply = {alEth: 0, alUsd: 0, alUsdOptimism: 0, nextAlUsdOptimism: 0}
    let tokenParams = {}

    Promise.all([fetch("https://api.pinata.cloud/data/pinList?includeCount=false&metadata[name]=alchemixStatsYieldTokenData.json&status=pinned", authorizationHeader).then(res => res.json()),
    ])
      .then(([ipfsOptiFile]) => {
        let url = "https://ipfs.imimim.info/ipfs/" + ipfsOptiFile.rows[0].ipfs_pin_hash;
        Promise.all([fetch(url).then(res => res.json()),
          this.wethContract.methods.balanceOf(addresses.tempMigrateEthAddress).call(),
          this.daiContract.methods.balanceOf(addresses.tempMigrateDaiAddress).call(),
          this.alEthContract.methods.totalSupply().call(),
          this.alUsdContract.methods.totalSupply().call(),
          this.alUsdOptimismContract.methods.totalSupply().call(),
          this.alUsdArbitrumContract.methods.totalSupply().call(),
          this.alEthOptimismContract.methods.totalSupply().call(),
          this.alEthArbitrumContract.methods.totalSupply().call()])
        .then(([tokenParamsResult, alEthSupply, alUsdSupply, alUsdSupplyOptimism, alUsdSupplyArbitrum, alEthSupplyOptimism, alEthSupplyArbitrum]) => {
        //console.log(tokenParams)

        alAssetSupply.alEth = alEthSupply/Math.pow(10, 18);
        alAssetSupply.alEthOptimism = alEthSupplyOptimism/Math.pow(10, 18);
        alAssetSupply.alEthArbitrum = alEthSupplyArbitrum/Math.pow(10, 18);
        alAssetSupply.alUsd = alUsdSupply/Math.pow(10, 18);
        alAssetSupply.alUsdOptimism = alUsdSupplyOptimism/Math.pow(10, 18);
        alAssetSupply.alUsdArbitrum = alUsdSupplyArbitrum/Math.pow(10, 18);
        this.setState({ alAssetSupply: alAssetSupply, v2CurrentLoading: false });
        }).catch(function(err) { console.log(err.message) });
      }).catch(function(err) { console.log(err.message); });
  }

  getCurvePoolBalances(){
    let alAssetCrvSupply = { alUsd3Crv: 0, alEthFrxEthValue: 0, alUsdFraxBp: 0, alUsdSdola: 0 };
    Promise.all([
      this.alUsd3CrvContract.methods.totalSupply().call(),
      this.alEthFrxEthContract.methods.totalSupply().call(),
      this.alEthFrxEthContract.methods.get_virtual_price().call(),
      this.alUsdSdolaContract.methods.totalSupply().call(),
      this.alUsdUsdcArbi.methods.totalSupply().call(),
      this.alEthWethArbi.methods.totalSupply().call(),
      this.alUsdFrxUsdCurve.methods.totalSupply().call()
    ])
    .then(([alUsd3CrvSupply, alEthFrxEthSupply, alEthFrxEthVirtualPrice, alUsdSdolaSupply, alUsdUsdcArbiSupply, alEthWethArbiSupply, alUsdFrxUsdCurveSupply]) => {
      alAssetCrvSupply.alUsd3Crv = alUsd3CrvSupply/Math.pow(10, 18);
      alAssetCrvSupply.alEthFrxEthValue = (alEthFrxEthSupply/Math.pow(10, 18))*(alEthFrxEthVirtualPrice/Math.pow(10, 18));
      alAssetCrvSupply.alUsdSdola = alUsdSdolaSupply/Math.pow(10, 18);
      alAssetCrvSupply.arbiAlUsdUsdc = alUsdUsdcArbiSupply/Math.pow(10, 18);
      alAssetCrvSupply.arbiAlEthWeth = alEthWethArbiSupply/Math.pow(10, 18);
      alAssetCrvSupply.alUsdFrxUsd = alUsdFrxUsdCurveSupply/Math.pow(10, 18);
      this.setState({ alAssetCrvSupply: alAssetCrvSupply, stakingLoading: false })
    })
    .catch(function(err) {
      console.log(err.message);
    });
  }

  getLPs(){
    let alUsdUsdc = "sAMMV2-USDC/alUSD";
    let ethPool = "sAMMV2-alETH/WETH";
    let frxEth = "sAMMV2-alETH/frxETH";
    let pxEthAlEth = 'sAMMV2-pxETH/alETH';
    let dolaAlUsd = 'sAMMV2-DOLA/alUSD';
    let lps = { alUsdIn3Crv: 0, crv3In3Crv: 0, alUsdInVelodrome: 0, usdcInVelodrome: 0, alEthInVelodrome: 0, wethInVelodrome: 0, alEthInFrxEthCrv: 0, frxEthInFrxEthCrv: 0, pxEthInVeloAlEth: 0, alEthInVeloAlEth: 0, alUsdInVeloDolaAlUsd: 0, dolaInVeloDolaAlUsd: 0, alUsdInCurveDola: 0, sdolaInCurveDola: 0, alUsdInArbiUsdc: 0, usdcInArbiUsdc: 0, alEthInArbiWeth: 0, wethInArbiWeth: 0 }
    Promise.all([this.alUsdContract.methods.balanceOf(addresses.alUsd3CrvContractAddress).call(),
      this.crv3Contract.methods.balanceOf(addresses.alUsd3CrvContractAddress).call(),
      this.alEthContract.methods.balanceOf(addresses.saddleAlEthPoolContractAddress).call(),
      this.wethContract.methods.balanceOf(addresses.saddleAlEthPoolContractAddress).call(),
      this.sEthContract.methods.balanceOf(addresses.saddleAlEthPoolContractAddress).call(),
      this.alEthContract.methods.balanceOf(addresses.frxEthAlEthContractAddress).call(),
      this.frxEthContract.methods.balanceOf(addresses.frxEthAlEthContractAddress).call(),
      this.alEthContract.methods.balanceOf(addresses.curveAlEthWethPoolContractAddress).call(),
      this.wethContract.methods.balanceOf(addresses.curveAlEthWethPoolContractAddress).call(),
      this.alUsdContract.methods.balanceOf(addresses.curveAlUsdDolaPoolContractAddress).call(),
      this.sDolaContract.methods.balanceOf(addresses.curveAlUsdDolaPoolContractAddress).call(),
      this.veloStatsContract.methods.all(480,0).call(),
      this.veloStatsContract.methods.all(480,480).call(),
      this.alUsdContract.methods.balanceOf(addresses.alUsdFrxUsdCurveContractAddress).call(),
      this.frxUsdContract.methods.balanceOf(addresses.alUsdFrxUsdCurveContractAddress).call(),
      this.alUsdArbitrumContract.methods.balanceOf(addresses.curveArbiAlUsdUsdcContractAddress).call(),
      this.usdcArbitrumContract.methods.balanceOf(addresses.curveArbiAlUsdUsdcContractAddress).call(),
      this.alEthArbitrumContract.methods.balanceOf(addresses.curveArbiAlEthWethContractAddress).call(),
      this.wethArbitrumContract.methods.balanceOf(addresses.curveArbiAlEthWethContractAddress).call()
    ])
    .then(([alUsdIn3Crv, crv3In3Crv, alEthInSaddle, wethInSaddle, sEthInSaddle, alEthInFrxEthCrv, frxEthInFrxEthCrv, alEthInAlEthWethCrv, wethInAlEthWethCrv, alUsdInCurveDola, sdolaInCurveDola, veloStats1, veloStats2, alUsdInCurveFrxUsd, frxUsdInCurveFrxUsd, alUsdInArbiUsdc, usdcInArbiUsdc, alEthInArbiWeth, wethInArbiWeth]) => {
      lps.alUsdIn3Crv = alUsdIn3Crv/Math.pow(10, 18);
      lps.crv3In3Crv = crv3In3Crv/Math.pow(10, 18);
      lps.alEthInSaddle = alEthInSaddle/Math.pow(10, 18);
      lps.wethInSaddle = wethInSaddle/Math.pow(10, 18);
      lps.sEthInSaddle = sEthInSaddle/Math.pow(10, 18);
      lps.alEthInFrxEthCrv = alEthInFrxEthCrv/Math.pow(10, 18);
      lps.frxEthInFrxEthCrv = frxEthInFrxEthCrv/Math.pow(10, 18);
      lps.alEthInAlEthWethCrv = alEthInAlEthWethCrv/Math.pow(10, 18);
      lps.wethInAlEthWethCrv = wethInAlEthWethCrv/Math.pow(10, 18);
      lps.alUsdInCurveDola = alUsdInCurveDola/Math.pow(10, 18);
      lps.sdolaInCurveDola = sdolaInCurveDola/Math.pow(10, 18);
      lps.frxUsdInCurveFrxUsd = frxUsdInCurveFrxUsd/Math.pow(10, 18);
      lps.alUsdInCurveFrxUsd = alUsdInCurveFrxUsd/Math.pow(10, 18);
      lps.alUsdInArbiUsdc = alUsdInArbiUsdc/Math.pow(10, 18);
      lps.usdcInArbiUsdc = usdcInArbiUsdc/Math.pow(10, 6);
      lps.alEthInArbiWeth = alEthInArbiWeth/Math.pow(10, 18);
      lps.wethInArbiWeth = wethInArbiWeth/Math.pow(10, 18);
      let veloStats = veloStats1.concat(veloStats2)
      for(let i=0;i<veloStats.length;i++){
        if(veloStats[i][1] === alUsdUsdc) {
          lps.alUsdInVelodrome = parseInt(veloStats[i][12]) / Math.pow(10,18);
          lps.usdcInVelodrome = parseInt(veloStats[i][9]) / Math.pow(10,6);
        }
        if(veloStats[i][1] === ethPool) {
          lps.alEthInVelodrome = parseInt(veloStats[i][9]) / Math.pow(10,18);
          lps.wethInVelodrome = parseInt(veloStats[i][12]) / Math.pow(10,18);
        }
        if(veloStats[i][1] === dolaAlUsd) {
          lps.dolaInVeloDolaAlUsd = parseInt(veloStats[i][9]) / Math.pow(10,18);
          lps.alUsdInVeloDolaAlUsd = parseInt(veloStats[i][12]) / Math.pow(10,18);
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

  calculateAlEthPeg(){
    let result = []
    let alEthPeg = { date: [0], peg: [0], pegPerc: [0] }
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

  calculateAlUsdPeg(){
    let usdcPeg = []
    let usdcIndex = 0;
    let alUsdPeg = { usdc: { date: [0], peg: [0], pegPerc: [0] }};
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

  calculateAlchemistStats(result){
    const startingDate = new Date(Number(result[0].timestamp) * 1000);
    let currentDate = startingDate.toISOString().split('T')[0];
    let alchemistStats = [];
    let formattedStats = { date: [], usdMainnetMyt: [], usdMainnetDebt: [], ethMainnetMyt: [], ethMainnetDebt: [], usdOptimismMyt: [], usdOptimismDebt: [], ethOptimismMyt: [], ethOptimismDebt: [], usdArbitrumMyt: [], usdArbitrumDebt: [], ethArbitrumMyt: [], ethArbitrumDebt: [] }
    let statObject = { date: currentDate, usdMainnet: { myt: 0, debt: 0 }, ethMainnet: { myt: 0, debt: 0 }, usdOptimism: { myt: 0, debt: 0 }, ethOptimism: { myt: 0, debt: 0 }, usdArbitrum: { myt: 0, debt: 0 }, ethArbitrum: { myt: 0, debt: 0 } };
    for(let i=0;i<result.length;i++){
      try {
          const date = new Date(Number(result[i].timestamp) * 1000);
          const dayString = date.toISOString().split('T')[0];
          if(dayString !== currentDate){
            alchemistStats.push(statObject);
            currentDate = dayString;
            statObject.date = currentDate;
            statObject = JSON.parse(JSON.stringify(statObject));
          }
          if(result[i].chain === "mainnet" && result[i].alchemist === addresses.mainnetUsdcAlchemist){ statObject.usdMainnet.myt = Math.round(result[i].myttvl/Math.pow(10, 22))/100; statObject.usdMainnet.debt = Math.round(result[i].totalDebt/Math.pow(10, 22))/100 }
          if(result[i].chain === "mainnet" && result[i].alchemist === addresses.mainnetEthAlchemist){ statObject.ethMainnet.myt = Math.round(result[i].myttvl/Math.pow(10, 18)); statObject.ethMainnet.debt = Math.round(result[i].totalDebt/Math.pow(10, 18)) }
          if(result[i].chain === "optimism" && result[i].alchemist === addresses.optimismUsdcAlchemist){ statObject.usdOptimism.myt = Math.round(result[i].myttvl/Math.pow(10, 22))/100; statObject.usdOptimism.debt = Math.round(result[i].totalDebt/Math.pow(10, 22))/100 }
          if(result[i].chain === "optimism" && result[i].alchemist === addresses.optimismEthAlchemist){ statObject.ethOptimism.myt = Math.round(result[i].myttvl/Math.pow(10, 18)); statObject.ethOptimism.debt = Math.round(result[i].totalDebt/Math.pow(10, 18)) }
          if(result[i].chain === "arbitrumOne" && result[i].alchemist === addresses.arbitrumUsdcAlchemist){ statObject.usdArbitrum.myt = Math.round(result[i].myttvl/Math.pow(10, 22))/100; statObject.usdArbitrum.debt = Math.round(result[i].totalDebt/Math.pow(10, 22))/100 }
          if(result[i].chain === "arbitrumOne" && result[i].alchemist === addresses.arbitrumEthAlchemist){ statObject.ethArbitrum.myt = Math.round(result[i].myttvl/Math.pow(10, 18)); statObject.ethArbitrum.debt = Math.round(result[i].totalDebt/Math.pow(10, 18)) }
      }
      catch (err) {
        console.log(err)
      }
    }
    for(let i=1;i<alchemistStats.length;i++){
      try {
        formattedStats.date[i] = alchemistStats[i].date;
        formattedStats.usdMainnetMyt[i] = alchemistStats[i].usdMainnet.myt;
        formattedStats.usdMainnetDebt[i] = alchemistStats[i].usdMainnet.debt;
        formattedStats.ethMainnetMyt[i] = alchemistStats[i].ethMainnet.myt;
        formattedStats.ethMainnetDebt[i] = alchemistStats[i].ethMainnet.debt;
        formattedStats.usdOptimismMyt[i] = alchemistStats[i].usdOptimism.myt;
        formattedStats.usdOptimismDebt[i] = alchemistStats[i].usdOptimism.debt;
        formattedStats.ethOptimismMyt[i] = alchemistStats[i].ethOptimism.myt;
        formattedStats.ethOptimismDebt[i] = alchemistStats[i].ethOptimism.debt;
        formattedStats.usdArbitrumMyt[i] = alchemistStats[i].usdArbitrum.myt;
        formattedStats.usdArbitrumDebt[i] = alchemistStats[i].usdArbitrum.debt;
        formattedStats.ethArbitrumMyt[i] = alchemistStats[i].ethArbitrum.myt;
        formattedStats.ethArbitrumDebt[i] = alchemistStats[i].ethArbitrum.debt;
      }
      catch (err) {
        console.log(err)
      }
    }
    this.setState({ alchemistStats: formattedStats, alchemistStatsLoading: false });
  }

  calculateTransmuterStats(result){
    console.log(result)
    const startingDate = new Date(Number(result[0].timestamp) * 1000);
    let currentDate = startingDate.toISOString().split('T')[0];
    let transmuterStats = [];
    let formattedStats = { date: [], usdMainnet: [], ethMainnet: [], usdOptimism: [], ethOptimism: [], usdArbitrum: [], ethArbitrum: [] }
    let statObject = { date: currentDate, usdMainnet: 0, ethMainnet: 0, usdOptimism: 0, ethOptimism: 0, usdArbitrum: 0, ethArbitrum: 0 };
    for(let i=0;i<result.length;i++){
      try {
          const date = new Date(Number(result[i].timestamp) * 1000);
          const dayString = date.toISOString().split('T')[0];
          if(dayString !== currentDate){
            transmuterStats.push(statObject);
            currentDate = dayString;
            statObject.date = currentDate;
            statObject = JSON.parse(JSON.stringify(statObject));
          }
          if(result[i].chain === "mainnet" && result[i].transmuter === addresses.mainnetAlUsdTransmuter){ statObject.usdMainnet = Math.round(result[i].totalLocked/Math.pow(10, 22))/100; }
          if(result[i].chain === "mainnet" && result[i].transmuter === addresses.mainnetAlEthTransmuter){ statObject.ethMainnet = Math.round(result[i].totalLocked/Math.pow(10, 18)); }
          if(result[i].chain === "optimism" && result[i].transmuter === addresses.optimismAlUsdTransmuter){ statObject.usdOptimism = Math.round(result[i].totalLocked/Math.pow(10, 22))/100; }
          if(result[i].chain === "optimism" && result[i].transmuter === addresses.optimismAlEthTransmuter){ statObject.ethOptimism = Math.round(result[i].totalLocked/Math.pow(10, 18)); }
          if(result[i].chain === "arbitrumOne" && result[i].transmuter === addresses.arbitrumAlUsdTransmuter){ statObject.usdArbitrum = Math.round(result[i].totalLocked/Math.pow(10, 22))/100; }
          if(result[i].chain === "arbitrumOne" && result[i].transmuter === addresses.arbitrumAlEthTransmuter){ statObject.ethArbitrum = Math.round(result[i].totalLocked/Math.pow(10, 18)); }
      }
      catch (err) {
        console.log(err)
      }
    }
    for(let i=1;i<transmuterStats.length;i++){
      try {
        formattedStats.date[i] = transmuterStats[i].date;
        formattedStats.usdMainnet[i] = transmuterStats[i].usdMainnet;
        formattedStats.usdMainnet[i] = transmuterStats[i].usdMainnet;
        formattedStats.ethMainnet[i] = transmuterStats[i].ethMainnet;
        formattedStats.ethMainnet[i] = transmuterStats[i].ethMainnet;
        formattedStats.usdOptimism[i] = transmuterStats[i].usdOptimism;
        formattedStats.usdOptimism[i] = transmuterStats[i].usdOptimism;
        formattedStats.ethOptimism[i] = transmuterStats[i].ethOptimism;
        formattedStats.ethOptimism[i] = transmuterStats[i].ethOptimism;
        formattedStats.usdArbitrum[i] = transmuterStats[i].usdArbitrum;
        formattedStats.usdArbitrum[i] = transmuterStats[i].usdArbitrum;
        formattedStats.ethArbitrum[i] = transmuterStats[i].ethArbitrum;
        formattedStats.ethArbitrum[i] = transmuterStats[i].ethArbitrum;
      }
      catch (err) {
        console.log(err)
      }
    }
    console.log(formattedStats)
    this.setState({ transmuterStats: formattedStats, transmuterStatsLoading: false });
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
    object === "FRAX") return true;
    else return false;
  }

  calculateDebankData(data){
    let totalTreasury = 0;
    let totalTreasuryStrategic = 0;
    let alcxInTreasury = 0;
    let alUsdInElixir = 0;
    let alUsdAmountInElixir = 0;
    let alEthInElixir = 0;
    let alEthAmountInElixir = 0;
    let alEthFrxEthInElixir = 0;
    let alUsdSdolaInElixir = 0;
    let alUsdUsdcArbiInElixir = 0;
    let alEthWethArbiInElixir = 0;
    let alUsdUsdcVeloInElixir = 0;
    let alEthWethVeloInElixir = 0;
    let alEthPxEthVeloInElixir = 0;
    let alUsdFrxUsdInElixir = 0;
    let msUsdFraxBpInElixir = 0;
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
    let alUsdFraxbpConvexId = '0x41a5881c17185383e19df6fa4ec158a6f4851a69:19';
    let alEthFrxEthConvexId = '0x41a5881c17185383e19df6fa4ec158a6f4851a69:54';
    let alUsdSdolaConvexId = '0x7ee5f33e36988070a8e265a0f28a91514f45f630';
    let alEthWethVelodromeId = '0xc16adbf2d01d6524b79cbb610ce31d5db80eee3c';
    let alUsdUsdcVelodromeId = '0xe8b219c285e4e4ec28ac80fdc4b9739b18cb8890';
    let alEthPxEthVelodromeId = '0x28cd6d3471e031f8b380a64e9da3b9b12a473186';
    let alEthFrxEthVelodromeId = '0xfc0b9a9c2b63e6acaca91a77a80bfa83c615e6c5';
    let veloAlEthWethAddress = '0xa1055762336F92b4B8d2eDC032A0Ce45ead6280a';
    let veloAlUsdUsdcAddress = '0x124d69daeda338b1b31ffc8e429e39c9a991164e';
    let veloAlEthPxEthAddress = '0x03799d6a59624abdd50f8774d360a64f4fbfdcf5';
    let arbiCurveAlUsdUsdcAddress = '0x52c43c76d268cf9a343b9aaa38974a50c455f372';
    let arbiCurveAlEthWethAddress = '0xd1af6aa20925875bfd3b3159f4cf92eb3cb13f3d';
    let msUsdFraxBpId = '0x9bf0216c1be33dd00aca3c558b500f1e294685e6';
    let alUsdFrxUsdId = '0xf368868d253d7f956529ee55515fea250c67e890';
    
    let tempDebankCalc = {};
    let tokensConcat = [];
    let protocolsConcat = [];
    let elixirTokensConcat = [];
    let elixirProtocolsConcat = [];

    let veloAlEthWethPool;
    let veloAlUsdUsdcPool;
    let veloAlEthPxEthPool;
    for(let i=0;i<data.pools.length;i++){
      if(data.pools[i].address === veloAlEthWethAddress) veloAlEthWethPool = data.pools[i].total_balance.total_usd_value;
      if(data.pools[i].address === veloAlUsdUsdcAddress) veloAlUsdUsdcPool = data.pools[i].total_balance.total_usd_value;
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

    treasuryAssetsStrategic["FRAX"] += treasuryAssets["sdFXS"];
    treasuryAssets["sdFXS"] = 0;

    for(let i=0;i<tokensConcat.length-1;i++){
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
          else if(elixirProtocolsConcat[i].portfolio_item_list[j].pool.id === alEthPxEthVelodromeId) alEthPxEthVeloInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
          else if(elixirProtocolsConcat[i].portfolio_item_list[j].pool.id === arbiCurveAlUsdUsdcAddress) {
            alUsdUsdcArbiInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
          }
          else if(elixirProtocolsConcat[i].portfolio_item_list[j].pool.id === arbiCurveAlEthWethAddress) {
            alEthWethArbiInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
          } 
          else {
            if(elixirProtocolsConcat[i].portfolio_item_list[j].pool.id === alEthFrxEthConvexId) alEthFrxEthInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
            if(elixirProtocolsConcat[i].portfolio_item_list[j].pool.id === alUsdSdolaConvexId) alUsdSdolaInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
            if(elixirProtocolsConcat[i].portfolio_item_list[j].pool.id === alUsdFrxUsdId) alUsdFrxUsdInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
            if(elixirProtocolsConcat[i].portfolio_item_list[j].pool.id === msUsdFraxBpId) msUsdFraxBpInElixir += elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].amount * elixirProtocolsConcat[i].portfolio_item_list[j].asset_token_list[k].price;
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

    let totalElixir = alEthFrxEthInElixir + alUsdSdolaInElixir + alUsdFrxUsdInElixir + msUsdFraxBpInElixir + alEthWethArbiInElixir + alUsdUsdcArbiInElixir + alEthWethVeloInElixir + alUsdUsdcVeloInElixir + alEthPxEthVeloInElixir;

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
      alUsdSdolaInElixir: alUsdSdolaInElixir,
      alEthWethArbiInElixir: alEthWethArbiInElixir,
      alUsdUsdcArbiInElixir: alUsdUsdcArbiInElixir,
      alEthWethVeloInElixir: alEthWethVeloInElixir,
      alUsdUsdcVeloInElixir: alUsdUsdcVeloInElixir,
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
      alUsdFrxUsdInElixir: alUsdFrxUsdInElixir,
      msUsdFraxBpInElixir: msUsdFraxBpInElixir,
      alUsdBackingTokensInElixir: alUsdBackingTokensInElixir,
      alEthBackingTokensInElixir: alEthBackingTokensInElixir,
      alUsdAmountInElixir: alUsdAmountInElixir,
      veloAlEthWethPool: veloAlEthWethPool,
      veloAlUsdUsdcPool: veloAlUsdUsdcPool,
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

  getTransmuterStatsQuery(){
    return `{
      transmuterStats (
            limit: 1000, 
            orderBy: "timestamp", 
            orderDirection: "desc"
      ) {
        items {
          totalLocked
          timestamp
          chain
          transmuter
        }
      }
    }`
  }

  getAlchemistStatsQuery(){
    return `{
      alchemistStats (
        limit: 1000, 
        orderBy: "timestamp", 
        orderDirection: "desc"
      ) {
        items {
          totalDebt
          timestamp
          alchemist
          myttvl
          chain
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
    const alchemistStatsQuery = this.getAlchemistStatsQuery();
    const transmuterStatsQuery = this.getTransmuterStatsQuery();

    let authorizationHeader = {
      method: 'GET',
      headers: { 
        'pinata_api_key': '7237805a818b4433e8a1',
        'pinata_secret_api_key': '1b5bf925a71ba50d2649a1861e00210ac142a74a20562f743f160d6d820cad23'
      }
    }

    Promise.all([
      //fetch("https://gateway-arbitrum.network.thegraph.com/api/c1a654d7642ea0e30d259cd58e8b41d5/subgraphs/id/FQHEgGziETEqw7oV32wLvFGCPthqj5YDMm7jhVtLn5PJ", this.getSubgraphRequestOptions(usdcPegQuery)).then(res => res.json()),
      //fetch("https://gateway-arbitrum.network.thegraph.com/api/c1a654d7642ea0e30d259cd58e8b41d5/subgraphs/id/FQHEgGziETEqw7oV32wLvFGCPthqj5YDMm7jhVtLn5PJ", this.getSubgraphRequestOptions(alEthPegQuery)).then(res => res.json()),
      fetch("https://ponder--ponder--qsxl6ml4dlkk.code.run", this.getSubgraphRequestOptions(alchemistStatsQuery)).then(res => res.json()),
      fetch("https://ponder--ponder--qsxl6ml4dlkk.code.run", this.getSubgraphRequestOptions(transmuterStatsQuery)).then(res => res.json())
    ])
      .then(([alchemistStats, transmuterStats]) => {
        //this.calculateAlUsdPeg(usdcPeg.data.poolHistoricalRates.reverse())
        //this.calculateAlEthPeg(alEthPeg.data.poolHistoricalRates.reverse())
        this.calculateAlEthPeg()
        this.calculateAlUsdPeg()
        this.calculateAlchemistStats(alchemistStats.data.alchemistStats.items.reverse())
        this.calculateTransmuterStats(transmuterStats.data.transmuterStats.items.reverse())
        //console.log(alchemistStats)
        /*let url = "https://ipfs.imimim.info/ipfs/" + ipfsOptiFile.rows[0].ipfs_pin_hash;
        fetch(url).then(res => res.json()).then(
          (l2AlchemistTvl) => { 
            this.calculateOptiTvl(l2AlchemistTvl)
            this.calculateArbiTvl(l2AlchemistTvl)
          },
          (error) => { console.log(error) })*/
      })
      .catch(function(err) {
        console.log(err.message);
      });
    
  }

  render() {
  let v3MainnetAlchemistEthTvlUsd = (this.state.tokenPricesLoading || this.state.alchemistStatsLoading) ? 0 : Math.round(this.state.alchemistStats.ethMainnetMyt[this.state.alchemistStats.ethMainnetMyt.length-1]*this.state.tokenPrices.eth/10000)/100;
  let v3OptimismAlchemistEthTvlUsd = (this.state.tokenPricesLoading || this.state.alchemistStatsLoading) ? 0 : Math.round(this.state.alchemistStats.ethOptimismMyt[this.state.alchemistStats.ethOptimismMyt.length-1]*this.state.tokenPrices.eth/10000)/100;
  let v3ArbitrumAlchemistEthTvlUsd = (this.state.tokenPricesLoading || this.state.alchemistStatsLoading) ? 0 : Math.round(this.state.alchemistStats.ethArbitrumMyt[this.state.alchemistStats.ethArbitrumMyt.length-1]*this.state.tokenPrices.eth/10000)/100;
  let alcxTotalMarketcap = (this.state.alcxDataLoading || this.state.debankDataLoading) ? 0 : Math.round(this.state.alcxData.marketcap*100 + this.state.debankData.alcxInTreasury/10000)/100;
  let ethDeposits = (this.props.v2CurrentLoading || this.state.alchemistStatsLoading) ? 0 : Math.round(this.state.alchemistStats.ethMainnetMyt[this.state.alchemistStats.ethMainnetMyt.length-1] + this.state.alchemistStats.ethOptimismMyt[this.state.alchemistStats.ethOptimismMyt.length-1]);
  let stablecoinDeposits = (this.props.v2CurrentLoading || this.state.alchemistStatsLoading) ? 0 : Math.round((this.state.alchemistStats.usdMainnetMyt[this.state.alchemistStats.usdMainnetMyt.length-1] + this.state.alchemistStats.usdOptimismMyt[this.state.alchemistStats.usdOptimismMyt.length-1] + this.state.alchemistStats.usdArbitrumMyt[this.state.alchemistStats.usdArbitrumMyt.length-1])*100)/100;
  let ethDepositsUsd = Math.round((v3MainnetAlchemistEthTvlUsd + v3OptimismAlchemistEthTvlUsd)*100)/100;
  let alEthFrxEthTotalValue = (this.state.tokenPricesLoading || this.state.stakingLoading) ? 0 : this.state.alAssetCrvSupply.alEthFrxEthValue * this.state.tokenPrices.eth;
  let alEthWethArbiTotalValue = (this.state.tokenPricesLoading || this.state.stakingLoading) ? 0 : this.state.alAssetCrvSupply.arbiAlEthWeth * this.state.tokenPrices.eth;
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
        alUsdPegLoading={this.state.alUsdPegLoading} alEthPegLoading={this.state.alEthPegLoading}
        lpsLoading={this.state.lpsLoading}
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
                {this.state.activeTab === "transmuters" ? 
                <div className="general-switcher-buttons-active" onClick={() => {this.selectTab("transmuters")}}>
                    <img src={ require('./logos/vaults.svg').default } alt="vaults logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Transmuters</div>
                </div> :
                <div className="general-switcher-buttons-inactive" onClick={() => {this.selectTab("transmuters")}}>
                    <img src={ require('./logos/vaults.svg').default } alt="vaults logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Transmuters</div>
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
                {this.state.activeTab === "transmuters" ? 
                <div className="general-switcher-buttons-active" onClick={() => {this.selectTab("transmuters")}}>
                    <img src={ require('./logos/vaults.svg').default } alt="transmuters logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Transmuters</div>
                </div> :
                <div className="general-switcher-buttons-inactive" onClick={() => {this.selectTab("transmuters")}}>
                    <img src={ require('./logos/debt_thin.svg').default } alt="revenues logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">Transmuters</div>
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
                    <img src={ require('./logos/alusd.svg').default } alt="alassets logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">alAssets</div>
                </div> :
                <div className="general-switcher-buttons-inactive" onClick={() => {this.selectTab("alassets")}}>
                    <img src={ require('./logos/alusd.svg').default } alt="alassets logo" className="image-menu" />
                    <div className="general-switcher-buttons-inside">alAssets</div>
                </div>}
            </div>
          </div>
      </div>
      <br/>
      <br/>
      {this.state.activeTab !== "emissions" ? "" :
      <Emissions alcxData={this.state.alcxData} alcxDataLoading={this.state.alcxDataLoading} alcxTotalMarketcap={alcxTotalMarketcap} />
      }
      {this.state.activeTab !== "deposits" ? "" : ((this.state.tokenPricesLoading || this.state.v2CurrentLoading || this.state.alchemistStatsLoading || this.state.transmuterStatsLoading) ? "Loading..." :
        <Deposits
          v3MainnetAlchemistEthTvlUsd={v3MainnetAlchemistEthTvlUsd} v3OptimismAlchemistEthTvlUsd={v3OptimismAlchemistEthTvlUsd}
          v3ArbitrumAlchemistEthTvlUsd={v3ArbitrumAlchemistEthTvlUsd} tokenPrices={this.state.tokenPrices}
          alchemistStats={this.state.alchemistStats} alchemistStatsLoading={this.state.alchemistStatsLoading}
        />)}

      {this.state.activeTab !== "transmuters" ? "" :
      <Transmuters
        transmuterStats={this.state.transmuterStats} transmuterStatsLoading={this.state.transmuterStatsLoading}
        />}

      {this.state.activeTab !== "treasury" ? "" :
      <Treasury
        debankData={this.state.debankData}
        debankDataLoading={this.state.debankDataLoading}
        alAssetCrvSupply={this.state.alAssetCrvSupply}
        alEthFrxEthTotalValue={alEthFrxEthTotalValue}
        alEthWethArbiTotalValue={alEthWethArbiTotalValue}
        />}
      
      {this.state.activeTab !== "revenues" ? "" : 
      <Revenues ethPrice={this.state.tokenPrices.eth} />
      }

      {this.state.activeTab !== "alassets" ? "" : ((this.state.alUsdPegLoading || this.state.alEthPegLoading || this.state.lpsLoading || this.state.tokenPricesLoading || this.state.v2CurrentLoading || this.state.debankDataLoading) ? "Loading..." :
      <AlAssets 
          alUsdPeg={this.state.alUsdPeg} alEthPeg={this.state.alEthPeg} lps={this.state.lps} ethPrice={this.state.tokenPrices.eth}
          alAssetSupply={this.state.alAssetSupply} debankData={this.state.debankData}
      />)
      }

    </div>
  );
}
}