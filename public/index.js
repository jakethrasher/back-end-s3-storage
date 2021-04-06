const form = document.querySelector('form');
const fileField = document.querySelector('input[type="file"]');
import {renderData} from './renderData.js'
const ul = document.querySelector('ul');
const endpoint = 'https://fast-wave-43828.herokuapp.com/api/v1/upload'

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    formData.append('image',fileField.files[0],'image')
  
    const options = {
        method: 'POST',
        body:formData,
    };
      
    fetch(endpoint,options)
    .then((response)=>response.json())
    .then((data)=>ul.append(renderData(data)))
    
});

fetch(endpoint)
    .then(response=>response.json())
    .then(data=>data.forEach(data=>ul.append(renderData(data))))