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

  .add('create-1e3-times', function(): void {
    let e = create(pass)

    for (let i = 0; i < 1e3; i += 1) {
      e = e.of(i.toString())
    }
    e.emit(0)
  })

  .on('cycle', function(event: any): void {
    console.log(String(event.target)) // tslint:disable-line
  })
  .run()
