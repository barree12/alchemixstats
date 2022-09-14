import React from 'react';
import { MultifarmProvider, Dashboard } from "@multifarm/widget";
import "@multifarm/widget/dist/alchemix.css";

export default class Treasury extends React.Component {

    render(){
        return (
            <div className="multifarm-wrapper">
                <MultifarmProvider
                    token="di50relXm_XAKKAUKvZ9Igd9pVzk2gm1"
                    theme="alchemix"
                    provider="alchemix"
                    themeColors="light">
                    <Dashboard />
                </MultifarmProvider>
            </div>
        );
    }
}