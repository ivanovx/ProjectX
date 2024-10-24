FROM eclipse-temurin:21-alpine

COPY --from=sensor-network-builder:latest /workspace/services/gateway-service/target/*.jar app.jar

EXPOSE 8000

ENTRYPOINT ["java","-jar","app.jar"]