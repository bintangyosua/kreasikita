import { getProfile, updateUserByUsername2 } from "@/lib/api/users";
import { getSession } from "@/lib/session";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError, UTFiles } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req, files }) => {
      // This code runs on your server before upload
      const session = await getSession();
      const user = await getProfile(session.access_token);

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id, username: user.username };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.username };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
