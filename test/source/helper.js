export async function sleep (duration) {
  return new Promise(function (resolve) {
    setTimeout(resolve, duration)
  })
}

export async function * numbers (delay, n) {
  for (var i = 0; i < n; ++i) {
    await sleep(delay)
    yield i
  }
}

