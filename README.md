# Taking Progressive Web Apps in Action to Production

This repository represents my executable learnings from the [Progressive Web Apps](https://www.manning.com/books/progressive-web-apps) book.

In general I want to run examples with Node.js v8.4.0 (which is what I happen to have on my local right now), Express 4 and ideally I want to wrap them with docker and deploy them to my domain (makario.io).

In terms of bookmarks, if you bought the book you may know the Service Workers are key, so here are some relevant bookmarks and as you may expect MDN has **excellent** documentation:

* [MDN - Service Worker API](https://developer.mozilla.org/en/docs/Web/API/Service_Worker_API)
* [Browser Servicer Worker Ready?](https://jakearchibald.github.io/isserviceworkerready/)
* [Service Workers: an Introduction](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)

## Up and Running With Docker

Note if you already have something listening on your OS port the error message is slightly cryptic.

```
$ docker build -t nicodewet/node-web-app .
$ docker run -p 8080:8080 nicodewet/node-web-app
```

Without the cache and and in background.

```
$ docker build --no-cache -t nicodewet/node-web-app .
$ docker run -p 8080:8080 -d nicodewet/node-web-app
```

## Onto Production

On laptop (and CI Server in time).

```
$ docker push nicodewet/node-web-app
```

On EC2 instance.

```
$ sudo docker pull nicodewet/node-web-app  
```