import { pgTable, serial, text, doublePrecision, boolean } from 'drizzle-orm/pg-core';

export const assistant = pgTable('assistant', {
  id: serial('id').primaryKey(),
  full_name: text('full_name').notNull(),
  is_going: boolean('is_going').notNull(),
  comment: text('comment'),
  is_ceremony: boolean('is_ceremony').notNull(),
  is_celebration: boolean('is_celebration').notNull()
});

export const song = pgTable('song', {
  id: serial('id').primaryKey(),
  guest_name: text('guest_name').notNull(),
  song_name: text('song_name').notNull(),
  url: text('url')
});