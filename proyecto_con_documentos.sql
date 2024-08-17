-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-08-2024 a las 11:47:45
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos`
--

CREATE TABLE `documentos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `tipoArchivo` varchar(50) DEFAULT NULL,
  `archivo` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `fechaHoraRegistro` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `documentos`
--

INSERT INTO `documentos` (`id`, `titulo`, `descripcion`, `fecha`, `tipoArchivo`, `archivo`, `url`, `fechaHoraRegistro`) VALUES
(1, 'aguacate', 'a', '2024-08-17', 'image/png', '1723885494049.png', '', '2024-08-17 09:04:54'),
(3, 'kratos', 'es kratos jsjsjs', '2024-08-17', 'image/png', '1723887182846.png', '', '2024-08-17 09:33:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `username`
--

CREATE TABLE `username` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `genero` varchar(255) NOT NULL,
  `fechaDeNacimiento` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `tipoDeUsuario` varchar(255) NOT NULL,
  `departamento` varchar(255) NOT NULL,
  `fechaHoraDeRegistro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fechaDeUltimaModificacion` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `username`
--

INSERT INTO `username` (`id`, `username`, `password`, `nombre`, `apellidos`, `genero`, `fechaDeNacimiento`, `email`, `tipoDeUsuario`, `departamento`, `fechaHoraDeRegistro`, `fechaDeUltimaModificacion`) VALUES
(2, 'Admin', '12', 'Hector Javier', 'Morales Alanis', 'Masculino', '2002-07-07', 'aux@hotmail.com', 'admin', 'rh', '2024-07-25 08:43:17', '2024-07-25 08:43:17'),
(3, 'user1', '$argon2id$v=19$m=64000,t=4,p=1$jLQScF630bTjomoe9vCXXA$v0FmhTrC+EQNnXTH+A/5FG0mdPDBG55BrqgCkLj5Fpk', 'Hector Javier 111111111111', 'Morales Alanis', 'M', '2024-08-01', 'aux2@gmail.com', 'admin', 'ventas', '2024-08-12 06:14:37', '2024-08-12 06:14:37'),
(5, 'user5', '$argon2id$v=19$m=64000,t=4,p=1$Y9cakaGQI7r7nZrAlRUhmg$PbUQfsKYfzk3Hetxs+ThbrxFyKZaj69rYGzzBmwMKlc', 'Hector Javier 111111', 'Morales Alanis 1111', 'M', '2024-08-07', 'mariobros111111@gmail.com', 'administrador', 'iudsbf', '2024-08-13 05:41:11', '2024-08-13 05:41:11'),
(6, 'user2', '$argon2id$v=19$m=64000,t=4,p=1$3LVkkVwhNnXOoPEwDyISmA$55z6zb5mHusbMUVGF1/CGG8f1MIQRKSCAqLB08TGdIU', 'Hector Javier', 'Morales Alanis', 'M', '2024-08-14', 'mariobros11111@hotmail.com', 'admin', 'dsafas', '2024-08-13 05:45:37', '2024-08-13 05:45:37'),
(7, 'user4', '$argon2id$v=19$m=64000,t=4,p=1$9Ge2WU+L+lDS7tRTzVYbLw$5Czj8gRBIYZ8g7yFyRMvoZ+T5ou3b/7ws2m/w4hl5gM', 'Javier11111', ' Alanis', 'M', '2024-08-01', '11111@hotmail.com', 'admin', 'dfsgfsdg', '2024-08-13 05:48:39', '2024-08-13 05:48:39');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `username`
--
ALTER TABLE `username`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `documentos`
--
ALTER TABLE `documentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `username`
--
ALTER TABLE `username`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
