import { prisma } from '.prisma/client';
import axios from 'axios';
import prismaClient from "../prisma"
import {sign} from  "jsonwebtoken"

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

    const {login, id, avatar_url, name} = response.data; 
    const user = await prismaClient.user.findFirst({
        where: {
            github_id: id
        }
    })

    //If  User not exist..
    if(!user){
        await prismaClient.user.create({
            data: {
                github_id: id,
                login, 
                avatar_url,
                name
            }
        })
    }

    const token = sign({
       name: user.name,
       avatar_ur: user.avatar_url,
       id: user.id
    },
        process.env.JWT_SECRET,{
        subject: user.id, 
        expiresIn: "1d"
    })
    return {token, user}; 
    }
}

export {AuthenticateUserService}