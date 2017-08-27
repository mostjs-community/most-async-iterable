import { Stream } from 'most'
import { getAsyncIterator } from '../asyncIterable'
import AsyncIteratorProducer from './AsyncIteratorProducer'

/**
 * Compute a stream using an *async* generator
 * @param f
 * @returns {Stream}
 */
export function asyncGenerate (f /*, ...args */) {
  var args = Array.prototype.slice.call(arguments)
  args.shift()
  return new Stream(new AsyncGenerateSource(f, args))
}

function AsyncGenerateSource (f, args) {
  this.f = f
  this.args = args
}

AsyncGenerateSource.prototype.run = function (sink, scheduler) {
  var asyncIterable = this.f.apply(void 0, this.args)
  var asyncIterator = getAsyncIterator(asyncIterable)
  return new AsyncIteratorProducer(asyncIterator, sink, scheduler)
}
