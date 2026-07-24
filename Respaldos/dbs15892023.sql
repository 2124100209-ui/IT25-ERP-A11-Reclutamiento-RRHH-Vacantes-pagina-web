-- phpMyAdmin SQL Dump
-- version 4.9.11
-- https://www.phpmyadmin.net/
--
-- Servidor: db5020914755.hosting-data.io
-- Tiempo de generación: 24-07-2026 a las 21:12:33
-- Versión del servidor: 8.0.36
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbs15892023`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `additional_information`
--

CREATE TABLE `additional_information` (
  `id` bigint UNSIGNED NOT NULL,
  `applicant_id` bigint UNSIGNED NOT NULL,
  `disponibilidad_horario` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `licencia_conducir` tinyint(1) DEFAULT NULL,
  `vehiculo_propio` tinyint(1) DEFAULT NULL,
  `discapacidad` tinyint(1) DEFAULT NULL,
  `tipo_de` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `otras_caracteristicas` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `additional_information`
--

INSERT INTO `additional_information` (`id`, `applicant_id`, `disponibilidad_horario`, `licencia_conducir`, `vehiculo_propio`, `discapacidad`, `tipo_de`, `otras_caracteristicas`, `created_at`, `updated_at`) VALUES
(1, 1, 'PruebaA', 1, 1, 1, 'PruebaA', 'PruebaA', '2026-07-14 04:35:50', '2026-07-14 04:35:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admins`
--

CREATE TABLE `admins` (
  `id` bigint UNSIGNED NOT NULL,
  `correo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `session_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `admins`
--

INSERT INTO `admins` (`id`, `correo`, `password`, `session_token`, `created_at`, `updated_at`) VALUES
(1, 'admin@seati.com', '$2y$12$NJqaRAJ/59H7IaEat5Dj/u6Yak/SQQnZka.iRUjDHTo7F7005I6ge', '5Qp0WOkJg6elI6JEIALKuGFwI95bIOnN0cI0NSojfxDBJDIXcT4AXzViNl9g', '2026-07-14 01:09:00', '2026-07-22 22:41:44');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `applicants`
--

CREATE TABLE `applicants` (
  `id` bigint UNSIGNED NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido_paterno` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `apellido_materno` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `curp` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `direccion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_nacimiento` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado_civil` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `credito_infonavit` tinyint(1) NOT NULL DEFAULT '0',
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pendiente',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `cv_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cv_original_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `carta_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `carta_original_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `applicants`
--

INSERT INTO `applicants` (`id`, `nombre`, `apellido`, `apellido_paterno`, `apellido_materno`, `curp`, `email`, `telefono`, `direccion`, `fecha_nacimiento`, `estado_civil`, `credito_infonavit`, `status`, `created_at`, `updated_at`, `cv_path`, `cv_original_name`, `carta_path`, `carta_original_name`) VALUES
(1, 'PruebaA', 'PruebaA PruebaA', 'PruebaA', 'PruebaA', 'Prueba4', 'PruebaA@gmail.com', '1111111', 'PruebaA', 'PruebaA', 'PruebaA', 1, 'aceptado', '2026-07-14 04:35:50', '2026-07-14 04:35:50', 'applicants/1/XCMTbhhnD1NlMJPyNw9h37GfGp9tTNyHMpHdwTqz.pdf', 'Guía de despliegue en Ionos.pdf', 'applicants/1/K38zUeb8NmXSNB4oywA6ajAIODReIpKCnrsilAgK.pdf', 'Guía de despliegue en Ionos.pdf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `deleted_applicant_histories`
--

CREATE TABLE `deleted_applicant_histories` (
  `id` bigint UNSIGNED NOT NULL,
  `applicant_id` bigint UNSIGNED DEFAULT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `puesto_aplicado` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `educations`
--

CREATE TABLE `educations` (
  `id` bigint UNSIGNED NOT NULL,
  `applicant_id` bigint UNSIGNED NOT NULL,
  `nivel_educativo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `institucion` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `titulo_obtenido` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cursos` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `educations`
--

INSERT INTO `educations` (`id`, `applicant_id`, `nivel_educativo`, `institucion`, `titulo_obtenido`, `cursos`, `created_at`, `updated_at`) VALUES
(1, 1, 'PruebaA', 'PruebaA', 'PruebaA', 'PruebaA, PruebaA', '2026-07-14 04:35:50', '2026-07-14 04:35:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_applications`
--

CREATE TABLE `job_applications` (
  `id` bigint UNSIGNED NOT NULL,
  `applicant_id` bigint UNSIGNED NOT NULL,
  `vacancy_id` bigint UNSIGNED DEFAULT NULL,
  `puesto_aplicado` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `area` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sueldo_percibido` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `job_applications`
--

INSERT INTO `job_applications` (`id`, `applicant_id`, `vacancy_id`, `puesto_aplicado`, `area`, `sueldo_percibido`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Prueba A', 'Prueba A', '11111', '2026-07-14 04:35:50', '2026-07-14 04:35:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_05_19_184657_create_applicants_table', 1),
(5, '2026_05_19_184658_create_educations_table', 1),
(6, '2026_05_19_184658_create_job_applications_table', 1),
(7, '2026_05_19_184659_create_work_experiences_table', 1),
(8, '2026_05_19_184700_create_skills_table', 1),
(9, '2026_05_19_184701_create_additional_information_table', 1),
(10, '2026_05_21_163435_create_usuarios_table', 1),
(11, '2026_05_30_171222_create_vacancy_table', 1),
(12, '2026_06_23_000000_add_documents_to_applicants_table', 1),
(13, '2026_06_25_000000_create_admins_table', 1),
(14, '2026_06_26_000000_create_deleted_applicant_histories_table', 1),
(15, '2026_06_27_000000_add_contact_to_deleted_applicant_histories_table', 1),
(16, '2026_06_27_000001_remove_documents_from_deleted_applicant_histories_table', 1),
(17, '2026_06_30_000000_add_department_to_vacancy_table', 1),
(18, '2026_06_30_000001_add_credito_infonavit_to_applicants_table', 1),
(19, '2026_07_02_000000_add_profile_to_usuarios_table', 1),
(20, '2026_07_02_000001_add_datos_formulario_to_usuarios_table', 1),
(21, '2026_07_10_000000_add_apellidos_separados_to_applicants_table', 1),
(22, '2026_07_10_000001_add_vacancy_id_to_job_applications_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('1EurdENKyeVgmYVh0sxmZhfKvhyjgWMa0WxEEaS6', NULL, '184.154.36.171', 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/6.0)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieWl3YnEyd2VxVFFBUHM5bENHR3VVRHpDeDZvdzU5V0dDV1Z5NUFzSiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9hcGktdmFjYW50ZXMuaS1kZWIuY29tLm14IjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1784446799),
('21pKRe1Vxs2Je3TjtrIMNOXH9Igqm2Y8pJPa7Uzr', NULL, '2806:261:48e:bbf:80cf:718:6483:75b0', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 OPR/133.0.0.0 (Edition std-2)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWGEwQzlMQXlHY3M5c0c4ZHlhSnhLZDgwTW1OMHVJNWF6QlJ5TmV1ciI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzM6Imh0dHBzOi8vYXBpLXZhY2FudGVzLmktZGViLmNvbS5teCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1783979252),
('BsOAehk6Vr7D6TL3gz9OGjMCmdXPopRV31ugrVjW', NULL, '184.154.36.171', 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/6.0)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN1NZTm1BUE13UEl0V0ZrQWxQdWkzNXVsUjBmcjROY2xUUFN0VjZtVCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9hcGktdmFjYW50ZXMuaS1kZWIuY29tLm14IjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1784014863),
('jZ0mZHai4uCwxbhMFzRjKUcP2wahFwt0wj1ZSoGc', NULL, '184.154.36.172', 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/6.0)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYkp2cnJvY2ZOQVR1WUR3cWExMWh2OWs2TnJEZ2ZsanFDT1VxYTFEQSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9hcGktdmFjYW50ZXMuaS1kZWIuY29tLm14IjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1784705670),
('Kutxn5dnRNURXduParVoi89h0H9WZxvDt61tksvd', NULL, '198.20.67.198', 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/6.0)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoib0lDeVdKOHF3TUJYdE50M0NJVWRaRHVoNm5ESVBpRmFKQ1BmcktFUCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9hcGktdmFjYW50ZXMuaS1kZWIuY29tLm14IjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1784786289),
('kZ9YDlIkRwiOXeNgvnK6FtCtlruAfkncsdTe1ReP', NULL, '198.20.67.198', 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/6.0)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicG9mdzVBNlZteDNNOTdWTjF1T1JzUVhqTTRyTm5pNWo1R2NBZ0tabiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9hcGktdmFjYW50ZXMuaS1kZWIuY29tLm14IjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1784182005),
('MCmERa4DRQU3jnxbZZEV4n48RULXGe9XWb3zBfxS', NULL, '184.154.36.173', 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/6.0)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUzdmSTVVME5ETEtiaUxLaFJkWnFzU0JRWnNVTDNoTk1mbks2cE96OCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9hcGktdmFjYW50ZXMuaS1kZWIuY29tLm14IjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1784526967),
('NmwHC9uToiwtS7VFjo6vCtbHsku7sypOgZP1mG9O', NULL, '184.154.36.172', 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/6.0)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZU1ENkJ4MTMwRXZ5dnNKNDJicmlPQzYyazU3ZUdoSUtRT3lQQjNDZSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9hcGktdmFjYW50ZXMuaS1kZWIuY29tLm14IjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1784619603),
('vGNpoAuE5lQZhb77DmXCw6sJnByCdeD3UfQiJ9ZY', NULL, '184.154.36.173', 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/6.0)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM0UyTDlIRzBNRFI5ZU9LR0tIc0xWT1Q3OHRTZ2ZybHRLOElWU2VPZyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9hcGktdmFjYW50ZXMuaS1kZWIuY29tLm14IjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1784100094),
('xqmNLIQ4AtYIus9LTlRJM7JbiG61z7SNWxwkdHfY', NULL, '184.154.36.172', 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/6.0)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZzU0YjQycTdwZVZCQ0RWWEs5YWZpcERIOXJveFpPNXl1cmpWeUl5UyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9hcGktdmFjYW50ZXMuaS1kZWIuY29tLm14IjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1784881382),
('xy9ZGWehJ9PjuXyuHj5bJPyKHWwsWyzPap1XQidD', NULL, '184.154.36.173', 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/6.0)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYlJFVXFxUUEwWHZMUnBTMldsTW9lWGIzQlRuc09WVzcweU4xd2NicyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9hcGktdmFjYW50ZXMuaS1kZWIuY29tLm14IjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1784274913),
('YQyXvzbBqM4RXIzUjY9tDRurEzuIzCGDCPYCxJNF', NULL, '184.154.36.173', 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/6.0)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM0RlNTl1MUM1bFdhZ0JzV1BMa1hidEZsZHVha3JENmVFcDNBMm9sUiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9hcGktdmFjYW50ZXMuaS1kZWIuY29tLm14IjtzOjU6InJvdXRlIjtOO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1784354154);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `skills`
--

CREATE TABLE `skills` (
  `id` bigint UNSIGNED NOT NULL,
  `applicant_id` bigint UNSIGNED NOT NULL,
  `idiomas` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `software` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `habilidades_tecnicas` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `habilidades_blandas` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `skills`
--

INSERT INTO `skills` (`id`, `applicant_id`, `idiomas`, `software`, `habilidades_tecnicas`, `habilidades_blandas`, `created_at`, `updated_at`) VALUES
(1, 1, 'PruebaA', 'PruebaA, PruebaA', 'PruebaA', 'PruebaA', '2026-07-14 04:35:50', '2026-07-14 04:35:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` bigint UNSIGNED NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellido` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `correo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `curp` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `direccion` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_nacimiento` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `datos_formulario` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `correo`, `password`, `telefono`, `curp`, `direccion`, `fecha_nacimiento`, `datos_formulario`, `created_at`, `updated_at`) VALUES
(1, 'PruebaA', 'PruebaA PruebaA', 'PruebaA@gmail.com', '$2y$12$5GWQfHZGT505XC3HmMkf3OyTTsT2nmcjwv2ls30FjppJfrz5UBKYa', '1111111', 'Prueba4', 'PruebaA', 'PruebaA', '{\"area\": \"Prueba A\", \"curp\": \"Prueba4\", \"email\": \"PruebaA@gmail.com\", \"cursos\": [\"PruebaA\", \"PruebaA\"], \"nombre\": \"PruebaA\", \"idiomas\": [\"PruebaA\"], \"tipo_de\": \"PruebaA\", \"apellido\": \"PruebaA PruebaA\", \"software\": [\"PruebaA\", \"PruebaA\"], \"telefono\": \"1111111\", \"direccion\": \"PruebaA\", \"vacanteId\": \"1\", \"institucion\": \"PruebaA\", \"discapacidad\": true, \"estado_civil\": \"PruebaA\", \"experiencias\": [{\"puesto\": \"PruebaA\", \"empresa\": \"PruebaA\", \"periodo\": \"PruebaA\", \"motivo_salida\": \"PruebaA\", \"responsabilidades\": \"PruebaA\"}, {\"puesto\": \"PruebaA\", \"empresa\": \"PruebaA\", \"periodo\": \"PruebaA\", \"motivo_salida\": \"PruebaA\", \"responsabilidades\": \"PruebaA\"}], \"sueldo_actual\": \"111\", \"nivel_educativo\": \"PruebaA\", \"puesto_aplicado\": \"Prueba A\", \"titulo_obtenido\": \"PruebaA\", \"vehiculo_propio\": true, \"apellido_materno\": \"PruebaA\", \"apellido_paterno\": \"PruebaA\", \"fecha_nacimiento\": \"PruebaA\", \"sueldo_percibido\": \"11111\", \"credito_infonavit\": true, \"licencia_conducir\": true, \"tiempo_experiencia\": \"1\", \"habilidadesTecnicas\": [\"PruebaA\"], \"habilidades_blandas\": \"PruebaA\", \"trabaja_actualmente\": true, \"otras_caracteristicas\": \"PruebaA\", \"disponibilidad_horario\": \"PruebaA\"}', '2026-07-14 04:35:33', '2026-07-14 04:35:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vacancy`
--

CREATE TABLE `vacancy` (
  `id` bigint UNSIGNED NOT NULL,
  `puesto` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `departamento` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descripcion_breve` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `horario` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `requisitos` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `salario` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `vacancy`
--

INSERT INTO `vacancy` (`id`, `puesto`, `departamento`, `descripcion_breve`, `descripcion`, `horario`, `requisitos`, `salario`, `img`, `estado`, `created_at`, `updated_at`) VALUES
(1, 'Prueba A', 'Prueba A', 'Prueba A', 'Prueba A', 'Prueba A', 'Prueba A\r\nPrueba A\r\nPrueba A', '1111', 'vacancy/t3Y1gFSXPbYXmT8MyXufS6KKQvfvnH4KQq8VcsX8.png', 1, '2026-07-14 04:32:45', '2026-07-14 04:33:11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `work_experiences`
--

CREATE TABLE `work_experiences` (
  `id` bigint UNSIGNED NOT NULL,
  `applicant_id` bigint UNSIGNED NOT NULL,
  `tiempo_experiencia` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `empresa` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `puesto` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `periodo` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `responsabilidades` text COLLATE utf8mb4_unicode_ci,
  `motivo_salida` text COLLATE utf8mb4_unicode_ci,
  `trabaja_actualmente` tinyint(1) DEFAULT NULL,
  `sueldo_actual` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `work_experiences`
--

INSERT INTO `work_experiences` (`id`, `applicant_id`, `tiempo_experiencia`, `empresa`, `puesto`, `periodo`, `responsabilidades`, `motivo_salida`, `trabaja_actualmente`, `sueldo_actual`, `created_at`, `updated_at`) VALUES
(1, 1, '1', 'PruebaA', 'PruebaA', 'PruebaA', 'PruebaA', 'PruebaA', 1, '111.00', '2026-07-14 04:35:50', '2026-07-14 04:35:50'),
(2, 1, '1', 'PruebaA', 'PruebaA', 'PruebaA', 'PruebaA', 'PruebaA', 1, '111.00', '2026-07-14 04:35:50', '2026-07-14 04:35:50');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `additional_information`
--
ALTER TABLE `additional_information`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_correo_unique` (`correo`);

--
-- Indices de la tabla `applicants`
--
ALTER TABLE `applicants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `applicants_curp_unique` (`curp`),
  ADD UNIQUE KEY `applicants_email_unique` (`email`),
  ADD UNIQUE KEY `applicants_telefono_unique` (`telefono`);

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indices de la tabla `deleted_applicant_histories`
--
ALTER TABLE `deleted_applicant_histories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `educations`
--
ALTER TABLE `educations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_applications`
--
ALTER TABLE `job_applications`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `vacancy`
--
ALTER TABLE `vacancy`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `work_experiences`
--
ALTER TABLE `work_experiences`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `additional_information`
--
ALTER TABLE `additional_information`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `applicants`
--
ALTER TABLE `applicants`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `deleted_applicant_histories`
--
ALTER TABLE `deleted_applicant_histories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `educations`
--
ALTER TABLE `educations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `job_applications`
--
ALTER TABLE `job_applications`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `skills`
--
ALTER TABLE `skills`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `vacancy`
--
ALTER TABLE `vacancy`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `work_experiences`
--
ALTER TABLE `work_experiences`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
