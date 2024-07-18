import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { assistant, song } from './db/schema';
import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { cors } from 'hono/cors'

export type Env = {
  DATABASE_URL: string;
};


const routes = new Hono<{ Bindings: Env }>();

routes.use(
  '/api/*',
  cors({
    origin: '*',
    allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
    maxAge: 600,
    credentials: true,
  })
)

//------------ assistant api -------------------

routes.get('/api/assistant', async (c) => {
  try {
    const sql = neon(c.env.DATABASE_URL);
    const db = drizzle(sql);

    const assistants = await db.select().from(assistant);

    return c.json({
      assistants
    });
  } catch (error) {
    console.log(error);
    return c.json(
      {
        error,
      },
      400
    );
  }
});

routes.post('/api/assistant', async (c) => {
    const body = await c.req.json()
    const new_assitant = {
        full_name: body.full_name as string,
        is_going: body.is_going as string,
        comment: body.comment as string,
        is_ceremony: body.is_ceremony as string,
        is_celebration: body.is_celebration as string
    } 
    
    try {
      const sql = neon(c.env.DATABASE_URL);
      const db = drizzle(sql);
  
      await db.insert(assistant).values(new_assitant);
  
      return new Response('Created', { status: 201 })
    } catch (error) {
      console.log(error);
      return c.json(
        {
          error,
        },
        400
      );
    }
  });


routes.delete('/api/assistant/:id', async (c) => {
    const userId = await c.req.param('id')

    try {
      const sql = neon(c.env.DATABASE_URL);
      const db = drizzle(sql);
  
      await db.delete(assistant).where(eq(assistant.id as any, userId));
  
      return new Response('Deleted', { status: 200 })
    } catch (error) {
      console.log(error);
      return c.json(
        {
          error,
        },
        400
      );
    }
  });

//------------ songs api -------------------

routes.get('/api/song', async (c) => {
  try {
    const sql = neon(c.env.DATABASE_URL);
    const db = drizzle(sql);

    const songs = await db.select().from(song);

    return c.json({
      songs,
    });
  } catch (error) {
    console.log(error);
    return c.json(
      {
        error,
      },
      400
    );
  }
});

routes.post('/api/song', async (c) => {
  const body = await c.req.json()
  
  const new_song = {
      guest_name: body.guest_name as string,
      song_name: body.song_name as string,
      url: body.url as string
  }
  
  try {
    const sql = neon(c.env.DATABASE_URL);
    const db = drizzle(sql);

    await db.insert(song).values(new_song);

    return new Response('Created', { status: 201 })
  } catch (error) {
    console.log(error);
    return c.json(
      {
        error,
      },
      400
    );
  }
});


routes.delete('/api/song/:id', async (c) => {
  const userId = await c.req.param('id')

  console.log("id: ", userId)

  try {
    const sql = neon(c.env.DATABASE_URL);
    const db = drizzle(sql);

    await db.delete(song).where(eq(song.id as any, userId));

    return new Response('Deleted', { status: 200 })
  } catch (error) {
    console.log(error);
    return c.json(
      {
        error,
      },
      400
    );
  }
});

export default routes;
