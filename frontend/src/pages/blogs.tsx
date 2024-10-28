import React, { useEffect, useState } from "react";
import { TfiMenu } from "react-icons/tfi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Loader2, Mail } from "lucide-react";

// Define the type for our blog data
interface Blog {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  author: {
    id: string;
    name: string | null;
    email: string;
  };
  Tags: any[];
  Image: any[];
}

export default function Blogs() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:3000/blog/all");
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get initials from email for avatar fallback
  const getInitials = (email: string) => {
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };

  // Format date - assuming you might add createdAt later
  const getRandomColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.floor(Math.abs(Math.sin(hash) * 16777215) % 16777215).toString(16);
    return '#' + '0'.repeat(6 - color.length) + color;
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Navbar */}
      <nav className="w-full flex flex-row items-center flex-wrap justify-around p-5 bg-white shadow-sm">
        <h1 className="text-black text-2xl font-bold">Medium</h1>
        <div>
          <input 
            type="text" 
            placeholder="Search blogs..." 
            className="border border-gray-300 p-2 rounded-lg w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="hidden md:block">
          <div className="flex flex-row items-center gap-3">
            <Button onClick={() => navigate('/blogs/create')}>Write</Button>
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
          <Button onClick={() => navigate('/blogs/create')}>Write</Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      )}

      {/* Blog content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">
            Error: {error}
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center text-gray-500 p-4">
            No blogs found. {searchTerm ? 'Try a different search term.' : 'Be the first to write a blog!'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <Card 
                key={blog.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/blogs/${blog.id}`)}
              >
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar>
                      {blog.Image[0]?.url ? (
                        <AvatarImage src={blog.Image[0].url} />
                      ) : null}
                      <AvatarFallback style={{ backgroundColor: getRandomColor(blog.author.email) }}>
                        {getInitials(blog.author.email)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {blog.author.name || blog.author.email.split('@')[0]}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {blog.author.email}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 hover:text-blue-600">
                    {blog.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3">{blog.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between text-sm text-gray-500">
                  <div className="flex flex-wrap gap-2">
                    {blog.Tags.map(tag => (
                      <span 
                        key={tag.id} 
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                      >
                        {tag.name}
                      </span>
                    ))}
                    {blog.Tags.length === 0 && (
                      <span className="text-xs text-gray-400">No tags</span>
                    )}
                  </div>
                  {!blog.published && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      Draft
                    </span>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}