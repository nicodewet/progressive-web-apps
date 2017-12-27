# Taking Progressive Web Apps in Action to Production

This repository represents my executable learnings from the [Progressive Web Apps](https://www.manning.com/books/progressive-web-apps) book.

In general I want to run examples with Node.js v8.9.3 (which is what I happen to have on my local right now), Express 4 and ideally I want to wrap them with docker and deploy them to my domain (makario.io).

In terms of bookmarks, if you bought the book you may know that Service Workers are key, so here are some relevant bookmarks and as you may expect MDN has **excellent** documentation:

* [MDN - Service Worker API](https://developer.mozilla.org/en/docs/Web/API/Service_Worker_API)
* [Browser Servicer Worker Ready?](https://jakearchibald.github.io/isserviceworkerready/)
* [Service Workers: an Introduction](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)

## Up and Running With Docker

Note if you already have something listening on your OS port the error message is slightly cryptic.

```
$ docker build -t nicodewet/node-web-app .
$ docker run -p 8080:8080 nicodewet/node-web-app
```

Without the cache and in background.

```
$ docker build --no-cache -t nicodewet/node-web-app .
$ docker run -p 8080:8080 -d nicodewet/node-web-app
```

## Onto Production

### Relatively Simple Uni-Server Setup

On laptop (and CI Server in time).

```
$ docker push nicodewet/node-web-app
```

On EC2 instance.

```
$ sudo docker pull nicodewet/node-web-app  
```

[Secure Apache2 With Let's Encrypt](https://www.digitalocean.com/community/tutorials/how-to-secure-apache-with-let-s-encrypt-on-ubuntu-16-04).

```
$ sudo add-apt-repository ppa:certbot/certbot
$ sudo apt-get update
$ sudo apt-get install python-certbot-apache
$ sudo certbot --apache -d makaro.io -d www.makaro.io
```

Run the app.

```
$ sudo docker run -p 8080:8080 -d nicodewet/node-web-app
```

Finish [apache reverse proxy configuration](https://www.digitalocean.com/community/tutorials/how-to-use-apache-as-a-reverse-proxy-with-mod_proxy-on-ubuntu-16-04). Take note of the *-ssl.conf bit.

```
$ sudo a2enmod proxy
$ sudo a2enmod proxy_http
$ sudo nano /etc/apache2/sites-available/000-default-le-ssl.conf 
$ sudo service apache2 restart
$ sudo service apache2 status
```

With the *-ssl.conf bit you'll add the below into the file.

```
ProxyPreserveHost On

ProxyPass / http://127.0.0.1:8080/
ProxyPassReverse / http://127.0.0.1:8080/
```

### Done

https://www.makaro.io/
