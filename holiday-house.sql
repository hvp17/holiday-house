-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 28, 2019 at 02:09 PM
-- Server version: 5.7.25
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `holiday-house`
--

-- --------------------------------------------------------

--
-- Table structure for table `houses`
--

CREATE TABLE `houses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `address` varchar(255) NOT NULL,
  `type_fk` bigint(20) UNSIGNED NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` timestamp NULL DEFAULT NULL,
  `user_fk` bigint(20) UNSIGNED NOT NULL,
  `rooms` int(10) NOT NULL,
  `smoker_friendly` tinyint(1) NOT NULL,
  `family_friendly` tinyint(1) NOT NULL,
  `price_per_night` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `houses`
--

INSERT INTO `houses` (`id`, `title`, `description`, `address`, `type_fk`, `start_date`, `end_date`, `user_fk`, `rooms`, `smoker_friendly`, `family_friendly`, `price_per_night`) VALUES
(11, 'What a house', 'rthis is a description', 'Tulpiu 2-4 Panevezys, Lithuania', 1, '2019-05-08 22:00:00', '2019-05-30 22:00:00', 7, 4, 0, 1, 283823932),
(15, 'SWEET', 'HOME ALABAMA', '213123123', 2, '2019-06-28 22:00:00', '2019-07-12 22:00:00', 7, 5, 1, 0, 2312),
(16, 'Nice house', 'bla bla bla', 'Nice house', 2, '2019-04-30 22:00:00', '2019-05-31 22:00:00', 7, 5, 1, 0, 4593),
(17, 'Nice house', 'bla bla bla', 'Nice house', 2, '2019-04-30 22:00:00', '2019-05-31 22:00:00', 7, 5, 1, 0, 4593),
(18, 'Nice house', 'bla bla bla', 'Nice house', 2, '2019-04-30 22:00:00', '2019-05-31 22:00:00', 7, 5, 1, 0, 4593),
(19, 'Nice house', 'bla bla bla', 'Nice house', 2, '2019-04-30 22:00:00', '2019-05-31 22:00:00', 7, 5, 1, 0, 4593),
(20, 'Nice house', 'bla bla bla', 'Nice house', 2, '2019-04-30 22:00:00', '2019-05-31 22:00:00', 7, 5, 1, 0, 4593),
(21, 'Nice house', 'bla bla bla', 'Nice house', 2, '2019-04-30 22:00:00', '2019-05-31 22:00:00', 7, 5, 1, 0, 4593),
(22, 'Nice house', 'bla bla bla', 'Nice house', 2, '2019-04-30 22:00:00', '2019-05-31 22:00:00', 7, 5, 1, 0, 4593);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `house_fk` bigint(20) UNSIGNED NOT NULL,
  `path` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `house_fk`, `path`) VALUES
(12, 11, 'https://storage.googleapis.com/holiday-house/thumbnail_hero_bg_3.jpg'),
(13, 11, 'https://storage.googleapis.com/holiday-house/thumbnail_hero_bg_4.jpg'),
(14, 11, 'https://storage.googleapis.com/holiday-house/thumbnail_img_1.jpg'),
(15, 11, 'https://storage.googleapis.com/holiday-house/thumbnail_img_2.jpg'),
(16, 11, 'https://storage.googleapis.com/holiday-house/thumbnail_img_3.jpg'),
(17, 11, 'https://storage.googleapis.com/holiday-house/hero_bg_3.jpg'),
(18, 11, 'https://storage.googleapis.com/holiday-house/hero_bg_4.jpg'),
(19, 11, 'https://storage.googleapis.com/holiday-house/img_1.jpg'),
(20, 11, 'https://storage.googleapis.com/holiday-house/img_2.jpg'),
(21, 11, 'https://storage.googleapis.com/holiday-house/img_3.jpg'),
(22, 14, 'https://storage.googleapis.com/holiday-house/thumbnail_person_6.jpg'),
(23, 14, 'https://storage.googleapis.com/holiday-house/person_6.jpg'),
(24, 15, 'https://storage.googleapis.com/holiday-house/thumbnail_about.jpg'),
(25, 15, 'https://storage.googleapis.com/holiday-house/about.jpg'),
(26, 16, 'https://storage.googleapis.com/holiday-house/thumbnail_puppy.jpeg'),
(27, 16, 'https://storage.googleapis.com/holiday-house/puppy.jpeg'),
(28, 17, 'https://storage.googleapis.com/holiday-house/thumbnail_puppy.jpeg'),
(29, 17, 'https://storage.googleapis.com/holiday-house/puppy.jpeg'),
(30, 18, 'https://storage.googleapis.com/holiday-house/thumbnail_puppy.jpeg'),
(31, 18, 'https://storage.googleapis.com/holiday-house/puppy.jpeg'),
(32, 19, 'https://storage.googleapis.com/holiday-house/thumbnail_puppy.jpeg'),
(33, 19, 'https://storage.googleapis.com/holiday-house/puppy.jpeg'),
(34, 20, 'https://storage.googleapis.com/holiday-house/thumbnail_puppy.jpeg'),
(35, 20, 'https://storage.googleapis.com/holiday-house/puppy.jpeg'),
(36, 21, 'https://storage.googleapis.com/holiday-house/thumbnail_puppy.jpeg'),
(37, 21, 'https://storage.googleapis.com/holiday-house/puppy.jpeg'),
(38, 22, 'https://storage.googleapis.com/holiday-house/thumbnail_puppy.jpeg'),
(39, 22, 'https://storage.googleapis.com/holiday-house/puppy.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `name`) VALUES
(1, 'House'),
(2, 'Villa');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`) VALUES
(7, 'TestingName1', 'TestingEmail1', '231234444', '$2b$10$rmLLAYsVaNJWNdxgPRX4G.ennXqmx0JiRWWZ6wjw2jiHAQHjhz0r2'),
(9, 'Tomas', 'user@gmail.com', '11233423', '$2a$10$X.FXrUWclybIxmvEJBzFuuudXiXdBjS/K7IrDgz9Hx46zXNGh.vdG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `houses`
--
ALTER TABLE `houses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `user_id` (`user_fk`),
  ADD KEY `type_id` (`type_fk`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `house_id` (`house_fk`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `houses`
--
ALTER TABLE `houses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `houses`
--
ALTER TABLE `houses`
  ADD CONSTRAINT `houses_ibfk_1` FOREIGN KEY (`user_fk`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `houses_ibfk_2` FOREIGN KEY (`type_fk`) REFERENCES `types` (`id`);

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`house_fk`) REFERENCES `houses` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
