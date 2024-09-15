import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'


connect();

export async function POST(req : NextRequest) {
    try{
        const reqBody = await req.json();
        const {username, email, password} = reqBody;

        //check If user exist
        const oldUser = await User.findOne({email});
        if(oldUser){
            return NextResponse.json({error:true, msg: "User Already Exist"}, {status:400})
        }

        //hashPassword
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password:hashedPassword
        })

        
        return NextResponse.json({error:false, msg:"User Created Successfully"}, {status:200})
    }
    catch(err:any){
        return NextResponse.json({error: true, msg:err.message}, {status:500});
    }
}


