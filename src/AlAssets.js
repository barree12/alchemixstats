import React from 'react';
import ChartAlusdPrice from './charts/ChartAlusdPrice';
import ChartAlEthPrice from './charts/ChartAlEthPrice';
import AlEthSummary from './AlEthSummary';
import AlUsdSummary from './AlUsdSummary';
import { Switch } from '@mui/material';
import LoadingComponent from './LoadingComponent';
import { abis, addresses } from './Constants';
import Web3 from 'web3';

const web3 = new Web3('https://eth-mainnet.g.alchemy.com/v2/m4nhopYhysiwNnoLZ7vnyxxwjHHtYcKP');
const web3optimism = new Web3('https://opt-mainnet.g.alchemy.com/v2/p9poBr_K0kBvzVt3V6Lo1wasL9r32FpP');
//const web3arbitrum = new Web3('https://rpc.ankr.com/arbitrum')
const web3arbitrum = new Web3('https://arb1.arbitrum.io/rpc')

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
        this.usdcOptimismContract = new web3optimism.eth.Contract(abis.erc20LikeAbi, addresses.usdcOptimismContractAddress);
        this.daiOptimismContract = new web3optimism.eth.Contract(abis.erc20LikeAbi, addresses.daiOptimismContractAddress);
        this.usdtOptimismContract = new web3optimism.eth.Contract(abis.erc20LikeAbi, addresses.usdtOptimismContractAddress);
        this.wethOptimismContract = new web3optimism.eth.Contract(abis.erc20LikeAbi, addresses.wethOptimismContractAddress);
        this.usdcArbitrumContract = new web3arbitrum.eth.Contract(abis.erc20LikeAbi, addresses.usdcArbitrumContractAddress);
        this.wethArbitrumContract = new web3arbitrum.eth.Contract(abis.erc20LikeAbi, addresses.wethArbitrumContractAddress);
    }

    componentDidMount() {
        this.getBacking();
      }

    toggleAlUsdPeg(){
        this.setState({ alUsdPegToggle: !this.state.alUsdPegToggle });
    }
    
    toggleAlEthPeg(){
        this.setState({ alEthPegToggle: !this.state.alEthPegToggle });
    }

    calculateBacking(mainnetDebt, v1Debt, optimismDebt, arbitrumDebt, daiInTransmuterBuffer, usdcInTransmuterBuffer, usdtInTransmuterBuffer, fraxInTransmuterBuffer, wethInTransmuterBuffer, daiInOptimismTransmuterBuffer, usdcInOptimismTransmuterBuffer, usdtInOptimismTransmuterBuffer, wethInOptimismTransmuterBuffer, usdcInArbitrumTransmuterBuffer, wethInArbitrumTransmuterBuffer){
        let alUsdDebt = 0;
        let alEthDebt = 0;
        let alUsdOptimismDebt = 0;
        let alEthOptimismDebt = 0;
        let alUsdArbitrumDebt = 0;
        let alEthArbitrumDebt = 0;
        let alUsdDebtV1 = 0;
        let alEthDebtV1 = 31;
        let alUsdInV1 = 12000;
        let alEthInV1 = 8;
        let ethInTransmuterBuffer = wethInTransmuterBuffer / Math.pow(10,18);
        let ethInOptimismTransmuterBuffer = wethInOptimismTransmuterBuffer / Math.pow(10,18);
        let ethInArbitrumTransmuterBuffer = wethInArbitrumTransmuterBuffer / Math.pow(10,18);
        let stablesInTransmuterBuffer = daiInTransmuterBuffer / Math.pow(10,18) + usdcInTransmuterBuffer / Math.pow(10,6) + usdtInTransmuterBuffer / Math.pow(10,6) + fraxInTransmuterBuffer / Math.pow(10,18);
        let stablesInOptimismTransmuterBuffer = daiInOptimismTransmuterBuffer / Math.pow(10,18) + usdcInOptimismTransmuterBuffer / Math.pow(10,6) + usdtInOptimismTransmuterBuffer / Math.pow(10,6);
        let stablesInArbitrumTransmuterBuffer = usdcInOptimismTransmuterBuffer / Math.pow(10,6);
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
        for(let i=0;i<arbitrumDebt.length;i++){
          alUsdArbitrumDebt += arbitrumDebt[i].alusd_debt;
          alEthArbitrumDebt += arbitrumDebt[i].aleth_debt;
        }
        let alUsdOwned = this.props.debankData.alUsdBackingTokensInElixir + alUsdInV1 + stablesInTransmuterBuffer;
        let alUsdShouldHave = this.props.alAssetSupply.alUsd - this.props.debankData.alUsdAmountInElixir - alUsdDebt - alUsdDebtV1;
        let alUsdShouldHaveL2 = this.props.alAssetSupply.alUsdOptimism + this.props.alAssetSupply.alUsdArbitrum + this.props.alAssetSupply.alUsdMetis - alUsdOptimismDebt - alUsdArbitrumDebt - this.props.debankData.alUsdAmountInOptimismElixir;
        let alUsdOwnedL2 = this.props.debankData.alUsdOptimismBackingTokensInElixir + this.props.debankData.alUsdArbitrumBackingTokensInElixir + stablesInOptimismTransmuterBuffer + stablesInArbitrumTransmuterBuffer;
        let alUsdMainnetSurplus = alUsdOwned - alUsdShouldHave;
        let alUsdOptimismSurplus = alUsdOwnedL2 - alUsdShouldHaveL2;
        let alEthOwned = this.props.debankData.alEthBackingTokensInElixir + alEthInV1 + ethInTransmuterBuffer;
        let alEthShouldHave = this.props.alAssetSupply.alEth - this.props.debankData.alEthAmountInElixir - alEthDebt - alEthDebtV1;
        let alEthMainnetSurplus = alEthOwned - alEthShouldHave;
        
        let surplus = { 
            alUsdMainnet: alUsdMainnetSurplus,
            alUsdBackingTokensInElixir: this.props.debankData.alUsdBackingTokensInElixir,
            alUsdInV1: alUsdInV1,
            stablesInTransmuterBuffer: stablesInTransmuterBuffer,
            alUsdSupply: this.props.alAssetSupply.alUsd,
            alUsdInElixir: this.props.debankData.alUsdAmountInElixir,
            alUsdDebt: alUsdDebt,
            alUsdDebtV1: alUsdDebtV1,
            alUsdOptimism: alUsdOptimismSurplus,
            alEthMainnet: alEthMainnetSurplus,
            alEthBackingTokensInElixir: this.props.debankData.alEthBackingTokensInElixir,
            alEthInV1: alEthInV1,
            ethInTransmuterBuffer: ethInTransmuterBuffer,
            alEthSupply: this.props.alAssetSupply.alEth,
            alEthInElixir: this.props.debankData.alEthAmountInElixir,
            alEthDebt: alEthDebt,
            alEthDebtV1: alEthDebtV1
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
            fetch("https://api.pinata.cloud/data/pinList?includeCount=false&metadata[name]=arbitrum_user_debt.json&status=pinned&pageLimit=1000", authorizationHeader).then(res => res.json()),
            this.daiContract.methods.balanceOf(addresses.alUsdMainnetTransmuterBuffer).call(),
            this.usdcContract.methods.balanceOf(addresses.alUsdMainnetTransmuterBuffer).call(),
            this.usdtContract.methods.balanceOf(addresses.alUsdMainnetTransmuterBuffer).call(),
            this.fraxContract.methods.balanceOf(addresses.alUsdMainnetTransmuterBuffer).call(),
            this.wethContract.methods.balanceOf(addresses.alEthMainnetTransmuterBuffer).call(),
            this.daiOptimismContract.methods.balanceOf(addresses.alUsdOptimismTransmuterBuffer).call(),
            this.usdcOptimismContract.methods.balanceOf(addresses.alUsdOptimismTransmuterBuffer).call(),
            this.usdtOptimismContract.methods.balanceOf(addresses.alUsdOptimismTransmuterBuffer).call(),
            this.wethOptimismContract.methods.balanceOf(addresses.alEthOptimismTransmuterBuffer).call(),
            this.usdcArbitrumContract.methods.balanceOf(addresses.alUsdArbitrumTransmuterBuffer).call(),
            this.wethArbitrumContract.methods.balanceOf(addresses.alEthArbitrumTransmuterBuffer).call(),
        ])
        .then(([mainnetDebt, v1Debt, optimismDebt, arbitrumDebt, daiInTransmuterBuffer, usdcInTransmuterBuffer, usdtInTransmuterBuffer, fraxInTransmuterBuffer, wethInTransmuterBuffer, daiInOptimismTransmuterBuffer, usdcInOptimismTransmuterBuffer, usdtInOptimismTransmuterBuffer, wethInOptimismTransmuterBuffer, usdcInArbitrumTransmuterBuffer, wethInArbitrumTransmuterBuffer]) => {
            let mainnetDebtUrl = "https://ipfs.imimim.info/ipfs/" + mainnetDebt.rows[0].ipfs_pin_hash;
            let optimismDebtUrl = "https://ipfs.imimim.info/ipfs/" + optimismDebt.rows[0].ipfs_pin_hash;
            let arbitrumDebtUrl = "https://ipfs.imimim.info/ipfs/" + arbitrumDebt.rows[0].ipfs_pin_hash;
            let v1DebtUrl = "https://ipfs.imimim.info/ipfs/" + v1Debt.rows[0].ipfs_pin_hash;
            Promise.all([fetch(mainnetDebtUrl).then(res => res.json()),
                fetch(v1DebtUrl).then(res => res.json()),
                fetch(arbitrumDebtUrl).then(res => res.json()),
                fetch(optimismDebtUrl).then(res => res.json())])
                .then(([mainnetDebtFinal, v1DebtFinal, arbitrumDebtFinal, optimismDebtFinal]) => {
                    this.calculateBacking(mainnetDebtFinal, v1DebtFinal, optimismDebtFinal, arbitrumDebtFinal, daiInTransmuterBuffer, usdcInTransmuterBuffer, usdtInTransmuterBuffer, fraxInTransmuterBuffer, wethInTransmuterBuffer, daiInOptimismTransmuterBuffer, usdcInOptimismTransmuterBuffer, usdtInOptimismTransmuterBuffer, wethInOptimismTransmuterBuffer, usdcInArbitrumTransmuterBuffer, wethInArbitrumTransmuterBuffer)
            })
            .catch(function(err) {
                console.log(err.message);
            });

        })
        .catch(function(err) {
            console.log(err.message);
        });

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
                        <div className="toggle-text">
                            ETH<Switch onChange={this.toggleAlEthPeg} checked={this.state.alEthPegToggle} />%
                        </div>
                        <ChartAlEthPrice alEthPeg={this.props.alEthPeg} toggle={this.state.alEthPegToggle} />
                    </div>
                </div>
            </>
        );
    }
}