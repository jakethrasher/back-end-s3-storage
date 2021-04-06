export function renderData (data) {
    
    
       const li = document.createElement('li');
    
       const img = document.createElement('img');
       img.src = data.image
       li.append(img)
       
       const h4 = document.createElement('h4');
       h4.textContent = data.fullName
       li.append(h4)
       
       const p = document.createElement('p');
       p.textContent = `Associated acts: ${data.associatedActs}`
       li.append(p)

       return li
}
