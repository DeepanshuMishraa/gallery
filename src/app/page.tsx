import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { db } from "~/server/db";
import { getMyImages } from "~/server/queries";

async function Images() {
  const images = await getMyImages();

  if (!images || images.length === 0) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <p className="text-xl text-gray-400">No images found, Sign In above to continue</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {images.map((image) => (
        <div key={image.id} className="bg-gray-700 p-4 rounded-lg">
          <Image style={{objectFit:"contain"}} width={480} height={480} src={image.url} alt={image.name} className="w-full h-64 object-cover" />
          <div className="text-center">{image.name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="min-h-screen">
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
