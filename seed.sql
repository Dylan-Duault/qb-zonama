-- SQL file to create a shop using MariaDB
-- Table prefix is za

-- Create categories table
CREATE TABLE IF NOT EXISTS `za_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- Create items table
CREATE TABLE IF NOT EXISTS `za_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `za_items_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `za_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

-- Create orders table
CREATE TABLE IF NOT EXISTS `za_orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `citizen_id` varchar(250) NOT NULL,
  `price` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `za_orders_citizen_id_index` (`citizen_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- Create order_item table
CREATE TABLE IF NOT EXISTS `za_order_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `za_order_item_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `za_orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `za_order_item_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `za_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

-- Seed fake categories
INSERT INTO `za_categories` (`id`, `name`) VALUES
(1, 'Food'),
(2, 'Drink'),
(3, 'Clothes'),
(4, 'Accessories'),
(5, 'Cosmetics'),
(6, 'Electronics');

-- Seed fake items
INSERT INTO `za_items` (`id`, `name`, `description`, `price`, `image`, `category_id`) VALUES
(, 'Banana', 'A yellow fruit', 10, 'banana.png', 1),
(2, 'Orange', 'An orange fruit', 10, 'orange.png', 1),
(3, 'Apple', 'A red fruit', 10, 'apple.png', 1),
(4, 'Coca Cola', 'A soft drink', 10, 'coca-cola.png', 2),
(5, 'Pepsi', 'A soft drink', 10, 'pepsi.png', 2),
(6, 'T-shirt', 'A t-shirt', 10, 't-shirt.png', 3),
(7, 'Jeans', 'A pair of jeans', 10, 'jeans.png', 3),
(8, 'Shoes', 'A pair of shoes', 10, 'shoes.png', 3),
(9, 'Glasses', 'A pair of glasses', 10, 'glasses.png', 4),
(10, 'Watch', 'A watch', 10, 'watch.png', 4),
(11, 'Headphones', 'A pair of headphones', 10, 'headphones.png', 4),
(12, 'Iphone', 'An iphone', 10, 'iphone.png', 6),
(13, 'Ipad', 'An ipad', 10, 'ipad.png', 6),
(14, 'Ipod', 'An ipod', 10, 'ipod.png', 6),
(15, 'Laptop', 'A laptop', 10, 'laptop.png', 6),
(16, 'TV', 'A TV', 10, 'tv.png', 6),
(17, 'Tablet', 'A tablet', 10, 'tablet.png', 6),
(18, 'Computer', 'A computer', 10, 'computer.png', 6),
(19, 'Keyboard', 'A keyboard', 10, 'keyboard.png', 6),
(20, 'Mouse', 'A mouse', 10, 'mouse.png', 6);

-- Create fake orders
INSERT INTO `za_orders` (`id`, `citizen_id`, `price`, `created_at`) VALUES
(1, 'SZO66273', 10, '2018-01-01 00:00:00'),
(2, 'SZO66273', 10, '2018-01-01 00:00:00');

-- Create fake order_item
INSERT INTO `za_order_item` (`id`, `order_id`, `item_id`, `quantity`) VALUES
(1, 1, 1, 2),
(2, 1, 2, 1),
(3, 1, 3, 5),
(4, 2, 2, 1),
(5, 2, 8, 3);