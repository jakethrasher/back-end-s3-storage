const form = document.querySelector('form');
const fileField = document.querySelector('input[type="file"]');
import {renderData} from './api-utils.js'

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    formData.append('image',fileField.files[0],'image')
  
    const endpoint = 'http://localhost:7890/api/v1/upload'

    const options = {
        method: 'POST',
        body:formData,
    };
      
    fetch(endpoint,options)
    .then((response)=>response.json())
    .then((data)=>renderData(data))
    

});