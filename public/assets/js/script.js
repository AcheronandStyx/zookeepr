const $animalForm = document.querySelector('#animal-form');

const handleAnimalFormSubmit = event => {
  event.preventDefault();

  // get animal data and organize it
  const name = $animalForm.querySelector('[name="animal-name"]').value;
  const species = $animalForm.querySelector('[name="species"]').value;
  const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
  let diet;

  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      diet = dietRadioHTML[i].value;
    }
  }

  if (diet === undefined) {
    diet = '';
  }

  const selectedTraits = $animalForm.querySelector('[name="personality"').selectedOptions;
  const personalityTraits = [];
  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraits.push(selectedTraits[i].value);
  }
  const animalObject = { name, species, diet, personalityTraits };


  // gathers the user entered data into an object and passes it to the backend
  fetch('/api/animals', { // ecause the request is coming from the server, we don't have to specify the full URL.
    method: 'POST',
    headers: { // set the headers property to inform the request that this is going to be JSON dat
      Accept: 'application/json',
      'Content-Type': 'application/josn'
    },
    body: JSON.stringify(animalObject)
  })
  .then(response => {
    if (respomse.ok) {
      return response.json();
    }
    alert('Error: ' + response.statusText);
  })
  .then(postresponse => {
    console.log(postResponse);
    alert('Thank you for adding an animal!');
  });

};

$animalForm.addEventListener('submit', handleAnimalFormSubmit);
