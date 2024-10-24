FROM eclipse-temurin:21-alpine

COPY --from=sensor-network-builder:latest /workspace/services/auth-service/target/*.jar app.jar

EXPOSE 9000

ENTRYPOINT ["java","-jar","app.jar"]