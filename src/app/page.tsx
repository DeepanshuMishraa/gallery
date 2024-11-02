import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";

async function Images() {
  const images = await db.image.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => (
        <div key={image.id} className="w-48">
          <img src={image.url} alt="image" />
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please Sign in above to continue
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
