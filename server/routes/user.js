const mongoose = require('mongoose')
const express = require('express')
const Users = mongoose.model('User')
const router = express.Router()

// create api 
router.post('/createdata', async (req, res) => {
  try {
    const { rollNo, firstName, lastName, email, address, subject, gender, profilePhoto } = req.body;
    // if(rollNo,firstName,lastName,address,subject,gender,profilePhoto)
    if (!rollNo || !firstName || !lastName || !email || !profilePhoto) {
      return res.status(400).json({ error: "please fill all required fields" });
    }
    const createData = await new Users({ rollNo, firstName, lastName, email, profilePhoto, ...req.body, })
    await createData.save()
    console.log('data :', createData)
    return res.status(200).json({ message: "user data created successfully", createData });
  } catch (err) {
    console.log('Error:', err);
    return res.status(400).json({ error: err.message }); // Log the error message
  }

})

router.get("/alldata", async (req, res) => {
  try {
    const readData = await Users.find();
    res.status(200).json(readData);
  }
  catch (err) {
    return res.status(400).json({ error: 'unable to get all data', err });
  }
});

router.delete("/deleteuser/:id", async (req, res) => {
  let delData = await Users.findByIdAndDelete({ _id: req.params.id });
  return res.status(200).json({ message: 'deleted', delData });
});



router.get("/singlestudent/:id", async (req, res) => {
  try {
    const data = await Users.findOne({ _id: req.params.id });
    if (!data) {
      return res.status(404).json({ error: "cannot find user" });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.put("/updateuser/:id", async (req, res) => {
  const id = req.params.id;
  const data = await Users.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!data) {
    return res.status(404).json({ error: "cannot find student" });
  }

  return res.status(200).json("student Successfully updated");
});
module.exports = router;

