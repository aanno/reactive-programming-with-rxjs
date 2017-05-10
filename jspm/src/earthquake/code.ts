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

const codeLayers = {}
const quakeLayer = L.layerGroup([]).addTo(map)
const identity = Rx.helpers.identity // (1)

function isHovering(element) {
  const over = Rx.DOM.mouseover(element).map(identity(true)) // (2)
  const out = Rx.DOM.mouseout(element).map(identity(false)) // (3)

  return over.merge(out) // (4)
}

function makeRow(props) {
  const row = document.createElement('tr')
  row.id = props.net + props.code

  const date = new Date(props.time)
  const time = date.toString();
  [props.place, props.mag, time].forEach(function (text) {
    const cell = document.createElement('td')
    cell.textContent = text
    row.appendChild(cell)
  })

  return row
}

function initialize() {
  const quakes = Rx.Observable
    .interval(5000)
    .flatMap(function () {
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

  const table = document.getElementById('quakes_info')

  function getRowFromEvent(event) {
    return Rx.Observable
      .fromEvent(table, event)
      .filter(function (event) { // (1)
        const el = event.target
        return el.tagName === 'TD' && el.parentNode.id.length
      })
      .pluck('target', 'parentNode') // (2)
      .distinctUntilChanged() // (3)
  }

  getRowFromEvent('mouseover')
    .pairwise()
    .subscribe(function (rows) {
      const prevCircle = quakeLayer.getLayer(codeLayers[rows[0].id])
      const currCircle = quakeLayer.getLayer(codeLayers[rows[1].id])

      prevCircle.setStyle({color: '#0000ff'})
      currCircle.setStyle({color: '#ff0000'})
    })

  getRowFromEvent('click')
    .subscribe(function (row) {
      var circle = quakeLayer.getLayer(codeLayers[row.id])
      map.panTo(circle.getLatLng())
    })

  quakes
    .pluck('properties')
    .map(makeRow)
    .subscribe(function (row) {
      table.appendChild(row)
    })
}

Rx.DOM.ready().subscribe(initialize)
