const words = [
    "Bridge", "Moon", "Tiger", "River", "Car",
    "Sun", "Ocean", "Flame", "Mountain", "Dragon",
    "Pirate", "Cat", "Sand", "Gold", "Book",
    "Forest", "Plane", "King", "Knight", "Snake",
    "Robot", "Wind", "Flag", "City", "Cannon"
    ];
    
    const board = document.getElementById("board");
    const newGameBtn = document.getElementById("new-game");
    const currentTeamText = document.getElementById("current-team");
    const showWordsBtn = document.createElement("button");
    showWordsBtn.textContent = "Show words";
    showWordsBtn.id = "show-words";
    document.body.insertBefore(showWordsBtn, board);
    
    let currentTeam;
    let teamWords = { Red: [], Blue: [], Assassin: [] };
    let teamScores = { Red: 8, Blue: 8 };
    
    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
    
    function updateCurrentTeam() {
        currentTeamText.textContent = currentTeam === "Red" ? "Red" : "Blue";
        currentTeamText.className = currentTeam === "Red" ? "Red-team" : "Blue-team";
    }
    
    function generateBoard() {
        board.innerHTML = "";
        let shuffledWords = shuffle([...words]);
        let colors = generateColors();
        teamWords = { Red: [], Blue: [], Assassin: [] };
        teamScores = { Red: 8, Blue: 8 };
        
        shuffledWords.slice(0, 25).forEach((word, index) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.textContent = word;
            card.dataset.color = colors[index];
    
            if (colors[index] === "Red") teamWords.Red.push(word);
            if (colors[index] === "Blue") teamWords.Blue.push(word);
            if (colors[index] === "Assassin") teamWords.Assassin.push(word);
            
            card.addEventListener("click", () => revealCard(card));
            board.appendChild(card);
        });
    
        updateCurrentTeam();
    }
    
    function generateColors() {
        let colors = [
            ...Array(8).fill("Red"),
            ...Array(8).fill("Blue"),
            ...Array(7).fill("Neutral"),
            "Assassin"
        ];
        return shuffle(colors);
    }
    
    function revealCard(card) {
        if (card.classList.contains("revealed")) return;
    
        let color = card.dataset.color;
        card.classList.add("revealed", color);
        card.style.backgroundColor = getColor(color);
    
        if (color === "Assassin") {
            setTimeout(() => alert(`Team ${currentTeam} lost!`), 300);
            setTimeout(newGame, 1000);
            return;
        }
    
        if (color === currentTeam) {
            teamScores[currentTeam]--;
            if (teamScores[currentTeam] === 0) {
                setTimeout(() => alert(`Team ${currentTeam} won!`), 300);
                setTimeout(newGame, 1000);
                return;
            }
        } else {
            currentTeam = currentTeam === "Red" ? "Blue" : "Red";
        }
        updateCurrentTeam();
    }
    
    function getColor(color) {
        switch (color) {
            case "Red": return "#ff4c4c";
            case "Blue": return "#4c6eff";
            case "Neutral": return "#ddd";
            case "Assassin": return "black";
            default: return "#f0f0f0";
        }
    }
    
    function showWords() {
        alert(`Team red words: ${teamWords.Red.join(", ")}\nС: ${teamWords.Blue.join(", ")}\nAssassin word: ${teamWords.Assassin.join(", ")}`);
    }
    
    function newGame() {
        currentTeam = Math.random() < 0.5 ? "Red" : "Blue";
        generateBoard();
    }
    
    newGameBtn.addEventListener("click", newGame);
    showWordsBtn.addEventListener("click", showWords);
    
    newGame();
