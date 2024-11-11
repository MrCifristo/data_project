SELECT setval(pg_get_serial_sequence('meals', 'id'), MAX(id)) FROM meals;
SELECT setval(pg_get_serial_sequence('usuarios', 'id'), MAX(id)) FROM usuarios;
SELECT setval(pg_get_serial_sequence('authentication', 'id'), MAX(id)) FROM authentication;
SELECT setval(pg_get_serial_sequence('user_meals', 'id'), MAX(id)) FROM user_meals;