FROM node:18-alpine3.18
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.* ./
RUN npm ci --quiet 
# RUN npm install typescript -g
ADD . .
# RUN npm run build

COPY prisma ./prisma/

RUN chmod 777 ./prisma
RUN chmod 777 ./node_modules/prisma
RUN chmod 777 ./node_modules/.prisma/client/index.js

# RUN npx prisma generate

EXPOSE 4010
RUN ./dist/server.js

