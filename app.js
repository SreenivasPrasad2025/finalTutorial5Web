const express = require("express");
const application = express();
application.use(express.json());

const port = 5400; //
let DbUsers = [
  { email: "abc@abc.ca", firstName: "ABC", id: "7hYD438" },
  { email: "xyz@xyz.ca", firstName: "XYZ", id: "Pjh43h4" },
];

function findUser(id) {
  for (let i = 0; i < DbUsers.length; i++) {
    if (DbUsers[i].id === id) {
      return DbUsers[i];
    }
  }
}

let randomGenerateId = () => {
  let id_length = 7;
  let final_result = "";
  const char = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const totalLength = char.length;
  for (let i = 0; i < id_length; i++) {
    final_result += char.charAt(Math.floor(Math.random() * totalLength));
  }
  return final_result;
};

application.get("/users", (req, res) => {
  res.json({
    message: "Users retrieved",
    success: true,
    users: DbUsers,
  });
});

application.post("/add", (req, res) => {
  const { email, firstName } = req.body;
  const newUser = {
    email: email,
    firstName: firstName,
    id: randomGenerateId(),
  };
  DbUsers.push(newUser);
  res.status(201).json({
    message: "User added",
    success: true,
  });
});

application.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { email, firstName } = req.body;
  const user = findUser(id);
  if (user === undefined) {
    return res
      .status(404)
      .json({ message: "User not found in the Database", success: false });
  }
  user.email = email || user.email;
  user.firstName = firstName || user.firstName;
  res.json({
    message: "User updated",
    success: true,
  });
});

application.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const user = findUser(id);
  console.log(user);
  if (user == undefined) {
    return res.status(404).json({ message: "User not found", success: false });
  }
  res.json({
    success: true,
    user: user,
  });
});

application.listen(port);
