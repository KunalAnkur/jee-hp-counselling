const College = require("../db-models/collegeData");
const User = require("../db-models/user");
// http://localhost:5001/getCollegeData/:name/:email/:phone?quota=&institute=&academic_program_name=&seat_type=&gender=&rank=7000  [example]
exports.getCollegeData = (req, res) => {
  const query = [];
  let field = {};
  for (key in req.query) {
    if (req.query[key] !== "") {
        if(key === 'rank' ){
            query.push({ opening_rank: { $lte: Number(req.query[key]) } });
            query.push({ closing_rank: { $gte: Number(req.query[key]) } });
        }else{
            field[key] = req.query[key];
            query.push(field);
            field = {};
        }
    }
  }
  User.findOne({ email: req.params.email })
    .then((user) => {
      if (user) {
        College.find({
          $and: query,
        })
          .then((data) => {
            return res.status(200).json(data);
          })
          .catch((e) => {
            console.log(e);
            return res.status(200).json({
              message: "Something went wrong in fetching college data",
            });
          });
      } else {
        new User(req.params)
          .save()
          .then((newuser) => {
            College.find({
              $and: query,
            })
              .then((data) => {
                return res.status(200).json(data);
              })
              .catch((e) => {
                console.log(e);
                return res.status(200).json({
                  message: "Something went wrong in fetching college data",
                });
              });
          })
          .catch((e) => {
            console.log(e);
            return res
              .status(200)
              .json({ message: "Something went wrong in creating user" });
          });
      }
    })
    .catch((e) => {
      console.log(e);
      return res
        .status(200)
        .json({ message: "Something went wrong in finding user" });
    });;
};
