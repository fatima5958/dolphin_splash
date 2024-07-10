<?php
// PHP code to fetch username from database and display on mining.html
$servername = "localhost"; // Hostinger MySQL server
$username = "your_db_username";
$password = "your_db_password";
$dbname = "your_database_name";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch username from database (example query)
$sql = "SELECT username FROM users WHERE id = 1"; // Adjust query as per your database structure

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        echo "Welcome, " . $row['username'] . "!"; // Display username on mining.html
    }
} else {
    echo "No username found";
}

$conn->close(); // Close MySQL connection
?>
