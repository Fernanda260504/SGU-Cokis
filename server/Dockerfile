# Servir la imagen del backend con Maven
FROM maven:3.9.9-eclipse-temurin-21  

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar todos los archivos del proyecto al directorio de trabajo
COPY . .

# Ejecutar los comandos:
# 1. Limpiar y compilar el proyecto generando el JAR (sin ejecutar tests)
# 2. Copiar el JAR resultante al directorio de trabajo con el nombre app.jar
RUN mvn clean package -DskipTests && cp target/*.jar app.jar  # ✅ 'clean' estaba mal escrito como 'clan'

# Exponer el puerto donde correrá la app
EXPOSE 8081

# Ejecutar el comando para servir el JAR
ENTRYPOINT ["java", "-jar", "app.jar"]
