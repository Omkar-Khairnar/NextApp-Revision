import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcrptjs from 'bcryptjs'

connect();
export async function POST(request : NextRequest) {
    try {
        const reqBody:any = await request.json();
        const {token , newPassword} = reqBody;
        const user = await User.findOne({forgotPasswordToken:token, forgotPasswordTokenExpiry:{$gt:Date.now()}});
        if(!user){
            return NextResponse.json({error:true, msg:'Invalid Token. Try again.'});
        }
        
        const salt = await bcrptjs.genSalt(10);
        const hashedPassword = await bcrptjs.hash(newPassword, salt);

        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        user.password = hashedPassword;
        await user.save();

        return NextResponse.json({error:false, msg:'Password Reset Successfully'}, {status:200})
    } catch (error:any) {
        return NextResponse.json({error:true, msg:error.message}, {status:400});
    }
}