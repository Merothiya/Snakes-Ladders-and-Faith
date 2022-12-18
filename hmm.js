var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;




var h = window.innerHeight / 20;
var w = window.innerWidth / 30;
var x = window.innerWidth / 3;
var y = window.innerHeight / 4;



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
            // var x = window.innerWidth / 3;
            yc += he;
            // x = window.innerWidth - x;
            wi = -wi


        }
    }
    
    // Player.draw();

}

function createplayer(){
playArr.push(new Player(x, 3*y));
}



window.addEventListener('resize',
    function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        init();
        // update();
        // store();

    })

// init();

document.getElementById('start').addEventListener("click", function startGame() {
    // new createPlayer(x, 3 * y - h / 3);
    // console.log(player);
    init();
    createplayer();
});
// console.log(s);

// update(){

// }




document.getElementById('dice').addEventListener("click", function () {
    // console.log("yahan se random number niklega ek <= 6");
    store();
    // update();
    // Player.update();
});


// canvas.y = y;

// c.translate(x, y);
// console.log(c);
// c.font = "Comic Sans MS";


// c.fillStyle = "red";
// c.fillRect(x + w, y, w, h);
// console.log(Event);









function Player(abs, ord) {
    this.x = abs;
    this.y = ord;

    this.draw = function () {
        init();
        c.fillStyle = "red";
        c.fillRect(this.x + w / 3, this.y - (2 * h / 3), w / 3, h / 3);
    }

    

    this.draw();
    // console.log(playArr[0]);
}






//
// //
function store() {
    // = Player();
    // update();
    // playArr[0].update();
    // playArr[0].draw();
    playArr[0].x +=   (Math.floor(Math.random() * 6) + 1 )* w;
    if(playArr[0].x>(2*window.innerWidth/3)-w){ 
        w=-w;
        playArr[0].y -=h;

        playArr[0].x-=playArr[0].x-(2*window.innerWidth/3);
    }
    else if(playArr[0].x<=((window.innerWidth/3))){ 
        w=-w;

        playArr[0].y -=h;

       playArr[0].x=window.innerWidth/3+((window.innerWidth/3)-playArr[0].x);
    }
    if(playArr[0].y<window.innerHeight/4+h){
        
        c.fillStyle = "papayawhip";
        c.fillRect(window.innerWidth/2-window.innerWidth/12,3*window.innerHeight/4+window.innerHeight/20,window.innerWidth/6,window.innerHeight/10);
        // c.font="40px";
        c.fillStyle = "black";
        c.textAlign = "center";
        c.fillText("YOU WON",window.innerWidth/2,3*window.innerHeight/4+window.innerHeight/10);
    }
    
        // +=   (Math.floor(Math.random() * 6) + 1)*h;
        if(!(playArr[0].y<window.innerHeight/4+h)){
        playArr[0].draw();
        }

    console.log(playArr[0]);
}
    // 



