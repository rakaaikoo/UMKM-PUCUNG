<?php
header('Content-Type: application/json; charset=utf-8');

$googleKey = 'YOUR_API_KEY';
$address = $_GET['address'] ?? '';

if (!$address) {
    http_response_code(400);
    echo json_encode(['error' => 'Parameter address diperlukan']);
    exit;
}

$url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' . urlencode($address) . '&key=' . $googleKey;
$response = file_get_contents($url);
if ($response === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Gagal memanggil Google Maps API']);
    exit;
}

$data = json_decode($response, true);
if (!$data || $data['status'] !== 'OK') {
    http_response_code(500);
    echo json_encode(['error' => 'Geocoding gagal', 'details' => $data]);
    exit;
}

$location = $data['results'][0]['geometry']['location'];
echo json_encode(['lat' => $location['lat'], 'lng' => $location['lng']]);
