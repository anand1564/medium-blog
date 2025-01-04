'use client'

import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { formatDate } from "@/lib/formDate"
import { useParams } from "react-router-dom"

interface Blog {
  id: string
  title: string
  content: string
  published: boolean
  authorId: string
  image: string
  createdAt: string // Assuming we have a creation date
}

export const Blog = () => {
  const [blogId, setBlogId] = useState<string | string[]>(useParams().id|| "")
  const [blog, setBlog] = useState<Blog | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`http://localhost:3000/blogs/${blogId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch blog')
        }
        const data = await response.json()
        setBlog(data)
      } catch (err) {
        console.error(err)
        setError('Failed to load blog post. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }
    if (blogId) {
      fetchBlog()
    }
  }, [blogId])

  if (isLoading) {
    return <BlogSkeleton />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {blog ? (
        <Card className="overflow-hidden">
          <CardHeader>
            <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
            <p className="text-sm text-gray-500">
              Published on {formatDate(blog.createdAt)}
            </p>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-64 mb-6">
              <img
                src={blog.image}
                alt={blog.title}
                className="rounded-md"
              />
            </div>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
          </CardContent>
        </Card>
      ) : (
        <p>No blog post found.</p>
      )}
    </div>
  )
}

const BlogSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="w-full h-64 mb-6" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  </div>
)

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="container mx-auto px-4 py-8">
    <Card>
      <CardContent>
        <p className="text-red-500">{message}</p>
      </CardContent>
    </Card>
  </div>
)

