// src/app/dashboard/restaurants/create/page.jsx (server component)
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import CreateRestaurantForm from "@/components/CreateRestaurantForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function CreateRestaurantPage() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Create Restaurant</h1>
      <CreateRestaurantForm />
    </div>
  );
}
