import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("MockInterview", {
  id: serial("id").primaryKey(),
  jsonMocResp: text("jsonMocResp").notNull(),
  jobPosition: varchar("jobPosition", { length: 255 }).notNull(),
  jobDescription: varchar("jobDescription", { length: 255 }).notNull(),
  jobExperience: varchar("jobExperience", { length: 255 }).notNull(),
  createdBy: varchar("createdBy", { length: 255 }).notNull(),
  createdAt: varchar("createdAt", { length: 255 }),
  mockId: varchar("mockId", { length: 255 }).notNull(),
});

export const UserAnswer = pgTable('userAnswer',{
    id: serial("id").primaryKey(),
    mockIdRef: varchar("mockId", { length: 255 }).notNull(),
    question: varchar('question').notNull(),
    correctAns: text('correctAns'),
    userAns:text('userAns'),
    feedback:varchar('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt'),
})