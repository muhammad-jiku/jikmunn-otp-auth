const mongoose = require('mongoose');

// database uri
const uri = `mongodb+srv://${process.env.DB_AUTHOR}:${process.env.DB_PASS}@cluster0.mkf46q8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// connecting to the database
const databaseConnect = async () => {
  await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('DB connected!!');
    })
    .catch((err) => {
      // console.log(err);
      res.status(500).json({
        message: 'Something went wrong!',
      });
    });
};

// exporting module
module.exports = databaseConnect;
