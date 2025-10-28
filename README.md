# Kurs React - Gra Memory

**Commit:** `Zablokowanie zmiany poziomu podczas rozgrywki`

W tym etapie dodajemy mechanizm blokowania możliwości zmiany poziomu trudności po rozpoczęciu gry. Gra rozpoczyna się w momencie kliknięcia pierwszej karty.

---

## Zmiany wprowadzone w tym commicie

### 1. Nowy stan `isGameChangePossible` w `App.tsx`

- Import hooka `useEffect` z React
- Utworzenie stanu `isGameChangePossible` z wartością początkową `true`
- Kontroluje, czy użytkownik może zmienić poziom trudności
- `setIsGameChangePossible` – funkcja przekazywana do `Board` jako props

### 2. Dodanie `id` do elementu `<select>`

- `<select id='levelChangeSelect'>` – dodanie identyfikatora do elementu, aby móc zmieniać jego klikalność
- Umożliwia odnalezienie elementu w `useEffect`

### 3. Hook `useEffect` do zarządzania atrybutem `disabled` w <select>

**Pobieranie elementu:**
- `document.getElementById("levelChangeSelect")` – odnalezienie selecta
- Rzutowanie typu: `as HTMLSelectElement | null` – TypeScript wie, jakiego typu jest element

**Warunek sprawdzający:**
- `if (select)` – upewnienie się, że element istnieje (ochrona przed błędami)

**Ustawianie atrybutu:**
- `select.disabled = !isGameChangePossible` – ustawienie atrybutu disabled w <select> na wartość przeciwną względem isGameChangePossible
  - Gdy `isGameChangePossible === false` → `disabled = true` (select zablokowany)
  - Gdy `isGameChangePossible === true` → `disabled = false` (select aktywny)

**Dependency array:**
- `[isGameChangePossible]` – useEffect uruchamia się przy każdej zmianie zmiennej isGameChangePossible

### 4. Aktualizacja interfejsu `BoardProps`

- Dodano nowy props: `setIsGameChangePossible: (value: boolean) => void`
- Funkcja przyjmująca wartość boolean i nic nie zwracająca

### 5. Detekcja rozpoczęcia gry w `handleCardClick`

**Warunek rozpoczęcia:**
```typescript
if(flippedCards.length === 0 && pairCards.length === 0){
    handleGameStart();
}
```
- Sprawdza, czy nie ma żadnych odwróconych kart
- Sprawdza, czy nie ma żadnych znalezionych par
- Jeśli oba warunki prawdziwe → pierwsze kliknięcie → gra się rozpoczyna

### 6. Funkcja `handleGameStart` w `Board.tsx`

- Wywołuje `setIsGameChangePossible(false)` – blokuje select w `App`
- Wywoływana w momencie rozpoczęcia gry


---

## Kluczowe koncepcje

- **useEffect** – wywołuje się za każdą zmianą 'dependency array' - w naszym przypadku z każdą zmianą isGameChangePossible
- **document.getElementById** – dostęp do elementów DOM
- **Disabled attribute** – blokowanie elementów formularza
- **Prop drilling** – przekazywanie funkcji przez wiele poziomów komponentów
- **Warunki logiczne** – `&&` (AND) sprawdza oba warunki jednocześnie

---

## Przepływ blokowania poziomu

1. Gra startuje z `isGameChangePossible = true` → select aktywny
2. Użytkownik klika pierwszą kartę
3. `handleCardClick` wykrywa start gry (puste tablice `flippedCards` i `pairCards`)
4. `handleGameStart()` wywołuje `setIsGameChangePossible(false)`
5. Stan `isGameChangePossible` zmienia się na `false`
6. `useEffect` w `App` reaguje na zmianę
7. `select.disabled = true` – select zostaje zablokowany
8. Użytkownik nie może zmienić poziomu do końca gry

---

## Bezpieczeństwo kodu

- **Null check**: `if (select)` – sprawdzenie czy element istnieje przed manipulacją
- **TypeScript typing**: `HTMLSelectElement | null` – precyzyjne typy
- **Dependency array**: Effect uruchamia się tylko gdy potrzeba

---

➡️ Kolejny etap:  
**Commit:** `Wykrywanie końca gry`