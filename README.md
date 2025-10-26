# Kurs React - Gra Memory

**Commit:** `Dodanie tablic z kartami i funkcji tasowania`

W tym etapie dodajemy tablice z wartościami kart dla różnych poziomów trudności oraz implementujemy funkcję do losowego tasowania kart.

---

## Zmiany wprowadzone w tym commicie

### 1. Utworzenie pliku `boards.ts`

- Dodano trzy tablice reprezentujące różne poziomy trudności:
  - `easyBoard` – 16 kart (8 par) z literami A-H
  - `mediumBoard` – 24 karty (12 par) z literami A-L
  - `hardBoard` – 36 kart (18 par) z literami A-R
- Każda litera pojawia się dwa razy, tworząc pary do odnalezienia w grze.

### 2. Funkcja tasowania `shuffleArray` w `Board.tsx`

- Implementacja algorytmu tasowania tablicy:
  - Tworzy pustą tablicę `newArray` na wynik
  - Kopiuje oryginalną tablicę za pomocą spread operatora `[...array]`
  - W pętli `while` losuje element z kopii, dodaje do nowej tablicy i usuwa z kopii
  - Używa `Math.random()` i `Math.floor()` do losowania indeksów
  - Zwraca potasowaną tablicę
- Dzięki tej funkcji karty będą za każdym razem w losowej kolejności.

### 3. Aktualizacja komponentu `Board.tsx`

- Import tablic z `boards.ts`: `easyBoard`, `mediumBoard`, `hardBoard`
- Wywołanie `shuffleArray(mediumBoard)` i przypisanie wyniku do `shuffledCards`
- Użycie metody `.map()` do renderowania kart:
  - Iteracja przez tablicę `shuffledCards`
  - Każda karta otrzymuje unikalny `key={index}` (wymagane przez React)
  - Przekazanie wartości karty przez prop `value={card}`

### 4. Aktualizacja komponentu `Card.tsx`

- Dodanie interfejsu TypeScript `CardProps` z właściwością `value: string`
- Komponent przyjmuje prop `value` i wyświetla go w divie
- Określenie typu danej wejściowej do komponentu Card: `{value}: CardProps`

### 5. Stylowanie w `Board.css`

- Dodano `grid-template-columns: repeat(4, var(--card-size))` – 4 kolumny o szerokości karty
- Dodano `gap: var(--gap)` – odstępy między kartami

---

## Kluczowe koncepcje

- **Array.map()** – transformacja tablicy na listę komponentów React
- **Spread operator (`...`)** – kopiowanie tablicy bez modyfikacji oryginału
- **TypeScript interface** – definiowanie struktury propsów komponentu
- **Key prop** – unikalny identyfikator dla elementów listy w React
- **CSS Grid** – układ planszy z czterema kolumnami

---

## Struktura projektu po tym commicie
```
src/
├── assets/
│   └── boards.ts          # Tablice z kartami
├── components/
│   ├── Board.tsx          # Plansza z logiką tasowania
│   └── Card.tsx           # Pojedyncza karta przyjmująca wartość
└── styles/
    ├── Board.css          # Grid layout planszy
    └── Card.css
```

---

➡️ Kolejny etap:  
**Commit:** `Dodanie dynamicznej zmiany poziomu`