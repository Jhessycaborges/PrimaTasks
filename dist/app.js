"use strict";
const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
let tasks = [];
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function renderTasks() {
    list.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task.content;
        if (task.done) {
            li.classList.add("done");
        }
        li.onclick = () => {
            task.done = !task.done;
            saveTasks();
            renderTasks();
        };
        const btn = document.createElement("button");
        btn.textContent = "Excluir";
        btn.onclick = (e) => {
            e.stopPropagation(); // evita conflito com clique no <li>
            tasks = tasks.filter((t) => t.id !== task.id);
            saveTasks();
            renderTasks();
        };
        li.appendChild(btn);
        list.appendChild(li);
    });
}
window.addEventListener("load", () => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
        tasks = JSON.parse(saved);
        renderTasks();
    }
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = input.value.trim();
    if (value === "")
        return;
    const task = {
        id: Date.now(),
        content: value,
        done: false
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
    input.value = "";
});
