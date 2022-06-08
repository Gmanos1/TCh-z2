# **Konrad Miziński**
## **Laboratorium TCh, Zadanie 2.**

### [Dokumentacja i opis plikacji (README.md)](README.md)
### [Dokumentacja usługi w wersji deweloperskiej (README_dev.md)](README_dev.md)
### [Dokumentacja usługi w wersji produkcyjnej (README_prod.md)](READNE_prod.md)
### [Dokumentacja usługi do uruchomienia w klastrze SWARM (README_stack.md)](README_stack.md)

Ponieważ docker stack nie wspiera przechowowywania zmiennych środowiskowych w oddzielnych plikach (.env), zmienne zostały ponownie przeniesione do pliku ***docker-stack.yml***, ich wartości jak w wersji produkcyjnej są brane z shella.

Docker stack jest rozwinięciem pliku docker-compose, z dodanymi informacjami takimi jak rezerwacja liczba replik poszczególnych kontenerów, rezerwacja i limity zasobów procesora i pamięci, polityka aktualizacji, restartu w przypadku awarii i umiejscowienia w klastrze (np. na węzłach managerskich w przypadku redis'a i postgresa).

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