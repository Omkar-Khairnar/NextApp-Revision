import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect();

export async function POST(req : NextRequest) {
    try{
        const reqBody = await req.json();
        const {email, password} = reqBody;
        // console.log(reqBody);

        //check If user exist
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error:true, msg: "User Not Exist"}, {status:401})
        }
        
        //Check if password is correct
        const validatePassword = await bcryptjs.compare(password, user.password);
        if(!validatePassword){
            return NextResponse.json({error:true, msg:"Invalid Credentials"})
        }
        // console.log('password validated');
        
        //Creating a user Token
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn :'1d'});
        const response = NextResponse.json({error:false, msg:"User LoggedIn Successfully"}, {status:200});

        response.cookies.set("token", token, {
            httpOnly:true
        })
        
        return response;
    }
    catch(err:any){
        return NextResponse.json({error: true, msg:err.message}, {status:500});
    }
}


