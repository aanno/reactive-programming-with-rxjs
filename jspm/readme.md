# Rx Lab SiteOS 11.05.2017

## Aufgaben

### A testscheduler

Normalerweise ist es schwierig, zeitabhängige Ereignisse zu testen _ohne_ lange
zu warten. Die Idee des testscheduler ist es, mit einer 'virtuellen' Zeit zu
arbeiten. Dazu wird der `TestScheduler` verwendet.

#### A.1

* Macht dir klar, wie die beiden Test Module funkionieren. Baut evt. noch (mehr)
  Logging ein (`console.log` oder besser mit `loglevel`)
* Innerhalb eines Streams kann man `do` zum Loggen/Debuggen verwenden. Benutzt
  diese Methode.
  
#### A.2

Das Test Module "Test quake buffering" testet mit `quakeBatches` eine
vereinfachte Version der earthquake App. Es wäre aber besser, den echten
'Stream' zu testen.

* Schreibe die earthquake App so um, dass der Scheduler an vielen/allen
  Stellen explizit übergeben werden muss.
* Jetzt kann man Tests für die Streams schreiben.

#### Tipps:
Viele Rx Methoden nehmen `IScheduler` als zusätzliches Argument, etwa 
`Rx.Observable.from` und `bufferWithTime`.

Die Umwandlung von Observables, so das sie einen anderen Scheduler benutzen
gelingt mit:

* observeOn
* subscribeOn

### B earthquake

#### B.1

* Macht dir klar, wie die Datenstruktur aussieht, die vom Erdbebendienst
  liefert wird. (Logging, siehe A.1)
* Lege die entsprechenden TypeScript Typen an.
* Benutze diese Typen an den entsprechenden Stellen.

#### B.2
Wenn der Maus Cursor über einer Tabellenreihe steht, soll der entsprechende
Erdbebenpunkt rot markiert werden.

Tipp 1: <br/>
Operatoren: pairwise, subscribe

Tipp 2: <br/>
Das DOM Element des Erdbebenkreises bekommt man mittels:
```typescript
quakeLayer.getLayer(codeLayers[row.id])
```

#### B.3
Suche einen alternativen Erdbebenservice und versuche diesen anzubinden.

* http://www.seismicportal.eu
* https://www.programmableweb.com/category/earthquakes/api

### C spaceship

#### C.1

Das Spielerraumschiff schießt ja gar nicht!

* Implementiere `HeroShots` geeignet!
* Frage dich, wovon das Schießen abhängt.
* Warum wird bei `playerFiring` timestamp und sample benutzt?

Tipp: <br/>
Operatoren: combineLatest, distinctUntilChanged, scan

#### C.2

* Der Score ist kaputt.
* Mehr Treffer in kurzer Zeit sollten zu mehr Punkten führen.
* Die Gegner sollten mehr zufällig feuern.

#### C.3

Das Raumschiff kann sich viel zu schnell bewegen! Begrenze die Geschwindigkeit!

#### C.4

Für einen Parallaxe Effekt, arbeite mit mehreren Sternenfeldern, die sich mit
unterschiedlicher Geschwindigkeit bewegen.

## more information

### this repo
https://github.com/aanno/reactive-programming-with-rxjs derived from
https://github.com/behicsakar/reactive-programming-with-rxjs

### jspm
http://jspm.io/0.17-beta-guide/creating-a-project.html
https://github.com/frankwallis/plugin-typescript
https://www.npmjs.com/package/jspm-loader

jspm saying “github rate limit reached” - how to fix?
http://stackoverflow.com/questions/30995040/jspm-saying-github-rate-limit-reached-how-to-fix

#### jspm extras
https://facebook.github.io/watchman/docs/install.html
http://www.mario-brendel.com/angular2-setup/2016/01/28/Angular2_Jspm_Setup_Part1/

https://github.com/jspm/registry
https://github.com/jspm/registry/wiki/Configuring-Packages-for-jspm
https://github.com/jspm/jspm-cli/blob/master/docs/api.md

### chrome
http://www.chrome-allow-file-access-from-file.com/linux.html

Linux
/opt/google/chrome/chrome --allow-file-access-from-files

### misc
https://www.typescriptlang.org/docs/handbook/integrating-with-build-tools.html
https://github.com/systemjs/systemjs/issues/767

### rxjs
https://github.com/Reactive-Extensions/RxJS-DOM

CloseEvent
https://github.com/ReactiveX/rxjs/blob/master/src/observable/dom/WebSocketSubject.ts
