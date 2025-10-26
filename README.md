# Zadanie domowe 3

## Opis
Celem zadania jest wykrycie momentu, gdy w grze pamięciowej zostaną odwrócone dwie karty.  
Po znalezieniu pary należy wypisać w konsoli (`console.log()`) informację, że para została znaleziona oraz jakiego rodzaju była to para.

## Kroki do wykonania
1. Umożliw sprawdzenie, które karty zostały odwrócone.
2. Zastosuj podejście **“lifting state up”** – przenieś logikę stanu z komponentu `Card.tsx` do `Board.tsx`.
3. Przekaż do `Card` funkcję obsługującą kliknięcie (np. `onCardClick(index, value)`).
4. W `Board.tsx` trzymaj tablicę przechowującą aktualnie odwrócone karty.
5. Po każdym kliknięciu sprawdzaj:
   - czy w istnieją karty o takim samym value
   - wypisz w `console.log()` informację o znalezionej parze i jej rodzaju.
6. Po sprawdzeniu wyczyść tablicę odwróconych kart.

## Wskazówki
- Nie zmieniaj stanu `useState` z `Board.tsx` bezpośrednio w `Card.tsx` – to utrudnia rozwój aplikacji.
- Skup się na poprawnym przepływie danych między komponentami.
- Zadanie będzie omawiane na kolejnej lekcji, ale warto spróbować samodzielnie – eksperymentowanie to najlepszy sposób nauki.
