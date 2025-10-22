import { NextRequest, NextResponse } from "next/server";

export function jsonOK(data: unknown, init: number = 200){
  return NextResponse.json(data, { status: init });
}
export function jsonBad(msg: string, init: number = 400){
  return NextResponse.json({ error: msg }, { status: init });
}

// Small helper to read env safely
export function env(key: string, fallback?: string){
  const v = process.env[key];
  if (v) return v;
  if (fallback !== undefined) return fallback;
  throw new Error(`Missing env var: ${key}`);
}
