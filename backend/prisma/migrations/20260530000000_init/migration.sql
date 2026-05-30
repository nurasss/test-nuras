CREATE TABLE "work_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "work_types_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "journal_entries" (
    "id" SERIAL NOT NULL,
    "work_date" TIMESTAMP(3) NOT NULL,
    "work_type_id" INTEGER NOT NULL,
    "volume" DECIMAL(10,2) NOT NULL,
    "unit" TEXT NOT NULL,
    "executor_name" TEXT NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "journal_entries_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "work_types_name_key" ON "work_types"("name");
CREATE INDEX "journal_entries_work_date_idx" ON "journal_entries"("work_date");

ALTER TABLE "journal_entries" ADD CONSTRAINT "journal_entries_work_type_id_fkey" FOREIGN KEY ("work_type_id") REFERENCES "work_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
