# Kurs React - Gra Memory

Pierwszy commit projektu — inicjalizacja środowiska **Vite + React + TypeScript**.  
Utworzono podstawową strukturę folderów oraz konfigurację plików

Projekt gotowy do rozpoczęcia implementacji gry Memory w React.

## Struktura projektu po utworzeniu przez Vite

### 📁 Główne katalogi i pliki

- **`public/`**  
  Folder na pliki statyczne — wszystko, co się w nim znajduje, trafi do finalnej wersji aplikacji (np. favicony, obrazki, manifest).

- **`src/`**  
  Główne źródło kodu aplikacji React. Tutaj znajdują się wszystkie komponenty, style i logika gry.

  - **`App.tsx`**  
    Główny komponent aplikacji — “centrum sterowania”.  
    Po instalacji projektu pokazuje przykładowe logo React i tekst, a później będziemy tu łączyć nasze własne komponenty (np. planszę gry, karty, statystyki).

  - **`App.css`**  
    Style CSS dla komponentu `App`.

  - **`assets/`**  
    Folder na zasoby wykorzystywane w aplikacji (np. obrazki kart, tablice wartości).

  - **`index.css`**  
    Globalne style dla całej aplikacji — czcionki, kolory, reset stylów.

  - **`main.tsx`**  
    Punkt startowy aplikacji — łączy React z HTML-em.  
    W tym pliku komponent `App` jest montowany do elementu `<div id="root"></div>` w pliku `index.html`.

  - **`vite-env.d.ts`**  
    Techniczny plik zapewniający komunikację między TypeScriptem a Vite — nie wymaga zmian.

---

### ⚙️ Konfiguracja projektu

- **`index.html`** – główny plik HTML, w którym React osadza aplikację.  
- **`package.json`** – opis projektu: nazwa, biblioteki (React, Vite), oraz skrypty (np. `npm run dev`).  
- **`package-lock.json`** – dokładne wersje bibliotek, zapewniające spójność projektu.  
- **`tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`** – konfiguracja TypeScript.  
- **`vite.config.ts`** – konfiguracja Vite (np. aliasy ścieżek, pluginy).  
- **`eslint.config.js`** – konfiguracja ESLinta, dbającego o jakość kodu.  
- **`.gitignore`** – lista plików ignorowanych przez Git (np. `node_modules`).  
- **`README.md`** – opis projektu i instrukcja uruchomienia.
- **`LICENSE`** – plik z informacją o licencji projektu (MIT).

---

### 🔄 Przepływ działania aplikacji

1. **`index.html`** ładuje pusty element `<div id="root"></div>`.  
2. **`main.tsx`** uruchamia React i montuje w nim główny komponent `App`.  
3. **`App.tsx`** wyświetla początkowy interfejs (logo Reacta + napis “Vite + React”).  
4. **`App.css`** i **`index.css`** nadają styl aplikacji.

---

➡️ Przejdź do kolejnego etapu:  
**Commit:** `Dodanie podstawowej struktury App.tsx`

