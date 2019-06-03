/**
 * Created by tushar on 15/01/17.
 */
import * as Benchmark from 'benchmark'
import {create} from '../modules/smitten/index'

let suite = new Benchmark.Suite()

function pass() {}
suite
  .add('create-1e3-times', function() {
    let root = create(pass)
    let e = root
    for (let i = 0; i < 1e3; ++i) {
      e = root.of(i.toString())
    }
    e.emit(0)
  })

  .on('cycle', function(event: any) {
    console.log(String(event.target)) // tslint:disable-line
  })
  .run()
