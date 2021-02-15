import RealEstate from '../database/models/realestatedeveloper'
import {
    errorResponses,
    successResponses,
    catchHandle,
    successResponseWithOutData
} from '../middleware/response'
import {
    MSG
} from '../middleware/Messages'
export default {
    /**
     * @function Create realEstate
     * @param {*} req
     * @param {*} res
     * @return {*}
     */
    async createNew(req, res) {
        try {
            const {
                name,
                address,
                phone
            } = req.body
            const exist = await RealEstate.findOne({
                name
            })
            if (exist) {
                return errorResponses(res, 409, false, MSG.exist)
            }
            const create = new RealEstate({
                user: req.user._id,
                name,
                address,
                phone
            })
            await create.save()
            successResponses(res, true, MSG.success, create)
        } catch (error) {
            catchHandle(res, error)
        }
    },

    /**
     * @function getInfo realEstate 
     * @param {*} req 
     * @param {*} res 
     */
    async getInfo(req, res) {
        try {
            const item = await RealEstate.findOne({
                _id: req.query.id
            }).populate('owner')
            if (!item || req.body.id === undefined) {
                return errorResponses(res, 404, false, MSG.notFound)
            }
            successResponses(res, true, MSG.success, item)
        } catch (error) {
            catchHandle(res, error)
        }
    },

    async editInfo(req, res) {
        try {
            const {
                name,
                address,
                phone
            } = req.body
            const item = await RealEstate.findOneAndUpdate({
                user: req.user._id,
                _id: req.query.id
            }, {
                $set: {
                    name,
                    address,
                    phone
                }
            }, {
                new: true,
                upsert: true
            })
            if (!item || name === undefined || address === undefined || phone === undefined) {
                return errorResponses(res, 404, false, MSG.error)
            }
            successResponses(res, true, MSG.success, item)
        } catch (error) {
            catchHandle(res, error)
        }
    }

}