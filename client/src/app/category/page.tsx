"use server";

import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  // const users = await getUsersByCategoryName(params.slug);
  return redirect("/category/youtuber");
}
