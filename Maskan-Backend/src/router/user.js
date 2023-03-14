import express from "express";
import passport from "passport";
import path from "path";
import fs from "fs";
import userController from "../controller/userController";
import {
  Auth
} from "../middleware/passport";
import {
  LoginJoi,
  registerJoi,
  EditUserJoi,
  ForgetJoi,
  ContactUsJoi
} from "../middleware/validate";
import {
  UploadImage
} from "../middleware/uploadIMG";
import {
  Google
} from "../middleware/google";
const router = express.Router();

router.post("/register", registerJoi, userController.register);

router.post("/login", LoginJoi, (req, res) => {
  userController.login(req, res);
});

router.get("/profile", Auth, (req, res) => {
  userController.profileUser(req, res);
});
router.get("/users", Auth, (req, res) => {
  userController.AllUsers(req, res);
});
router.put("/edit", Auth, EditUserJoi, (req, res) => {
  userController.editUser(req, res);
});
router.delete("/deleteAccount", Auth, (req, res) => {
  userController.deleteAccount(req, res);
});

router.post("/avatar", Auth, UploadImage("avatar"), (req, res) => {
  userController.avatar(req, res)
});


router.post('/password/find', ForgetJoi, (req, res) => {
  userController.forgetPassword(req, res)
})

router.post('/password/forget', (req, res) => {
  userController.forgetPasswordReset(req, res)
})

router.post('/contactus', ContactUsJoi, (req, res) => {
  userController.contactUs(req, res)
})

router.get('/google', Google);

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');

  });

export default router;