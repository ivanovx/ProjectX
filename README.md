# Sensor Network

Make open weather data from community sensors.

## Services Map

* auth-service
* device-service
* measurement-service
* token-service
* stat-service
* gateway-service
* discovery-service

## Used technologies

* Spring
* MongoDb
* Redis
* React.js
* Next.js
* Docker

## Generate secure token for client openid

```
node -e "console.log(crypto.randomBytes(32).toString('hex'))"
```

## TODO

* Device managements (create, update, delete)
* Device details
* Device stats (includes measurements)
* Token manage (create, update, delete)
* Meassurement managements (view, manage)
* Backend fix and docker

## Documentation and architecture