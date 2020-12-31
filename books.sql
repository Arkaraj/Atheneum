-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 31, 2020 at 11:51 AM
-- Server version: 8.0.19
-- PHP Version: 7.1.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Books`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `dateOfPublish` date NOT NULL,
  `price` int NOT NULL,
  `description` varchar(500) NOT NULL
) ;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `name`, `author`, `dateOfPublish`, `price`, `description`) VALUES
(1, 'Book 1', 'DEF', '1998-03-16', 125, 'This book is about Geography and maps.'),
(2, 'Book 2', 'GHI', '2002-04-02', 500, 'This book is cursed!'),
(3, 'Book 3', 'JKL', '1996-11-11', 88, 'This book is about flora and fauna.'),
(4, 'Book 4', 'MNO', '1933-12-09', 50, 'This book is about Space.'),
(5, 'Book 5', 'PQR', '2010-11-07', 155, 'This book is a story book.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
