"use server";

export async function getCategories() {
  try {
    const categories = await fetch(`${process.env.API_URL}/categories`, {
      cache: "no-store",
    });

    const data = await categories.json();
    return data.data;
  } catch (error) {
    console.error(error);
  }
}
