/** @license MIT License (c) copyright 2016 original author or authors */

import { describe, it } from 'mocha'
import sinon from 'sinon'
import * as assert from 'assert'

import { observe, reduce } from 'most'
import { numbers } from './helper'
import { fromAsyncIterable } from '../../src/source/fromAsyncIterable'

var sentinel = { value: 'sentinel' }

describe('fromAsyncIterable', function () {
  it('should contain iterable items', function () {
    var asyncIterable = numbers(10, 5)
    return reduce(function (a, x) {
      a.push(x)
      return a
    }, [], fromAsyncIterable(asyncIterable)).then(function (result) {
      assert.deepEqual(result, [0, 1, 2, 3, 4])
    })
  })

  it('should reject on error', function () {
    var spy = sinon.spy()

    var stream = fromAsyncIterable(async function * () {
      throw sentinel
    }())

    return observe(spy, stream).catch(function (e) {
      assert.equal(spy.notCalled, true)
      assert.equal(e, sentinel)
    })
  })
})

