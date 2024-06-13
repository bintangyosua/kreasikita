"use client";
import { getProfile, uploadAvatarServer } from "@/lib/api/users";
import { SessionType } from "@/lib/session";
import { TProfile } from "@/types/profile";
import { Avatar, Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function Header({
  profile,
  session,
}: {
  profile: TProfile;
  session: SessionType;
}) {
  const [avatar, setAvatar] = useState<File | null>(null);
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
        formData.append("file", avatar);

        try {
          await uploadAvatarServer(formData, session.access_token);
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
          {previewAvatar || profile.pfp ? (
            <Avatar
              src={previewAvatar || profile.pfp}
              className="h-28 w-28 rounded-full object-cover ml-16 -mt-16"
            />
          ) : (
            <Avatar />
          )}
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <div className="-mt-4 flex-col justify-between w-full pl-10 pr-2 hidden sm:flex">
            <span className="font-bold text-3xl">{profile.name}</span>
            <span className="text-sm text-gray-700">@{profile.username}</span>
          </div>
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
                  setAvatar(file);
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreviewAvatar(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <input
              type="file"
              className="hidden"
              ref={inputBanner}
              id="inputBanner"
            />
            <Button
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
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
