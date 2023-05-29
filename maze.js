// draw all maze paths
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
      b.path[2] = true;
      a.path[0] = true;
    }
    else if(y == -1){
      b.path[0] = true;
      a.path[2] = true;
    }
    
  }
  
  // check for valid x and y
  function valid(x,y){
    if(x > 0 && x <= width && y > 0 && y <= height ){
      return true;
    }
    return false;
  }
  
  // get and index of a cell in the array
  function getIndex(x, y){
    return (x + (y-1) * width)-1;
  }
  
  // generate a path from start to end using standard BFS algorithm
  function generatePath(){
    pathGenerated = true;
    pButton.position(-500, canvHeight + 20);
    cells[0].pathVisited = true;
    qu.enqueue(cells[0]);
    
    while(qu.length() > 0){
      let node = qu.dequeue();
   
      if(node.path[0] == true){
        let newnode = cells[getIndex(node.x,node.y-1)];
        if(newnode && !newnode.pathVisited){
          newnode.pathVisited = true;
          newnode.parent = node;
          qu.enqueue(newnode);
          if(newnode == cells[cells.length-1]){
            break;
          }
        }
      }
      if(node.path[1] == true && node != cells[cells.length-1]){
        let newnode = cells[getIndex(node.x+1,node.y)];
        if(newnode && !newnode.pathVisited){
          newnode.pathVisited = true;
          newnode.parent = node;
          qu.enqueue(newnode);
          if(newnode == cells[cells.length-1]){
            break;
          }
        }
      }
      if(node.path[2] == true){
        let newnode = cells[getIndex(node.x,node.y+1)];
        if(newnode && !newnode.pathVisited){
          newnode.pathVisited = true;
          newnode.parent = node;
          qu.enqueue(newnode);
          if(newnode == cells[cells.length-1]){
            break;
          }
        }
      }
      if(node.path[3] == true && node != cells[0]){
        let newnode = cells[getIndex(node.x-1,node.y)];
        if(newnode && !newnode.pathVisited){
          newnode.pathVisited = true;
          newnode.parent = node;
          qu.enqueue(newnode);
          if(newnode == cells[cells.length-1]){
            break;
          }
        }
      }
    }
    
    let curr = cells[cells.length-1];
    while(curr != cells[0]){
      if(curr.x - curr.parent.x == 1){
        curr.pathHigh[3] = true;
        curr.parent.pathHigh[1] = true;
      }
      else if(curr.x - curr.parent.x == -1){
        curr.pathHigh[1] = true;
        curr.parent.pathHigh[3] = true;      
      }
      
      if(curr.y - curr.parent.y == 1){
        curr.pathHigh[0] = true;
        curr.parent.pathHigh[2] = true;      
      }
      else if(curr.y - curr.parent.y == -1){
        curr.pathHigh[2] = true;
        curr.parent.pathHigh[0] = true;      
      }
      
      curr.pathCell = true;
      curr = curr.parent;
    }
    curr.pathCell = true;
    cells[0].pathHigh[3] = true;
    cells[cells.length-1].pathHigh[1] = true;
    
  }