/** @license MIT License (c) copyright 2016 original author or authors */

import { describe, it } from 'mocha'
import sinon from 'sinon'
import * as assert from 'assert'

import { observe, reduce } from 'most'
import { numbers } from './helper'
import { asyncGenerate } from '../../src'

var sentinel = { value: 'sentinel' }

describe('asyncGenerate', function () {
  it('should contain iterable items', function () {
    return reduce(function (a, x) {
      a.push(x)
      return a
    }, [], asyncGenerate(numbers, 10, 5)).then(function (result) {
      assert.deepEqual(result, [0, 1, 2, 3, 4])
    })
  })

  it('should reject on error', function () {
    var spy = sinon.spy()

    var stream = asyncGenerate(async function * () {
      throw sentinel
    })

    return observe(spy, stream).catch(function (e) {
      assert.equal(spy.notCalled, true)
      assert.equal(e, sentinel)
    })
  })
})

