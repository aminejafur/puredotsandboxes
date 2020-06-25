/*
* Dots and Boxes game in pure html, css and javascript
* 
* Author : Amine jafur
* 
*/
(function(){

const Players = [
    new Player("Amine","#056305", 0, 0, true),
    new Player("Jhon","orange", 0, 0, false),
    // new Player("Peter","black", 0, 0, false),
    // new Player("Mario","#0FF", 0, 0, false),
    new Player("Felipe","#b70505", 0, 0, false)
    ];

// Players
function Player(name,color, borders, boxs, turn) {
  this.name = name;
  this.color = color;
  this.borders = borders;
  this.boxs = boxs;
  this.turn = turn;
}

Player.prototype.board = function() {
  return `<div data-userColor="${this.color}"> <div class="color-box" style="background-color:${this.color}"></div> ${this.name} : <b> <span>${this.boxs}</span> / <span> ${this.borders} </span> </b> </p>`;
};

// move to next player
Array.prototype.next = function(str) {
  const i = this.indexOf(str);
  if (i === -1) return undefined;
  return { nextPlayer : this[(i + 1) % this.length] , index : i };
};

// Vars
let boxsCount = null;
let rowsCount = null;

// keep track of checked while checking cobmbos
let _checkedd = false;
// DocumentFragment
let fragment = document.createDocumentFragment();

const open = document.querySelector('.cover span');
const container = document.querySelector('.container');
const getBoxsCount = () => document.getElementById('boxsCount').value; //best max:18
const getRowsCount = () => document.getElementById('rowsCount').value;

// functions
const createNode = (element) => document.createElement(element);

const append = (parent, el) => parent.appendChild(el);

const firstBox = (i) => i == 0;

const lastBox = (i) => i == boxsCount-1;

const nextTurn = () => {
var result  = Players.next(Players.find( player => player.turn ));
result.nextPlayer.turn = true;
Players[result.index].turn = false;
// console.log(result);
}

const incBoders = () => {
  const player = Players.find( player => player.turn );
  player.borders++;
  document.querySelector('[data-userColor="'+player.color+'"]').getElementsByTagName('span')[1].innerHTML = player.borders;
};
const incBoxes = () => {
  const player = Players.find( player => player.turn );
  player.boxs++;
  document.querySelector('[data-userColor="'+player.color+'"]').getElementsByTagName('span')[0].innerHTML = player.boxs;
};

const changeColor = () => Players.find( player => player.turn ).color;

function setAttributes(elem) {
    for (var i = 1; i < arguments.length; i+=2) {
        elem.setAttribute(arguments[i], arguments[i+1]);
    }
}

function showDivsAnimation() {
  var elements = document.querySelectorAll('.box:not(.show)');
  if (elements.length) {
    elements[0].classList.add('show');
    setTimeout(showDivsAnimation,30);
  }
}

function hoverBorders(){
  document.querySelectorAll('.box > div').forEach(item => {
      item.addEventListener('mouseover', event => {
        item.style.background = changeColor();
      })
      item.addEventListener('mouseout', event => {
        if(!item.classList.contains('disabled')){
          item.style.background = null;
        }
      })
  })
}

function clickedBorder(item){
        item.style.background = changeColor();
        item.classList.add('disabled');
        incBoders();
        hoverBorders();
        if(!checkBorders(item)) nextTurn();
        _checkedd = false;
        // checkBorders(item) ? nextTurn() : null;
}

function watchBoxes(){
  document.querySelectorAll('.top').forEach(item => {
      item.addEventListener('click', event => {
        item.parentNode.dataset.top = "1";
        clickedBorder(item);
      })
  })
  document.querySelectorAll('.left').forEach(item => {
      item.addEventListener('click', event => {
        item.parentNode.dataset.left = "1";
        clickedBorder(item);
      })
  })
  document.querySelectorAll('.bottom').forEach(item => {
      item.addEventListener('click', event => {
        item.parentNode.dataset.bottom = "1";
        clickedBorder(item);
      })
  })
}

function checkBorders(item){
        // console.log(item);
        if (item == null ) return;
        let check = false;
        let bottomBox = document.querySelector('[data-row="'+(parseInt(item.parentNode.dataset.row) + 1)+'"][data-box="'+parseInt(item.parentNode.dataset.box)+'"]');

        let isLastRow =  bottomBox == null;
        let bottomLeft = item.parentNode.hasAttribute('data-left');
        let bottomTop = item.parentNode.hasAttribute('data-top');
        // let boxBottom = item.parentNode.hasAttribute('data-bottom');
        let nextBoxLeftBorder = document.querySelector('[data-row="'+parseInt(item.parentNode.dataset.row)+'"][data-box="'+(parseInt(item.parentNode.dataset.box) + 1)+'"]').hasAttribute('data-left');

        if(isLastRow){
          let boxBottom = item.parentNode.hasAttribute('data-bottom');
          check = bottomLeft && bottomTop && boxBottom && nextBoxLeftBorder;
        }else{
          //bottom box top border
          let bottomBoxTopBorder = bottomBox.hasAttribute('data-top');
          check = bottomLeft && bottomTop && bottomBoxTopBorder && nextBoxLeftBorder;
        }

        if(check){
          _checkedd = true;
          item.parentNode.style.setProperty('--color',changeColor());
          item.parentNode.classList.add('check');
          incBoxes();
        }

        // check combos
        if(item.classList.contains('top')  && item.parentNode.dataset.row != 1){
            checkBorders(document.querySelector('[data-row="'+(parseInt(item.parentNode.dataset.row) - 1)+'"][data-box="'+parseInt(item.parentNode.dataset.box)+'"]:not(.check) > .top'))
        }else if(item.classList.contains('left') && item.parentNode.dataset.box > 0){
            checkBorders(document.querySelector('[data-row="'+(parseInt(item.parentNode.dataset.row))+'"][data-box="'+(parseInt(item.parentNode.dataset.box) - 1)+'"]:not(.check) > .left'))
        }

        return _checkedd; 
}

//Building game
function buildGame(){

// creating cover
const cover = createNode("div");
cover.classList.add('cover','a-four');
//inputs
const boxsCountInput = createNode("INPUT");
setAttributes(boxsCountInput, 
    "type", "number",
    "id", "boxsCount",
    "placeholder", "boxsCount",
    "min", "4",
    "max", "19");
append(cover,boxsCountInput);

const rowsCountInput = createNode("INPUT");
setAttributes(rowsCountInput, 
    "type", "number",
    "id", "rowsCount",
    "placeholder", "rowsCount",
    "min", "4",
    "max", "28");
append(cover,rowsCountInput);
// open button
const coverSpan = createNode("span");
append(coverSpan,document.createTextNode('# Open #'));
append(cover,coverSpan);
append(fragment,cover);

// add cover to container
append(container,fragment);
fragment = document.createDocumentFragment();

coverSpan.addEventListener('click', function(){

//Init counts
boxsCount = getBoxsCount();
rowsCount = getRowsCount();

if(boxsCount == "" || rowsCount == ""){
  boxsCountInput.classList.add('danger');
  rowsCountInput.classList.add('danger');
  return;
}

// disable to prevent multiple build
this.classList.add('disabled');

// creating game boxs
const game = createNode("div");
game.classList.add('game');


for (var j = 0; j < rowsCount; j++) {
  for (var i = 0; i < boxsCount; i++) {
    // console.log(i , j);
    // new-line
    if(firstBox(i)){
    const newLine = createNode("div");
    newLine.classList.add('new-line');
    append(game,newLine)
    }
  
    // box div
    const boxdDiv = createNode("div");
    boxdDiv.classList.add('box');
    setAttributes(boxdDiv, 
        "data-row", j,
        "data-box", i);
  
    if(firstBox(i) || lastBox(i) || j > 0){
    firstBox(i) ? boxdDiv.dataset.left = "1" : null;
    if(lastBox(i)){
      boxdDiv.dataset.left = "1";
      boxdDiv.classList.add('box-end')
    }  

    if(j > 0){
    // top border
    const topBorder = createNode("div");
    topBorder.classList.add('top'); 
    append(boxdDiv,topBorder)
    }

    // left border
    const leftBorder = createNode("div");
    const  leftBorderClasses = lastBox(i) ? ['left','border-end','no-pointer'] : firstBox(i) ? ['left','disabled'] : ['left'] ;
    [...leftBorderClasses].map(x => leftBorder.classList.add(x));
    append(boxdDiv,leftBorder)
    // bottom border
    if(j == rowsCount -1){
    const bottomBorder = createNode("div");
    bottomBorder.classList.add('bottom'); 
    append(boxdDiv,bottomBorder)
    }

    }else{
    boxdDiv.classList.add('no-pointer');
    }
  
    append(game,boxdDiv)
    append(fragment,game);
  }
}
// score board
const scoreBoard = createNode("div");
scoreBoard.classList.add('score-board');

Players.forEach( (player) => scoreBoard.innerHTML += player.board());

// restart button
const restartSpan = createNode("span");
append(restartSpan,document.createTextNode('# Restart'));
append(scoreBoard,restartSpan);

append(fragment,scoreBoard);

append(container,fragment);

restartSpan.addEventListener('click', event => {
  game.classList.add('hide');
  scoreBoard.classList.add('hide');

  cover.classList.remove('flip');
  cover.classList.add('close');
  coverSpan.classList.remove('disabled');

  Players.forEach( (player,i) => {
    player.borders = 0;
    player.boxs = 0;
    player.turn = i == 0 ? true : false;
  });

  setTimeout(function(){ 
    scoreBoard.remove();
    game.remove();
  }, 1000);
});

watchBoxes();
//open
cover.classList.remove('close');
cover.classList.add('flip');

showDivsAnimation();
hoverBorders();

});

}

buildGame();

})();