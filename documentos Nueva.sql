-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db:3306
-- Tiempo de generación: 19-08-2024 a las 04:25:29
-- Versión del servidor: 8.4.0
-- Versión de PHP: 8.2.8

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
  `id` int NOT NULL,
  `clave_unica` varchar(255) NOT NULL,
  `titulo_del_documento` varchar(255) NOT NULL,
  `descripcion_del_documento` varchar(255) NOT NULL,
  `fecha_del_documento` date NOT NULL,
  `tipo_de_archivo` varchar(255) NOT NULL,
  `size` float NOT NULL,
  `nombre_original` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `sha256` varchar(255) NOT NULL,
  `fecha_hora_regitro` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `documentos`
--

INSERT INTO `documentos` (`id`, `clave_unica`, `titulo_del_documento`, `descripcion_del_documento`, `fecha_del_documento`, `tipo_de_archivo`, `size`, `nombre_original`, `url`, `sha256`, `fecha_hora_regitro`) VALUES
(1, '1723805322652-middleware', 'goodbye Hooray', 'Well, I\'ll see you around, I\'ll see you around', '2024-08-16', 'txt', 120, 'middleware', 'none', 'c1e613cd-4122-416b-b520-a001771a5398', '2024-08-16'),
(2, '1723805326282-middleware', 'goodbye Hooray', 'Well, I\'ll see you around, I\'ll see you around', '2024-08-16', 'txt', 120, 'middleware', 'none', '4d02366e-b086-4243-9f49-dc7e78c18739', '2024-08-16'),
(3, '1723805363935-middleware', 'goodbye Hooray', 'Well, I\'ll see you around, I\'ll see you around', '2024-08-16', 'txt', 120, 'middleware', 'none', 'a285123e-cc93-4ff7-8783-1aeae4f31914', '2024-08-16'),
(4, '1723805365416-middleware', 'goodbye Hooray', 'Well, I\'ll see you around, I\'ll see you around', '2024-08-16', 'txt', 120, 'middleware', 'none', 'e96a4c3b-7ac4-4723-a861-9497258ece4c', '2024-08-16');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `documentos`
--
ALTER TABLE `documentos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
