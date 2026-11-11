CREATE TYPE "bulk_upload_item_status" AS ENUM('CREATED', 'UPDATED', 'ERROR');--> statement-breakpoint
CREATE TYPE "bulk_upload_status" AS ENUM('PENDING', 'COMPLETED', 'PARTIAL', 'FAILED');--> statement-breakpoint
CREATE TYPE "notification_priority" AS ENUM('LOW', 'NORMAL', 'HIGH', 'URGENT');--> statement-breakpoint
CREATE TYPE "notification_type" AS ENUM('ORDER_UPDATE', 'PAYMENT_STATUS', 'PROMOTION', 'SYSTEM_ALERT');--> statement-breakpoint
CREATE TABLE "bulk_upload_batch" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid(),
	"file_name" text,
	"created_at" timestamp(3) DEFAULT now() NOT NULL,
	"status" "bulk_upload_status" DEFAULT 'PENDING'::"bulk_upload_status" NOT NULL,
	"item_count" integer DEFAULT 0 NOT NULL,
	"error_count" integer DEFAULT 0 NOT NULL,
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE "bulk_upload_item" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid(),
	"batch_id" text NOT NULL,
	"product_id" text,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"price" integer NOT NULL,
	"manufacturer" text,
	"description" text,
	"main_image" text,
	"category_id" text NOT NULL,
	"in_stock" integer NOT NULL,
	"status" "bulk_upload_item_status" DEFAULT 'CREATED'::"bulk_upload_item_status" NOT NULL,
	"error" text
);
--> statement-breakpoint
CREATE TABLE "Category" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE "Customer_order" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"lastname" text NOT NULL,
	"phone" text NOT NULL,
	"email" text NOT NULL,
	"company" text NOT NULL,
	"adress" text NOT NULL,
	"apartment" text NOT NULL,
	"postal_code" text NOT NULL,
	"date_time" timestamp(3) DEFAULT now(),
	"status" text NOT NULL,
	"city" text NOT NULL,
	"country" text NOT NULL,
	"order_notice" text,
	"total" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customer_order_product" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid(),
	"customer_order_id" text NOT NULL,
	"product_id" text NOT NULL,
	"quantity" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Image" (
	"image_id" text PRIMARY KEY DEFAULT gen_random_uuid(),
	"product_id" text NOT NULL,
	"image" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Merchant" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"description" text,
	"email" text,
	"phone" text,
	"address" text,
	"status" text DEFAULT 'ACTIVE' NOT NULL,
	"created_at" timestamp(3) DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Notification" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"type" "notification_type" NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"priority" "notification_priority" DEFAULT 'NORMAL'::"notification_priority" NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp(3) DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Product" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid(),
	"slug" text NOT NULL UNIQUE,
	"title" text NOT NULL,
	"main_image" text NOT NULL,
	"price" integer DEFAULT 0 NOT NULL,
	"rating" integer DEFAULT 0 NOT NULL,
	"description" text NOT NULL,
	"manufacturer" text NOT NULL,
	"in_stock" integer DEFAULT 1 NOT NULL,
	"category_id" text NOT NULL,
	"merchant_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid(),
	"email" text NOT NULL UNIQUE,
	"password" text,
	"role" text DEFAULT 'user'
);
--> statement-breakpoint
CREATE TABLE "Wishlist" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid(),
	"product_id" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE INDEX "notification_user_id_idx" ON "Notification" ("user_id");--> statement-breakpoint
CREATE INDEX "notification_user_id_is_read_idx" ON "Notification" ("user_id","is_read");--> statement-breakpoint
CREATE INDEX "notification_user_id_type_idx" ON "Notification" ("user_id","type");--> statement-breakpoint
CREATE INDEX "notification_created_at_idx" ON "Notification" ("created_at");--> statement-breakpoint
ALTER TABLE "bulk_upload_batch" ADD CONSTRAINT "bulk_upload_batch_user_id_User_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "bulk_upload_item" ADD CONSTRAINT "bulk_upload_item_batch_id_bulk_upload_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "bulk_upload_batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "bulk_upload_item" ADD CONSTRAINT "bulk_upload_item_product_id_Product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "customer_order_product" ADD CONSTRAINT "customer_order_product_customer_order_id_Customer_order_id_fkey" FOREIGN KEY ("customer_order_id") REFERENCES "Customer_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "customer_order_product" ADD CONSTRAINT "customer_order_product_product_id_Product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_User_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_Category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Product" ADD CONSTRAINT "Product_merchant_id_Merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_product_id_Product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_user_id_User_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;