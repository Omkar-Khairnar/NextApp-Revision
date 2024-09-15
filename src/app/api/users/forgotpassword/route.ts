import {connect} from '@/dbConfig/dbConfig'
import { sendEmail } from '@/helpers/mailer';
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'


export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json();
        const {email} = reqBody;
        const user = await User.findOne({email:email});
        if(!user){
            return NextResponse.json({error:true, msg:'Email Id not registered.'}, {status:401});
        }
        const userId = user._id;
        const res = await sendEmail({email, emailType:"RESET", userId});
        return NextResponse.json({error:false, msg:'Mail Sent Successfully'}, {status:200})

    } catch (error:any) {
        return NextResponse.json({error:true, msg:error.message}, {status:400})
    }
}