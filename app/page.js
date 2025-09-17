"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col lg:flex-row bg-gray-50 overflow-hidden ">
      <div>
        <img
          src="/Online-interview.jpg"
          alt="page.jpg"
          className="w-full h-full object-cover "
        />
      </div>

      <div className="flex justify-center items-center h-screen ml-20">
        <Button
          className={"hover:cursor-pointer hover:bg-blue-600"}
          onClick={() => router.replace("/dashboard")}
        >
          Start your Mock interview with Ai
        </Button>
      </div>
    </div>
  );
}
