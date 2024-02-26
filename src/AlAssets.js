import React from 'react';
import ChartAlusdPrice from './charts/ChartAlusdPrice';
import ChartAlEthPrice from './charts/ChartAlEthPrice';
import AlEthSummary from './AlEthSummary';
import AlUsdSummary from './AlUsdSummary';
import { Switch, Button, ButtonGroup } from '@mui/material';
import LoadingComponent from './LoadingComponent';
import { abis, addresses } from './Constants';
import Web3 from 'web3';

const web3 = new Web3('https://rpc.ankr.com/eth');

export default class AlAssets extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            alUsdPeg: {},
            alEthPeg: {},
            alUsdPegLoading: {},
            alEthPegLoading: {},
            alUsdPegToggle: true,
            alEthPegToggle: true,
            //alUsdPegActive: { dai: true, usdc: false, usdt: false },
            surplus: {},
            surplusLoading: true
        };
        this.toggleAlUsdPeg = this.toggleAlUsdPeg.bind(this);
        this.toggleAlEthPeg = this.toggleAlEthPeg.bind(this);
        //this.alUsdPegClick = this.alUsdPegClick.bind(this);
        this.fraxContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.fraxAddress);
        this.wethContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.wethAddress);
        this.daiContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.daiAddress);
        this.usdcContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.usdtAddress);
        this.usdtContract = new web3.eth.Contract(abis.erc20LikeAbi, addresses.usdcAddress);

    }

    componentDidMount() {
        this.getBacking();
        this.getAlAssetPrice();
      }

    toggleAlUsdPeg(){
        this.setState({ alUsdPegToggle: !this.state.alUsdPegToggle });
    }
    
    toggleAlEthPeg(){
        this.setState({ alEthPegToggle: !this.state.alEthPegToggle });
    }

    getSubgraphRequestOptions(query){
        return {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: query })
        }
    }

    calculateAlEthPeg(result){
        let alEthPeg = { date: [], peg: [], pegPerc: [] }
        for(let i=0;i<result.length;i++){
          try {
            alEthPeg.date[i] = Number(result[i].timestamp*1000); 
            alEthPeg.peg[i] = result[i].outputAmount/Math.pow(10, 18)/500;
            alEthPeg.pegPerc[i] = (1-result[i].outputAmount/Math.pow(10, 18)/500)*(-100);
          }
          catch (err) {
            console.log(err);
          }
        }
        this.setState({ alEthPeg: alEthPeg, alEthPegLoading: false });
      }
    
    calculateAlUsdPeg(usdcPeg){
        let usdcIndex = 0;
        let alUsdPeg = {usdc: { date: [], peg: [], pegPerc: [] } };
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

    getAlAssetPrice(){
        const usdcPegQuery = this.getPegQuery(addresses.alUsdAddress, addresses.usdcAddress, Math.pow(10, 24), 0)
        const usdcPegQuerySkip1000 = this.getPegQuery(addresses.alUsdAddress, addresses.usdcAddress, Math.pow(10, 24), 1000)
        const alEthPegQuery = this.getPegQuery(addresses.alEthAddress, addresses.ethAddress, Math.pow(10,20)*5, 0)
        const alEthPegQuerySkip1000 = this.getPegQuery(addresses.alEthAddress, addresses.ethAddress, Math.pow(10,20)*5, 1000)
        
        Promise.all([fetch("https://subgraph.satsuma-prod.com/de91695d5fb0/alchemix--802384/alchemix-v2/api", this.getSubgraphRequestOptions(usdcPegQuery)).then(res => res.json()),
            fetch("https://subgraph.satsuma-prod.com/de91695d5fb0/alchemix--802384/alchemix-v2/api", this.getSubgraphRequestOptions(usdcPegQuerySkip1000)).then(res => res.json()),
            fetch("https://subgraph.satsuma-prod.com/de91695d5fb0/alchemix--802384/alchemix-v2/api", this.getSubgraphRequestOptions(alEthPegQuery)).then(res => res.json()),
            fetch("https://subgraph.satsuma-prod.com/de91695d5fb0/alchemix--802384/alchemix-v2/api", this.getSubgraphRequestOptions(alEthPegQuerySkip1000)).then(res => res.json())])
            .then(([usdcPeg, usdcPegSkip1000, alEthPeg, alEthPegSkip1000]) => {
                this.calculateAlUsdPeg(usdcPeg.data.poolHistoricalRates.concat(usdcPegSkip1000.data.poolHistoricalRates).reverse())
                this.calculateAlEthPeg(alEthPeg.data.poolHistoricalRates.concat(alEthPegSkip1000.data.poolHistoricalRates).reverse())
            })
            .catch(function(err) {
                console.log(err.message);
            });
    }

    calculateBacking(mainnetDebt, v1Debt, optimismDebt, daiInTransmuterBuffer, usdcInTransmuterBuffer, usdtInTransmuterBuffer, fraxInTransmuterBuffer, wethInTransmuterBuffer){
        let alUsdDebt = 0;
        let alEthDebt = 0;
        let alUsdOptimismDebt = 0;
        let alEthOptimismDebt = 0;
        let alUsdDebtV1 = 0;
        let alEthDebtV1 = 31;
        let alUsdInV1 = 12000;
        let alEthInV1 = 8;
        let alEthInOldElixir = 24101;
        let ethInTransmuterBuffer = wethInTransmuterBuffer / Math.pow(10,18);
        let stablesInTransmuterBuffer = daiInTransmuterBuffer / Math.pow(10,18) + usdcInTransmuterBuffer / Math.pow(10,6) + usdtInTransmuterBuffer / Math.pow(10,6) + fraxInTransmuterBuffer / Math.pow(10,18);
        for(let i=0;i<mainnetDebt.length;i++){
            alUsdDebt += mainnetDebt[i].alusd_debt;
            alEthDebt += mainnetDebt[i].aleth_debt;
        }
        for(let i=0;i<v1Debt.length;i++){
            alUsdDebtV1 += v1Debt[i].alusd_debt;
        }
        for(let i=0;i<optimismDebt.length;i++){
            alUsdOptimismDebt += optimismDebt[i].alusd_debt;
            alEthOptimismDebt += optimismDebt[i].aleth_debt;
        }
        let alUsdOwned = this.props.debankData.alUsdBackingTokensInElixir + alUsdInV1 + stablesInTransmuterBuffer;
        let alUsdShouldHave = this.props.alAssetSupply.alUsd - this.props.debankData.alUsdAmountInElixir - alUsdDebt - alUsdDebtV1;
        let alUsdShouldHaveOptimism = this.props.alAssetSupply.alUsdOptimism - alUsdOptimismDebt - this.props.alAssetSupply.nextAlUsdOptimism;
        let alUsdOwnedOptimism = this.props.debankData.alUsdInOptimismElixir
        let alUsdMainnetSurplus = alUsdOwned - alUsdShouldHave;
        let alUsdOptimismSurplus = alUsdOwnedOptimism - alUsdShouldHaveOptimism;
        let alEthOwned = this.props.debankData.alEthBackingTokensInElixir + alEthInV1 + ethInTransmuterBuffer;
        let alEthShouldHave = this.props.alAssetSupply.alEth - this.props.debankData.alEthAmountInElixir - alEthDebt - alEthDebtV1 - alEthInOldElixir;
        let alEthMainnetSurplus = alEthOwned - alEthShouldHave;
        
        console.log(alUsdShouldHaveOptimism)
        console.log(alUsdOwnedOptimism)
        console.log(this.props.alAssetSupply.alUsdOptimism)
        console.log(alUsdOptimismDebt)
        console.log(this.props.alAssetSupply.nextAlUsdOptimism)
        let surplus = { 
            alUsdMainnet: alUsdMainnetSurplus,
            alUsdOptimism: alUsdOptimismSurplus,
            alEthMainnet: alEthMainnetSurplus
        }

        this.setState({ surplus: surplus, surplusLoading: false })
    }

    getBacking(){
        let authorizationHeader = {
            method: 'GET',
            headers: { 
              'pinata_api_key': '7237805a818b4433e8a1',
              'pinata_secret_api_key': '1b5bf925a71ba50d2649a1861e00210ac142a74a20562f743f160d6d820cad23'
            }
          }

        Promise.all([fetch("https://api.pinata.cloud/data/pinList?includeCount=false&metadata[name]=mainnet_user_debt.json&status=pinned&pageLimit=1000", authorizationHeader).then(res => res.json()),
            fetch("https://api.pinata.cloud/data/pinList?includeCount=false&metadata[name]=v1UserDebt.json&status=pinned&pageLimit=1000", authorizationHeader).then(res => res.json()),
            fetch("https://api.pinata.cloud/data/pinList?includeCount=false&metadata[name]=optimism_user_debt.json&status=pinned&pageLimit=1000", authorizationHeader).then(res => res.json()),
            this.daiContract.methods.balanceOf(addresses.alUsdMainnetTransmuterBuffer).call(),
            this.usdcContract.methods.balanceOf(addresses.alUsdMainnetTransmuterBuffer).call(),
            this.usdtContract.methods.balanceOf(addresses.alUsdMainnetTransmuterBuffer).call(),
            this.fraxContract.methods.balanceOf(addresses.alUsdMainnetTransmuterBuffer).call(),
            this.wethContract.methods.balanceOf(addresses.alEthMainnetTransmuterBuffer).call()
        ])
        .then(([mainnetDebt, v1Debt, optimismDebt, daiInTransmuterBuffer, usdcInTransmuterBuffer, usdtInTransmuterBuffer, fraxInTransmuterBuffer, wethInTransmuterBuffer]) => {
            let mainnetDebtUrl = "https://ipfs.imimim.info/ipfs/" + mainnetDebt.rows[0].ipfs_pin_hash;
            let optimismDebtUrl = "https://ipfs.imimim.info/ipfs/" + optimismDebt.rows[0].ipfs_pin_hash;
            let v1DebtUrl = "https://ipfs.imimim.info/ipfs/" + v1Debt.rows[0].ipfs_pin_hash;
            Promise.all([fetch(mainnetDebtUrl).then(res => res.json()),
                fetch(v1DebtUrl).then(res => res.json()),
                fetch(optimismDebtUrl).then(res => res.json())])
                .then(([mainnetDebtFinal, v1DebtFinal, optimismDebtFinal]) => {
                    this.calculateBacking(mainnetDebtFinal, v1DebtFinal, optimismDebtFinal, daiInTransmuterBuffer, usdcInTransmuterBuffer, usdtInTransmuterBuffer, fraxInTransmuterBuffer, wethInTransmuterBuffer)
            })
            .catch(function(err) {
                console.log(err.message);
            });

        })
        .catch(function(err) {
            console.log(err.message);
        });

        /*fetch("https://api.pinata.cloud/data/pinList?includeCount=false&metadata[name]=mainnet_user_debt.json&status=pinned&pageLimit=1000", authorizationHeader).then(res => res.json()).then(
          (result) => { 
            let url = "https://ipfs.imimim.info/ipfs/" + result.rows[0].ipfs_pin_hash;
            fetch(url).then(res => res.json()).then(
              (result2) => { 
                this.calculateBacking(result2) 
              },
              (error) => { console.log(error) })
          
          },
          (error) => { console.log(error) })
        
          fetch("https://api.pinata.cloud/data/pinList?includeCount=false&metadata[name]=v1UserDebt.json&status=pinned&pageLimit=1000", authorizationHeader).then(res => res.json()).then(
            (result) => { 
              let url = "https://ipfs.imimim.info/ipfs/" + result.rows[0].ipfs_pin_hash;
              fetch(url).then(res => res.json()).then(
                (result2) => { 
                  //this.calculateBacking(result2)
                  console.log(result2) 
                },
                (error) => { console.log(error) })
            
            },
            (error) => { console.log(error) })*/
    }

    render(){
        return (
            <>
                <div className="section-header">
                    <img src={ require('./logos/alusd.svg').default } alt="alUSD logo" className="image3" />
                    <h2>alUSD</h2>
                </div>
                {this.state.surplusLoading ? <LoadingComponent /> :
                    <AlUsdSummary lps={this.props.lps} surplus={this.state.surplus} />
                }
                <div className="section-wrapper">
                    {/*<div className="chart-title">
                        <h3>alUSD Total Supply</h3>
                        <ChartAlusdSupply marketcapDates={this.props.alUsdMarketcapDates} marketcaps={this.props.alUsdMarketcaps} />
                    </div>*/}
                    <div className="chart-title">
                        <h3>alUSD Price</h3>
                        <div className="button-container">
                            {/*<ButtonGroup size="small">
                            <Button variant={this.state.alUsdPegActive.dai ? "contained" : "outlined"} color="inherit" onClick={() => {this.alUsdPegClick("dai")}}>DAI</Button>
                            <Button variant={this.state.alUsdPegActive.usdc ? "contained" : "outlined"} color="inherit" onClick={() => {this.alUsdPegClick("usdc")}}>USDC</Button>
                            <Button variant={this.state.alUsdPegActive.usdt ? "contained" : "outlined"} color="inherit" onClick={() => {this.alUsdPegClick("usdt")}}>USDT</Button>
                            </ButtonGroup>*/}
                            <div className="toggle-text">
                            $<Switch onChange={this.toggleAlUsdPeg} checked={this.state.alUsdPegToggle} />%
                            </div>
                        </div>
                        <ChartAlusdPrice data={this.props.alUsdPeg} toggle={this.state.alUsdPegToggle} />
                    </div>
                </div>
                <div className="section-header">
                    <img src={ require('./logos/aleth_blue.svg').default } alt="alETH logo" className="image3" />
                    <h2>alETH</h2>
                </div>
                <AlEthSummary lps={this.props.lps} ethPrice={this.props.ethPrice} surplus={this.state.surplus} />
                <div className="section-wrapper">
                    {/*<div className="chart-title">
                        <h3>alETH Total Supply</h3>
                        <ChartAlethSupply />
        </div>*/}
                    <div className="chart-title">
                        <h3>alETH Price</h3>
                        <div className="toggle-text">The subgraph is being updated, no price is currently available.</div>
                        {/*<div className="toggle-text">
                            ETH<Switch onChange={this.toggleAlEthPeg} checked={this.state.alEthPegToggle} />%
                        </div>
    <ChartAlEthPrice alEthPeg={this.props.alEthPeg} toggle={this.state.alEthPegToggle} />*/}
                    </div>
                </div>
            </>
        );
    }
}