FROM node:14.17.3

WORKDIR /home/ubuntu/Ally-Doc/server/orchestrator

ENV PORT=3000
ENV IMAGE_KIT_URL=https://upload.imagekit.io/api/v1/files/upload
ENV IMAGE_KIT_PRIVATE_KEY=private_Fg9uyVCfSyFjgnrU7T4NFjekt2Q=

COPY package.json package-lock.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "run", "start"]