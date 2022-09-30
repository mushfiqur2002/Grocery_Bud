const alertMsg = document.querySelector(".alert");
const groceryInput = document.getElementById("groceryInput");
const form = document.getElementById("form");
const listItem = document.querySelector(".list_item");

//button
const submitBtn = document.getElementById("submit");
const clearAllBtn = document.getElementById("clearAll_btn");

let editELement;
let editIcon = false;
let editId = "";


//######## EVENT LISTENER ########\\
// submit form
form.addEventListener("submit",addItem);
//clear all item
clearAllBtn.addEventListener("click",clearALlItem);

//######## FUNCTION ########\\
function addItem(e){
    e.preventDefault();
    const value = groceryInput.value;
    const id = new Date().getTime().toString();// just for id
    
    if(value !== "" && editIcon ===false){
        //create element
        const element = document.createElement("article");
        element.classList.add("item");
        element.setAttribute("data-id",id);
        element.innerHTML =`<p class="item_name">${value}</p>
                            <div class="button">
                                <button class="eidt_btn">
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button class="remove_btn">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>`
        listItem.appendChild(element);
        
        //alert message
        displayAlert("add the value successfully","success");
        
        //set back default
        setBackDefault();
        
        //add local storage
//        addLocalStorage();
        
        //edit item
        const editBtn = element.querySelector(".eidt_btn");
        editBtn.addEventListener("click",editItem);
        
        //remove item
        const removeBtn = element.querySelector(".remove_btn");
        removeBtn.addEventListener("click",removeItem);
        
//        //addLocalStorage
//        addLocalStorage(id, value)
        
    } else if(value !== "" && editIcon == true){
        editELement.innerText = value;
        setBackDefault();
//        editLocal()
        displayAlert("value changed", "success");
    }else{
        displayAlert("Please Enter The Value","danger");
    }
}

//set back default
function setBackDefault(){
    groceryInput.value = "";
    editId = "";
    editIcon = false;
    submitBtn.textContent = "submit"
}

//display alert
function displayAlert(text, action){
    alertMsg.textContent = text;
    alertMsg.classList.add(`${action}`);
     
    //remove alert 
    setTimeout(function(){
        alertMsg.textContent = "";
        alertMsg.classList.remove(`${action}`)
    },500);
}

//clear all item
function clearALlItem(){
    const items = document.querySelectorAll(".item");
    items.forEach(function(e){
        listItem.removeChild(e);
    })
    displayAlert("clear all item successully","success");
    setBackDefault();
}

//edit item
function editItem(e){
    let article = e.currentTarget.parentElement.parentElement;
    editELement = e.currentTarget.parentElement.previousElementSibling;
    editIcon=true;
    editId = article.dataset.id;
    groceryInput.value = editELement.innerText;
    submitBtn.textContent = "edit";
    
    // edit from local
//    editFromLocal();
}

//remove item
function removeItem(e){
    let article = e.currentTarget.parentElement.parentElement;
    let articleId = article.dataset.id;
    console.log(articleId);
    listItem.removeChild(article);
    setBackDefault();
    
    // remove from local
//    removeFromLocal(articleId);
}