<?php
require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');

try {
    $pdo = getConnection();
    $jsonPath = __DIR__ . '/../data/umkm.json';

    if (!file_exists($jsonPath)) {
        throw new RuntimeException('File data UMKM tidak ditemukan: ' . $jsonPath);
    }

    $raw = file_get_contents($jsonPath);
    $items = json_decode($raw, true);
    if (!is_array($items)) {
        throw new RuntimeException('Format JSON tidak valid');
    }

    $pdo->beginTransaction();
    $stmt = $pdo->prepare('REPLACE INTO umkm (id, name, product, description, contact, address, latitude, longitude, category) VALUES (:id, :name, :product, :description, :contact, :address, :latitude, :longitude, :category)');
    foreach ($items as $item) {
        $stmt->execute([
            'id' => $item['id'],
            'name' => $item['name'],
            'product' => $item['product'],
            'description' => $item['description'],
            'contact' => $item['contact'],
            'address' => $item['address'],
            'latitude' => $item['latitude'],
            'longitude' => $item['longitude'],
            'category' => $item['category'],
        ]);
    }
    $pdo->commit();

    echo json_encode(['message' => 'Data UMKM berhasil disimpan ke database'], JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
    if (!empty($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
