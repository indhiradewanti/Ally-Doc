const Doctor = require("../Model/DoctorSchema");

class ControllerDoctor {
  static async createDoctor(req, res, next) {
    try {
      const { email, username, password, photo, specialist, address, price } =
        req.body;
      const data = await Doctor.create({
        email,
        username,
        password,
        photo,
        specialist,
        address,
        price,
        status: "Online",
      });
      if (!data) {
        throw { code: 400, message: "Error Create Doctor" };
      } else {
        const access_token = jwt.sign(
          { id: find._id, username: find.username, role: find.role },
          process.env.SECRET_KEY
        );
        res.status(201).json({ access_token, role: find.role });
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
      const data = await Doctor.find({}, {password: 0})
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
  static async getIdDoctor(req, res, next){
      try{
        const {_id} = req.params
        const data = await Doctor.findById(_id).exec()
        if(data){
            res.status(200).json(data)
        }else{
            throw {}
        }
      } catch(err){
        const code = err.code;
        const message = err.message;
        next({
          code,
          message,
        });
      }
  }
  static async updateDoctor(req, res, next){
      try{
        const {_id} = req.params
        const { email, username, password, photo, specialist, address, price } =
        req.body
        const data = await Doctor.updateOne({_id}, {$set: {
            email,
            username,
            password,
            photo,
            specialist,
            address,
            price,
            status: "Online",
        }})
        if(data){

        }
      }catch(err){

      }
  }
}

module.exports = ControllerDoctor;
