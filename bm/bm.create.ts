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
  .add('create-1e3-times', () => {
    let e = create(pass)
    for (let i = 0; i < 1e3; i += 1) {
      e = e.of(i.toString())
    }
    e.emit(0)
  })
  .on('cycle', (event: {target: unknown}) => {
    // tslint:disable-next-line: no-console
    console.log(String(event.target))
  })
  .run()
