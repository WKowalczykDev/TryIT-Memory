# Zadanie domowe 4

## Opis
Celem zadania jest wykrycie momentu zakończenia gry (czyli sytuacji, gdy wszystkie pary zostały odnalezione) i wypisanie w konsoli komunikatu o wygranej.

## Kroki do wykonania
1. W komponencie odpowiedzialnym za logikę gry (np. `Board.tsx`) dodaj `useEffect`, który będzie sprawdzał, czy gra została zakończona.
2. Wewnątrz `useEffect` napisz warunek logiczny, który określi, czy wszystkie karty są już dopasowane.
3. Jeśli warunek zwróci `true`, wypisz w konsoli komunikat o wygranej (`console.log("Gra wygrana!")`).
4. Jeśli warunek jest `false`, nic nie rób – gra trwa dalej.

## Wskazówki
* useEffect powinien obserwować stan kart (cards), aby reagował przy każdej zmianie.
* Warunek logiczny musi jednoznacznie określać, czy gra się zakończyła.
* Nie musisz jeszcze implementować resetu gry – wystarczy sam komunikat w konsoli.