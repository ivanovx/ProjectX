FROM maven:3-eclipse-temurin-21-alpine AS build

RUN mkdir -p /workspace
WORKDIR /workspace
COPY pom.xml /workspace

COPY src /workspace/src
RUN mvn -f pom.xml clean package

FROM eclipse-temurin:21-alpine
COPY --from=build /workspace/target/*.jar app.jar
EXPOSE 9000
ENTRYPOINT ["java","-jar","app.jar"]