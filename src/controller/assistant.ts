import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { assistant } from '../db/schema';
import { Hono } from 'hono';
import { S } from 'vitest/dist/reporters-LqC_WI4d.js';

export type Env = {
  DATABASE_URL: string;
};

const routes = new Hono<{ Bindings: Env }>();


routes.get('/assistant', async (c) => {
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

routes.post('/assistant', async (c) => {
    const body = await c.req.parseBody()
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


routes.delete('/assistant:id', async (c) => {
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

export const assistantRoutes = routes
