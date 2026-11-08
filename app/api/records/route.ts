import { getDb } from '../../../db';
import { records } from '../../../db/schema';
import { eq } from 'drizzle-orm';
export async function GET(){try {const rows=await getDb().select().from(records);return Response.json(rows.map(r=>JSON.parse(r.data)));}catch{return Response.json({error:'Unable to load records'},{status:500});}}
export async function POST(req:Request){const r=await req.json() as {id:string;title:string;type:string;[key:string]:unknown};if(!r.id||!r.title||!r.type)return Response.json({error:'Missing required fields'},{status:400});await getDb().insert(records).values({id:r.id,data:JSON.stringify(r)}).onConflictDoUpdate({target:records.id,set:{data:JSON.stringify(r)}});return Response.json({ok:true});}
export async function DELETE(req:Request){const {id}=await req.json() as {id:string};await getDb().delete(records).where(eq(records.id,id));return Response.json({ok:true});}
