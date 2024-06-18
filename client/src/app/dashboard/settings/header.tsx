"use client";
import {
  getProfile,
  updateUserByUsername2,
  uploadAvatarServer,
} from "@/lib/api/users";
import { SessionType } from "@/lib/session";
import { UploadButton } from "@/lib/uploadthing";
import { TProfile } from "@/types/profile";
import { Avatar, Button, User } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { UTApi } from "uploadthing/server";

export default function Header({
  profile,
  session,
}: {
  profile: TProfile;
  session: SessionType;
}) {
  let [avatar, setAvatar] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>();

  const [avatarLoading, setAvatarLoading] = useState(false);

  const router = useRouter();

  const uploadAvatar = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (avatar) {
      const formData = new FormData();
      formData.append("image", avatar, avatar.name);
    }
  };

  useEffect(() => {
    const uploadAvatar = async () => {
      if (avatar) {
        const formData = new FormData();
        // const utapi = new UTApi();
        formData.append("file", avatar);

        try {
          // await uploadAvatarServer(formData, session.access_token);
          // const response = await utapi.uploadFiles(avatar);
          toast.success("Avatar berhasil diperbarui");
          setAvatarLoading(false);
          router.refresh();
        } catch (error) {
          toast.error("Something went wrong");
          setAvatarLoading(false);
        }
      }
    };

    uploadAvatar();
  }, [avatar]);

  const inputAvatar = useRef<HTMLInputElement | null>(null);
  const inputBanner = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <div
        style={{
          backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6RYb9ubVQUhpM1ZXTUJQ89uhZimxULkgH9l7lvt6J7LxT-9mtzA9FSKFF748HMfpGNPk&usqp=CAU')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="h-28 sm:h-32 lg:h-48 w-full rounded-t-3xl"></div>
      <div className="flex items-center justify-start px-5 mt-3">
        <div>
          {
            <User
              name={profile.name}
              description={`@${profile.username}`}
              classNames={{
                name: "text-3xl font-bold mt-4",
                base: "-mt-10",

                description: "text-md text-gray-500",
              }}
              avatarProps={{
                src: profile.pfp,
                className: "w-28 h-28 rounded-full object-cover ml-16 -mt-4",
                classNames: {
                  name: "text-3xl",
                },
              }}
            />
          }
        </div>
        <div className="flex flex-row items-center justify-end w-full">
          <div className="flex flex-col gap-1">
            <input
              type="file"
              className="hidden"
              ref={inputAvatar}
              id="inputAvatar"
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files.length > 0) {
                  setAvatarLoading(true);
                  const file = e.target.files[0];
                  // file.name = `${profile.username}-${file.name}`;
                  setAvatar(file);
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreviewAvatar(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {/* <input
              type="file"
              className="hidden"
              ref={inputBanner}
              id="inputBanner"
            /> */}
            {/* <Button
              size="sm"
              className="h-6"
              color="primary"
              isLoading={avatarLoading}
              onClick={() => {
                inputAvatar.current?.click();
              }}>
              Change Avatar
            </Button>
            <Button size="sm" className="h-6" color="primary">
              Change Banner
            </Button> */}
            <UploadButton
              appearance={{
                button: {
                  backgroundColor: "#5B5BD6",
                },
              }}
              endpoint="imageUploader"
              onClientUploadComplete={async (res) => {
                // Do something with the response
                const yay = await updateUserByUsername2(
                  session.access_token,
                  profile.username,
                  {
                    pfp: res[0].url,
                  }
                );
                toast.success("Berhasil mengganti avatar");
                router.refresh();
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                toast.error(`Gagal upload! ${error.message}`);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
