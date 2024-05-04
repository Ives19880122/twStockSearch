# 使用Node.js 16 image
FROM node:16 AS vue_builder

# 指定工作區
WORKDIR /app

# 將vue資料放入工作區
COPY ./client /app

# 安裝並且打包
RUN npm install && npm run build

# 使用官方 Maven image
FROM maven:3.8.4 AS maven_builder

# 配置工作區
WORKDIR /app

# 複製server的src到容器內
COPY ./server/src ./src

# 複製pom.xml
COPY ./server/pom.xml .

# 下載maven依賴
RUN mvn dependency:go-offline -B

# 複製vue打包資料到SpringBoot
COPY --from=vue_builder /app/dist/ ./src/main/resources/static/

# Maven打包成jar
RUN mvn package -DskipTests

# 使用官方 OpenJDK 作為運行環境
FROM adoptopenjdk/openjdk11:x86_64-ubuntu-jre-11.0.23_9

# 設置工作區
WORKDIR /app

# 把打包完成的jar放到運行的image上
COPY --from=maven_builder /app/target/stock-0.0.1-SNAPSHOT.jar ./app.jar

# 暴露 Spring Boot 默认端口
EXPOSE 8080

# 启动 Spring Boot 应用
CMD ["java", "-jar", "app.jar"]