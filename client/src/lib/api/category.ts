"use server";

export async function getCategories() {
  const categories = await fetch(`${process.env.API_URL}/categories`);
  return categories.json();
}
