class snake{

constructor(size, speed){
this.size = size;
this.snake = [
    { x: 270, y: 240},
    { x: 300, y: 240}
];//corpo da cobra

this.audio = new Audio('../assets/audio.mp3');

this.speed = speed;
}


incrementScore(){
    result = parseInt(score.innerText) + 10;//parseInt transforma o valor de uma variavel em Int
    score.innerText = result;
    return result
}

randomNumber(min, max){
    return Math.round(Math.random() * (max - min) + min);//round arredonda, e random devolve um numero entre 0 e 1
}

randomPosition(){
    const number = this.randomNumber(0, canvas.width - this.size)
    return Math.round(number/ 30) * 30; //faz o numero aleatorio sempre ser um multiplo de 30
}

randomColor(){
    const red = this.randomNumber(0, 255)//reutilizando a função
    const green = this.randomNumber(0, 255)
    const blue = this.randomNumber(0, 255)

    return `rgb(${red}, ${green}, ${blue})`;
}

drawSnake() {
    ctx.fillStyle = '#ddd';    
    this.snake.forEach((position, index) => {//esse forEach passa por todas as posisões do corpo da cobra

        if(index == (this.snake.length - 1)){//pintando a cabeça/no caso o ulto elemento a ser add no array
            ctx.fillStyle = "white"
        }

    ctx.fillRect(position.x, position.y, this.size, this.size);
    })
}

moveSnake(){

    if(!direction) return;
       
    

    const head = this.snake[this.snake.length - 1]
    
    if(direction == 'right'){
       this.snake.push({x: head.x + this.size, y: head.y});//o head vai ser sempre o mais atualizado (add mais 30 na cabeça atual)
    }

    if(direction == 'left'){
        this.snake.push({x: head.x - this.size, y: head.y});//o head vai ser sempre o mais atualizado (add mais 30 na cabeça atual)
     }

     if(direction == 'up'){
        this.snake.push({x: head.x, y: head.y  - this.size});//o head vai ser sempre o mais atualizado (add mais 30 na cabeça atual)
     }

     if(direction == 'down'){
        this.snake.push({x: head.x, y: head.y  + this.size});//o head vai ser sempre o mais atualizado (add mais 30 na cabeça atual)
     }


        this.snake.shift()//remove o primeiro elemento do array
  
}

drawGrid(){

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#191919';//defini o style do stroke 

for(let i = 30; i < canvas.width; i += 30){

    ctx.beginPath();//começa um novo desenho
    ctx.lineTo(i , 0)
    ctx.lineTo(i , 600)//defini a posição do stroke
    ctx.stroke();//desenha

    ctx.beginPath()
    ctx.lineTo(600 , i)
    ctx.lineTo(0 , i)//defini a posição do stroke
    ctx.stroke();//desenha
}


 
}

teclaDirection(event){
 
    if(event.key == 'ArrowUp' && direction !== 'down') direction = 'up'

    if(event.key == 'ArrowLeft' && direction !== 'right') direction = 'left'

    if(event.key == 'ArrowDown' && direction !== 'up') direction = 'down'

    if(event.key == 'ArrowRight' && direction !== 'left') direction = 'right'
}

drawFood(){

const { x, y, color} = food//destruturando

    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, this.size, this.size);
    ctx.shadowBlur = 0;//depois de desenhar o food tira o blur
}

checkEat(){
    const head = this.snake[this.snake.length - 1];

    if(head.x == food.x && head.y == food.y){
        this.incrementScore()
        this.snake.push(head)//passando as cordenadas do proximo elemento do corpo da cobra ao comer o food
        this.audio.play();//assim que funciona o audio

        //ao a head ter a mesma posição do food, redifini a posição e a cor dela
        let x = this.randomPosition()
        let y = this.randomPosition() 

        while(this.snake.find((position) => position.x == x && position.y == y)) {//enquanto existir um position/snake == x/food
            x = this.randomPosition()
            y = this.randomPosition() 
        }

        food.x = x;
        food.y = y;
        food.color = this.randomColor();
    }
}

gameOver(){
    direction = undefined

    menu.style.display = 'flex';
    finalScore.innerText = result;
    canvas.style.filter = 'blur(2px)';
}

checkCollision(){
    const head = this.snake[this.snake.length - 1];
    const canvasLimit = canvas.width - this.size;
    const neckIndex = this.snake.length - 2;//pescoço da cobra, por ela estar grudada no pescoço ser uma eseção
    const wallCollision = head.x < 0 || head.x > canvasLimit|| head.y < 0 || head.y > canvasLimit; //verificação da parede

    const selfCollision = this.snake.find((position, index) => {//posição da cobra e da cabeça da cobra
        return index < neckIndex && position.x == head.x && position.y == head.y 
    })

    if(wallCollision || selfCollision){
        this.gameOver()
    }

}

gameLoop(){
    clearInterval(loopId);//stop loop para não passar de 300, assim que chega em 300 o loop começa e limpa na primeira linha
    
    ctx.clearRect(0, 0, 600, 600)//limpando a tela antes de fazer o desenho (os parametros são o tamanho da tela) ele limpa os elementos do array que não existe mais

    cobra.drawGrid();
    cobra.drawFood();
    cobra.moveSnake();
    cobra.drawSnake();
    cobra.checkEat();
    cobra.checkCollision();
   

    loopId = setTimeout(() => {//a variavel vai ter o valor time loop 
        this.gameLoop();
    }, this.speed)//velocidade do loop do game
}




}