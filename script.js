// ======== TO-DO LIST ========
const inputTarefa = document.getElementById("inputTarefa");
const botaoAdd = document.getElementById("botaoAdd");
const listaTarefas = document.getElementById("listaTarefas");

document.addEventListener("DOMContentLoaded", carregarTarefas);

function carregarTarefas() {
  const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefasSalvas.reverse().forEach((tarefa) =>
    criarTarefa(tarefa.texto, tarefa.completa, false)
  );
}

function adicionarTarefa() {
  const texto = inputTarefa.value.trim();
  if (texto === "") return alert("Digite uma tarefa!");
  criarTarefa(texto, false, true);
  salvarTarefas();
  inputTarefa.value = "";
}

function criarTarefa(texto, completa = false, nova = true) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completa;

  const span = document.createElement("span");
  span.textContent = texto;
  span.classList.add("tarefa-texto");

  if (completa) li.classList.add("completa");

  checkbox.addEventListener("change", () => {
    li.classList.toggle("completa");
    salvarTarefas();
  });

  const btnRemover = document.createElement("button");
  btnRemover.textContent = "×";
  btnRemover.classList.add("remove");
  btnRemover.addEventListener("click", () => {
    li.remove();
    salvarTarefas();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(btnRemover);

  if (nova) {
    listaTarefas.insertBefore(li, listaTarefas.firstChild);
  } else {
    listaTarefas.appendChild(li);
  }
}

function salvarTarefas() {
  const tarefas = [];
  listaTarefas.querySelectorAll("li").forEach((li) => {
    tarefas.unshift({
      texto: li.querySelector(".tarefa-texto").textContent,
      completa: li.classList.contains("completa"),
    });
  });
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

botaoAdd.addEventListener("click", adicionarTarefa);
inputTarefa.addEventListener("keypress", (e) => {
  if (e.key === "Enter") adicionarTarefa();
});

// ======== ESTRELAS CADENTES DINÂMICAS ========
const estrelas = document.querySelectorAll(".shooting-star");

// Gera uma nova trajetória com posições e ângulos aleatórios
function novaTrajetoria(estrela) {
  const angle = Math.random() * 40 + 30; // ângulo entre 30° e 70°
  const startX = -200 - Math.random() * 300; // começa fora da tela
  const startY = Math.random() * window.innerHeight * 0.5; // ponto inicial variável
  const endX = window.innerWidth + 200;
  const endY = window.innerHeight * (0.4 + Math.random() * 0.6);

  estrela.style.setProperty("--startX", `${startX}px`);
  estrela.style.setProperty("--startY", `${startY}px`);
  estrela.style.setProperty("--endX", `${endX}px`);
  estrela.style.setProperty("--endY", `${endY}px`);
  estrela.style.setProperty("--angle", `${angle}deg`);
}

// Aplica comportamento e reinicialização
estrelas.forEach((estrela, i) => {
  estrela.style.position = "fixed";
  estrela.style.top = "var(--startY)";
  estrela.style.left = "var(--startX)";
  estrela.style.transform = "rotate(var(--angle))";
  estrela.style.opacity = "0";

  // Gera nova trajetória inicial com atraso aleatório
  setTimeout(() => {
    novaTrajetoria(estrela);
    estrela.classList.add("ativo");
  }, i * 4000 + Math.random() * 3000);

  // Atualiza trajetória a cada ciclo de animação
  estrela.addEventListener("animationiteration", () => novaTrajetoria(estrela));
});
