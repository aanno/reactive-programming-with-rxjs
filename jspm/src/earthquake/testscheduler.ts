/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
***/
import Rx from "rx-dom"

const QUnit = (window as any).QUnit

const onNext = Rx.ReactiveTest.onNext // (1)
const onCompleted = Rx.ReactiveTest.onCompleted
const subscribe = Rx.ReactiveTest.subscribe

const scheduler = new Rx.TestScheduler() // (2)

type PropertiesType = number

interface IDut {
  properties: PropertiesType,
}

QUnit.test("Test quake buffering", function(assert: QUnitAssert) { // (4)
  const quakes: Rx.Observable<IDut> = scheduler.createHotObservable( // (3)
    onNext(100, { properties: 1 }),
    onNext(300, { properties: 2 }),
    onNext(550, { properties: 3 }),
    onNext(750, { properties: 4 }),
    onNext(1000, { properties: 5 }),
    onCompleted(1100),
  )

  const results = scheduler.startScheduler(function() { // (5)
    return quakeBatches(quakes, scheduler)
  }, {
    created: 0,
    subscribed: 0,
    disposed: 1200,
  })

  const messages = results.messages // (6)
  console.log(results.scheduler === scheduler)
  console.log("results", results)
  console.log("messages", results.messages.map((m: any) => m.toString()))

  assert.equal( // (7)
    messages[0].toString(),
    onNext(501, [1, 2]).toString(),
  )

  assert.equal(
    messages[1].toString(),
    onNext(1001, [3, 4, 5]).toString(),
  )

  assert.equal(
    messages[2].toString(),
    onCompleted(1100).toString(),
  )
})

function quakeBatches(quakes: Rx.Observable<IDut>, scheduler: Rx.IScheduler): PropertiesType[] {
  return quakes.pluck("properties")
    .bufferWithTime(500, null, scheduler || null)
    .filter(function(rows: PropertiesType[]) {
      return rows.length > 0
    })
}

// const onNext = Rx.ReactiveTest.onNext
QUnit.test("Test value order", function(assert: QUnitAssert) {
  const scheduler: Rx.IScheduler = new Rx.TestScheduler()
  const subject = scheduler.createColdObservable(
    onNext(100, "first"),
    onNext(200, "second"),
    onNext(300, "third"),
  )

  let result = ""
  subject.subscribe(function(value: string) { result = value })

  scheduler.advanceBy(100)
  assert.equal(result, "first")

  scheduler.advanceBy(100)
  assert.equal(result, "second")

  scheduler.advanceBy(100)
  assert.equal(result, "third")
})
/*
quakes
  .pluck("properties")
  .map(makeRow)
  .bufferWithTime(500)
  .filter(function(rows) { return rows.length > 0 })
  .map(function(rows) {
    const fragment = document.createDocumentFragment()
    rows.forEach(function(row) {
      fragment.appendChild(row)
    })
    return fragment
  })
  .subscribe(function(fragment) {
    table.appendChild(fragment)
  })
*/

QUnit.test("Test scheme only for cold observable", function(assert: QUnitAssert) {
  const scheduler: Rx.IScheduler = new Rx.TestScheduler()

  /**
   * As you could see, share() doesn't alter the semantic of the test!
   * Hence this test scheme is unsuited for hot observables!
   */
  const subject = scheduler.createColdObservable(
    onNext(100, "first"),
    onNext(200, "second"),
    onNext(300, "third"),
    onCompleted(400)).share()

  let result: string = ""
  let result2: string = ""
  subject.subscribe(
    function(value: string) { result = value },
    function(err: any) { result = "Error: " + err.toString()},
    function() { result = "completed" })
  subject.delay(100, scheduler).subscribe(
    function(value: string) { result2 = value },
    function(err: any) { result2 = "Error: " + err.toString()},
    function() { result2 = "completed" })

  scheduler.advanceBy(100)
  console.log("after 100", result, result2)
  assert.equal(result, "first")
  assert.equal(result2, "")

  scheduler.advanceBy(100)
  console.log("after 200", result, result2)
  assert.equal(result, "second")
  assert.equal(result2, "first")

  scheduler.advanceBy(100)
  console.log("after 300", result, result2)
  assert.equal(result, "third")
  assert.equal(result2, "second")

  scheduler.advanceBy(100)
  console.log("after 400", result, result2)
  assert.equal(result, "completed")
  assert.equal(result2, "third")

  scheduler.advanceBy(100)
  console.log("after 500", result, result2)
  assert.equal(result, "completed")
  assert.equal(result2, "completed")
})

function testPipeline(observable: Rx.Observable<any>, scheduler: Rx.IScheduler): Rx.Observable<any> {
  // return observable.delay(100, scheduler)
  return observable.do(function(el: any) {
    console.log("do", el)
    if (el === "second") {
      observable.subscribe(function(value: any) {
        console.log("second subscription", value)
      })
      console.log("added subscription")
    }
  })
}
QUnit.test("Test scheme for cold AND hot observable", function(assert: QUnitAssert) {
  expect(0)

  const scheduler: Rx.IScheduler = new Rx.TestScheduler()
  /*
   * Try with createColdObservable, createHotObservable,
   * and with and without .share()!
   */
  const subject = scheduler.createColdObservable(
    onNext(100, "first"),
    onNext(200, "second"),
    onNext(300, "third"),
    onCompleted(400)).share()

  const results = scheduler.startScheduler(function() { // (5)
    return testPipeline(subject, scheduler)
  }, {
    created: 0,
    subscribed: 0,
    disposed: 800,
  })

  const messages = results.messages // (6)
  console.log(results.scheduler === scheduler)
  console.log("results", results)
  console.log("messages", results.messages.map((m: any) => m.toString()))
})
