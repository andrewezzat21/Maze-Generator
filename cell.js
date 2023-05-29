class cell{
  constructor(i, j, idx){
    this.x = i;
    this.y = j;
    this.idx = idx;
    this.path = [false, false, false, false];
    this.pathHigh = [false, false, false, false];
    this.visited = false;
    this.pathVisited = false;
    this.cellColorNotVisted = color(234, 234, 234);
    this.cellColorVisted = color(72, 70, 109);
    this.pathColor = color(242, 132, 130);
    this.pathHighColor = color(2, 48, 71);
    this.currColor = this.cellColorVisted;
    this.parent = this;
    this.pathCell = false;
  }
  
  
  //show cells
  Show(){
    if(this.visited){
        fill(this.cellColorVisted);
    }
    else{
        fill(this.cellColorNotVisted);
    }
    noStroke();
    circle(this.x * sz * 2, this.y * sz * 2, sz);
  }
  
  //show path cells
  pathCellShow(){

    if(this.pathCell == true){
        fill(this.cellColorVisted);
        noStroke();
        circle(this.x * sz * 2, this.y * sz * 2, sz);
    }

  }
  
  //show paths
  ShowPaths(){
    if(this.path[0]){
      this.dUp();
    }
    if(this.path[1]){
      this.dRight();
    }
    if(this.path[2]){
      this.dDown();
    }
    if(this.path[3]){
      this.dLeft();
    }
  }
  
  //cell directions
  dUp(){
    let cX = this.x * sz * 2;
    let cY = this.y * sz * 2;
    let h = sz / 4;
    if(this.pathHigh[0]){
        fill(this.pathHighColor);
    }
    else{
        fill(this.pathColor);
    }
    rect(cX - h, cY - (sz*2), sz / 2 , sz * 2 + h);
  }
  dRight(){
    let cX = this.x * sz * 2;
    let cY = this.y * sz * 2;
    let h = sz / 4;
    if(this.pathHigh[1]){
        fill(this.pathHighColor);
    }
    else{
        fill(this.pathColor);
    }
    rect(cX-h, cY-h, sz * 2, sz / 2);
  }
  dLeft(){
    let cX = this.x * sz * 2;
    let cY = this.y * sz * 2;
    let h = sz / 4;
    if(this.pathHigh[3]){
        fill(this.pathHighColor);
    }
    else{
        fill(this.pathColor);
    }
    rect(cX-(sz*2), cY-h, sz * 2 + h, sz / 2);
  }
  dDown(){
    let cX = this.x * sz * 2;
    let cY = this.y * sz * 2;
    let h = sz / 4;
    if(this.pathHigh[2]){
        fill(this.pathHighColor);
    }
    else{
        fill(this.pathColor);
    }
    rect(cX - h, cY, sz / 2 , sz * 2 + h);
  }
  
  //get cell neighbors
  getNeighbors(){
    let n = [];
    
    //top
    if(valid(this.x, this.y-1)){
        let i = getIndex(this.x, this.y-1);
        if(!cells[i].visited){
            n.push(cells[i]);
        }
    }
    //right
    if(valid(this.x+1, this.y)){
        let i = getIndex(this.x+1, this.y);
        if(!cells[i].visited){
            n.push(cells[i]);
        }
    }
    //down
    if(valid(this.x, this.y+1)){
        let i = getIndex(this.x, this.y+1);
        if(!cells[i].visited){
            n.push(cells[i]);
        }
    }
    //left
    if(valid(this.x-1, this.y)){
        let i = getIndex(this.x-1, this.y);
        if(!cells[i].visited){
            n.push(cells[i]);
        }
    }    
    if (n.length > 0) {
      var idx = floor(random(0, n.length));
      return n[idx];
    } 
    else {
      return undefined;
    }
  }
  
  // cell color
  Color(){
    fill(this.currColor);
    noStroke();
    circle(this.x * sz * 2, this.y * sz * 2, sz);
  }
  
}
