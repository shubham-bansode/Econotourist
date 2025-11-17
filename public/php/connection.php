<?php
$DATABASE_HOST = "localhost";
$DATABASE_USER = "root";
$DATABASE_PASS = "root";
$DATABASE_NAME = "econotourist";

try {
    $dsn = "mysql:host={$DATABASE_HOST};dbname={$DATABASE_NAME}";
    $pdo = new PDO($dsn, $DATABASE_USER, $DATABASE_PASS);
    // Set PDO to throw exceptions on error
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    exit('Failed to connect to MySQL: ' . $e->getMessage());
}
?>