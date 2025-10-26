# Kurs React - Gra Memory

**Commit:** `Implementacja odwracania kart i logiki gry`

W tym etapie dodajemy mechanizm odwracania kart z animacją 3D. Każda karta może zostać kliknięta i odwróci się, pokazując swoją wartość.

---

## Zmiany wprowadzone w tym commicie

### 1. Dodanie stanu `flipped` w `Card.tsx`

- Import hooka `useState` z React
- Utworzenie stanu `flipped` z wartością początkową `false`
- `setFlipped` – funkcja do zmiany stanu karty (odwrócona/zakryta)

### 2. Funkcja `handleClick`

- Obsługuje kliknięcie w kartę
- `setFlipped(!flipped)` – przełącza stan na przeciwny (true ↔ false)
- Negacja `!` odwraca wartość logiczną

### 3. Struktura HTML karty

- Trzy zagnieżdżone divy tworzące efekt 3D:
  - `.card` – zewnętrzny kontener
  - `.card-inner` – element obracany
  - `.card-front` – przód karty (znak zapytania `?`)
  - `.card-back` – tył karty (wartość karty)

### 4. Dynamiczne klasy CSS

- `className={\`card ${flipped ? 'flipped' : ''}\`}` – warunkowe dodawanie klasy
- Operator trójargumentowy (ternary): `warunek ? wartość_true : wartość_false`
- Gdy `flipped === true` → klasa `card flipped`
- Gdy `flipped === false` → klasa `card`

### 5. Stylowanie animacji 3D w `Card.css`

**`.card-inner`:**
- `position: relative` – punkt odniesienia dla dziecka elementu z `position: absolute`
- `transform-style: preserve-3d` – zachowanie przestrzeni 3D dla dziecka elementu
- `transition: transform 0.4s` – płynna animacja obrotu przez 0.4 sekundy

**`.card.flipped .card-inner`:**
- `transform: rotateY(180deg)` – obrót wokół osi Y o 180 stopni
- Selektor potomny: efekt stosowany tylko gdy karta ma klasę `flipped`

**`.card-front` i `.card-back`:**
- `position: absolute` – nakładanie się elementów
- `width: 100%` i `height: 100%` – wypełnienie całego kontenera
- `backface-visibility: hidden` – ukrycie niewidocznej strony karty

**`.card-back`:**
- `transform: rotateY(180deg)` – początkowy obrót - rewers karty z literą alfabetu

---

## Kluczowe koncepcje

- **useState w komponencie** – każda karta ma własny niezależny stan
- **Event handling** – `onClick={handleClick}` reaguje na kliknięcie
- **Operator trójargumentowy** – zwięzłe wyrażenia warunkowe
- **CSS 3D transforms** – `rotateY()`, `transform-style`, `backface-visibility`
- **CSS transitions** – płynne animacje między stanami
- **Selektory potomne CSS** – `.card.flipped .card-inner` stosuje style tylko dla odwróconych kart

---

## Przepływ interakcji

1. Użytkownik klika kartę
2. `handleClick` odwraca wartość `flipped` (false → true)
3. Klasa `flipped` jest dodawana do diva `.card`
4. CSS obraca `.card-inner` o 180 stopni
5. Widoczna staje się `.card-back` z wartością karty
6. Ponowne kliknięcie odwraca kartę z powrotem

---

## Struktura komponentu Card
```
<div className="card [flipped]">      ← stan i kliknięcie
  <div className="card-inner">        ← obraca się
    <div className="card-front">?</div>      ← przód
    <div className="card-back">{value}</div>  ← tył
  </div>
</div>
```

---

➡️ Kolejny etap:  
**Commit:** `Dodanie sprawdzania par kart`