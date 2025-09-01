-- Add parent_id column to categories table
ALTER TABLE "categories" ADD COLUMN "parent_id" text;

-- Add foreign key constraint
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" 
FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- Add index for better performance
CREATE INDEX "categories_parent_id_idx" ON "categories" USING btree ("parent_id");
