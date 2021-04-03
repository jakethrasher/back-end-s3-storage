export function renderData (data) {
    const ul = document.querySelector('ul');
    
       const li = document.createElement('li');
    
       const img = document.createElement('img');
       img.src = data.image

       const h4 = document.createElement('h4');
       h4.textContent = data.fullName
       
       const p = document.createElement('p');
       p.textContent = `Associated acts: ${data.associatedActs}`

       ul.append(li, img, h4, p)
}
