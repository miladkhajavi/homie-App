import express from "express";
import realEstateController from '../controller/realEstateController'
import {} from '../middleware/validate'
import {
    Auth
} from "../middleware/passport";
import {
    accessRoute
} from '../middleware/accessController'
const router = express.Router();


// Todo : should create new information RealEstates
router.post('/signup', Auth, accessRoute(['realestate']), (req, res) => {
    realEstateController.createNew(req, res)
})

// Todo : should edit information RealEstates

router.put('/editinfo', Auth, (req, res) => {
    realEstateController.editInfo(req, res)
})

// Todo : should show information RealEstates

router.get('/', Auth, (req, res) => {
    realEstateController.getInfo(req, res)
})



export default router