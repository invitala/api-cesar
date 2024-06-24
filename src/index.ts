import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { assistant, song } from './db/schema';
import { Hono } from 'hono';

export type Env = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Env }>();

app.get('/', async (c) => {
  try {
    const sql = neon(c.env.DATABASE_URL);

    const db = drizzle(sql);

    const result = await db.select().from(assistant);

    return c.json({
      result,
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


app.get('/songs', async (c) => {
  try {
    const sql = neon(c.env.DATABASE_URL);

    const db = drizzle(sql);

    const result = await db.select().from(song);

    return c.json({
      result,
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

export default app;
