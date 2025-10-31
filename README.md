# Kurs React - Gra Memory
**Commit:** `Implementacja systemu zapisywania wyników (Cookies)`

W tym etapie dodajemy mechanizm zapisywania wyników gry oraz tablicę najlepszych wyników (leaderboard) wykorzystując cookies do przechowywania danych.

---

## Zmiany wprowadzone w tym commicie

### 1. Instalacja biblioteki `js-cookie`
- `npm install js-cookie`
- `npm install -D @types/js-cookie`
- Biblioteka do zarządzania cookies w przeglądarce

### 2. Utworzenie `GameCookies.tsx`
- Import `Cookies` z `js-cookie`
- Interfejs `GameCookiesProps`: gameState, timer, steps, level
- Interfejs `GameScore`: username, timer, steps, level, date
- Stany: uploadCookiesState, showForm, username, topScores

### 3. useEffect #1 - Wczytanie wyników
- Odczytuje `Cookies.get("gameScores")`
- Filtruje według poziomu trudności `.filter(s => s.level === level)`
- Sortuje według czasu `.sort((a, b) => a.timer - b.timer)`
- Pokazuje top 10 `.slice(0, 10)`
- Wczytuje ostatnią nazwę gracza `Cookies.get("lastUsername")`

### 4. useEffect #2 - Detekcja ukończenia gry
- `gameState === false` → pokazuje formularz zapisu wyniku
- `gameState === true` → ukrywa formularz (nowa gra)

### 5. Funkcja `handleSaveScore`
- Walidacja nazwy użytkownika
- Odczyt istniejących wyników z cookies
- Dodanie nowego wyniku: `scores.push({ username, timer, steps, level, timestamp })`
- Zapis do cookies: `Cookies.set("gameScores", JSON.stringify(scores), { expires: 365 })`
- Zapis ostatniej nazwy: `Cookies.set("lastUsername", username, { expires: 365 })`
- Aktualizacja stanu `topScores`

### 6. Funkcja `handleClearLeaderboard`
- Potwierdzenie `window.confirm()`
- Usunięcie cookies: `Cookies.remove("gameScores")`
- Wyczyszczenie stanu `setTopScores([])`

### 7. Funkcja `getLevelName`
- Tłumaczenie: easy → "Łatwy", medium → "Średni", hard → "Trudny"

### 8. TSX - Formularz zapisu
- Warunkowe renderowanie: `{showForm && uploadCookiesState && (...)}`
- Input tekstowy dla nazwy gracza (maxLength: 20)
- Przyciski: "Zapisz wynik" i "Pomiń"
- Wyświetlanie czasu, kroków i poziomu

### 9. TSX - Tabela wyników
- Tabela HTML z nagłówkami: #, Gracz, Poziom, Czas, Kroki
- `topScores.map()` dla wierszy tabeli
- Przycisk "Wyczyść tablicę wyników"

### 10. Integracja w `Board.tsx`
- Import `GameCookies`
- Renderowanie: `<GameCookies gameState={gameState} timer={Number(timer.toFixed(1))} steps={steps} level={level}/>`

### 11. Stylowanie `GameCookies.css`
- `.game-scores` - flex column, gap, padding, border, shadow
- `.scores-table` - border-collapse, wyśrodkowanie
- `.scores-table th, td` - padding, text-align center, border-bottom

---

## Kluczowe koncepcje
- **Cookies** - trwałe przechowywanie danych w przeglądarce
- **js-cookie** - biblioteka upraszczająca operacje na cookies
- **JSON.stringify/parse** - serializacja obiektów
- **Array.filter()** - filtrowanie według poziomu
- **Array.sort()** - sortowanie według czasu
- **Array.slice(0, 10)** - top 10 wyników
- **expires: 365** - wygaśnięcie cookies po roku

---

## Przepływ danych
1. Gra kończy się → `gameState = false`
2. Pokazuje się formularz
3. Użytkownik wpisuje nazwę i klika "Zapisz"
4. Wynik dodawany do tablicy w cookies
5. Tabela wyników się aktualizuje

---

## Struktura cookies
**gameScores:**
```json
[
  {
    "username": "Gracz1",
    "timer": 45.3,
    "steps": 28,
    "level": "easy",
    "timestamp": 1698765432000
  }
]
```

**lastUsername:** `"Gracz1"`
---

### Credits

Fruit graphics by [Conania](https://www.iconfinder.com/iconsets/fruit-and-vegetable-15), licensed under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/).  
Used in accordance with the license.

---

➡️ Kolejny etap: `Końcowa wersja gry i początek kursu`