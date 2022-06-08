# **Konrad Miziński**
## **Laboratorium TCh, Zadanie 2.**

### [Dokumentacja i opis plikacji (README.md)](README.md)
### [Dokumentacja usługi w wersji deweloperskiej (README_dev.md)](README_dev.md)
### [Dokumentacja usługi w wersji produkcyjnej (README_prod.md)](READNE_prod.md)
### [Dokumentacja usługi do uruchomienia w klastrze SWARM (README_stack.md)](README_stack.md)

Polecenia użyte do zbudowania obrazów i ich wypchnięcia:
```
docker build -t gmanos/z2:{worker/nginx/api/client} -f Dockerfile .
docker push gmanos/z2:{worker/nginx/api/client}
```

Docker compose produkcyjny bazuje na tych obrazach. 

Zmienne środowisko są przechowywane w oddzielnych plikach w katalogu ***".config/prod/"***, natomiast zmienne nie mają przypisanych na sztywno wartości. Wartości zmiennych zostają pobrane z zmiennych powłoki. Plik "install-secrects.sh", ustawie przykładowe wartości zmiennych w Shellu, dzięki czemu ich wartości zostaną zczytane i podstawione do zmiennych w plikach przy uruchamianiu stacka. 

Analogicznie jak w wersji deweloperskiej zostały utworzone sieci ***"frontend"*** i ***"backend"***. 

Został dodany wolumen do przechowywania danych zapisywanych przez serwer bazodanynowy ***PostgreSQL***.



Polecenie użyte do uruchomienia usługi w wersji produkcyjnej
```
. install-shecrets.sh
docker compose -f docker-compose.yml up
```

Uruchomienie i działanie:
![](/screenshots/readme_prod/1.png)
![](/screenshots/readme_prod/2.png)