/** @license MIT License (c) copyright 2016 original author or authors */

export default function AsyncIteratorProducer (asyncIterator, sink, scheduler) {
  this.asyncIterator = asyncIterator
  this.sink = sink
  this.scheduler = scheduler
  this.active = true

  var self = this
  function err (e) {
    self.sink.error(self.scheduler.now(), e)
  }

  Promise.resolve(this).then(stepProducer).catch(err)
}

AsyncIteratorProducer.prototype.dispose = function () {
  this.active = false
}

function stepProducer (producer) {
  return producer.asyncIterator.next().then(function (r) {
    if (r.done) {
      producer.sink.end(producer.scheduler.now(), r.value)
    } else {
      producer.sink.event(producer.scheduler.now(), r.value)
      if (producer.active) {
        return stepProducer(producer)
      }
    }
  })
}

