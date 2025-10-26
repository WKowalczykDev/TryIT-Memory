# Kurs React - Gra Memory

**Commit:** `Dodanie dynamicznej zmiany poziomu`

W tym etapie przenosimy logikę tasowania do głównego komponentu aplikacji i dodajemy możliwość wyboru poziomu trudności gry przez użytkownika.

---

## Zmiany wprowadzone w tym commicie

### 1. Przeniesienie funkcji `shuffleArray` do `App.tsx`

- Funkcja tasowania została przeniesiona z `Board.tsx` do `App.tsx`
- Dzięki temu logika tasowania jest w jednym miejscu i kontroluje całą aplikację

### 2. Dodanie stanu poziomu w `App.tsx`

- Import hooka `useState` z React
- Utworzenie stanu `level` z trzema możliwymi wartościami: `"easy" | "medium" | "hard"`
- Domyślna wartość to `'easy'`
- `setLevel` - funkcja do zmiany poziomu trudności
- `setCards` - funkcja do zmiany wartości potasowanych kart (z wykorzystaniem getBoard)

### 3. Obsługa wyboru poziomu

- Funkcja `handleChange` obsługuje zmianę w elemencie `<select>`
- `e.target.value` pobiera wybraną wartość z opcji
- `setLevel` aktualizuje stan aplikacji

### 4. Funkcja `getBoard`

- Przyjmuje wybrany poziom jako argument
- Używa instrukcji warunkowych `if/else` do wyboru odpowiedniej tablicy
- Zwraca potasowaną tablicę kart dla wybranego poziomu
- Łączy wybór planszy z tasowaniem w jednej funkcji

### 5. Interfejs użytkownika – kontrolki

- Dodano `<div className="controls">` z elementem `<select>`
- Trzy opcje: Łatwy, Średni, Trudny
- `value={level}` – aktualna wartość selecta powiązana ze stanem
- `onChange={handleChange}` – wywołanie funkcji przy zmianie wyboru

### 6. Aktualizacja komponentu `Board.tsx`

- Usunięto funkcję `shuffleArray` i import tablic
- Dodano interfejs `BoardProps` z właściwościami:
  - `cards: string[]` – tablica potasowanych kart
  - `level: "easy" | "medium" | "hard"` – poziom trudności
- Komponent otrzymuje dane przez propsy zamiast je generować
- Klasa CSS planszy: `className={\`board ${level}\`}` – dynamiczne style dla każdego poziomu
- Renderowanie kart z propsa `cards` zamiast lokalnej zmiennej

---

## Kluczowe koncepcje

- **useState** – zarządzanie stanem komponentu (wybrany poziom)
- **Event handlers** – obsługa zdarzeń (`onChange`)
- **Controlled components** – element `<select>` kontrolowany przez stan React
- **Props drilling** – przekazywanie danych z rodzica do dziecka
- **TypeScript union types** – `"easy" | "medium" | "hard"` jako typ
- **Template literals** – dynamiczne klasy CSS

---

## Przepływ danych

1. Użytkownik wybiera poziom w `<select>`
2. `handleChange` aktualizuje stan `level`
3. `getBoard(level)` wybiera i tasuje odpowiednią tablicę
4. Potasowane karty przekazywane są do `Board` przez props `cards`
5. `Board` renderuje karty z otrzymanej tablicy

---

## Struktura projektu po tym commicie
```
src/
├── App.tsx               # Logika wyboru poziomu i tasowania
├── assets/
│   └── boards.ts        # Tablice z kartami
└── components/
    ├── Board.tsx        # Plansza przyjmująca karty przez props
    └── Card.tsx         # Pojedyncza karta
```

---

➡️ Kolejny etap:  
**Commit:** `Implementacja odwracania kart i logiki gry`