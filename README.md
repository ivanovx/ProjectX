# Sensor Network

Make open weather data from community sensors.

## Services Map

| Service             |  Port|
------------------------------
| auth-service        |  9000|
| gateway-service     |  8000|
| discovery-service   |  8001|
| device-service      |  8002|
| token-service       |  8003|
| measurement-service |  8004|
| stat-service        |  8005|

## Used technologies

* Spring
  * WebFlux
  * Cloud
  * Eureka
* MongoDb
* Redis
* React.js
* Next.js
* Docker

## Generate key pair for openid auth server
```
Generate an RSA private key, of size 2048, and output it to a file named key.pem:

openssl genrsa -out private-key.pem 2048

Extract the public key from the key pair, which can be used in a certificate:

openssl rsa -in key.pem -outform PEM -pubout -out public-key.pem
```

## Generate secure token for Next.js auth
```
openssl rand -base64 32
```

## TODO

* Device managements (delete)
* Device details
* Device stats (includes measurements)
* Token manage (update, delete)
* Meassurement managements (view, manage)
* Backend fix and docker

## Documentation and architecture

## Used links

* https://docs.spring.io/spring-authorization-server/reference/guides/how-to-pkce.html - for Auth Server configuration