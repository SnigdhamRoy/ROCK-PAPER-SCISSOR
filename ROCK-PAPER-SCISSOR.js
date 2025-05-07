let usrMove = '', cMove = '';
    let score = JSON.parse(
        localStorage.getItem('score')) || {
            wins: 0,
            losses: 0,
            ties: 0
        };
let auto = false;
    console.log(score);

    document.querySelector('.rock').addEventListener
    ('click', () => {update(compare(1)); });

    document.querySelector('.paper').addEventListener
    ('click', () => {update(compare(2)); });

    document.querySelector('.scsor').addEventListener
    ('click', () => {update(compare(3)); });

    document.body.addEventListener('keydown', event => {
        let key = event.key;
        if(key === 'r' || key === 1)
            update(compare(1));
        if(key === 'p' || key === 2)
            update(compare(2));
        if(key === 's' || key === 3)
            update(compare(3));
    })

    function compare(usr){
        let rand = Math.random();
        let res = '';
        if(rand <= 1/3){
            rand = 1; cMove = 'rock';}
        else if(rand > 1/3 && rand <= 2/3)
            { rand = 2; cMove = 'paper';}
        else{
            rand = 3; cMove = 'scissor';} 
        if(usr === 1) usrMove = 'rock';
        if(usr === 2) usrMove = 'paper';
        if(usr === 3) usrMove = 'scissor';
        if(usr === 3 && rand === 1){
            usrMove = 'scissor';
            res = 'Computer Wins'; 
            score.losses++;
            return res;
        }                    
        else if(usr === 1 && rand === 3){
            usrMove = 'rock';
            res = 'You Win'; 
            score.wins++; 
            return res;
        }
        else if(usr > rand){
            res = 'You Win'; 
            score.wins++;
            return res;
        }
        else if(usr === rand){
            res = 'Tie'; 
            score.ties++;
            return res;
        }
        else{ 
            res = 'Computer Wins'; 
            score.losses++;
            return res;
        }
    }
    
    function update(res){
        localStorage.setItem('score',JSON.stringify(score));
        document.querySelector('.result').innerHTML = 
            `${res}`;
        document.querySelector('.moves').innerHTML = 
            `You <img class = "move-icon" 
                src = "images/${usrMove}.jpg">  
            <img class = "move-icon" 
                src = "images/${cMove}.jpg"> Computer`;
        document.querySelector('.scores').innerHTML = 
            `Wins: ${score.wins}, Losses: ${score.losses}, 
            Ties: ${score.ties}`;
        console.clear();
        console.log(score);
    }

    document.querySelector('.reset')
    .addEventListener('click', () => { reset(); });
    document.body.addEventListener
    ('keydown', event => { 
        if(event.key === 'Backspace') reset(); });

    document.querySelector('.autoplay')
    .addEventListener('click', () => { autoplay(); });
    document.body.addEventListener
        ('keydown', event => { 
            if(event.key === 'A' || event.key === 'a')
                autoplay(); 
        });
    
    function reset(){
        html = `Are you sure to reset ? 
            <button id = "yes"> Yes </button>
            <button id = "no"> No </button>`;
        document.querySelector('.confirm').innerHTML = html;
        document.getElementById('yes').addEventListener
        ('click', () => {
            document.querySelector('.result').innerHTML = 
            document.querySelector('.moves').innerHTML = 
            document.querySelector('.scores').innerHTML = '';
            score.wins = 0;
            score.losses = 0;
            score.ties = 0;
            usrMove = cMove = '';
            localStorage.removeItem('score');
            console.clear();
            console.log(score);
            document.querySelector('.confirm').innerHTML = '';
            auto = true; autoplay();
        });
        document.getElementById('no').addEventListener
        ('click', () => {
            document.querySelector('.confirm').innerHTML = '';
        });
    }

let intervalId;
    function autoplay(){
        if(!auto){
            document.querySelector('.autoplay').innerHTML = 
                    'starting..';
            intervalId = setInterval(function(){
                document.querySelector('.autoplay').innerHTML = 
                `Stop`;
                let rand2 = Math.random();
                if(rand2 <= 1/3) rand2 = 1; 
                else if(rand2 > 1/3 && rand2 <= 2/3)
                    rand2 = 2; 
                else rand2 = 3; 
                update(compare(rand2));
            }, 2000);                
            auto = true;
        }
        else {
            clearInterval(intervalId);
            document.querySelector('.autoplay')
                .innerHTML = `Auto play`;
            auto = false;
        }
        
    }