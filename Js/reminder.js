"use strict";

const LOCAL_STORAGE_KEY_REMINDERS = "app.reminders.advanced";

let reminders = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_REMINDERS)) || [];

let listRoot = document.querySelector("#list-root");
let listForm = document.querySelector("[data-list-form]");
let listInput = document.querySelector("[data-list-input]");
let timeInput = document.querySelector("[time-input]")

listForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (listInput.value.trim() === ""){
        return;
    }
    reminders.push(CreateReminder(listInput.value.trim()));
    UpdateReminders();
    listInput.value = "";
});

function CreateReminder(name) {
    return {
      id: Date.now().toString(),
      name: name,
    };
  }

function Reminderlist(items){
    let list = document.createElement("ul");
    items.forEach((item) => {
        let reminderlistItem = document.createElement("li");
        reminderlistItem.innerText = item.name;
        reminderlistItem.setAttribute("data-id", item.id);
        reminderlistItem.classList.add("reminder-list-item");
        reminderlistItem.addEventListener("click", removeItem);
        list.append(reminderlistItem);
    });
    return list;
}

function removeItem(event){
    let removeItem = event.target.getAttribute("data-id");
    reminders = reminders.filter((item) => item.id !== removeItem);
    UpdateReminders();
}

function UpdateReminders(){ 
    SaveList();
    listRoot.innerHTML = "";
    listRoot.append(Reminderlist(reminders));

}

function SaveList(){
    localStorage.setItem(LOCAL_STORAGE_KEY_REMINDERS, JSON.stringify(reminders));
}

UpdateReminders();