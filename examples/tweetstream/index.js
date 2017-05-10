const WebSocketServer = require("ws").Server
const Twit = require("twit")
const Rx = require("rx")

const T = new Twit({
  consumer_key: 'rFhfB5hFlth0BHC7iqQkEtTyw',
  consumer_secret: 'zcrXEM1jiOdKyiFFlGYFAOo43Hsz383i0cdHYYWqBXTBoVAr1x',
  access_token: '14343133-nlxZbtLuTEwgAlaLsmfrr3D4QAoiV2fa6xXUVEwW9',
  access_token_secret: '57Dr99wECljyyQ9tViJWz0H3obNG3V4cr5Lix9sQBXju1',
})

/*
T.onclose = function() {
  // try to reconnect in 5 seconds
  setTimeout(function(){start(websocketServerLocation)}, 5000);
}
 */

function onConnect(ws) {
  console.log('Client connected on localhost:8088')

  // https://gearheart.io/blog/auto-websocket-reconnection-with-rxjs/
  ws.onclose = function() {
    // try to reconnect in 5 seconds
    setTimeout(function(){start(websocketServerLocation)}, 5000);
  }

  var stream = T.stream('statuses/filter', {
    track: 'earthquake',
    locations: [],
  })

  Rx.Observable.fromEvent(stream, 'tweet').subscribe(function (tweetObject) {
    const json = JSON.stringify(tweetObject)
    console.log("tweet", json)
    ws.send(json, function (err) {
      if (err) {
        console.log('There was an error sending the message')
      }
    })
  })

  /*
   var onMessage = Rx.Observable.fromEvent(ws, 'message')
   .subscribe(function(quake) {
   quake = JSON.parse(quake)
   console.log(quake)
   })
   */
  Rx.Observable
    .fromEvent(ws, 'message')
    .flatMap(function (quakesObj) {
      quakesObj = JSON.parse(quakesObj)
      console.log("quakes", quakesObj.quakes)
      return Rx.Observable.from(quakesObj.quakes)
    })
    .scan([], function (boundsArray, quake) { //(1)
      console.log("scan", boundsArray, quake)
      var bounds = [ //(2)
        quake.lng - 0.3, quake.lat - 0.15,
        quake.lng + 0.3, quake.lat + 0.15,
      ].map(function (coordinate) {
        coordinate = coordinate.toString()
        return coordinate.match(/\-?\d+(\.\-?\d{2})?/)[0]
      })

      boundsArray = boundsArray.concat(bounds)
      console.log("boundsArray", boundsArray)
      return boundsArray.slice(Math.max(boundsArray.length - 50, 0)) //(3)
    })
    .subscribe(function (boundsArray) { //(4)
      stream.stop()
      stream.params.locations = boundsArray.toString()
      console.log("subscribe to", boundsArray.toString())
      stream.start()
    })
}

const Server = new WebSocketServer({port: 8088})
Rx.Observable.fromEvent(Server, 'connection').subscribe(onConnect)
