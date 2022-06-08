# **Konrad Miziński**
## **Laboratorium TCh, Zadanie 2.**

### [Dokumentacja i opis plikacji (README.md)](README.md)
### [Dokumentacja usługi w wersji deweloperskiej (README_dev.md)](README_dev.md)
### [Dokumentacja usługi w wersji produkcyjnej (README_prod.md)](READNE_prod.md)
### [Dokumentacja usługi do uruchomienia w klastrze SWARM (README_stack.md)](README_stack.md)

### **Aplikacja została opracowana w oparciu o podany przykład.**

#### **Opis poszczególnych elementów i wprowadzonych zmian w aplikacji:**

**Client:**

Użykownikowi po wejściu na stronę wyświetla się strona główna z informacjami o autorze i dwoma linkami:

- Kalkulator ciągu geometrycznego
- Dokumentacja.

Pierwszy link jest to właściwy kalkulator ciągu geometrycznego 1\*3^k (komponent "GSCalculator"). Będąc na stronie kalkulatora użytkownik wprowadza liczby i po wciśnieciu "Zatwierdź" liczba zostaje wysłana do serwera (api). Bedąc na stronie z kalkulatorem użykownik może pokazać historię 5 ostatnich wprowadzonych współczynników i 5 ostatnich wyliczonych wartości ciągu dla tych współczynników (komponent "History"). Żeby na stronie pojawiły się nowe współczynniki i obliczone dla nich wartości należy ponownie ukryć i pokazać historię. Strona z dokumentacją zawiera kopie tego README (komponent "Documentation").

**Api (server):**

Za pośrednictwem serwera api tworzona jest nowa tabela (kValues) w bazie danych, która zawiera pola "k" (współczynnik ciągu) i "ts" (timestamp, przechowywujący datę i czas dodania rekordu).

Api wystawia 5 endpointów:
- GET "/values/all" - zwraca wszystkie współczynniki wprowadzone przez użykownika,
- GET "/values/lastFive" - zwraca 5 ostatnich (najnowszych) współczynników wprowadzonych przez użytkownika
- GET "/calcValues/all" - zwraca wszystkie obliczone wartości dla podanych współczynników wraz z timestampem (Date.now()) ich dodania,
- GET "/calcValues/lastFive" - zwraca 5 ostatnich (najnowszych) obliczonych wartości dla podanych współczynników wraz z timestampem,
- POST "/values" - dodaje nowy wpis do bazy danych PostgresSQL i Redis z podanym współczynnikiem i obliczoną wartością dla danego współczynnika (Redis).

Po dodaniu nowego wpisu do Redis'a, za pośrednicwem klienta Redis zostaje wysłana wiadomość na kanał "insert", w celu poinformowania workera o pojawieniu się nowego współczynnika, dla którego zostanie obliczona wartość ciągu geometrycznegi.

**Worker:**

Worker nasłuchuje na kanale "insert" po otrzymaniu informacji o pojawieniu się nowego współczynnika jest obliczana wartość i następuje aktualizacja wartości w bazie. Jako klucz zostaje wzięty współczynnik (k), natomiast jako wartość zostaje zapisana w postaci stringa tablica przechowywująca informacje kolejno o obliczonej wartości i aktualnej dacie (Date.now())

**Nginx:**

Nginx zostaje skonfigurowane jako reverse-proxy, brak dodatkowych zmian w konfiguracji.

#### **Opis Dockerfile'ów:**

**Client:**

W Dockerfile.dev została dodana informacje o wolumenie "/app".
Dockerfile (produkcyjny) wykorzystuje budowanie wieloetapowe. Builder jako obraz bazowy wykorzystuje obraz ode:alpine do zbudowania aplikacji Reactowej, natomiast już właściwy obraz wykorzystuje alpine, na którym zostaje zainstalowany i skonfigurowany serwer nginx (rootdir /www, user(grupa) nginx, plik konfiguracyjny nginx'a "client/nginx/nginx.conf"). Z etapu 1 zostaje skopiowana aplikacja.

**Api (serwer):**

W Dockerfile.dev została dodana informacja o wolumenie "/app".
Dockerfile produkcyjny bazuje na alpine, do kontenera są skopiowane pliki (package.json, index.js, keys.js), zostaje utworzony użytkownik (grupa) "node", zostają zainstalowane pakiety node i npm, pobrane moduły i uruchomionny serwer w wersji produkcyjnej (npm run start) jako użytkownik node (USER node).

**Worker:**

Oba Dockerfile takie same jak dla Api.

**Nginx:**

Obie wersje bazują na alpinie, zostaje zainstalowany serwer nginx, domyślna konfiguracja, do katalogu "/etc/nginx/http.d/" zostaje przeniesiony plik konfiguracyjny.
