import { createJob, getAllJob } from "@/app/controllers/jobController";

export async function POST(req) {
  return await createJob(req);
}

export async function GET(req, context) {
  const { params } = context;
  return await getAllJob(req, { params });
}
