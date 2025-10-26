# Zadanie domowe 2

## Opis
Celem zadania jest dodanie pola do wyboru poziomu trudności, które dynamicznie zmienia dane wyświetlane w aplikacji w zależności od wybranego poziomu.

## Kroki do wykonania
1. Dodaj w komponencie pole wyboru (`<select>`) z kilkoma opcjami (`<option>`).
2. Utwórz stan (np. `const [level, setLevel] = useState('');`), który będzie przechowywać aktualnie wybrany poziom.
3. Podłącz `onChange` do `<select>`, aby aktualizować stan po zmianie wyboru.
4. Na podstawie wartości `level` wybieraj odpowiednią tablicę danych
5. Wyświetl dane z aktualnie wybranej tablicy.

## Wskazówki
- Zadanie pomaga zrozumieć, jak dynamicznie operować na danych w React.
- Jeśli nie uda Ci się ukończyć zadania, rozwiązanie zostanie omówione na następnej lekcji.
