# Nestjs 项目 CI/CD

> 采用Github Actions + Docker + pm2 实现Nestjs项目在AWS服务器上的CI/CD


## 1. 连接云服务器

### 1.1 根据AWS文档，连接服务器

- [AWS文档](https://docs.aws.amazon.com/zh_cn/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html)


1. 下载服务器私钥
2. chmod 400 xxx.pem
3. xxx.pem 放在 ~/.ssh/ 下
4. .ssh/config 文件中新增下面字段
```shell
Host ec2
  Hostname xxxxx.amazonaws.com
  user ec2-xxx
  IdentityFile ~/.ssh/xxx.pem
  Port 22
```
5. 执行 ssh ec2 连接正式环境服务器


## 2. Docker

### 2.1 安装Docker

```shell
sudo yum update -y # 更新实例上已安装的程序包和程序包缓存

sudo yum install -y docker # 安装最新的 Docker Community Edition 程序包

sudo service docker start #启动 Docker 服务

sudo usermod -a -G docker ec2-user # 将 ec2-user 添加到 docker 组，以便您能够执行 Docker 命令，而无需使用 sudo。

newgrp docker #更新用户组

docker info # 验证 ec2-user 是否能在没有 sudo 的情况下运行 Docker 命令。
```

### 2.2 创建Dockerfile

- 根据自己的项目创建Dockerfile, 这里是个例子🌰
```shell
FROM node:18.0-alpine3.14 as build-stage

# 创建工作目录
WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install pnpm -g

RUN pnpm install

# 将 NestJS 代码拷贝到工作目录

COPY . .

RUN pnpm run build

# production stage

FROM node:18.0-alpine3.14 as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm install pnpm -g

RUN pnpm install

RUN npm install pm2 -g

EXPOSE 3000

# 在容器启动时运行 NestJS 项目
CMD ["pm2-runtime", "/app/main.js"]
```

### 2.3 登录Docker-hub

```shell
docker login

# 输入用户名和密码
# 登录成功
```

[创建存储镜像地方](https://hub.docker.com/repositories/codehzy)

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202308010045522.png)

## 3. Github Actions

### 3.1 创建Github Actions

- 在项目根目录下创建 .github/workflows/deploy.yml 文件

- DOCKER_USERNAME: Docker Hub 用户名
- DOCKER_PASSWORD: Docker Hub 密码
- EC2_HOST: 云服务器公网IP
- EC2_USERNAME: 云服务器用户名
- EC2_PRIVATE_KEY: 云服务器私钥(**需要手动创建- 一定要跟着下方做,这是个坑点**)
```shell
# Simple way just:

ssh-keygen -t ed25519 -a 200 -C "your@email.com"

# enter name of ssh-key for example: thorn

cat thorn.pub >> ~/.ssh/authorized_keys

finally copy a ssh private key:

cat thorn

# Copy value between ` -----BEGIN OPENSSH PRIVATE KEY----- some value of ssh-key -----END OPENSSH PRIVATE KEY-----
```
- SSH_PORT: 云服务器SSH端口

```shell
name: Docker CI/CD Nest

on:
  push:
    branches:
      - main

jobs:
  build-test-deploy:
    runs-on: self-hosted

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Login to Docker Hub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and Push Docker Image
        uses: docker/build-push-action@v2
        with:
          context: .
          push: true
          tags: codehzy/hello-world:latest

      - name: Deploy to Ec2 instance
        uses: appleboy/ssh-action@v0.1.4
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USERNAME }}
          key: ${{ secrets.EC2_PRIVATE_KEY }}
          port: ${{ secrets.SSH_PORT }}
          script: |
            script: whoami
            docker stop hello-world || true
            docker rm hello-world || true
            docker pull codehzy/hello-world:latest
            docker run -d -p 80:3000 hello-world:latest
```


### 3.2 点击仓库

> setting -> secrets -> new repository secret 添加对应秘钥
> 注意: 秘钥名称要跟上面的一致
> 
> setting -> Code and automation -> Actions -> Runners -> Add runner -> Linux -> 选择自己的系统 -> 下载对应的runner -> 解压 -> 运行
> 注意: 这一步跟着github的步骤走,名字要起的与github actions中的一致, 这样当你提交代码的时候(main分支), github actions就会自动运行了, 并将任务托管给runner, 从而完成服务器上的配置

## X: 注意点

### 1. How to fix docker: Got permission denied while trying to connect to the Docker daemon socket

[解决办法](https://www.digitalocean.com/community/questions/how-to-fix-docker-got-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket)

```shell
sudo chmod 666 /var/run/docker.sock
```

### 2. ssh: handshake failed: ssh: unable to authenticate, attempted methods [none publickey], no supported methods remain

![](https://imgsbed-1301560453.cos.ap-shanghai.myqcloud.com//blog202308010051216.png)

参考[解决办法](https://github.com/appleboy/ssh-action/issues/80)


