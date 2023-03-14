import express from "express";
import passport from "passport";
import path from "path";
import estateController from '../controller/estateController'
import {
    AddEstate
} from '../middleware/validate'
import {
    Auth
} from "../middleware/passport";
import {
    UploadImage,multipleUploadImage
} from "../middleware/uploadIMG";
import {
    accessRoute
} from '../middleware/accessController'
const router = express.Router();

// Todo : should create new information Estates     

router.post('/create', Auth, accessRoute(['realestate']),  AddEstate, (req, res) => {
    estateController.newEstate(req, res)
})

// Todo : should edit information of exist Estates

router.put('/edit', Auth, (req, res) => {
    estateController.editEstate(req, res)
})

// Todo : should delete one exist Estates 

router.delete('/delete', Auth, (req, res) => {
    estateController.deleteEstate(req, res)
})

// Todo : show One estate

router.get('/', (req, res) => {
    estateController.getOneEstate(req, res)
})

// Todo : real estate developer can seen all Estate (private)

router.get('/myestates', Auth, (req, res) => {
    estateController.allMyEstates(req, res)
})

// Todo : show all exsist Estates (public)

router.get('/estates', (req, res) => {
    estateController.allEstates(req, res)
})

// Todo : show all filtered Estate (limited)

router.get('/filters', (req, res) => {
    estateController.allFilteredEstate(req, res)
})

// Todo : show All Estates sort with price   
router.get('/sortprice', (req, res) => {
    estateController.allSortEstatePrice(req, res)
})


router.post('/estateimg',Auth,multipleUploadImage('places'), estateController.uploadEstateImg)

export default router