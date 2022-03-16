import './App.css';
import ChartDonut from './ChartDonut';
import ChartEmissions from './ChartEmissions';
import ChartInflation from './ChartInflation';
import {emissionWeek, tokenEmission, currentStats, futureInflation} from './Functions';

let date = new Date();
let today = {
  year: date.getFullYear(),
  month: date.getMonth(),
  day: date.getDate()
}

function App() {
  return (
    <div className="App">
      <div className="header-disclaimer">This service provides statistics for the Alchemix dApp (<a href="https://alchemix.fi">alchemix.fi</a>) and associated crypto tokens.
      The service is unofficial and is not connected to the core team.</div>
      <h1>Alchemix Statistics</h1>
      <img src={ require('./logos/alcx_logo.png') } alt="ALCX logo" />
      <h2>ALCX Emissions</h2>
      <div className="summary">
        We are in <span className="important">Week {emissionWeek()}</span> of  emissions.<br/>
        The protocol is currently emitting <span className="important">{tokenEmission()} <img src={ require('./logos/alcx_logo.png') } alt="ALCX" className="image2" />ALCX/week.</span><br/>
        Current inflation is <span className="important">{currentStats().currentInflation}%/week</span> ({currentStats().currentInflationAnnual}% annually)<br/>
        <img src={ require('./logos/alcx_logo.png') } alt="ALCX" className="image2" />ALCX supply growth compared to today, 1 year from now ({today.year+1}-{today.month+1}-{today.day}): <span className="important">{futureInflation(1).totalInflation}%</span> Forward-looking inflation 1 year from now: <span className="important">{futureInflation(1).forwardInflation}%</span><br/>
        <img src={ require('./logos/alcx_logo.png') } alt="ALCX" className="image2" />ALCX supply growth compared to today, 2 years from now ({today.year+2}-{today.month+1}-{today.day}): <span className="important">{futureInflation(2).totalInflation}%</span> Forward-looking inflation 2 years from now: <span className="important">{futureInflation(2).forwardInflation}%</span><br/>
        <img src={ require('./logos/alcx_logo.png') } alt="ALCX" className="image2" />ALCX supply growth compared to today, 3 years from now ({today.year+3}-{today.month+1}-{today.day}): <span className="important">{futureInflation(3).totalInflation}%</span> Forward-looking inflation 3 years from now: <span className="important">{futureInflation(3).forwardInflation}%</span><br/>
        <br/>
        Current <img src={ require('./logos/alcx_logo.png') } alt="ALCX" className="image2" />ALCX supply: <span className="important">{currentStats().currentSupply}</span><br/>
        Official emission schedule: <a target="_blank" rel="noreferrer" href="https://alchemix-finance.gitbook.io/alchemix-finance/token-distribution/alcx-monetary-policy">ALCX Monetary Policy</a>
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
                <span className="table-title">Bribes (18%)</span>
                <div className="weight-table-row">
                  <img src={ require('./logos/alusd.png') } alt="alUSD" className="image" />
                  <div className="table-item-1">alUSD3CRV</div>
                  <div className="table-item-2">10%</div>
                </div>
                <div className="weight-table-row">
                  <img src={ require('./logos/eth_aleth.png') } alt="alETH-ETH" className="image" />
                  <div className="table-item-1">alETH-ETH</div>
                  <div className="table-item-2">5%</div>
                </div>
                <div className="weight-table-row">
                  <img src={ require('./logos/d3pool.png') } alt="d3pool" className="image" />
                  <div className="table-item-1">d3pool</div>
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
      <div className="footer">
        With issues or suggestions about the site, send me an email at barree12ATgmail.com or find me in the Alchemix Discord (Barree #2314)
      </div>
    </div>
  );
}

export default App;
