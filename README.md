# koa-server

## Intruduction

This is a Node.js app built with Koa. And it's for personal use only.

> To generate a self-signed https keys, use
> openssl req -newkey rsa:4096 \
> -x509 \
> -sha256 \
> -days 3650 \
> -nodes \
> -out example.crt \
> -keyout example.key
> -subj "/C=SI/ST=Ljubljana/L=Ljubljana/O=Security/OU=IT Department/CN=www.example.com"

## Goal

- Basic knowledge of Koa middleware system.
- Do different experiments on some well-known features/functionalities
  - cors
  - server push
  - streaming api
  - resource cache
  - template engines
  - websockets
  - http/https
  - http2 server push feature

## To-do List

- [x] render static html file
- [x] serve assets
- [ ] page redirect
- [x] https
- [x] cors testing
- [x] classic SSR built with `jQuery` and `react`
- [x] classic CSR built with `react`
- [x] SSR react 18 `renderToPipeableStream`
- [ ] login system with cookie
- [ ] login system with JWT
- [ ] http2 server push
- [ ] mess around with cache (even with redis)
- [ ] server component
- [ ] relay + GraphQL
