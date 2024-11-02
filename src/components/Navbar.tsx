'use client'

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

export default function TopNav() {
    const router = useRouter();
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Gallery</div>

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <div className="flex gap-4 items-center">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                router.refresh();
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
