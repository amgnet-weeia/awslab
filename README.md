awslab
======

# 1. Opis


Przykładowa aplikacja posiada interfejs webowy. Do swojego działania wykorzystuje platformę nodeJS (http://nodejs.org/) oraz framework express.js (http://expressjs.com/).

# 2. Architektura


Aplikacja składa się z nastepujących elementów:
* lib/service.js - komponent implementujący usługę WWW.
* app.js - komponent reprezentujący aplikację, punkt startowy aplikacji
* helpers.js - funkcje pomocnicze.


#3. Wykonywanie ćwiczeń laboratoryjnych

Ćwiczenie laboratoryjne wymaga uwtorzenia modułu (w postaci nowego pliku źródłowego w folderze /lab ) oraz zaimportowania go do pliku app.js. W ramach nowego modułu, należy zdefiniować funkcję o następującej strukturze:

```JavaScript
function(request, callback) {/*...*/}
```

gdzie:

* request - obiekt reprezentujacy request HTTP (patrz: http://expressjs.com/api.html#req)

* callback - funkcja 'callback' pozwalajaca na zwrócenie rezultatu. Sygnatura funkcji zgodna jest z konwencją platformy nodeJS (pierwszy paramter zarezerwowany jest na opcjonalny obiekt reprezentujacy błąd), np: callback(err) - wywołanie sygnalizujące wystapienie błędu callback(null, data) - wywołanie zwracające poprawny rezultat.

Aby aplikacja posiadał nową funkcjonalność musi być ona zmapowana do okreslonej ścieżki webowej. W tym celu należy, po zaimportowaniu modułu do aplikacji dodać do tablicy *urlMap* nowy obiekt o strukturze *{path: ścieżka, action: akcja}*. 

##3.1 Przykład
W ramach przykładu rozbudujemy istniejącą aplikację o funkcjonalność wypisującą wartości podane w ramach parametrów *fName* oraz *lName* wprowadzonych w ramach URL. Kroki wymagane do realizacji:

1. Utworzenie pliku źródłowego (modułu) w katalogu projektu (nazwijmy go example_1.js), implementacja oraz wyeksportowanie funkcji obłsugującej request.


```JavaScript
//example_1.js

var task =  function(request, callback){
	var fName = request.query.fName ? request.query.fName : "brak parametru fName";
	var lName = request.query.lName ? request.query.lName : "brak parametru lName";
	callback(null, fName + " " + lName);
}

exports.lab = task

````

2. Zaimportowanie modułu do aplikacji i konfiguracja ścieżki URL, pod którą dostępna będzie zaimplementowana funkcjonalność

```JavaScript
//app.js
//...
var example_1 = require("./example_1").lab


var urlMap = [
	...,	 
	{path: "/example_1", action: example_1}, 
	];

//...
````

3. Uruchomienie i przetestowanie aplikacji

> node app.js

Przykładowe wywołanie: > http://localhost:8080/example_1?fName=Jan&lName=Nowak