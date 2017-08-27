# most-async-iterable

Create Most.js Streams from [async iterables](https://github.com/tc39/proposal-async-iteration)

## Install

```shell
npm install most-async-iterable
```

You may need to polyfill `Symbol.asyncIterator`:

```shell
npm install core-js
```

```javascript
import 'core-js/modules/es7.symbol.async-iterator'
```

## API

### fromAsyncIterable(asyncIterable)

Create a stream from an async iterable object.

```javascript
import { fromAsyncIterable } from 'most-async-iterable'

async function sleep (duration) {
  return new Promise(function (resolve) {
    setTimeout(resolve, duration)
  })
}

async function * numbers () {
  for (var i = 0; ; ++i) {
    await sleep(1000)
    yield i
  }
}

// Create an infinite stream of numbers
var stream = fromAsyncIterable(numbers())

// Limit the stream to the first 3 numbers
stream.take(3)
  .observe(x => console.log(x))

// Logs
// 0 (after 1 second)
// 1 (after 1 more second)
// 2 (after 1 more second)
```

### asyncGenerate(generator, ...args)

Build a stream by running an async generator.

Note that unlike `most.generate`, this will not unwrap promises yielded by the generator. Use `yield await ...` instead.

```javascript
import { asyncGenerate } from 'most-async-iterable'

async function sleep (duration) {
  return new Promise(function (resolve) {
    setTimeout(resolve, duration)
  })
}

async function * countdown (delay, start) {
  for (let i = start; i > 0; --i) {
    await sleep(delay)
    yield i
  }
}

asyncGenerate(countdown, 1000, 3)
  .observe(x => console.log(x))

// Logs
// 3 (after 1 second)
// 2 (after 1 more second)
// 1 (after 1 more second)
```
