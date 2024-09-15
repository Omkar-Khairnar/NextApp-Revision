import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'

connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        // console.log(token);

        const user = await User.findOne(
            {
                verifyToken:token,
            })

        if(!user){
            return NextResponse.json({error:true, msg:"Invalid Token"}, {status:400});
        }

        // console.log(user);
        user.isVerified = true,
        user.verifyToken = undefined,
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({error:false, msg:'User Verified Successfully'}, {status:200});
        
        
    } catch (error:any) {
        return NextResponse.json({error:true, msg:error.message}, {status:400});
    }
}