import { from, of } from "rxjs";
import { filter, switchMap } from "rxjs/operators";

const apiUrl = "https://jsonplaceholder.typicode.com/albums";

/* SERVER
fetch('https://jsonplaceholder.typicode.com/albums')
      .then(response => response.json())
*/
//npm install node-fetch --save
const promise = fetch(apiUrl).then((body) => body.json());

//La stampa non avviene perchè il filtro legge dal flusso che è un json e lo fa fallire
from(promise)
  .pipe(filter((data: any) => data.id <= 2))
  .subscribe((json) => console.log(json));

//La stampa avviene perchè switchMap converte il flusso json in singoli elementi, ora filter può accedervi
from(promise)
  .pipe(
    switchMap((resData) => from(resData)),
    filter((data: any) => data.id <= 2)
  )
  .subscribe((data) => console.log(data));

//La stampa non avviene perchè of converte nuovamente il flusso json in flusso json, quindi filter non può accedervi (come il primo caso)
from(promise)
  .pipe(
    switchMap((resData) => of(resData)),
    filter((data: any) => data.id <= 2)
  )
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
