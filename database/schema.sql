-- database\schema.sql

CREATE TABLE `User`(
    `user_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `is_admin` BOOLEAN NOT NULL DEFAULT '0',
    `avatar_id` BIGINT UNSIGNED NOT NULL
);
ALTER TABLE
    `User` ADD UNIQUE `user_email_unique`(`email`);
CREATE TABLE `Avatar`(
    `avatar_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `image_data` BLOB NULL
);
CREATE TABLE `Video`(
    `video_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `video_title` VARCHAR(255) NOT NULL,
    `video_description` TEXT NULL,
    `card_image_data` BLOB NULL,
    `cover_image_data` BLOB NULL,
    `video_data` BLOB NULL,
    `video_duration` TIME NULL,
    `release_date` DATETIME NOT NULL,
    `is_available` BOOLEAN NOT NULL DEFAULT '1'
);
CREATE TABLE `Category`(
    `category_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `category_name` VARCHAR(255) NOT NULL
);
CREATE TABLE `Category_Video`(
    `category_video_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `category_id` BIGINT UNSIGNED NULL,
    `video_id` BIGINT UNSIGNED NULL
);
CREATE TABLE `Comment`(
    `comment_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `video_id` BIGINT UNSIGNED NOT NULL,
    `comment_content` TEXT NOT NULL,
    `written_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE `Watchlist`(
    `watchlist_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `video_id` BIGINT UNSIGNED NOT NULL
);
CREATE TABLE `Watchlist_Video`(
    `watchlist_video_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `watchlist_id` BIGINT UNSIGNED NOT NULL,
    `video_id` BIGINT UNSIGNED NOT NULL
);
CREATE TABLE `Favorite`(
    `favorite_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `video_id` BIGINT UNSIGNED NOT NULL
);
ALTER TABLE
    `Favorite` ADD CONSTRAINT `favorite_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `User`(`user_id`);
ALTER TABLE
    `Watchlist_Video` ADD CONSTRAINT `watchlist_video_video_id_foreign` FOREIGN KEY(`video_id`) REFERENCES `Video`(`video_id`);
ALTER TABLE
    `Watchlist` ADD CONSTRAINT `watchlist_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `User`(`user_id`);
ALTER TABLE
    `User` ADD CONSTRAINT `user_avatar_id_foreign` FOREIGN KEY(`avatar_id`) REFERENCES `Avatar`(`avatar_id`);
ALTER TABLE
    `Comment` ADD CONSTRAINT `comment_video_id_foreign` FOREIGN KEY(`video_id`) REFERENCES `Video`(`video_id`);
ALTER TABLE
    `Watchlist_Video` ADD CONSTRAINT `watchlist_video_watchlist_id_foreign` FOREIGN KEY(`watchlist_id`) REFERENCES `Watchlist`(`watchlist_id`);
ALTER TABLE
    `Comment` ADD CONSTRAINT `comment_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `User`(`user_id`);
ALTER TABLE
    `Favorite` ADD CONSTRAINT `favorite_video_id_foreign` FOREIGN KEY(`video_id`) REFERENCES `Video`(`video_id`);
ALTER TABLE
    `Category_Video` ADD CONSTRAINT `category_video_video_id_foreign` FOREIGN KEY(`video_id`) REFERENCES `Video`(`video_id`);
ALTER TABLE
    `Category_Video` ADD CONSTRAINT `category_video_category_id_foreign` FOREIGN KEY(`category_id`) REFERENCES `Category`(`category_id`);