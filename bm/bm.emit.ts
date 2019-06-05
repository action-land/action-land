/**
 * Created by tushar on 15/01/17.
 */
import * as Benchmark from 'benchmark'

import {create} from '../modules/smitten/index'

// tslint:disable: no-magic-numbers

const suite = new Benchmark.Suite()

function pass(): void {
  return
}

suite
  .add('emit-1e6-times', () => {
    const e = create(pass)
    for (let i = 0; i < 1e6; i += 1) {
      e.emit(i)
    }
  })
  .on('cycle', (event: {target: unknown}) => {
    // tslint:disable-next-line: no-console
    console.log(String(event.target))
  })
  .run()
