//1. Deposit some money
//2. Determine the number of lines to be bet on
//3. collect the bet amount
//4. spin the machine
//5. Give user their winnings
//6. play again


const prompt=require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT={
    '@': 2,
    '#': 4,
    '%': 6,
    '$': 8
}
const SYMBOLS_VALUE={
    '@': 5,
    '#': 4,
    '%': 3,
    '$': 2
}


//Deposit money
const deposit = () =>{
    while(true){
    const depositAmount= prompt("Enter the deposit amount: ");
    const numberDepositAmount= parseFloat(depositAmount);
    if (isNaN(numberDepositAmount) || numberDepositAmount<0){
        console.log("Invalid number");
    }
    else{
        return numberDepositAmount;
    }

    }
};

//Number of lines to be bet on
const getNumberofLines = () =>{
    while(true){
    const lines= prompt("Enter the no. of lines to be bet on : ");
    const numberoflines= parseFloat(lines);
    if (isNaN(numberoflines) || numberoflines<0 || numberoflines >3){
        console.log("Invalid number");
    }
    else{
        return numberoflines;
    }

    }
   
};


//Get Bet amount per line
const getbet = (balance,lines) =>{
    while(true){
    const bet= prompt("Enter the bet per lines: ");
    const numberbet= parseFloat(bet);
    if (isNaN(numberbet) || numberbet<0 || numberbet>balance/lines){
        console.log("Invalid bet , try again");
    }
    else{
        return numberbet;
    }

    }
};

//spin the wheel
const spin=() =>{
    const symbols=[];
    for(const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0; i<count ; i++){
            symbols.push(symbol);
       

        }
    }
    const reels= [[],[],[]];
    for( let i=0 ; i< COLS ; i++){
        const reelSymbols=[...symbols]
        for(let j=0 ; j<ROWS ; j++){
            const randomIndex=Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbol=reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    

    return reels;
}


//transpose 
const transpose=(reels) =>{
    const rows=[];
    for(let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0; j<COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}
//printing the symbols
const printRows = (rows) => {
    for(const row of rows){
        let rowString="";
        for([i,symbol] of row.entries()){
            rowString+=symbol;
            if(i!=row.length-1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }

}
//calculate the winnings
const getWinnings = (rows ,bet, lines) => {
    let winnings =0;
    for(let row = 0; row< lines; row++){
        const symbols = rows[row];
        let allSame=true;

        for (const symbol of symbols ){
            if(symbol != symbols[0]){
                allSame=false;
                break;
            }
        
        }
        if(allSame){
            winnings+= bet*  SYMBOLS_VALUE[symbols[0]];

        }
    }
    return winnings;
}


//Total  game
 
const game= () => {
let balance=deposit();
while(true){
    console.log("Balance: $"+ balance);
    const numberoflines=getNumberofLines();
    const bet=getbet(balance,numberoflines);
    balance-= bet*numberoflines;
    const reels=spin(); 
    const rows=transpose(reels);
    printRows(rows);
    const winnings=getWinnings(rows,bet,numberoflines);
    balance += winnings;
    console.log("You won, $"+ winnings.toString());
    if(balance<=0){
        console.log("No balance!!!");
        break;
    }
    const playAgain = prompt("Do you want to play again (y/n)?");
    if(playAgain!='y') break;

}
};
game();

//End of game