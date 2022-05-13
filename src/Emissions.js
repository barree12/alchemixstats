import React from 'react';
import {emissionWeek, tokenEmission, currentStats, futureInflation, formatDate } from './Functions';
import EmissionWeights from './EmissionWeights';
import ChartDonut from './charts/ChartDonut';
import ChartEmissions from './charts/ChartEmissions';
import ChartInflation from './charts/ChartInflation';

export default class Emissions extends React.Component {

    render(){
        return (
            <>
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
                    {this.props.alcxDataLoading ? "Loading..." : 
                    <span>
                        <img src={ require('./logos/alcx_logo.png').default } alt="ALCX" className="image2" />ALCX price: <span className="important">${this.props.alcxData.price}</span> <img src={ require('./logos/alcx_logo.png').default } alt="ALCX" className="image2" />ALCX supply (incl. treasury assets): <span className="important">{this.props.alcxData.currentSupply}</span> Circulating Marketcap: <span className="important">${this.props.circulatingMarketcap}M</span> Total Marketcap: <span className="important">${this.props.alcxData.marketcap}M</span>
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
            </>
        );
    }
}