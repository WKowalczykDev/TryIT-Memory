# Kurs React - Gra Memory

**Commit:** `Wykrywanie końca gry`

W tym etapie implementujemy mechanizm wykrywania momentu, gdy wszystkie pary kart zostały odkryte. Po zakończeniu gry odblokowujemy możliwość zmiany poziomu.

---

## Zmiany wprowadzone w tym commicie

### 1. Import hooka `useEffect` w `Board.tsx`

- Dodano import `useEffect` z React
- Umożliwia reagowanie na zmiany stanu gry

### 2. Funkcja `gameEndDetected`

- Wywoływana po odkryciu wszystkich par
- `console.log("Gra zakończona")` – informacja w konsoli (F12)
- `setIsGameChangePossible(true)` – odblokowuje select z poziomami trudności
  - pojawia się nam problem ze zmianą poziomu z odkrytmi już kartami - zaimplementujemy w kolejnym commicie

### 3. Hook `useEffect` do wykrywania końca gry

**Warunek zakończenia gry:**
```typescript
if (pairCards.length === cards.length && cards.length > 0)
```

**Logika warunku:**
- `pairCards.length === cards.length` – liczba odkrytych kart równa liczbie wszystkich kart
- `cards.length > 0` – dodatkowe zabezpieczenie przed pustą planszą
- Oba warunki muszą być spełnione (`&&`)

**Wywołanie funkcji:**
- Gdy warunek spełniony → `gameEndDetected()` wykonuje akcje końcowe

**Dependency array:**
- `[pairCards]` – effect uruchamia się tylko przy zmianie tablicy znalezionych par
- Nie reaguje na niepotrzebne zmiany innych stanów

---

## Kluczowe koncepcje

- **Dependency array** – kontrola momentu uruchomienia effectu
- **Porównanie długości tablic** – sprawdzanie postępu gry
- **Zabezpieczenia warunkowe** – `cards.length > 0` chroni przed błędami

---

## Przepływ zakończenia gry

1. Użytkownik znajduje ostatnią parę kart
2. Karty dodawane są do `pairCards`
3. `useEffect` wykrywa zmianę w `pairCards`
4. Sprawdzenie warunku: `pairCards.length === cards.length`
5. Warunek spełniony → `gameEndDetected()` jest wywoływana
6. Komunikat w konsoli: "Gra zakończona"
7. `setIsGameChangePossible(true)` odblokowuje select poziomów
8. Użytkownik może wybrać nowy poziom i zagrać ponownie

---

## Dlaczego `cards.length > 0`?

- Zabezpieczenie przed sytuacją, gdy obie tablice są puste (0 === 0)
- W momencie inicjalizacji komponentu mogłoby to błędnie wykryć koniec gry
- Zapewnia, że gra rzeczywiście została rozegrana

---

## Optymalizacja

- Effect reaguje tylko na `pairCards`, ignorując zmiany w `flippedCards` czy `disabled`
- Minimalizuje niepotrzebne sprawdzenia warunku
- Poprawa wydajności aplikacji

---

➡️ Kolejny etap:  
**Commit:** `Dodanie przycisku resetowania gry`