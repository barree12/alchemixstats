let today = new Date();
let emissionStart = new Date('2/27/2021');

export function emissionWeek(){
    const diffTime = Math.abs(today - emissionStart);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.ceil(diffDays / 7);
    return diffWeeks;
}

export function tokenEmission(){
    let weeksLeft = 156-emissionWeek();
    return 2200+weeksLeft*130;
}

export function currentStats(){
    let supply = 478612;
    let emission = 22480;
    for(let i=0;i<emissionWeek();i++){
        supply+=emission;
        if(emission>2200) emission-=130;
    }
    let currentInflation = Math.round(emission/supply*100000)/1000;
    return {
        currentSupply: supply,
        currentEmission: emission,
        currentInflation: currentInflation,
        currentInflationAnnual: Math.round(emission*52/supply*100000)/1000
    };
}

export function futureInflation(years) {
    let supply = currentStats().currentSupply;
    let emission = currentStats().currentEmission;
    for(let i=0;i<years*52;i++){
        supply+=emission;
        if(emission>2200) emission-=130;
    }
    return {
        totalInflation: Math.round((supply/currentStats().currentSupply-1)*10000)/100,
        forwardInflation: Math.round(emission*52/supply*10000)/100
    }
}

export function calculateEmissionScheduleChart(){
    let supply = 478612;
    let emission = 22480;
    let emissionArray = [];
    let supplyArray = [];
    let inflationArray = [];
    for(let i=0;i<350;i++){
        emissionArray[i] = emission;
        supplyArray[i] = supply;
        inflationArray[i] = Math.round(emission*52/supply*10000)/100
        supply += emission;
        if(i<156) emission -= 130;
    }
    return {
        emissionArray: emissionArray,
        supplyArray: supplyArray,
        inflationArray: inflationArray
    }
}

export function createDateArray(){
    let date = new Date('2/27/2021');
    let dateArray = [];
    for(let i=0;i<350;i++) {
        dateArray[i] = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        date.setDate(date.getDate() + 7)
    }
    return dateArray;
}