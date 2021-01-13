import mongoose  from "mongoose"
import {CONFIG} from './userConfig'

export const SECRET_JWT_CODE = "mAsKaNpRoJeCtSeCrEtJwTcOdE";

export const ConnectDataBase = async () =>{
    try {
      await mongoose.connect(CONFIG.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
          });
          console.log(`MongoDB Connected`);        
    } catch (error) {
        console.log(error);
    }
} 
