const History = require("../Model/HistorySchema");

class ControllerHistory{
    static async getHistory(req, res, next) {
        try {
          const data = await History.find();
          res.status(200).json(data);
        } catch (err) {
          if (err.message === "jwt malformed") {
            err.code = 403;
            err.message = "Forbidden to access";
          }
          const code = err.code;
          const message = err.message;
          next({
            code,
            message,
          });
        }
      }
      static async postHistory(req, res, next) {
        try {
          const { name, age, gender } = req.body;
          const data = await History.create({
            name,
            age,
            gender,
            status: "in progress",
          });
          if (data) {
            res.status(201).json(data);
          } else {
            throw { code: 400, message: "Error create history" };
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