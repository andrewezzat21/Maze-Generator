let sz = 10;
let canvWidth = 1400;
let canvHeight = 600;
let width,height;
let cells = [];
let stack = [];
let curr;
let sizeSlider;
let showCells;
let pButton;
let qu;
let pathGenerated;

function setup() {
  createCanvas(canvWidth, canvHeight);
  
  //reset button
  let resetButton = createButton("Reset");
  resetButton.mousePressed(resetCanv);
  resetButton.position(20, canvHeight + 20);
  resetButton.style("background-color","#008CBA");
  resetButton.style("border","none");
  resetButton.style("padding","15px 32px");
  resetButton.style("font-size","15px");
  resetButton.style("text-decoration","none");
  resetButton.style("color","white");
  
  //show path button
  pButton = createButton("Show Path");
  pButton.mousePressed(generatePath);
  pButton.position(-500, canvHeight + 20);
  pButton.style("background-color","#008CBA");
  pButton.style("border","none");
  pButton.style("padding","15px 32px");
  pButton.style("font-size","15px");
  pButton.style("text-decoration","none");
  pButton.style("color","white");
  
  //size slider
  sizeSlider = createSlider(10,70,20,5);
  sizeSlider.position(200, canvHeight + 35);
  
  //show cells checkbox
  checkbox = createCheckbox('Show Cells', false);
  checkbox.position(400, canvHeight + 35);
  checkbox.style("color","#008CBA")
  checkbox.style("height","55px")
  checkbox.changed(CheckedEvent);


  
  resetCanv();

  
 
}

function CheckedEvent() {
  if (checkbox.checked()) {
    showCells = true;
  } else {
    showCells = false;
  }
}

// canvas reset
function resetCanv(){
  cells = [];
  sz = sizeSlider.value();
  createdPathButton = false;
  stack = [];
  qu = new Queue();
  pathGenerated = false;
  width = floor(canvWidth / max(sz,1) / 2);
  height = floor(canvHeight / max(sz,1) / 2);
  width--;
  height--;
  let idx = 0;
  let cols = 0;
  for(let y = 0 ; y < height ; y++){
    for(let x = 0 ; x < width ; x++){
          var Cell = new cell(x+1,y+1,idx);
          idx++;
          cells.push(Cell);
          cols = x;
    }
  }
  curr = cells[0];  
  cells[0].path[3] = true;
  cells[cells.length-1].path[1] = true;
  pButton.position(-500, canvHeight + 20);
}

// main draw function
function draw() {
  background(247, 237, 226);
  frameRate(100);

  
  //drawing
  for(let i = 0 ; i < cells.length ; i++){
    cells[i].ShowPaths();
  }
  
  for(let i = 0 ; i < cells.length ; i++){
    if(showCells){
        cells[i].Show();
    }
    if(pathGenerated){
        cells[i].pathCellShow();
    }
  }
  
  
  // randomized DFS
  curr.visited = true;
  curr.Color();
  let next = curr.getNeighbors();
  if (next) {
    next.visited = true;
    stack.push(curr);
    drawPath(curr, next);
    curr = next;
  } else if (stack.length > 0) {
    curr = stack.pop();
  }
  
  
  //show path button
  if(curr == cells[0] && stack.length == 0 && !pathGenerated){
     pButton.position(600, canvHeight + 20);
  }
  
}

