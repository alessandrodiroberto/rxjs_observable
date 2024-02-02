import { Observable } from "rxjs";

//MODO sincrono
/*let objs = new Observable((subscriber) => {
  //next (prossimo valore)
  subscriber.next(1);
  subscriber.next(2);
  //complete
  subscriber.complete();

  subscriber.next(3);   //NON VIENE EMESSO
});
*/

//MODO sincrono
let objs = new Observable((subscriber) => {
    //next (prossimo valore)
    subscriber.next(1);
    subscriber.next(2);
    
    //complete asincrono
    setTimeout(()=> {
        subscriber.complete();
    }, 4000);
  
    subscriber.next(3);   //VIENE EMESSO
  });

objs.subscribe(
  (v) => {
    console.log(v);
  },
  (error) => {
    console.log(error);
  },
  () => {
    console.log("Complete");
  }
);

//Con oggetti
objs.subscribe({
    next : v =>{
        console.log(v);
    },
    complete : ()=> {
        console.log('Complete 2');
    },
    error : err => {
        console.log('Error');
    }
});