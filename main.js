document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggler
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    
    const setTheme = (theme) => {
        document.body.classList.toggle('dark-theme', theme === 'dark-theme');
        localStorage.setItem('theme', theme);
    };

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        setTheme(currentTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('dark-theme') ? 'light-theme' : 'dark-theme';
        setTheme(newTheme);
    });


    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });


    // Lotto Number Generator
    const lottoNumbersContainer = document.querySelector('.lotto-numbers');
    const generateBtn = document.getElementById('generate-btn');
    const gameSelector = document.getElementById('lotto-game');
    const statsContent = document.getElementById('stats-content');
    const pastWinnersContent = document.getElementById('past-winners-content');

    // Only run the generator script on the homepage
    if (lottoNumbersContainer && generateBtn && gameSelector && statsContent && pastWinnersContent) {
        const lottoGames = {
            'korea-lotto': {
                mainNumbers: 6,
                mainMax: 45,
            },
            'powerball': {
                mainNumbers: 5,
                mainMax: 69,
                extraNumbers: 1,
                extraMax: 26,
                extraName: 'PB'
            }
        };

        const generateUniqueNumbers = (count, max) => {
            const numbers = new Set();
            while (numbers.size < count) {
                const randomNumber = Math.floor(Math.random() * max) + 1;
                numbers.add(randomNumber);
            }
            return Array.from(numbers).sort((a, b) => a - b);
        };

        const displayNumbers = (numbers, extraNumber = null, extraName = '') => {
            lottoNumbersContainer.innerHTML = '';
            if (numbers.length === 0) {
                lottoNumbersContainer.innerHTML = '<p>Click the button to generate your lucky numbers!</p>';
                return;
            }
            numbers.forEach(number => {
                const numberElement = document.createElement('div');
                numberElement.classList.add('lotto-number');
                numberElement.textContent = number;
                lottoNumbersContainer.appendChild(numberElement);
            });

            if (extraNumber) {
                const extraElement = document.createElement('div');
                extraElement.classList.add('lotto-number', 'extra');
                extraElement.textContent = extraNumber;
                extraElement.title = extraName;
                lottoNumbersContainer.appendChild(extraElement);
            }
        };

        const displayStats = (numbers, extraNumber) => {
            const sum = numbers.reduce((a, b) => a + b, 0);
            const evens = numbers.filter(n => n % 2 === 0).length;
            const odds = numbers.length - evens;
            statsContent.innerHTML = `
                <p><strong>Sum of Numbers:</strong> ${sum}</p>
                <p><strong>Odd/Even Ratio:</strong> ${odds} Odd / ${evens} Even</p>
            `;
        };

        const displayPastWinners = (game) => {
            // Mock data
            const mockWinners = {
                'korea-lotto': ['[8, 12, 19, 27, 34, 45]', '[3, 11, 15, 22, 30, 41]'],
                'powerball': ['[10, 33, 41, 47, 56] + PB[10]', '[04, 08, 15, 16, 23] + PB[04]']
            };
            pastWinnersContent.innerHTML = `<ul>${mockWinners[game].map(w => `<li>${w}</li>`).join('')}</ul>`;
        };

        const generateAndDisplay = () => {
            const selectedGame = gameSelector.value;
            const gameConfig = lottoGames[selectedGame];

            const mainNumbers = generateUniqueNumbers(gameConfig.mainNumbers, gameConfig.mainMax);
            let extraNumber = null;
            if (gameConfig.extraNumbers) {
                extraNumber = generateUniqueNumbers(gameConfig.extraNumbers, gameConfig.extraMax)[0];
            }

            displayNumbers(mainNumbers, extraNumber, gameConfig.extraName);
            displayStats(mainNumbers, extraNumber);
            displayPastWinners(selectedGame);
        };
        
        generateBtn.addEventListener('click', generateAndDisplay);
        gameSelector.addEventListener('change', generateAndDisplay);

        // Initial generation
        generateAndDisplay();
    }
});
