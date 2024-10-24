FROM eclipse-temurin:21-alpine

COPY --from=sensor-network-builder:latest /workspace/services/measurement-service/target/*.jar app.jar

EXPOSE 8005

ENTRYPOINT ["java","-jar","app.jar"]