import './App.css';
import ChartDonut from './ChartDonut';
import ChartEmissions from './ChartEmissions';
import ChartInflation from './ChartInflation';
import ChartAlusdSupply from './ChartAlusdSupply';
import ChartAlusdPrice from './ChartAlusdPrice';
import ChartAlethSupply from './ChartAlethSupply';
import CurrentALCXSupply from './CurrentALCXSupply';
import {emissionWeek, tokenEmission, currentStats, futureInflation} from './Functions';
import React from 'react';
import { toHaveAccessibleDescription } from '@testing-library/jest-dom/dist/matchers';

let date = new Date();
let today = {
  year: date.getFullYear(),
  month: date.getMonth(),
  day: date.getDate()
}

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dates: [],
      prices: [],
      volumes: [],
      marketcaps: [],
      marketcapDates: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.getData();
  }

  calculateArrays(result){
    console.log(result);
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

  render() {
  return (
    <div className="App">
      <div className="header-disclaimer">This service provides statistics for the Alchemix dApp (<a href="https://alchemix.fi">alchemix.fi</a>) and associated crypto tokens.
      The service is unofficial and is not connected to the core team.</div>
      <h1>Alchemix Statistics</h1>
      <img className="header-image" src={ require('./logos/alcx_logo.png') } alt="ALCX logo" />
      <h2>ALCX Emissions</h2>
      <div className="summary">
        We are in <span className="important">Week {emissionWeek()}</span> of  emissions.<br/>
        The protocol is currently emitting <span className="important">{tokenEmission()} <img src={ require('./logos/alcx_logo.png') } alt="ALCX" className="image2" />ALCX/week.</span><br/>
        Current inflation is <span className="important">{currentStats().currentInflation}%/week</span> ({currentStats().currentInflationAnnual}% annually)<br/>
        <img src={ require('./logos/alcx_logo.png') } alt="ALCX" className="image2" />ALCX supply growth compared to today, 1 year from now ({today.year+1}-{today.month+1}-{today.day}): <span className="important">{futureInflation(1).totalInflation}%</span> Forward-looking inflation 1 year from now: <span className="important">{futureInflation(1).forwardInflation}%</span><br/>
        <img src={ require('./logos/alcx_logo.png') } alt="ALCX" className="image2" />ALCX supply growth compared to today, 2 years from now ({today.year+2}-{today.month+1}-{today.day}): <span className="important">{futureInflation(2).totalInflation}%</span> Forward-looking inflation 2 years from now: <span className="important">{futureInflation(2).forwardInflation}%</span><br/>
        <img src={ require('./logos/alcx_logo.png') } alt="ALCX" className="image2" />ALCX supply growth compared to today, 3 years from now ({today.year+3}-{today.month+1}-{today.day}): <span className="important">{futureInflation(3).totalInflation}%</span> Forward-looking inflation 3 years from now: <span className="important">{futureInflation(3).forwardInflation}%</span><br/>
        <br/>
        Official emission schedule: <a target="_blank" rel="noreferrer" href="https://alchemix-finance.gitbook.io/alchemix-finance/token-distribution/alcx-monetary-policy">ALCX Monetary Policy</a><br/>
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
                  <img src={ require('./logos/alcx_eth_slp.png') } alt="ALCX-ETH SLP" className="image" />
                  <div className="table-item-1">ALCX/ETH SLP</div>
                  <div className="table-item-2">20%</div>
                </div>
                <div className="weight-table-row">
                  <img src={ require('./logos/talcx.png') } alt="tALCX" className="image" />
                  <div className="table-item-1">tALCX</div>
                  <div className="table-item-2">12%</div>
                </div>
                <div className="weight-table-row">
                  <img src={ require('./logos/alcx_logo.png') } alt="ALCX" className="image" />
                  <div className="table-item-1">ALCX</div>
                  <div className="table-item-2">10%</div>
                </div>
              </div>
              <div className="weight-table-column">
                <span className="table-title">Bonds (40%)</span>
                <div className="weight-table-row">
                  <img src={ require('./logos/cvx.png') } alt="CVX logo" className="image" />
                  <div className="table-item-1">CVX</div>
                  <div className="table-item-2">17.5%</div>
                </div>
                <div className="weight-table-row">
                  <img src={ require('./logos/alcx_eth_slp.png') } alt="ALCX-ETH SLP" className="image" />
                  <div className="table-item-1">ALCX/ETH SLP</div>
                  <div className="table-item-2">10%</div>
                </div>
                <div className="weight-table-row">
                  <img src={ require('./logos/eth.png') } alt="ETH logo" className="image" />
                  <div className="table-item-1">ETH</div>
                  <div className="table-item-2">5%</div>
                </div>
                <div className="weight-table-row">
                  <img src={ require('./logos/dai.png') } alt="DAI logo" className="image" />
                  <div className="table-item-1">DAI</div>
                  <div className="table-item-2">5%</div>
                </div>
                <div className="weight-table-row">
                  <img src={ require('./logos/tokemak.png') } alt="Toke" className="image" />
                  <div className="table-item-1">Toke</div>
                  <div className="table-item-2">2.5%</div>
                </div>
              </div>
              <div className="weight-table-column">
                <span className="table-title">alAsset liquidity (18%)</span>
                <div className="weight-table-row">
                  <img src={ require('./logos/alusd.png') } alt="alUSD" className="image" />
                  <div className="table-item-1">alUSD3CRV</div>
                  <div className="table-item-2">10%</div>
                </div>
                <div className="weight-table-row">
                  <img src={ require('./logos/eth_aleth.png') } alt="alETH-ETH" className="image" />
                  <div className="table-item-1">alETHCRV</div>
                  <div className="table-item-2">5%</div>
                </div>
                <div className="weight-table-row">
                  <img src={ require('./logos/d3pool.png') } alt="d3pool" className="image" />
                  <div className="table-item-1">d3pool</div>
                  <div className="table-item-2">2%</div>
                </div>
                <div className="weight-table-row">
                  <img src={ require('./logos/aleth_saddle.png') } alt="alETH Saddle" className="image" />
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
      <img src={ require('./logos/alusd.png') } alt="alUSD logo" className="image3" />
      <h2>alUSD</h2>
      <div className="summary">
        
        
        
      </div>
      <div className="section-wrapper">
        <div className="content-tab">
          <h3>alUSD Total Supply</h3>
          alUSD supply grows when people deposit collateral assets and borrow alUSD against them.<br/>
          The supply contracts when people repay their outstanding debt using alUSD or when they use the transmuter to exchange alUSD for collateral assets.<br/>
          In these cases the protocol burns the alUSD tokens and the total supply decreases.<br/><br/>
          Since the launch of Alchemix V2, the following collateral types are supported:<br/>
            <div className="tokens"><img src={ require('./logos/dai.png') } alt="dai token" className="image" />DAI</div>
            <div className="tokens"><img src={ require('./logos/usdt.png') } alt="usdt token" className="image" />USDT</div>
            <div className="tokens"><img src={ require('./logos/usdc.png') } alt="usdc token" className="image" />USDC</div>
          The protocol deploys collateral assets into one of the supported yield strategies. Currently supported yield options:
          <div className="tokens"><img src={ require('./logos/yearn_dai.png') } alt="yearn dai token" className="image" /><a target="_blank" rel="noreferrer" href="https://yearn.finance/#/vault/0xdA816459F1AB5631232FE5e97a05BBBb94970c95">Yearn DAI</a></div>
          <div className="tokens"><img src={ require('./logos/yearn_usdt.png') } alt="yearn usdt token" className="image" /><a target="_blank" rel="noreferrer" href="https://yearn.finance/#/vault/0x7Da96a3891Add058AdA2E826306D812C638D87a7">Yearn USDT</a></div>
          <div className="tokens"><img src={ require('./logos/yearn_usdc.png') } alt="yearn usdc token" className="image" /><a target="_blank" rel="noreferrer" href="https://yearn.finance/#/vault/0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE">Yearn USDC</a></div>
        </div>
        {this.state.isLoading === true ? "Loading..." :
        <ChartAlusdSupply marketcapDates={this.state.marketcapDates} marketcaps={this.state.marketcaps} />
        }
      </div>
      <div className="section-wrapper">
        <div className="content-tab">
          <h3>alUSD Price</h3>
          The protocol assumes every alUSD is worth $1 and the transmuter exchanges alUSD for $1 worth of any collateral asset.<br/>
          Thus it is the primary goal of the protocol to maintain the peg ($1 value) for alUSD.
        </div>
        {this.state.isLoading === true ? "Loading..." :
        <ChartAlusdPrice dates={this.state.dates} prices={this.state.prices} />
        }
      </div>
      <img src={ require('./logos/aleth.png') } alt="alETH logo" className="image3" />
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
          <div className="tokens"><img src={ require('./logos/eth.png') } alt="eth token" className="image" />ETH</div>
          <div className="tokens"><img src={ require('./logos/weth.png') } alt="weth token" className="image" />WETH</div>
          The protocol deploys collateral assets into one of the supported yield strategies. Currently supported yield options:
          <div className="tokens"><img src={ require('./logos/yearn_weth.png') } alt="yearn weth token" className="image" /><a target="_blank" rel="noreferrer" href="https://yearn.finance/#/vault/0xa258C4606Ca8206D8aA700cE2143D7db854D168c">Yearn WETH</a></div>
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