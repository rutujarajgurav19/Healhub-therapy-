<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
header("Content-Type: application/json");

require '../../../config.php';

$data = json_decode(file_get_contents("php://input"), true);
if (!$data || empty($data['credential'])) {
    echo json_encode(["success" => false, "message" => "Credential required"]);
    exit();
}

$credential = $data['credential'];

// Decode JWT
$parts = explode('.', $credential);
if (count($parts) !== 3) {
    echo json_encode(["success" => false, "message" => "Invalid credential"]);
    exit();
}

$payload = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $parts[1])), true);
if (!$payload) {
    echo json_encode(["success" => false, "message" => "Invalid credential"]);
    exit();
}

$email = $payload['email'];
$name = $payload['name'];
$google_id = $payload['sub'];

try {
    // Check if user exists by email or google_id
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? OR google_id = ?");
    $stmt->execute([$email, $google_id]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // Update google_id if not set
        if (empty($user['google_id'])) {
            $pdo->prepare("UPDATE users SET google_id = ? WHERE id = ?")->execute([$google_id, $user['id']]);
        }
        // Log in the user
        echo json_encode(["success" => true, "message" => "Login successful", "user" => $user]);
    } else {
        // Create new user
        $stmt = $pdo->prepare("INSERT INTO users (name, email, google_id, is_verified) VALUES (?, ?, ?, TRUE)");
        $stmt->execute([$name, $email, $google_id]);
        $newUserId = $pdo->lastInsertId();
        $newUser = ["id" => $newUserId, "name" => $name, "email" => $email, "google_id" => $google_id, "is_verified" => true];
        echo json_encode(["success" => true, "message" => "Account created and login successful", "user" => $newUser]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Server Error: " . $e->getMessage()]);
}
?>
