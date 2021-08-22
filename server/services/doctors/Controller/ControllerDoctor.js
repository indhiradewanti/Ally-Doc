const Doctor = require("../Model/DoctorSchema");
const { hashSync, compareSync } = require("../Helper/Bcrypt");
const jwt = require("jsonwebtoken");

class ControllerDoctor {
  static async createDoctor(req, res, next) {
    try {
      const { access_token } = req.headers;
      const { role } = jwt.verify(access_token, process.env.SECRET_KEY);
      if (role === "Admin") {
        let { email, username, password, specialist, address, price, photo } =
          req.body;
        // console.log({ email, username, password, specialist, address, price, photo })
        password = password ? hashSync(password) : undefined;
        const data = await Doctor.create({
          email,
          username,
          password,
          photo,
          specialist,
          address,
          price,
          role: "Doctor",
        });
        if (!data) {
          throw { code: 400, message: "Error Create Doctor" };
        } else {
          const token_doctor = jwt.sign(
            { _id: data._id, email: data.email, role: data.role },
            process.env.SECRET_KEY
          );
          res.status(201).json({ access_token: token_doctor });
        }
      } else {
        throw { code: 403, message: "Forbidden access" };
      }
    } catch (err) {
      console.log(err.message);
      if (err.name === "ValidationError") {
        let errorMessages = [];
        for (let key in err.errors) {
          errorMessages.push(err.errors[key].message);
        }
        next({ code: 400, message: errorMessages.join(", ") });
      }
      if (err.message === "Illegal arguments: undefined, string") {
        err.code = 400;
        err.message = "Password wrong/empty";
      }
      if (err.message === "jwt malformed") {
        err.code = 403;
        err.message = "Forbidden access";
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
      console.log(_id);
      const { email, username, specialist, address, price, photo, status } =
        await Doctor.findById(_id).exec();
      if (email) {
        res
          .status(200)
          .json({ email, username, specialist, address, price, photo, status });
      } else {
        throw { code: 404, message: "Data not found" };
      }
    } catch (err) {
      // console.log(err.message);
      if (!err.code) {
        // console.log('masuk sini')
        err = { code: 404, message: "Data not found" };
      }
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
      let { email, username, specialist, address, price, photo } = req.body;
      if (!email || !username || !specialist || !address || !price || !photo) {
        if (!email) throw { code: 400, message: "email cannot be empty" };
        if (!username) throw { code: 400, message: "username cannot be empty" };
        if (!address) throw { code: 400, message: "address cannot be empty" };
        if (!price) throw { code: 400, message: "price cannot be empty" };
        if (!photo) throw { code: 400, message: "photo cannot be empty" };
        if (!specialist)
          throw { code: 400, message: "specialist cannot be empty" };
      } else {
        const data = await Doctor.updateOne(
          { _id },
          {
            $set: {
              email,
              username,
              specialist,
              address,
              price,
              photo,
            },
          }
        );
        if (data) {
          const data = await Doctor.findById(_id).exec();
          console.log(data);
          res
            .status(201)
            .json({ email, username, specialist, address, price, photo });
        } else {
          throw { code: 404, message: "Data not found" };
        }
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        let errorMessages = [];
        for (let key in err.errors) {
          errorMessages.push(err.errors[key].message);
        }
        next({ code: 400, message: errorMessages.join(", ") });
      }
      if (!err.code) {
        err = { code: 404, message: "Data not found" };
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
      const { role } = jwt.verify(access_token, process.env.SECRET_KEY);
      if (role === "Admin") {
        const { _id } = req.params;
        await Doctor.deleteOne({ _id });
        res.status(200).json({ message: "success to delete" });
      } else {
        throw { code: 403, message: "Forbidden to access" };
      }
    } catch (err) {
      if (err.message === "jwt malformed") {
        err.code = 403;
        err.message = "Forbidden to access";
      }
      if (!err.code) {
        err = { code: 404, message: "Data not found" };
      }
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
        throw { code: 400, message: "Email/Password is wrong" };
      }
    } catch (err) {
      console.log(err);
      if (err.message === "Illegal arguments: undefined, string") {
        err.code = 400;
        err.message = "Password wrong/empty";
      }
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
      if (!status) {
        throw { code: 400, message: "Status cannot be empty" };
      } else {
        const data = await Doctor.updateOne({ _id }, { $set: { status } });
        if (data) {
          res.status(201).json({ message: "success to update" });
        } else {
          throw { code: 404, message: "Data not found" };
        }
      }
    } catch (err) {
      console.log(err);
      if (!err.code) {
        err = { code: 404, message: "Data not found" };
      }
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
      const { photo } = req.body;
      if (photo) {
        const data = await Doctor.updateOne({ _id }, { $set: { photo } });
        if (data) {
          res.status(201).json({ message: "success update photo" });
        } else {
          throw { code: 404, message: "Data not found" };
        }
      } else {
        throw { code: 400, message: "Photo cannot be empty" };
      }
    } catch (err) {
      console.log(err);
      if (!err.code) {
        err = { code: 404, message: "Data not found" };
      }
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
