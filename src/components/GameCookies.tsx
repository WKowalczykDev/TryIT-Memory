import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import '../styles/GameCookies.css';

interface GameScore {
  username: string;
  timer: number;
  steps: number;
  level: string;
  timestamp: number;
}

interface GameCookiesProps {
  gameWonCount: number;
  newGameDetector: boolean;
  timer: number;
  steps: number;
  level: string;
}

const GameCookies: React.FC<GameCookiesProps> = ({ gameWonCount, newGameDetector, timer, steps, level }) => {
  const [username, setUsername] = useState<string>("");
  const [topScores, setTopScores] = useState<GameScore[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);

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

  useEffect(() => {
    if (gameWonCount > 0) setShowForm(true);
  }, [gameWonCount]);

  useEffect(() => {
    if (newGameDetector) setShowForm(false);
  }, [newGameDetector]);

  const handleSave = () => {
    if (!username.trim()) return alert("Wpisz nazwę!");

    const scores = JSON.parse(Cookies.get("gameScores") || "[]");
    scores.push({
      username: username.trim(),
      score: gameWonCount,
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

  return (
    <div className="game-scores">
      {/* <div className="scores-header">
        <h2 className="scores-title">Najlepsze Wyniki</h2>
      </div> */}
      {showForm && (
        <div className="score-upload-form">
          <p className="upload-message">Ukończono w {gameWonCount} ruchach!</p>
          <div className="upload-controls">
            <input
              type="text"
              placeholder="Twoja nazwa"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="username-input"
            />
            <button onClick={handleSave} className="save-button">
              Zapisz
            </button>
          </div>
        </div>
      )}

      <div className="scores-container">
        {topScores.length === 0 ? (
          <p className="no-scores-message">Brak wyników</p>
        ) : (
          <table className="scores-table">
            <thead className="scores-header">
              <tr>
                <th className="rank-column">#</th>
                <th className="player-column">Gracz</th>
                <th className="timer-column">Czas</th>
                <th className="steps-column">Kroki</th>
                <th className="level-column">Poziom</th>
              </tr>
            </thead>
            <tbody className="scores-body">
              {topScores.map((s, i) => (
                <tr key={i} className="score-row">
                  <td className="rank-cell">{i < 3 ? ["🥇", "🥈", "🥉"][i] : i + 1}</td>
                  <td className="player-cell">{s.username}</td>
                  <td className="timer-cell">{s.timer}s</td>
                  <td className="steps-cell">{s.steps}</td>
                  <td className="level-cell">{
                    s.level === 'easy' ? 'Łatwy' :
                      s.level === 'medium' ? 'Średni' :
                        s.level === 'hard' ? 'Trudny' : '?'
                  }</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <p>Najlepsze wyniki</p>
    </div>
  );
};

export default GameCookies;