import React from 'react';
import ChartAlusdSupply from './charts/ChartAlusdSupply';
import ChartAlusdPrice from './charts/ChartAlusdPrice';
import ChartAlEthPrice from './charts/ChartAlEthPrice';
import ChartAlethSupply from './charts/ChartAlethSupply';
import AlEthSummary from './AlEthSummary';
import AlUsdSummary from './AlUsdSummary';
import { Switch, Button, ButtonGroup } from '@mui/material';

export default class AlAssets extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            alUsdPegToggle: true,
            alEthPegToggle: true,
            alUsdPegActive: { dai: true, usdc: false, usdt: false }
        };
        this.toggleAlUsdPeg = this.toggleAlUsdPeg.bind(this);
        this.toggleAlEthPeg = this.toggleAlEthPeg.bind(this);
        this.alUsdPegClick = this.alUsdPegClick.bind(this);
    }

    toggleAlUsdPeg(){
        this.setState({ alUsdPegToggle: !this.state.alUsdPegToggle });
    }
    
    toggleAlEthPeg(){
        this.setState({ alEthPegToggle: !this.state.alEthPegToggle });
    }
    
    alUsdPegClick(token){
        let alUsdPegActive = { dai: false, usdc: false, usdt: false };
        if(token === "dai") alUsdPegActive.dai = true;
        if(token === "usdc") alUsdPegActive.usdc = true;
        if(token === "usdt") alUsdPegActive.usdt = true;
        this.setState({ alUsdPegActive: alUsdPegActive });
    }

    render(){
        return (
            <>
                <img src={ require('./logos/alusd.png').default } alt="alUSD logo" className="image3" />
                <h2>alUSD</h2>
                <AlUsdSummary lps={this.props.lps} />
                <div className="section-wrapper">
                    <div className="chart-title">
                        <h3>alUSD Total Supply</h3>
                        <ChartAlusdSupply marketcapDates={this.props.alUsdMarketcapDates} marketcaps={this.props.alUsdMarketcaps} />
                        </div>
                    <div className="chart-title">
                        <h3>alUSD Peg</h3>
                        <div className="button-container">
                            <ButtonGroup size="small">
                            <Button variant={this.state.alUsdPegActive.dai ? "contained" : "outlined"} color="inherit" onClick={() => {this.alUsdPegClick("dai")}}>DAI</Button>
                            <Button variant={this.state.alUsdPegActive.usdc ? "contained" : "outlined"} color="inherit" onClick={() => {this.alUsdPegClick("usdc")}}>USDC</Button>
                            <Button variant={this.state.alUsdPegActive.usdt ? "contained" : "outlined"} color="inherit" onClick={() => {this.alUsdPegClick("usdt")}}>USDT</Button>
                            </ButtonGroup>
                            <div className="toggle-text">
                            $<Switch onChange={this.toggleAlUsdPeg} checked={this.state.alUsdPegToggle} />%
                            </div>
                        </div>
                        <ChartAlusdPrice data={this.props.alUsdPeg} active={this.state.alUsdPegActive} toggle={this.state.alUsdPegToggle} />
                    </div>
                </div>

                <img src={ require('./logos/aleth.png').default } alt="alETH logo" className="image3" />
                <h2>alETH</h2>
                <AlEthSummary lps={this.props.lps} ethPrice={this.props.ethPrice} />
                <div className="section-wrapper">
                    <div className="chart-title">
                        <h3>alETH Total Supply</h3>
                        <ChartAlethSupply />
                    </div>
                    <div className="chart-title">
                        <h3>alETH Peg</h3>
                        <div className="toggle-text">
                            ETH<Switch onChange={this.toggleAlEthPeg} checked={this.state.alEthPegToggle} />%
                        </div>
                        <ChartAlEthPrice data={this.props.alEthPeg} toggle={this.state.alEthPegToggle} />
                    </div>
                </div>
            </>
        );
    }
}