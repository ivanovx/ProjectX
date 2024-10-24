FROM maven:3-eclipse-temurin-21-alpine

RUN mkdir -p /workspace

WORKDIR /workspace

COPY pom.xml /workspace/pom.xml
COPY common /workspace/common
COPY services /workspace/services

RUN mvn -f pom.xml clean package -DskipTests