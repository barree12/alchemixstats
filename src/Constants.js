export const addresses = {
    treasuryWallet1Address: '0x9e2b6378ee8ad2a4a95fe481d63caba8fb0ebbf9',
    treasuryWallet2Address: '0x8392f6669292fa56123f71949b52d883ae57e225',
    elixirAddress: '0x9735f7d3ea56b454b24ffd74c58e9bd85cfad31b',
    elixirAlEthAddress: '0xe761bf731a06fe8259fee05897b2687d56933110',
    treasuryFantomAddress: '0x6b291CF19370A14bbb4491B01091e1E29335e605',
    cvxAlUsd3CrvStakingContractAddress: '0x02e2151d4f351881017abdf2dd2b51150841d5b3',
    cvxAlEthCrvStakingContractAddress: '0x48Bc302d8295FeA1f8c3e7F57D4dDC9981FEE410',
    vlCvxTrackerAddress: '0x72a19342e8F1838460eBFCCEf09F6585e32db86E',
    tokeStakingContractAddress: '0x96f98ed74639689c3a11daf38ef86e59f43417d3',
    masterChefAddress: '0xef0881ec094552b2e128cf945ef17a6752b4ec5d',
    alcxEthSlpAddress: '0xc3f279090a47e80990fe3a9c30d24cb117ef91a8',
    abraAlcxCauldronAddress: '0x7b7473a76d6ae86ce19f7352a1e89f6c9dc39020',
    alchemistEthV2Address: '0x062Bf725dC4cDF947aa79Ca2aaCCD4F385b13b5c',
    alchemistV2Address: '0x5C6374a2ac4EBC38DeA0Fc1F8716e5Ea1AdD94dd',
    alUsdAddress: '0xbc6da0fe9ad5f3b0d58160288917aa56653660e9',
    alEthAddress: '0x0100546f2cd4c9d97f798ffc9755e47865ff7ee6',
    daiAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
    usdcAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    usdtAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    yvDaiAddress: '0xda816459f1ab5631232fe5e97a05bbbb94970c95',
    yvUsdcAddress: '0xa354f35829ae975e850e23e9615b11da1b3dc4de',
    yvUsdtAddress: '0x7da96a3891add058ada2e826306d812c638d87a7',
    yvWethAddress: '0xa258c4606ca8206d8aa700ce2143d7db854d168c',
    wstEthAddress: '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',
    rEthAddress: '0xae78736cd615f374d3085123a210448e74fc6393',
    tAlcxAddress: '0xD3B5D9a561c293Fb42b446FE7e237DaA9BF9AA84',
    alcxAddress: '0xdBdb4d16EdA451D0503b854CF79D55697F90c8DF',
    wethAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    ethAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    alchemixStakingAddress: '0xab8e74017a8cc7c15ffccd726603790d26d7deca',
    saddleAlEthContractAddress: '0xc9da65931ABf0Ed1b74Ce5ad8c041C4220940368',
    saddleStakingContractAddress: '0x691ef79e40d909c715be5e9e93738b3ff7d58534',
    alUsd3CrvContractAddress: '0x43b4fdfd4ff969587185cdb6f0bd875c5fc83f8c',
    alEthCrvContractAddress: '0xc4c319e2d4d66cca4464c0c2b32c9bd23ebe784e',
    sdtContractAddress: '0x73968b9a57c6e53d41345fd57a6e6ae27d6cdb2f',
    sdCrvGaugeContractAddress: '0x7f50786A0b15723D741727882ee99a0BF34e3466'
}

export const abis = {
    alchemistAbi: [{
        constant: true,
        inputs: [{
            name: 'yieldToken',
            type: 'address'
        }],
        name: 'getYieldTokenParameters',
        outputs: [{
            name: 'params',
            type: 'tuple',
            components: [
                { type: "uint8", name: "decimals" },
                { type: "address", name: "underlyingToken" },
                { type: "address", name: "adapter" },
                { type: "uint256", name: "maximumLoss" },
                { type: "uint256", name: "expectedValue" },
                { type: "uint256", name: "totalShares" },
                { type: "bool", name: "enabled" },
        { type: "uint256", name: "something" },
        { type: "uint256", name: "something2" }]
        }],
    payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
        constant: true,
        inputs: [{
            name: 'yieldToken',
            type: 'address'
        }],
        name: 'getUnderlyingTokensPerShare',
        outputs: [{
            name: 'rate',
            type: 'uint256'
        }],
    payable: false,
        stateMutability: 'view',
        type: 'function'
    }],
    erc20LikeAbi: [{
        constant: true,
        inputs: [{
            name: '_owner',
            type: 'address'
        }],
        name: 'balanceOf',
        outputs: [{
            name: 'balance',
            type: 'uint256'
        }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    },
    {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [{
        name: 'supply',
        type: 'uint256'
        }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
    }],
    masterChefAbi: [{
    constant: true,
    inputs: [{
        name: 'pid',
        type: 'uint256'
        },
        {
        name: '_owner',
        type: 'address'
        },
    ],
    name: 'userInfo',
    outputs: [{
        name: 'amount',
        type: 'uint256'
        },
        {
        name: 'rewardDebt',
        type: 'int256'
        }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
    }],

    abraCauldronAbi : [{
    constant: true,
    inputs: [{
        name: '_owner',
        type: 'address'
        }],
    name: 'userBorrowPart',
    outputs: [{
        name: 'balance',
        type: 'uint256'
        }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
    },
    {
    constant: true,
    inputs: [{
        name: '_owner',
        type: 'address'
        }],
    name: 'userCollateralShare',
    outputs: [{
        name: 'balance',
        type: 'uint256'
        }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
    }]

}