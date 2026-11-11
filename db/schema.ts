import { sql } from "drizzle-orm";
import { pgTable, pgEnum, text, integer, boolean, timestamp, jsonb, index } from "drizzle-orm/pg-core";

export const notificationType = pgEnum("notification_type", ['ORDER_UPDATE', 'PAYMENT_STATUS', 'PROMOTION', 'SYSTEM_ALERT']);
export const notificationPriority = pgEnum("notification_priority", ['LOW', 'NORMAL', 'HIGH', 'URGENT']);
export const bulkUploadStatus = pgEnum("bulk_upload_status", ['PENDING', 'COMPLETED', 'PARTIAL', 'FAILED']);
export const bulkUploadItemStatus = pgEnum("bulk_upload_item_status", ['CREATED', 'UPDATED', 'ERROR']);

export const product = pgTable("Product", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()::text`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  mainImage: text("main_image").notNull(),
  price: integer("price").notNull().default(0),
  rating: integer("rating").notNull().default(0),
  description: text("description").notNull(),
  manufacturer: text("manufacturer").notNull(),
  inStock: integer("in_stock").notNull().default(1),
  categoryId: text("category_id").notNull().references(() => category.id, { onDelete: "cascade", onUpdate: "cascade" }),
  merchantId: text("merchant_id").notNull().references(() => merchant.id, { onDelete: "restrict", onUpdate: "cascade" }),
});

export const image = pgTable("Image", {
  imageID: text("image_id").primaryKey().default(sql`gen_random_uuid()::text`),
  productID: text("product_id").notNull(),
  image: text("image").notNull(),
});

export const user = pgTable("User", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()::text`),
  email: text("email").notNull().unique(),
  password: text("password"),
  role: text("role").default("user"),
});

export const customer_order = pgTable("Customer_order", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()::text`),
  name: text("name").notNull(),
  lastname: text("lastname").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  adress: text("adress").notNull(),
  apartment: text("apartment").notNull(),
  postalCode: text("postal_code").notNull(),
  dateTime: timestamp("date_time", { mode: "date", precision: 3 }).defaultNow(),
  status: text("status").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  orderNotice: text("order_notice"),
  total: integer("total").notNull(),
});

export const customer_order_product = pgTable("customer_order_product", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()::text`),
  customerOrderId: text("customer_order_id").notNull().references(() => customer_order.id, { onDelete: "restrict", onUpdate: "cascade" }),
  productId: text("product_id").notNull().references(() => product.id, { onDelete: "restrict", onUpdate: "cascade" }),
  quantity: integer("quantity").notNull(),
});

export const category = pgTable("Category", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()::text`),
  name: text("name").notNull().unique(),
});

export const wishlist = pgTable("Wishlist", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()::text`),
  productId: text("product_id").notNull().references(() => product.id, { onDelete: "cascade", onUpdate: "cascade" }),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

export const notification = pgTable("Notification", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()::text`),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade", onUpdate: "cascade" }),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: notificationType("type").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  priority: notificationPriority("priority").notNull().default("NORMAL"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).notNull().defaultNow(),
}, (table) => [
  index("notification_user_id_idx").on(table.userId),
  index("notification_user_id_is_read_idx").on(table.userId, table.isRead),
  index("notification_user_id_type_idx").on(table.userId, table.type),
  index("notification_created_at_idx").on(table.createdAt),
]);

export const merchant = pgTable("Merchant", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()::text`),
  name: text("name").notNull(),
  description: text("description"),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  status: text("status").notNull().default("ACTIVE"),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", precision: 3 }).notNull().defaultNow(),
});

export const bulk_upload_batch = pgTable("bulk_upload_batch", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()::text`),
  fileName: text("file_name"),
  createdAt: timestamp("created_at", { mode: "date", precision: 3 }).notNull().defaultNow(),
  status: bulkUploadStatus("status").notNull().default("PENDING"),
  itemCount: integer("item_count").notNull().default(0),
  errorCount: integer("error_count").notNull().default(0),
  userId: text("user_id").references(() => user.id, { onDelete: "set null", onUpdate: "cascade" }),
});

export const bulk_upload_item = pgTable("bulk_upload_item", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()::text`),
  batchId: text("batch_id").notNull().references(() => bulk_upload_batch.id, { onDelete: "cascade", onUpdate: "cascade" }),
  productId: text("product_id").references(() => product.id, { onDelete: "set null", onUpdate: "cascade" }),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  price: integer("price").notNull(),
  manufacturer: text("manufacturer"),
  description: text("description"),
  mainImage: text("main_image"),
  categoryId: text("category_id").notNull(),
  inStock: integer("in_stock").notNull(),
  status: bulkUploadItemStatus("status").notNull().default("CREATED"),
  error: text("error"),
});
