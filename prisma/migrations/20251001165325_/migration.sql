/*
  Warnings:

  - The primary key for the `Country` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Country` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Country" DROP CONSTRAINT "Country_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "Country_id_key" ON "public"."Country"("id");
