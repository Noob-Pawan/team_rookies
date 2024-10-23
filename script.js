const expiryForm = document.getElementById('expiry-form');
const foodItemInput = document.getElementById('food-item');
const expiryDateInput = document.getElementById('expiry-date');
const itemList = document.getElementById('item-list');

expiryForm.addEventListener('submit', function(event) 
{
    event.preventDefault();

    const foodItem = foodItemInput.value;
    const expiryDate = expiryDateInput.value;

    const foodData = { item: foodItem, expiry: expiryDate };
    const items = JSON.parse(localStorage.getItem('foodItems')) || [];

    items.push(foodData);

    localStorage.setItem('foodItems', JSON.stringify(items));

    renderItems(items);
    
    expiryForm.reset();

    notifyExpiry(foodItem, expiryDate);
});

function renderItems(items) {
    itemList.innerHTML = '';

    items.forEach(foodData => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${foodData.item} - Expires on: ${foodData.expiry}
            <button class="edit-button">Edit</button>
            <button class="delete-button">Delete</button>
        `;
        
        itemList.appendChild(listItem);

        listItem.querySelector('.edit-button').addEventListener('click', () => editItem(listItem, foodData.item, foodData.expiry));
        listItem.querySelector('.delete-button').addEventListener('click', () => deleteItem(listItem));
    });
}

function notifyExpiry(item, date) {
    const currentDate = new Date();
    const expiryDate = new Date(date);

    const timeUntilExpiry = expiryDate - currentDate;

    if (timeUntilExpiry > 0) {
        setTimeout(() => {
            alert(`Reminder: ${item} is expiring soon!`);
        }, timeUntilExpiry);
    }
}

function editItem(listItem, oldFoodItem, oldExpiryDate) {
    foodItemInput.value = oldFoodItem;
    expiryDateInput.value = oldExpiryDate;

    itemList.removeChild(listItem);
}

function deleteItem(listItem) {
    const items = JSON.parse(localStorage.getItem('foodItems')) || [];

    const foodText = listItem.childNodes[0].textContent.split(" - ")[0];
    const updatedItems = items.filter(item => item.item !== foodText);
    localStorage.setItem('foodItems', JSON.stringify(updatedItems));

    itemList.removeChild(listItem);
}

document.addEventListener('DOMContentLoaded', () => {
    const items = JSON.parse(localStorage.getItem('foodItems')) || [];
    
    renderItems(items);
});

