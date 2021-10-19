import axios from 'axios';
import { response } from 'express';
/**
 * Receiver the code (string)
 * Receiver the Token Acess on the github
 * Recover item of token github
 * Verify if user exist on DataBase
 * ------ YES = Generate one Token ========
 * ------ NO = Create a database with one Token
 * Return the token address with information of User
 */

interface IAcessTokenResponse{
    access_token: string;
}

interface IUserResponse{
    avatar_url: string,
    login: string,
    id: number,
    name: string
}


class AuthenticateUserService {
    //Value String typestrip

    async execute(code: string) {

    //Create acess to Github 

    const url = "https://github.com/login/oauth/access_token";

    const {data : accessTokenResponse} = await axios.post<IAcessTokenResponse>(url, null, { 
        params: { 
            client_id: process.env.GITHUB_CLIENT_ID, 
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
        },
        headers: {
            "Accept" : "application/json"
        }
    })

    const response = await axios.get<IUserResponse>("https://api.github.com/user", {
        headers: {
            authorization: `Bearer ${accessTokenResponse.access_token} `
        }
    })

    return response.data; 
    }
}

export {AuthenticateUserService}