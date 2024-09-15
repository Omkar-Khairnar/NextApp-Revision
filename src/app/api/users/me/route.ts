import {connect} from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request : NextRequest) {
    try {
        const userId = await getDataFromToken(request);

        const user = await User.findById(userId).select("-password -createdAt -updatedAt");
        
        
        return NextResponse.json({
            error:false,
            msg:'User Found',
            data:user
        },{status:200});
    } catch (error:any) {
        return NextResponse.json({error:true, msg:error.message}, {status:400})
    }
}