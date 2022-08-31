console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", () => {
    fetchImage()
    fetchBreed()
    const selector = document.querySelector("#breed-dropdown")
    selector.setAttribute("onChange","dropDown()")
  });
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const breedList =[]
// image
function fetchImage(){
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => renderImages(data))
}
function renderImages(images){
    console.log(images)
    const dogContainer = document.getElementById('dog-image-container')
    images.message.forEach(images => {
        let img = document.createElement('img');
        let string = images.split("/")
        breedList.push(string[4])
        img.src = images
        dogContainer.appendChild(img)
    })
}


//dog breeds
let breedFullList = []
let numBreeds = 0
function fetchBreed(){
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => renderBreeds(data))
}
function renderBreeds(breeds){
    const breedContainer = document.getElementById('dog-breeds')
    for (const breedMain in breeds.message){
        //getting key from breeds which is the main breed of dogs
        if (breeds.message[breedMain].length <= 0)
        {
            // this if checks if there is an array attached to obj
            // if empty just adds main breed to the list
            //console.log(breedMain)
            
            let li = document.createElement('li');
            li.innerHTML = `${breedMain}`
            li.setAttribute("id",numBreeds)
            breedContainer.appendChild(li)
            breedFullList.push(`${breedMain}`)
            li.setAttribute("onclick",`textColor(${numBreeds})`)
            numBreeds +=1
        }
        else{
            // if obj has array adding each value to main breed to get full breed
        breeds.message[breedMain].forEach(breed =>{
            //console.log(`${breedMain} ${breed}`)
            
            let li = document.createElement('li');
            li.innerHTML = `${breedMain} ${breed}`
            li.setAttribute("id",numBreeds)
            breedContainer.appendChild(li)
            breedFullList.push(`${breedMain} ${breed}`)
            li.setAttribute("onclick",`textColor(${numBreeds})`)
            numBreeds +=1
        })
        }   
    }
}
function textColor(id){
    let li = document.getElementById(id)
    //li.style.color = 'red'
    if (li.style.color == 'red')
    {
        li.style.color = 'black'
    }
    else
    {
        li.style.color = 'red'
    }
}

//breed dropdown

function dropDown(){
    let selected = document.querySelector("#breed-dropdown")
    let letter = selected.options[selected.selectedIndex].value
    breedFullList.forEach(breed =>{
        if (letter == breed[0]){
            //console.log(breed)
            document.getElementById(`${breedFullList.indexOf(`${breed}`)}`).removeAttribute("hidden")
        }
        else{
            document.getElementById(`${breedFullList.indexOf(`${breed}`)}`).setAttribute("hidden","true")
            //console.log(document.getElementById(`${breedFullList.indexOf(`${breed}`)}`))
        
        }
    })
}