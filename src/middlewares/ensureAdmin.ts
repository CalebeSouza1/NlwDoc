import{Request,Response, NextFunction} from "express";




export function ensureAdmin(
    reuest: Request,
    response: Response,
    next: NextFunction) {
    //Veriificar se usuário admin 
    const admin = true;

    if(admin){
        return next();
    }

    return response.status(401).json({
        error: "Unauthorized",
    });
}