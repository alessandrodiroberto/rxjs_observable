"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const apiUrl = "https://jsonplaceholder.typicode.com/albums";
/* SERVER
fetch('https://jsonplaceholder.typicode.com/albums')
      .then(response => response.json())
*/
//npm install node-fetch --save
const promise = fetch(apiUrl).then((body) => body.json());
//La stampa non avviene perchè il filtro legge dal flusso che è un json e lo fa fallire
(0, rxjs_1.from)(promise)
    .pipe((0, operators_1.filter)((data) => data.id <= 2))
    .subscribe((json) => console.log(json));
//La stampa avviene perchè switchMap converte il flusso json in singoli elementi, ora filter può accedervi
(0, rxjs_1.from)(promise)
    .pipe((0, operators_1.switchMap)((resData) => (0, rxjs_1.from)(resData)), (0, operators_1.filter)((data) => data.id <= 2))
    .subscribe((data) => console.log(data));
//La stampa non avviene perchè of converte nuovamente il flusso json in flusso json, quindi filter non può accedervi (come il primo caso)
(0, rxjs_1.from)(promise)
    .pipe((0, operators_1.switchMap)((resData) => (0, rxjs_1.of)(resData)), (0, operators_1.filter)((data) => data.id <= 2))
    .subscribe((data) => console.log(data));
//from per array
//of da singoli ad array
/*
from(promise) //Riceve array di dati
  .pipe(switchMap((resData) => from(resData)))  //Da singolo array di elementi a molti oggetti
  .subscribe((json) => console.log(json));

  from(promise) //Riceve array di dati
  .pipe(switchMap((resData) => of(...resData)))  //Da singolo array di elementi a molti oggetti
  .subscribe((json) => console.log(json));
*/
