window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

  let field = document.querySelector(".field");
  let ball = document.querySelector(".ball");
  let wave = document.querySelector(".wave");
  let height = document.querySelector(".wave");
  let btn = document.querySelectorAll(".btn");
  let display = document.querySelector("#display");
  let numbers = document.querySelectorAll(".number");
  let resultBtn = document.querySelector(".enter-btn");
  let clearBtns = document.querySelectorAll(".clear-btn");
  let NewNumber = false;



  //let i = 0;
  //while (i < 3) {


  //}

  let maxX = 460;
  let maxY = 420;

  let duration = 7; // seconds
  let gridSize = 50; // pixels

  
  ball.style.left = Math.random() * maxX + "px";
  let start = null;

  

   let startLevel = wave.getBoundingClientRect().top;
  function levelWave (level) {
    let waveBottom = wave.getBoundingClientRect().bottom;
    let waveHeight = 330;
    let waveCentr = waveBottom - waveHeight / 2;
    let ballBottom = ball.getBoundingClientRect().bottom;
    if (ballBottom > waveCentr) 
    wave.style.top =  waveBottom - 100 + "px";
  }
  
    

  


  function step(timestamp) {
    let progress, y;
    if (start === null) start = timestamp;
    progress = (timestamp - start) / duration / 1000;
    y = progress * maxY/gridSize;
    ball.style.top = Math.min(maxY, gridSize * y) + "px";
    if (progress >= 1) start = null;
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);

  

  /*for (i=0; i<numbers.length; i++) {
    let number = numbers[i];
    number.addEventListener('click', function(e) {
    numberPress(e.target.textContent);       
    });
};


for (i=0; i<clearBtns.length; i++) {
    let clearbtn = clearBtns[i];
    clearbtn.addEventListener('click', function(e) {
    deleteNum(e.target.textContent);
    clearNum(e.target.textContent);   //console.log('clear');      
    });
};

resultBtn.addEventListener('click', enter-btn);


function numberPress(number) {
    if (NewNumber) {
        display.value = number;
        NewNumber = false;
    } else {
        if (display.value === '0') {
                display.value = number;
        }
        else {
            display.value += number;
        };
    };
    //console.log('клик по кнопке с ' + number + '!');
};

function deleteNum (id) {
    if (id === 'delete')
        display.value = '0';
        NewNumber = true;
};

function clearNum (id) {
    if (id === 'clear') {

    }
}*/

