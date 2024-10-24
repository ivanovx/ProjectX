# Sensor Network


  discovery-service:
    build: ./services/discovery-service
    container_name: discovery-service
    ports:
      - 8761:8761
  token-service:
    build: ./services/token-service
    container_name: token-service
    environment:
      - MONGO_URL=mongodb://mongodb:27017/tokens
      - DISCOVERY_SERVICE_URL=http://discovery-service:8761/eureka
    depends_on:
      - discovery-service
      - mongodb
    ports:
      - 8003:8003

Make open weather data from community sensors.

## Services Map

| Service             |  Port|
|---------------------|------|
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
* https://www.baeldung.com/registration-verify-user-by-email - for user create process