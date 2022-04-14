import React from 'react';

export default class AlUsdSummary extends React.Component {

    render(){
        return (
            <div className="summary">
                alUSD supply grows when people deposit collateral assets and borrow alUSD against them.<br/>
                The supply contracts when people repay their outstanding debt using alUSD or when they use the transmuter to exchange alUSD for collateral assets.<br/>
                In these cases the protocol burns the alUSD tokens and the total supply decreases.<br/><br/>
                Since the launch of Alchemix V2, the following collateral types are supported:<br/>
                <div className="small-table-2">
                    <div className="tokens"><img src={ require('./logos/dai.png').default } alt="dai token" className="image" />DAI</div>
                    <div className="tokens"><img src={ require('./logos/usdt.png').default } alt="usdt token" className="image" />USDT</div>
                    <div className="tokens"><img src={ require('./logos/usdc.png').default } alt="usdc token" className="image" />USDC</div>
                </div>
                The protocol deploys collateral assets into one of the supported yield strategies. Currently supported yield options:
                <div className="small-table-2">
                    <div className="tokens"><img src={ require('./logos/yearn_dai.png').default } alt="yearn dai token" className="image" /><a target="_blank" rel="noreferrer" href="https://yearn.finance/#/vault/0xdA816459F1AB5631232FE5e97a05BBBb94970c95">Yearn DAI</a></div>
                    <div className="tokens"><img src={ require('./logos/yearn_usdt.png').default } alt="yearn usdt token" className="image" /><a target="_blank" rel="noreferrer" href="https://yearn.finance/#/vault/0x7Da96a3891Add058AdA2E826306D812C638D87a7">Yearn USDT</a></div>
                    <div className="tokens"><img src={ require('./logos/yearn_usdc.png').default } alt="yearn usdc token" className="image" /><a target="_blank" rel="noreferrer" href="https://yearn.finance/#/vault/0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE">Yearn USDC</a></div>
                </div>
                The protocol assumes every alUSD is worth $1 and the transmuter exchanges alUSD for $1 worth of any collateral asset.<br/>
                Thus it is the primary goal of the protocol to maintain the peg ($1 value) for alUSD. 
            </div>
        );
    }
}