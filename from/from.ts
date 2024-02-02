import { filter, from, map, tap, pipe } from "rxjs";

from([1,2,3,4,5,6,7,8,9]).pipe(
    filter((x)=> x % 2 === 0),
    tap((x)=> console.log('tap + ' + x)),//come un for-each in array
    map((x)=> x * 2)
).subscribe(
    itm => console.log(itm)
);