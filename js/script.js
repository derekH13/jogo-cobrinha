const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');// o elemento dentro do canvas

const score = document.querySelector('.score-value');
const finalScore = document.querySelector('.final-score >span');
const menu = document.querySelector('.menu-screen');
const buttonPlay = document.querySelector('.btn-play');

const vel50 = document.querySelector('.vel-50');
const vel100 = document.querySelector('.vel-100');
const vel150 = document.querySelector('.vel-150');
const vel200 = document.querySelector('.vel-200');
const vel250 = document.querySelector('.vel-250');
const vel300 = document.querySelector('.vel-300');

let cobra = new snake(30, 50);

vel50.addEventListener('click', () => {
    return cobra.speed = 50;
})

vel100.addEventListener('click', () => {
    return cobra.speed = 100;
})

vel150.addEventListener('click', () => {
    return cobra.speed = 150;
})

vel200.addEventListener('click', () => {
    return cobra.speed = 200;
})

vel250.addEventListener('click', () => {
    return cobra.speed = 250;
})

vel300.addEventListener('click', () => {
    return cobra.speed = 300;
})




// ctx.fillStyle = 'white';
// ctx.fillRect(275, 275, 50, 50);//os dois primeiros parametros são as cordenadas, os dois ultimos são width e height

let direction, loopId, result;






let food = {
    x: cobra.randomPosition(),
    y: cobra.randomPosition(),
    color: cobra.randomColor() 
}



cobra.gameLoop();



document.addEventListener('keydown', (event) => {//assim que o evento for declarado o parametro event é definido
    cobra.teclaDirection(event);
})

buttonPlay.addEventListener('click', () => {
    score.innerText = "00"
    menu.style.display = "none"
    canvas.style.filter = 'none';

    cobra.snake = [
        { x: 270, y: 240},
        { x: 300, y: 240}
    ]
})
console.log(result)