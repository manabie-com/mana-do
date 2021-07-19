import { ApiResponseType } from "../types";

export abstract class ISignInService {
    abstract signIn(username: string, password: string) : Promise<ApiResponseType<string>>
    abstract verifyToken(token: string) : Promise<ApiResponseType<string>>
}