import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function UploadBlogs() {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", tags);
    if (image) {
      formData.append("image", image); // Append image file only if it exists
    }

    const response = await fetch("http://127.0.0.1:8787/api/v1/blog/create", {
      method: "POST",
      body: formData, // Use formData to send the data
    });

    // Handle the response
    if (response.ok) {
      console.log("Blog uploaded successfully");
    } else {
      console.error("Failed to upload blog");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 px-4 py-12">
      <div className="rounded-lg bg-white shadow-md mx-auto overflow-hidden max-w-3xl">
        <form className="p-6 space-y-5" onSubmit={handleSubmit}>
          <h1 className="text-black font-extrabold text-3xl mb-5">Upload Blogs</h1>

          {/* Title Input */}
          <div className="space-y-2 flex flex-col items-start w-full">
            <label className="text-black text-xl">Title</label>
            <Input
              type="text"
              placeholder="Enter the title"
              onChange={(e) => setTitle(e.target.value)} // Handle title change
              value={title}
            />
          </div>

          {/* Content Input */}
          <div className="space-y-2 flex flex-col items-start w-full">
            <label className="text-black text-xl">Content</label>
            <Textarea
              className="min-h-[300px]"
              placeholder="Enter the content"
              onChange={(e) => setContent(e.target.value)} // Handle content change
              value={content}
            />
          </div>

          {/* Tags Input */}
          <div className="space-y-2 flex flex-col items-start w-full">
            <label className="text-black text-xl">Tags</label>
            <Input
              type="text"
              placeholder="Enter the tags"
              onChange={(e) => setTags(e.target.value)} // Handle tags change
              value={tags}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image">Cover Image</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImage(e.target.files[0]); // Set the image file to state
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image")?.click()}
              >
                <ImageIcon className="mr-2 h-4 w-4" /> Upload Image
              </Button>
              {image && <span className="text-sm text-gray-500">{image.name}</span>}
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Publish
          </Button>
        </form>
      </div>
    </div>
  );
}
