# Zadanie domowe 6

## Opis
Celem zadania jest dodanie **licznika ruchów (steps counter)** do gry memory, aby śledzić, ile razy gracz odkrył kartę w trakcie rozgrywki.  
Licznik ma być widoczny w panelu statystyk (`GameStats`) i resetować się przy rozpoczęciu nowej gry.

---

## Kroki do wykonania

1. **Dodaj stan licznika ruchów w `Board.tsx`:**
2. **Wyzeruj licznik przy rozpoczęciu nowej gry:**
3. **Przekaż wartość `steps` do komponentu `GameStats`:**
4. **Zaktualizuj komponent `GameStats.tsx`:**

---

## Wskazówki
- Każde kliknięcie karty powinno zwiększać licznik o 1, niezależnie od tego, czy odkryto parę.
- Pamiętaj o zresetowaniu licznika w tych samych miejscach, gdzie zerowany jest czas gry.
- Zwróć uwagę na spójność danych między komponentami (`Board` → `GameStats`).