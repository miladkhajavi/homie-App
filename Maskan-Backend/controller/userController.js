import User from "../database/models/user";
import Contact from "../database/models/contact";
import ForgetPassword from '../database/models/forgetpassword'
import uniqueString from 'unique-string'
import path from 'path'
import fs from 'fs'
import {
  MSG
} from "../middleware/Messages";
import {
  loginResponse,
  catchHandle,
  successResponses,
  errorResponses,
  errorResponse,
  successResponseWithOutData,
} from "../middleware/response";
import Email from "../utils/email";

export default {
  /**
   * Register
   * @param {*} req
   * @param {*} res
   * @param {*} req.body
   */
  async register(req, res) {
    try {
      const {
        userName,
        email,
        password
      } = req.body;
      const exist = await User.findOne({
        userName
      });
      const existEmail = await User.findOne({
        email
      });
      if (exist || existEmail) {
        return errorResponses(res, 409, false, MSG.existUser);
      }
      let user = await new User({
        userName,
        email,
        password,
      }).save();
      successResponses(res, true, MSG.success, user);
    } catch (error) {
      catchHandle(res, error);
    }
  },
  /**
   * Login
   * @param {*} req
   * @param {*} res
   */

  async login(req, res) {
    try {
      const {
        email,
        password
      } = req.body;
      const user = await User.findOneCredential(email, password);
      const token = await user.generateAuthToken();
      loginResponse(res, true, MSG.Login, user, token);
    } catch (error) {
      console.log(error);
      catchHandle(res, error);
    }
  },

  /**
   * Profile
   * @param {*} req
   * @param {*} res
   */

  async profileUser(req, res) {
    try {
      let item = await User.findOne({
        _id: req.user._id
      }).exec()

      if (!item) {
        return errorResponses(res, 404, false, MSG.userNotFound);
      }
      successResponses(res, true, MSG.success, item);
    } catch (error) {
      catchHandle(res, error);
    }
  },
  /**
   * GET ALL USERS
   * @param {*} req
   * @param {*} res
   * @param {*} req.query
   * !sort and page = user/users?page=1&sortBy=createdAt:asc or desc
   */

  async AllUsers(req, res) {
    try {
      const sort = {}
      const {
        page
      } = req.query;
      if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
      }
      // console.log(sort);
      const count = await User.countDocuments();
      const users = await User.find({})
        .sort(sort)
        .limit(5)
        .skip((page - 1) * 5)
        .exec();
      if (!users || users.length === 0) {
        return errorResponses(res, 404, false, MSG.error);
      }
      successResponses(res, true, MSG.success, users)
    } catch (error) {
      catchHandle(res, error);
    }
  },

  /**
   * @param {*} req 
   * @param {*} res 
   */
  async editUser(req, res) {
    try {
      let {
        firstName,
        lastName,
        mobile
      } = req.body;

      const user = await User.findOneAndUpdate({
        _id: req.user._id
      }, {
        $set: {
          firstName,
          lastName,
          mobile,
        },
      }, {
        new: true,
        upsert: true
      });
      if (
        !user ||
        firstName === undefined ||
        lastName === undefined ||
        mobile === undefined
      ) {
        return errorResponse(res, false, MSG.error);
      }
      successResponses(res, true, MSG.success, user);
    } catch (error) {
      catchHandle(res, error);
    }
  },

  /**
   *  DELETE ACCOUNT
   * @param {*} req
   * @param {*} res
   */
  async deleteAccount(req, res) {
    try {
      await req.user.remove();
      successResponseWithOutData(res, true, MSG.success);
    } catch (error) {
      catchHandle(res, error);
    }
  },

  /**
   * @param {*} req 
   * @param {*} res 
   */

  async forgetPassword(req, res) {
    try {
      const {
        email
      } = req.body
      let user = await User.findOne({
        email
      })
      if (!user) {
        return errorResponses(res, 404, false, MSG.userNotFound)
      }
      const forget = new ForgetPassword({
        email,
        token: uniqueString()
      })
      await forget.save()
      Email(forget.email, forget.token)
      successResponses(res, true, MSG.success, forget)
    } catch (error) {
      catchHandle(res, error)
    }
  },

  /**
   * @param {*} req 
   * @param {*} res 
   */
  async forgetPasswordReset(req, res) {
    try {
      const {
        email,
        password
      } = req.body
      let forgetPass = await ForgetPassword.findOne({
        $and: [{
          email
        }, {
          token: req.query.token
        }]
      })
      if (!forgetPass) {
        return errorResponses(res, 404, false, MSG.error)
      }
      if (forgetPass.use) {
        return errorResponses(res, 500, false, MSG.expired)
      }
      let user = await User.findOneAndUpdate({
        email
      }, {
        $set: {
          password
        }
      }, {
        new: true
      })
      if (!user) {
        return errorResponses(res, 404, false, MSG.userNotFound)
      }
      await forgetPass.remove()
      successResponses(res, true, MSG.success, user)
    } catch (error) {
      catchHandle(res, error)
    }
  },

  /**
   * @function avatar user
   * @param {*} req
   * @param {*} res
   */
  async avatar(req, res) {
    try {
      if (req.file !== undefined) {
        if (req.user.avatar && req.user.avatar !== 'user.png') {
          fs.unlink(
            path.join(__dirname, "../upload") + "/avatar/" + req.user.avatar,
            (error) => {
              if (error) {
                return errorResponses(res, 404, false, MSG.userNotFound)
              }
            }
          );
        }
        req.user.avatar = req.file.filename;
        req.user.save();
        successResponses(res, true, MSG.success, req.user.avatar)
      }
    } catch (error) {
      catchHandle(res, error)
    }
  },

  /**
   *
   * Todo: contact us for guest user 
   * @param {*} req
   * @param {*} res
   */
  async contactUs(req, res) {
    try {
      const {
        firstName,
        lastName,
        mobile,
        email,
        description
      } = req.body;
      let item = await new Contact({
        firstName,
        lastName,
        mobile,
        email,
        description
      }).save();
      successResponses(res, true, MSG.success, item)
    } catch (error) {
      catchHandle(res, error)
    }
  }
};