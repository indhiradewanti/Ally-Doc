const Doctor = require("../Model/DoctorSchema");
const { hashSync, compareSync } = require("../Helper/Bcrypt");
const jwt = require("jsonwebtoken");
const getAxios = require("../Helper/Axios");

class ControllerDoctor {
  static async createDoctor(req, res, next) {
    try {
      const { access_token } = req.headers;
      const { role } = jwt.verify(access_token, process.env.SECRET_KEY);
      if (role === "Admin") {
        let { email, username, password, specialist, address, price } =
          req.body;
        password = hashSync(password);
        const { originalname } = req.file;
        const buffer = req.file.buffer.toString("base64");
        let imgUrl = await getAxios(originalname, buffer);
        imgUrl = imgUrl.url;
        const data = await Doctor.create({
          email,
          username,
          password,
          photo: imgUrl,
          specialist,
          address,
          price,
        });
        if (!data) {
          throw { code: 400, message: "Error Create Doctor" };
        } else {
          res.status(201).json({ email, username, specialist, address, price });
        }
      } else {
        throw { code: 403, message: "Forbidden access" };
      }
    } catch (err) {
      console.log(err);
      if (err.name === "ValidationError") {
        let errorMessages = [];
        for (let key in err.errors) {
          errorMessages.push(err.errors[key].message);
        }
        next({ code: 400, message: errorMessages.join(", ") });
      }
      if (err.message === "Illegal arguments: undefined, string") {
        err.code = 400;
        err.message = "password wrong/empty";
      }
      const code = err.code;
      const message = err.message;
      next({
        code,
        message,
      });
    }
  }
  static async getAllDoctor(req, res, next) {
    try {
      const data = await Doctor.find({}, { password: 0 });
      res.status(200).json(data);
    } catch (err) {
      const code = err.code;
      const message = err.message;
      next({
        code,
        message,
      });
    }
  }

  static async getIdDoctor(req, res, next) {
    try {
      const { _id } = req.params;
      const data = await Doctor.findById(_id).exec();
      if (data) {
        res.status(200).json(data);
      } else {
        throw { code: 404, message: "Data not found" };
      }
    } catch (err) {
      const code = err.code;
      const message = err.message;
      next({
        code,
        message,
      });
    }
  }

  static async updateDoctor(req, res, next) {
    try {
      const { _id } = req.params;
      let { email, username, specialist, address, price } = req.body;
      const { originalname } = req.file;
      const buffer = req.file.buffer.toString("base64");
      let imgUrl = await getAxios(originalname, buffer);
      imgUrl = imgUrl.url;
      const data = await Doctor.updateOne(
        { _id },
        {
          $set: {
            email,
            username,
            specialist,
            address,
            price,
            status: "Online",
            photo: imgUrl,
          },
        }
      );
      if (data) {
        const dataDoctor = await Doctor.findById(_id);
        res.status(201).json(dataDoctor);
      } else {
        throw { code: 400, message: "Bad request" };
      }
    } catch (err) {
      console.log(err);
      if (err.name === "ValidationError") {
        let errorMessages = [];
        for (let key in err.errors) {
          errorMessages.push(err.errors[key].message);
        }
        next({ code: 400, message: errorMessages.join(", ") });
      }
      const code = err.code;
      const message = err.message;
      next({
        code,
        message,
      });
    }
  }

  static async deleteDoctor(req, res, next) {
    try {
      const { access_token } = req.headers;
      const { role } = jwt.verify(access_token, proceess.env.SECRET_KEY);
      if (role === "Admin") {
        const { _id } = req.params;
        await Doctor.deleteOne({ _id });
        res.status(200).json({ message: "success to delete" });
      } else {
        throw { code: 403, message: "Forbidden to access" };
      }
    } catch (err) {
      console.log(err);
      const code = err.code;
      const message = err.message;
      next({
        code,
        message,
      });
    }
  }

  static async loginDoctor(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await Doctor.findOne({ email });
      if (data) {
        if (data.role === "Doctor") {
          const bool = compareSync(password, data.password);
          if (bool) {
            await Doctor.updateOne(
              { _id: data._id },
              { $set: { status: "Online" } }
            );
            const access_token = jwt.sign(
              {
                id: data._id,
                role: data.role,
                username: data.username,
              },
              process.env.SECRET_KEY
            );
            res.status(200).json({ access_token });
          } else {
            throw { code: 400, message: "Bad Request" };
          }
        } else {
          throw { code: 400, message: "Bad Request" };
        }
      } else {
        throw { code: 404, message: "Email/Password is wrong" };
      }
    } catch (err) {
      console.log(err);
      const code = err.code;
      const message = err.message;
      next({
        code,
        message,
      });
    }
  }

  static async patchStatus(req, res, next) {
    try {
      const { status } = req.body;
      const { _id } = req.params;
      const data = await Doctor.updateOne({ _id }, { $set: { status } });

      if (data) {
        res.status(201).json(data);
      } else {
      }
    } catch (err) {
      console.log(err);
      const code = err.code;
      const message = err.message;
      next({
        code,
        message,
      });
    }
  }

  static async patchPhoto(req, res, next) {
    try {
      const { _id } = req.params;
      const { originalname } = req.file;
      const buffer = req.file.buffer.toString("base64");
      let imgUrl = await getAxios(originalname, buffer);
      imgUrl = imgUrl.url;
      const data = await Doctor.updateOne({ _id }, { $set: { photo: imgUrl } });
      if (data) {
        res.status(201).json(data);
      } else {
      }
    } catch (err) {
      console.log(err);
      const code = err.code;
      const message = err.message;
      next({
        code,
        message,
      });
    }
  }
}

module.exports = ControllerDoctor;
