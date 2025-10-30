# Kurs React - Gra Memory

**Commit:** `Dodanie licznika czasu gry`

W tym etapie implementujemy licznik czasu mierzący czas rozgrywki. Timer startuje wraz z pierwszym kliknięciem karty i zatrzymuje się po wygraniu gry.

---

## Zmiany wprowadzone w tym commicie

### 1. Nowe stany w `Board.tsx`

**`timer`:**
- `useState<number>(0)` – przechowuje czas gry w sekundach

**`timerID`:**
- `useState<number | undefined>(undefined)` – przechowuje ID interwału
- `number` → gdy timer działa (ID zwrócone przez `setInterval`)
- `undefined` → gdy timer jest zatrzymany
- Potrzebne do późniejszego zatrzymania licznika

### 2. Funkcja `startTimer`
```typescript
const startTimer = () => {
  if (timerID) return;
  setTimerID(setInterval(() => {
    setTimer(prevTimer => {
      return prevTimer + 0.1;
    });
  }, 100));
}
```

**Logika:**
- `if (timerID) return` – nie uruchamia nowego timera jeśli już działa - dodatkowe zabezpieczenie
- `setInterval(..., 100)` – wykonuje funkcję co 100ms (0.1 sekundy)
- `prevTimer => prevTimer + 0.1` – zwiększa czas o 0.1s przy każdym wywołaniu
  - Użycie **functional update** (`prevTimer`) – zapewnia dokładność przy asynchronicznych aktualizacjach
  - Używamy tego zamiast wywołania `setTimer(timer + 0.1)`
  - Użycie struktury z prevTimer daje nam **pewność**, że poprawnie zmienimy wartość timera
- `setTimerID(...)` – zapisuje ID interwału do stanu

### 3. Funkcja `stopTimer`
```typescript
const stopTimer = () => {
  if (timerID) {
    clearInterval(timerID);
    setTimerID(undefined);
  }
}
```

**Logika:**
- `if (timerID)` – sprawdza czy timer działa
- `clearInterval(timerID)` – zatrzymuje interwał
- `setTimerID(undefined)` – czyści stan (oznacza timer jako nieaktywny)

### 4. Integracja z `handleGameStart`
```typescript
const handleGameStart = () => {
  setIsGameChangePossible(false);
  setTimer(0);          // resetowanie licznika
  startTimer();         // uruchomienie timera
}
```

- `setTimer(0)` – zeruje czas przed startem (bezpieczeństwo)
- `startTimer()` – rozpoczyna odliczanie

### 5. Aktualizacja warunku startowego
```typescript
if (flippedCards.length === 0 && pairCards.length === 0 && timer === 0) {
  handleGameStart();
}
```

- Dodano warunek `&& timer === 0`
- Zapobiega wielokrotnemu uruchomieniu timera
- Gra rozpoczyna się tylko gdy wszystkie warunki spełnione

### 6. Zatrzymanie timera w `gameWonDetected`
```typescript
const gameWonDetected = () => {
  stopTimer();
  console.log("GRA WYGRANA!");
  alert("Gratulacje! Wygrałaś/eś grę! w czasie: " + timer.toFixed(1) + " sekund.");
}
```

- `stopTimer()` – zatrzymuje licznik po wygraniu
- `timer.toFixed(1)` – formatuje czas do 1 miejsca po przecinku
- Alert pokazuje końcowy czas gry

### 7. Reset timera w `resetGame`
```typescript
const resetGame = () => {
  setPairCards([]);
  setFlippedCards([]);
  stopTimer();          // zatrzymanie licznika
  setTimer(0);          // zerowanie czasu
  setTimeout(() => {
    setNewGameFlag(false);
    setDisabled(false);
    setIsGameChangePossible(true);
  }, CARD_FLIP_DURATION)
}
```

- `stopTimer()` – zatrzymuje działający timer
- `setTimer(0)` – resetuje czas do 0
- Przygotowuje stan do nowej gry

### 8. Hook `useEffect` do debugowania (tymczasowy)
```typescript
useEffect(() => {
  console.log("minęło " + timer.toFixed(1) + " sekund");
}, [timer]);
```

- Wyświetla aktualny czas w konsoli deweloperskiej
- Gdy zostanie zmieniony state: `[timer]` - useEffect się wykonuje
- Przydatne do testowania, zostanie usunięte w przyszłości kiedy zostanie stworzony element wyświetlający statystyki

---

## Kluczowe koncepcje

- **setInterval** – wykonywanie funkcji w regularnych odstępach czasu
- **clearInterval** – zatrzymywanie interwału
- **Functional updates** – `prevTimer => prevTimer + 0.1` zapewnia poprawność przy asynchronicznych aktualizacjach
- **Timer ID management** – przechowywanie ID do późniejszego zatrzymania
- **Precision timing** – interwał 100ms dla precyzji 0.1s
- **toFixed()** – formatowanie liczb zmiennoprzecinkowych

---

## Przepływ timera

1. Użytkownik klika pierwszą kartę
2. `handleCardClick` wykrywa start gry (`timer === 0`)
3. `handleGameStart()` → `setTimer(0)` → `startTimer()`
4. `setInterval` uruchamia się co 100ms
5. `setTimer(prevTimer => prevTimer + 0.1)` zwiększa czas
6. Timer działa aż do:
   - **Wygrana:** `gameWonDetected()` → `stopTimer()`
   - **Reset:** `resetGame()` → `stopTimer()` + `setTimer(0)`
7. Po zatrzymaniu: `clearInterval(timerID)` + `setTimerID(undefined)`

---

## Dlaczego functional update?
```typescript
// ❌ Źle - może tracić aktualizacje
setTimer(timer + 0.1);

// ✅ Dobrze - zawsze dokładne
setTimer(prevTimer => prevTimer + 0.1);
```

- React może batchować (grupować) aktualizacje stanu
- Functional update gwarantuje dostęp do najnowszej wartości
- Szczególnie ważne w szybko powtarzających się aktualizacjach (setInterval)

---

## Bezpieczeństwo

- **Zabezpieczenie przed duplikatami:** `if (timerID) return` w `startTimer`
- **Sprawdzanie przed czyszczeniem:** `if (timerID)` w `stopTimer`
- **Warunek startowy:** `timer === 0` zapobiega wielokrotnemu startowi timera
- **Cleanup:** zawsze `clearInterval` przed `setTimerID(undefined)`

---

## Struktura stanu timera
```typescript
// Timer zatrzymany
timer: 0
timerID: undefined

// Timer działa
timer: 15.3
timerID: 42 (przykładowe ID)

// Timer po zatrzymaniu
timer: 15.3 (ostatnia wartość)
timerID: undefined
```

---

➡️ Kolejny etap:  
**Commit:** `Dodanie komponentu GameStats z wyświetlaniem statystyk`