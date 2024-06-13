"use server";

export async function createPayment({
  order_id,
  gross_amount,
  name,
  email,
  item_details,
}: {
  order_id: string;
  gross_amount: number;
  email: string;
  name: string;
  item_details: {
    id: string;
    name: string;
    price?: number;
    quantity: number;
    category: string;
    url: string;
  };
}) {
  const res = await fetch(`${process.env.API_URL}/payment/invoice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order_id,
      gross_amount,
      name,
      email,
      item_details,
    }),
  });

  return await res.json();
}

export async function getPaymentStatus(order_id: string) {
  try {
    const res = await fetch(
      `${process.env.API_URL}/payment/status/${order_id}`
    );
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return false;
  }
}
