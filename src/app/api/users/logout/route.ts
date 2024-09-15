import {connect} from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = NextResponse.json({
            error:false,
            msg:'Logout Successfully'
        }, {status:200})

        response.cookies.set("token", "", 
            {
                httpOnly:true,
                expires : new Date(0)
            }
        )

        return response;
    } catch (err:any) {
        return NextResponse.json({error: true, msg:err.message}, {status:500});
    }
}