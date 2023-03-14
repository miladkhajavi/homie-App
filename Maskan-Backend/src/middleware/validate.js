import Joi, {
  options
} from "joi";
import {
  errorResponses
} from "./response";
import User from "../models/user";
import Contact from "../models/contact";
/**
 * if you want study for joi validate you can read this article
 * 1 -- https://jasonwatmore.com/post/2020/07/22/nodejs-express-api-request-schema-validation-with-joi
 * 2 -- https://medium.com/@rossbulat/joi-for-node-exploring-javascript-object-schema-validation-50dd4b8e1b0f
 **/

/** 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
export const LoginJoi = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required().email().messages({
      "string.empty": "email can not be empty",
      "string.email": "email format should be look like this *example@mail.com*",
    }),
    password: Joi.string().required().min(5).messages({
      "string.empty": "password can not be empty",
      "string.min": "password length should be more than 5",
    }),
  });
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const {
    error,
    value
  } = schema.validate(req.body, options);
  if (error) {
    return errorResponses(res, 400, "false", error.details);
  }
  req.body = value;
  next();
};
/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 */

export const registerJoi = (req, res, next) => {
  const schema = Joi.object({
    userName: Joi.string().required().min(3).message({
      "string.empty": "username can not be empty",
      "string.min": "username length should be 3 or more ",
    }),
    email: Joi.string().required().email().messages({
      "string.empty": "email can not be empty",
      "string.email": "email format should be look like this *example@mail.com*",
    }),
    password: Joi.string().required().min(5).messages({
      "string.empty": "password can not be empty",
      "string.min": "password length should be more than 5",
    }),
  });
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const {
    error,
    value
  } = schema.validate(req.body, options);
  if (error) {
    return errorResponses(res, 400, "false", error.details);
  }
  req.body = value;
  next();
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const EditUserJoi = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    mobile: Joi.string().min(10).max(12).regex(/^[0-9]/).messages({
      "string.min": "Mobile number Less Than Allowed",
      "string.max": "Mobile number More Than Allowed",
      "string.pattern.base": "Mobile Should Be Only Number"
    }),
  });
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const {
    error,
    value
  } = schema.validate(req.body, options);
  if (error) {
    return errorResponses(res, 400, "false", error.details);
  }
  req.body = value;
  next();
}


/**
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const ForgetJoi = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required().email().messages({
      "string.empty": "email can not be empty",
      "string.email": "email format should be look like this *example@mail.com*",
    }),
  });
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const {
    error,
    value
  } = schema.validate(req.body, options);
  if (error) {
    return errorResponses(res, 400, "false", error.details);
  }
  req.body = value;
  next();
}

export const ContactUsJoi = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    description: Joi.string(),
    mobile: Joi.string().min(10).max(12).regex(/^[0-9]/).messages({
      "string.min": "Mobile number Less Than Allowed",
      "string.max": "Mobile number More Than Allowed",
      "string.pattern.base": "Mobile Should Be Only Number"
    }),
    email: Joi.string().required().email().messages({
      "string.empty": "email can not be empty",
      "string.email": "email format should be look like this *example@mail.com*",
    }),

  })
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const {
    error,
    value
  } = schema.validate(req.body, options)
  if (error) {
    return errorResponses(res, 400, "false", error.details);
  }
  req.body = value
  next()
}

export const AddEstate = (req, res, next) => {
  const schema = Joi.object({
    rsd: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).messages({
      "string.empty": "id real-Estate-Developer is require",
      "string.pattern.base": "wrong pattern Object-Id "
    }),
    type: Joi.string().required().messages({
      "string.empty": "type can not be empty",
    }),
    propertyType: Joi.string().required().messages({
      "string.empty": "property Type can not be empty",
    }),
    price: Joi.string().required().regex(/^[0-9]/).messages({
      "string.empty": "price can not be empty",
      "string.pattern.base": "price should be only number"
    }),
    bedRooms: Joi.string().required().regex(/^[0-9]/).messages({
      "string.empty": "bedRooms can not be empty",
      "string.pattern.base": "bedRooms should be only number"
    }),
    bathRooms: Joi.string().required().regex(/^[0-9]/).messages({
      "string.empty": "bathRooms can not be empty",
      "string.pattern.base": "bathRooms should be only number"
    }),
    meter: Joi.string().required().regex(/^[0-9]/).messages({
      "string.empty": "meter can not be empty",
      "string.pattern.base": "meter should be only number"
    }),
    address: Joi.string().required().messages({
      "string.empty": "address can not be empty",
    }),
    description: Joi.string()
  })

  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };
  const {
    error,
    value
  } = schema.validate(req.body, options);
  if (error) {
    return errorResponses(res, 400, "false", error.details);
  }
  req.body = value;
  next();
}