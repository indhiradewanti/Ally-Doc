const History = require("../Model/HistorySchema");

class ControllerHistory{
    static async getHistory(req, res, next) {
        try {
          const data = await History.find();
          res.status(200).json(data);
        } catch (err) {
            console.log(err.message)
            /* istanbul ignore next */
          next({
            code: err.code,
            message: err.message,
          });
        }
      }
      static async postHistory(req, res, next) {
        try {
          const { userName, userId, userGender, userPhoto, doctorId, doctorName, doctorPhoto, doctorSpecialist} = req.body;
          const data = await History.create({ userName, userId, userGender, userPhoto, doctorId, doctorName, doctorPhoto, doctorSpecialist, status: 'in progress'});
          if (data) {
            res.status(201).json(data);
          } else {
            /* istanbul ignore next */
            throw { code: 400, message: "Error create history" };
          }
        } catch (err) {
            console.log(err.message)
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
      static async patchStatusHistory(req, res, next) {
        try {
          const { status } = req.body;
          const { _id } = req.params;
          if (status) {
            const data = await History.updateOne(
              { _id },
              {
                $set: {
                  status,
                },
              }
            );
            res.status(201).json({ status });
          } else {
            throw { code: 400, message: "status cannot be empty" };
          }
        } catch (err) {
            console.log(err.message)
          const code = err.code;
          const message = err.message;
          next({
            code,
            message,
          });
        }
      }
}

module.exports = ControllerHistory