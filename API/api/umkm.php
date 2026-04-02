<?php
require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

function respond($data, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function errorResponse(string $message, int $status = 400): void
{
    respond(['error' => $message], $status);
}

try {
    $pdo = getConnection();

    if ($method === 'GET') {
        if (!empty($_GET['id'])) {
            $stmt = $pdo->prepare('SELECT * FROM umkm WHERE id = :id');
            $stmt->execute(['id' => $_GET['id']]);
            $item = $stmt->fetch();
            if (!$item) {
                errorResponse('UMKM tidak ditemukan', 404);
            }
            respond($item);
        }

        $stmt = $pdo->query('SELECT * FROM umkm ORDER BY name');
        $items = $stmt->fetchAll();
        respond($items);
    }

    if ($method === 'POST') {
        if (!$input) {
            errorResponse('Payload JSON invalid');
        }

        $required = ['name', 'product', 'description', 'contact', 'address', 'latitude', 'longitude', 'category'];
        foreach ($required as $field) {
            if (!isset($input[$field]) || trim((string)$input[$field]) === '') {
                errorResponse("Field $field wajib diisi");
            }
        }

        $id = isset($input['id']) && trim($input['id']) !== '' ? $input['id'] : uniqid('umkm-', true);
        $stmt = $pdo->prepare('INSERT INTO umkm (id, name, product, description, contact, address, latitude, longitude, category) VALUES (:id, :name, :product, :description, :contact, :address, :latitude, :longitude, :category)');
        $stmt->execute([
            'id' => $id,
            'name' => $input['name'],
            'product' => $input['product'],
            'description' => $input['description'],
            'contact' => $input['contact'],
            'address' => $input['address'],
            'latitude' => $input['latitude'],
            'longitude' => $input['longitude'],
            'category' => $input['category'],
        ]);

        respond(['message' => 'UMKM berhasil ditambahkan', 'id' => $id], 201);
    }

    if ($method === 'PUT') {
        if (!$input || empty($input['id'])) {
            errorResponse('ID UMKM wajib dikirim untuk update');
        }

        $stmt = $pdo->prepare('SELECT id FROM umkm WHERE id = :id');
        $stmt->execute(['id' => $input['id']]);
        if (!$stmt->fetch()) {
            errorResponse('UMKM tidak ditemukan', 404);
        }

        $stmt = $pdo->prepare('UPDATE umkm SET name = :name, product = :product, description = :description, contact = :contact, address = :address, latitude = :latitude, longitude = :longitude, category = :category WHERE id = :id');
        $stmt->execute([
            'id' => $input['id'],
            'name' => $input['name'],
            'product' => $input['product'],
            'description' => $input['description'],
            'contact' => $input['contact'],
            'address' => $input['address'],
            'latitude' => $input['latitude'],
            'longitude' => $input['longitude'],
            'category' => $input['category'],
        ]);

        respond(['message' => 'UMKM berhasil diperbarui']);
    }

    if ($method === 'DELETE') {
        $id = $_GET['id'] ?? null;
        if (!$id) {
            errorResponse('ID UMKM wajib dikirim untuk menghapus');
        }

        $stmt = $pdo->prepare('DELETE FROM umkm WHERE id = :id');
        $stmt->execute(['id' => $id]);
        respond(['message' => 'UMKM berhasil dihapus']);
    }

    errorResponse('Metode HTTP tidak didukung', 405);
} catch (PDOException $e) {
    errorResponse('Database error: ' . $e->getMessage(), 500);
}
