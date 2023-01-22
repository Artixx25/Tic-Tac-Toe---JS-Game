const area = document.getElementById('area');
const cell = document.getElementsByClassName('cell')
const currentPlayer = document.getElementById('curPlyr')

let player = "×";
const winCombo = [
    [1,2,3], [4,5,6],
    [7,8,9], [1,4,7],
    [2,5,8], [3,6,9],
    [1,5,9], [3,5,7]
]
const statistic = {
    'x': 0,
    'o': 0,
    'd': 0
}

for(let i = 1; i <= 9; i++) {
    area.innerHTML += "<div class='cell' pos=" + i + ">"
}

for (let i = 0; i < cell.length; i++) {
    cell[i].addEventListener("click", cellClick, false)
}

function cellClick() {
    let data = []
    if(!this.innerHTML) {
        this.innerHTML = player;
            if(this.innerHTML === '×') {
                this.classList.add("x-class")
            } else {
                this.classList.add("o-class")
            }
    } else {
        return
    }
    for(let ind of cell) {
        if(ind.innerHTML == player) {
            data.push(parseInt(ind.getAttribute('pos')));
        }
    }

    if(checkW(data)) {
        statistic[player] += 1;
        restart("Win: " + player);
    } else {
        let draw = true;
        for(let ind of cell) {
            if(ind.innerHTML === '') draw = false;
        }
        if(draw) {
            statistic.d += 1;
            restart("draw");
        }
    }
    player = player == "×" ? "o" : "×";
    currentPlayer.innerHTML = player
}

function checkW(data) {
    for (let indx of winCombo) {
        let win = true;
        for(let j of indx) {
            let id = j;
            let indOf = data.indexOf(id);

            if (indOf == -1) {
                win = false
            }
        }
        if(win) return true;
    }
    return false;
}

function restart(text) {
    swal(text, "Good job!");
    for (let i = 0; i < cell.length; i++) {
        cell[i].innerHTML = '';
        cell[i].classList.remove('x-class', 'o-class')
    }
    updateStatistic()
}

function updateStatistic() {
    document.getElementById('sX').innerHTML = statistic.x;
    document.getElementById('sO').innerHTML = statistic.o;
    document.getElementById('sD').innerHTML = statistic.d;
}