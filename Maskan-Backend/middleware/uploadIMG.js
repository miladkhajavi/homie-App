import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import fs from "fs";
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};
export const UploadImage = (files) => {
  return multer({
    limits: 500000,
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, `./upload/${files}`);
      },
      filename: (req, file, cb) => {
        const Ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, file.fieldname + Date.now() + "." + Ext);
      },
    }),
    fileFilter: (req, file, cb) => {
      const isValid = !!MIME_TYPE_MAP[file.mimetype];
      let error = isValid ? null : new Error("Invalid Mime Type");
      cb(error, isValid);
    },
  }).single(files);
};


export const multipleUploadImage = (files)=>{
  return multer({
    limits: 500000,
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, `./upload/${files}`);
      },
      filename: (req, file, cb) => {
        const Ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, file.fieldname+'-_-' + uuidv4()+'_-_' + Date.now()+'______'+ "." + Ext);
      },
    }),
    fileFilter: (req, file, cb) => {
      const isValid = !!MIME_TYPE_MAP[file.mimetype];
      let error = isValid ? null : new Error("Invalid Mime Type");
      cb(error, isValid);
    },
  }).array(`${files}`,5);
}
// 'multi-files'