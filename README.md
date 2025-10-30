# Kurs React - Gra Memory

**Commit:** `Obrazki <img> jako awers i rewers karty`

W tym etapie dodajemy grafiki do kart oraz dynamiczne kolory tła. Każda karta otrzymuje unikalny obrazek i kolor względem obrazka.

---

## Zmiany wprowadzone w tym commicie

### 1. Utworzenie pliku `images.ts`

**Import obrazków:**
- Importy grafik dla kart A-T z folderu `./images/card_back/`
- Import grafiki awers karty: `front.png` z `./images/card_front/`

**Obiekt kolorów `c`:**
```typescript
const c = {
  yellow: '#fad50a',
  red: '#f2433a',
  green: '#8ebf04',
  purple: '#7b3d72',
  orange: '#f78d0f'
};
```
- Centralizacja definicji kolorów
- Łatwiejsza zmiana palety w przyszłości

**`colorMap` – mapowanie liter na kolory:**
```typescript
export const colorMap: Record<string, string> = {
  'A': c.yellow,
  'B': c.red,
  // ... itd
};
```
- Typ `Record<string, string>` – obiekt z kluczami i wartościami typu string
- Każda litera ma przypisany konkretny kolor tła

**`imageMap` – mapowanie liter na obrazki:**
```typescript
export const imageMap: Record<string, string> = {
  A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, front
};
```
- Skrócona składnia: `A` to `A: (link_do_src)` (klucz i wartość)
- `front` – specjalny klucz dla awersu karty

### 2. Nowy stan `imageSrc` w `Card.tsx`
```typescript
const [imageSrc, setImageSrc] = useState<string | null>(null);
```
- Przechowuje URL obrazka dla danej karty
- `string` – gdy obrazek istnieje
- `null` – gdy brak obrazka (fallback na tekst)

### 3. Hook `useEffect` do ładowania obrazków
```typescript
useEffect(() => {
  if (imageMap[value]) {
    setImageSrc(imageMap[value]);
  } else {
    setImageSrc(null);
  }
}, [value]);
```

**Logika:**
- `imageMap[value]` – sprawdza czy istnieje obrazek dla danej litery
- Jeśli tak → ustawia URL obrazka
- Jeśli nie → ustawia `null` (wyświetli się tekst)
- Dependency `[value]` – reaguje na zmianę wartości karty

### 4. Pobranie obrazka i koloru przed renderem
```typescript
const cardFront = imageMap['front'];
const cardColor = colorMap[value] || 'lightgray';
```

**`cardFront`:**
- Pobiera obrazek awersu (ten sam dla wszystkich kart)

**`cardColor`:**
- Pobiera kolor dla danej litery z `colorMap`
- Operator `||` – fallback na `'lightgray'` jeśli brak koloru
- Zabezpieczenie przed undefined

### 5. Aktualizacja struktury TSX

**Awers karty (`.card-front`):**
```typescript
<div className='card-front'>
  <img src={cardFront} alt="Awers karty" />
</div>
```
- Usuniecie znaku zapytania `?`
- Obrazek z `imageMap['front']`

**Rewers karty (`.card-back`):**
```typescript
<div className='card-back' style={{ backgroundColor: cardColor }}>
  {imageSrc ? (
    <img src={imageSrc} alt={`Karta ${value}`} className="card-image" />
  ) : (
    <span>{value}</span>
  )}
</div>
```

**Inline style:**
- `style={{ backgroundColor: cardColor }}` – dynamiczne tło
- Overriduje domyślny kolor z CSS

**Warunkowe renderowanie:**
- `imageSrc ? <img> : <span>` – operator trójargumentowy
- Jeśli obrazek istnieje → wyświetl `<img>`
- Jeśli nie → wyświetl literę w `<span>`
- Fallback zapewnia działanie nawet gdy brak grafiki

### 6. Aktualizacja stylów w `Card.css`

**Wspólne style dla `.card-front` i `.card-back`:**
```css
.card-front,
.card-back {
  /* ... istniejące style ... */
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: flex;
  justify-content: center;
  align-items: center;
}
```

- `border-radius` – zaokrąglone rogi
- `box-shadow` – subtelny cień
- `display: flex` – flexbox do centrowania
- `justify-content: center` – wyśrodkowanie poziome
- `align-items: center` – wyśrodkowanie pionowe

**Style dla obrazków:**
```css
.card-front img, .card-back img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius);
}
```

- `width/height: 100%` – wypełnienie całej karty
- `object-fit: cover` – zachowanie proporcji, przycinanie nadmiaru
- `border-radius` – dopasowanie do zaokrąglonych rogów karty

---

## Kluczowe koncepcje

- **Static imports w Vite** – `import A from './images/A.png'` zwraca URL
- **Record type** – `Record<string, string>` dla obiektów klucz-wartość
- **Inline styles** – `style={{ backgroundColor }}` dla dynamicznych wartości
- **Conditional rendering** – `{condition ? <A> : <B>}` dla fallbacków
- **object-fit: cover** – responsywne obrazki bez deformacji
- **Fallback values** – `|| 'lightgray'` gdy brak wartości w mapie
- **Shorthand object literals** – `{A, B}` zamiast `{A: A, B: B}`

---

## Przepływ ładowania obrazków

1. Komponent `Card` otrzymuje props `value` (np. `'A'`)
2. `useEffect` uruchamia się przy montowaniu/zmianie `value`
3. Sprawdzenie `imageMap['A']` → zwraca URL obrazka
4. `setImageSrc(URL)` → aktualizuje stan
5. Render: `cardColor = colorMap['A']` → `'#fad50a'`
6. JSX renderuje `<img src={URL}>` na żółtym tle

---

## Struktura katalogów z obrazkami
```
src/
├── assets/
│   ├── images/
│   │   ├── card_back/
│   │   │   ├── A.png
│   │   │   ├── B.png
│   │   │   └── ... (C-T)
│   │   └── card_front/
│   │       └── front.png
│   └── images.ts        # mapy i importy
└── components/
    └── Card.tsx
```

---

## Fallback mechanism
```typescript
// Obrazek nie istnieje w imageMap
value = 'Z'
imageSrc = null
→ renderuje <span>Z</span>

// Kolor nie istnieje w colorMap
value = 'Z'
cardColor = 'lightgray'  // fallback
→ szare tło
```

### Credits

Fruit graphics by [Conania](https://www.iconfinder.com/iconsets/fruit-and-vegetable-15), licensed under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/).  
Used in accordance with the license.


---

➡️ Kolejny etap:  
**Commit:** `Finalne poprawki stylów i UX`