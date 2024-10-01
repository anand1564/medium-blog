import { Hono } from "hono"
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blogs";
import { SigninInput,SignupInput,CreateBlogInput,UpdateBlogInput } from "anand-medium-common";
const app = new Hono <{
     Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
     }
}>();
app.get('/',(c)=>{
   return c.json({text: "Hello World!"});
})
app.fire();

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);


