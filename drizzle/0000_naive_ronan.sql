CREATE TABLE "MockInterview" (
	"id" serial PRIMARY KEY NOT NULL,
	"jsonMocResp" text NOT NULL,
	"jobPosition" varchar(255) NOT NULL,
	"jobDescription" varchar(255) NOT NULL,
	"jobExperience" varchar(255) NOT NULL,
	"createdBy" varchar(255) NOT NULL,
	"createdAt" varchar(255),
	"mockId" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userAnswer" (
	"id" serial PRIMARY KEY NOT NULL,
	"mockId" varchar(255) NOT NULL,
	"question" varchar NOT NULL,
	"correctAns" text,
	"userAns" text,
	"feedback" varchar,
	"rating" varchar,
	"userEmail" varchar,
	"createdAt" varchar
);
