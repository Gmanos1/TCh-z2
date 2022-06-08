# **Konrad Miziński**
## **Laboratorium TCh, Zadanie 2.**

### [Dokumentacja i opis plikacji (README.md)](README.md)
### [Dokumentacja usługi w wersji deweloperskiej (README_dev.md)](README_dev.md)
### [Dokumentacja usługi w wersji produkcyjnej (README_prod.md)](README_prod.md)
### [Dokumentacja usługi do uruchomienia w klastrze SWARM (README_stack.md)](README_stack.md)

Obrazy deweloperskie są budowane w oparciu o plik ***docker-compose.dev.yml***, gdzie zdefiniowany jest kontekst oraz plik ***Dockerfile.dev***, na podstawie którego zostaną zbudowana obrazy.

Zmienne środowiskowe wykorzystywane przy budowaniu, żeby zapewnić większą elastycznyność zostały przeniesione do oddzielnych plików w katalogu ***".config/dev/"***, gdzie wartości są podstawione do zmiennych na sztywno.

Docker compose definiuje dwie sieci ***"frontend"*** i ***"backend"***. Do sieci "frontend" podłączony jest jedynie nginx pracujący jako reverse-proxy, wystawiany jest port ***3050***. Do sieci "backend" podłączone są wszystkie kontenery.

Katalogi, w których znajdują się kody źródłowe aplikacji są bindowane do odpowiadających im kontenerom, dzięki czemu zmiany w kodzie są widoczne na bieżąco, bez koniecznosci przebudowywania obrazów.

Polecenie użyte do uruchomienia usługi w wersji deweloperskiej

```
docker compose -f docker-compose.dev.yml up
```

Wszystkie obrazy ponadto, zostały zbudowane i wypchnięte do repozytorium dockerhub (gmanos/z2);

Użyte polecenia (będąc w odpowiednich katalogach):

```
docker build -t gmanos/z2:{worker/nginx/api/client}-dev -f Dockerfile.dev .
docker push gmanos/z2:{worker/nginx/api/client}-dev
```

Uruchomienie i działanie usługi
![](/screenshots/readme_dev/1.png)
![](/screenshots/readme_dev/2.png)
![](/screenshots/readme_dev/3.png)
![](/screenshots/readme_dev/4.png)
![](/screenshots/readme_dev/5.png)