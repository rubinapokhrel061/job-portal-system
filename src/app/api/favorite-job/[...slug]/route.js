import { deleteFavouriteJob } from "@/app/controllers/favouriteJobController";

export async function DELETE(req, context) {
  const { params } = context;
  return await deleteFavouriteJob(req, { params });
}
