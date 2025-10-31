# Kurs React - Gra Memory

**Commit:** Finalne poprawki stylów i UX

W tym etapie usuwamy style debugujące i dodajemy profesjonalny design system oparty na gradientach, cieniach i spójnych zmiennych CSS.

---

## Kluczowe koncepcje CSS

### **CSS Grid Layout**
```css
grid-template-columns: 1fr 2fr 1fr;
```
- `fr` (fraction) – jednostka elastyczna, dzieli przestrzeń proporcjonalnie
- `1fr 2fr 1fr` = lewa 25%, środek 50%, prawa 25%
- Działa na każdym rozmiarze ekranu

### **Linear Gradients**
```css
linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)
```
- `135deg` – kąt przekątny (z lewego górnego do prawego dolnego rogu)
- `0%` i `100%` – punkty początkowy i końcowy przejścia kolorów

### **Box Shadows (hierarchia głębi)**
```css
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```
- Pierwszy parametr (0) – przesunięcie X
- Drugi (20px) – przesunięcie Y (w dół)
- Trzeci (25px) – rozmycie
- Czwarty (-5px) – spread (ujemna wartość zmniejsza cień)
- Ostatni – kolor z transparencją

### **CSS Variables**
```css
var(--primary)
var(--gap)
```
- Spójność wartości w całej aplikacji
- Zmiana w jednym miejscu (:root) aktualizuje wszędzie
- Lepsza czytelność kodu (nazwy zamiast magicznych liczb)

### **Hover States**
```css
button:hover {
  background-color: var(--secondary);
}
```
- Pseudo-klasa `:hover` – feedback interakcji, w momencie jak najedziemy na element - wykonuje się, to co jest podane w arkuszu stylów, dla momentu :hover
- Sygnalizuje użytkownikowi, że element jest klikalny

---

## Zmiany w plikach

### **App.css**

#### #root
```css
#root { 
  margin: 0 auto;
  max-width: 1200px;
  text-align: center;
  padding-top: 10px;
}
```
- `max-width: 1200px` – ograniczenie szerokości na dużych ekranach
- `margin: 0 auto` – wyśrodkowanie kontenera

#### .app
```css
.app {
  display: grid;
  gap: var(--gap);
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```
**Usunięto:** `border: 2px solid yellow` (debug)  
**Dodano:** białe tło, duże zaokrąglenie (16px), głęboki cień

#### .controls
```css
.controls {
  display: flex;
  justify-content: center;
  align-items: center;
}

.controls label {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: var(--gap);
  font-weight: bold;
}

.controls select {
  padding: 8px 12px;
  border-radius: var(--radius);
  background: var(--primary);
  font-size: 14px;
  color: var(--bg);
}

.controls select:hover {
  background-color: var(--secondary);
  cursor: pointer;
}
```
- `flex-direction: column` – elementy wewnątrz będą się wyświetlały od góry do dołu
- `color: var(--bg)` – biały tekst na kolorowym tle
- Hover z kolorem `--secondary` i `cursor: pointer`

#### button (globalny)
```css
button {
  padding: 8px 16px;
  background-color: var(--primary);
  border: none;
  border-radius: var(--radius);
  cursor: pointer;
  color: var(--bg);
  font-size: 14px;
  box-shadow: var(--box-shadow);
}

button:hover {
  background-color: var(--secondary);
}
```
- `border: none` – usuwa domyślne obramowanie przeglądarki
- Selektor elementu (nie klasy) – wszystkie przyciski dziedziczą styl

---

### **index.css**

```css
body {
  margin: 0;
  font-family: sans-serif;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  min-height: 100vh;
}
```
- `min-height: 100vh` – gradient wypełnia całą wysokość ekranu

---

### **Board.css**

#### .game-container (nowy)
```css
.game-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 24px;
  align-items: start;
}
```
- Trzy kolumny: statystyki | plansza | wyniki
- `align-items: start` – wyrównanie do góry

#### .board
```css
.board {
  display: grid;
  justify-content: center;
  background: transparent;
  grid-template-columns: repeat(4, var(--card-size));
  gap: var(--gap);
  padding: 10px;
  padding-bottom: 20px;
}
```
**Usunięto:** `background-color: red` (debug)  
**Dodano:** `background: transparent` – widoczny gradient z body

#### Poziomy trudności
```css
.board.easy {
  grid-template-columns: repeat(4, var(--card-size));
}

.board.medium {
  grid-template-columns: repeat(4, var(--card-size));
}

.board.hard {
  grid-template-columns: repeat(6, var(--card-size));
}
```
- Easy/Medium: 4 kolumny
- Hard: 6 kolumn
- `repeat(n, var(--card-size))` – powtórzenie kolumn ze zmienną

---

### **Card.css**

#### .card
```css
.card {
  width: var(--card-size);
  height: var(--card-size);
  cursor: pointer;
  border: none;
}
```
**Usunięto:** `border: 2px dashed blue` (debug)

#### .card-front (awers - zakryty)
```css
.card-front {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
}
```
- dodano gradient na tło w przypadku nie wyświetlenia się zdjęcia

#### .card-back (rewers - odkryty)
```css
.card-back {
  transform: rotateY(180deg);
  border: 2px solid black;
  font-size: 48px;
}
```
**Usunięto:** `background-color: greenyellow` (teraz inline style w TS)  
**Dodano:** czarna ramka, duża czcionka dla fallbacku tekstowego

---

### **GameStats.css** (nowy plik)

```css
.game-stats {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: var(--radius);
  background: #fafafa;
  font-family: sans-serif;
  font-size: 14px;
  box-shadow: var(--shadow);
  justify-content: center;
  margin-top: 20px;
}

.game-stats div {
  text-align: center;
}

.game-stats p {
  font-size: 12px;
  color: #666;
}
```
- `#fafafa` – bardzo jasny szary (subtelne odróżnienie od białego)
- `#ddd` – jasny szary dla obramowania
- `#666` – ciemnoszary dla tekstu drugorzędnego
- `font-size: 12px` dla `<p>` – status gry mniej ważny niż liczby

---

## Hierarchia wizualna

```
Body (gradient tła)
  └─ #root (max-width 1200px, wyśrodkowany)
      └─ .app (biała karta z cieniem)
          ├─ .controls (wybór poziomu)
          ├─ .game-container (Grid 1fr 2fr 1fr)
          │   ├─ .game-stats (lewa kolumna)
          │   ├─ .board (środkowa 2x szersza)
          │   └─ .game-scores (prawa kolumna)
          └─ button (nowa gra)
```

**Poziomy cieni (depth layers):**
1. `.app` – najgłębszy cień (aplikacja unosi się nad tłem)
2. `button` – średni cień (przyciski nad kartą)
3. `.game-stats` – subtelny cień (panele delikatnie oddzielone)

---

## Paleta kolorów

**Zmienne CSS (:root):**
- `--primary` – główny kolor (gradienty, przyciski)
- `--secondary` – kolor drugorzędny (hover states)
- `--bg` – biały (tekst na kolorowym tle)
- `--gap` – standardowy odstęp
- `--radius` – standardowe zaokrąglenie (~8px)
- `--card-size` – rozmiar karty
- `--box-shadow` – cień przycisków
- `--shadow` – cień paneli

**Dodatkowe kolory:**
- `white` – tło .app
- `#fafafa` – tło GameStats
- `#ddd` – obramowania
- `#666` – tekst drugorzędny
- `black` – obramowanie odkrytej karty

---

## Podsumowanie zmian

**Usunięto:** wszystkie debugowe obramowania i testowe kolory  
**Dodano:** 
- System gradientów (spójność wizualna)
- Box shadows (3 poziomy głębi)
- Layout Grid z elastycznymi proporcjami
- Hover states (feedback interakcji)
- Semantyczny HTML
- Osobny plik CSS dla GameStats

**Zastosowane zasady:**
1. Spójność – te same kolory, zaokrąglenia, cienie
2. Hierarchia – różne poziomy cieni pokazują ważność
3. Feedback – hover sygnalizuje interaktywność
4. Responsywność – jednostki fr i vh zamiast pikseli

---

### Credits

Fruit graphics by [Conania](https://www.iconfinder.com/iconsets/fruit-and-vegetable-15), licensed under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/).  
Used in accordance with the license.

---

➡️ Kolejny etap:  
**Commit:** `Dodanie tablicy najlepszych wyników z cookies`