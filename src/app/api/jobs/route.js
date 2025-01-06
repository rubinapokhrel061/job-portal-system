import { createJob } from "../../controllers/jobController";
export async function POST(req) {
  return await createJob(req);
}
