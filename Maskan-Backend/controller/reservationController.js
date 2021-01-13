import Reservation from '../database/models/reservation'
import User from '../database/models/user'
import Estate from '../database/models/estate'
import {
    errorResponses,
    successResponses,
    catchHandle,
    errorResponse,
    successResponseWithOutData
} from '../middleware/response'
import {
    MSG
} from '../middleware/Messages'
import {
    DATE,
    TIME
} from '../middleware/moment'
export default {

    /**
     * @function Create Reservation
     * @param {*} req
     * @param {*} res
     */

    async createNewRequest(req, res) {
        try {
            const {
                estate,
                publisher,
                mobile,
                date,
                time
            } = req.body;

            const item = new Reservation({
                visitor: req.user._id,
                estate,
                publisher,
                mobile,
                fullDate: {
                    date,
                    time
                }
            })
            await item.save()
            successResponses(res, true, MSG.success, item)
        } catch (error) {
            catchHandle(res, error)
        }
    },

    /**
     * @function GetOne Reservation
     * @param {*} req
     * @param {*} res
     */

    async showOneRequest(req, res) {
        try {
            const item = await Reservation.findOne({
                visitor: req.user._id,
                _id: req.query.id
            }).populate('Visitor').populate('estates')
            if (!item) {
                return errorResponses(res, 404, false, MSG.notFound)
            }
            successResponses(res, true, MSG.success, item)
        } catch (error) {
            catchHandle(res, error)
        }
    },

    /**
     * @function getAllForOneUser reservation
     * @param {*} req
     * @param {*} res
     * @return {*} 
     */

    async showAllRequestsUser(req, res) {
        try {
            let limit = 10;
            const page = req.query.page || '1'
            const count = await Reservation.countDocuments({
                visitor: req.user._id
            })
            const items = await Reservation.find({
                    visitor: req.user._id
                }).populate({
                    path: 'visitor',
                    model: User,
                    select: 'userName email'
                }).populate({
                    path: 'estate',
                    model: Estate
                })
                .populate({
                    path: 'publisher',
                    model: User,
                    select: 'userName'
                }).populate('Visitor')
                .sort({
                    createdAt: -1
                })
                .limit(limit)
                .skip((page - 1) * limit)
                .exec()
            if (!items || items.length === 0) {
                return errorResponse(res, false, MSG.notFound)
            }
            successResponses(res, true, MSG.success, {
                items,
                count
            })
        } catch (error) {
            catchHandle(res, error)
        }
    },

    /**
     * @function realEstateRequest getAll
     * @param {*} req
     * @param {*} res
     * @return {*} 
     */

    async showAllRequstForRS(req, res) {
        try {
            let limit = 10;
            const page = req.query.page || '1'
            const items = await Reservation.find({
                    publisher: req.user._id
                }).populate('Visitor').populate('estates')
                .sort({
                    createdAt: -1
                })
                .limit(limit)
                .skip((page - 1) * limit)
                .exec()

            if (!items || items.length === 0) {
                return errorResponses(res, 404, false, MSG.notFound)
            }
            successResponses(res, true, MSG.success, items)
        } catch (error) {
            catchHandle(res, error)
        }
    },


    async showAll(req, res) {
        try {
            let limit = 20;
            const page = req.query.page || '1'
            const items = await Reservation.find({
                    $and: [{
                            status: 'sent'
                        },
                        {
                            status: 'confirmed'
                        }
                    ]
                }).populate('Visitor').populate('estates').populate('Publisher')
                .sort({
                    createdAt: -1
                })
                .limit(limit)
                .skip((page - 1) * limit)
                .exec()

            if (!items || items.length === 0) {
                return errorResponses(res, 404, false, MSG.notFound)
            }
            successResponses(res, true, MSG.success, items)
        } catch (error) {
            catchHandle(res, error)
        }
    },
    /**
     * Todo: user can remove request
     * @param {*} req
     * @param {*} res
     */
    async removeRequest(req, res) {
        try {
            const result = await Reservation.findOneAndDelete({
                _id: req.query.id,
                status: 'sent'
            })
            
            if (!result) {
                return errorResponses(res, 404, false, MSG.notFound)
            }
            successResponseWithOutData(res, true, MSG.success)
        } catch (error) {   
            catchHandle(res, error)
        }
    }
}