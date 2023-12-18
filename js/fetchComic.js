var maxComic=-1;
var currentComic=-1;

//Fetchar senaste comic vid onload
window.onload=function(){
getComic('latest')


//Knappar
let firstButton=document.getElementById('forsta');
let prevButton=document.getElementById('forra');
let randomButton=document.getElementById('slumpa');
let nextButton=document.getElementById('nasta');
let lastButton=document.getElementById('sista');

//Första-knapp
firstButton.addEventListener('click', function(){
    if(currentComic!=1){
        getComic('1');
    }
    
});

//Förra-knapp
prevButton.addEventListener('click', function(){
    if(currentComic>1){
        currentComic=currentComic-1;
        getComic(currentComic.toString());
    }
    
});

//Random-knapp
randomButton.addEventListener('click', function(){
    getComic(Math.floor(Math.random()*maxComic)+1);
});

//Nästa-knapp
nextButton.addEventListener('click', function(){
    if(currentComic<maxComic){
        currentComic=currentComic+1;
        getComic(currentComic.toString());
    }
    
});

//Sista-knapp
lastButton.addEventListener('click', function(){
    if(currentComic!=maxComic){
    getComic('latest');
    }
});

}

//Funktion för att hämta en given comic från api
function getComic(which){
    fetch('https://xkcd.vercel.app/?comic='+which)
    .then (function(response){
        if(response.status==200){
            return response.json();
        }
    })
    .then(function(data){
        //Uppdaterar max comic om det finns en högre siffra
        if(maxComic<data.num){
            maxComic=data.num;
        }
        //Skickar vidare json-objektet
        appendComic(data);
    })
}

function appendComic(data){
    //Hämtar och tömmer main comic
    let mainComic=document.getElementById('mainComic');
    mainComic.innerHTML="";

    //Titel
    let titel=document.createElement('h2');
    titel.innerHTML=data.title;

    mainComic.appendChild(titel);

    //Datum
    const { year, month, day } = data; // Assuming data has year, month, and day properties
    const date = document.createElement('p');
    date.textContent = new Date(year, month - 1, day).toLocaleDateString('fi-FI');
    date.id = 'datum';
    mainComic.appendChild(date);

    //Bild i en figure
    let comicPic=document.createElement('figure');
    
    let image=document.createElement('img');
    image.src=data.img;

    //Caption
    let caption = document.createElement('figcaption');
    caption.innerHTML = 'Comic Number: '+ data.num;

    //Appendar in i main comic
    comicPic.appendChild(image);
    comicPic.appendChild(caption);

    mainComic.appendChild(comicPic);

    //Uppdaterar nuvarande nummer på comic
    currentComic=data.num;

   // console.log(data);
}
