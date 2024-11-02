import Image from "next/image";
import { getImage } from "~/server/queries";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {

    const image = await getImage(photoId);
  return(
    <div className="flex justify-center items-center h-screen w-full">
      <div className="bg-gray-800 rounded-lg p-4">
        <Image width={480} style={{objectFit:"contain"}} height={480} src={image.url} alt={image.name} className="h-96 w-96 object-cover" />
        <div className="text-center">{image.name}</div>
      </div>
    </div>
  )
}
