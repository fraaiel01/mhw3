function onJson1(json) {
    console.log(json);
    const ris = document.querySelector('#Risposta1');
    ris.innerHTML = '';
    const immagine = document.createElement('img');
    immagine.src=json.url;
    ris.appendChild(immagine);
    
    }
  
function onResponse1(response) {
  console.log('Risposta ricevuta');
  return response.json();
  }


function cerca1(event){
event.preventDefault();
const rest_url = 'https://random-d.uk/api/random';
console.log('URL: ' + rest_url);
fetch(rest_url).then(onResponse1).then(onJson1);
}




function onJson2(json) {
  console.log(json);
  const library = document.querySelector('#sezione_spotify');
  library.innerHTML = '';
  const results = json.tracks.items;
  let n_ris = results.length;

  if(n_ris > 1)
    n_ris = 1;

  for(let i=0; i<n_ris; i++)
  {
    const track_data = results[i];
    const title = track_data.name;
    const selected_image = json.tracks.items[i].album.images[i].url;
    
    const canzone = document.createElement('div');
    canzone.classList.add('canzone');
    const img = document.createElement('img');
    img.src = selected_image;

    const tit = document.createElement('span');
    tit.textContent = title;

    canzone.appendChild(img);
    canzone.appendChild(tit);
    library.appendChild(canzone);
  }
}

function onResponse2(response) {
  console.log('Risposta ricevuta');
  return response.json();
}

function cerca2(event)
{
  event.preventDefault();
  const track_input = document.querySelector('#inserimento');
  const track_value = encodeURIComponent(track_input.value);
  console.log('Eseguo ricerca: ' + track_value);
  fetch("https://api.spotify.com/v1/search?type=track&q=" + track_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse2).then(onJson2);
}

function onTokenJson(json)
{
  console.log(json)
  token = json.access_token;
}

function onTokenResponse(response)
{
  return response.json();
}


const client_id = 'd4c860fba30d49e5ad6cce24a046379b';
const client_secret = '5174c572bd624d8588ce342797b766a4';
let token;

fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);

const api_key='';

const form1 = document.querySelector('#form1');
form1.addEventListener('submit', cerca1);

const form2 = document.querySelector('#form2');
form2.addEventListener('submit', cerca2)


