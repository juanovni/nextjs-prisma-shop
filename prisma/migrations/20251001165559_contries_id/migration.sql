-- AlterTable
ALTER TABLE "public"."Country" ADD CONSTRAINT "Country_pkey" PRIMARY KEY ("id");

-- DropIndex
DROP INDEX "public"."Country_id_key";
