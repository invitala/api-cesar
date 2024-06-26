import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { song } from '../db/schema';
import { Hono } from 'hono';

export type Env = {
  DATABASE_URL: string;
};

const routes = new Hono<{ Bindings: Env }>();


routes.get('/song', async (c) => {
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

routes.post('/song', async (c) => {
    const body = await c.req.parseBody()
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


routes.delete('/song:id', async (c) => {
    const userId = await c.req.param('id')

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

export const songRoutes = routes
