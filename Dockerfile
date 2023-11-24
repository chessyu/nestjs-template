FROM node:18.16.0-alpine

# 创建工作目录
RUN mkdir -p /app

# 指定工作目录
WORKDIR /app

# 复制当前代码到 /app 工作目录
COPY . ./

# 设置npm 源
RUN npm config set registry https://registry.npm.taobao.org/

# npm 安装依赖
COPY package.json /app/package.json
RUN rm -rf /app/package-lock.json
RUN cd /app && rm -rf /app/node_modules && npm install

#打包
RUN cd /app && rm -rf /app/dist && npm run build

#启动服务
CMD npm run start:dev

EXPOSE 3089