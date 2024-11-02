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


export async function getImage(id:string){
    const image = await db.image.findFirst({
        where:{
            id:id as string
        }
    })

    if(!image){
        throw new Error("Image Not Found")
    }

    return image;
}


export async function DeleteImage(id:string){
    const user = await auth();

    if(!user.userId) throw new Error("Unauthorized");

    const image = await db.image.findFirst({
        where:{
            id:id ,
        }
    })
    if(!image) throw new Error("Image Not Found");

    if(image.userId !== user.userId) throw new Error("Unauthorized");

    await db.image.delete({
        where:{
            id:id
        }
    })

    return image;
}
