import { addFavouriteJob } from "@/app/controllers/favouriteJobController";

export async function POST(req, { params }) {
  return await addFavouriteJob(req, { params });
}
