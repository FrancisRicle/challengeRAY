import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { every } from 'hono/combine'
import { cors } from 'hono/cors'
import { sign, decode, type JwtVariables } from 'hono/jwt'
import { createUser, retrieveToken, destroyToken, getToken, updateToken, userUnique } from './db/index.js'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { logger } from 'hono/logger'
import { showRoutes } from 'hono/dev'
import { createMiddleware } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'
type Env = {
  Variables: JwtVariables<{ username: string }>
}
const api = new Hono<Env>().basePath('/api')
const auth = new Hono<Env>()

const options = {
  origin: 'http://localhost:3001',
};
async function checkToken(token: string, { username }: { username: string }): Promise<boolean> {
  const savedToken = await getToken(username);
  return savedToken === token;
}

const authrize = createMiddleware(async (c, next) => {
  const path = c.req.path;
  // no usar este middleware en esta rutas (el middleware except de hono no parece funcionar bien)
  if (path === "/api/auth/signin" || path === "/api/auth/signup") {
    await next();
  } else {
    const authorization = c.req.header("Authorization");
    if (!authorization) {
      // devolver el status 404 en lugar del 401 o 403 por temas de seguridad
      throw new HTTPException(404, { message: "Not Found" });
    }
    const [_, token] = authorization.split(" ");
    const { payload } = decode(token);
    const check = await checkToken(token, payload as { username: string })
    if (check) {
      c.set("jwtPayload", payload);
      await next();
    } else {
      // devolver el status 404 en lugar del 401 o 403 por temas de seguridad en esta caso si el token que tiene el usuario es otro
      throw new HTTPException(404, { message: "Not Found" });
    }
  }

})

api.use("*",
  every(
    logger(),
    cors(options),
    authrize
  )
);
api.get("/private", async (c) => {
  return c.json({
    data: {
      success: true,
      message: "private message"
    }
  })
})


auth.post("/signin",
  zValidator("json",
    z.object({
      user: z.string(),
      password: z.string()
    })
  ),
  async (c) => {
    const { user, password } = c.req.valid("json")
    const res = await retrieveToken(user, password)
    if (res == null) {
      return c.json(null, { status: 404 })
    }
    let token = res.token
    if (!res.token) {
      let username = res.username as string
      token = await sign({ username: res.username }, "SECRET", "HS256");
      await updateToken(username, token);
    }
    return c.json({
      data: {
        success: true,
        token,
      }
    })
  })


auth.delete("/signout", async (c) => {
  const { username } = c.get("jwtPayload");
  await destroyToken(username);
  return c.json({
    data: {
      success: true
    }
  })
})

auth.post("/signup",
  zValidator("json",
    z.object({
      username: z.string().max(30),
      email: z.string(),
      password: z.string().min(5)
    })
  ),
  async (c) => {
    const { username, password, email } = c.req.valid("json");
    const checkUnique = await userUnique({ username, email });
    if (!checkUnique) {
      return c.json({
        data: {
          success: false,
          message: "username or email alredy in use"
        }
      }, { status: 400 })
    }
    const token = await sign({ username }, "SECRET", "HS256");
    await createUser({ username, password, email, token });
    return c.json({
      data: {
        success: true,
        token,
      }
    })
  }
)

api.route("/auth", auth)

console.log(showRoutes(api))

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: api.fetch,
  port
})
