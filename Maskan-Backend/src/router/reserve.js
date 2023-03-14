import express from "express";
import reservationController from '../controller/reservationController'
import {} from '../middleware/validate'
import {
    Auth
} from "../middleware/passport";
import {
    accessRoute
} from '../middleware/accessController'
const router = express.Router();

// Todo : should send new reserve request
// *users

router.post('/send', Auth, accessRoute(['user']), (req, res) => {
    reservationController.createNewRequest(req, res)
})

// Todo : user can see a his/her request
// *users

router.get('/request', Auth, (req, res) => {
    reservationController.showOneRequest(req, res)
})

// Todo : user can see all his/her requests
// *users

router.get('/request/all', Auth, (req, res) => {
    reservationController.showAllRequestsUser(req, res)
})

// Todo : real Estate can see all requests
// *real Estate developer

router.get('/requests', Auth, accessRoute(['realestate']), (req, res) => {
    reservationController.showAllRequstForRS(req, res)
})

// Todo : admin can see all requests
// *admin

router.get('/all', Auth, accessRoute(['admin']), (req, res) => {
    reservationController.showAll(req, res)
})


// Todo : user can remove his requests
// *user
router.delete('/remove' , Auth, (req,res)=>{
    reservationController.removeRequest(req,res)
})
export default router