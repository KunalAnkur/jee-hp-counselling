const College = require("../db-models/collegeData");
const User = require("../db-models/user");
// http://localhost:5001/getCollegeData/:name/:email/:phone?quota=&institute=&academic_program_name=&seat_type=&gender=&rank=7000  [example]
exports.getCollegeData = (req, res) => {
  const query = [];

  // console.log(req.params);

  let field = {};
  for (key in req.query) {
    if (req.query[key] !== "") {
      if (key === "rank") {
        query.push({ opening_rank: { $lte: Number(req.query[key]) } });
        query.push({ closing_rank: { $gte: Number(req.query[key]) } });
      } else {
        field[key] = req.query[key];
        query.push(field);
        field = {};
      }
    }
  }

  User.findOne({ email: req.params.email })
    .then((user) => {
      if (user) {
        // console.log(user);

        if (query.length === 0) {
          // user.searchCombinations.push(req.query);
          // user.save();

          College.find({})
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
          //this is condition where user is already created and there is query paramter
          user.searchCombinations.push(req.query);
          user.save();

          // console.log(user.searchCombinations);

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
        }
      } else {
        new User(req.params)
          .save()
          .then((newuser) => {
            // console.log(newuser);
            if (query.length === 0) {
              College.find({})
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
              // creating new user and query is also passed
              user.searchCombinations.push(req.query);
              user.save();

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
            }
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
    });
};

exports.getCollegeDataFiltering = (req, res) => {
  const collegeData = College.find({})
    .then((data) => {
      // const getUniqueBy = (arr, prop) => {
      //   // const set = new Set();
      //   // return arr.filter((o) => !set.has(o[prop]) && set.add(o[prop]));
      //   const unique = [...new Set(arr.map((item) => item.prop))];
      //   return unique;
      // };

      // const institueUniquedata = getUniqueBy(data, "institute");
      // const acadmeicUniquedata = getUniqueBy(data, "academic_program_name");
      // const quotaUniqueData = getUniqueBy(data, "quota");
      // const seatTypeUniqueData = getUniqueBy(data, "seat_type");
      // const genderUniqueData = getUniqueBy(data, "gender");

      const institueUniquedata = [
        ...new Set(data.map((item) => item.institute)),
      ];
      const acadmeicUniquedata = [
        ...new Set(data.map((item) => item.academic_program_name)),
      ];

      const quotaUniqueData = [...new Set(data.map((item) => item.quota))];

      const seatTypeUniqueData = [
        ...new Set(data.map((item) => item.seat_type)),
      ];
      const genderUniqueData = [...new Set(data.map((item) => item.gender))];

      return res.status(200).json({
        institueUniquedata,
        acadmeicUniquedata,
        quotaUniqueData,
        seatTypeUniqueData,
        genderUniqueData,
      });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: "Error while getting data for filtering" });
    });
};
