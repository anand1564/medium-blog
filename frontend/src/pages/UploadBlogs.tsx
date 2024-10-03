import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
export default function UploadBlogs(){
    return(
        <div className="w-full min-h-screen bg-gray-100 px-4 py-12">
            <div className="rounded-lg bg-white shadow-md mx-auto overflow-hidden max-w-3xl">
            <form className="p-6 space-y-5">
            <h1 className="text-black font-extrabold text-3xl mb-5">Upload Blogs</h1>
            <div className=" space-y-2 flex flex-col items-start w-full">
                <label className="text-black text-xl">Title</label>
                <Input type="text" className="" placeholder="Enter the text"/>
            </div>
            <div className=" space-y-2 flex flex-col items-start w-full">
                <label className="text-black text-xl">Title</label>
                <Textarea className="min-h-[300px]" placeholder="Enter the content"/>
            </div>
            <div className=" space-y-2 flex flex-col items-start w-full">
                <label className="text-black text-xl">Tags</label>
                <Input type="text" className="" placeholder="Enter the Tag"/>
            </div>
            <div className="space-y-2">
            <Label htmlFor="image">Cover Image</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('image')?.click()}
              >
                <ImageIcon className="mr-2 h-4 w-4" /> Upload Image
              </Button>
             {/* {image && <span className="text-sm text-gray-500">{image.name}</span>}*/}
            </div>
          </div>
          <Button type="submit" className="w-full">Publish</Button>
            </form> 
            </div>
        </div>
    )
}