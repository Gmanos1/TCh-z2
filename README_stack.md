# **Konrad Miziński**
## **Laboratorium TCh, Zadanie 2.**

### [Dokumentacja i opis plikacji (README.md)](README.md)
### [Dokumentacja usługi w wersji deweloperskiej (README_dev.md)](README_dev.md)
### [Dokumentacja usługi w wersji produkcyjnej (README_prod.md)](README_prod.md)
### [Dokumentacja usługi do uruchomienia w klastrze SWARM (README_stack.md)](README_stack.md)

Ponieważ docker stack nie wspiera przechowowywania zmiennych środowiskowych w oddzielnych plikach (.env), zmienne zostały ponownie przeniesione do pliku ***docker-stack.yml***, ich wartości jak w wersji produkcyjnej są pobierane z Shella.

Docker stack jest rozwinięciem pliku docker-compose, z dodanymi informacjami takimi jak liczba replik poszczególnych kontenerów, rezerwacja i limity zasobów procesora i pamięci, polityka aktualizacji, restartu w przypadku awarii i umiejscowienia w klastrze (np. na węzłach managerskich w przypadku redis'a i postgresa).

### **Konfiguracja:**

**postgres:**
- 1 kontener, ze względu na problemy z synchronizacją danych,
- umiejscowiony na węźle managerskim,
- polityka restartu: w razie awarii ponowne uruchomienie, zapewnia ciągłość dostawy usługi
- ponieważ w bazie została stworzona tylko jedna tabela, dodawanie i wybieranie z niej danych nie wymaga dużej ilości zasobów, stąd limit procesorów do 1, a pmięci do 50M, minimalna ilość zasobów 0.5 procesora i 25M pamięci

**redis:**
- liczba replik, polityka restartu, umiejscowienie jak dla postgresa
- ponieważ redis to baza cache'ująca przechowywująca dane w pamięci operacyjnej, potrzebuje jej większe ilości, stąd rezerwacja pamięci "50M", procesora "0.5", a maksymalna ilość pamięci 100M, procesora "1.5"

**client:**
- liczba replik 2, ponieważ to client odpowiada za utrzymanie komunikacji z użytkownikiem i ich żadań
- ponieważ 2 repliki, 1 replika może być aktualizowana w danym momencie, żeby zapewnić ciągłość działania usługi
- odpowiadanie na żadania i ich utrzymywanie raczej nie operacją wymagającej duże ilości zasobów, stąd rezerwacja 0.25 procesora i 20M pamięci, a limit 0.75 procesor i 70M pamięci

**api:**
- liczba replik, polityka aktualizacji, polityka restartu jak dla client
- api wymaga większej ilości zasobów ze względu na ich pobieranie z bazy, przetwarzania ich oraz odpowiedzi na żadania, stąd rezerwacja procesora 1, pamięci 20M, a limity to 2 procesory i 70M pamięci

**worker:**
- polityka restartu w razie awarii,
- liczba replik 1, nie ma potrzeby większej ilości replik, ze względu na to, że 1 kontener z rezerwacją 0.75 procesora poradzi sobie z obliczaniem wartości ciągu dla danych współczynników,
- obliczanie wartości ciągu nie wymaga dużego zapotrzebowania na pamięć stąd też rezerwacja pamięci 10M a limit 30M, natomiast bardziej obciąża procesor stąd też rezerwacja procesora 0.75 a limit to 1

**nginx:**
- nginx pełniący rolę reverse-proxy może odpowiadać na dużą liczbę żadąń zarówno do klienta jak api stąd liczba replik 2
- ponieważ liczba replik 2, 1 kontener może być aktualizowany w danym momencie, żeby zapewnić ciągłość dostaw usługi
- w razie awarii, zostanie automatycznie zrestartowany
- reverse-proxy nie wymaga dużych ilości zasobów stąd rezerwacja 0.25 procesora i 10M, z limitem 1 procesor 30M, powinny w zupełności wystarczyć


Inicjalizacja klastra:
```
docker swarm init
```

Użyte polecenie do wdrożenia usługi w klastrze Swarm:
```
docker stack deploy -c docker-stack.yml z2
```

Uruchomienie i działanie:
![](/screenshots/readme_stack/1.png)
![](/screenshots/readme_stack/2.png)
![](/screenshots/readme_stack/3.png)