export const accessRoute = (role)=>{
    return (req,res,next)=>{
        if(role.includes(req.user.role)) return next();
        else return res.status(403).send('access denied')
    };
} ;

