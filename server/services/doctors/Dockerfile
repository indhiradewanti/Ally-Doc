FROM node:14.17.3

WORKDIR /home/ubuntu/Ally-Doc/server/services/doctors

ENV PORT=3003
ENV DB_ATLAS=mongodb+srv://allydoc:allydocsuccess@allydoc.37p8h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
ENV SECRET_KEY=allydoc
ENV PRIVATE_KEY=private_Fg9uyVCfSyFjgnrU7T4NFjekt2Q=

COPY package.json package-lock.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "run", "start"]
