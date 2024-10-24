FROM eclipse-temurin:21-alpine

COPY --from=sensor-network-builder:latest /workspace/services/discovery-service/target/*.jar app.jar

EXPOSE 8761

ENTRYPOINT ["java","-jar","app.jar"]