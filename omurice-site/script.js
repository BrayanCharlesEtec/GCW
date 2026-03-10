let currentLang = 'pt';

function changeLanguage(lang) {
    currentLang = lang;
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        if(translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    localStorage.setItem('preferred-language', lang);
}

function showRecipe(recipeId) {
    document.querySelectorAll('.recipe-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.getElementById(recipeId + '-recipe').classList.add('active');
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

let votes = JSON.parse(localStorage.getItem('omurice-votes')) || {
    classic: 0,
    creamy: 0,
    decorated: 0
};

function vote(recipe) {
    votes[recipe]++;
    localStorage.setItem('omurice-votes', JSON.stringify(votes));
    updateVoteResults();
}

function updateVoteResults() {
    const resultsDiv = document.getElementById('vote-results');
    if(resultsDiv) {
        const total = votes.classic + votes.creamy + votes.decorated;
        const classicPercent = total > 0 ? Math.round((votes.classic / total) * 100) : 0;
        const creamyPercent = total > 0 ? Math.round((votes.creamy / total) * 100) : 0;
        const decoratedPercent = total > 0 ? Math.round((votes.decorated / total) * 100) : 0;
        
        resultsDiv.innerHTML = 
            '<p><strong>Resultados da Votação:</strong></p>' +
            '<p>Clássica: ' + votes.classic + ' votos (' + classicPercent + '%)</p>' +
            '<p>Cremosa: ' + votes.creamy + ' votos (' + creamyPercent + '%)</p>' +
            '<p>Decorada: ' + votes.decorated + ' votos (' + decoratedPercent + '%)</p>' +
            '<p>Total de votos: ' + total + '</p>';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('preferred-language') || 'pt';
    changeLanguage(savedLang);
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            changeLanguage(this.dataset.lang);
        });
    });
    
    updateVoteResults();
});