-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jun 27, 2026 at 10:53 AM
-- Server version: 5.7.39
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laravel13DB`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `booking_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `vehicle_id` bigint(20) UNSIGNED NOT NULL,
  `booking_date` datetime NOT NULL,
  `service_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `booking_number`, `customer_id`, `vehicle_id`, `booking_date`, `service_type`, `notes`, `status`, `created_at`, `updated_at`) VALUES
(1, 'BK-A27Y32XS', 26, 1, '2026-06-30 21:53:00', 'Basic Oil Change', 'change oil only', 'pending', '2026-06-24 03:52:15', '2026-06-24 03:52:15'),
(2, 'BK-5W25XXHZ', 27, 2, '2026-06-27 20:45:00', 'Brake Service', 'break replacement', 'confirmed', '2026-06-26 04:45:37', '2026-06-26 04:55:07'),
(3, 'BK-QTAJGXPJ', 29, 3, '2026-06-27 22:57:00', 'Tire Rotation & Balance', 'Tire rotation', 'confirmed', '2026-06-26 04:57:53', '2026-06-26 04:58:23'),
(4, 'BK-Q7LBZ689', 31, 4, '2026-07-03 09:59:00', 'Basic Oil Change', 'Change oil', 'confirmed', '2026-06-26 15:59:43', '2026-06-26 16:00:11');

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`, `slug`, `logo`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Bosch', 'bosch', 'brands/i0vUdpQYp7HpzZsH7NcmPT09zcUPvZrSacLwYm43.webp', 'German automotive parts manufacturer', 1, '2026-06-02 19:50:04', '2026-06-15 04:48:02'),
(2, 'NGK', 'ngk', 'brands/SHz8XXGkjqmMvi0lRz9DdPWNsfx3KXmO0Dib3qHe.png', 'Spark plugs and ignition components', 1, '2026-06-02 19:50:04', '2026-06-15 04:49:22'),
(3, 'Denso', 'denso', 'brands/ZZfMyt6LgJXkNSgk6WJn15pvUwllIkf499zEnlWx.png', 'Japanese automotive components manufacturer', 1, '2026-06-02 19:50:04', '2026-06-15 04:49:55'),
(4, 'Castrol', 'castrol', 'brands/NZiGcVN3KlR6RVk9gk4LgW8fnzrGsMArIsBvZ3iJ.png', 'Engine oils and lubricants', 1, '2026-06-02 19:50:04', '2026-06-15 04:50:28'),
(5, 'Brembo', 'brembo', 'brands/cTkzx5uscuhgiSmb5OHKmSEUw9g0w5H3aGIdthHC.png', 'High-performance brake systems', 1, '2026-06-02 19:50:04', '2026-06-15 04:51:04'),
(6, 'Michelin', 'michelin', 'brands/WFru8wlI3AsjIcZ62lfaD74fEO10oS7MHK81tSQq.png', 'Premium tires and wheels', 1, '2026-06-02 19:50:04', '2026-06-15 04:52:04'),
(7, 'Mobil 1', 'mobil-1', 'brands/BM20YQtFYliUEO9eJ23nSLj7vFHVUgxJJyH3OMgJ.png', 'Synthetic motor oils', 1, '2026-06-02 19:50:04', '2026-06-15 04:52:41'),
(8, 'ACDelco', 'acdelco', 'brands/Znpirrjbb1PgSRmmnZA5PSdPXmI49rK2mSDfjExS.png', 'General Motors genuine parts', 1, '2026-06-02 19:50:04', '2026-06-15 04:53:32');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel-cache-3b8f75d3bdabb0877a89be2eec50c6ab', 'i:1;', 1782476894),
('laravel-cache-3b8f75d3bdabb0877a89be2eec50c6ab:timer', 'i:1782476894;', 1782476894),
('laravel-cache-a927878e2ba05efd437ca320bd3cf4a5', 'i:1;', 1782514783),
('laravel-cache-a927878e2ba05efd437ca320bd3cf4a5:timer', 'i:1782514783;', 1782514783),
('laravel-cache-b97c7ad3f9cd3a8b8e1e69c0525fbdae', 'i:1;', 1782514824),
('laravel-cache-b97c7ad3f9cd3a8b8e1e69c0525fbdae:timer', 'i:1782514824;', 1782514824);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cart_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `parent_id`, `name`, `slug`, `image`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Engine & Drivetrain', 'engine-drivetrain', 'categories/fMiThlVfvIDrCgeGTBIHfjvLjXhALW0870DQWPMB.webp', 'Engine components, transmissions, and drivetrain parts', 1, '2026-06-02 19:50:04', '2026-06-15 04:30:20'),
(2, NULL, 'Brakes & Suspension', 'brakes-suspension', 'categories/oPnQqgMiQ6lRWjBQk9FcoZip48iSwx522tlcHzF9.webp', 'Brake pads, rotors, shock absorbers, and suspension parts', 1, '2026-06-02 19:50:04', '2026-06-15 04:32:31'),
(3, NULL, 'Electrical & Lighting', 'electrical-lighting', 'categories/PZJuhCJ6SzVDaJqi1UBKQ0hOnlzRoqVj8HTaG6Db.jpg', 'Batteries, alternators, starters, and lighting components', 1, '2026-06-02 19:50:04', '2026-06-15 04:33:56'),
(4, NULL, 'Exhaust & Cooling', 'exhaust-cooling', 'categories/X6k7amBooe29hGxgXwYxuDlMCePQEAfpzUsw0lnC.webp', 'Exhaust systems, radiators, and cooling system parts', 1, '2026-06-02 19:50:04', '2026-06-15 04:38:05'),
(5, NULL, 'Body & Interior', 'body-interior', 'categories/WOxeb5Gm2x416O9syXin7s4xqqyU7VYJHniPYbqg.webp', 'Body panels, interior trim, and accessories', 1, '2026-06-02 19:50:04', '2026-06-15 04:39:13'),
(6, NULL, 'Tires & Wheels', 'tires-wheels', 'categories/doCRZAWgRpzEIRAFtTb1ehrj9K0PMyLKm66pXYgw.jpg', 'Tires, rims, and wheel accessories', 1, '2026-06-02 19:50:04', '2026-06-15 04:39:55'),
(7, NULL, 'Fluids & Chemicals', 'fluids-chemicals', 'categories/VKV3DOu82TvVe1pWGlYc14E46FuI9FeJxSgRxz6l.jpg', 'Engine oil, coolant, brake fluid, and chemicals', 1, '2026-06-02 19:50:04', '2026-06-15 04:40:38'),
(8, NULL, 'Tools & Equipment', 'tools-equipment', 'categories/IFcecBbxKXVamM0FrEnTw6qlmr3geF3CaDzEEAWm.jpg', 'Automotive tools and workshop equipment', 1, '2026-06-02 19:50:04', '2026-06-15 04:41:50');

-- --------------------------------------------------------

--
-- Table structure for table `coupons`
--

CREATE TABLE `coupons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount_value` decimal(12,2) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `usage_limit` int(11) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `coupons`
--

INSERT INTO `coupons` (`id`, `code`, `discount_type`, `discount_value`, `start_date`, `end_date`, `usage_limit`, `status`, `created_at`, `updated_at`) VALUES
(1, 'WELCOME10', 'percentage', '10.00', '2026-06-15', '2026-07-11', 100, 1, '2026-06-15 05:03:13', '2026-06-15 05:03:13'),
(2, 'SAVE20', 'percentage', '20.00', '2026-06-15', '2026-07-31', 100, 1, '2026-06-15 05:03:53', '2026-06-15 05:03:53'),
(3, 'FLAT5OFF', 'fixed', '5.00', '2026-06-15', '2026-08-20', 200, 1, '2026-06-15 05:04:34', '2026-06-15 05:04:34');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `customer_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `loyalty_points` int(11) NOT NULL DEFAULT '0',
  `wallet_balance` decimal(12,2) NOT NULL DEFAULT '0.00',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `user_id`, `customer_code`, `full_name`, `email`, `phone`, `address`, `loyalty_points`, `wallet_balance`, `notes`, `status`, `created_at`, `updated_at`) VALUES
(1, NULL, 'CUST-001', 'John Smith', 'john.smith@email.com', '+1-555-0101', '123 Main Street, New York, NY 10001', 0, '0.00', NULL, 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(2, NULL, 'CUST-002', 'Sarah Johnson', 'sarah.j@email.com', '+1-555-0102', '456 Oak Avenue, Los Angeles, CA 90001', 0, '0.00', NULL, 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(3, NULL, 'CUST-003', 'Mike Williams', 'mike.w@email.com', '+1-555-0103', '789 Pine Road, Chicago, IL 60601', 0, '0.00', NULL, 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(4, NULL, 'CUST-004', 'Emily Davis', 'emily.d@email.com', '+1-555-0104', '321 Elm Street, Houston, TX 77001', 0, '0.00', NULL, 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(5, NULL, 'CUST-005', 'David Brown', 'david.b@email.com', '+1-555-0105', '654 Birch Lane, Phoenix, AZ 85001', 0, '0.00', NULL, 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(6, 2, 'CUST-006', 'Alice Cooper', 'alice.cooper@email.com', '+1-555-0106', '100 Maple Drive, Boston, MA 02101', 216, '31.50', NULL, 1, '2026-06-02 20:28:45', '2026-06-02 20:28:45'),
(7, 3, 'CUST-007', 'Bob Martin', 'bob.martin@email.com', '+1-555-0107', '200 Cedar Lane, Denver, CO 80201', 59, '70.65', NULL, 1, '2026-06-02 20:28:45', '2026-06-02 20:28:45'),
(8, 4, 'CUST-008', 'Carol White', 'carol.white@email.com', '+1-555-0108', '300 Walnut Street, Seattle, WA 98101', 240, '192.79', NULL, 1, '2026-06-02 20:28:46', '2026-06-02 20:28:46'),
(9, 5, 'CUST-009', 'Dan Wilson', 'dan.wilson@email.com', '+1-555-0109', '400 Ash Avenue, Portland, OR 97201', 76, '34.86', NULL, 1, '2026-06-02 20:28:46', '2026-06-02 20:28:46'),
(10, 6, 'CUST-010', 'Eve Taylor', 'eve.taylor@email.com', '+1-555-0110', '500 Spruce Court, Miami, FL 33101', 387, '170.80', NULL, 1, '2026-06-02 20:28:47', '2026-06-02 20:28:47'),
(11, 7, 'CUST-011', 'Frank Harris', 'frank.harris@email.com', '+1-555-0111', '600 Birch Road, Atlanta, GA 30301', 121, '199.05', NULL, 1, '2026-06-02 20:28:47', '2026-06-02 20:28:47'),
(12, 8, 'CUST-012', 'Grace Lee', 'grace.lee@email.com', '+1-555-0112', '700 Willow Way, Dallas, TX 75201', 264, '107.41', NULL, 1, '2026-06-02 20:28:47', '2026-06-02 20:28:47'),
(13, 9, 'CUST-013', 'Henry Clark', 'henry.clark@email.com', '+1-555-0113', '800 Poplar Lane, San Diego, CA 92101', 333, '82.49', NULL, 1, '2026-06-02 20:28:48', '2026-06-02 20:28:48'),
(14, 10, 'CUST-014', 'Ivy Lewis', 'ivy.lewis@email.com', '+1-555-0114', '900 Cypress Blvd, Philadelphia, PA 19101', 199, '140.64', NULL, 1, '2026-06-02 20:28:48', '2026-06-02 20:28:48'),
(15, 11, 'CUST-015', 'Jack Turner', 'jack.turner@email.com', '+1-555-0115', '1000 Palm Drive, Orlando, FL 32801', 341, '170.83', NULL, 1, '2026-06-02 20:28:48', '2026-06-02 20:28:48'),
(16, 12, 'CUST-016', 'Karen Walker', 'karen.walker@email.com', '+1-555-0116', '1100 Pine Street, Nashville, TN 37201', 177, '20.06', NULL, 1, '2026-06-02 20:28:49', '2026-06-02 20:28:49'),
(17, 13, 'CUST-017', 'Leo Adams', 'leo.adams@email.com', '+1-555-0117', '1200 Elm Avenue, Austin, TX 73301', 50, '164.65', NULL, 1, '2026-06-02 20:28:49', '2026-06-02 20:28:49'),
(18, 14, 'CUST-018', 'Mia Scott', 'mia.scott@email.com', '+1-555-0118', '1300 Oak Circle, Charlotte, NC 28201', 113, '112.23', NULL, 1, '2026-06-02 20:28:49', '2026-06-02 20:28:49'),
(19, 15, 'CUST-019', 'Noah Young', 'noah.young@email.com', '+1-555-0119', '1400 Fir Terrace, Detroit, MI 48201', 462, '197.18', NULL, 1, '2026-06-02 20:28:49', '2026-06-02 20:28:49'),
(20, 16, 'CUST-020', 'Olivia King', 'olivia.king@email.com', '+1-555-0120', '1500 Hickory Drive, Minneapolis, MN 55401', 346, '128.13', NULL, 1, '2026-06-02 20:28:50', '2026-06-02 20:28:50'),
(21, 17, 'CUST-021', 'Paul Wright', 'paul.wright@email.com', '+1-555-0121', '1600 Beech Street, St. Louis, MO 63101', 247, '126.02', NULL, 1, '2026-06-02 20:28:50', '2026-06-02 20:28:50'),
(22, 18, 'CUST-022', 'Quinn Baker', 'quinn.baker@email.com', '+1-555-0122', '1700 Dogwood Lane, Tampa, FL 33601', 398, '34.26', NULL, 1, '2026-06-02 20:28:50', '2026-06-02 20:28:50'),
(23, 19, 'CUST-023', 'Rachel Green', 'rachel.green@email.com', '+1-555-0123', '1800 Redwood Road, San Antonio, TX 78201', 241, '182.35', NULL, 1, '2026-06-02 20:28:51', '2026-06-02 20:28:51'),
(24, 20, 'CUST-024', 'Sam Nelson', 'sam.nelson@email.com', '+1-555-0124', '1900 Sycamore Court, Kansas City, MO 64101', 445, '35.42', NULL, 1, '2026-06-02 20:28:51', '2026-06-02 20:28:51'),
(25, NULL, 'CUST-025', 'Tina Mitchell', 'tina.mitchell@email.com', '+1-555-0125', '2000 Aspen Way, Columbus, OH 43201', 170, '78.56', NULL, 1, '2026-06-02 20:28:51', '2026-06-02 20:28:51'),
(26, NULL, 'CUS-FOWNJ1YQ', 'Catlin Ednalan', 'caltlin@test.com', '342424234', NULL, 0, '0.00', NULL, 1, '2026-06-24 03:52:15', '2026-06-24 03:52:15'),
(27, 24, 'CUST-6A3CC24C96F9C', 'Catlin Ednalan', 'catlin@test.com', '345345345345', 'New Cabalan Olongapo City Philippines', 0, '0.00', NULL, 1, '2026-06-24 21:53:16', '2026-06-25 03:45:55'),
(28, 1, 'CUST-6A3D1973D81A4', 'Cairocoders Ednalan', 'cairocoders@gmail.com', NULL, NULL, 0, '0.00', NULL, 1, '2026-06-25 04:05:07', '2026-06-25 04:05:07'),
(29, NULL, 'CUS-A44WTHOY', 'Clydey Ednalan', 'clydey@test.com', '424234234', NULL, 0, '0.00', NULL, 1, '2026-06-26 04:57:53', '2026-06-26 04:57:53'),
(30, 25, 'CUST-6A3E7B651B425', 'Tin Ednalan', 'tin@test.com', '4545345', 'New Cabalan Olongapo City', 0, '0.00', NULL, 1, '2026-06-26 05:15:17', '2026-06-26 05:16:19'),
(31, NULL, 'CUS-1TMZM1WM', 'Juan Dela crus', 'testjuan@test.com', '45345345', NULL, 0, '0.00', NULL, 1, '2026-06-26 15:59:43', '2026-06-26 15:59:43');

-- --------------------------------------------------------

--
-- Table structure for table `customer_wallet_transactions`
--

CREATE TABLE `customer_wallet_transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `transaction_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reference` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `employee_id` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'default.png',
  `status` enum('active','inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `userid`, `phone`, `address`, `employee_id`, `profile_image`, `status`, `created_at`, `updated_at`) VALUES
(1, 21, '5345345345', 'New Cabalan Olongapo City', 'EMP-00001', 'default.png', 'active', '2026-06-18 01:49:08', '2026-06-19 02:41:22'),
(2, 23, NULL, 'New cabalan Olongapo City', 'EMP-00002', 'default.png', 'active', '2026-06-18 19:20:58', '2026-06-23 05:07:26'),
(3, 24, NULL, 'Olongapo City sfsfsf', 'EMP-003', 'default.png', 'active', '2026-06-18 19:23:48', '2026-06-18 19:35:20'),
(4, 21, NULL, 'asdfasdf', '354545', 'default.png', 'active', '2026-06-22 16:35:04', '2026-06-22 16:35:04'),
(5, 22, NULL, 'Olongapo City Zambales', 'EMP-0001', 'default.png', 'active', '2026-06-22 17:03:23', '2026-06-22 17:03:37'),
(6, 23, NULL, 'New Cabalan Olongapo City', 'EMP-002', 'default.png', 'active', '2026-06-23 05:07:04', '2026-06-23 05:07:04');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `invoice_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'service',
  `subtotal` decimal(12,2) NOT NULL DEFAULT '0.00',
  `discount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `tax` decimal(12,2) NOT NULL DEFAULT '0.00',
  `total` decimal(12,2) NOT NULL DEFAULT '0.00',
  `due_date` date DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'draft',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `invoice_number`, `customer_id`, `invoice_type`, `subtotal`, `discount`, `tax`, `total`, `due_date`, `status`, `created_at`, `updated_at`) VALUES
(1, 'INV-20260623-IZKA4Z', 6, 'repair', '37.98', '0.00', '0.00', '37.98', '2026-07-23', 'pending', '2026-06-22 17:41:35', '2026-06-22 17:41:35'),
(2, 'INV-20260623-S7CBSC', 6, 'repair', '37.98', '0.00', '0.00', '37.98', '2026-07-23', 'pending', '2026-06-22 17:41:37', '2026-06-22 17:41:37'),
(3, 'INV-20260623-DHD4EL', 6, 'repair', '37.98', '0.00', '0.00', '37.98', '2026-07-23', 'pending', '2026-06-22 17:43:27', '2026-06-22 17:43:27'),
(4, 'INV-20260623-XPCMET', 6, 'repair', '37.98', '0.00', '0.00', '37.98', '2026-07-23', 'pending', '2026-06-22 17:43:28', '2026-06-22 17:43:28'),
(5, 'INV-20260623-GVVZVV', 7, 'manual', '179.99', '0.00', '0.00', '179.99', '2026-06-23', 'paid', '2026-06-22 19:13:09', '2026-06-22 19:13:09'),
(6, 'INV-20260623-FNFGXS', 9, 'manual', '84.99', '0.00', '0.00', '84.99', '2026-06-23', 'paid', '2026-06-22 19:24:41', '2026-06-22 19:24:41'),
(7, 'INV-20260626-CBNIY5', 4, 'repair', '27.98', '0.00', '0.00', '27.98', '2026-07-26', 'pending', '2026-06-26 15:57:50', '2026-06-26 15:57:50'),
(8, 'INV-20260627-RBMCF3', 30, 'manual', '74.99', '0.00', '0.00', '74.99', '2026-06-27', 'paid', '2026-06-26 16:02:20', '2026-06-26 16:02:20');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_items`
--

CREATE TABLE `invoice_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_id` bigint(20) UNSIGNED NOT NULL,
  `item_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `item_id` bigint(20) UNSIGNED DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `unit_price` decimal(12,2) NOT NULL DEFAULT '0.00',
  `total` decimal(12,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoice_items`
--

INSERT INTO `invoice_items` (`id`, `invoice_id`, `item_type`, `item_id`, `description`, `quantity`, `unit_price`, `total`, `created_at`, `updated_at`) VALUES
(1, 1, 'part', 49, 'Mobil 1 Synthetic Gear Oil 75W-90', 1, '24.99', '24.99', '2026-06-22 17:41:35', '2026-06-22 17:41:35'),
(2, 1, 'part', 1, 'Bosch Oil Filter P363', 1, '12.99', '12.99', '2026-06-22 17:41:35', '2026-06-22 17:41:35'),
(3, 2, 'part', 49, 'Mobil 1 Synthetic Gear Oil 75W-90', 1, '24.99', '24.99', '2026-06-22 17:41:37', '2026-06-22 17:41:37'),
(4, 2, 'part', 1, 'Bosch Oil Filter P363', 1, '12.99', '12.99', '2026-06-22 17:41:37', '2026-06-22 17:41:37'),
(5, 3, 'part', 49, 'Mobil 1 Synthetic Gear Oil 75W-90', 1, '24.99', '24.99', '2026-06-22 17:43:27', '2026-06-22 17:43:27'),
(6, 3, 'part', 1, 'Bosch Oil Filter P363', 1, '12.99', '12.99', '2026-06-22 17:43:27', '2026-06-22 17:43:27'),
(7, 4, 'part', 49, 'Mobil 1 Synthetic Gear Oil 75W-90', 1, '24.99', '24.99', '2026-06-22 17:43:28', '2026-06-22 17:43:28'),
(8, 4, 'part', 1, 'Bosch Oil Filter P363', 1, '12.99', '12.99', '2026-06-22 17:43:28', '2026-06-22 17:43:28'),
(9, 5, 'product', 28, 'ACDelco Radiator', 1, '179.99', '179.99', '2026-06-22 19:13:09', '2026-06-22 19:13:09'),
(10, 6, 'product', 31, 'ACDelco Water Pump', 1, '84.99', '84.99', '2026-06-22 19:24:41', '2026-06-22 19:24:41'),
(11, 7, 'part', 58, 'Mobil 1 Oil Filter M1-102', 1, '14.99', '14.99', '2026-06-26 15:57:50', '2026-06-26 15:57:50'),
(12, 7, 'part', 1, 'Bosch Oil Filter P363', 1, '12.99', '12.99', '2026-06-26 15:57:50', '2026-06-26 15:57:50'),
(13, 8, 'product', 17, 'ACDelco Shock Absorber', 1, '74.99', '74.99', '2026-06-26 16:02:20', '2026-06-26 16:02:20');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` smallint(5) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_cards`
--

CREATE TABLE `job_cards` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `booking_id` bigint(20) UNSIGNED DEFAULT NULL,
  `vehicle_id` bigint(20) UNSIGNED DEFAULT NULL,
  `vehicle_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vehicle_plate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `job_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `inspection_notes` text COLLATE utf8mb4_unicode_ci,
  `estimated_cost` decimal(12,2) NOT NULL DEFAULT '0.00',
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `job_cards`
--

INSERT INTO `job_cards` (`id`, `booking_id`, `vehicle_id`, `vehicle_name`, `vehicle_plate`, `customer_id`, `job_number`, `inspection_notes`, `estimated_cost`, `status`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, 'Toyota Vios 2025', 'AFF876', 6, 'WO-20260623-NX2JZC', 'Change Oil', '49.99', 'completed', '2026-06-22 17:06:15', '2026-06-22 17:46:12'),
(2, NULL, NULL, 'Mitsubishi Mirage G4 2026', 'KDO808', 7, 'WO-20260623-ZV1OMR', 'Brake Replacement in progress', '90.00', 'completed', '2026-06-22 17:55:37', '2026-06-22 17:57:25'),
(3, NULL, NULL, 'Toyota', 'DHI344', 4, 'WO-20260626-29HLSH', 'Change oil', '49.99', 'completed', '2026-06-26 15:56:15', '2026-06-26 15:57:23');

-- --------------------------------------------------------

--
-- Table structure for table `job_card_service_package`
--

CREATE TABLE `job_card_service_package` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `job_card_id` bigint(20) UNSIGNED NOT NULL,
  `service_package_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `job_card_service_package`
--

INSERT INTO `job_card_service_package` (`id`, `job_card_id`, `service_package_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2026-06-22 17:06:15', '2026-06-22 17:06:15'),
(2, 2, 8, '2026-06-22 17:55:37', '2026-06-22 17:55:37'),
(3, 3, 1, '2026-06-26 15:56:15', '2026-06-26 15:56:15');

-- --------------------------------------------------------

--
-- Table structure for table `mechanic_assignments`
--

CREATE TABLE `mechanic_assignments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `job_card_id` bigint(20) UNSIGNED NOT NULL,
  `mechanic_id` bigint(20) UNSIGNED NOT NULL,
  `assigned_at` datetime DEFAULT NULL,
  `completed_at` datetime DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'assigned',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `mechanic_assignments`
--

INSERT INTO `mechanic_assignments` (`id`, `job_card_id`, `mechanic_id`, `assigned_at`, `completed_at`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 22, '2026-06-23 01:06:15', '2026-06-23 01:16:31', 'completed', '2026-06-22 17:06:15', '2026-06-22 17:16:31'),
(2, 2, 22, '2026-06-23 01:55:37', '2026-06-23 01:57:25', 'completed', '2026-06-22 17:55:37', '2026-06-22 17:57:25'),
(3, 3, 23, '2026-06-26 23:56:15', '2026-06-26 23:57:23', 'completed', '2026-06-26 15:56:15', '2026-06-26 15:57:23');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_08_14_170933_add_two_factor_columns_to_users_table', 1),
(5, '2025_08_15_000001_create_categories_table', 2),
(6, '2025_08_15_000002_create_brands_table', 2),
(7, '2025_08_15_000003_create_vehicle_makes_table', 2),
(8, '2025_08_15_000004_create_vehicle_models_table', 2),
(9, '2025_08_15_000005_create_customers_table', 2),
(10, '2025_08_15_000006_create_vehicles_table', 2),
(11, '2025_08_15_000007_create_products_table', 2),
(12, '2025_08_15_000008_create_product_images_table', 2),
(13, '2025_08_15_000009_create_product_specifications_table', 2),
(14, '2025_08_15_000010_create_product_vehicle_compatibilities_table', 2),
(15, '2025_08_15_000011_create_customer_wallet_transactions_table', 2),
(16, '2025_08_15_000012_create_service_packages_table', 2),
(17, '2025_08_15_000013_create_bookings_table', 2),
(18, '2025_08_15_000014_create_job_cards_table', 2),
(19, '2025_08_15_000015_create_mechanic_assignments_table', 2),
(20, '2025_08_15_000016_create_repair_orders_table', 2),
(21, '2025_08_15_000017_create_repair_order_parts_table', 2),
(22, '2025_08_15_000018_create_vehicle_inspections_table', 2),
(23, '2025_08_15_000019_create_warehouses_table', 2),
(24, '2025_08_15_000020_create_sales_table', 2),
(25, '2025_08_15_000021_create_sale_items_table', 2),
(26, '2025_08_15_000022_create_sale_returns_table', 2),
(27, '2025_08_15_000023_create_invoices_table', 2),
(28, '2025_08_15_000024_create_invoice_items_table', 2),
(29, '2025_08_15_000025_create_payments_table', 2),
(30, '2025_08_15_000026_create_carts_table', 2),
(31, '2025_08_15_000027_create_cart_items_table', 2),
(32, '2025_08_15_000028_create_wishlists_table', 2),
(33, '2025_08_15_000029_create_coupons_table', 2),
(34, '2025_08_15_000030_create_orders_table', 2),
(35, '2025_08_15_000031_create_order_items_table', 2),
(36, '2025_08_15_000032_create_reviews_table', 2),
(37, '2025_08_15_000033_create_notifications_table', 2),
(38, '2025_08_15_000034_create_settings_table', 2),
(39, '2025_08_15_000035_add_role_and_last_login_to_users_table', 3),
(40, '2026_06_12_123345_add_has_vehicle_compatibility_to_products_table', 4),
(41, '2026_06_17_093000_create_job_card_service_package_table', 5),
(42, '2026_06_17_094000_add_vehicle_fields_to_job_cards_table', 6),
(43, '2026_06_19_100000_add_phone_and_status_to_users_table', 7),
(44, '2026_06_19_110000_add_position_to_users_table', 8),
(45, '2026_06_26_100000_add_payment_method_to_orders_table', 9);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `channel` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `sent_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `coupon_id` bigint(20) UNSIGNED DEFAULT NULL,
  `order_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subtotal` decimal(12,2) NOT NULL DEFAULT '0.00',
  `discount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `tax` decimal(12,2) NOT NULL DEFAULT '0.00',
  `shipping_fee` decimal(12,2) NOT NULL DEFAULT '0.00',
  `total` decimal(12,2) NOT NULL DEFAULT '0.00',
  `payment_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `payment_method` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `coupon_id`, `order_number`, `subtotal`, `discount`, `tax`, `shipping_fee`, `total`, `payment_status`, `payment_method`, `order_status`, `created_at`, `updated_at`) VALUES
(1, 6, NULL, 'ORD-00001', '430.94', '56.02', '30.93', '19.46', '425.31', 'refunded', 'cod', 'cancelled', '2026-04-03 21:50:52', '2026-04-03 21:50:52'),
(2, 8, NULL, 'ORD-00002', '299.98', '21.00', '23.02', '16.71', '318.71', 'pending', 'cod', 'completed', '2026-05-29 06:21:52', '2026-05-29 06:21:52'),
(3, 3, NULL, 'ORD-00003', '479.98', '57.60', '34.85', '0.00', '457.23', 'refunded', 'cod', 'pending', '2026-04-27 05:41:52', '2026-04-27 05:41:52'),
(4, 17, NULL, 'ORD-00004', '1669.87', '166.99', '123.99', '0.00', '1626.87', 'refunded', 'cod', 'pending', '2026-04-29 11:29:52', '2026-04-29 11:29:52'),
(5, 18, NULL, 'ORD-00005', '1037.90', '134.93', '74.50', '19.53', '997.00', 'failed', 'cod', 'pending', '2026-06-03 15:00:52', '2026-06-03 15:00:52'),
(6, 20, NULL, 'ORD-00006', '319.92', '12.80', '25.34', '0.00', '332.46', 'paid', 'card', 'completed', '2026-04-13 11:59:52', '2026-04-13 11:59:52'),
(7, 5, NULL, 'ORD-00007', '489.94', '73.49', '34.36', '16.85', '467.66', 'failed', 'cod', 'pending', '2026-04-26 09:32:52', '2026-04-26 09:32:52'),
(8, 13, NULL, 'ORD-00008', '1044.88', '73.14', '80.17', '0.00', '1051.91', 'failed', 'cod', 'processing', '2026-05-21 09:33:52', '2026-05-21 09:33:52'),
(9, 8, NULL, 'ORD-00009', '806.94', '24.21', '64.58', '0.00', '847.31', 'failed', 'cod', 'pending', '2026-05-09 23:32:52', '2026-05-09 23:32:52'),
(10, 5, NULL, 'ORD-00010', '370.91', '37.09', '27.54', '10.75', '372.11', 'paid', 'card', 'processing', '2026-04-04 11:08:52', '2026-04-04 11:08:52'),
(11, 24, NULL, 'ORD-00011', '518.91', '25.95', '40.67', '6.78', '540.41', 'pending', 'cod', 'cancelled', '2026-04-12 21:08:52', '2026-04-12 21:08:52'),
(12, 3, NULL, 'ORD-00012', '1358.90', '108.71', '103.14', '14.83', '1368.16', 'failed', 'cod', 'processing', '2026-05-23 16:03:52', '2026-05-23 16:03:52'),
(13, 10, NULL, 'ORD-00013', '527.91', '0.00', '43.55', '12.17', '583.63', 'pending', 'cod', 'pending', '2026-04-10 11:13:52', '2026-04-10 11:13:52'),
(14, 21, NULL, 'ORD-00014', '84.99', '8.50', '6.31', '17.60', '100.40', 'paid', 'card', 'completed', '2026-04-07 21:54:52', '2026-04-07 21:54:52'),
(15, 23, NULL, 'ORD-00015', '275.97', '16.56', '21.40', '17.82', '298.63', 'paid', 'card', 'pending', '2026-06-02 09:07:52', '2026-06-02 09:07:52'),
(16, 2, NULL, 'ORD-00016', '105.98', '6.36', '8.22', '0.00', '107.84', 'failed', 'cod', 'completed', '2026-04-05 12:55:52', '2026-04-05 12:55:52'),
(17, 3, NULL, 'ORD-00017', '1196.92', '59.85', '93.81', '16.51', '1247.39', 'failed', 'cod', 'pending', '2026-04-06 00:29:52', '2026-04-06 00:29:52'),
(18, 3, NULL, 'ORD-00018', '109.98', '14.30', '7.89', '0.00', '103.57', 'pending', 'cod', 'pending', '2026-04-18 17:07:52', '2026-04-18 17:07:52'),
(19, 13, NULL, 'ORD-00019', '36.98', '2.22', '2.87', '7.16', '44.79', 'refunded', 'cod', 'completed', '2026-04-08 08:53:52', '2026-04-08 08:53:52'),
(20, 19, NULL, 'ORD-00020', '849.91', '110.49', '61.00', '0.00', '800.42', 'pending', 'cod', 'completed', '2026-06-03 15:21:52', '2026-06-03 15:21:52'),
(21, 17, NULL, 'ORD-00021', '329.97', '26.40', '25.04', '0.00', '328.61', 'pending', 'cod', 'processing', '2026-05-19 18:05:52', '2026-05-19 18:05:52'),
(22, 2, NULL, 'ORD-00022', '73.98', '10.36', '5.25', '11.50', '80.37', 'failed', 'cod', 'processing', '2026-05-01 16:26:52', '2026-05-01 16:26:52'),
(23, 19, NULL, 'ORD-00023', '404.96', '20.25', '31.74', '6.30', '422.75', 'pending', 'cod', 'processing', '2026-04-19 21:27:52', '2026-04-19 21:27:52'),
(24, 22, NULL, 'ORD-00024', '1154.89', '11.55', '94.33', '17.22', '1254.89', 'refunded', 'cod', 'pending', '2026-06-01 16:12:52', '2026-06-01 16:12:52'),
(25, 16, NULL, 'ORD-00025', '1175.90', '82.31', '90.22', '10.04', '1193.85', 'failed', 'cod', 'processing', '2026-04-25 12:51:52', '2026-04-25 12:51:52'),
(26, 14, NULL, 'ORD-00026', '869.90', '8.70', '71.05', '10.07', '942.32', 'refunded', 'cod', 'processing', '2026-05-25 19:15:52', '2026-05-25 19:15:52'),
(27, 8, NULL, 'ORD-00027', '704.93', '0.00', '58.16', '8.07', '771.16', 'refunded', 'cod', 'processing', '2026-05-11 13:00:52', '2026-05-11 13:00:52'),
(28, 2, NULL, 'ORD-00028', '1258.94', '151.07', '91.40', '18.78', '1218.05', 'refunded', 'cod', 'processing', '2026-05-01 17:52:52', '2026-05-01 17:52:52'),
(29, 7, NULL, 'ORD-00029', '79.99', '0.00', '6.60', '7.43', '94.02', 'failed', 'cod', 'cancelled', '2026-04-15 06:22:52', '2026-04-15 06:22:52'),
(30, 12, NULL, 'ORD-00030', '169.95', '15.30', '12.76', '14.17', '181.58', 'refunded', 'cod', 'cancelled', '2026-05-21 15:06:52', '2026-05-21 15:06:52'),
(31, 4, NULL, 'ORD-00031', '546.91', '27.35', '42.86', '15.92', '578.34', 'paid', 'card', 'pending', '2026-06-02 07:15:52', '2026-06-02 07:15:52'),
(32, 5, NULL, 'ORD-00032', '629.96', '88.19', '44.70', '0.00', '586.47', 'paid', 'card', 'cancelled', '2026-04-10 16:50:52', '2026-04-10 16:50:52'),
(33, 14, NULL, 'ORD-00033', '745.92', '37.30', '58.46', '0.00', '767.08', 'paid', 'card', 'cancelled', '2026-05-29 14:31:52', '2026-05-29 14:31:52'),
(34, 2, NULL, 'ORD-00034', '1482.90', '222.44', '103.99', '0.00', '1364.45', 'pending', 'cod', 'cancelled', '2026-05-27 03:23:52', '2026-05-27 03:23:52'),
(35, 6, NULL, 'ORD-00035', '409.98', '20.50', '32.13', '0.00', '421.61', 'failed', 'cod', 'processing', '2026-05-24 06:35:52', '2026-05-24 06:35:52'),
(36, 9, NULL, 'ORD-00036', '664.92', '86.44', '47.72', '0.00', '626.20', 'refunded', 'cod', 'completed', '2026-05-18 06:52:52', '2026-05-18 06:52:52'),
(37, 7, NULL, 'ORD-00037', '74.97', '3.00', '5.94', '11.03', '88.94', 'refunded', 'cod', 'processing', '2026-04-10 02:56:52', '2026-04-10 02:56:52'),
(38, 22, NULL, 'ORD-00038', '129.99', '5.20', '10.30', '5.02', '140.11', 'failed', 'cod', 'processing', '2026-06-01 02:27:52', '2026-06-01 02:27:52'),
(39, 4, NULL, 'ORD-00039', '750.92', '67.58', '56.38', '19.31', '759.03', 'paid', 'card', 'completed', '2026-05-16 15:30:52', '2026-05-16 15:30:52'),
(40, 23, NULL, 'ORD-00040', '504.95', '10.10', '40.83', '0.00', '535.68', 'refunded', 'cod', 'completed', '2026-04-21 09:23:52', '2026-04-21 09:23:52'),
(41, 25, NULL, 'ORD-00041', '73.98', '9.62', '5.31', '19.99', '89.66', 'paid', 'card', 'cancelled', '2026-05-24 12:53:52', '2026-05-24 12:53:52'),
(42, 25, NULL, 'ORD-00042', '909.95', '72.80', '69.06', '0.00', '906.21', 'pending', 'cod', 'cancelled', '2026-05-19 04:16:52', '2026-05-19 04:16:52'),
(43, 19, NULL, 'ORD-00043', '740.90', '103.73', '52.57', '0.00', '689.74', 'failed', 'cod', 'processing', '2026-04-10 12:33:52', '2026-04-10 12:33:52'),
(44, 4, NULL, 'ORD-00044', '1127.92', '33.84', '90.26', '13.31', '1197.65', 'refunded', 'cod', 'completed', '2026-06-01 05:28:52', '2026-06-01 05:28:52'),
(45, 16, NULL, 'ORD-00045', '747.90', '52.35', '57.38', '0.00', '752.93', 'pending', 'cod', 'cancelled', '2026-04-28 15:22:52', '2026-04-28 15:22:52'),
(46, 15, NULL, 'ORD-00046', '1589.90', '63.60', '125.92', '10.21', '1662.43', 'refunded', 'cod', 'cancelled', '2026-04-16 09:41:52', '2026-04-16 09:41:52'),
(47, 21, NULL, 'ORD-00047', '498.94', '49.89', '37.05', '0.00', '486.10', 'failed', 'cod', 'completed', '2026-05-19 01:41:52', '2026-05-19 01:41:52'),
(48, 3, NULL, 'ORD-00048', '239.95', '21.60', '18.01', '0.00', '236.36', 'paid', 'card', 'pending', '2026-04-05 23:31:52', '2026-04-05 23:31:52'),
(49, 3, NULL, 'ORD-00049', '115.94', '3.48', '9.28', '0.00', '121.74', 'refunded', 'cod', 'completed', '2026-06-03 14:46:52', '2026-06-03 14:46:52'),
(50, 8, NULL, 'ORD-00050', '512.92', '61.55', '37.24', '5.56', '494.17', 'refunded', 'cod', 'processing', '2026-04-22 18:09:52', '2026-04-22 18:09:52'),
(51, 9, NULL, 'POS-20260623-NM2F91', '39.98', '0.00', '0.00', '0.00', '39.98', 'paid', 'card', 'completed', '2026-06-22 18:44:49', '2026-06-22 18:44:49'),
(52, 5, NULL, 'POS-20260623-KVPHWE', '179.99', '0.00', '0.00', '0.00', '179.99', 'paid', 'card', 'completed', '2026-06-22 18:58:36', '2026-06-22 18:58:36'),
(53, 5, NULL, 'POS-20260623-VIEINX', '139.98', '0.00', '0.00', '0.00', '139.98', 'paid', 'card', 'completed', '2026-06-22 19:32:35', '2026-06-22 19:32:35'),
(54, 27, NULL, 'ORD-20260625-STMT4F', '244.98', '0.00', '24.50', '0.00', '269.48', 'paid', 'card', 'completed', '2026-06-25 04:00:07', '2026-06-25 04:08:56'),
(55, 27, NULL, 'ORD-20260626-CI3WQQ', '42.99', '0.00', '4.30', '0.00', '47.29', 'paid', 'card', 'completed', '2026-06-26 04:39:52', '2026-06-26 04:43:22'),
(56, 30, NULL, 'ORD-20260626-TEVC1N', '529.96', '0.00', '53.00', '0.00', '582.96', 'paid', 'cod', 'completed', '2026-06-26 05:17:53', '2026-06-26 15:47:55'),
(57, 30, NULL, 'POS-20260627-RD0LDH', '37.98', '0.00', '0.00', '0.00', '37.98', 'paid', NULL, 'completed', '2026-06-26 16:01:19', '2026-06-26 16:01:19');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `unit_price` decimal(12,2) NOT NULL DEFAULT '0.00',
  `total` decimal(12,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `unit_price`, `total`, `created_at`, `updated_at`) VALUES
(1, 1, 29, 3, '119.99', '359.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(2, 1, 36, 2, '22.99', '45.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(3, 1, 49, 1, '24.99', '24.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(4, 2, 51, 2, '149.99', '299.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(5, 3, 37, 1, '279.99', '279.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(6, 3, 38, 1, '199.99', '199.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(7, 4, 6, 1, '79.99', '79.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(8, 4, 16, 3, '199.99', '599.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(9, 4, 21, 3, '149.99', '449.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(10, 4, 35, 3, '29.99', '89.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(11, 4, 51, 3, '149.99', '449.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(12, 5, 11, 1, '149.99', '149.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(13, 5, 32, 2, '72.99', '145.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(14, 5, 33, 3, '18.99', '56.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(15, 5, 38, 3, '199.99', '599.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(16, 5, 50, 1, '84.99', '84.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(17, 6, 14, 3, '19.99', '59.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(18, 6, 26, 2, '24.99', '49.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(19, 6, 55, 3, '69.99', '209.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(20, 7, 17, 1, '74.99', '74.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(21, 7, 40, 1, '229.99', '229.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(22, 7, 42, 3, '54.99', '164.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(23, 7, 46, 1, '19.99', '19.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(24, 8, 14, 3, '19.99', '59.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(25, 8, 28, 2, '179.99', '359.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(26, 8, 31, 3, '84.99', '254.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(27, 8, 43, 2, '54.99', '109.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(28, 8, 54, 2, '129.99', '259.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(29, 9, 6, 2, '79.99', '159.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(30, 9, 11, 1, '149.99', '149.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(31, 9, 25, 1, '56.99', '56.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(32, 9, 27, 1, '289.99', '289.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(33, 9, 51, 1, '149.99', '149.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(34, 10, 12, 1, '42.99', '42.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(35, 10, 25, 1, '56.99', '56.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(36, 10, 31, 1, '84.99', '84.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(37, 10, 45, 3, '36.99', '110.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(38, 10, 49, 3, '24.99', '74.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(39, 11, 2, 1, '9.99', '9.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(40, 11, 9, 2, '64.99', '129.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(41, 11, 20, 2, '129.99', '259.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(42, 11, 52, 3, '7.99', '23.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(43, 11, 53, 1, '94.99', '94.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(44, 12, 13, 2, '219.99', '439.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(45, 12, 16, 3, '199.99', '599.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(46, 12, 34, 3, '36.99', '110.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(47, 12, 38, 1, '199.99', '199.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(48, 12, 52, 1, '7.99', '7.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(49, 13, 25, 1, '56.99', '56.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(50, 13, 36, 3, '22.99', '68.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(51, 13, 41, 1, '219.99', '219.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(52, 13, 42, 3, '54.99', '164.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(53, 13, 48, 1, '16.99', '16.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(54, 14, 23, 1, '84.99', '84.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(55, 15, 1, 1, '12.99', '12.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(56, 15, 4, 1, '189.99', '189.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(57, 15, 32, 1, '72.99', '72.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(58, 16, 15, 2, '52.99', '105.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(59, 17, 8, 3, '149.99', '449.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(60, 17, 31, 2, '84.99', '169.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(61, 17, 37, 2, '279.99', '559.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(62, 17, 48, 1, '16.99', '16.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(63, 18, 42, 2, '54.99', '109.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(64, 19, 46, 1, '19.99', '19.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(65, 19, 48, 1, '16.99', '16.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(66, 20, 26, 3, '24.99', '74.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(67, 20, 29, 2, '119.99', '239.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(68, 20, 41, 1, '219.99', '219.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(69, 20, 42, 1, '54.99', '54.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(70, 20, 54, 2, '129.99', '259.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(71, 21, 30, 3, '109.99', '329.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(72, 22, 45, 2, '36.99', '73.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(73, 23, 37, 1, '279.99', '279.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(74, 23, 46, 2, '19.99', '39.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(75, 23, 50, 1, '84.99', '84.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(76, 24, 13, 3, '219.99', '659.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(77, 24, 15, 2, '52.99', '105.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(78, 24, 21, 1, '149.99', '149.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(79, 24, 34, 2, '36.99', '73.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(80, 24, 44, 3, '54.99', '164.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(81, 25, 1, 2, '12.99', '25.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(82, 25, 3, 3, '59.99', '179.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(83, 25, 8, 2, '149.99', '299.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(84, 25, 24, 2, '259.99', '519.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(85, 25, 51, 1, '149.99', '149.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(86, 26, 18, 2, '104.99', '209.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(87, 26, 26, 3, '24.99', '74.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(88, 26, 51, 2, '149.99', '299.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(89, 26, 53, 3, '94.99', '284.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(90, 27, 8, 1, '149.99', '149.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(91, 27, 10, 3, '129.99', '389.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(92, 27, 42, 3, '54.99', '164.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(93, 28, 24, 3, '259.99', '779.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(94, 28, 33, 1, '18.99', '18.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(95, 28, 40, 2, '229.99', '459.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(96, 29, 6, 1, '79.99', '79.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(97, 30, 14, 3, '19.99', '59.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(98, 30, 42, 2, '54.99', '109.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(99, 31, 5, 1, '45.99', '45.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(100, 31, 17, 3, '74.99', '224.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(101, 31, 23, 3, '84.99', '254.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(102, 31, 47, 1, '12.99', '12.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(103, 31, 52, 1, '7.99', '7.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(104, 32, 28, 1, '179.99', '179.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(105, 32, 37, 1, '279.99', '279.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(106, 32, 50, 2, '84.99', '169.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(107, 33, 1, 2, '12.99', '25.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(108, 33, 12, 1, '42.99', '42.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(109, 33, 25, 1, '56.99', '56.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(110, 33, 35, 2, '29.99', '59.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(111, 33, 37, 2, '279.99', '559.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(112, 34, 19, 3, '89.99', '269.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(113, 34, 22, 3, '329.99', '989.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(114, 34, 47, 1, '12.99', '12.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(115, 34, 55, 3, '69.99', '209.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(116, 35, 27, 1, '289.99', '289.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(117, 35, 29, 1, '119.99', '119.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(118, 36, 2, 3, '9.99', '29.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(119, 36, 13, 1, '219.99', '219.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(120, 36, 20, 3, '129.99', '389.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(121, 36, 26, 1, '24.99', '24.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(122, 37, 26, 3, '24.99', '74.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(123, 38, 10, 1, '129.99', '129.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(124, 39, 11, 1, '149.99', '149.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(125, 39, 32, 2, '72.99', '145.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(126, 39, 41, 1, '219.99', '219.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(127, 39, 43, 3, '54.99', '164.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(128, 39, 55, 1, '69.99', '69.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(129, 40, 4, 1, '189.99', '189.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(130, 40, 13, 1, '219.99', '219.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(131, 40, 14, 2, '19.99', '39.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(132, 40, 42, 1, '54.99', '54.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(133, 41, 45, 2, '36.99', '73.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(134, 42, 21, 2, '149.99', '299.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(135, 42, 27, 2, '289.99', '579.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(136, 42, 35, 1, '29.99', '29.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(137, 43, 12, 3, '42.99', '128.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(138, 43, 16, 1, '199.99', '199.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(139, 43, 21, 2, '149.99', '299.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(140, 43, 34, 1, '36.99', '36.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(141, 43, 49, 3, '24.99', '74.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(142, 44, 6, 1, '79.99', '79.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(143, 44, 12, 1, '42.99', '42.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(144, 44, 18, 3, '104.99', '314.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(145, 44, 40, 3, '229.99', '689.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(146, 45, 3, 3, '59.99', '179.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(147, 45, 21, 3, '149.99', '449.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(148, 45, 26, 2, '24.99', '49.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(149, 45, 42, 1, '54.99', '54.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(150, 45, 47, 1, '12.99', '12.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(151, 46, 8, 3, '149.99', '449.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(152, 46, 27, 2, '289.99', '579.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(153, 46, 31, 2, '84.99', '169.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(154, 46, 54, 3, '129.99', '389.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(155, 47, 15, 3, '52.99', '158.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(156, 47, 40, 1, '229.99', '229.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(157, 47, 43, 2, '54.99', '109.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(158, 48, 17, 2, '74.99', '149.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(159, 48, 35, 3, '29.99', '89.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(160, 49, 33, 1, '18.99', '18.99', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(161, 49, 36, 2, '22.99', '45.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(162, 49, 48, 3, '16.99', '50.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(163, 50, 1, 3, '12.99', '38.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(164, 50, 25, 2, '56.99', '113.98', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(165, 50, 29, 3, '119.99', '359.97', '2026-06-02 20:28:52', '2026-06-02 20:28:52'),
(166, 51, 58, 1, '14.99', '14.99', '2026-06-22 18:44:49', '2026-06-22 18:44:49'),
(167, 51, 49, 1, '24.99', '24.99', '2026-06-22 18:44:49', '2026-06-22 18:44:49'),
(168, 52, 28, 1, '179.99', '179.99', '2026-06-22 18:58:36', '2026-06-22 18:58:36'),
(169, 53, 2, 1, '9.99', '9.99', '2026-06-22 19:32:35', '2026-06-22 19:32:35'),
(170, 53, 20, 1, '129.99', '129.99', '2026-06-22 19:32:35', '2026-06-22 19:32:35'),
(171, 54, 53, 1, '94.99', '94.99', '2026-06-25 04:00:07', '2026-06-25 04:00:07'),
(172, 54, 51, 1, '149.99', '149.99', '2026-06-25 04:00:07', '2026-06-25 04:00:07'),
(173, 55, 57, 1, '42.99', '42.99', '2026-06-26 04:39:52', '2026-06-26 04:39:52'),
(174, 56, 28, 1, '179.99', '179.99', '2026-06-26 05:17:53', '2026-06-26 05:17:53'),
(175, 56, 29, 2, '119.99', '239.98', '2026-06-26 05:17:53', '2026-06-26 05:17:53'),
(176, 56, 30, 1, '109.99', '109.99', '2026-06-26 05:17:53', '2026-06-26 05:17:53'),
(177, 57, 49, 1, '24.99', '24.99', '2026-06-26 16:01:19', '2026-06-26 16:01:19'),
(178, 57, 1, 1, '12.99', '12.99', '2026-06-26 16:01:19', '2026-06-26 16:01:19');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `sale_id` bigint(20) UNSIGNED DEFAULT NULL,
  `invoice_id` bigint(20) UNSIGNED DEFAULT NULL,
  `amount` decimal(12,2) NOT NULL,
  `payment_method` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_reference` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_date` datetime DEFAULT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `brand_id` bigint(20) UNSIGNED NOT NULL,
  `sku` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `barcode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `cost_price` decimal(12,2) NOT NULL DEFAULT '0.00',
  `selling_price` decimal(12,2) NOT NULL DEFAULT '0.00',
  `discount_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `discount_value` decimal(12,2) NOT NULL DEFAULT '0.00',
  `tax_rate` decimal(5,2) NOT NULL DEFAULT '0.00',
  `minimum_stock` int(11) NOT NULL DEFAULT '0',
  `weight` decimal(10,2) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `has_vehicle_compatibility` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `brand_id`, `sku`, `barcode`, `name`, `slug`, `description`, `cost_price`, `selling_price`, `discount_type`, `discount_value`, `tax_rate`, `minimum_stock`, `weight`, `status`, `created_at`, `updated_at`, `has_vehicle_compatibility`) VALUES
(1, 1, 1, 'BOS-001', NULL, 'Bosch Oil Filter P363', 'bosch-oil-filter-p363', 'Premium oil filter for gasoline and diesel engines', '5.50', '12.99', 'percentage', '0.00', '0.00', 20, NULL, 1, '2026-06-02 19:50:04', '2026-06-12 04:43:10', 1),
(2, 1, 2, 'NGK-001', NULL, 'NGK Iridium Spark Plug', 'ngk-iridium-spark-plug', 'High-performance iridium spark plug', '4.00', '9.99', 'percentage', '0.00', '0.00', 50, NULL, 1, '2026-06-02 19:50:04', '2026-06-12 04:43:56', 1),
(3, 2, 5, 'BRM-001', NULL, 'Brembo Brake Pad Set', 'brembo-brake-pad-set', 'High-performance ceramic brake pad set', '25.00', '59.99', 'percentage', '0.00', '0.00', 10, NULL, 1, '2026-06-02 19:50:04', '2026-06-12 04:44:48', 1),
(4, 3, 3, 'DEN-001', NULL, 'Denso Alternator 100A', 'denso-alternator-100a', '100-amp alternator for compact and mid-size vehicles', '80.00', '189.99', 'percentage', '0.00', '0.00', 5, NULL, 1, '2026-06-02 19:50:04', '2026-06-12 04:45:40', 1),
(5, 7, 4, 'CAS-001', NULL, 'Castrol Edge 5W-30', 'castrol-edge-5w30', 'Full synthetic engine oil 5W-30 (5 liters)', '20.00', '45.99', 'percentage', '0.00', '0.00', 30, NULL, 1, '2026-06-02 19:50:04', '2026-06-12 04:46:36', 1),
(6, 1, 1, 'BOS-002', NULL, 'Bosch Fuel Injector', 'bosch-fuel-injector', 'High-precision fuel injector for direct injection engines', '35.00', '79.99', 'percentage', '0.00', '0.00', 15, NULL, 1, '2026-06-02 19:50:04', '2026-06-12 04:47:41', 1),
(7, 2, 5, 'BRM-002', NULL, 'Brembo Brake Rotor Disc', 'brembo-brake-rotor-disc', 'Vented brake rotor disc for performance vehicles', '40.00', '99.99', 'percentage', '0.00', '0.00', 8, NULL, 1, '2026-06-02 19:50:04', '2026-06-12 04:48:39', 1),
(8, 3, 3, 'DEN-002', NULL, 'Denso Starter Motor', 'denso-starter-motor', 'High-torque starter motor for gasoline engines', '60.00', '149.99', 'percentage', '0.00', '0.00', 5, NULL, 1, '2026-06-02 19:50:04', '2026-06-12 04:49:23', 1),
(9, 1, 3, 'DEN-003', NULL, 'Denso Oxygen Sensor', 'denso-oxygen-sensor', 'Oxygen sensor for precise air-fuel ratio monitoring', '28.00', '64.99', 'percentage', '0.00', '0.00', 10, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 03:26:54', 1),
(10, 1, 8, 'ACD-001', NULL, 'ACDelco Timing Belt Kit', 'acdelco-timing-belt-kit', 'Complete timing belt kit including tensioner and pulleys', '55.00', '129.99', 'percentage', '0.00', '0.00', 8, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 03:27:13', 1),
(11, 1, 1, 'BOS-003', NULL, 'Bosch Mass Air Flow Sensor', 'bosch-mass-air-flow-sensor', 'Direct replacement MAF sensor for precise engine management', '65.00', '149.99', 'percentage', '0.00', '0.00', 5, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 03:33:40', 1),
(12, 1, 2, 'NGK-002', NULL, 'NGK Spark Plug Wire Set', 'ngk-spark-plug-wire-set', 'Premium silicone spark plug wire set for improved ignition', '18.00', '42.99', 'percentage', '0.00', '0.00', 15, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:36:03', 1),
(13, 1, 3, 'DEN-004', NULL, 'Denso Fuel Pump Module', 'denso-fuel-pump-module', 'Complete fuel pump assembly with fuel level sensor', '95.00', '219.99', 'percentage', '0.00', '0.00', 5, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:36:45', 1),
(14, 1, 8, 'ACD-002', NULL, 'ACDelco Engine Coolant Thermostat', 'acdelco-engine-coolant-thermostat', 'OE-quality engine coolant thermostat for precise temperature control', '8.00', '19.99', 'percentage', '0.00', '0.00', 20, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:37:05', 1),
(15, 2, 1, 'BOS-004', NULL, 'Bosch ABS Wheel Speed Sensor', 'bosch-abs-wheel-speed-sensor', 'Wheel speed sensor for anti-lock braking system', '22.00', '52.99', 'percentage', '0.00', '0.00', 12, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:37:20', 1),
(16, 2, 5, 'BRM-003', NULL, 'Brembo Brake Caliper', 'brembo-brake-caliper', 'High-performance aluminum brake caliper', '85.00', '199.99', 'percentage', '0.00', '0.00', 6, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:37:40', 1),
(17, 2, 8, 'ACD-003', NULL, 'ACDelco Shock Absorber', 'acdelco-shock-absorber', 'Gas-charged shock absorber for smooth ride comfort', '32.00', '74.99', 'percentage', '0.00', '0.00', 10, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:37:55', 1),
(18, 2, 1, 'BOS-005', NULL, 'Bosch Brake Master Cylinder', 'bosch-brake-master-cylinder', 'Aluminum brake master cylinder for reliable braking', '45.00', '104.99', 'percentage', '0.00', '0.00', 8, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:38:11', 1),
(19, 2, 5, 'BRM-004', NULL, 'Brembo Performance Brake Line Kit', 'brembo-performance-brake-line-kit', 'Stainless steel braided brake lines for improved pedal feel', '38.00', '89.99', 'percentage', '0.00', '0.00', 10, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:38:32', 1),
(20, 2, 8, 'ACD-004', NULL, 'ACDelco Control Arm Kit', 'acdelco-control-arm-kit', 'Front lower control arm with ball joint and bushings', '55.00', '129.99', 'percentage', '0.00', '0.00', 7, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:38:47', 1),
(21, 3, 1, 'BOS-006', NULL, 'Bosch Battery 12V 60Ah', 'bosch-battery-12v-60ah', 'Maintenance-free car battery with 12V 60Ah capacity', '65.00', '149.99', 'percentage', '0.00', '0.00', 10, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:39:03', 1),
(22, 3, 3, 'DEN-005', NULL, 'Denso AC Compressor', 'denso-ac-compressor', 'High-efficiency AC compressor for automotive HVAC systems', '140.00', '329.99', 'percentage', '0.00', '0.00', 4, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:39:48', 1),
(23, 3, 8, 'ACD-005', NULL, 'ACDelco Ignition Coil Pack', 'acdelco-ignition-coil-pack', 'Direct ignition coil pack for enhanced spark energy', '35.00', '84.99', 'percentage', '0.00', '0.00', 12, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:40:11', 1),
(24, 3, 1, 'BOS-007', NULL, 'Bosch Alternator 120A', 'bosch-alternator-120a', '120-amp alternator for SUVs and light trucks', '110.00', '259.99', 'percentage', '0.00', '0.00', 5, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:40:23', 1),
(25, 3, 2, 'NGK-003', NULL, 'NGK Glow Plug Set', 'ngk-glow-plug-set', 'Ceramic glow plug set for diesel engines', '24.00', '56.99', 'percentage', '0.00', '0.00', 10, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:40:41', 1),
(26, 3, 3, 'DEN-006', NULL, 'Denso Wiper Blade Set', 'denso-wiper-blade-set', 'Hybrid wiper blade set for all-season visibility', '10.00', '24.99', 'percentage', '0.00', '0.00', 30, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:40:58', 1),
(27, 4, 1, 'BOS-008', NULL, 'Bosch Catalytic Converter', 'bosch-catalytic-converter', 'Universal catalytic converter for emission control', '120.00', '289.99', 'percentage', '0.00', '0.00', 4, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:41:11', 1),
(28, 4, 8, 'ACD-006', NULL, 'ACDelco Radiator', 'acdelco-radiator', 'Aluminum core radiator for efficient engine cooling', '75.00', '179.99', 'percentage', '0.00', '0.00', 6, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:41:25', 1),
(29, 4, 3, 'DEN-007', NULL, 'Denso Engine Cooling Fan', 'denso-engine-cooling-fan', 'Electric engine cooling fan with shroud assembly', '50.00', '119.99', 'percentage', '0.00', '0.00', 8, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:41:37', 1),
(30, 4, 1, 'BOS-009', NULL, 'Bosch Exhaust Gas Recirculation Valve', 'bosch-exhaust-gas-recirculation-valve', 'EGR valve for reducing NOx emissions', '45.00', '109.99', 'percentage', '0.00', '0.00', 6, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:41:50', 1),
(31, 4, 8, 'ACD-007', NULL, 'ACDelco Water Pump', 'acdelco-water-pump', 'Mechanical water pump for engine coolant circulation', '35.00', '84.99', 'percentage', '0.00', '0.00', 8, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:44:40', 1),
(32, 4, 1, 'BOS-010', NULL, 'Bosch Oxygen Sensor', 'bosch-oxygen-sensor', 'Planar oxygen sensor for precise exhaust gas monitoring', '30.00', '72.99', 'percentage', '0.00', '0.00', 10, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:45:36', 1),
(33, 5, 3, 'DEN-008', NULL, 'Denso Cabin Air Filter', 'denso-cabin-air-filter', 'HEPA cabin air filter with activated carbon layer', '7.00', '18.99', 'percentage', '0.00', '0.00', 30, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:47:11', 1),
(34, 5, 8, 'ACD-008', NULL, 'ACDelco Side Mirror Glass', 'acdelco-side-mirror-glass', 'Replacement side mirror glass with anti-glare coating', '15.00', '36.99', 'percentage', '0.00', '0.00', 15, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:47:56', 1),
(35, 5, 1, 'BOS-011', NULL, 'Bosch Horn Set', 'bosch-horn-set', 'Dual-tone electric horn set for vehicles', '12.00', '29.99', 'percentage', '0.00', '0.00', 20, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:48:54', 1),
(36, 5, 2, 'NGK-004', NULL, 'NGK Ignition Coil Wire', 'ngk-ignition-coil-wire', 'Silicone ignition wire with high-temperature insulation', '9.00', '22.99', 'percentage', '0.00', '0.00', 25, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:50:11', 1),
(37, 6, 6, 'MIC-001', NULL, 'Michelin Pilot Sport 4S 225/45R17', 'michelin-pilot-sport-4s-225-45r17', 'Ultra-high performance summer tire', '120.00', '279.99', 'percentage', '0.00', '0.00', 8, NULL, 1, '2026-06-02 20:28:45', '2026-06-05 04:53:46', 1),
(38, 6, 6, 'MIC-002', NULL, 'Michelin Defender 205/55R16', 'michelin-defender-205-55r16', 'All-season touring tire with long tread life', '85.00', '199.99', 'percentage', '0.00', '0.00', 10, NULL, 1, '2026-06-02 20:28:45', '2026-06-08 18:41:41', 1),
(39, 6, 6, 'MIC-003', NULL, 'Michelin Latitude Tour 235/65R17', 'michelin-latitude-tour-235-65r17', 'Highway all-season tire for SUVs and crossovers', '105.00', '249.99', 'percentage', '0.00', '0.00', 6, NULL, 1, '2026-06-02 20:28:45', '2026-06-08 18:43:19', 1),
(40, 6, 6, 'MIC-004', NULL, 'Michelin X-Ice 195/65R15', 'michelin-x-ice-195-65r15', 'Studless winter tire for superior snow traction', '95.00', '229.99', 'percentage', '0.00', '0.00', 8, NULL, 1, '2026-06-02 20:28:45', '2026-06-08 18:44:16', 1),
(41, 6, 6, 'MIC-005', NULL, 'Michelin Agilis 215/70R15', 'michelin-agilis-215-70r15', 'Light truck tire for commercial vans and delivery vehicles', '95.00', '219.99', 'percentage', '0.00', '0.00', 8, NULL, 1, '2026-06-02 20:28:45', '2026-06-08 18:45:15', 1),
(42, 7, 7, 'MOB-001', NULL, 'Mobil 1 Synthetic 0W-20 5L', 'mobil-1-synthetic-0w20-5l', 'Advanced full synthetic engine oil 0W-20 (5 liters)', '22.00', '54.99', 'percentage', '0.00', '0.00', 25, NULL, 1, '2026-06-02 20:28:45', '2026-06-08 18:46:29', 1),
(43, 7, 7, 'MOB-002', NULL, 'Mobil 1 Synthetic 5W-30 5L', 'mobil-1-synthetic-5w30-5l', 'Advanced full synthetic engine oil 5W-30 (5 liters)', '22.00', '54.99', 'percentage', '0.00', '0.00', 25, NULL, 1, '2026-06-02 20:28:45', '2026-06-08 18:48:23', 1),
(44, 7, 7, 'MOB-003', NULL, 'Mobil 1 Synthetic 10W-40 5L', 'mobil-1-synthetic-10w40-5l', 'Advanced full synthetic engine oil 10W-40 (5 liters)', '22.00', '54.99', 'percentage', '0.00', '0.00', 20, NULL, 1, '2026-06-02 20:28:45', '2026-06-08 18:49:08', 1),
(45, 7, 4, 'CAS-002', NULL, 'Castrol GTX 15W-40 5L', 'castrol-gtx-15w40-5l', 'Conventional engine oil 15W-40 for older engines (5 liters)', '15.00', '36.99', 'percentage', '0.00', '0.00', 20, NULL, 1, '2026-06-02 20:28:45', '2026-06-08 18:50:02', 1),
(46, 7, 4, 'CAS-003', NULL, 'Castrol Transmax ATF Dexron VI', 'castrol-transmax-atf-dexron-vi', 'Synthetic automatic transmission fluid (1 liter)', '8.00', '19.99', 'percentage', '0.00', '0.00', 20, NULL, 1, '2026-06-02 20:28:45', '2026-06-12 02:18:45', 1),
(47, 7, 4, 'CAS-004', NULL, 'Castrol Brake Fluid DOT 4', 'castrol-brake-fluid-dot-4', 'High-performance brake fluid DOT 4 (500ml)', '5.00', '12.99', 'percentage', '0.00', '0.00', 30, NULL, 1, '2026-06-02 20:28:45', '2026-06-12 03:32:09', 1),
(48, 7, 4, 'CAS-005', NULL, 'Castrol Antifreeze Coolant Concentrate', 'castrol-antifreeze-coolant-concentrate', 'Universal ethylene glycol coolant concentrate (1 liter)', '7.00', '16.99', 'percentage', '0.00', '0.00', 25, NULL, 1, '2026-06-02 20:28:45', '2026-06-12 03:32:57', 1),
(49, 7, 7, 'MOB-004', NULL, 'Mobil 1 Synthetic Gear Oil 75W-90', 'mobil-1-synthetic-gear-oil-75w90', 'Synthetic gear and differential oil (1 liter)', '10.00', '24.99', 'percentage', '0.00', '0.00', 15, NULL, 1, '2026-06-02 20:28:45', '2026-06-12 03:33:56', 1),
(50, 8, 1, 'BOS-012', NULL, 'Bosch Automotive Multimeter', 'bosch-automotive-multimeter', 'Professional digital multimeter for automotive diagnostics', '35.00', '84.99', 'percentage', '0.00', '0.00', 10, NULL, 1, '2026-06-02 20:28:45', '2026-06-12 04:37:04', 0),
(51, 8, 1, 'BOS-013', NULL, 'Bosch Diagnostic Scan Tool', 'bosch-diagnostic-scan-tool', 'OBD2 code reader with live data stream', '60.00', '149.99', 'percentage', '0.00', '0.00', 5, NULL, 1, '2026-06-02 20:28:45', '2026-06-12 04:38:25', 0),
(52, 8, 2, 'NGK-005', NULL, 'NGK Spark Plug Gap Tool', 'ngk-spark-plug-gap-tool', 'Precision spark plug gap measuring and adjustment tool', '3.00', '7.99', 'percentage', '0.00', '0.00', 50, NULL, 1, '2026-06-02 20:28:45', '2026-06-12 04:39:23', 0),
(53, 8, 8, 'ACD-009', NULL, 'ACDelco Fuel Pressure Tester', 'acdelco-fuel-pressure-tester', 'Fuel pressure testing kit for gasoline engines', '40.00', '94.99', 'percentage', '0.00', '0.00', 6, NULL, 1, '2026-06-02 20:28:45', '2026-06-12 04:40:24', 0),
(54, 8, 1, 'BOS-014', NULL, 'Bosch Mechanic Tool Set 42-Piece', 'bosch-mechanic-tool-set-42-piece', 'Complete socket and wrench set for automotive repairs', '55.00', '129.99', 'percentage', '0.00', '0.00', 8, NULL, 1, '2026-06-02 20:28:45', '2026-06-12 04:41:05', 0),
(55, 8, 3, 'DEN-009', NULL, 'Denso AC Service Kit', 'denso-ac-service-kit', 'AC recharge kit with pressure gauge and hose', '30.00', '69.99', 'percentage', '0.00', '0.00', 8, NULL, 1, '2026-06-02 20:28:45', '2026-06-12 04:41:55', 1),
(57, 5, 6, 'MIC-006', NULL, 'Michelin Tire Inflator', 'michelin-tire-inflator', '12V digital tire inflator with auto shut-off', '18.00', '42.99', 'percentage', '0.01', '0.00', 15, NULL, 1, '2026-06-02 20:29:27', '2026-06-12 04:50:52', 0),
(58, 7, 7, 'MOB-005', NULL, 'Mobil 1 Oil Filter M1-102', 'mobil-1-oil-filter-m1-102', 'Premium oil filter compatible with synthetic motor oil', '6.00', '14.99', 'percentage', '0.00', '0.00', 30, NULL, 1, '2026-06-02 20:29:27', '2026-06-03 17:49:19', 1),
(59, 1, 2, 'NGK-006', NULL, 'NGK Oxygen Sensor NTK', 'ngk-oxygen-sensor-ntk', 'NTK wideband oxygen sensor for air-fuel ratio control', '32.00', '76.99', 'percentage', '0.00', '0.00', 8, NULL, 1, '2026-06-02 20:29:27', '2026-06-05 03:26:33', 1),
(60, 1, 3, 'SKU-IFKEN78', NULL, 'Piston & Spark Plug', 'piston-spark-plug-J5w9F', 'The spark plug and piston are the two most critical moving components in an internal combustion engine, working together to convert fuel into mechanical motion', '55.00', '55.00', 'percentage', '0.01', '0.01', 50, '153.00', 1, '2026-06-15 03:43:40', '2026-06-15 03:43:40', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 57, 'products/05aEmYkwoLdPMCrV7Y23zAHK5tcbDeZft81ld8By.jpg', 0, '2026-06-03 03:52:27', '2026-06-03 03:52:27'),
(2, 58, 'products/1lqM5ldupQIBPFyK1bE6qOgREB8xfpNFbNSGA1jO.jpg', 1, '2026-06-03 04:18:59', '2026-06-03 04:18:59'),
(3, 58, 'products/F0VkilvwIlWrBMZdRet2fac9RE7zjYAdrFqblT2Z.jpg', 2, '2026-06-03 04:18:59', '2026-06-03 04:18:59'),
(6, 59, 'products/9yHbwVgemKmB8czjuLinu2Zj6PMnHVYeKKcY4szL.jpg', 1, '2026-06-03 04:31:05', '2026-06-03 04:31:05'),
(7, 9, 'products/d8z0be9e3CLdIgoeH5l3lgs2vD5lhUqTDLkRnENx.jpg', 1, '2026-06-03 04:31:51', '2026-06-03 04:31:51'),
(8, 10, 'products/UtDhtnfrw4vebNOhDdZNffkSVK4qBRC3qn2aAD7G.jpg', 1, '2026-06-03 04:34:11', '2026-06-03 04:34:11'),
(9, 11, 'products/Y6XZqxpUxaLaiSjG2zcnMGVVryXIbDTFZ7cVj0o9.jpg', 1, '2026-06-03 04:40:40', '2026-06-03 04:40:40'),
(10, 12, 'products/rTlvQZYGcX5KS4qjfwuza4OgAEG8dhbDeRsRAPec.jpg', 1, '2026-06-03 04:56:18', '2026-06-03 04:56:18'),
(11, 13, 'products/F8bfH9XlTbNMg3TM38Z5P44odbSTOI7bBcId2zzK.jpg', 1, '2026-06-03 04:56:56', '2026-06-03 04:56:56'),
(12, 14, 'products/XVMhy0UcNp5ZSM5bW8uJnsP8Ooey3ccldnCO2ICq.jpg', 1, '2026-06-03 04:57:32', '2026-06-03 04:57:32'),
(13, 15, 'products/Fl328YEKmB3eVkzi6eeIxuBiVCxs479ffEGt5NBE.jpg', 1, '2026-06-03 04:58:16', '2026-06-03 04:58:16'),
(14, 16, 'products/6wHiPyvoTro08Rbapo92FC3FtD7GXVLsPQii8RpY.webp', 1, '2026-06-03 04:58:52', '2026-06-03 04:58:52'),
(15, 17, 'products/ysZ5xCbTbsbX6rflWpBXMJ7NdrbMHWUzCeepWnRc.jpg', 1, '2026-06-03 05:00:59', '2026-06-03 05:00:59'),
(16, 18, 'products/D0kJtvk58V3foNYX2ZtjeX2yMRTMN09pLSRQAgnc.jpg', 1, '2026-06-03 05:02:14', '2026-06-03 05:02:14'),
(17, 19, 'products/pg47QvLBC6IE0gJhIzPKpSQSZGyrFdZJ8SyMehrX.jpg', 1, '2026-06-03 05:02:49', '2026-06-03 05:02:49'),
(18, 20, 'products/B6l4eQtUyfkhtaqYCMZKQM8u8UXk3T4ywmyR6hnd.jpg', 1, '2026-06-03 05:03:27', '2026-06-03 05:03:27'),
(19, 21, 'products/a9t3Y0qQbve74nPoA5JNTq0SgQQ7Mrgw5oDfjiP7.jpg', 1, '2026-06-03 05:05:48', '2026-06-03 05:05:48'),
(20, 22, 'products/MdF7O6RZoylPJVQA1B4kJj3P5mB8s1Eo014bYOQw.webp', 1, '2026-06-03 16:14:50', '2026-06-03 16:14:50'),
(21, 23, 'products/vPntn5gwBNgVH6FuBPr39xELaG7yWLwNRni3Z723.jpg', 1, '2026-06-03 16:15:34', '2026-06-03 16:15:34'),
(22, 24, 'products/oLrr3Joo9Xps5mOSHCwBM6X2om7Y8wcVeAgBWK39.jpg', 1, '2026-06-03 16:16:11', '2026-06-03 16:16:11'),
(23, 25, 'products/it1QJX1En3LlKfD9q9szwBV6EYNGTJjmjKP7FLrF.jpg', 1, '2026-06-03 16:18:20', '2026-06-03 16:18:20'),
(24, 26, 'products/j6Y8rkz9mSvljZT15PvXotNC1Zzg7q4LO8zcSJTa.webp', 1, '2026-06-03 16:19:13', '2026-06-03 16:19:13'),
(25, 27, 'products/GTmZZlOlHAJfJq2iPT4Yet60EywFo3GMNEd1gzSm.jpg', 1, '2026-06-03 16:19:54', '2026-06-03 16:19:54'),
(26, 28, 'products/nBGtsD0luwyiRxjTez23B1tBzRRSTdBz8yXWHaDP.webp', 1, '2026-06-03 16:24:53', '2026-06-03 16:24:53'),
(27, 29, 'products/iHXEZvq7vs7twosm7J3aS58UxPjyEU0Ff2bz7Hv3.jpg', 1, '2026-06-03 16:36:22', '2026-06-03 16:36:22'),
(28, 30, 'products/HdrWWkTHhXVkDT2fYYpP9MVwkUvimQKWRWlbbNht.jpg', 1, '2026-06-03 16:37:49', '2026-06-03 16:37:49'),
(29, 31, 'products/QBX9UYDTGiRLyy6KXvmwmBLEmZYtWsceUgfsXzZZ.jpg', 1, '2026-06-05 04:44:40', '2026-06-05 04:44:40'),
(30, 32, 'products/7ppIovn0IxWuGt0SCePLSdx9ZvagKSnyCcrE4BX4.jpg', 1, '2026-06-05 04:45:36', '2026-06-05 04:45:36'),
(31, 33, 'products/RgR6CrMMnkHBvto9ra4VdMEyUn29se9uqzInuzEy.jpg', 1, '2026-06-05 04:47:11', '2026-06-05 04:47:11'),
(32, 34, 'products/m3C5RCh0TUYm2Fd7JxZthknT6SUuLnw0yJ1EQvzW.jpg', 1, '2026-06-05 04:47:56', '2026-06-05 04:47:56'),
(33, 35, 'products/m7TAoguYdh9ZUIVBxsPYzL87MI0KEJgYLZfDatLx.png', 1, '2026-06-05 04:48:54', '2026-06-05 04:48:54'),
(34, 36, 'products/zenhBfVHxqt4Bt2KH9buaYJdv8wndTvHSOWXaYMW.jpg', 1, '2026-06-05 04:50:11', '2026-06-05 04:50:11'),
(35, 37, 'products/o32RbeULC0CKxeRpSczXGRhDgHmTLY0kb2xwobXU.webp', 1, '2026-06-05 04:53:46', '2026-06-05 04:53:46'),
(36, 38, 'products/awkV0F8fXfhwXIdI8YuJnELLbHNX4lRln2jnZETW.jpg', 1, '2026-06-08 18:41:41', '2026-06-08 18:41:41'),
(37, 39, 'products/b5PxALADyJFliVlvaSYc8UjJqFqI9RXRsYZC7fkR.webp', 1, '2026-06-08 18:43:19', '2026-06-08 18:43:19'),
(38, 40, 'products/0tAP9Ej38R2BE1AaAsmsmNZ8hriVmwVhDew6xo36.jpg', 1, '2026-06-08 18:44:16', '2026-06-08 18:44:16'),
(39, 41, 'products/ZEqaxR5dxfk5sUVvhke5g5rsBOUrhKyx1YEIMYy0.jpg', 1, '2026-06-08 18:45:15', '2026-06-08 18:45:15'),
(40, 42, 'products/wr2KlIoDmr1VXattTxIdQEGiY1funqIEtFg4MLOx.webp', 1, '2026-06-08 18:46:29', '2026-06-08 18:46:29'),
(41, 43, 'products/jdsQbtofYSrL53lfo7uf3EAi2tkx3GoMBo7b0dIH.jpg', 1, '2026-06-08 18:48:23', '2026-06-08 18:48:23'),
(42, 44, 'products/15eke6cmhgLV67u447mMxQJ1j3XtnFZKiXylEWwJ.jpg', 1, '2026-06-08 18:49:08', '2026-06-08 18:49:08'),
(43, 45, 'products/Vj8luPGSiJx4fSxKybC1NPGbZWL4VZak61sYlDhD.jpg', 1, '2026-06-08 18:50:02', '2026-06-08 18:50:02'),
(44, 46, 'products/VzxF2royr2A1uyiCo2HtE1cwpmvGKzGCEo9v7cJf.jpg', 1, '2026-06-12 02:18:45', '2026-06-12 02:18:45'),
(45, 47, 'products/NukoU9kz51WGgR3Pa3LL09E4oX0VF0FbV8HO17iT.webp', 1, '2026-06-12 03:32:09', '2026-06-12 03:32:09'),
(46, 48, 'products/b3WPxE7qdPeYD450M81XUMUvrr7qXHJtRkvbs6mP.jpg', 1, '2026-06-12 03:32:57', '2026-06-12 03:32:57'),
(47, 49, 'products/EEt8c2VB2kjvhN0Mkf625Sq1vUSZI2rAUC9jC5Xr.jpg', 1, '2026-06-12 03:33:56', '2026-06-12 03:33:56'),
(48, 50, 'products/VeaypAua0tuHUkeqYGRlQRRtUwUj9rLbXRAnExnX.jpg', 1, '2026-06-12 04:37:04', '2026-06-12 04:37:04'),
(49, 51, 'products/hR09YJ1y0OY8EpsXU8lQU0eN4HHbxfy8xvJ0wpb5.jpg', 1, '2026-06-12 04:38:25', '2026-06-12 04:38:25'),
(50, 52, 'products/ijTDV0u0tm76BdGPxWMYtQ7P5StPoRBGyNwJI9b1.jpg', 1, '2026-06-12 04:39:23', '2026-06-12 04:39:23'),
(51, 53, 'products/VxgyEbOLUAE1Z39FlZG6SkhoW9qc46jOaXfbfgjn.jpg', 1, '2026-06-12 04:40:24', '2026-06-12 04:40:24'),
(52, 54, 'products/OF1PX7VxZg8xG4Dipc8OvUxqlX4hu3cVKAPniaCv.jpg', 1, '2026-06-12 04:41:05', '2026-06-12 04:41:05'),
(53, 55, 'products/QN9H6LhPHYVUwsY6ioNv4kaAl0JqJDuEKnRhaQAf.jpg', 1, '2026-06-12 04:41:55', '2026-06-12 04:41:55'),
(54, 1, 'products/cNi8tExkngL4S2eqisFKtNZGShpotO7OpBMQ7RWc.jpg', 1, '2026-06-12 04:43:10', '2026-06-12 04:43:10'),
(55, 2, 'products/eg0rYlPUtmqREJLx05O1UoezNGBXgZQvsJaVdQW9.jpg', 1, '2026-06-12 04:43:56', '2026-06-12 04:43:56'),
(56, 3, 'products/EMoGfdsJKnzLRCQ1yOexdE25kQNAHFVWVvKkvcXS.jpg', 1, '2026-06-12 04:44:48', '2026-06-12 04:44:48'),
(57, 4, 'products/iB05kbDQY1B6r2yorqb0iWLKvalFnuuf5EoVFpJo.jpg', 1, '2026-06-12 04:45:40', '2026-06-12 04:45:40'),
(58, 5, 'products/y6T8oqKxrs0rfaFzcNPPObW9zWIXTh0vS7IhWACA.jpg', 1, '2026-06-12 04:46:36', '2026-06-12 04:46:36'),
(59, 6, 'products/SuzKDkGoT3oq9A1x6qACW0hM4k7LJEk2zxMv1YLS.jpg', 1, '2026-06-12 04:47:41', '2026-06-12 04:47:41'),
(60, 7, 'products/NIO1t0tZiB8SBP3SE1OSEOTpBRUFrJu951y4NWa0.jpg', 1, '2026-06-12 04:48:39', '2026-06-12 04:48:39'),
(61, 8, 'products/KqRqbdQoW34OgzlbJcTo6h6Mn4d4SzxOWaVw3JjF.jpg', 1, '2026-06-12 04:49:23', '2026-06-12 04:49:23'),
(62, 60, 'products/kmxgrFUNUKyp3Ik4EBVfkpX4mEbhRe8LlHhMJXMy.webp', 0, '2026-06-15 03:43:40', '2026-06-15 03:43:40');

-- --------------------------------------------------------

--
-- Table structure for table `product_specifications`
--

CREATE TABLE `product_specifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `specification_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `specification_value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_vehicle_compatibilities`
--

CREATE TABLE `product_vehicle_compatibilities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `make_id` bigint(20) UNSIGNED NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL,
  `year_from` year(4) DEFAULT NULL,
  `year_to` year(4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_vehicle_compatibilities`
--

INSERT INTO `product_vehicle_compatibilities` (`id`, `product_id`, `make_id`, `model_id`, `year_from`, `year_to`, `created_at`, `updated_at`) VALUES
(2, 58, 2, 6, NULL, NULL, '2026-06-03 17:49:19', '2026-06-03 17:49:19'),
(3, 59, 4, 17, NULL, NULL, '2026-06-05 03:26:33', '2026-06-05 03:26:33'),
(4, 9, 4, 16, NULL, NULL, '2026-06-05 03:26:54', '2026-06-05 03:26:54'),
(5, 10, 10, 46, NULL, NULL, '2026-06-05 03:27:13', '2026-06-05 03:27:13'),
(6, 11, 10, 46, NULL, NULL, '2026-06-05 03:33:40', '2026-06-05 03:33:40'),
(7, 12, 10, 47, NULL, NULL, '2026-06-05 04:36:03', '2026-06-05 04:36:03'),
(8, 13, 2, 7, NULL, NULL, '2026-06-05 04:36:45', '2026-06-05 04:36:45'),
(9, 14, 3, 14, NULL, NULL, '2026-06-05 04:37:05', '2026-06-05 04:37:05'),
(10, 15, 2, 8, NULL, NULL, '2026-06-05 04:37:20', '2026-06-05 04:37:20'),
(11, 16, 2, 7, NULL, NULL, '2026-06-05 04:37:40', '2026-06-05 04:37:40'),
(12, 17, 9, 41, NULL, NULL, '2026-06-05 04:37:55', '2026-06-05 04:37:55'),
(13, 18, 9, 43, NULL, NULL, '2026-06-05 04:38:11', '2026-06-05 04:38:11'),
(14, 19, 5, 21, NULL, NULL, '2026-06-05 04:38:32', '2026-06-05 04:38:32'),
(15, 20, 8, 37, NULL, NULL, '2026-06-05 04:38:47', '2026-06-05 04:38:47'),
(16, 21, 1, 1, NULL, NULL, '2026-06-05 04:39:03', '2026-06-05 04:39:03'),
(17, 22, 1, 2, NULL, NULL, '2026-06-05 04:39:48', '2026-06-05 04:39:48'),
(18, 23, 1, 2, NULL, NULL, '2026-06-05 04:40:11', '2026-06-05 04:40:11'),
(19, 24, 7, 31, NULL, NULL, '2026-06-05 04:40:23', '2026-06-05 04:40:23'),
(20, 25, 6, 27, NULL, NULL, '2026-06-05 04:40:41', '2026-06-05 04:40:41'),
(21, 26, 4, 17, NULL, NULL, '2026-06-05 04:40:58', '2026-06-05 04:40:58'),
(22, 27, 10, 47, NULL, NULL, '2026-06-05 04:41:11', '2026-06-05 04:41:11'),
(23, 28, 3, 12, NULL, NULL, '2026-06-05 04:41:25', '2026-06-05 04:41:25'),
(24, 29, 2, 7, NULL, NULL, '2026-06-05 04:41:37', '2026-06-05 04:41:37'),
(25, 30, 9, 42, NULL, NULL, '2026-06-05 04:41:50', '2026-06-05 04:41:50'),
(26, 31, 2, 7, NULL, NULL, '2026-06-05 04:44:40', '2026-06-05 04:44:40'),
(27, 32, 9, 42, NULL, NULL, '2026-06-05 04:45:36', '2026-06-05 04:45:36'),
(28, 33, 8, 37, NULL, NULL, '2026-06-05 04:47:11', '2026-06-05 04:47:11'),
(29, 34, 8, 37, NULL, NULL, '2026-06-05 04:47:56', '2026-06-05 04:47:56'),
(30, 35, 1, 2, NULL, NULL, '2026-06-05 04:48:54', '2026-06-05 04:48:54'),
(31, 36, 6, 28, NULL, NULL, '2026-06-05 04:50:11', '2026-06-05 04:50:11'),
(32, 37, 4, 18, NULL, NULL, '2026-06-05 04:53:46', '2026-06-05 04:53:46'),
(33, 38, 3, 14, NULL, NULL, '2026-06-08 18:41:41', '2026-06-08 18:41:41'),
(34, 39, 5, 23, NULL, NULL, '2026-06-08 18:43:19', '2026-06-08 18:43:19'),
(35, 40, 8, 38, NULL, NULL, '2026-06-08 18:44:16', '2026-06-08 18:44:16'),
(36, 41, 7, 32, NULL, NULL, '2026-06-08 18:45:15', '2026-06-08 18:45:15'),
(37, 42, 1, 1, NULL, NULL, '2026-06-08 18:46:29', '2026-06-08 18:46:29'),
(38, 43, 2, 8, NULL, NULL, '2026-06-08 18:48:23', '2026-06-08 18:48:23'),
(39, 44, 9, 42, NULL, NULL, '2026-06-08 18:49:08', '2026-06-08 18:49:08'),
(40, 45, 5, 22, NULL, NULL, '2026-06-08 18:50:02', '2026-06-08 18:50:02'),
(41, 46, 7, 34, NULL, NULL, '2026-06-12 02:18:45', '2026-06-12 02:18:45'),
(42, 47, 1, 4, NULL, NULL, '2026-06-12 03:32:09', '2026-06-12 03:32:09'),
(43, 48, 8, 36, NULL, NULL, '2026-06-12 03:32:57', '2026-06-12 03:32:57'),
(44, 49, 5, 21, NULL, NULL, '2026-06-12 03:33:56', '2026-06-12 03:33:56'),
(45, 55, 2, 6, NULL, NULL, '2026-06-12 04:41:55', '2026-06-12 04:41:55'),
(46, 1, 9, 41, NULL, NULL, '2026-06-12 04:43:10', '2026-06-12 04:43:10'),
(47, 2, 1, 2, NULL, NULL, '2026-06-12 04:43:56', '2026-06-12 04:43:56'),
(48, 3, 8, 36, NULL, NULL, '2026-06-12 04:44:48', '2026-06-12 04:44:48'),
(49, 4, 2, 6, NULL, NULL, '2026-06-12 04:45:40', '2026-06-12 04:45:40'),
(50, 5, 6, 26, NULL, NULL, '2026-06-12 04:46:36', '2026-06-12 04:46:36'),
(51, 5, 4, 16, NULL, NULL, '2026-06-12 04:46:36', '2026-06-12 04:46:36'),
(52, 6, 3, 11, NULL, NULL, '2026-06-12 04:47:41', '2026-06-12 04:47:41'),
(53, 7, 8, 37, NULL, NULL, '2026-06-12 04:48:39', '2026-06-12 04:48:39'),
(54, 8, 1, 2, NULL, NULL, '2026-06-12 04:49:23', '2026-06-12 04:49:23'),
(55, 60, 2, 6, 2000, 2026, '2026-06-15 03:43:40', '2026-06-15 03:43:40'),
(56, 60, 9, 41, 2000, 2026, '2026-06-15 03:43:40', '2026-06-15 03:43:40'),
(57, 60, 1, 1, 2000, 2004, '2026-06-15 03:43:40', '2026-06-15 03:43:40');

-- --------------------------------------------------------

--
-- Table structure for table `repair_orders`
--

CREATE TABLE `repair_orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `job_card_id` bigint(20) UNSIGNED NOT NULL,
  `labor_cost` decimal(12,2) NOT NULL DEFAULT '0.00',
  `parts_cost` decimal(12,2) NOT NULL DEFAULT '0.00',
  `total_cost` decimal(12,2) NOT NULL DEFAULT '0.00',
  `notes` text COLLATE utf8mb4_unicode_ci,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `repair_orders`
--

INSERT INTO `repair_orders` (`id`, `job_card_id`, `labor_cost`, `parts_cost`, `total_cost`, `notes`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, '0.00', '37.98', '37.98', 'Auto-generated', 'completed', '2026-06-22 17:16:31', '2026-06-22 17:40:31'),
(2, 2, '0.00', '199.99', '199.99', 'Replace brake Caliper', 'in_progress', '2026-06-22 17:56:42', '2026-06-22 17:57:19'),
(3, 3, '0.00', '27.98', '27.98', NULL, 'in_progress', '2026-06-26 15:56:51', '2026-06-26 15:57:03');

-- --------------------------------------------------------

--
-- Table structure for table `repair_order_parts`
--

CREATE TABLE `repair_order_parts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `repair_order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `unit_price` decimal(12,2) NOT NULL DEFAULT '0.00',
  `total` decimal(12,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `repair_order_parts`
--

INSERT INTO `repair_order_parts` (`id`, `repair_order_id`, `product_id`, `quantity`, `unit_price`, `total`, `created_at`, `updated_at`) VALUES
(1, 1, 49, 1, '24.99', '24.99', '2026-06-22 17:40:12', '2026-06-22 17:40:12'),
(2, 1, 1, 1, '12.99', '12.99', '2026-06-22 17:40:31', '2026-06-22 17:40:31'),
(3, 2, 16, 1, '199.99', '199.99', '2026-06-22 17:56:42', '2026-06-22 17:56:42'),
(4, 3, 58, 1, '14.99', '14.99', '2026-06-26 15:56:51', '2026-06-26 15:56:51'),
(5, 3, 1, 1, '12.99', '12.99', '2026-06-26 15:57:03', '2026-06-26 15:57:03');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `rating` int(11) NOT NULL,
  `review` text COLLATE utf8mb4_unicode_ci,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `customer_id`, `product_id`, `rating`, `review`, `status`, `created_at`, `updated_at`) VALUES
(1, 22, 12, 5, 'Excellent product! Highly recommend.', 1, '2026-06-15 14:36:42', '2026-06-15 14:36:42'),
(2, 6, 37, 4, 'Very good quality, fast shipping.', 1, '2026-06-15 14:36:42', '2026-06-15 14:36:42'),
(3, 1, 11, 3, 'Decent product for the price.', 1, '2026-06-15 14:36:42', '2026-06-15 14:36:42'),
(4, 21, 51, 2, 'Not as described, but acceptable.', 1, '2026-06-15 14:36:42', '2026-06-15 14:36:42'),
(5, 20, 57, 1, 'Very disappointed with the quality.', 0, '2026-06-15 14:36:42', '2026-06-15 14:36:42'),
(6, 4, 30, 5, 'Perfect! Exceeded my expectations.', 1, '2026-06-15 14:36:42', '2026-06-15 14:36:42'),
(7, 10, 41, 4, 'Great product, would buy again.', 1, '2026-06-15 14:36:42', '2026-06-15 14:36:42'),
(8, 3, 57, 3, NULL, 1, '2026-06-15 14:36:42', '2026-06-15 14:36:42'),
(9, 13, 57, 4, 'Good value for money.', 1, '2026-06-15 14:36:42', '2026-06-15 14:36:42'),
(10, 8, 46, 5, 'Amazing quality and fast delivery!', 1, '2026-06-15 14:36:42', '2026-06-15 14:36:42'),
(11, 27, 51, 5, 'Greate Product', 1, '2026-06-25 04:18:49', '2026-06-25 04:19:24'),
(12, 30, 28, 5, 'Great product', 1, '2026-06-26 15:48:38', '2026-06-26 15:49:02');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `warehouse_id` bigint(20) UNSIGNED NOT NULL,
  `subtotal` decimal(12,2) NOT NULL DEFAULT '0.00',
  `discount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `tax` decimal(12,2) NOT NULL DEFAULT '0.00',
  `total` decimal(12,2) NOT NULL DEFAULT '0.00',
  `payment_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `sale_date` datetime DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sale_items`
--

CREATE TABLE `sale_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sale_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `unit_price` decimal(12,2) NOT NULL DEFAULT '0.00',
  `discount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `tax` decimal(12,2) NOT NULL DEFAULT '0.00',
  `total` decimal(12,2) NOT NULL DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sale_returns`
--

CREATE TABLE `sale_returns` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sale_id` bigint(20) UNSIGNED NOT NULL,
  `return_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refund_amount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `reason` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `service_packages`
--

CREATE TABLE `service_packages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(12,2) NOT NULL DEFAULT '0.00',
  `duration` int(11) DEFAULT NULL COMMENT 'Duration in minutes',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `service_packages`
--

INSERT INTO `service_packages` (`id`, `name`, `description`, `price`, `duration`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Basic Oil Change', 'Engine oil change with genuine oil filter replacement', '49.99', 30, 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(2, 'Standard Service', 'Oil change, filter replacement, and multi-point inspection', '89.99', 60, 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(3, 'Full Service', 'Comprehensive service including oil, filters, spark plugs, and fluid check', '199.99', 120, 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(4, 'Brake Service', 'Brake pad replacement, rotor inspection, and brake fluid check', '149.99', 90, 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(5, 'AC Service', 'Air conditioning recharge and system inspection', '79.99', 60, 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(6, 'Tire Rotation & Balance', 'Tire rotation, balancing, and pressure check', '39.99', 30, 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(7, 'Major Service', 'Complete vehicle overhaul including timing belt, water pump, and full inspection', '599.99', 360, 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(8, 'Brake Pad Replacement', 'Front or rear brake pad replacement', '90.00', 60, 1, '2026-06-16 17:38:18', '2026-06-16 17:38:40');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('g4Ofuv6xZVAF8saS3qq2cNKrx8znXdfDLkSjd1l3', 1, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJsdmtlWWtQT3BQTm93cEpPb0V4bW5NRTJzWnlEMUwxWG9XZ3o0aGtaIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwXC9hZG1pblwvcHJvZHVjdHNcL2V4cG9ydD90eXBlPWpzb24iLCJyb3V0ZSI6ImFkbWluLnByb2R1Y3RzLmV4cG9ydCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX0sImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjoxfQ==', 1782518583),
('M0VEVZG68pexPZIvYCiezfsxOPOrT5CPkHBJxU46', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiI1RFplNjc5cnlIbTVEM2QzRFdxYzh1cHI0QUxaMThJclF6c3Q3amFlIiwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782518594);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `group` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'general',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `group`, `created_at`, `updated_at`) VALUES
(1, 'site_name', 'AutoParts & Car Services', 'general', '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(2, 'site_logo', NULL, 'general', '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(3, 'support_email', 'support@autoparts.com', 'general', '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(4, 'support_phone', '+1-555-000-0000', 'general', '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(5, 'currency', 'USD', 'general', '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(6, 'tax_rate', '8.25', 'general', '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(7, 'shipping_fee', '10.00', 'general', '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(8, 'stripe_publishable_key', 'pk_test', 'payment', '2026-06-02 19:50:04', '2026-06-25 04:29:21'),
(9, 'stripe_secret_key', 'sk_test', 'payment', '2026-06-02 19:50:04', '2026-06-25 04:29:42'),
(10, 'paypal_client_id', 'test', 'payment', '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(11, 'paypal_client_secret', 'test', 'payment', '2026-06-02 19:50:04', '2026-06-02 19:50:04');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `role` enum('admin','customer','staff') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'customer',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_login_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `position`, `email_verified_at`, `role`, `status`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `remember_token`, `last_login_at`, `created_at`, `updated_at`) VALUES
(1, 'Cairocoders Ednalan', 'cairocoders@gmail.com', NULL, NULL, NULL, 'admin', 1, '$2y$12$WgxNq6xW3DCAlUtUcm/joOwm1OVXZn2BeuiUg7aag19jCrC8ROveC', NULL, NULL, NULL, NULL, NULL, '2026-06-02 03:22:52', '2026-06-02 03:22:52'),
(2, 'Alice Cooper', 'alice.cooper@email.com', NULL, NULL, NULL, 'customer', 1, '$2y$12$Zv5.erETLoYT/2d1o5AEdeX9qtUDdRSq5Oe5gmfdGfZrlHU5sDlnm', NULL, NULL, NULL, NULL, NULL, '2026-06-02 20:28:45', '2026-06-02 20:28:45'),
(3, 'Bob Martin', 'bob.martin@email.com', NULL, NULL, NULL, 'customer', 1, '$2y$12$4c9yCrs0rUUk5gKxD41Tl.LavI6UqyaVyZgkdoxWLUCF1yrZOo9ZG', NULL, NULL, NULL, NULL, NULL, '2026-06-02 20:28:45', '2026-06-02 20:28:45'),
(4, 'Carol White', 'carol.white@email.com', NULL, NULL, NULL, 'customer', 1, '$2y$12$.XFqRHbypMytJr.Bnkkm9OWqnqvn4O8V/OmaebDT7IeTSlTd2l6C2', NULL, NULL, NULL, NULL, NULL, '2026-06-02 20:28:46', '2026-06-02 20:28:46'),
(5, 'Dan Wilson', 'dan.wilson@email.com', NULL, NULL, NULL, 'customer', 1, '$2y$12$M0gOONZCSlt1yOchB9keW.7bQmllw6MFnO/rxb58XctR6DVuh6BJq', NULL, NULL, NULL, NULL, NULL, '2026-06-02 20:28:46', '2026-06-02 20:28:46'),
(6, 'Eve Taylor', 'eve.taylor@email.com', NULL, NULL, NULL, 'customer', 1, '$2y$12$F.1wzoeByOnaVdclUioUbe7PkSDmSQ7zam9NaH6XJedMAwxn9Bzn.', NULL, NULL, NULL, NULL, NULL, '2026-06-02 20:28:47', '2026-06-02 20:28:47'),
(7, 'Frank Harris', 'frank.harris@email.com', NULL, NULL, NULL, 'customer', 1, '$2y$12$VwJ0Or6oJwJQMnZ39eDXIOKgbp0f236UO4tN7TCpXOwbX281nDOEa', NULL, NULL, NULL, NULL, NULL, '2026-06-02 20:28:47', '2026-06-02 20:28:47'),
(8, 'Grace Lee', 'grace.lee@email.com', NULL, NULL, NULL, 'customer', 1, '$2y$12$wpbupLownTfifjBUjiUwYupd1Kox3Cj7xRkaIdvi6i1NKvq4RqSTy', NULL, NULL, NULL, NULL, NULL, '2026-06-02 20:28:47', '2026-06-02 20:28:47'),
(9, 'Henry Clark', 'henry.clark@email.com', NULL, NULL, NULL, 'customer', 1, '$2y$12$08.wNQzuLJXou0wLd5LJ0uiaSlE66CxGdcjvDTUjuFW427uUS4rG.', NULL, NULL, NULL, NULL, NULL, '2026-06-02 20:28:48', '2026-06-02 20:28:48'),
(10, 'Ivy Lewis', 'ivy.lewis@email.com', NULL, NULL, NULL, 'customer', 1, '$2y$12$eP5iXxTv74d8GjPiJ2jsQesOyMDTHRHgDwqjdgGFwnat.NA1CkNiu', NULL, NULL, NULL, NULL, NULL, '2026-06-02 20:28:48', '2026-06-02 20:28:48'),
(11, 'Jack Turner', 'jack.turner@email.com', NULL, NULL, NULL, 'customer', 1, '$2y$12$KVIpw9whLD5alRx98S.zDOZJ.SRPsSGjJStmdpEjms0vDP7qjm3m6', NULL, NULL, NULL, NULL, NULL, '2026-06-02 20:28:48', '2026-06-02 20:28:48'),
(12, 'Karen Walker', 'karen.walker@email.com', NULL, NULL, NULL, 'customer', 1, '$2y$12$ieadWX9VvNM381jFHCdfQOuS0YLwCXxC3McfEfy2x31XNzYjwCQGe', NULL, NULL, NULL, NULL, NULL, '2026-06-02 20:28:49', '2026-06-02 20:28:49'),
(13, 'Leo Adams', 'leo.adams@email.com', NULL, NULL, NULL, 'customer', 1, '$2y$12$Yf7UV2ppusiIVBAIH8Zi4u106EKz0q7fFXb2XNzTi/55aeu/2uOpa', NULL, NULL, NULL, NULL, NULL, '2026-06-02 20:28:49', '2026-06-02 20:28:49'),
(14, 'Mia Scott', 'mia.scott@email.com', NULL, NULL, NULL, 'customer', 1, '$2y$12$j7g4FAGa6PAsTI6Dcp7Tdeaiihgmbykg6qGLYeW97QpNVKl52dsGm', NULL, NULL, NULL, NULL, NULL, '2026-06-02 20:28:49', '2026-06-02 20:28:49'),
(15, 'Noah Young', 'noah.young@email.com', NULL, NULL, NULL, 'customer', 1, '$2y$12$tUbOrXLem/32/ZMBESdBo.sOyGTATd980o.KZ.ejzrE4sUZkctJZm', NULL, NULL, NULL, NULL, NULL, '2026-06-02 20:28:49', '2026-06-02 20:28:49'),
(16, 'Olivia King', 'olivia.king@email.com', NULL, NULL, NULL, 'customer', 1, '$2y$12$eXYnu.IUpwaNOHBstEbo1eUCu3m6zxiSevRHaeSwprqHiBkSMZnuK', NULL, NULL, NULL, NULL, NULL, '2026-06-02 20:28:50', '2026-06-02 20:28:50'),
(17, 'Paul Wright', 'paul.wright@email.com', NULL, NULL, NULL, 'customer', 1, '$2y$12$QIg8GYxJEJYOOAAj1xj.i.9skyk0WaKU4NxZC0FAk5HOggnxx/foG', NULL, NULL, NULL, NULL, NULL, '2026-06-02 20:28:50', '2026-06-02 20:28:50'),
(18, 'Quinn Baker', 'quinn.baker@email.com', NULL, NULL, NULL, 'customer', 1, '$2y$12$bAew9oNQWsGlU/kqnr3Qa.6Bw8U7LdYzWgoGVndbGZURPiUzUWUeq', NULL, NULL, NULL, NULL, NULL, '2026-06-02 20:28:50', '2026-06-02 20:28:50'),
(19, 'Rachel Green', 'rachel.green@email.com', NULL, NULL, NULL, 'customer', 1, '$2y$12$bNajfbirBSfs48jJfv9p9eB.qC51u0l2Nk0Eh4qCzYZpHjjxxSu8S', NULL, NULL, NULL, NULL, NULL, '2026-06-02 20:28:51', '2026-06-02 20:28:51'),
(20, 'Sam Nelson', 'sam.nelson@email.com', NULL, NULL, NULL, 'customer', 1, '$2y$12$C5/yLc4cGVc4G7mwxhFWs.YyoGcHEbTegkRx5jvG2/3SCZDQL3gAO', NULL, NULL, NULL, NULL, NULL, '2026-06-02 20:28:51', '2026-06-02 20:28:51'),
(22, 'Clydey Ednalan', 'clydey@test.com', '345345', 'Mechanic', NULL, 'staff', 1, '$2y$12$CW4AEPW4agu8R2E/0plQ7eAWV.ueL0gcgSSnniVEiSVTapf.Yxj6u', NULL, NULL, NULL, NULL, NULL, '2026-06-22 17:03:23', '2026-06-22 17:03:23'),
(23, 'Robert Thompson', 'RobertThompson@test.com', '345345345', 'Mechanic', NULL, 'staff', 1, '$2y$12$dqJ..RCYlC3WdMFHSpGtmek.oqPduCJUHtq86ycL4aitxs4HZ9MRi', NULL, NULL, NULL, NULL, NULL, '2026-06-23 05:07:04', '2026-06-23 05:07:04'),
(24, 'Catlin Ednalan', 'catlin@test.com', NULL, NULL, NULL, 'customer', 1, '$2y$12$FA3KWiddlh2PP/tKjPcEU.nXRGd1YhF2R90GDleeWJOE.6zrHseX2', NULL, NULL, NULL, NULL, NULL, '2026-06-24 05:10:38', '2026-06-24 05:10:38'),
(25, 'Tin Ednalan', 'tin@test.com', NULL, NULL, NULL, 'customer', 1, '$2y$12$kEz1F77wXfXBpNGeTQAFhO63QEjRxqS52n.V81Raa4IKl.QAAuWVS', NULL, NULL, NULL, NULL, NULL, '2026-06-26 05:14:35', '2026-06-26 05:14:35');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `make_id` bigint(20) UNSIGNED NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL,
  `year` year(4) DEFAULT NULL,
  `vin` varchar(17) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `registration_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `engine_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mileage` int(11) DEFAULT NULL,
  `fuel_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `customer_id`, `make_id`, `model_id`, `year`, `vin`, `registration_number`, `engine_type`, `mileage`, `fuel_type`, `color`, `status`, `created_at`, `updated_at`) VALUES
(1, 26, 1, 3, 2025, NULL, 'SFE434', NULL, NULL, NULL, NULL, 1, '2026-06-24 03:52:15', '2026-06-24 03:52:15'),
(2, 27, 2, 9, 2025, NULL, 'DER234', NULL, NULL, NULL, NULL, 1, '2026-06-26 04:45:37', '2026-06-26 04:45:37'),
(3, 29, 2, 9, 2025, NULL, 'DFE345', NULL, NULL, NULL, NULL, 1, '2026-06-26 04:57:53', '2026-06-26 04:57:53'),
(4, 31, 2, 9, 2025, NULL, 'DHK345', NULL, NULL, NULL, NULL, 1, '2026-06-26 15:59:43', '2026-06-26 15:59:43');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_inspections`
--

CREATE TABLE `vehicle_inspections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `job_card_id` bigint(20) UNSIGNED NOT NULL,
  `inspector_id` bigint(20) UNSIGNED NOT NULL,
  `inspection_date` datetime DEFAULT NULL,
  `report` text COLLATE utf8mb4_unicode_ci,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_makes`
--

CREATE TABLE `vehicle_makes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vehicle_makes`
--

INSERT INTO `vehicle_makes` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Toyota', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(2, 'Honda', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(3, 'Ford', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(4, 'BMW', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(5, 'Mercedes-Benz', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(6, 'Audi', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(7, 'Volkswagen', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(8, 'Nissan', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(9, 'Hyundai', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(10, 'Chevrolet', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_models`
--

CREATE TABLE `vehicle_models` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `make_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vehicle_models`
--

INSERT INTO `vehicle_models` (`id`, `make_id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Camry', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(2, 1, 'Corolla', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(3, 1, 'RAV4', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(4, 1, 'Hilux', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(5, 1, 'Land Cruiser', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(6, 2, 'Civic', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(7, 2, 'Accord', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(8, 2, 'CR-V', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(9, 2, 'City', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(10, 2, 'HR-V', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(11, 3, 'Mustang', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(12, 3, 'F-150', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(13, 3, 'Focus', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(14, 3, 'Explorer', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(15, 3, 'Ranger', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(16, 4, '3 Series', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(17, 4, '5 Series', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(18, 4, 'X3', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(19, 4, 'X5', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(20, 4, 'M4', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(21, 5, 'C-Class', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(22, 5, 'E-Class', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(23, 5, 'S-Class', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(24, 5, 'GLC', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(25, 5, 'GLE', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(26, 6, 'A3', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(27, 6, 'A4', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(28, 6, 'A6', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(29, 6, 'Q5', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(30, 6, 'Q7', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(31, 7, 'Golf', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(32, 7, 'Passat', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(33, 7, 'Tiguan', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(34, 7, 'Jetta', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(35, 7, 'Polo', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(36, 8, 'Altima', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(37, 8, 'Sentra', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(38, 8, 'Rogue', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(39, 8, 'Pathfinder', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(40, 8, 'Navara', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(41, 9, 'Elantra', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(42, 9, 'Sonata', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(43, 9, 'Tucson', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(44, 9, 'Santa Fe', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(45, 9, 'i30', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(46, 10, 'Silverado', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(47, 10, 'Camaro', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(48, 10, 'Malibu', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(49, 10, 'Equinox', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04'),
(50, 10, 'Tahoe', 1, '2026-06-02 19:50:04', '2026-06-02 19:50:04');

-- --------------------------------------------------------

--
-- Table structure for table `warehouses`
--

CREATE TABLE `warehouses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wishlists`
--

CREATE TABLE `wishlists` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wishlists`
--

INSERT INTO `wishlists` (`id`, `customer_id`, `product_id`, `created_at`, `updated_at`) VALUES
(2, 27, 1, '2026-06-25 03:47:56', '2026-06-25 03:47:56'),
(3, 27, 28, '2026-06-25 03:48:17', '2026-06-25 03:48:17'),
(4, 30, 53, '2026-06-26 05:15:17', '2026-06-26 05:15:17'),
(5, 30, 28, '2026-06-26 05:15:34', '2026-06-26 05:15:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `bookings_booking_number_unique` (`booking_number`),
  ADD KEY `bookings_customer_id_foreign` (`customer_id`),
  ADD KEY `bookings_vehicle_id_foreign` (`vehicle_id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `brands_slug_unique` (`slug`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_items_cart_id_foreign` (`cart_id`),
  ADD KEY `cart_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`),
  ADD KEY `categories_parent_id_foreign` (`parent_id`);

--
-- Indexes for table `coupons`
--
ALTER TABLE `coupons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `coupons_code_unique` (`code`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customers_customer_code_unique` (`customer_code`),
  ADD KEY `customers_user_id_foreign` (`user_id`);

--
-- Indexes for table `customer_wallet_transactions`
--
ALTER TABLE `customer_wallet_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customer_wallet_transactions_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `invoices_invoice_number_unique` (`invoice_number`),
  ADD KEY `invoices_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `invoice_items`
--
ALTER TABLE `invoice_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_items_invoice_id_foreign` (`invoice_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_cards`
--
ALTER TABLE `job_cards`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `job_cards_job_number_unique` (`job_number`),
  ADD KEY `job_cards_booking_id_foreign` (`booking_id`),
  ADD KEY `job_cards_vehicle_id_foreign` (`vehicle_id`),
  ADD KEY `job_cards_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `job_card_service_package`
--
ALTER TABLE `job_card_service_package`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `job_card_service_package_job_card_id_service_package_id_unique` (`job_card_id`,`service_package_id`),
  ADD KEY `job_card_service_package_service_package_id_foreign` (`service_package_id`);

--
-- Indexes for table `mechanic_assignments`
--
ALTER TABLE `mechanic_assignments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mechanic_assignments_job_card_id_foreign` (`job_card_id`),
  ADD KEY `mechanic_assignments_mechanic_id_foreign` (`mechanic_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_user_id_foreign` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_order_number_unique` (`order_number`),
  ADD KEY `orders_customer_id_foreign` (`customer_id`),
  ADD KEY `orders_coupon_id_foreign` (`coupon_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payments_customer_id_foreign` (`customer_id`),
  ADD KEY `payments_sale_id_foreign` (`sale_id`),
  ADD KEY `payments_invoice_id_foreign` (`invoice_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_sku_unique` (`sku`),
  ADD UNIQUE KEY `products_slug_unique` (`slug`),
  ADD KEY `products_category_id_foreign` (`category_id`),
  ADD KEY `products_brand_id_foreign` (`brand_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_images_product_id_foreign` (`product_id`);

--
-- Indexes for table `product_specifications`
--
ALTER TABLE `product_specifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_specifications_product_id_foreign` (`product_id`);

--
-- Indexes for table `product_vehicle_compatibilities`
--
ALTER TABLE `product_vehicle_compatibilities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_vehicle_compatibilities_product_id_foreign` (`product_id`),
  ADD KEY `product_vehicle_compatibilities_make_id_foreign` (`make_id`),
  ADD KEY `product_vehicle_compatibilities_model_id_foreign` (`model_id`);

--
-- Indexes for table `repair_orders`
--
ALTER TABLE `repair_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `repair_orders_job_card_id_foreign` (`job_card_id`);

--
-- Indexes for table `repair_order_parts`
--
ALTER TABLE `repair_order_parts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `repair_order_parts_repair_order_id_foreign` (`repair_order_id`),
  ADD KEY `repair_order_parts_product_id_foreign` (`product_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_customer_id_foreign` (`customer_id`),
  ADD KEY `reviews_product_id_foreign` (`product_id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sales_invoice_number_unique` (`invoice_number`),
  ADD KEY `sales_customer_id_foreign` (`customer_id`),
  ADD KEY `sales_warehouse_id_foreign` (`warehouse_id`),
  ADD KEY `sales_created_by_foreign` (`created_by`);

--
-- Indexes for table `sale_items`
--
ALTER TABLE `sale_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sale_items_sale_id_foreign` (`sale_id`),
  ADD KEY `sale_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `sale_returns`
--
ALTER TABLE `sale_returns`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sale_returns_return_number_unique` (`return_number`),
  ADD KEY `sale_returns_sale_id_foreign` (`sale_id`);

--
-- Indexes for table `service_packages`
--
ALTER TABLE `service_packages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key_unique` (`key`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vehicles_vin_unique` (`vin`),
  ADD KEY `vehicles_customer_id_foreign` (`customer_id`),
  ADD KEY `vehicles_make_id_foreign` (`make_id`),
  ADD KEY `vehicles_model_id_foreign` (`model_id`);

--
-- Indexes for table `vehicle_inspections`
--
ALTER TABLE `vehicle_inspections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicle_inspections_job_card_id_foreign` (`job_card_id`),
  ADD KEY `vehicle_inspections_inspector_id_foreign` (`inspector_id`);

--
-- Indexes for table `vehicle_makes`
--
ALTER TABLE `vehicle_makes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicle_models`
--
ALTER TABLE `vehicle_models`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicle_models_make_id_foreign` (`make_id`);

--
-- Indexes for table `warehouses`
--
ALTER TABLE `warehouses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `warehouses_slug_unique` (`slug`);

--
-- Indexes for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `wishlists_customer_id_product_id_unique` (`customer_id`,`product_id`),
  ADD KEY `wishlists_product_id_foreign` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `coupons`
--
ALTER TABLE `coupons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `customer_wallet_transactions`
--
ALTER TABLE `customer_wallet_transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `invoice_items`
--
ALTER TABLE `invoice_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `job_cards`
--
ALTER TABLE `job_cards`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `job_card_service_package`
--
ALTER TABLE `job_card_service_package`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `mechanic_assignments`
--
ALTER TABLE `mechanic_assignments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=179;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `product_specifications`
--
ALTER TABLE `product_specifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_vehicle_compatibilities`
--
ALTER TABLE `product_vehicle_compatibilities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `repair_orders`
--
ALTER TABLE `repair_orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `repair_order_parts`
--
ALTER TABLE `repair_order_parts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sale_items`
--
ALTER TABLE `sale_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sale_returns`
--
ALTER TABLE `sale_returns`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service_packages`
--
ALTER TABLE `service_packages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `vehicle_inspections`
--
ALTER TABLE `vehicle_inspections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vehicle_makes`
--
ALTER TABLE `vehicle_makes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `vehicle_models`
--
ALTER TABLE `vehicle_models`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `warehouses`
--
ALTER TABLE `warehouses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wishlists`
--
ALTER TABLE `wishlists`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_vehicle_id_foreign` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_cart_id_foreign` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `customer_wallet_transactions`
--
ALTER TABLE `customer_wallet_transactions`
  ADD CONSTRAINT `customer_wallet_transactions_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `invoice_items`
--
ALTER TABLE `invoice_items`
  ADD CONSTRAINT `invoice_items_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `job_cards`
--
ALTER TABLE `job_cards`
  ADD CONSTRAINT `job_cards_booking_id_foreign` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `job_cards_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `job_cards_vehicle_id_foreign` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `job_card_service_package`
--
ALTER TABLE `job_card_service_package`
  ADD CONSTRAINT `job_card_service_package_job_card_id_foreign` FOREIGN KEY (`job_card_id`) REFERENCES `job_cards` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `job_card_service_package_service_package_id_foreign` FOREIGN KEY (`service_package_id`) REFERENCES `service_packages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `mechanic_assignments`
--
ALTER TABLE `mechanic_assignments`
  ADD CONSTRAINT `mechanic_assignments_job_card_id_foreign` FOREIGN KEY (`job_card_id`) REFERENCES `job_cards` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `mechanic_assignments_mechanic_id_foreign` FOREIGN KEY (`mechanic_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_coupon_id_foreign` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `orders_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `payments_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `payments_sale_id_foreign` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_specifications`
--
ALTER TABLE `product_specifications`
  ADD CONSTRAINT `product_specifications_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_vehicle_compatibilities`
--
ALTER TABLE `product_vehicle_compatibilities`
  ADD CONSTRAINT `product_vehicle_compatibilities_make_id_foreign` FOREIGN KEY (`make_id`) REFERENCES `vehicle_makes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_vehicle_compatibilities_model_id_foreign` FOREIGN KEY (`model_id`) REFERENCES `vehicle_models` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_vehicle_compatibilities_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `repair_orders`
--
ALTER TABLE `repair_orders`
  ADD CONSTRAINT `repair_orders_job_card_id_foreign` FOREIGN KEY (`job_card_id`) REFERENCES `job_cards` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `repair_order_parts`
--
ALTER TABLE `repair_order_parts`
  ADD CONSTRAINT `repair_order_parts_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `repair_order_parts_repair_order_id_foreign` FOREIGN KEY (`repair_order_id`) REFERENCES `repair_orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sales_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sales_warehouse_id_foreign` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sale_items`
--
ALTER TABLE `sale_items`
  ADD CONSTRAINT `sale_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sale_items_sale_id_foreign` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sale_returns`
--
ALTER TABLE `sale_returns`
  ADD CONSTRAINT `sale_returns_sale_id_foreign` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `vehicles_make_id_foreign` FOREIGN KEY (`make_id`) REFERENCES `vehicle_makes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `vehicles_model_id_foreign` FOREIGN KEY (`model_id`) REFERENCES `vehicle_models` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vehicle_inspections`
--
ALTER TABLE `vehicle_inspections`
  ADD CONSTRAINT `vehicle_inspections_inspector_id_foreign` FOREIGN KEY (`inspector_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `vehicle_inspections_job_card_id_foreign` FOREIGN KEY (`job_card_id`) REFERENCES `job_cards` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vehicle_models`
--
ALTER TABLE `vehicle_models`
  ADD CONSTRAINT `vehicle_models_make_id_foreign` FOREIGN KEY (`make_id`) REFERENCES `vehicle_makes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD CONSTRAINT `wishlists_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wishlists_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
