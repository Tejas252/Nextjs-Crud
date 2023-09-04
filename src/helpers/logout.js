"use client"
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
export const logout = async () => {
    const router = useRouter()
    try {
      console.log("-------Reached Logout-------");
      const response = await axios.get(
        "http://localhost:3000/api/users/logout"
      );
      toast.success(response?.data?.message);
      router.push("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };