<?php
// Establish MySQL connection (replace with your database credentials)
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

// Process username from POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = htmlspecialchars($_POST["username"]);

    // Prepare and execute SQL query to insert username into database
    $sql = "INSERT INTO users (username) VALUES ('$username')";

    if ($conn->query($sql) === TRUE) {
        echo "Username stored successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close(); // Close MySQL connection
?>
