/***
 * Excerpted from "Reactive Programming with RxJS",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material,
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose.
 * Visit http://www.pragmaticprogrammer.com/titles/smreactjs for more book information.
 ***/
import Rx from "rx-dom"
import L from "leaflet"
import {map, QUAKE_URL} from "./config.ts"

const codeLayers: {[key: string]: any} = {}
const quakeLayer = L.layerGroup([]).addTo(map)
const identity = Rx.helpers.identity // (1)

function isHovering(element: Element): MouseEvent {
  const over = Rx.DOM.mouseover(element).map(identity(true)) // (2)
  const out = Rx.DOM.mouseout(element).map(identity(false)) // (3)

  return over.merge(out) // (4)
}

function makeRow(props): HTMLTableRowElement {
  const row: HTMLTableRowElement = document.createElement('tr')
  row.id = props.net + props.code

  const date = new Date(props.time)
  const time = date.toString();
  [props.place, props.mag, time].forEach(function (text: string) {
    const cell = document.createElement('td')
    cell.textContent = text
    row.appendChild(cell)
  })

  return row
}

function initialize() {
  const quakes = Rx.Observable
    .interval(5000)
    .flatMap(function (): Rx.Observable<JsonpSuccessResponse> {
      return Rx.DOM.jsonpRequest({
        url: QUAKE_URL,
        jsonpCallback: 'eqfeed_callback',
      }).retry(3)
    })
    .flatMap(function (result) {
      return Rx.Observable.from(result.response.features)
    })
    .distinct(function (quake) {
      return quake.properties.code
    }).share()

  quakes.subscribe(function (quake) {
    const coords = quake.geometry.coordinates
    const size = quake.properties.mag * 10000

    const circle = L.circle([coords[1], coords[0]], size).addTo(map)
    quakeLayer.addLayer(circle)
    codeLayers[quake.id] = quakeLayer.getLayerId(circle)
  })

  const table: HTMLTableElement = document.getElementById('quakes_info') as HTMLTableElement

  function getRowFromEvent(event: string) {
    return Rx.Observable
      .fromEvent(table, event)
      .filter(function (event: MouseEvent) { // (1)
        const el: HTMLTableRowElement = event.target as HTMLTableRowElement
        return el.tagName === 'TD' && el.parentNode.id.length
      })
      .pluck('target', 'parentNode') // (2)
      .distinctUntilChanged() // (3)
  }

  getRowFromEvent('mouseover')
    .pairwise()
    .subscribe(function (rows: [HTMLTableRowElement, HTMLTableRowElement]) {
      const prevCircle = quakeLayer.getLayer(codeLayers[rows[0].id])
      const currCircle = quakeLayer.getLayer(codeLayers[rows[1].id])

      prevCircle.setStyle({color: '#0000ff'})
      currCircle.setStyle({color: '#ff0000'})
    })

  getRowFromEvent('click')
    .subscribe(function (row: HTMLTableRowElement) {
      const circle = quakeLayer.getLayer(codeLayers[row.id])
      map.panTo(circle.getLatLng())
    })

  quakes
    .pluck('properties')
    .map(makeRow)
    .subscribe(function (row: HTMLTableRowElement) {
      table.appendChild(row)
    })
}

Rx.DOM.ready().subscribe(initialize)
