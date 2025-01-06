import { getFavouriteJobsByEmail } from "@/app/controllers/favouriteJobController";

export async function GET(req, { params }) {
  return await getFavouriteJobsByEmail(req, { params });
}
