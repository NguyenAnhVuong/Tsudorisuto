/*
  Warnings:

  - You are about to drop the column `priority` on the `todos` table. All the data in the column will be lost.
  - Added the required column `piority` to the `todos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "todos" DROP COLUMN "priority",
ADD COLUMN     "piority" INTEGER NOT NULL,
ALTER COLUMN "dueDate" SET DATA TYPE TEXT;
