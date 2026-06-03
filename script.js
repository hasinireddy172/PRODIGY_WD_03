const cells =
document.querySelectorAll(".cell");

const statusText =
document.getElementById("status");

const restartBtn =
document.getElementById("restartBtn");

const pvpBtn =
document.getElementById("pvpBtn");

const aiBtn =
document.getElementById("aiBtn");

const xScoreEl =
document.getElementById("xScore");

const oScoreEl =
document.getElementById("oScore");

let board =
["","","","","","","","",""];

let currentPlayer = "X";

let gameActive = true;

let aiMode = false;

let xScore = 0;
let oScore = 0;

const winPatterns = [

[0,1,2],
[3,4,5],
[6,7,8],

[0,3,6],
[1,4,7],
[2,5,8],

[0,4,8],
[2,4,6]

];

pvpBtn.onclick = () => {

    aiMode = false;

    resetGame();
};

aiBtn.onclick = () => {

    aiMode = true;

    resetGame();
};

cells.forEach(cell => {

    cell.addEventListener(
    "click",
    handleClick);

});

restartBtn.addEventListener(
"click",
resetGame);

function handleClick(){

    const index =
    this.dataset.index;

    if(
    board[index] !== ""
    || !gameActive
    ) return;

    board[index] =
    currentPlayer;

    this.textContent =
    currentPlayer;

    checkWinner();

    if(
    aiMode &&
    currentPlayer === "O" &&
    gameActive
    ){

        setTimeout(
        aiMove,
        500);
    }
}

function aiMove(){

    let empty =
    board.map(
    (val,index)=>
    val === ""
    ? index
    : null)
    .filter(
    val=>val!==null);

    let move =
    empty[
    Math.floor(
    Math.random()
    * empty.length
    )];

    board[move] = "O";

    cells[move]
    .textContent = "O";

    checkWinner();
}

function checkWinner(){

    let won = false;

    winPatterns.forEach(pattern => {

        const [a,b,c] =
        pattern;

        if(
        board[a] &&
        board[a]===board[b]
        &&
        board[a]===board[c]
        ){

            won = true;

            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");

            statusText.textContent =
            `${board[a]} Wins!`;

            gameActive = false;

            if(board[a]==="X"){
                xScore++;
                xScoreEl.textContent=xScore;
            }
            else{
                oScore++;
                oScoreEl.textContent=oScore;
            }
        }
    });

    if(won) return;

    if(!board.includes("")){

        statusText.textContent =
        "Draw Game";

        gameActive = false;

        return;
    }

    currentPlayer =
    currentPlayer==="X"
    ? "O"
    : "X";

    statusText.textContent =
    `Player ${currentPlayer} Turn`;
}

function resetGame(){

    board =
    ["","","","","","","","",""];

    gameActive = true;

    currentPlayer = "X";

    statusText.textContent =
    "Player X Turn";

    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove(
        "winner");
    });
}