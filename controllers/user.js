const { User, validate } = require("../models/User");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const register = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(200).json({
        success: false,
        message: error.details[0].message,
      });
    } else {
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        return res.status(409).json({
          success: false,
          message: "Kullanıcı adı zaten kullanılıyor.",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      }).save();

      res.status(201).json({
        success: true,
        message: "Kullanıcı başarıyla oluşturuldu.",
      });
    }

    // const { username, email, password } = req.body;
    // const userObj = new User({
    //   username,
    //   email,
    //   password,
    // });

    // if (password.length < 8) {
    //   userCanRegister = false;
    //   return res.status(200).json({
    //     success: false,
    //     message: "Şifre en az 8 karakter olmalıdır.",
    //   });
    // }

    // const userExist = await User.findOne({
    //   $or: [{ username }, { email }],
    // });

    // if (!userExist) {
    //   let user = await userObj.save();
    //   return res.status(201).json({
    //     success: true,
    //     message: "Kullanıcı oluşturuldu.",
    //     user,
    //   });
    // } else {
    //   return res.status(200).json({
    //     success: false,
    //     message: "Kullanıcı adı veya email zaten kullanılıyor.",
    //   });
    // }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Kullanıcı oluşturulurken bir hata oluştu.",
    });
  }
};

const login = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    } else {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Kullanıcı bulunamadı.",
        });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(401).json({
          success: false,
          message: "Kullanıcı adı veya şifre hatalı.",
        });
      }
      const token = user.generateAuthToken();
      return res.status(200).json({
        success: true,
        message: "Giriş başarılı.",
        data: token,
      });
    }

    // const { username, password } = req.body;
    // const foundUser = await User.findOne({
    //   username,
    //   password,
    // });
    // console.log(req.body);
    // if (!foundUser) {
    //   return res.status(200).json({
    //     success: false,
    //     message: "Kullanıcı bulunamadı.",
    //   });
    // }
    // return res.status(200).json({
    //   success: true,
    //   message: "Giriş başarılı.",
    //   user: foundUser,
    // });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Giriş yapılırken bir hata oluştu.",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      message: "Kullanıcılar başarıyla getirildi.",
      users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Kullanıcılar getirilirken bir hata oluştu.",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Kullanıcı başarıyla silindi.",
      deletedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Kullanıcı silinirken bir hata oluştu.",
    });
  }
};

const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
    },
    {
      new: true,
    }
  );
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Kullanıcı bulunamadı.",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Kullanıcı güncellendi.",
    user,
  });
};

const validateUser = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validateUser(data);
};

module.exports = {
  register,
  login,
  getUsers,
  deleteUser,
  updateUser,
};
