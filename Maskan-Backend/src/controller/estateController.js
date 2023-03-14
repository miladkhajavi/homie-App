import Estate from '../models/estate'
import User from '../models/user'
import RSD from '../models/realestatedeveloper'
import getCoordsForAddress from "../utils/location";
import {
    catchHandle,
    errorResponses,
    successResponses,
    successResponseWithOutData,
} from '../middleware/response'
import {
    MSG
} from '../middleware/Messages'
export default {
    /**
     * @function create_new estate 
     * @param {*} req
     * @param {*} res
     * @return {JSON} 
     */
    async newEstate(req, res) {
        try {
            const {
                rsd,
                type,
                propertyType,
                price,
                bedRooms,
                bathRooms,
                meter,
                address,
                description
            } = req.body
            const coordinates = await getCoordsForAddress(address)
            if (!coordinates) {
                return errorResponses(res, 404, false, MSG.error)
            }
            const newEstate = await new Estate({
                publisher: req.user._id,
                location: coordinates,
                rsd,
                type,
                propertyType,
                price,
                bedRooms,
                meter,
                bathRooms,
                address,
                description,
                images: [
                    'default.png'
                ]
            })
            await newEstate.save()
            successResponses(res, true, MSG.success, newEstate)
        } catch (error) {
            catchHandle(res, error)
        }
    },

    /**
     *
     * @function update estate
     * @param {*} req
     * @param {*} res
     * @return {*} 
     */
    async editEstate(req, res) {
        try {
            const {
                type,
                propertyType,
                price,
                bedRooms,
                bathRooms,
                address,
                description
            } = req.body
            const estate = await Estate.findOneAndUpdate({
                _id: req.query.id
            }, {
                $set: {
                    type,
                    propertyType,
                    price,
                    bedRooms,
                    bathRooms,
                    address,
                    description
                }
            }, {
                new: true,
                upsert: true
            })
            if (!estate) {
                return errorResponses(res, 404, false, MSG.error)
            }
            successResponses(res, true, MSG.success, estate)
        } catch (error) {
            catchHandle(res, err)
        }
    },

    /**
     *
     * @function Estate delete
     * @param {*} req
     * @param {*} res
     */

    async deleteEstate(req, res) {
        try {
            const estate = await Estate.findOneAndDelete({
                _id: req.body.id,
                publisher: req.user._id
            })
            if (!estate || publisher === undefined) {
                return errorResponses(res, 404, false, MSG.userNotFound)
            }
            successResponseWithOutData(res, true, MSG.success)
        } catch (error) {
            catchHandle(res, error)
        }
    },

    /**
     * @function getOne estate
     * @param {*} req
     * @param {*} res
     */
    async getOneEstate(req, res) {
        try {
            const item = await Estate.findOne({
                _id: req.query.id
            }).populate({
                path: 'publisher',
                model: User,
                select: 'email'
            }).populate({
                path: 'rsd',
                model: RSD,
                select: 'name address phone'
            })
            if (!item) {
                return errorResponses(res, 404, false, MSG.error)
            }
            successResponses(res, true, MSG.success, item)
        } catch (error) {
            catchHandle(res, error)
        }
    },

    /**
     * *PRIVATE
     * @function All-My-Estates get
     * @param {*} req
     * @param {*} res
     * ?page = user/users?page=1
     * !if have sort = user/users?page=1&sortBy=createdAt:asc or desc
     */
    async allMyEstates(req, res) {
        try {
            const sort = {}
            const {
                page
            } = req.query || '1';
            if (req.query.sortBy) {
                const parts = req.query.sortBy.split(':')
                sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
            }
            const count = await Estate.countDocuments({
                publisher: req.user._id
            });
            const items = await Estate.find({
                    publisher: req.user._id
                })
                .sort(sort)
                .limit(5)
                .skip((page - 1) * 5)
                .exec();
            if (!items || items.length === 0) {
                return errorResponses(res, 404, false, MSG.userNotFound)
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
     * *PUBLIC
     * TODO:show all exist Estate information 
     * @function public-Estates
     * @param {*} req 
     * @param {*} res 
     * ?page = user/users?page=1
     * !if have sort = user/users?page=1&sortBy=createdAt:asc or desc
     */
    async allEstates(req, res) {
        try {
            const sort = {}
            const page = req.query.page || '1';
            const search = req.query.search
            if (req.query.sortBy) {
                const parts = req.query.sortBy.split(':')
                sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
            }
            const count = await Estate.countDocuments({
                expire: false,
                address: {
                    $regex: search,
                    $options: 'i'
                }
            });
            let divi = count / 4
            let countPage = Math.ceil(divi)
            const items = await Estate.find({
                    expire: false,
                    address: {
                        $regex: search,
                        $options: 'i'
                    }
                }).populate('Publisher')
                .sort(sort)
                .limit(4)
                .skip((page - 1) * 4)
                .exec();
            if (!items || items.length === 0) {
                return errorResponses(res, 404, false, MSG.error)
            }
            successResponses(res, true, MSG.success, {
                items,
                countPage,
                count
            })
        } catch (error) {
            catchHandle(res, error)
        }
    },


    /**
     * *LIMITED
     * @function All-filterd get
     * @param {*} req
     * @param {*} res
     * @param {string} page
     * @param {string} gte
     * @param {string} lte
     * @param {string} bedRooms
     * @param {string} bathRooms
     * @param {string} star
     * @param {string} type
     * @param {string} propertyType
     * ?page = user/users?page=1
     * !if have sort = user/users?page=1&sortBy=createdAt:asc or desc
     */

    async allFilteredEstate(req, res) {
        try {

            const page = req.query.page || '1'
            const {
                //    gte,
                //    lte,
                bedRooms,
                bathRooms,
                star,
                type,
                propertyType,
            } = req.query;

            let filters = {
                // price:{
                //     $gte:4900000,
                //     $lte:350000000
                // },
                expire: false,
                bedRooms,
                bathRooms,
                star,
                type,
                propertyType,

            }
            Object.keys(filters).forEach(key => filters[key] === '' && delete filters[key])
            const params = {
                ...filters
            }
            // console.log(params);
            const count = await Estate.countDocuments(params);
            let divi = count / 8
            let countPage = Math.ceil(divi)
            const items = await Estate.find(params).populate({
                    path: 'publisher',
                    model: User,
                    select: 'email'
                }).populate({
                    path: 'rsd',
                    model: RSD,
                    select: 'name address phone'
                })
                .sort({
                    createdAt: -1
                })
                .limit(8)
                .skip((page - 1) * 8)
                .exec();
            if (!items || items.length === 0) {
                return errorResponses(res, 404, false, MSG.error)
            }
            successResponses(res, true, MSG.success, {
                items,
                count,
                countPage
            })
        } catch (error) {
            catchHandle(res, error)
        }
    },

    async allSortEstatePrice(req, res) {
       try {
        const page = req.query.page || '1'
        const count = await Estate.countDocuments({})
        let divi = count / 8
        let countPage = Math.ceil(divi)
        const items = await Estate.find({})
            .populate({
                path: 'publisher',
                model: User,
                select: 'email'
            }).populate({
                path: 'rsd',
                model: RSD,
                select: 'name address phone'
            })
            .sort({
                price:req.query.price
            })
            .limit(8)
            .skip((page - 1) * 8)
            .exec();
        if (!items || items.length === 0) {
            return errorResponses(res, 404, false, MSG.error)
        }
        successResponses(res, true, MSG.success, {
            items,
            count,
            countPage
        })
       } catch (error) {
        catchHandle(res, error)
       }
    },


    async uploadEstateImg(req,res){
        try {
            let image = []
            let files = req.files
           await files.forEach(img =>{
                image.push(img.filename)
            })
            // const item =await Estate.findOne({_id:req.body.id})
            const item = await Estate.findOneAndUpdate({_id:req.body.id},{
                "$addToSet":{
                    images:image
                }
            },{new:true,upsert: true});
            await res.json({item:item})
            // console.log(item)
        } catch (error) {
            catchHandle(res, error)
        }
    }
}