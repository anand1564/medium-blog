import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
export const userRouter = new Hono <{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();
const jwt_secret = "adklkdsa";
userRouter.get('/', async (c) =>{
	console.log(c.env);
	console.log(c.env.JWT_SECRET);
	return c.json({
		text: "Hello World!"
	})
})
userRouter.post('/test', async (c)=>{
	const body = await c.req.json();
	return c.json(body);
})
userRouter.post('/signup', async (c) =>{
	console.log("Received Signup Request");
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	  
	try {
		const body = await c.req.json();
	const user = await prisma.user.create({
		data: {
			email: body.email,
			password: body.password
		},
	});
	const token = await sign({id: user.id},c.env.JWT_SECRET);
	return c.json({token});
	} catch (error) {
		console.log(error);
		return c.json({Error: "Error signing up"});
	}

})


userRouter.post('/signin', async (c) => {
	console.log(c.env.JWT_SECRET);
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const user = await prisma.user.findUnique({
		where: {
			email: body.email
		}
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({ jwt });
})
