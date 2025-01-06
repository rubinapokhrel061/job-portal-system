import {
  deleteJobByID,
  getSingleJob,
  updateJob,
} from "@/app/controllers/jobController";

export async function GET(req, { params }) {
  return await getSingleJob(req, { params });
}
export async function PUT(req, { params }) {
  return await updateJob(req, { params });
}
export async function DELETE(req, { params }) {
  return await deleteJobByID(req, { params });
}
