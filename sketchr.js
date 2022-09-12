let columns = 16;
let rows = 16;
let j = 0;
let cellWidth;
let rndCol = 'rgb(0, 0, 255)';
let penColor = 'rgb(0, 0, 255)';
let colorToDarken;
let darkenedColor;
let mouseDown = false;

createGrid();

// Display the default slider value
var slider = document.getElementById("range");
var output = document.getElementById("demo");
output.innerHTML = slider.value; 

// Update slider value
slider.oninput = function() {
    resetGrid();
    output.innerHTML = this.value;
    columns = this.value;
    rows = this.value;
    createGrid();
}
        
// ------ PALLET BUTTONS ------
document.querySelectorAll('.btn').forEach(item => {
    item.addEventListener('click', event => {
        let colorToConvert = item.id;
        if (colorToConvert == 'multi'){
            penColor = 'multi';
        } else {
            penColor = getRGB(colorToConvert);
        }
    })
    item.addEventListener('mouseover', event => {
        document.getElementById(item.id).style.border = '0.5vw solid hotpink';
    })
    item.addEventListener('mouseout', event => {
        document.getElementById(item.id).style.border = 'none';
    })
})

// ------ CONTROL BUTTONS ------
document.querySelectorAll('.but').forEach(item => {
    item.addEventListener('click', event => {
        if (item.id == 'eraserButton'){
            penColor = 'black';
        }
        else if (item.id == 'rainbowButton'){
            penColor = 'multi'; 
        }        
        else if (item.id == 'darkenButton'){
            penColor = 'darken';
        }
        else if (item.id == 'clearButton'){
            clearGrid();
        }    
    })
})

function listenForDrawing(){
    document.querySelectorAll('.sq').forEach(item => {

        item.addEventListener('mousedown', () => {
            mouseDown = true;
          })
        item.addEventListener('mouseup', () => {
            mouseDown = false;
          })
        item.addEventListener('mouseover', () => {

            if (penColor == 'multi' && mouseDown){
                item.style.backgroundColor = rainbowPen();
            }
            else if (penColor == 'darken' && mouseDown){
                colorToDarken = item.style.backgroundColor
                item.style.backgroundColor = darkenPen(colorToDarken); 
            }
            else if (mouseDown){
                item.style.backgroundColor = penColor;            
            }
        })
    })
}

function resetGrid(){
    const mainRows = document.querySelectorAll('.mainRow');
    mainRows.forEach(mainRow => {
        mainRow.remove();
    });
}

function createGrid(){
    for (let i = 0; i < rows; ++i) {
    const cRow = document.createElement('div');
    cRow.setAttribute(
        "id", 
        `row${i}`);
    cRow.setAttribute(
        "class", 
        "mainRow");
    cRow.setAttribute(
        "style",
        `grid-template-columns: repeat(${columns}, 1fr); grid-template-rows: repeat(${rows}, 0fr)`,
        );
    document.getElementById("mainGrid").appendChild(cRow);
        for (j = 0; j < columns; ++j) {                
            const cCol = document.createElement('div');
            cCol.setAttribute("id", `col${j}`);
            cCol.setAttribute("class", "sq");
            document.getElementById(`row${i}`).appendChild(cCol);
        }   
    }
    listenForDrawing();
}
       
function clearGrid(){
    document.querySelectorAll('.sq').forEach(item => {
    item.style.backgroundColor = 'black';
    })
}

function rainbowPen(){
    let rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
    return rndCol; 
}

function darkenPen(colorToDarken){
    rgbArr = colorToDarken.substring(4, colorToDarken.length-1).replace(/ /g, '').split(',');
    let r = (rgbArr[0] - 25) ;
    let g = (rgbArr[1] - 25) ;
    let b = (rgbArr[2] - 25) ;
    if (r < 0){r = 0};
    if (g < 0){g = 0};
    if (b < 0){b = 0};
    return darkenedColor = 'rgb(' + r + ',' + g + ',' + b + ')';
}

function random(num){
    return Math.floor(Math.random()*(num + 1));
}

function getRGB(colorToConvert){
  switch (colorToConvert){
      case 'red':
          return 'rgb(255, 0, 0)';
      case 'orange':
          return 'rgb(255, 165, 0)';
      case 'yellow':
          return 'rgb(255, 215, 0)';
      case 'green':
          return 'rgb(0, 255, 0)';
      case 'blue':
          return 'rgb(0, 0, 255)';
      case 'indigo':
          return 'rgb(75, 0, 130)';
      case 'violet':
          return 'rgb(238, 130, 238)';
      case 'white':
          return 'rgb(255, 255, 255)';
      case 'black':
          return 'rgb(0, 0, 0)';
  }
}
