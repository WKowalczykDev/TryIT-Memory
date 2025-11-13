### 🟡 Zadanie z gwiazdką – System zapisu wyników w cookies (leaderboard)

**Commit:** `Implementacja systemu zapisywania wyników (Cookies)`

W tym zadaniu tworzymy **tablicę wyników gry (leaderboard)** zapisywaną w **cookies**, aby gracze mogli porównywać swoje wyniki i nie tracić ich po odświeżeniu strony.

---

### 🔧 Kluczowe elementy implementacji

#### 1. Instalacja biblioteki do obsługi cookies

* `npm install js-cookie`
* `npm install -D @types/js-cookie`
  Biblioteka `js-cookie` umożliwia łatwe odczytywanie, zapisywanie i usuwanie danych cookies w przeglądarce.

---

#### 2. Nowy komponent `GameCookies.tsx`

* Import `Cookies` z `js-cookie`
* Przyjmuje dane: `gameState`, `timer`, `steps`, `level`
* Obsługuje: wczytywanie, zapisywanie i wyświetlanie wyników

---

#### 3. Wczytywanie zapisanych wyników (`useEffect`)

* Po uruchomieniu komponentu odczytywane są dane z cookies (`Cookies.get("gameScores")`)
* Wyniki filtrowane są wg poziomu (`easy`, `medium`, `hard`)
* Sortowanie po czasie (`.sort((a, b) => a.timer - b.timer)`)
* Wyświetlane tylko **Top 10 wyników**

---

#### 4. Detekcja zakończenia gry

* Gdy `gameState === false` → pokazuje się formularz zapisu wyniku
* Gdy `gameState === true` → formularz znika (nowa gra)

---

#### 5. Zapisywanie nowego wyniku

Funkcja `handleSaveScore()`:

* Waliduje nazwę użytkownika
* Dodaje nowy wpis: `{ username, timer, steps, level, timestamp }`
* Zapisuje w cookies:

  ```typescript
  Cookies.set("gameScores", JSON.stringify(scores), { expires: 365 });
  Cookies.set("lastUsername", username, { expires: 365 });
  ```
* Odświeża tablicę wyników

---

#### 6. Usuwanie wyników

Funkcja `handleClearLeaderboard()`:

* Potwierdzenie przez `window.confirm()`
* Usuwa dane z cookies (`Cookies.remove("gameScores")`)

---

#### 7. Interfejs użytkownika

Formularz i tabela są renderowane warunkowo:

* Formularz z inputem i przyciskiem **Zapisz wynik**
* Tabela wyników (`<table>`) z kolumnami: *#*, *Gracz*, *Poziom*, *Czas*, *Kroki*
* Przycisk **Wyczyść tablicę wyników**

---

#### 8. Integracja w `Board.tsx`

Dodano:

```tsx
<GameCookies
  gameState={gameState}
  timer={Number(timer.toFixed(1))}
  steps={steps}
  level={level}
/>
```

---

### 🎨 Stylowanie (`GameCookies.css`)

* Flexbox w kolumnie (`.game-scores`)
* Delikatne cienie i obramowania (`box-shadow`, `border-radius`)
* Tabela z prostym stylem i wyśrodkowanym tekstem

---

### 💡 Najważniejsze techniki

* **Cookies** → trwałe przechowywanie danych
* **`js-cookie`** → łatwe API do zarządzania ciasteczkami
* **`useEffect`** → automatyczne wczytywanie danych po uruchomieniu gry
* **Filtrowanie, sortowanie, slice()** → selekcja najlepszych wyników
* **Warunkowe renderowanie JSX** → dynamiczne wyświetlanie formularza i tabeli

---

### 🧠 Cel zadania

Utworzyć prosty system **leaderboardu** działający lokalnie w przeglądarce, dzięki któremu gracz może:

* zapisać swoje wyniki po zakończeniu gry,
* zobaczyć najlepsze wyniki dla danego poziomu trudności,
* wyczyścić tablicę wyników.
