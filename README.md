# Zadanie domowe 5

## Opis
Celem zadania jest dodanie funkcjonalności **resetowania gry** w komponencie `Board.tsx`.  
Reset ma przywracać grę do stanu początkowego - czyli zakryć wszystkie karty i ponownie umożliwić wybór poziomu oraz klikanie po zakończeniu animacji.

## Kroki do wykonania
1. W pliku `Board.tsx` utwórz funkcję `resetGame`, która będzie:
   - czyścić stan przechowujący aktualnie odwrócone karty
   - czyścić stan z aktualnie znalezionymi parami 
   - po upływie czasu takiego samego lub większego niż odwracanie karty
     - wyłączać flagę nowej gry
     - odblokowywać klikanie
     - umożliwiać zmianę poziomu

2. Dodaj `useEffect`, który będzie obserwować zmianę wartości `newGameFlag`.
   - Gdy `newGameFlag` zmieni się na `true`, uruchom funkcję `resetGame()`.

3. Pomyśl, co jeszcze warto zresetować - jeśli masz dodatkowe stany w `Board.tsx`

4. Upewnij się, że reset działa poprawnie: po uruchomieniu nowej gry wszystkie elementy wracają do stanu początkowego.

## Wskazówki
- Przemyśl, które stany odpowiadają za działanie gry i co należy wyczyścić.
- To ćwiczenie ma pomóc zrozumieć przepływ danych w React i logikę zarządzania stanem.
- Weryfikacja działania i szczegóły implementacji zostaną omówione na kolejnej lekcji.
