ALTER TABLE "assistant" ALTER COLUMN "full_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "assistant" ALTER COLUMN "is_going" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "assistant" ALTER COLUMN "is_ceremony" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "assistant" ALTER COLUMN "is_celebration" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "song" ALTER COLUMN "guest_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "song" ALTER COLUMN "song_name" SET NOT NULL;