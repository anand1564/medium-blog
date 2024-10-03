import React from "react";
import { TfiMenu } from "react-icons/tfi";
import { Avatar,AvatarFallback,AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";
export default function Blogs() {
  const navigate = useNavigate()
  const [isMobileMenuOpen,setIsMobileMenuOpen]=React.useState(false)
  return (
    <div className="min-h-screen w-full">
      {/* Navbar */}
      <nav className="w-full flex flex-row items-center flex-wrap justify-around p-5">
        <h1 className="text-black text-2xl font-bold">Medium</h1>
        <div>
          <input type="text" placeholder="Search" className="border border-gray-300 p-2 rounded-lg" />
        </div>
        <div className="hidden md:block">
        <div className="flex flex-row items-center gap-3">
          <Button onClick={()=>navigate('/blogs/create')}>Write</Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          </div>
        </div>
        <div className="block md:hidden">
          <TfiMenu className="text-2xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
        </div>
      </nav>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="p-4 bg-gray-100 flex flex-col items-center gap-3">
          <Button onClick={()=>navigate('/blogs/create')}>Write</Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  )
}