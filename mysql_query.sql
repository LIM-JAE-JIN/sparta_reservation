CREATE TABLE `seat`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL,
    `show_id` BIGINT NOT NULL,
    `seat` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME NOT NULL
);
CREATE TABLE `shows`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `descript` TEXT NOT NULL,
    `show_date` DATETIME NOT NULL,
    `space_left` BIGINT NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `category` JSON NOT NULL,
    `img_url` JSON NOT NULL,
    `createdAt` DATETIME NOT NULL
);
CREATE TABLE `Reservation`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `seat_id` BIGINT NOT NULL,
    `price` BIGINT NOT NULL,
    `createdAt` BIGINT NOT NULL
);
CREATE TABLE `users`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `point` BIGINT NOT NULL DEFAULT '1000000',
    `admin` TINYINT(1) NOT NULL DEFAULT '0',
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL
);
ALTER TABLE
    `seat` ADD CONSTRAINT `seat_show_id_foreign` FOREIGN KEY(`show_id`) REFERENCES `shows`(`id`);
ALTER TABLE
    `seat` ADD CONSTRAINT `seat_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `Reservation` ADD CONSTRAINT `reservation_seat_id_foreign` FOREIGN KEY(`seat_id`) REFERENCES `seat`(`id`);