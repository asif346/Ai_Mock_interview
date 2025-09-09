"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-screen">
      <Button className={'hover:cursor-pointer'} onClick={()=>router.replace('/dashboard')}>Start your Mock interview with Ai</Button>
    </div>
  );
}
