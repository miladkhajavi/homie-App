import express from "express";
import userRouter from "./user";
import estateRouter from './estate'
import realEstateRouter from './realEstate'
import reserveRouter from './reserve'
import swagger from "swagger-ui-express"
import swaggerDoc from "../../documents/swagger.json"

const router = express.Router();

router.use('/homie/api-ui', swagger.serve);
router.get('/homie/api-ui',swagger.setup(swaggerDoc))

router.use('/user' , userRouter)
router.use('/reserve', reserveRouter)
router.use('/estate', estateRouter)
router.use('/realstates',realEstateRouter)
export default router;