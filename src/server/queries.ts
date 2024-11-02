import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

export async function getMyImages() {
  const user = auth();
  if(!(await user).userId){
    throw new Error("Unauthorized");
  }
  const images = await db.image.findMany({
    where: {
      userId: (await user).userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return images;
}
