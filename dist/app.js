"use strict";
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
let tasks = [];
function renderTasks() {
    list.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.content;
        const btn = document.createElement("button");
        btn.textContent = "Excluir";
        btn.onclick = () => {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks();
        };
        li.appendChild(btn);
        list.appendChild(li);
    });
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = input.value.trim();
    if (content === "")
        return;
    const task = {
        id: Date.now(),
        content
    };
    tasks.push(task);
    renderTasks();
    input.value = "";
});
