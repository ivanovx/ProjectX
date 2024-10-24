FROM eclipse-temurin:21-alpine

COPY --from=sensor-network-builder:latest /workspace/services/stat-service/target/*.jar app.jar

EXPOSE 8006

ENTRYPOINT ["java","-jar","app.jar"]