var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



let h = window.innerHeight / 20;
let w = window.innerWidth / 30;
let x = window.innerWidth / 3;
let y = window.innerHeight / 4;



playArr = [];
var colArr = ["#ccd5ae", "#e9edc9", "#b7e4c7", "#faedcd", "#f4f1de"];
function init() {

    var he = window.innerHeight / 20;
    var wi = window.innerWidth / 30;
    var xc = window.innerWidth / 3;
    var yc = window.innerHeight / 4;
    for (var i = 1; i <= 100; i++) {

        c.fillStyle = colArr[i % 5];
        c.fillRect(xc, yc, wi, he);
        c.fillStyle = "black";
        c.textAlign = "center";
        c.fillText(101 - i, xc + wi / 2, yc + he);
        xc += wi;
        if (i % 10 == 0) {

            yc += he;

            wi = -wi


        }
    }



}

function createplayer() {
    playArr.push(new Player(window.innerWidth / 3, 3 * window.innerHeight / 4));
}



window.addEventListener('resize',
    function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        h = window.innerHeight / 20;
        w = window.innerWidth / 30;
        x = window.innerWidth / 3;
        y = window.innerHeight / 4;


        init();

    })



document.getElementById('start').addEventListener("click", function startGame() {

    init();
    createplayer();
    if (document.getElementById("dice").disabled) {
        location.reload();
        // startGame()

    }
});





document.getElementById('dice').addEventListener("click", function () {

    store();
    // update();
    // Player.update();
    // outcome();
});

function disable() {
    document.getElementById("dice").disabled = true;
    document.getElementById("start").innerText = "NEW GAME";
}








c.beginPath();

function Player(abs, ord) {
    this.x = abs;
    this.y = ord;

    this.draw = function () {
        init();

        c.fillStyle = "green";
        if (w > 0) {
            c.fillRect(this.x + (w) / 3, this.y - (2 * h / 3), (w) / 3, h / 3);
        }
        else {
            c.fillRect(this.x + (w) / 3, this.y - (2 * h / 3), w / 3, h / 3);

        }
        // c.fillStyle = "black";
        // c.fillRect(((window.innerWidth / 3) + Math.abs(w)), (window.innerHeight / 4) + h, w / 3, h / 3);
        // if ((this.y >= window.innerHeight / 4 + h && !(this.x == window.innerWidth / 3))) {
        //     // c.beginPath();
        //     // c.strokeStyle = "red";
        //     // c.moveTo(this.x, this.y);
        //     // c.lineTo(((Math.floor(Math.random() * 10)) * Math.abs(w)) + window.innerWidth / 3, -(Math.floor(Math.random() * 10)) * h + 3 * y);
        //     // c.stroke();
        // }
    }



    this.draw();

}



var ct = 0;
function store() {


    playArr[0].x += ((ct % 6) + 1) * w;
    ct++;


    if ((Math.floor(playArr[0].x) > Math.floor((((2 * window.innerWidth / 3)) - Math.abs(w))))) {

        playArr[0].y -= h;
        w = -Math.abs(w);
        playArr[0].x = ((2 * window.innerWidth / 3) - playArr[0].x + (2 * window.innerWidth / 3));
    }


    else if (Math.floor(playArr[0].x) < Math.floor(((window.innerWidth / 3) + Math.abs(w)))) {
        playArr[0].y -= h;
        w = Math.abs(w);
        playArr[0].x = (2 * window.innerWidth / 3) - playArr[0].x;
    }



    if (Math.floor(playArr[0].y) > Math.floor((3 * window.innerHeight / 4))) {
        playArr[0].y = (3 * window.innerHeight / 4);
    }
    else if (Math.floor(playArr[0].y) < Math.floor((window.innerHeight / 4 + h))) {
        playArr[0].y = (window.innerHeight / 4) + h;
    }



    if (((Math.floor(playArr[0].y) == Math.floor(((window.innerHeight / 4) + h))) && (Math.floor(playArr[0].x) == Math.floor(((window.innerWidth / 3) + Math.abs(w)))))) {

        c.fillStyle = "papayawhip";
        c.fillRect(window.innerWidth / 2 - window.innerWidth / 12, 3 * window.innerHeight / 4 + window.innerHeight / 20, window.innerWidth / 6, window.innerHeight / 10);

        c.fillStyle = "black";
        c.textAlign = "center";
        c.fillText("YOU WON", window.innerWidth / 2, 3 * window.innerHeight / 4 + window.innerHeight / 10);



        playArr[0].x = ((window.innerWidth / 3) + Math.abs(w));
        playArr[0].y = (window.innerHeight / 4) + h;

        playArr[0].draw();
        disable();

    }

    else if ((Math.floor(playArr[0].y) > Math.floor(window.innerHeight / 4)) && (Math.floor(playArr[0].x) > Math.floor(((window.innerWidth / 3))))) {
        playArr[0].draw();


    }




    outcome();
}


// 

var out = ["#", "#", "#", "##", "###", "###", "###",];
function outcome() {
    var outi = Math.floor(Math.random() * 256);

    if ((out[outi % out.length] === "#") && ((playArr[0].y < (3 * window.innerHeight / 4 - h)) && (playArr[0].x > ((window.innerWidth / 3) + Math.abs(w))) && (playArr[0].x < ((2 * window.innerWidth / 3) - Math.abs(w))))) {


        document.getElementById("result").innerText = "ALERT SNAKE!!";
        c.beginPath();
        c.strokeStyle = "red";
        c.moveTo(playArr[0].x + w / 3, playArr[0].y - (2 * h / 3));
        playArr[0].x -= (w);
        playArr[0].y += h;
        c.lineTo(playArr[0].x + w / 3, playArr[0].y - (2 * h / 3));
        playArr[0].draw();
        c.stroke();
        w = -w;

    }
    else if ((out[outi % out.length] === "##") && ((playArr[0].y > (window.innerHeight / 4 + 2 * h)) && (playArr[0].x > ((window.innerWidth / 3) + Math.abs(w))) && (playArr[0].x < ((2 * window.innerWidth / 3) - Math.abs(w))))) {

        document.getElementById("result").innerText = "YAY!! LADDER";
        c.beginPath();
        c.strokeStyle = "black";
        c.moveTo(playArr[0].x + w / 3, playArr[0].y - (2 * h / 3));
        playArr[0].x += (w);
        playArr[0].y -= h;
        c.lineTo(playArr[0].x + w / 3, playArr[0].y - (2 * h / 3));
        playArr[0].draw();
        c.stroke();
        w = -w;

    }


    else {
        document.getElementById("result").innerText = "PHEW!";

    }

}
