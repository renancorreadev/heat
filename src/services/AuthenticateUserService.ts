import axios from 'axios';
/**
 * Receiver the code (string)
 * Receiver the Token Acess on the github
 * Verify if user exist on DataBase
 * ------ YES = Generate one Token ========
 * ------ NO = Create a database with one Token
 * Return the token address with information of User
 */


class AuthenticateUserService {
    //Value String typestrip
    async execute(code: string) {
    //Create acess to Github 
    const url = "https://github.com/login/oauth/access_token";

    const response = await axios.post(url, null, { 
        params: { 
            client_id: process.env.GITHUB_CLIENT_ID, 
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
        },
        headers: {
            "Accept" : "application/json"
        }
    })
    //Verify if Ok?
    return response.data; 
    }
}

export {AuthenticateUserService}