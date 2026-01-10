const listePriorites = [
  { idPriorite: 1, priorite: "Urgente", color: "priority-urgente" },
  { idPriorite: 2, priorite: "Haute", color: "priority-haute" },
  { idPriorite: 3, priorite: "Normale", color: "priority-normale" },
  { idPriorite: 4, priorite: "Basse", color: "priority-basse" },
]

const listeStatuts = [
  { idStatut: 1, statut: "En attente", color: "status-attente" },
  { idStatut: 2, statut: "En cours", color: "status-cours" },
  { idStatut: 3, statut: "Bloquée", color: "status-bloquee" },
  { idStatut: 4, statut: "Terminée", color: "status-terminee" },
  { idStatut: 5, statut: "Annulée", color: "status-annulee" },
]

const listeCategories = [
  { idCategorie: 1, categorie: "Personnel", color: "category-personnel" },
  { idCategorie: 2, categorie: "Professionnel", color: "category-professionnel" },
  { idCategorie: 3, categorie: "Domestique", color: "category-domestique" },
  { idCategorie: 5, categorie: "Études", color: "category-etudes" },
  { idCategorie: 4, categorie: "Autre", color: "category-autre" },
]

const listeDifficultes = [
  { idDifficulte: 1, difficulte: "Facile", color: "difficulty-facile" },
  { idDifficulte: 2, difficulte: "Moyenne", color: "difficulty-moyenne" },
  { idDifficulte: 3, difficulte: "Difficile", color: "difficulty-difficile" },
]

let listeTaches = []
let filterMode = "active"
let advancedFilters = {
  priority: "",
  category: "",
  dateStart: "",
  dateEnd: "",
  sortBy: "dateCreation",
  sortOrder: "desc",
}

function initApp() {
  const today = new Date().toISOString().split("T")[0]
  document.getElementById("dateCreation").value = today

  loadTasks()
  displayTasks()

  document.getElementById("taskForm").addEventListener("submit", handleFormSubmit)
  document.getElementById("btnShowActive").addEventListener("click", () => setFilter("active"))
  document.getElementById("btnShowCompleted").addEventListener("click", () => setFilter("completed"))
  document.getElementById("btnShowAll").addEventListener("click", () => setFilter("all"))

  document.getElementById("filterPriority").addEventListener("change", (e) => {
    advancedFilters.priority = e.target.value
    displayTasks()
  })

  document.getElementById("filterCategory").addEventListener("change", (e) => {
    advancedFilters.category = e.target.value
    displayTasks()
  })

  document.getElementById("sortBy").addEventListener("change", (e) => {
    advancedFilters.sortBy = e.target.value
    displayTasks()
  })

  document.getElementById("sortOrder").addEventListener("change", (e) => {
    advancedFilters.sortOrder = e.target.value
    displayTasks()
  })

  document.getElementById("filterDateStart").addEventListener("change", (e) => {
    advancedFilters.dateStart = e.target.value
    displayTasks()
  })

  document.getElementById("filterDateEnd").addEventListener("change", (e) => {
    advancedFilters.dateEnd = e.target.value
    displayTasks()
  })

  document.getElementById("btnResetFilters").addEventListener("click", resetAdvancedFilters)
}

function loadTasks() {
  const storedTasks = localStorage.getItem("listeTaches")
  if (storedTasks) {
    try {
      listeTaches = JSON.parse(storedTasks)
    } catch (error) {
      console.error("Erreur lors du chargement des tâches:", error)
      listeTaches = []
    }
  }
}

function saveTasks() {
  try {
    localStorage.setItem("listeTaches", JSON.stringify(listeTaches))
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des tâches:", error)
    alert("Erreur lors de la sauvegarde. Vérifiez l'espace de stockage disponible.")
  }
}

function handleFormSubmit(event) {
  event.preventDefault()

  const formData = {
    idTache: Date.now(),
    libelle: document.getElementById("libelle").value.trim(),
    description: document.getElementById("description").value.trim(),
    localisation: document.getElementById("localisation").value.trim(),
    dateCreation: document.getElementById("dateCreation").value,
    dateEcheance: document.getElementById("dateEcheance").value,
    idPriorite: Number.parseInt(document.getElementById("priorite").value),
    idStatut: Number.parseInt(document.getElementById("statut").value),
    idCategorie: Number.parseInt(document.getElementById("categorie").value),
    idDifficulte: Number.parseInt(document.getElementById("difficulte").value),
  }

  listeTaches.push(formData)
  saveTasks()

  document.getElementById("taskForm").reset()
  const today = new Date().toISOString().split("T")[0]
  document.getElementById("dateCreation").value = today

  displayTasks()

  alert("Tâche enregistrée avec succès !")
}

function setFilter(mode) {
  filterMode = mode

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active")
  })

  if (mode === "active") {
    document.getElementById("btnShowActive").classList.add("active")
  } else if (mode === "completed") {
    document.getElementById("btnShowCompleted").classList.add("active")
  } else {
    document.getElementById("btnShowAll").classList.add("active")
  }

  displayTasks()
}

function getFilteredTasks() {
  let filtered = []
  if (filterMode === "active") {
    filtered = listeTaches.filter((task) => task.idStatut !== 4 && task.idStatut !== 5)
  } else if (filterMode === "completed") {
    filtered = listeTaches.filter((task) => task.idStatut === 4 || task.idStatut === 5)
  } else {
    filtered = [...listeTaches]
  }

  if (advancedFilters.priority) {
    filtered = filtered.filter((task) => task.idPriorite === Number.parseInt(advancedFilters.priority))
  }

  if (advancedFilters.category) {
    filtered = filtered.filter((task) => task.idCategorie === Number.parseInt(advancedFilters.category))
  }

  if (advancedFilters.dateStart) {
    filtered = filtered.filter((task) => task.dateEcheance >= advancedFilters.dateStart)
  }

  if (advancedFilters.dateEnd) {
    filtered = filtered.filter((task) => task.dateEcheance <= advancedFilters.dateEnd)
  }

  filtered.sort((a, b) => {
    let valueA, valueB

    if (advancedFilters.sortBy === "dateCreation") {
      valueA = new Date(a.dateCreation)
      valueB = new Date(b.dateCreation)
    } else if (advancedFilters.sortBy === "dateEcheance") {
      valueA = new Date(a.dateEcheance)
      valueB = new Date(b.dateEcheance)
    } else if (advancedFilters.sortBy === "priorite") {
      valueA = a.idPriorite
      valueB = b.idPriorite
    }

    if (advancedFilters.sortOrder === "asc") {
      return valueA > valueB ? 1 : valueA < valueB ? -1 : 0
    } else {
      return valueA < valueB ? 1 : valueA > valueB ? -1 : 0
    }
  })

  return filtered
}

function displayTasks() {
  const container = document.getElementById("tasksContainer")
  container.innerHTML = ""

  const filteredTasks = getFilteredTasks()

  if (filteredTasks.length === 0) {
    container.innerHTML = '<div class="empty-state">Aucune tâche à afficher</div>'
    return
  }

  filteredTasks.forEach((task) => {
    const priorityInfo = listePriorites.find((p) => p.idPriorite === task.idPriorite)
    const statusInfo = listeStatuts.find((s) => s.idStatut === task.idStatut)
    const categoryInfo = listeCategories.find((c) => c.idCategorie === task.idCategorie)
    const difficultyInfo = listeDifficultes.find((d) => d.idDifficulte === task.idDifficulte)

    const card = document.createElement("div")
    card.className = "task-card"

    card.innerHTML = `
      <div class="task-header">
        <div class="task-title">${escapeHtml(task.libelle)}</div>
        <span class="status-badge ${statusInfo.color}">${statusInfo.statut}</span>
      </div>

      ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ""}

      <div class="task-info">
        <div class="task-info-row">
          <span class="info-label">Priorité:</span>
          <span class="priority-badge ${priorityInfo.color}">${priorityInfo.priorite}</span>
        </div>

        <div class="task-info-row">
          <span class="info-label">Catégorie:</span>
          <span class="category-badge ${categoryInfo.color}">${categoryInfo.categorie}</span>
        </div>

        <div class="task-info-row">
          <span class="info-label">Difficulté:</span>
          <span class="difficulty-badge ${difficultyInfo.color}">${difficultyInfo.difficulte}</span>
        </div>

        ${
          task.localisation
            ? `
        <div class="task-info-row">
          <span class="info-label">Localisation:</span>
          <span>${escapeHtml(task.localisation)}</span>
        </div>
        `
            : ""
        }
      </div>

      <div class="task-dates">
        <div class="date-item">
          <div class="date-label">Création</div>
          <div class="date-value">${formatDate(task.dateCreation)}</div>
        </div>
        <div class="date-item">
          <div class="date-label">Échéance</div>
          <div class="date-value">${formatDate(task.dateEcheance)}</div>
        </div>
      </div>

      <div class="status-section">
        <div class="status-label">Modifier le statut:</div>
        <div class="status-buttons">
          ${listeStatuts
            .map(
              (statut) => `
            <button 
              class="status-btn ${statut.color} ${task.idStatut === statut.idStatut ? "current" : ""}" 
              onclick="updateTaskStatus(${task.idTache}, ${statut.idStatut})"
              ${task.idStatut === statut.idStatut ? "disabled" : ""}
              title="${task.idStatut === statut.idStatut ? "Statut actuel" : "Changer en " + statut.statut}"
            >
              ${statut.statut}
            </button>
          `,
            )
            .join("")}
        </div>
        <button class="delete-btn" onclick="deleteTask(${task.idTache})" title="Supprimer cette tâche">Supprimer la tâche</button>
      </div>
    `

    container.appendChild(card)
  })
}

function updateTaskStatus(taskId, newStatusId) {
  const task = listeTaches.find((t) => t.idTache === taskId)
  if (task) {
    task.idStatut = newStatusId
    saveTasks()
    displayTasks()
  }
}

function deleteTask(taskId) {
  if (confirm("Êtes-vous sûr de vouloir supprimer cette tâche ? Cette action est irréversible.")) {
    listeTaches = listeTaches.filter((t) => t.idTache !== taskId)
    saveTasks()
    displayTasks()
  }
}

function formatDate(dateString) {
  if (!dateString) return "-"
  const [year, month, day] = dateString.split("-")
  return `${day}/${month}/${year}`
}

function escapeHtml(text) {
  const div = document.createElement("div")
  div.textContent = text
  return div.innerHTML
}

function resetAdvancedFilters() {
  advancedFilters = {
    priority: "",
    category: "",
    dateStart: "",
    dateEnd: "",
    sortBy: "dateCreation",
    sortOrder: "desc",
  }

  document.getElementById("filterPriority").value = ""
  document.getElementById("filterCategory").value = ""
  document.getElementById("sortBy").value = "dateCreation"
  document.getElementById("sortOrder").value = "desc"
  document.getElementById("filterDateStart").value = ""
  document.getElementById("filterDateEnd").value = ""

  displayTasks()
}

document.addEventListener("DOMContentLoaded", initApp)
