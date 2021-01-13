import express from "express";
import userRouter from "./user";
import estateRouter from './estate'
import realEstateRouter from './realEstate'
import reserveRouter from './reserve'

const router = express.Router();

router.use('/user' , userRouter)
router.use('/reserve', reserveRouter)
router.use('/estate', estateRouter)
router.use('/realstates',realEstateRouter)
export default router;