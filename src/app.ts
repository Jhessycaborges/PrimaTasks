interface Task {
  id: number;
  content: string;
  done: boolean;
}

const form = document.querySelector("#todo-form") as HTMLFormElement;
const input = document.querySelector("#todo-input") as HTMLInputElement;
const list = document.querySelector("#todo-list") as HTMLUListElement;
const clearAllBtn = document.querySelector("#clear-all") as HTMLButtonElement;
const toggleDark = document.querySelector("#toggle-dark") as HTMLButtonElement;

let tasks: Task[] = [];

function saveTasks(): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(): void {
  list.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.content;
    if (task.done) {
      span.classList.add("done");
    }

    span.onclick = () => {
      task.done = !task.done;
      saveTasks();
      renderTasks();
    };

    const btn = document.createElement("button");
    btn.textContent = "Excluir";
    btn.onclick = (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderTasks();
    };

    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (value === "") return;

  const task: Task = {
    id: Date.now(),
    content: value,
    done: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
  input.value = "";
});

clearAllBtn.addEventListener("click", () => {
  const confirmClear = confirm("Tem certeza que deseja apagar todas as tarefas?");
  if (!confirmClear) return;

  tasks = [];
  saveTasks();
  renderTasks();
});

toggleDark.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", String(isDark));
  toggleDark.textContent = isDark ? "☀️ Modo Claro" : "🌙 Modo Escuro";
});

window.addEventListener("load", () => {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
    renderTasks();
  }

  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "true") {
    document.body.classList.add("dark");
    toggleDark.textContent = "☀️ Modo Claro";
  } else {
    toggleDark.textContent = "🌙 Modo Escuro";
  }
});
