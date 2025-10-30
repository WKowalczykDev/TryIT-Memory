# Kurs React - Gra Memory

**Commit:** `Dodanie licznika ruchów`

W tym etapie dodajemy do komponentu `GameStats` element licznika ruchów.

---

## Zmiany wprowadzone w tym commicie

### 1. Utworzenie komponentu `GameStats.tsx`

**Interfejs `GameStatsProps`:**
```typescript
interface GameStatsProps {
  timer: number;
  steps: number;
  pairsFound: number;
  totalPairs: number;
  gameState: boolean | undefined;
}
```

**Struktura komponentu:**
- `timer` – aktualny czas gry w sekundach
- `steps` – licznik ruchów
- `pairsFound` – liczba odkrytych par
- `totalPairs` – całkowita liczba par w grze
- `gameState` – status gry:
  - `undefined` – gra nie rozpoczęta
  - `true` – gra w toku
  - `false` – gra zakończona

**Renderowanie:**
- Wyświetla czas z jednym miejscem po przecinku
- Pokazuje stosunek znalezionych par do wszystkich
- Warunkowo wyświetla status gry

### 2. Nowy stan `gameState` w `Board.tsx`
```typescript
const [gameState, setGameState] = useState<boolean | undefined>(undefined);
```

**Możliwe wartości:**
- `undefined` – stan początkowy (brak gry)
- `true` – gra aktywna
- `false` – gra zakończona (wygrana)

### 3. Zarządzanie stanem gry

**W `handleGameStart`:**
```typescript
setGameState(true);
```
- Ustawia status na "gra w toku" przy pierwszym kliknięciu

**W `gameWonDetected`:**
```typescript
setGameState(false);
```
- Ustawia status na "gra zakończona" po odkryciu wszystkich par

**W `resetGame`:**
```typescript
setGameState(undefined);
```
- Resetuje status do stanu początkowego

### 4. Nowa struktura layoutu w `Board.tsx`
```typescript
return (
  <div className="game-container">
    <GameStats timer={timer} pairsFound={pairCards.length / 2} totalPairs={cards.length / 2} gameState={gameState} />
    <div className={`board ${level}`}>
      {/* karty */}
    </div>
    <div className="game-scores"></div>
  </div>
);
```

**Elementy:**
- `.game-container` – główny kontener wszystkich elementów gry
- `<GameStats />` – panel ze statystykami (góra)
- `.board` – plansza z kartami (środek)
- `.game-scores` – placeholder na przyszłą tabelę wyników (dół)

### 5. Przekazywanie propsów do `GameStats`

**`timer={timer}`:**
- Aktualny czas gry

**`steps={steps}`**
- Licznik kroków

**`pairsFound={pairCards.length / 2}`:**
- Dzielenie przez 2, bo `pairCards` zawiera pojedyncze karty (każda para = 2 karty)

**`totalPairs={cards.length / 2}`:**
- Całkowita liczba par na planszy

**`gameState={gameState}`:**
- Aktualny status gry

---

## Kluczowe koncepcje

- **Presentation component** – `GameStats` jako komponent wyłącznie prezentacyjny
- **Props interface** – TypeScript definiuje strukturę danych
- **Computed values** – `pairCards.length / 2` obliczane przy renderowaniu
- **Conditional rendering** – wyświetlanie statusu w zależności od `gameState`
- **Layout containers** – separacja struktury (game-container) od zawartości (board)
- **Union types** – `boolean | undefined` dla trzech stanów

---

## Przepływ stanu gry
```
undefined (początek)
    ↓ pierwsze kliknięcie
true (gra trwa)
    ↓ wszystkie pary odkryte
false (gra zakończona)
    ↓ reset
undefined (gotowe do nowej gry)
```

---

## Struktura komponentu GameStats
```typescript
<div className="game-stats">
  <div>Czas: {timer.toFixed(1)}s</div>
  <div>Pary: {pairsFound} / {totalPairs}</div>
  <div>Kroki: </div>
  {gameState === true && <div>Gra w toku...</div>}
  {gameState === false && <div>Gra zakończona!</div>}
  {gameState === undefined && <div>Kliknij kartę aby rozpocząć</div>}
</div>
```

---

## Nowa hierarchia komponentów
```
App
└── Board
    ├── GameStats (statystyki)
    ├── board (karty)
    │   └── Card × N
    └── game-scores (placeholder)
```

---

## Przyszłe zastosowania

- `.game-scores` – przygotowane miejsce na tabelę najlepszych wyników
- `gameState` – może kontrolować wyświetlanie różnych komunikatów/animacji
- `GameStats` – łatwo rozszerzyć o nowe metryki (ruchy, combo, punkty)

---

➡️ Kolejny etap:  
**Commit:** `Obrazki <img> jako awers i rewers karty`