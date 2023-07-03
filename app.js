//TRADUTOR API

async function translateText(text, sourceLang, targetLang) {
    const encodedText = encodeURIComponent(text);
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${sourceLang}|${targetLang}`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const translatedText = data.responseData.translatedText;
      return translatedText;
    } catch (error) {
      console.error('Erro na tradução:', error);
      return text; // Retorna o texto original em caso de erro
    }
  }
//JOGOS FREE RANDOM
const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=alphabetical';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'f1cc78c497msh2dc1073bf8cb06bp1be592jsne5659eb6473b',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }
};

(async () => {
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        const randomIndex = Math.floor(Math.random() * data.length);
        const randomGame = data[randomIndex];

        // Selecionar os elementos HTML
        const gameImage = document.querySelector('.game-card__image');
        const gameTitle = document.querySelector('.game-card__title');
        const gameDescription = document.querySelector('.game-card__description');
        const translatedDescription = await translateText(randomGame.short_description, 'en', 'pt-BR');
            gameDescription.textContent = translatedDescription;
        const gameGenre = document.querySelector('.game-card__genre');
        const gamePlatform = document.querySelector('.game-card__platform');
        const gameDeveloper = document.querySelector('.game-card__developer');
        const gameLink = document.querySelector('.game-card__link');

        // Atualizar os conteúdos dos elementos HTML com os dados do jogo
        gameImage.src = randomGame.thumbnail;
        gameImage.alt = randomGame.title;
        gameTitle.textContent = randomGame.title;
        translatedDescription.textContent = randomGame.short_description;
        gameGenre.textContent = `Gênero: ${randomGame.genre}`;
        gamePlatform.textContent = `Plataforma: ${randomGame.platform}`;
        gameDeveloper.textContent = `Desenvolvedora: ${randomGame.developer}`;
        gameLink.setAttribute('href', randomGame.freetogame_profile_url);
        gameLink.setAttribute('target', '_blank');
    } catch (error) {
        console.error(error);
    }
})();

document.getElementById('search-btn').addEventListener('click', async function() {
    var genreSelect = document.getElementById('genre-select');
    var selectedGenre = genreSelect.value;

    try {
        // Chamar a API para obter os jogos do gênero selecionado
        const response = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games?category=' + selectedGenre, {
            headers: {
                'X-RapidAPI-Key': 'f1cc78c497msh2dc1073bf8cb06bp1be592jsne5659eb6473b',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        });

        const data = await response.json();

        // Verificar se há jogos retornados da API
        if (data && data.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomGame = data[randomIndex];

            // Exibir os detalhes do jogo aleatório
            const gameImage = document.querySelector('.game-card__image');
            const gameTitle = document.querySelector('.game-card__title');
            const gameDescription = document.querySelector('.game-card__description');
            const translatedDescription = await translateText(randomGame.short_description, 'en', 'pt-BR');
            gameDescription.textContent = translatedDescription;
            const gameGenre = document.querySelector('.game-card__genre');
            const gamePlatform = document.querySelector('.game-card__platform');
            const gameDeveloper = document.querySelector('.game-card__developer');
            const gameLink = document.querySelector('.game-card__link');

            gameImage.src = randomGame.thumbnail;
            gameImage.alt = randomGame.title;
            gameTitle.textContent = randomGame.title;
            translatedDescription.textContent = randomGame.short_description;
            gameGenre.textContent = `Gênero: ${randomGame.genre}`;
            gamePlatform.textContent = `Plataforma: ${randomGame.platform}`;
            gameDeveloper.textContent = `Desenvolvedora: ${randomGame.developer}`;
            gameLink.setAttribute('href', randomGame.freetogame_profile_url);
            gameLink.setAttribute('target', '_blank');
        } else {
            // Se não houver jogos retornados, exibir uma mensagem de erro ou realizar outra ação apropriada
            console.log('Nenhum jogo encontrado para o gênero selecionado.');
        }
    } catch (error) {
        // Lidar com erros na chamada da API
        console.error('Ocorreu um erro:', error);
    }
});
