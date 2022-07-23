import React from 'react';
import ChartDebtUsd from './charts/ChartDebtUsd';
import ChartDebtEth from './charts/ChartDebtEth';
import { Switch, Button, ButtonGroup } from '@mui/material';

export default class Debt extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          ethCurrencyToggle: true,
        };
        this.toggleEthCurrency = this.toggleEthCurrency.bind(this);
      }

    toggleEthCurrency(){
        this.setState({ ethCurrencyToggle: !this.state.ethCurrencyToggle });
    }

    render(){
        const ethAlchemistUsd = Math.round(this.props.debt.eth[this.props.debt.eth.length-1] * this.props.ethPrice[this.props.ethPrice.length-1])
        const totalDebt = Math.round(this.props.debt.usd[this.props.debt.usd.length-1] + ethAlchemistUsd)
        return (
            <>
                <img src={ require('./logos/alusd.png').default } alt="alUSD logo" className="image3" />
                <h2>User debt</h2>
                <div className="summary">
                    This section shows global user debt across all alchemists.
                    <div className="small-table">
                    <h3>Current global debt</h3>
                    <div className="small-table-inner-3">
                        <span className="small-table-row"></span><span></span><span className="table-text-bold">Amount</span><span className="table-text-bold">USD value</span>
                        <span className="small-table-row"><img src={ require('./logos/alusd.png').default } alt="alusd logo" className="image" /></span><span className="table-text-title">alUSD</span><span className="table-text-bold">{Math.round(this.props.debt.usd[this.props.debt.usd.length-1])}M</span><span className="important-2">${Math.round(this.props.debt.usd[this.props.debt.usd.length-1])}M</span>
                        <span className="small-table-row"><img src={ require('./logos/aleth.png').default } alt="aleth logo" className="image" /></span><span className="table-text-title">alETH</span><span className="table-text-bold">{Math.round(this.props.debt.eth[this.props.debt.eth.length-1])}</span><span className="important-2">${ethAlchemistUsd}M</span>
                        <span className="small-table-row"><img src={ require('./logos/alusd_ftm.png').default } alt="alusd ftm logo" className="image" /></span><span className="table-text-title">alUSD FTM</span><span className="table-text-bold">{}M</span><span className="important-2">${}M</span>
                        <span className="small-table-row-2"></span><span></span><span className="important-3">Total</span><span className="important-3">${totalDebt}M</span>
                    </div>
                    </div>
                </div>
                <div className="section-wrapper">
                    <div className="chart-title">
                        <h3>alUSD Alchemist debt</h3>
                        <ChartDebtUsd debt={this.props.debt} />
                        </div>
                    <div className="chart-title">
                        <h3>alETH Alchemist debt</h3>
                        <div className="toggle-text">
                            $<Switch onChange={this.toggleEthCurrency} checked={this.state.ethCurrencyToggle} />ETH
                        </div>
                        <ChartDebtEth debt={this.props.debt} />
                    </div>
                </div>
            </>
        );
    }
}