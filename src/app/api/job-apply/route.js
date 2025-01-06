import { jobApply } from "../../controllers/jobApplyController";

export async function POST(req) {
  return await jobApply(req);
}
