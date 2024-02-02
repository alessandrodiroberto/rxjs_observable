"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
(0, rxjs_1.from)([1, 2, 3, 4, 5, 6, 7, 8, 9]).pipe((0, rxjs_1.filter)((x) => x % 2 === 0), (0, rxjs_1.tap)((x) => console.log('tap + ' + x)), //come un for-each in array
(0, rxjs_1.map)((x) => x * 2)).subscribe(itm => console.log(itm));
