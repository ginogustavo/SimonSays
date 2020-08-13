const green = document.getElementById("green");
const red = document.getElementById("red");
const yellow = document.getElementById("yellow");
const blue = document.getElementById("blue");
const btnStart = document.getElementById("btnStart");

const LAST_LEVEL = 10

class Game {
  constructor() {
    this.start();
    this.generateSequence();
    
    setTimeout(this.nextLevel, 500);

   
  }

  start() {
    //To replace the need to call in each case of chooseColor
    this.chooseColor = this.chooseColor.bind(this);

    this.nextLevel = this.nextLevel.bind(this)

    //Adding 'hide' style, to the classes that the object has.
    btnStart.classList.add("hide");
    this.level = 1; // when users make progress level changes
    this.colors = {
      // instead of  red: red  (propertyName: object defined above)
      // Since both have the same name, JS allow us to just use the single name for name and value.
      green,
      red,
      yellow,
      blue,
    };
  }

  generateSequence() {
    //Generate array sequence
    this.sequence = new Array(LAST_LEVEL)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));

    // map() doesn't work if elements are empty, thus we fill() the array first.
    //Math.random: return random decimal betwen 0 - 1
    //Math.floor: round to down, Ex. 3.9-> 3,  0.45-> 0

    //Optinally we can use for each
    // this.sequence = []
    // new Array(10).fill(0).forEach(n=>
    //     this.sequence.push(Math.floor(Math.random() * 4))
    // )
  }
  nextLevel() {
    this.subLevel = 0
    this.highlightSequence();
    this.addOnclickEvents();
  }

  numberToColor(num) {
    switch (num) {
      case 0:
        return "green";
      case 1:
        return "red";
      case 2:
        return "yellow";
      case 3:
        return "blue";
    }
  }

  colorToNumber(color){
    switch (color) {
        case 'green':
          return 0;
        case 'red':
          return 1;
        case 'yellow':
          return 2;
        case 'blue':
          return 3;
      }

  }

  highlightSequence() {
    for (let i = 0; i < this.level; i++) {
      //let, the value is kept during this block (for) . Always "const" before "let" before "var"
      const color = this.numberToColor(this.sequence[i]);
      setTimeout(() => this.turnOn(color), 1000 * i); // each color turn on first in 0, 2nd in 1sec, etc
    }
  }

  turnOn(color) {
    this.colors[color].classList.add("light");
    setTimeout(() => this.turnOff(color), 500);
  }

  turnOff(color) {
    this.colors[color].classList.remove("light");
  }

  /**
   * Add Click events to the buttons.
   * It tells the browsers what functions it fires when clicked (asynchronously)
   */
  addOnclickEvents() {
    //var self = this;   .bind(self)
    this.colors.green.addEventListener("click", this.chooseColor); //<- to keep "this" as the "game" object we use bind(this)
    this.colors.red.addEventListener("click", this.chooseColor);
    this.colors.yellow.addEventListener("click", this.chooseColor);
    this.colors.blue.addEventListener("click", this.chooseColor);
  }
  removeClickEvents(){
    this.colors.green.removeEventListener("click", this.chooseColor);
    this.colors.red.removeEventListener("click", this.chooseColor);
    this.colors.yellow.removeEventListener("click", this.chooseColor);
    this.colors.blue.removeEventListener("click", this.chooseColor);
  }
  /**
   * When we using an event Manager, functions are usually called with the event parameter
   * The context changes, try using "this", which in this case is the buttons.
   */
  chooseColor(event) {
    //if we want "this" is the object game. USE bind() when adding event listener
    console.log(event);
    const colorName = event.target.dataset.color
    const colorNumber = this.colorToNumber(colorName)
    this.turnOn(colorName)
    
    //Compare color number with sequence in position of subLevel it is in.
    if(colorNumber === this.sequence[this.subLevel]){
        this.subLevel++
        if( this.subLevel === this.level){
            this.level++
            //If user pass next level, remove click events (should not be able to select)
            this.removeClickEvents()

            if(this.level === (LAST_LEVEL +1)){
                // TODO: Win!
            }else{
                //if not last level, user has to advance
                // setTimeout(() => this.nextLevel.bind(this), 2000);
                setTimeout(this.nextLevel, 1500);
            }

        }

    }else{
        // TODO: Lost!
    }

  }
}

function startGame() {
  //   var game = new Game();
  window.game = new Game();
}
