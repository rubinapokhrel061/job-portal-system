import { getJobByEmail } from "@/app/controllers/jobController";

export async function GET(req, { params }) {
  return await getJobByEmail(req, { params });
}
