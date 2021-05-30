const input = document.querySelector('.addItems-input')
const groceryList = document.querySelector('.grocery-list')
const addItem = document.querySelector('.addItems-submit')
const clear = document.querySelector('.displayItems-clear')

addItem.addEventListener('click', addToList) //dont add () because it will call function
document.addEventListener('DOMContentLoaded', displayStorage) //this loads all content on page load


function addToList(event) {
    event.preventDefault()
    if (input.value === ``) {
        console.log(`Please Enter a Value`);
    } else {
        let newItem = input.value
        createItem(newItem)
        //update LS
        updateStorage(newItem)
    }
    input.value = ``
}

function createItem(newItem) {
    let parent = document.createElement('div')
    parent.classList.add('grocery-item')

    parent.innerHTML = `<h4 class="grocery-item__title">${newItem}</h4>
    <a href="#" class="grocery-item__link">
        <i class="far fa-trash-alt"></i>
   </a>`

    groceryList.appendChild(parent)

    //console.log(parent);
}

//Clear all items
clear.addEventListener('click', e => {
    e.preventDefault()
    let items = document.querySelectorAll('.grocery-item');
    items.forEach(item => {
        groceryList.removeChild(item)
    });
})

//delete single item
groceryList.addEventListener('click', e => {
    e.preventDefault()
    let itemLink = e.target.parentElement
    //let textToRemove = itemLink.previousElementSibling.textContent;
    console.log(textToRemove);
    if (itemLink.classList.contains('grocery-item__link')) {
        let itemToRemove = e.target.parentElement.parentElement
        groceryList.removeChild(itemToRemove)
        //editStorage(textToRemove)
    }

})

function updateStorage(newItem) {
    let groceryList
    groceryList = localStorage.getItem('groceryList') ? JSON.parse(localStorage.getItem('groceryList')) : []

    groceryList.push(newItem)
    localStorage.setItem('groceryList', JSON.stringify(groceryList))
}

function displayStorage() {
    let exists = localStorage.getItem('groceryList')

    if (exists) {
        let storageItems = JSON.parse(localStorage.getItem('groceryList'))
        storageItems.forEach(item => (
            createItem(item)
        ))
    }
}

function editStorage(item) {
    let groceryItems = JSON.parse(localStorage.getItem('groceryList'))
    let index = groceryList.indexOf(item)

    groceryList.splice(index, 1)
    localStorage.removeItem('groceryList')
    localStorage.setItem('groceryList', JSON.stringify(groceryItems))
}


