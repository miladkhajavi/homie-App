/**
 * @param {*} res 
 * @param {*} error 
 */
export const catchHandle = (res, error) => {
  res.status(500).send({
    error: `An error has occured ${error}`,
  });
};
/**
 * 
 * @param {*} res 
 * @param {*} success 
 * @param {*} msg 
 * @param {*} user  
 * @param {*} token 
 */
export const loginResponse = (res, success, msg, user, token) => {
  res.send({
    success,
    msg,
    user,
    token,
  });
};

/**
 * 
 * @param {*} res 
 * @param {*} success 
 * @param {*} msg 
 * @param {*} item 
 */
export const successResponses = (res,success,msg,item)=>{
    res.send({
        success,
        msg,
        item
    })
}
/**
 * 
 * @param {*} res 
 * @param {*} success 
 * @param {*} msg 
 */
export const successResponseWithOutData = (res,success,msg)=>{
  res.send({
    success,
    msg
  })
}
/** 
 * @param {*} res 
 * @param {*} success 
 * @param {*} msg 
 */
export const errorResponses = (res,status,success,msg)=>{
     res.status(status).send({
        success,
        msg
    })
}
export const errorResponse = (res,success,msg)=>{
  res.send({
     success,
     msg
 })
}

export const httpError = (res,msg,st)=>{
 res.status(st).send({msg})
}