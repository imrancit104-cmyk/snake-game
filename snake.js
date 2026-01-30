let inputDir={x:0,y:0};
const gameOver=new Audio('over.mp3');
const foodSound=new Audio('food.mp3');
const moveSound=new Audio('move.mp3');
let snakeArr=[
    {x:10,y:10}
];
const foodEmojis = ['🍎','🍓','🍒','🍇','🍏','🍋','🥝'];
let foodEmoji = foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
let food={x:2,y:17}
let score=0;
let speed=2;
let lastPaintTime=0;
let snakeSpeed=document.querySelector('#speedSelect');
snakeSpeed.addEventListener('change',()=>{
    speed=parseInt(snakeSpeed.value);
});  

function main(ctime){

    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();

}

function gameEngine(){
    let board=document.querySelector('.board');
    board.innerHTML='';
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
             snakeElement.className='head' 
        }
        else{
       snakeElement.className='snake'
        }
        board.appendChild(snakeElement)
    });

    foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.className='food'
        foodElement.innerHTML=foodEmoji;
        board.appendChild(foodElement)
    
        if(isCollide(snakeArr)){
             gameOver.play();
            inputDir={x:0,y:0};
            document.querySelector('.score').innerText = `Score: ${score}`;
            alert(`Game Over. Press any key to play again.\n Your score was ${score}`);
            snakeArr=[{x:13,y:15}];
            score=0;
            document.querySelector('.score').innerText = `Score: ${score}`;
        }

if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    foodSound.play();
    setTimeout(() => {
  foodSound.pause();
  foodSound.currentTime = 0;
}, 400);
    snakeArr.unshift({
        x: snakeArr[0].x + inputDir.x,
        y: snakeArr[0].y + inputDir.y
    });
    score += 1;
    document.querySelector('.score').innerText = `Score: ${score}`;
    let a = 2;
    let b = 18;
    food = {
        x: Math.round(a + (b - a) * Math.random()),
        y: Math.round(a + (b - a) * Math.random())
    };
             foodEmoji = foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
}

// Snake ki body move karne ka logic
for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
} 
        snakeArr[0].x+=inputDir.x;
        snakeArr[0].y+=inputDir.y;
}



function isCollide(snakeArr){
    if(snakeArr[0].x > 18 || snakeArr[0].x < 0 || snakeArr[0].y >18 || snakeArr[0].y < 0){
        return true;
    }
    for(let i=1; i<snakeArr.length; i++){
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
    }

    return false;
}

window.requestAnimationFrame(main)
window.addEventListener('keydown',e=>{
    let key=['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'];
    if(key.includes(e.key)){
  e.preventDefault();
    switch(e.key){
        case 'ArrowUp':
           if(inputDir.y!==1){
            inputDir.x=0;
            inputDir.y=-1;
           }
            break;
        case 'ArrowDown':
            if(inputDir.y!==-1){
            inputDir.x=0;
            inputDir.y=1;
            }
            break;
        case 'ArrowLeft':
            if(inputDir.x!==1){
            inputDir.x=-1;
            inputDir.y=0;
            }
            break;
        case 'ArrowRight':
            if(inputDir.x!==-1){
            inputDir.x=1;
            inputDir.y=0;
            }
            break;
        }
    }
})