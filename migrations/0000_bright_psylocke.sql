CREATE TABLE IF NOT EXISTS "assistant" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"is_going" boolean,
	"comment" text,
	"is_ceremony" boolean,
	"is_celebration" boolean
);
