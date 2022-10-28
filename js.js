// global variables
const Input = document.querySelector('.conInput');
const conContent = document.querySelector('.conUL');

console.log('js.js loaded');

// location / interior template: {name:'', img:'', look:''}
const npcs = [{name:'Lydia', img:'Lydia.png', position:{scale:'0.7',marginTop:'-30%',marginLeft:'39%'}}]
const interiors = [{name:'cave', img:'cave.jpg', npc:[npcs[0]], look:'the caves surface is covered in rocky bumps'},
                    {name:'inn', img:'inn.jpg', look:'the inn is mildly crowded'},
                    {name:'shop', img:'shop.jpg', look:'many wares fill up the walls'}];

const locations = [{name:'mountain', img:'mountain.jpg', subLocation:[interiors[0]], look:'Before you lies a vast fog filled mountain range in the distance you spy a CAVE further down the hills you see the faint outline of a CITY'},
                    {name:'city', img:'city.jpg', subLocation: [interiors[1],interiors[2]], look:'on the side of a mountain you see a grand city of stone walls getting closer you spy an INN and a SHOP turning around you can just see the peak of the great MOUNTAIN where you once stood'}
                    ]


let curLocation = locations[0];
let curInterior = 'outside'


// posts text to console
const template = text => {

const html = `<li class="vis"><p>${text}</p></li>`;

    conContent.innerHTML += html

};

const space = text => {

    const html = `<li class="space"><p>${text}</p></li>`;
    
        conContent.innerHTML += html
    
    };

// moves location in game
function moveTo(text) {
    let integrity = 0

    if(curInterior=='outside'){
    for(let i=0; i!=locations.length; i++){
        if(text.indexOf(locations[i].name) > -1){
            document.querySelector('body').style.backgroundImage="url(img/location/" + locations[i].img +")";
            curLocation = locations[i]
            template(text);
            integrity++
            break;
        }
    }
} else {
    template('You first need to exit the interior')
    integrity++
}
    if(text.length == 6){
        template('no location specified')
    } else if (integrity == 0){
        template('invalid location')
    }
    }
    
    // moves interior in game
    function enter(text) {
        let integrity = 0

        if(curLocation.subLocation.length > -1){          
                for(let i=0; i!=interiors.length; i++){
                    if(text.indexOf(interiors[i].name) > -1){
                        document.querySelector('body').style.backgroundImage="url(img/location/" + interiors[i].img +")";
                        curInterior = interiors[i];
                        integrity++
                        break
                    }
                }
            } 
        
            if (text.length == 5){
            template('no interior specified')
        } else if(integrity == 0) {
            template('invalid interior')
        }
    }

    // talks to npc,s in game
    function talkTo() {
        if(curInterior !== 'outside'){
            if(curInterior.npc.length > 0){
                document.querySelector('img').src = 'img/npc/' + curInterior.npc[0].img
                //document.querySelector('img')
                //document.querySelector('img').style.marginTop=-30%
                //document.querySelector('img').style.marginLeft=39%;
            }
        }
    }


// input reader AKA core console functionality
Input.addEventListener('submit', e => {

    // prevents site reload / function variables
    e.preventDefault();
    const text = Input.read.value;

    // checks for commands in text input / calls functions
    if (text.indexOf('moveto') === 0 && text.indexOf('moveto') > -1){
        moveTo(text);

     } else if (text.indexOf('look') === 0 && text.indexOf('look') > -1){
        if(curInterior == 'outside'){
            template(curLocation.look)
        } else {
            template(curInterior.look)
        }

     } else if (text.indexOf('location') === 0 && text.indexOf('location') > -1){
        template('location: '+curLocation.name);

     } else if (text.indexOf('clear') === 0 && text.indexOf('clear') > -1){
        conContent.innerHTML = '';
        
     } else if (text.indexOf('help') === 0 && text.indexOf('help' > -1)) {
        space('.')
        template('Commands:')
        template('clear - empties the console')
        template('location - tells you your current position')
        template('look - gives you a description of your surroundings')
        template('moveto [location] - lets you wander from location to location')
        template('enter [sublocation] - lets you enter a location inside another location a sublocation')
        template('exit - lets you exit a sublocation back to your previous location')
        space('.')

     } else if (text.indexOf('enter') === 0 && text.indexOf('enter') > -1) {
        enter(text); 

     } else if (text.indexOf('exit') === 0 && text.indexOf('exit') > -1){
        curInterior = 'outside'

        document.querySelector('body').style.backgroundImage="url(img/location/" + curLocation.img +")";
     } else if(text.indexOf('talk') === 0 && text.indexOf('talk') > -1){
        talkTo()
     } else {
        template('"'+text+'" is not a valid command');

     }

    // empties input field / scrolls to bottom of console
    Input.read.value = "";
    conContent.scrollTop = conContent.scrollHeight
});
