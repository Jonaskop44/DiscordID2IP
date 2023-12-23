import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const ip = await axios.get("https://api64.ipify.org?format=json");
    await prisma.iP.create({
      data: {
        ip: ip.data.ip,
      },
    });
    return NextResponse.json("Converted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error" + error, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const ip = await axios.get("https://api64.ipify.org?format=json");
    return NextResponse.json(ip.data.ip, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error" + error, { status: 500 });
  }
}
