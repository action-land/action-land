/**
 * Created by tushar on 15/01/17.
 */
import * as Benchmark from 'benchmark'

import {create, ISmitten} from '../modules/smitten/index'

const suite: Benchmark.Suite = new Benchmark.Suite()

function pass(): void {
  return
}
suite

  .add('create-1e3-times', function(): void {
    let e: ISmitten = create(pass)

    for (let i = 0; i < 1e3; i += 1) {
      e = e.of(i.toString())
    }
    e.emit(0)
  })

  .on('cycle', function(event: {target: unknown}): void {
    // tslint:disable-next-line: no-console
    console.log(String(event.target))
  })
  .run()
