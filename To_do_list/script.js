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
let filterMode = "active" // active, completed ou all
let viewMode = "table" // permet de choisir entre tableau ou cartes
let advancedFilters = {
  priority: "",
  category: "",
  dateStart: "",
  dateEnd: "",
  sortBy: "dateCreation",
  sortOrder: "desc",
}

// Init au chargement de la page
function initApp() {
  // Met la date d'aujourd'hui par défaut
  const today = new Date().toISOString().split("T")[0]
  document.getElementById("dateCreation").value = today

  loadTasks()

  // Navigation entre formulaire et récapitulatif
  const btnViewTasks = document.getElementById("btnViewTasks")
  const btnBackToForm = document.getElementById("btnBackToForm")
  const formSection = document.getElementById("formSection")
  const tasksSection = document.getElementById("tasksSection")

  if (btnViewTasks) {
    btnViewTasks.addEventListener("click", () => {
      formSection.style.display = "none"
      tasksSection.style.display = "block"
      displayTasks()
    })
  }

  if (btnBackToForm) {
    btnBackToForm.addEventListener("click", () => {
      tasksSection.style.display = "none"
      formSection.style.display = "block"
    })
  }

  // Gestion du toggle entre vue tableau et vue cartes
  const btnTableView = document.getElementById("btnTableView")
  const btnCardsView = document.getElementById("btnCardsView")

  if (btnTableView) {
    btnTableView.addEventListener("click", () => {
      viewMode = "table"
      btnTableView.classList.add("active")
      btnCardsView.classList.remove("active")
      displayTasks()
    })
  }

  if (btnCardsView) {
    btnCardsView.addEventListener("click", () => {
      viewMode = "cards"
      btnCardsView.classList.add("active")
      btnTableView.classList.remove("active")
      displayTasks()
    })
  }

  // Soumission du formulaire
  document.getElementById("taskForm").addEventListener("submit", handleFormSubmit)

  // Filtres rapides (actives, terminées, toutes)
  const btnShowActive = document.getElementById("btnShowActive")
  const btnShowCompleted = document.getElementById("btnShowCompleted")
  const btnShowAll = document.getElementById("btnShowAll")

  if (btnShowActive) btnShowActive.addEventListener("click", () => setFilter("active"))
  if (btnShowCompleted) btnShowCompleted.addEventListener("click", () => setFilter("completed"))
  if (btnShowAll) btnShowAll.addEventListener("click", () => setFilter("all"))

  // Filtres avancés
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

// Charge les tâches depuis localStorage
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

// Sauvegarde dans localStorage
function saveTasks() {
  try {
    localStorage.setItem("listeTaches", JSON.stringify(listeTaches))
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des tâches:", error)
    alert("Erreur lors de la sauvegarde. Vérifiez l'espace de stockage disponible.")
  }
}

// Gère la soumission du formulaire
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

  alert("Tâche enregistrée avec succès !")
}

// Change le filtre (actives / terminées / toutes)
function setFilter(mode) {
  filterMode = mode

  const btnShowActive = document.getElementById("btnShowActive")
  const btnShowCompleted = document.getElementById("btnShowCompleted")
  const btnShowAll = document.getElementById("btnShowAll")

  if (btnShowActive) btnShowActive.classList.remove("active")
  if (btnShowCompleted) btnShowCompleted.classList.remove("active")
  if (btnShowAll) btnShowAll.classList.remove("active")

  if (mode === "active" && btnShowActive) {
    btnShowActive.classList.add("active")
  } else if (mode === "completed" && btnShowCompleted) {
    btnShowCompleted.classList.add("active")
  } else if (btnShowAll) {
    btnShowAll.classList.add("active")
  }

  displayTasks()
}

// Applique tous les filtres et tris
function getFilteredTasks() {
  let filtered = []
  if (filterMode === "active") {
    filtered = listeTaches.filter((task) => task.idStatut !== 4 && task.idStatut !== 5)
  } else if (filterMode === "completed") {
    filtered = listeTaches.filter((task) => task.idStatut === 4 || task.idStatut === 5)
  } else {
    filtered = [...listeTaches]
  }

  // Filtre par priorité
  if (advancedFilters.priority) {
    filtered = filtered.filter((task) => task.idPriorite === Number.parseInt(advancedFilters.priority))
  }

  // Filtre par catégorie
  if (advancedFilters.category) {
    filtered = filtered.filter((task) => task.idCategorie === Number.parseInt(advancedFilters.category))
  }

  // Filtre par plage de dates
  if (advancedFilters.dateStart) {
    filtered = filtered.filter((task) => task.dateEcheance >= advancedFilters.dateStart)
  }

  if (advancedFilters.dateEnd) {
    filtered = filtered.filter((task) => task.dateEcheance <= advancedFilters.dateEnd)
  }

  // Tri des résultats
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

// Affiche les tâches selon le mode choisi (tableau ou cartes)
function displayTasks() {
  const filteredTasks = getFilteredTasks()

  if (viewMode === "table") {
    displayTasksAsTable(filteredTasks)
  } else {
    displayTasksAsCards(filteredTasks)
  }
}

// Affiche les tâches sous forme de tableau HTML
function displayTasksAsTable(filteredTasks) {
  const tableView = document.getElementById("tableView")
  const cardsView = document.getElementById("cardsView")

  // Bascule l'affichage
  if (tableView) tableView.style.display = "block"
  if (cardsView) cardsView.style.display = "none"

  const tbody = document.getElementById("tasksTableBody")
  if (!tbody) return

  tbody.innerHTML = ""

  if (filteredTasks.length === 0) {
    tbody.innerHTML = '<tr><td colspan="10" class="empty-state">Aucune tâche à afficher</td></tr>'
    return
  }

  // Génère une ligne pour chaque tâche
  filteredTasks.forEach((task) => {
    const priorityInfo = listePriorites.find((p) => p.idPriorite === task.idPriorite)
    const statusInfo = listeStatuts.find((s) => s.idStatut === task.idStatut)
    const categoryInfo = listeCategories.find((c) => c.idCategorie === task.idCategorie)
    const difficultyInfo = listeDifficultes.find((d) => d.idDifficulte === task.idDifficulte)

    const row = document.createElement("tr")

    row.innerHTML = `
      <td class="table-libelle">${escapeHtml(task.libelle)}</td>
      <td><span class="priority-badge ${priorityInfo.color}">${priorityInfo.priorite}</span></td>
      <td><span class="status-badge ${statusInfo.color}">${statusInfo.statut}</span></td>
      <td><span class="category-badge ${categoryInfo.color}">${categoryInfo.categorie}</span></td>
      <td><span class="difficulty-badge ${difficultyInfo.color}">${difficultyInfo.difficulte}</span></td>
      <td>${formatDate(task.dateCreation)}</td>
      <td>${formatDate(task.dateEcheance)}</td>
      <td>${task.localisation ? escapeHtml(task.localisation) : "-"}</td>
      <td class="table-description">${task.description ? escapeHtml(task.description) : "-"}</td>
      <td class="table-actions">
        <div class="table-status-buttons">
          ${listeStatuts
            .map(
              (statut) => `
            <button 
              class="table-status-btn ${statut.color} ${task.idStatut === statut.idStatut ? "current" : ""}" 
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
        <button class="table-delete-btn" onclick="deleteTask(${task.idTache})">Supprimer</button>
      </td>
    `

    tbody.appendChild(row)
  })
}

// Affiche les tâches sous forme de cartes 
function displayTasksAsCards(filteredTasks) {
  const tableView = document.getElementById("tableView")
  const cardsView = document.getElementById("cardsView")

  // Bascule l'affichage
  if (tableView) tableView.style.display = "none"
  if (cardsView) cardsView.style.display = "grid"

  cardsView.innerHTML = ""

  if (filteredTasks.length === 0) {
    cardsView.innerHTML = '<div class="empty-state">Aucune tâche à afficher</div>'
    return
  }

  // Génère une carte pour chaque tâche
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

    cardsView.appendChild(card)
  })
}

// Change le statut d'une tâche
function updateTaskStatus(taskId, newStatusId) {
  const task = listeTaches.find((t) => t.idTache === taskId)
  if (task) {
    task.idStatut = newStatusId
    saveTasks()
    displayTasks()
  }
}

// Supprime une tâche
function deleteTask(taskId) {
  if (confirm("Êtes-vous sûr de vouloir supprimer cette tâche ? Cette action est irréversible.")) {
    listeTaches = listeTaches.filter((t) => t.idTache !== taskId)
    saveTasks()
    displayTasks()
  }
}

// Formate une date au format DD/MM/YYYY
function formatDate(dateString) {
  if (!dateString) return "-"
  const [year, month, day] = dateString.split("-")
  return `${day}/${month}/${year}`
}

// Échappe le HTML pour éviter les injections XSS
function escapeHtml(text) {
  const div = document.createElement("div")
  div.textContent = text
  return div.innerHTML
}

// Réinitialise tous les filtres avancés
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
