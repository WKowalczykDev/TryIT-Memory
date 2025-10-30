# Kurs React - Gra Memory

**Commit:** `Dodanie przycisku resetowania i stałej czasu animacji`

W tym etapie implementujemy przycisk "Nowa Gra" umożliwiający restart rozgrywki oraz tworzymy stałą globalną dla czasu animacji odwracania kart.

---

## Zmiany wprowadzone w tym commicie

### 1. Utworzenie pliku `constants.ts`

- Nowy plik: `src/assets/constants.ts`
- Eksport stałej: `CARD_FLIP_DURATION = 750` (ms)
- Centralizacja wartości używanych w wielu miejscach
- Ułatwia późniejsze zmiany – jedna wartość kontroluje wszystkie animacje

### 2. Nowy stan `newGameFlag` w `App.tsx`

- `useState(false)` – flaga sygnalizująca żądanie nowej gry
- `true` → użytkownik kliknął przycisk "Nowa Gra"
- `false` → stan normalny, gra trwa lub zakończona
- Przekazywana do `Board` jako props

### 3. Przycisk "Nowa Gra" w `App.tsx`
```typescript
<div className='newGame'>
  <button onClick={() => { setNewGameFlag(true) }}>Nowa Gra</button>
</div>
```

- Kliknięcie ustawia `newGameFlag` na `true`
- Uruchamia proces resetowania gry w `Board`

### 4. Hook `useEffect` do tasowania w `App.tsx`
```typescript
useEffect(() => {
  if (!newGameFlag) {
    setCards(getBoard(level));
  }
}, [newGameFlag]);
```

**Logika:**
- Uruchamia się gdy `newGameFlag` zmienia wartość
- `if (!newGameFlag)` → tasuje karty dopiero gdy flaga wraca do `false`
- Zapobiega tasowaniu podczas resetowania w `Board`
- Sekwencja: reset w Board → zmiana flagi → tasowanie kart


### 5. Aktualizacja interfejsu `BoardProps`

Nowe propsy:
- `newGameFlag: boolean` – flaga nowej gry
- `setNewGameFlag: (value: boolean) => void` – funkcja zmiany flagi

### 6. Hook `useEffect` do wykrywania resetu w `Board.tsx`
```typescript
useEffect(() => {
  if (newGameFlag) {
    resetGame();
  }
}, [newGameFlag]);
```

- Reaguje na zmianę `newGameFlag`
- Gdy `true` → wywołuje `resetGame()`
- Rozpoczyna proces czyszczenia stanu gry

### 7. Funkcja `resetGame` w `Board.tsx`

**Natychmiastowe akcje:**
- `setPairCards([])` – czyści znalezione pary
- `setFlippedCards([])` – czyści odwrócone karty
- Karty odwracają się z powrotem (animacja trwa `CARD_FLIP_DURATION`)

**Opóźnione akcje (po animacji):**
```typescript
setTimeout(() => {
  setNewGameFlag(false);
  setDisabled(false);
  setIsGameChangePossible(true);
}, CARD_FLIP_DURATION)
```
- Czeka `400ms` na zakończenie animacji
- `setNewGameFlag(false)` → sygnalizuje zakończenie resetu (uruchamia tasowanie w `App`)
- `setDisabled(false)` → odblokowuje klikanie w karty
- `setIsGameChangePossible(true)` → odblokowuje select poziomów

### 8. Zastąpienie liczby stałą

- `setTimeout(..., 750)` → `setTimeout(..., CARD_FLIP_DURATION)`
- Import stałej: `import { CARD_FLIP_DURATION } from "../assets/constants"`
- Spójność czasów animacji w całej aplikacji

### 9. Aktualizacja CSS

**`index.css`:**
- Dodano zmienną CSS: `--card-flip-duration: 400ms`

**`Card.css`:**
- `transition: transform 0.4s` → `transition: transform var(--card-flip-duration)`
- Synchronizacja czasu animacji CSS z logiką Typescript


---

## Kluczowe koncepcje

- **Magic numbers** → **Named constants** – zamiana surowych wartości na nazwane stałe
- **Flag pattern** – użycie boolean flag do sygnalizacji zdarzeń
- **Sekwencyjne efekty** – chain reakcji: przycisk → reset → tasowanie
- **setTimeout** – synchronizacja z animacjami CSS
- **CSS variables** – centralne zarządzanie wartościami stylów
- **Side effects coordination** – koordynacja wielu `useEffect` między komponentami

---

## Przepływ resetowania gry

1. Użytkownik klika "Nowa Gra"
2. `setNewGameFlag(true)` w `App`
3. `useEffect` w `Board` wykrywa zmianę
4. `resetGame()` czyści stan (`pairCards`, `flippedCards`)
5. Karty odwracają się (animacja 400ms)
6. Po animacji: `setNewGameFlag(false)`, odblokowuje planszę i select
7. `useEffect` w `App` wykrywa `newGameFlag === false`
8. `setCards(getBoard(level))` – nowe przetasowane karty
9. Gra gotowa do rozpoczęcia od nowa

---

## Dlaczego taka sekwencja?

- **Najpierw schowanie kart** – wizualny feedback dla użytkownika
- **Potem tasowanie** – uniknięcie "zabłyśnięcia" nowych wartości przed animacją
- **Opóźnienie odblokowania** – zapobiega klikaniu podczas animacji
- **Synchronizacja czasów** – stała `CARD_FLIP_DURATION` zapewnia spójność

---

## Struktura projektu po tym commicie
```
src/
├── assets/
│   ├── boards.ts
│   └── constants.ts       # Stałe globalne
├── components/
│   ├── Board.tsx          # Logika resetu
│   └── Card.tsx
└── App.tsx                # Przycisk i tasowanie
```

---

➡️ Kolejny etap:  
**Commit:** `Dodanie licznika czasu gry`