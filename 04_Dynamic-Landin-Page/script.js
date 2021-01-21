const time = document.getElementById('time'),
greeting = document.getElementById('greeting'),
myName = document.getElementById('myName'),
text = document.getElementById('text');

const showAmPm = true;

function showTime() {
    //let today = new Date(2021, 01, 01, 15, 10, 10)
    let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

const amPm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12 || 12;

    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPm ? amPm : ''}`;
    
    setTimeout(showTime, 1000);
}

function addZero(n) {
    return(parseInt(n, 10) < 10 ? '0' : '') + n;
}


function setBGgreet() {
    //let today = new Date(2021, 01, 01, 23, 10, 10)
    let today = new Date(),
    hour = today.getHours();
    
    if (hour >= 23 || hour < 6) {
        document.body.style.backgroundImage = "url('https://img3.akspic.ru/originals/3/0/8/9/39803-nebo-lunnyj_svet-noch-zvezda-voda-1920x1080.jpg')";
        greeting.textContent = 'Good Night';
        document.body.style.color = 'white';
    } else if (hour < 12) {
        document.body.style.backgroundImage = "url('https://pic.xenomorph.ru/2019-07/1562224052_17.jpg')";
        greeting.textContent = 'Good Morning';
    } else if (hour < 18) {
        document.body.style.backgroundImage = "url('https://img2.akspic.ru/originals/1/1/8/2/0/102811-reki-nebo-ekosistema-den-otrazhenie-1920x1200.jpg')";
        greeting.textContent = 'Good Afternoon';
    } else {
        document.body.style.backgroundImage = "url('https://s1.1zoom.ru/b4829/663/Finland_Rivers_Evening_Coast_Houses_546267_1920x1080.jpg')";
        greeting.textContent = 'Good Evening';
        document.body.style.color = 'white';
    }
}

function getName() {
    if (localStorage.getItem('myName') === null) {
        myName.textContent = '[Enter Name]';
    } else {
        myName.textContent = localStorage.getItem('myName');
    }
}

function setName(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
        localStorage.setItem('myName', e.target.innerText);
        myName.blur();
        }
    } else {
        localStorage.setItem('myName', e.target.innerText);
    }
}

function getText() {
    if (localStorage.getItem('text') === null) {
        text.textContent = '[Enter Text]';
    } else {
        text.textContent = localStorage.getItem('text');
    }
}

function setText(e) {
    if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {
        localStorage.setItem('text', e.target.innerText);
        text.blur();
        }
    } else {
        localStorage.setItem('text', e.target.innerText);
    }
}

myName.addEventListener('keypress', setName);
myName.addEventListener('blur', setName);
text.addEventListener('keypress', setText);
text.addEventListener('blur', setText);


  showTime();
  setBGgreet();
  getName();
  getText();