"use strict"

let labyrinth = [

    ['#','#','#','#','#','#','#','#','#'],
  
    ['#','+','+','+','#','+','+','+','#'],
  
    ['#','+','#','+','#','+','#','+','#'],
  
    ['+','+','#','+','0','+','#','+','#'],
  
    ['#','#','#','+','#','#','#','#','#'],
  
    ['#','#','+','+','#','#','#','#','#'],
  
    ['#','#','+','#','#','#','#','#','#'],
  
    ['#','#','#','#','#','#','#','#','#'],
  
  ];
  

    
  console.log(labyrinth);
  
    //start properties 
  let goodStepsCoords = [];
  let way = [];
  let startPos = {x: 4, y: 3};
  let endPos = {x: 0, y: 3};
  let result;

// push to arr start position for the next calculation
  goodStepsCoords.push(startPos);

// this function will only select the correct path
function checkPath(start, end) {
    // set start position like checked
    labyrinth[start.y][start.x] = 3;

    let siblings = getValidSib(start);

    if (siblings.length > 0) {
        for (let i = 0; i < siblings.length; i++) {
            let current = siblings[i];
            let isSolved = current.x === end.x && current.y === end.y;
            let notVisited = labyrinth[current.y][current.x] !== 3;
            
            // push to arr correct steps
            if (notVisited) {
                goodStepsCoords.push({x: current.x, y: current.y});
            }

            // return true if labyrinth find a path between start and end
            if (isSolved || (notVisited && checkPath(current, end)) ) {
                // goodStepsCoords.push({x: current.x, y: current.y});
                result = true;
                return true;
            }

        }
    }
    // if the labyrinth doesn't have a passageway it will return false
    result = false;
    return false;
}

// this function sets the boundaries of the labyrinth and determines the desired symbol '+' for the passage
function getValidSib(coord) {
    let {x, y} = coord;

    let coords = [];

    if (labyrinth[y-1] !== undefined) {
        coords.push({x: x, y: y-1, val: labyrinth[y-1][x]});
    }

    if (labyrinth[y+1] !== undefined) {
        coords.push({x: x, y: y+1, val: labyrinth[y+1][x]});
    }

    if (labyrinth[y][x-1] !== undefined) {
        coords.push({x: x-1, y: y, val: labyrinth[y][x-1]});
    }

    if (labyrinth[y][x+1] !== undefined) {
        coords.push({x: x+1, y: y, val: labyrinth[y][x+1]});
    }

    return coords.filter(el => el.val ==='+');
}

setTimeout( function(){
    console.log(checkPath(startPos, endPos));
    }, 0 );
// console.log(checkPath({x:4, y:3}, {x:0, y:3}));
// setTimeout(checkPath, 0, {x:4, y:3}, {x:0, y:3});

// this function converts the step coordinates to 'up', 'right', 'down', 'left'
function wayElems(arr) {
    for (let k = 0; k < goodStepsCoords.length; k++) {
        if (goodStepsCoords[k+1] !== undefined) {
            if(goodStepsCoords[k].x < goodStepsCoords[k+1].x) {
                arr.push('right');
            }
            if(goodStepsCoords[k].x > goodStepsCoords[k+1].x) {
                arr.push('left');
            }
            if(goodStepsCoords[k].y < goodStepsCoords[k+1].y) {
                arr.push('down');
            }
            if(goodStepsCoords[k].y > goodStepsCoords[k+1].y) {
                arr.push('up');
            }
        }
    }
}
setTimeout(wayElems, 1, way);

// wayElems(way);
console.log(goodStepsCoords);
setTimeout(console.log(way), 2);
 


function addList() {
    let str = '';
    str += '<table id="table">'+'<tbody>';
    for (let i = 0; i < labyrinth.length; i++) {
        str += '<tr>'; 
            for (let j = 0; j < labyrinth[i].length; j++) {
                if(labyrinth[i][j] == labyrinth[startPos.y][startPos.x]) {
                    str += '<td style="color: crimson; text-shadow: 2px 2px 3px white;">' + labyrinth[i][j] + '</td>';
                } else if (labyrinth[i][j] == labyrinth[endPos.y][endPos.x]) {
                    str += '<td style="color: white; text-shadow: 2px 2px 3px black;">' + labyrinth[i][j] + '</td>';
                }
                else {
                    str += '<td style="color: black;">' + labyrinth[i][j] + '</td>';
                }
            }
        str +='</tr>';
    }
    str += '</tbody>' + '</table>';
    const myLab = document.getElementById('myLab');
    myLab.innerHTML = str;

    }

function showPath() {
    let str1 = '';
    for (let n = 0; n < way.length; n++) {
        if (n == 0) {
            str1 += '(START)' + way[n].toUpperCase() + ' -> ';
        } else if (n < way.length - 1) {
            str1 += way[n].toUpperCase() + ' -> ';
        } else {str1 += way[n].toUpperCase() + '(FINISH)'}    
    }
    
    const currentLab = document.getElementById('currentLab');
    currentLab.innerHTML = 'Solved labyrinth:';
    let tab = document.getElementById('table');

    const path = document.getElementById('path');
    if ( result == true) {
        path.innerHTML = str1;
    } else {
        path.innerHTML = 'Path not found';
        tab.style.backgroundColor = 'rgba(70, 70, 70, 0.5)';
        tab.style.boxShadow = '0 0 30px red';
        tab.style.borderRadius = '10px';
    }
    // } else {
    //     path.innerHTML = 'Path not found';
    //     console.log(checkPath(startPos, endPos) + 'FALSE');
    // }
}


 
