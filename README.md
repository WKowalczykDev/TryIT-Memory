# Kurs React - Gra Memory

**Commit:** `Podstawowa struktura aplikacji`
W tym etapie tworzymy początkowy szkielet gry Memory w React.

---

## Zmiany wprowadzone w tym commicie

### 1. Aktualizacja `index.html`

- Ustawiono język strony (`lang="pl"`) i kodowanie UTF-8 - chcemy aby program rozumiał znaki polskie.
- Ustawiono favicon (`tryit.ico`). - ikonka w oknie strony w przeglądarce
- Utworzono `<div id="root"></div>` — punkt montowania aplikacji React.

### 2. Stylowanie globalne (`index.css` / `App.css`)

- `#root` – centrowanie zawartości i wyśrodkowanie tekstu.
- `.app` – główny kontener aplikacji jako grid, obramowanie w kolorze żółtym.
- Zdefiniowano zmienne CSS (`:root`) dla kolorów, rozmiaru kart, odstępów, cieni i zaokrągleń.
- Body – reset marginesów, ustawienie fontu i tła.
- `.board` – plansza gry wyśrodkowana i wyróżniona czerwonym tłem.
- `.card` – pojedyncza karta z rozmiarem, kursorem wskazującym możliwość kliknięcia i niebieskim, przerywanym obramowaniem.

### 3. Główny komponent `App.tsx`

- Import stylów `App.css`.
- Import komponentu `Board`.
- Renderowanie nagłówka `<h1>Gra Memory</h1>` i komponentu `<Board />`.
- Kontener `.app` jako grid, przygotowany na późniejsze komponenty gry.

### 4. Komponent `Board.tsx`

- Import komponentu `Card` i stylów `Board.css`.
- Renderowanie planszy gry z nagłówkiem `<h2>Plansza</h2>` i trzema przykładowymi kartami.
- Kontener `.board` jako grid.

### 5. Komponent `Card.tsx`

- Import stylów `Card.css`.
- Renderowanie pojedynczej karty z przykładową zawartością `🃏 Karta 🃏`.
- Klasa `.card` tworzy każdą poszczególną kartę w naszej grze

---

## Struktura projektu po tym commicie
```
src/
├── App.tsx
├── App.css
├── components/
│ ├── Board.tsx
│ └── Card.tsx
├── styles/
│ ├── Board.css
│ └── Card.css
└── main.tsx
```

- **`App.tsx`** – główny kontener aplikacji  
- **`Board.tsx`** – plansza gry  
- **`Card.tsx`** – pojedyncza karta  
- **`styles/`** – osobne pliki CSS dla komponentów

---

## Przepływ działania aplikacji

1. `index.html` ładuje `<div id="root"></div>`.  
2. `main.tsx` montuje komponent `App` w tym divie.  
3. `App.tsx` wyświetla nagłówek i planszę (`Board`).  
4. `Board.tsx` renderuje przykładowe karty (`Card`).  
5. Style CSS nadają wygląd kontenerom, planszy i kartom.

---

➡️ Kolejny etap:  
**Commit:** `Stworzenie tablicy z kartami`
