import {
    Auth
} from "./passport";
import Reservation from '../database/models/reservation';
export default (io) => {
    
    io.on('connection',  (socket)=> {
        console.log("connected......");
        socket.emit('hello','hellowww')
    //     socket.on('reserve', async (data) => {
    //         let response;
    //         if (!Auth) {
    //             console.log('401 unauthorized');
    //         }
    //         try {
    //             const item = new Reservation({
    //                 visitor: data.user._id,
    //                 estate: data.estate,
    //                 publisher: data.publisher,
    //                 mobile: data.mobile,
    //                 fullDate: {
    //                     date: data.date,
    //                     time: data.time
    //                 }
    //             })
    //             await item.save();
    //             if (!item) {
    //                 socket.emit('reserveResp', {
    //                     save: false
    //                 })
    //             }
    //             response = {
    //                 msg: 'درخواست با موفقیت ثبت شد',
    //                 save: true,
    //                 item
    //             }
    //             socket.emit('reserveResp', response)
    //         } catch (error) {
    //             response = `An error has occured ${error}`
    //             socket.emit('reserveResp', response)
    //         }
    //     })
    })
}