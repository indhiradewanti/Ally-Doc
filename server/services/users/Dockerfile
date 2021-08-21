FROM node:14.17.3

WORKDIR /home/ubuntu/Ally-Doc/server/services/users

ENV PORT=3002
ENV DB_ATLAS=mongodb+srv://allydoc:allydocsuccess@allydoc.37p8h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
ENV IMAGE_KIT_BASE_URL=https://upload.imagekit.io/api/v1/files/upload
ENV IMAGE_KIT_PRIVATE_KEY=private_Fg9uyVCfSyFjgnrU7T4NFjekt2Q=
ENV SECRET_KEY=allydoc
ENV TESTING_MONGO_DB=mongodb://localhost:27016/test

COPY package.json package-lock.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "run", "start"]