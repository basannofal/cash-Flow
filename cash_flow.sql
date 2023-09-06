-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 06, 2023 at 06:40 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cash_flow`
--

-- --------------------------------------------------------

--
-- Table structure for table `cf_auth_info`
--

CREATE TABLE `cf_auth_info` (
  `id` int(11) NOT NULL,
  `name` tinytext NOT NULL,
  `number` tinytext NOT NULL,
  `email` tinytext NOT NULL,
  `username` tinytext NOT NULL,
  `password` tinytext NOT NULL,
  `is_admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cf_auth_info`
--

INSERT INTO `cf_auth_info` (`id`, `name`, `number`, `email`, `username`, `password`, `is_admin`) VALUES
(1, 'Basan Nofal', '9023789087', 'basannofal@gmail.com', 'basannofal', 'basannofal', 1),
(4, 'Hussain', '9029098238', 'hussain@gmail.com', 'husen', 'husen', 0),
(5, 'nofal user', '3934884858', 'nofal@gmail.com', 'nofal', 'nofal', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cf_borrow_payment`
--

CREATE TABLE `cf_borrow_payment` (
  `id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `date` date NOT NULL,
  `m_id` int(11) NOT NULL,
  `bail_m_id` int(11) NOT NULL,
  `given_by` tinytext NOT NULL,
  `given_user` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cf_borrow_payment`
--

INSERT INTO `cf_borrow_payment` (`id`, `amount`, `date`, `m_id`, `bail_m_id`, `given_by`, `given_user`) VALUES
(21, 8999, '2023-08-23', 15, 14, 'nofal', 'basannofal'),
(22, 8999, '2023-08-23', 15, 14, 'nofal', 'basannofal'),
(23, 50000, '2023-08-27', 21, 17, 'self', 'basannofal'),
(28, 990, '2023-09-05', 14, 21, 'farhann', 'basannofal');

-- --------------------------------------------------------

--
-- Table structure for table `cf_category`
--

CREATE TABLE `cf_category` (
  `id` int(11) NOT NULL,
  `name` tinytext NOT NULL,
  `sub_category` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cf_category`
--

INSERT INTO `cf_category` (`id`, `name`, `sub_category`) VALUES
(1, 'zakat', 0),
(2, 'lillah', 1),
(3, 'lillah money', 1),
(82, 'dd11', 0);

-- --------------------------------------------------------

--
-- Table structure for table `cf_deposit_borrowed_payment`
--

CREATE TABLE `cf_deposit_borrowed_payment` (
  `id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `deposite_by` tinytext NOT NULL,
  `mobile_no` tinytext NOT NULL,
  `collected_by` tinytext NOT NULL,
  `collected_user` tinytext NOT NULL,
  `date` date NOT NULL,
  `m_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cf_deposit_borrowed_payment`
--

INSERT INTO `cf_deposit_borrowed_payment` (`id`, `amount`, `deposite_by`, `mobile_no`, `collected_by`, `collected_user`, `date`, `m_id`) VALUES
(50, 10000, 'nofal', '2147483647', 'nofao', 'basannofal', '2023-08-27', 21),
(52, 5000, 'mohsin', '2147483647', 'mohsin', 'basannofal', '2023-08-27', 21),
(53, 600, 'nofal', '9023883909', 'nofal', 'basannofal', '2023-09-06', 14),
(54, 390, 'nofalll', '90344444444', 'nofall', 'basannofal', '2023-09-06', 14);

-- --------------------------------------------------------

--
-- Table structure for table `cf_main_payment`
--

CREATE TABLE `cf_main_payment` (
  `id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `collected_by` tinytext NOT NULL,
  `collected_user` tinytext NOT NULL,
  `date` date NOT NULL,
  `m_id` int(11) NOT NULL,
  `c_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cf_main_payment`
--

INSERT INTO `cf_main_payment` (`id`, `amount`, `collected_by`, `collected_user`, `date`, `m_id`, `c_id`) VALUES
(19, 9000, 'nofal', 'basannofal', '2023-08-25', 15, 1),
(21, 9000, 'nofal', 'basannofal', '2023-08-25', 15, 1),
(22, 9000, 'nofal', 'basannofal', '2023-08-26', 17, 1),
(23, 9000, 'nofal', 'basannofal', '2023-08-26', 17, 1),
(24, 3322, 'nofal', 'basannofal', '2023-08-26', 17, 1),
(25, 3322, 'nofal', 'basannofal', '2023-08-26', 17, 1),
(26, 900, 'nofal', 'basannofal', '2023-08-26', 14, 1),
(28, 5000, 'nofal', 'basannofal', '2023-08-26', 14, 1),
(32, 10000, 'nofal', 'basannofal', '2023-08-27', 21, 2),
(34, 9000, 'nofal', 'basannofal', '2023-08-27', 15, 1),
(35, 9000, 'nofal', 'basannofal', '2023-08-27', 17, 1),
(36, 9000, 'nofal', 'basannofal', '2023-08-27', 17, 1),
(37, 10000, 'mohsin', 'basannofal', '2023-08-27', 21, 2),
(38, 8000, 'nofa', 'basannofal', '2023-09-05', 14, 1);

-- --------------------------------------------------------

--
-- Table structure for table `cf_main_payment_return`
--

CREATE TABLE `cf_main_payment_return` (
  `id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `return_by` tinytext NOT NULL,
  `returned_user` tinytext NOT NULL,
  `date` date NOT NULL,
  `withdrawer_name` tinytext NOT NULL,
  `mobile_no` tinytext NOT NULL,
  `m_id` int(11) NOT NULL,
  `c_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cf_main_payment_return`
--

INSERT INTO `cf_main_payment_return` (`id`, `amount`, `return_by`, `returned_user`, `date`, `withdrawer_name`, `mobile_no`, `m_id`, `c_id`) VALUES
(5, 7000, 'xyz', 'basannofal', '2023-09-06', 'xyz', '9023789087', 14, 1),
(7, 8000, 'nofalq', 'basannofal', '2023-08-25', 'nofal', '2147483647', 14, 3),
(19, 90, 'nofal', 'basannofal', '2023-08-26', 'nofal', '2147483647', 14, 1),
(21, 3000, 'nofal', 'basannofal', '2023-08-27', 'nofal', '2147483647', 21, 1),
(22, 200, 'basan', 'basannofal', '2023-09-06', 'maknojiya', '2147483647', 14, 1);

-- --------------------------------------------------------

--
-- Table structure for table `cf_member_master`
--

CREATE TABLE `cf_member_master` (
  `id` int(11) NOT NULL,
  `fname` tinytext NOT NULL,
  `mname` tinytext NOT NULL,
  `lname` tinytext NOT NULL,
  `nickname` tinytext DEFAULT NULL,
  `address` tinytext NOT NULL,
  `mobile_no` tinytext NOT NULL,
  `alt_mobile_no` int(11) NOT NULL,
  `email` tinytext NOT NULL,
  `aadhar_card` tinytext NOT NULL,
  `bank_ac` tinytext NOT NULL,
  `ifsc` tinytext NOT NULL,
  `add_by` varchar(30) NOT NULL,
  `date` date NOT NULL,
  `update_by` varchar(30) DEFAULT NULL,
  `update_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cf_member_master`
--

INSERT INTO `cf_member_master` (`id`, `fname`, `mname`, `lname`, `nickname`, `address`, `mobile_no`, `alt_mobile_no`, `email`, `aadhar_card`, `bank_ac`, `ifsc`, `add_by`, `date`, `update_by`, `update_date`) VALUES
(14, 'basann', 'nofall', 'farhann', 'basannofall', 'Rajosanaa', '1122334455', 2147483640, 'basannofal4@gmail.com', '214748364777', '21923849382828200', 'ifcs', 'basannofal', '2023-08-23', 'basannofal', '2023-08-30'),
(15, 'sunsara', 'husen', 'razak', 'husenahmad', 'Tenivada', '9002228883', 2147483647, 'basannofal4@gmail.com', '339393939533', '900928988', 'IFSC90278B', 'basannofal', '2023-08-23', NULL, NULL),
(17, 'basan', 'nofal', 'farhan', 'nofal', 'Rajpsoa', '9012989122', 902299899, 'basannofal4@gmail.com', '990088778899', '9999999999', 'bkid0059', 'basannofal', '2023-08-25', 'basannofal', '2023-08-30'),
(21, 'noman', 'arif', 'valuda', 'noman', 'Majadar', '9493949390', 902299899, 'basannofal4@gmail.com', '990088778899', '8889990008', 'bkid0059', 'basannofal', '2023-08-27', 'basannofal', '2023-08-27'),
(25, 'basan', 'nofal', 'farhannnn', 'basan', 'Rajosana', '9909090099', 902299899, 'basannofal4@gmail.com', '990088778899', '8889990008', 'bkid0059', 'basannofal', '2023-08-30', 'basannofal', '2023-08-30'),
(26, 'basan', 'nofal', 'farhannn', 'basannofal', '', '9023789087', 0, '', '', '', '', 'basannofal', '2023-09-03', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cf_auth_info`
--
ALTER TABLE `cf_auth_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cf_borrow_payment`
--
ALTER TABLE `cf_borrow_payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `m_id` (`m_id`),
  ADD KEY `bail_m_id` (`bail_m_id`);

--
-- Indexes for table `cf_category`
--
ALTER TABLE `cf_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cf_deposit_borrowed_payment`
--
ALTER TABLE `cf_deposit_borrowed_payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `m_id` (`m_id`);

--
-- Indexes for table `cf_main_payment`
--
ALTER TABLE `cf_main_payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `m_id` (`m_id`),
  ADD KEY `c_id` (`c_id`);

--
-- Indexes for table `cf_main_payment_return`
--
ALTER TABLE `cf_main_payment_return`
  ADD PRIMARY KEY (`id`),
  ADD KEY `m_id` (`m_id`),
  ADD KEY `c_id` (`c_id`);

--
-- Indexes for table `cf_member_master`
--
ALTER TABLE `cf_member_master`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mobile_no` (`mobile_no`) USING HASH;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cf_auth_info`
--
ALTER TABLE `cf_auth_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `cf_borrow_payment`
--
ALTER TABLE `cf_borrow_payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `cf_category`
--
ALTER TABLE `cf_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `cf_deposit_borrowed_payment`
--
ALTER TABLE `cf_deposit_borrowed_payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `cf_main_payment`
--
ALTER TABLE `cf_main_payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `cf_main_payment_return`
--
ALTER TABLE `cf_main_payment_return`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `cf_member_master`
--
ALTER TABLE `cf_member_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cf_borrow_payment`
--
ALTER TABLE `cf_borrow_payment`
  ADD CONSTRAINT `cf_borrow_payment_ibfk_1` FOREIGN KEY (`m_id`) REFERENCES `cf_member_master` (`id`),
  ADD CONSTRAINT `cf_borrow_payment_ibfk_2` FOREIGN KEY (`bail_m_id`) REFERENCES `cf_member_master` (`id`);

--
-- Constraints for table `cf_deposit_borrowed_payment`
--
ALTER TABLE `cf_deposit_borrowed_payment`
  ADD CONSTRAINT `cf_deposit_borrowed_payment_ibfk_1` FOREIGN KEY (`m_id`) REFERENCES `cf_member_master` (`id`);

--
-- Constraints for table `cf_main_payment`
--
ALTER TABLE `cf_main_payment`
  ADD CONSTRAINT `cf_main_payment_ibfk_1` FOREIGN KEY (`c_id`) REFERENCES `cf_category` (`id`),
  ADD CONSTRAINT `cf_main_payment_ibfk_2` FOREIGN KEY (`m_id`) REFERENCES `cf_member_master` (`id`);

--
-- Constraints for table `cf_main_payment_return`
--
ALTER TABLE `cf_main_payment_return`
  ADD CONSTRAINT `cf_main_payment_return_ibfk_1` FOREIGN KEY (`c_id`) REFERENCES `cf_category` (`id`),
  ADD CONSTRAINT `cf_main_payment_return_ibfk_2` FOREIGN KEY (`m_id`) REFERENCES `cf_member_master` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
