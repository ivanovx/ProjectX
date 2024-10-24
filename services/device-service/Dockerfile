FROM eclipse-temurin:21-alpine

COPY --from=sensor-network-builder:latest /workspace/services/device-service/target/*.jar app.jar

EXPOSE 8004

ENTRYPOINT ["java","-jar","app.jar"]