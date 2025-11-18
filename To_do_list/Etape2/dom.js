const listeTaches = [
    {
        "idTache": 1,
        "libelle": "Réviser le cours de JavaScript",
        "description": "Revoir les concepts de base et faire les exercices",
        "dateCreation": "2024-01-15",
        "dateEcheance": "2024-01-20",
        "localisation": "A distance",
        "idStatut": 2,
        "idPriorite": 2,
        "idCategorie": 3,
        "idDifficulte": 3
    },
    {
        "idTache": 2,
        "libelle": "Faire les courses",
        "description": "Acheter les ingrédients pour le dîner de demain",
        "dateCreation": "2024-01-16",
        "dateEcheance": "2024-01-17",
        "localisation": "Au marché",
        "idStatut": 1,
        "idPriorite": 3,
        "idCategorie": 2,
        "idDifficulte": 1
    },
    {
        "idTache": 3,
        "libelle": "Préparer présentation projet",
        "description": "Créer les slides et répéter la présentation",
        "dateCreation": "2024-01-14",
        "dateEcheance": "2024-01-22",
        "localisation": "Studium",
        "idStatut": 2,
        "idPriorite": 1,
        "idCategorie": 1,
        "idDifficulte": 2
    }
];

const listeStatuts = [
    { "idStatut": 1, "statut": "En attente" },
    { "idStatut": 2, "statut": "En cours" },
    { "idStatut": 3, "statut": "Urgent" },
    { "idStatut": 4, "statut": "Terminée" },
    { "idStatut": 5, "statut": "Annulée" }
];

const listePriorites = [
    { "idPriorite": 1, "priorite": "Importante" },
    { "idPriorite": 2, "priorite": "Moyenne" },
    { "idPriorite": 3, "priorite": "Peu importante" },
    { "idPriorite": 4, "priorite": "Optionnelle" }
];

const listeCategories = [
    { "idCategorie": 1, "categorie": "Travail" },
    { "idCategorie": 2, "categorie": "Maison" },
    { "idCategorie": 3, "categorie": "Études" },
    { "idCategorie": 4, "categorie": "Loisirs" }
];

const listeDifficulte = [
    { "idDifficulte": 1, "difficulte": "Facile" },
    { "idDifficulte": 2, "difficulte": "Moyenne" },
    { "idDifficulte": 3, "difficulte": "Difficile" }
];

function remplirSelectTemplates(selectId, dataList, valueKey, labelKey) {
    const select = document.getElementById(selectId);
    
    if (!select) return;
    
    let optionsHTML = '';
    dataList.forEach(item => {
        optionsHTML += `<option value="${item[valueKey]}">${item[labelKey]}</option>`;
    });
    
    select.insertAdjacentHTML('beforeend', optionsHTML);
}

function initializerSelectsTemplates() {
    remplirSelectTemplates('statut', listeStatuts, 'idStatut', 'statut');
    remplirSelectTemplates('priorite', listePriorites, 'idPriorite', 'priorite');
    remplirSelectTemplates('categorie', listeCategories, 'idCategorie', 'categorie');
    remplirSelectTemplates('difficulte', listeDifficulte, 'idDifficulte', 'difficulte');
}

function remplirSelectDOM(selectId, dataList, valueKey, labelKey) {
    const select = document.getElementById(selectId);
    
    if (!select) return;
    
    dataList.forEach(item => {
        const optionElement = document.createElement('option');
        optionElement.value = item[valueKey];
        const textNode = document.createTextNode(item[labelKey]);
        optionElement.appendChild(textNode);
        select.appendChild(optionElement);
    });
}

function initializerSelectsDOM() {
    remplirSelectDOM('statut', listeStatuts, 'idStatut', 'statut');
    remplirSelectDOM('priorite', listePriorites, 'idPriorite', 'priorite');
    remplirSelectDOM('categorie', listeCategories, 'idCategorie', 'categorie');
    remplirSelectDOM('difficulte', listeDifficulte, 'idDifficulte', 'difficulte');
}

document.addEventListener('DOMContentLoaded', function() {
    initializerSelectsTemplates();
});
