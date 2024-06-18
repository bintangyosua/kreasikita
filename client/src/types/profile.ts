export type TProfile = {
  id: number;
  email: string;
  pfp?: string;
  categoryId: number;
  name: string;
  balance: number;
  banner?: string;
  username: string;
  description?: string;
  category: {
    name: string;
  };
  role: "admin" | "client";
};
