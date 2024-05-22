import React from 'react';
import LoadingComponent from './LoadingComponent';
import { HashLink as Link } from 'react-router-hash-link';
//import { formatDateNumber } from './Functions';

export default class ArbitrumTop extends React.Component { 

    render(){
        //console.log(this.props.arbiTvl)
        let ethPrice = this.props.tokenPricesLoading ? 0 : this.props.tokenPrices.eth;
        let totalTvl = this.props.arbiTvlLoading ? 0 : this.props.arbiTvl.wstEth[this.props.arbiTvl.wstEth.length-1] * ethPrice + this.props.arbiTvl.aUsdc[this.props.arbiTvl.aUsdc.length-1];
        let userCount = 0;
        
        return (
            <>
                <h2>Alchemix Arbitrum Deployment</h2>
                <div className="overview">
                    <span>
                        Target TVL $5M
                    </span>
                    <span className="flex-row">
                        <span>Total Arbitrum Vault TVL:&nbsp;</span>
                        <div className="important">${Math.round(totalTvl/10000)/100}M</div>
                    </span>
                    <Link to="/arbitrum#tvl">Jump to Chart</Link>
                    <br/>
                    <span className="flex-row">
                        <span>Number of users with active loans:&nbsp;</span>
                        <div className="important">{this.props.positionCountLoading ? 0 : this.props.positionCount}</div>
                    </span>
                    <span className="flex-row">

                    </span>
                    
                    
                </div>
            </>
        );
    }
}