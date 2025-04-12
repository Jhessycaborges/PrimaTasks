interface Task {
    id: number;
    content: string;
}

const form = document.querySelector("#todo-form") as HTMLFormElement;
const input = document.querySelector("#todo-input") as HTMLInputElement;
const list = document.querySelector("#todo-list") as HTMLUListElement;

let tasks: Task[] = [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.addEventListener("load", () => {
    const saved = localStorage.getItem("tasks");
    if(saved) {
        tasks = JSON.parse(saved);
        renderTasks();
    }
});

function renderTasks() {
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task.content;

        const btn = document.createElement("button");
        btn.textContent = "Excluir";
        btn.onclick = () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        };

        li.appendChild(btn);
        list.appendChild(li);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = input.value.trim()
    if(content === "") return;

    const task: Task = {
        id: Date.now(), 
        content
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    input.value = "";
})