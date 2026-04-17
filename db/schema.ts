import { pgTable, text, timestamp, varchar, integer, boolean, numeric, jsonb, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull()
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId").notNull().references(() => user.id)
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId").notNull().references(() => user.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  expiresAt: timestamp("expiresAt"),
  password: text("password")
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull()
});

export const reports = pgTable("reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("userId").notNull().references(() => user.id),
  labName: text("labName").notNull(),
  reportDate: timestamp("reportDate").notNull(),
  patientName: text("patientName"),
  rawFileUrl: text("rawFileUrl"),
  parsedData: jsonb("parsedData"),
  summaryText: text("summaryText").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull()
});

export const values = pgTable("values", {
  id: uuid("id").defaultRandom().primaryKey(),
  reportId: uuid("reportId").notNull().references(() => reports.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  value: numeric("value").notNull(),
  unit: text("unit").notNull(),
  referenceRangeLow: numeric("referenceRangeLow"),
  referenceRangeHigh: numeric("referenceRangeHigh"),
  flag: varchar("flag", { length: 20 }), // low, normal, high, critical
  category: text("category").notNull(),
  interpretation: text("interpretation").notNull(),
  questionsForDoctor: jsonb("questionsForDoctor")
});

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  reportId: uuid("reportId").notNull().references(() => reports.id, { onDelete: "cascade" }),
  role: varchar("role", { length: 20 }).notNull(), // user or assistant
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull()
});
