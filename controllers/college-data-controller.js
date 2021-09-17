const { 
  counsellingOne,
  // counsellingTwo,
  // counsellingThree,
  // counsellingFour,
  // counsellingFive,
  counsellingSix
} = require("../db-models/collegeData");
const User = require("../db-models/user");

const counselObject = {
  'counselling-1': counsellingOne,
  // 'counselling-2': counsellingTwo,
  // 'counselling-3': counsellingThree,
  // 'counselling-4': counsellingFour,
  // 'counselling-5': counsellingFive,
  'counselling-6': counsellingSix
}
// http://localhost:5001/getCollegeData/:name/:email/:phone?quota=&institute=&academic_program_name=&seat_type=&gender=&rank=7000  [example]
exports.getCollegeData = (req, res) => {
  const query = [];

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

          counsellingSix.find({})
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

          counsellingSix.find({
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
              counsellingSix.find({})
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

              counsellingSix.find({
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
  const collegeData = counsellingSix.find({})
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
      ].filter(Boolean);
      const acadmeicUniquedata = [
        ...new Set(data.map((item) => item.academic_program_name)),
      ].filter(Boolean)

      const quotaUniqueData = [...new Set(data.map((item) => item.quota))].filter(Boolean)

      const seatTypeUniqueData = [
        ...new Set(data.map((item) => item.seat_type)),
      ].filter(Boolean)
      const genderUniqueData = [...new Set(data.map((item) => item.gender))].filter(Boolean)

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
