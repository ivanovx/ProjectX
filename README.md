# Sensor Network

Make open weather data from community sensors.

## Architecture

* auth-service
* device-service
* measurement-service
* token-service
* stat-service
* gateway-service
* discovery-service

## Services Map

* auth-service
* device-service
* measurement-service
* token-service
* stat-service
* gateway-service
* discovery-service

## Used technologies


## docs

1. generate secure token for client openid

```
node -e "console.log(crypto.randomBytes(32).toString('hex'))"
```
