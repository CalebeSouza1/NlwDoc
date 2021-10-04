import{Request,Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {

    // Receber o token
    const authToken = request.headers.authorization;

    // Validar se o token está preenchido
    if(!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        // Validar se token é válido
      const { sub } = verify(token, "aedb1991-6df7-42d4-842a-81b62eb3702c") as IPayload;
 
      // Recuperar informações do usuário
      request.user_id = sub;

      return next();
    } catch(err) {
      return response.status(401).end();
    }

    
    
}