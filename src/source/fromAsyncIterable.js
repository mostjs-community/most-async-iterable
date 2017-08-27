import { Stream } from 'most'
import { getAsyncIterator } from '../asyncIterable.js'
import AsyncIteratorProducer from './AsyncIteratorProducer'

export function fromAsyncIterable (asyncIterable) {
  return new Stream(new AsyncIterableSource(asyncIterable))
}

function AsyncIterableSource (asyncIterable) {
  this.asyncIterable = asyncIterable
}

AsyncIterableSource.prototype.run = function (sink, scheduler) {
  var asyncIterator = getAsyncIterator(this.asyncIterable)
  return new AsyncIteratorProducer(asyncIterator, sink, scheduler)
}

