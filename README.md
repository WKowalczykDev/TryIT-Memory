# Kurs React - Gra Memory

**Commit:** `Dodanie sprawdzania par kart`

W tym etapie przenosimy logikę odwracania kart do komponentu `Board` i implementujemy mechanizm sprawdzania, czy dwie odwrócone karty tworzą parę.

---

## Zmiany wprowadzone w tym commicie

### 1. Przeniesienie stanu z `Card` do `Board`

- Stan `flipped` przeniesiony z pojedynczej karty do `Board`
- Centralne zarządzanie wszystkimi odwróconymi kartami
- Umożliwia porównywanie kart między sobą

### 2. Nowy interfejs `FlippedCard` w `Board.tsx`

- Definiuje strukturę obiektu reprezentującego odwróconą kartę
- `index: number` – pozycja karty na planszy
- `value: string` – wartość karty (litera)

### 3. Stany w komponencie `Board`

**`pairCards`** – tablica znalezionych par:
- Przechowuje karty, które pasują do siebie
- Karty z tej tablicy pozostają odwrócone

**`flippedCards`** – tablica tymczasowo odwróconych kart:
- Przechowuje aktualnie odkryte karty (maksymalnie 2)
- Czyszczona po sprawdzeniu pary

**`disabled`** – blokada interakcji:
- `true` – użytkownik nie może klikać w karty
- `false` – użytkownik może klikać
- Zapobiega odwracaniu wielu kart jednocześnie

### 4. Funkcja `handleCardClick`

**Walidacja kliknięcia:**
- `if (disabled) return` – ignoruje kliknięcia gdy plansza zablokowana
- `.find(myCard => myCard.index == index)` sprawdza czy karta już odwrócona w `flippedCards` lub `pairCards`
- Zapobiega wielokrotnemu klikaniu tej samej karty

**Dodawanie karty:**
- `newFlippedCards = [...flippedCards, { index, value }]` – dodaje nową kartę
- Spread operator tworzy nową tablicę z dotychczasowymi kartami + nowa

**Sprawdzanie pary (gdy `length === 2`):**
- **Para znaleziona** (`newFlippedCards[0].value === value`):
  - Dodaje obie karty do `pairCards`
  - Czyści `flippedCards`
- **Para nie znaleziona**:
  - `setDisabled(true)` – blokuje planszę
  - `setTimeout` po 400ms:
    - Czyści `flippedCards` (karty odwracają się z powrotem)
    - Odblokowuje planszę `setDisabled(false)`

### 5. Aktualizacja komponentu `Card.tsx`

**Uproszczenie komponentu:**
- `flipped: boolean` – czy karta jest odwrócona (kontrolowane z `Board`)
- `onClickToBoard: () => void` – funkcja wywoływana przy kliknięciu - wykonuje się w `Board`

### 6. Przekazywanie propsów w `Board.tsx`

**Prop `flipped`:**
```typescript
flipped={(flippedCards.find((card) => card.index === index) ||
         pairCards.find((card) => card.index === index)) ? true : false}
```
- Sprawdza czy dana karta z mapy o danym `index` jest w `flippedCards` lub `pairCards`
  - `find()` albo znajdzie obiekt w jednej z tablic - wtedy go zwraca, czyli istnieje
  - bądź nie znajdzie i wtedy zwróci _undefined_, czyli nie istnieje
- Operator `||` (OR) – prawda jeśli w którejkolwiek tablicy
- Zwraca `true` (odwrócona) lub `false` (zakryta)

**Prop `onClickToBoard`:**
```typescript
onClickToBoard={() => handleCardClick(index, card)}
```
- Funkcja strzałkowa pokazuje, że po kliknięciu w Card.tsx przekazujemy jej index i nazwę (alfabet) do handleCardClick w Board.tsx
- Przekazuje `index` i wartość `card` do funkcji obsługującej

---

## Kluczowe koncepcje

- **Lifting state up** – przeniesienie stanu wyżej w hierarchii komponentów
- **Array.find()** – wyszukiwanie elementu w tablicy
- **Spread operator** – kopiowanie i rozszerzanie tablic
- **setTimeout** – opóźnione wykonanie kodu
- **Asynchroniczność useState** – używanie `newFlippedCards` zamiast czekania na update
- **Callback props** – przekazywanie funkcji do komponentów potomnych
- **Disabled state** – blokowanie interakcji podczas animacji

---

## Przepływ logiki gry

1. Użytkownik klika pierwszą kartę → dodana do `flippedCards`
2. Użytkownik klika drugą kartę → dodana do `flippedCards` (length === 2)
3. **Jeśli wartości są takie same:**
   - Obie karty trafiają do `pairCards`
   - `flippedCards` jest czyszczone
   - Karty pozostają odwrócone
4. **Jeśli wartości są różne:**
   - Plansza zostaje zablokowana (`disabled = true`)
   - Po 400ms karty odwracają się (czyszczenie `flippedCards`)
   - Plansza zostaje odblokowana (`disabled = false`)

---

## Struktura przykładowych danych w momencie przechwycenia nowej pary
```typescript
flippedCards: [
  { index: 3, value: 'A' },
  { index: 7, value: 'A' }
]

pairCards: [
  { index: 0, value: 'B' },
  { index: 5, value: 'B' },
  { index: 3, value: 'A' },
  { index: 7, value: 'A' }
]
```

---

➡️ Kolejny etap:  
**Commit:** `Zablokowanie zmiany poziomu podczas rozgrywki`