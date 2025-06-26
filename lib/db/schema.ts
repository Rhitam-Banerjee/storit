import { pgTable, text, uuid, integer, boolean, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
export const files = pgTable("files", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  path: text("path").notNull(), // file path name example: /docs/file
  size: integer("size").notNull(),
  type: text("type").notNull(), // folder
  fileUrl: text("file_url").notNull(),
  thumbnailUrl: text("thumb_url"),
  user_id: text("user_id").notNull(),
  parentId: uuid("parent_id"),
  isFolder: boolean("is_folder").default(false).notNull(),
  isStared: boolean("is_stared").default(false).notNull(),
  isTrash: boolean("is_trash").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export const filesRelation = relations(files, ({ one, many }) => ({
  parent: one(files, {
    fields: [files.parentId],
    references: [files.id]
  }),
  children: many(files)
}))
export const File = typeof files.$inferSelect
export const NewFile = typeof files.$inferInsert