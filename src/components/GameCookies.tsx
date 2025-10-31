import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "./../styles/GameCookies.css"

interface GameCookiesProps {
    gameState: boolean | undefined;
    timer: number;
    steps: number;
    level: "easy" | "medium" | "hard";
}

interface GameScore {
    username: string;
    timer: number;
    steps: number;
    level: "easy" | "medium" | "hard";
    date: string;
}

function GameCookies({
    gameState,
    timer,
    steps,
    level,
}: GameCookiesProps) {

    const [uploadCookiesState, setUploadCookiesState] = useState<boolean>(false);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [topScores, setTopScores] = useState<GameScore[]>([]);

    // Wczytanie leaderboardu przy starcie komponentu
    // useEffect(() => {
    //     const savedLeaderboard = Cookies.get("leaderboard");
    //     if (savedLeaderboard) {
    //         setLeaderboard(JSON.parse(savedLeaderboard));
    //     }
    // }, []);

    useEffect(() => {
        const scoresJson = Cookies.get("gameScores");
        if (scoresJson) {
            const scores = JSON.parse(scoresJson)
                .filter((s: GameScore) => s.level === level)
                .sort((a: GameScore, b: GameScore) => a.timer - b.timer)
                .slice(0, 10);
            setTopScores(scores);
        }
        setUsername(Cookies.get("lastUsername") || "");
    }, [level]);

    // Detekcja wygranej gry i detekcja nowej gry
    useEffect(() => {
        if (gameState === false) {
            setUploadCookiesState(true);
            setShowForm(true);
        }
        else {
            console.log("GAME RELOAD DETECTED");
            setUploadCookiesState(false);
            setShowForm(false);
        }
    }, [gameState]);


    // Zapisanie wyniku do leaderboardu
    const handleSaveScore = () => {
        if (!username.trim()) {
            alert("Wpisz , jak się nazywasz!");
            return;
        }

        const scores = JSON.parse(Cookies.get("gameScores") || "[]");
        scores.push({
            username: username.trim(),
            timer,
            steps,
            level,
            timestamp: Date.now()
        });

        Cookies.set("gameScores", JSON.stringify(scores), { expires: 365 });
        Cookies.set("lastUsername", username, { expires: 365 });

        setTopScores(scores.filter((s: GameScore) => s.level === level).sort((a: GameScore, b: GameScore) => a.timer - b.timer).slice(0, 10));
        setShowForm(false);
    };


    // Wyczyść leaderboard
    const handleClearLeaderboard = () => {
        if (window.confirm("Czy na pewno chcesz wyczyścić cały leaderboard?")) {
            setTopScores([]);
            Cookies.remove("gameScores");
        }
    };

    // Funkcja do wyświetlania poziomu po polsku
    const getLevelName = (level: "easy" | "medium" | "hard") => {
        const names = { easy: "Łatwy", medium: "Średni", hard: "Trudny" };
        return names[level];
    };

    return (
        <div className="game-scores">
            {/* Formularz zapisu wyniku */}
            {showForm && uploadCookiesState && (
                <div>
                    <h4>Gratulacje - gra ukończona</h4>
                    <p>
                        Czas: {timer.toFixed(1)} s | Kroki: {steps} | Poziom:{" "}
                        {getLevelName(level)}
                    </p>
                    <input
                        type="text"
                        placeholder="Wpisz swoją nazwę"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        maxLength={20}
                    />
                    <button onClick={handleSaveScore}>Zapisz wynik</button>
                    <button onClick={() => setShowForm(false)}>Pomiń</button>
                </div>
            )}

            {/* Leaderboard */}
            <div>
                {topScores.length === 0 ? (
                    <p>Brak wyników. Ukończ grę, aby pojawić się na liście!</p>
                ) : (
                    <div className="scores-container">
                        <table className="scores-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Gracz</th>
                                    <th>Poziom</th>
                                    <th>Czas[s]</th>
                                    <th>Kroki</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topScores.map((entry, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{entry.username}</td>
                                        <td>{getLevelName(entry.level)}</td>
                                        <td>{entry.timer} s</td>
                                        <td>{entry.steps}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {topScores.length > 0 && (
                    <button onClick={handleClearLeaderboard}>
                        Wyczyść tablicę wyników
                    </button>
                )}
            </div>
        </div>
    );
}

export default GameCookies;
