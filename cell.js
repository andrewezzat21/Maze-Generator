class cell{
  

  
    constructor(i, j, idx){
      this.x = i;
      this.y = j;
      this.idx = idx;
      this.path = [false, false, false, false];
      this.visited = false;
      this.cellColorNotVisted = color(234, 234, 234);
      this.cellColorVisted = color(72, 70, 109);
      this.pathColor = color(242, 132, 130);
      this.currColor = this.cellColorVisted;
    }
    
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
    dUp(){
      let cX = this.x * sz * 2;
      let cY = this.y * sz * 2;
      let h = sz / 4;
      fill(this.pathColor);
      rect(cX - h, cY - (sz*2), sz / 2 , sz * 2 + h);
    }
    dRight(){
      let cX = this.x * sz * 2;
      let cY = this.y * sz * 2;
      let h = sz / 4;
      fill(this.pathColor);
      rect(cX-h, cY-h, sz * 2, sz / 2);
    }
    dLeft(){
      let cX = this.x * sz * 2;
      let cY = this.y * sz * 2;
      let h = sz / 4;
      fill(this.pathColor);
      rect(cX-(sz*2), cY-h, sz * 2 + h, sz / 2);
    }
    dDown(){
      let cX = this.x * sz * 2;
      let cY = this.y * sz * 2;
      let h = sz / 4;
      fill(this.pathColor);
      rect(cX - h, cY, sz / 2 , sz * 2 + h);
    }
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
    Color(){
      fill(this.currColor);
      noStroke();
      circle(this.x * sz * 2, this.y * sz * 2, sz);
    }
    
  }
  function drawPath(a,b){
    let x = a.x - b.x;
    if(x == 1){
      a.path[3] = true;
      b.path[1] = true;
    }
    else if(x == -1){
      a.path[1] = true;
      b.path[3] = true;
    }
    
    let y = a.y - b.y;
    if(y == 1){
      b.path[4] = true;
      a.path[0] = true;
    }
    else if(y == -1){
      b.path[0] = true;
      a.path[4] = true;
    }
    
  }
  function valid(x,y){
    if(x > 0 && x <= width && y > 0 && y <= height ){
      return true;
    }
    return false;
  }
  function getIndex(x, y){
    return (x + (y-1) * width)-1;
  }