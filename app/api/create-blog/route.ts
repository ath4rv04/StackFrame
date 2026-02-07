import { NextResponse } from "next/server";
import { success } from "zod";

export async function POST() {
    console.log("Hello from the server");;

    return NextResponse.json({success: true});

}

//runs on the server. It is a public endpoint.
//No Type safety and is way more accessible than server actions