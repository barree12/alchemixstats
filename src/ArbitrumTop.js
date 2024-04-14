import React from 'react';
import LoadingComponent from './LoadingComponent';
//import { formatDateNumber } from './Functions';

export default class ArbitrumTop extends React.Component { 

    render(){
        
        return (
            <>
                <h2>Alchemix Arbitrum Deployment</h2>
                <div className="overview">
                    <span>
                        Target TVL $5M
                    </span>
                    <span className="flex-row">
                        <span>Total Arbitrum Vault TVL:&nbsp;</span>
                        <div className="important">${}M</div>
                    </span>
                    <br/>
                    <span className="flex-row">
                        <span>Number of users with active loans:&nbsp;</span>
                        <div className="important">${}M</div>
                    </span>
                    <span className="flex-row">

                    </span>
                    
                    
                </div>
            </>
        );
    }
}