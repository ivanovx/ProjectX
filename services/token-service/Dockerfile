FROM eclipse-temurin:21-alpine

COPY --from=sensor-network-builder:latest /workspace/services/token-service/target/*.jar app.jar

EXPOSE 8003

ENTRYPOINT ["java","-jar","app.jar"]