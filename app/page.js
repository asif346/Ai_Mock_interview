"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col lg:flex-row bg-gray-50 overflow-hidden ">
      <div>
        <img
          src="https://joinsuperset.com/blogs/wp-content/uploads/2023/07/Online-Interview.jpg"
          alt="Online_Interview Page"
          className="w-full h-full object-cover "
        />
      </div>

      <div className="flex justify-center items-center h-screen ml-20">
        <Button
          className={"hover:cursor-pointer hover:bg-blue-700"}
          onClick={() => router.replace("/dashboard")}
        >
          Start your Mock interview with Ai
        </Button>
      </div>
    </div>
  );
}
