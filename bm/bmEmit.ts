/**
 * Created by tushar on 15/01/17.
 */
import * as Benchmark from 'benchmark'
import {create} from '../modules/smitten/index'

let suite = new Benchmark.Suite()

function pass(): void {}
suite
  .add('emit-1e6-times', function(): void {
    const e = create(pass)
    for (let i = 0; i < 1e6; ++i) {
      e.emit(i)
    }
  })
  .on('cycle', function(event: any): void {
    console.log(String(event.target)) // tslint:disable-line
  })
  .run()
