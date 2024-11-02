'use client'

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {  useToast } from "~/hooks/use-toast";
import { UploadButton } from "~/utils/uploadthing";

export default function TopNav() {
    const router = useRouter();
    const { toast } = useToast()
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
                toast({
                  title: "Image Uploaded",
                  description: "Your image has been uploaded",
                });
                router.refresh();
              }}
              onUploadBegin={()=>{
                toast({
                    title:"Uploading Image",
                    description:"Please wait while we upload your image",
                    duration:100000,
                })
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
