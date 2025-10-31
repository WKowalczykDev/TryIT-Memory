# Kurs React - Gra Memory

Witamy w kursie tworzenia gry Memory w React! Ten projekt jest kontynuacją kursu JavaScript i został stworzony specjalnie dla uczestniczek programu **Girls Go IT** prowadzonego przez Fundację Try IT.

## 🎮 O grze

Memory to klasyczna gra polegająca na odnajdywaniu par identycznych kart. Gra oferuje trzy poziomy trudności i system zapisywania najlepszych wyników.

**Zagraj w demo:** [link do gry](https://s3dtwt-5173.csb.app/)

**Playlist YouTube:** [krok po kroku przez cały projekt]

---

## 🚀 Czym jest React?

**React** to biblioteka JavaScript do budowania interfejsów użytkownika. Możesz to porównać do gotowych klocków LEGO - zamiast budować wszystko od zera w czystym JavaScript, React daje gotowe komponenty, które można łatwo łączyć i zarządzać nimi.

**TypeScript** to rozszerzenie JavaScript, które wymaga określania typów zmiennych. Dzięki temu kod jest bardziej przejrzysty i łatwiej wykryć błędy już na etapie pisania (np. nie pomyli się liczby z tekstem).

---

## 📋 Wymagania

- Znajomość podstaw JavaScript (pętle, funkcje, tablice, obiekty)
- Ukończenie poprzedniej części kursu JavaScript (zalecane, ale nie obowiązkowe)
- Zainstalowany Node.js (wersja 18 lub nowsza)
- Edytor kodu (zalecamy VS Code)

---

## 🛠️ Instalacja

1. **Sklonuj repozytorium:**
```bash
git clone https://github.com/WKowalczykDev/kurs-react-memory.git
cd kurs-react-memory
```

2. **Zainstaluj zależności:**
```bash
npm install
```

3. **Uruchom projekt:**
```bash
npm run dev
```

Aplikacja uruchomi się pod adresem `http://localhost:5173/`

---

## 📚 Struktura kursu

Kurs składa się z commitów, które reprezentują kolejne etapy budowy gry. Przejdź przez nie krok po kroku:

### **Początek (Setup)**
- [`commit 1`](https://github.com/WKowalczykDev/kurs-react-memory/tree/0d11492347cc74d80d2047750811c901167f07e6) **Initial commit** – Utworzenie projektu Vite + React + TypeScript  
- [`commit 2`](https://github.com/WKowalczykDev/kurs-react-memory/tree/b189480493a3302da3103961df1a6e70e064d646) **Podstawowa struktura aplikacji** – Komponenty App, Board, Card  

### **Część 1: Mechanika gry**
- [`commit 3`](https://github.com/WKowalczykDev/TryIT-Memory/tree/73afd29b95243ebe791a63fb525f953d51520831) **Dodanie tablic z kartami i funkcji tasowania**  
- [`commit 4`](https://github.com/WKowalczykDev/TryIT-Memory/tree/be81b0a7b097fa29517d767816dad5703a973472) **Dodanie dynamicznej zmiany poziomu**  
- [`commit 5`](https://github.com/WKowalczykDev/TryIT-Memory/tree/e7f6e1b9399bf8a7673ddc2c3ccae9505fcd0c25) **Implementacja odwracania kart i logiki gry**  
- [`commit 6`](https://github.com/WKowalczykDev/TryIT-Memory/tree/5d5fdd0d159597b846eacc6f4b76705a6a4dfb45) **Dodanie sprawdzania par kart**  
- [`commit 7`](https://github.com/WKowalczykDev/TryIT-Memory/tree/3ea0a962244daf567b7449288789fdef2c322de3) **Zablokowanie zmiany poziomu podczas rozgrywki**  

### **Część 2: Wykrywanie wygranej i reset**
- [`commit 8`](https://github.com/WKowalczykDev/TryIT-Memory/tree/cbd89f2fb6355216beab145ac900036d6fcf4f29) **Wykrywanie końca gry**  
- [`commit 9`](https://github.com/WKowalczykDev/TryIT-Memory/tree/40255780ba0d63ca13e1abaec09bd444b9631b0d) **Dodanie przycisku resetowania i stałej czasu animacji**  

### **Część 3: Statystyki gry**
- [`commit 10`](https://github.com/WKowalczykDev/TryIT-Memory/tree/6f2617fcedf1334aaccbbdc4217b33e1c494349d) **Dodanie licznika czasu gry**  
- [`commit 11`](https://github.com/WKowalczykDev/TryIT-Memory/tree/01273cde469683ff214c33c5d672d16b3956414e) **Dodanie komponentu GameStats z wyświetlaniem statystyk**  
- [`commit 12`](https://github.com/WKowalczykDev/TryIT-Memory/tree/a10590f6d46477018a91cf49a50488f47962c79a) **Dodanie licznika ruchów**  

### **Część 4: Grafika i UX**
- [`commit 13`](https://github.com/WKowalczykDev/TryIT-Memory/tree/7f68ccfaeaff1d2165d587badf68d3d4e4647967) **Obrazki `<img>` jako awers i rewers karty**  
- [`commit 14`](https://github.com/WKowalczykDev/TryIT-Memory/tree/cde081dce3a7a4555b9ee823019b7bed2c239198) **Finalne poprawki stylów i UX**  

### **Część 5: Tablica wyników (opcjonalne)**
- [`commit 15`](https://github.com/WKowalczykDev/TryIT-Memory/tree/d204d7333c9c6da736bfb6ed5f827420555ba86f) **Dodanie tablicy najlepszych wyników z cookies**


---

## 🎯 Nawigacja po commitach

Aby przejść do konkretnego commitu:
```bash
git log --oneline
git checkout <id_commitu>
```

Aby wrócić do najnowszej wersji:
```bash
git checkout main
```

---

## 📖 Czego się nauczysz?

- ✅ Tworzenia komponentów React
- ✅ Zarządzania stanem z `useState`
- ✅ Efektów ubocznych z `useEffect`
- ✅ Przekazywania danych między komponentami (props)
- ✅ Obsługi zdarzeń w React
- ✅ Stylowania komponentów z CSS
- ✅ TypeScript - typowanie w praktyce
- ✅ Zapisywania danych w cookies (opcjonalnie)

---

## 🎨 Funkcje gry

- 🃏 Trzy poziomy trudności (łatwy 4×4, średni 4×6, trudny 6×6)
- ⏱️ Licznik czasu
- 👣 Licznik kroków
- 🏆 Wykrywanie wygranej
- 🔄 Reset gry
- 📊 Statystyki (pary znalezione/wszystkie)
- 🖼️ Kolorowe karty z grafikami
- 💾 Tablica najlepszych wyników (opcjonalnie)

---

## 📞 Wsparcie

Jeśli masz pytania lub napotkasz problemy:
- Sprawdź dokumentację React: [https://react.dev](https://react.dev)
- Skontaktuj się z Fundacją Try IT: [https://www.tryit.org.pl](https://www.tryit.org.pl)

---

## 📝 Licencja

MIT License - projekt edukacyjny Fundacji Try IT - stworzony przez Wojciecha Kowalczyka

---

**Powodzenia w nauce! 🚀**

*Projekt stworzony z ❤️ dla Girls Go IT*

### Credits

Fruit graphics by [Conania](https://www.iconfinder.com/iconsets/fruit-and-vegetable-15), licensed under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/).  
Used in accordance with the license.
