<?php
// Casa Nuvo Investments - Lead Intake API
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$rawInput = file_get_contents('php://input');
$body = json_decode($rawInput, true);

if (!$body || empty($body['source'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Missing lead source.']);
    exit;
}

$email = isset($body['email']) && is_string($body['email']) ? trim($body['email']) : '';
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Enter a valid email address.', 'field' => 'email']);
    exit;
}

$leadId = 'lead_' . base_convert((string)round(microtime(true) * 1000), 10, 36) . '_' . substr(bin2hex(random_bytes(4)), 0, 6);
$lead = array_merge([
    'id' => $leadId,
    'receivedAt' => gmdate('Y-m-d\TH:i:s\Z'),
], $body);

// Log lead entry
$logFile = __DIR__ . '/../../leads.log';
@file_put_contents($logFile, json_encode($lead) . "\n", FILE_APPEND | LOCK_EX);

// Forward notification email to info@casanuvoinvestments.com
$to = 'info@casanuvoinvestments.com';
$source = htmlspecialchars($lead['source'] ?? 'website');
$name = htmlspecialchars($lead['name'] ?? 'Website Inquiry');
$subject = "New Lead from {$source}: {$name}";

$msg = "New lead received on Casa Nuvo Investments:\n\n";
foreach ($lead as $k => $v) {
    if (is_array($v)) $v = json_encode($v);
    $msg .= ucfirst($k) . ": " . $v . "\n";
}

$headers = "From: noreply@firebrick-falcon-650331.hostingersite.com\r\n";
if ($email) {
    $headers .= "Reply-To: {$email}\r\n";
}
@mail($to, $subject, $msg, $headers);

echo json_encode(['ok' => true, 'id' => $leadId]);
