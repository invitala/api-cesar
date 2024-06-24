import { pgTable, serial, text, doublePrecision, boolean } from 'drizzle-orm/pg-core';

export const assistant = pgTable('assistant', {
  id: serial('id').primaryKey(),
  full_name: text('full_name'),
  is_going: boolean('is_going'),
  comment: text('comment'),
  is_ceremony: boolean('is_ceremony'),
  is_celebration: boolean('is_celebration')
});

export const song = pgTable('song', {
  id: serial('id').primaryKey(),
  guest_name: text('guest_name'),
  song_name: text('song_name'),
  url: text('url')
});