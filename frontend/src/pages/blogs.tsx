
import {useEffect, useState} from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Card,CardContent,CardHeader,CardDescription,CardFooter,CardTitle } from '@/components/ui/card';
interface Post{
    id:String,
    title: String,
    content: String,
    author: String,
    authorId: String,
    published: Boolean,
}
export const getBlogs=()=>{
    const [blogs,setBlogs] = useState<Post[]>([]);
    useEffect(() => {
        fetch('/api/v1/blog/bulk')
          .then((response) => response.json())
          .then((data: Post[]) => setBlogs(data))
          .catch((error) => console.error('Error fetching posts:', error));
      }, []);
    return(
        <div className="min-h-screen flex items-center justify-center">
{blogs.map((blog) => (
          <Card className="mb-6 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800">{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{blog.content.slice(1,20)}</p>
              <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">{blog.author}</p>
                    <p className="text-sm text-gray-500">Date</p>
                </div>
                <Button variant="ghost" className="text-blue-600 hover:text-blue-800">
                  Read More <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </CardContent>
          </Card>
        ))}
        </div>
    )
}
