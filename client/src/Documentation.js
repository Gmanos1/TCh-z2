import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div>
      <Link to="/">Powrót do strony głównej</Link>
      <br />
      <p>
        <b>Aplikacja została opracowana w oparciu o podany przykład.</b>
      </p>
      <div className="left">
        <p>
          <b>
            Opis poszczególnych elementów i wprowadzonych zmian w aplikacji:
          </b>
          <p>
            Client:
            <br />
            Użykownikowi po wejściu na stronę wyświetla się strona główna z
            informacjami o autorze i dwoma linkami: - Kalkulator ciągu
            geometrycznego - Dokumentacja. Pierwszy link jest to właściwy
            kalkulator ciągu geometrycznego 1*3^k (komponent "GSCalculator").
            Będąc na stronie kalkulatora użytkownik wprowadza liczby i po
            wciśnieciu "Zatwierdź" liczba zostaje wysłana do serwera (api).
            Bedąc na stronie z kalkulatorem użykownik może pokazać historię 5
            ostatnich wprowadzonych współczynników i 5 ostatnich wyliczonych
            wartości ciągu dla tych współczynników (komponent "History"). Żeby
            na stronie pojawiły się nowe współczynniki i obliczone dla nich
            wartości należy ponownie ukryć i pokazać historię. Strona z
            dokumentacją zawiera kopie tego README (komponent "Documentation").
          </p>
          <p>
            Api (server):
            <br />
            Za pośrednictwem serwera api tworzona jest nowa tabela (kValues) w
            bazie danych, która zawiera pola "k" (współczynnik ciągu) i "ts"
            (timestamp, przechowywujący datę i czas dodania rekordu). Api
            wystawia 5 endpointów: <br />
            <ol>
              <li>
                GET "/values/all" - zwraca wszystkie współczynniki wprowadzone
                przez użykownika,
              </li>
              <li>
                GET "/values/lastFive" - zwraca 5 ostatnich (najnowszych)
                współczynników wprowadzonych przez użytkownika
              </li>
              <li>
                GET "/calcValues/all" - zwraca wszystkie obliczone wartości dla
                podanych współczynników wraz z timestampem (Date.now()) ich
                dodania,
              </li>
              <li>
                GET "/calcValues/lastFive" - zwraca 5 ostatnich (najnowszych)
                obliczonych wartości dla podanych współczynników wraz z
                timestampem,
              </li>
              <li>
                POST "/values" - dodaje nowy wpis do bazy danych PostgresSQL i
                Redis z podanym współczynnikiem i obliczoną wartością dla danego
                współczynnika (Redis).
              </li>
            </ol>
            Po dodaniu nowego wpisu do Redis'a, za pośrednicwem klienta Redis
            zostaje wysłana wiadomość na kanał "insert", w celu poinformowania
            workera o pojawieniu się nowego współczynnika, dla którego zostanie
            obliczona wartość ciągu geometrycznegi.
          </p>
          <p>
            Worker:
            <br />
            Worker nasłuchuje na kanale "insert" po otrzymaniu informacji o
            pojawieniu się nowego współczynnika jest obliczana wartość i
            następuje aktualizacja wartości w bazie. Jako klucz zostaje wzięty
            współczynnik (k), natomiast jako wartość zostaje zapisana w postaci
            stringa tablica przechowywująca informacje kolejno o obliczonej
            wartości i aktualnej dacie (Date.now())
          </p>
          <p>
            Nginx: <br />
            Nginx zostaje skonfigurowane jako reverse-proxy, brak dodatkowych
            zmian w konfiguracji.
          </p>
        </p>
        <p>
          <b>Opis Dockerfile'ów: </b>
          <p>
            Client:
            <br /> W Dockerfile.dev została dodana informacje o wolumenie
            "/app". Dockerfile (produkcyjny) wykorzystuje budowanie
            wieloetapowe. Builder jako obraz bazowy wykorzystuje obraz
            node:alpine do zbudowania aplikacji Reactowej, natomiast już
            właściwy obraz wykorzystuje alpine, na którym zostaje zainstalowany
            i skonfigurowany serwer nginx (rootdir /www, user(grupa) nginx, plik
            konfiguracyjny nginx'a "client/nginx/nginx.conf"). Z etapu 1 zostaje
            skopiowana aplikacja.
          </p>
          <p>
            Api (serwer):
            <br /> W Dockerfile.dev została dodana informacja o wolumenie
            "/app". Dockerfile produkcyjny bazuje na alpine, do kontenera są
            skopiowane pliki (package.json, index.js, keys.js), zostaje
            utworzony użytkownik (grupa) "node", zostają zainstalowane pakiety
            node i npm, pobrane moduły i uruchomionny serwer w wersji
            produkcyjnej (npm run start) jako użytkownik node (USER node).
          </p>
          <p>
            Worker:
            <br /> Oba Dockerfile takie same jak dla Api.
          </p>
          <p>
            Nginx:
            <br /> Obie wersje bazują na alpinie, zostaje zainstalowany serwer
            nginx, domyślna konfiguracja, do katalogu "/etc/nginx/http.d/"
            zostaje przeniesiony plik konfiguracyjny.
          </p>
        </p>
      </div>
    </div>
  );
};
