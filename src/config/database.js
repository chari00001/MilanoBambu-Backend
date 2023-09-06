const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://chari:Afro4246@bambumobilya.jkrdfnp.mongodb.net/bambu-mobilya?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Veritabanına bağlandı!");
  } catch (error) {
    console.error("Veritabanına bağlanırken bir hata oluştu:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
