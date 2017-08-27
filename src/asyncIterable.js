export function getAsyncIterator (asyncIterable) {
  if (!Symbol.asyncIterator) {
    throw new TypeError('Symbol.asyncIterator is not defined.')
  }
  return asyncIterable[Symbol.asyncIterator]()
}

