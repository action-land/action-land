/**
 * Created by tushar on 15/01/17.
 */
import * as Benchmark from 'benchmark'

import {create} from '../modules/smitten/index'

const suite = new Benchmark.Suite()

function pass(): void {
  return
}
suite
  .add('emit-1e6-times', function(): void {
    const e = create(pass)
    for (let i = 0; i < 1e6; i += 1) {
      e.emit(i)
    }
  })
  .on('cycle', function(event: any): void {
    console.log(String(event.target)) // tslint:disable-line
  })
  .run()
