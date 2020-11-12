const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
    charactersAPI.getFullList()
    .then((response) => {
      console.log(response);
      const characters = response.data;
      document.querySelector('.characters-container').innerHTML = '';
      characters.forEach(character => {
        document.querySelector('.characters-container').innerHTML += ` 
        <div class="character-info">
        <div class="name">Name: ${character.name} </div>
        <div class="occupation">Occupation: ${character.occupation} </div>
        <div class="cartoon">Cartoon: ${character.cartoon}?</div>
        <div class="weapon"> Weapon: ${character.weapon}</div>
      </div> `
      });

    }).catch((error) => {
      console.log(error);
    })
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const id =  document.getElementById('fetch-one-char').value;
    
    charactersAPI.getOneRegister(id)
    .then((response) => {
      const character = response.data;
      document.querySelector('.characters-container').innerHTML = 
    `<div class="character-info">
    <div class="name">Name: ${character.name} </div>
    <div class="occupation">Occupation: ${character.occupation} </div>
    <div class="cartoon">Cartoon: ${character.cartoon}?</div>
    <div class="weapon"> Weapon: ${character.weapon}</div>
  </div> `

  });
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
      const id = document.getElementById('character-id-delete').value;
      console.log('deleting a character');
      const toDelete = confirm('Are you sure you want to delete?');
      if (toDelete) { //toDelete === true
        charactersAPI.deleteOneRegister(id);
        //getFullList();   //????
          }
      }
  );


  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
      //updateOneRegister
      console.log('updating a character');
    //document.getElementById('update-form-div').style.display = 'block';
    const id =  document.getElementById('update-id-input').value;
    const updatedCharacter = {
      id: document.getElementById('update-id-input').value,
      name: document.getElementById('update-name-input').value,
      occupation: document.getElementById('update-occupation-input').value,
      weapon: document.getElementById('update-weapon-input').value,
      cartoon: document.getElementById('update-cartoon-input').checked
    }   

    charactersAPI.updateOneRegister(id, updatedCharacter);
     });




  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    
   
      event.preventDefault(); // <= !!! Prevent the refresh
      console.log('form submit');
      const name = document.getElementById('name-input').value;
      const occupation = document.getElementById('occupation-input').value;
      const weapon = document.getElementById('weapon-input').value;
      const cartoon = document.getElementById('cartoon-input').checked;
       
      const newCharacterInfo = {
        name,
        occupation,
        weapon,
        cartoon
      };
      console.log('New character: ', newCharacterInfo);
      charactersAPI.createOneRegister(newCharacterInfo);
    });
    });
   

 /*

const apiUrl = 'http://localhost:8000/characters';
const getCharacters = () => {
    axios
        .get(apiUrl)
        .then((response) => {
            console.log('response from api', response);
            const data = response.data;
            let listItems = '';
            data.forEach(character => {
                listItems += `
                <li class="list-group-item">
                    ID: ${character.id} - ${character.name}
                    <span class="float-right">
                        <button class="btn btn-danger" onclick="deleteCharacter(${character.id})">Delete</button>
                        <button class="btn btn-success" onclick="updateCharacter(${character.id})">Update</button>
                    </span>
                </li>
               ` 
            });
            document.getElementById('characters-list').innerHTML = listItems;
        });
}
document.getElementById('new-character-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name-input').value;
    const occupation = document.getElementById('occupation-input').value;
    const weapon = document.getElementById('weapon-input').value;
    const cartoon = document.getElementById('cartoon-input').checked;
    const newCharacter = {
        name,
        occupation,
        weapon,
        cartoon
    }
    console.log('new character', newCharacter);
    axios
        .post(apiUrl, newCharacter)
        .then(() => {
            getCharacters();
            document.getElementById('new-character-form').reset();
        })
        .catch((error) => {
            console.log('error occurred while posting a new character', error);
        })
});
const deleteCharacter = (id) => {
    console.log('deleting a character');
    const toDelete = confirm('Are you sure you want to delete?');
    if (toDelete) { //toDelete === true
        axios
        .delete(`${apiUrl}/${id}`) //http://localhost:8000/4
        .then(() => {
            getCharacters();
        })
    }
};
const updateCharacter = (id) => {
    console.log('updating a character');
    document.getElementById('update-form-div').style.display = 'block';
    axios
        .get(`${apiUrl}/${id}`)
        .then((response) => {
            const { id, name, occupation, weapon, cartoon } = response.data;
            document.getElementById('update-id-input').value = id;
            document.getElementById('update-name-input').value = name;
            document.getElementById('update-occupation-input').value = occupation;
            document.getElementById('update-weapon-input').value = weapon;
            document.getElementById('update-cartoon-input').checked = cartoon;
        });
}
document.getElementById('update-character-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const updatedCharacter = {
        name: document.getElementById('update-name-input').value,
        occupation: document.getElementById('update-occupation-input').value,
        weapon: document.getElementById('update-weapon-input').value,
        cartoon: document.getElementById('update-cartoon-input').checked
    }
    const characterId = document.getElementById('update-id-input').value;
    axios
        .put(`${apiUrl}/${characterId}`, updatedCharacter)
        .then(() => {
            getCharacters();
            document.getElementById('update-character-form').reset();
            document.getElementById('update-form-div').style.display = 'none';
        })
});
// call function when the page finishes loading
getCharacters();



 */