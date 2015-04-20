<?php
function get_random_string($valid_chars, $length)
{
    // start with an empty random string
    $random_string = "";

    // count the number of chars in the valid chars string so we know how many choices we have
    $num_valid_chars = strlen($valid_chars);

    // repeat the steps until we've created a string of the right length
    for ($i = 0; $i < $length; $i++)
    {
        // pick a random number from 1 up to the number of valid chars
        $random_pick = mt_rand(1, $num_valid_chars);

        // take the random character out of the string of valid chars
        // subtract 1 from $random_pick because strings are indexed starting at 0, and we started picking at 1
        $random_char = $valid_chars[$random_pick-1];

        // add the randomly-chosen char onto the end of our string so far
        $random_string .= $random_char;
    }

    // return our finished random string
    return $random_string;
}

$valid_chars = 'abcdefghijklmnopqrstuvwxyz1234567890_';
$length = 5;

$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);

$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);

while(file_exists($target_file)) {
	$target_file = $target_dir . get_random_string($valid_chars, $length) . $_FILES["file"]["name"];
}

move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);
echo 'http://dantsai.com/_/' . $target_file;
// Check if image file is a actual image or fake image
// if(isset($_POST["submit"])) {
//     $check = getimagesize($_FILES["file"]["tmp_name"]);
//     if($check !== false) {
//         // echo "File is an image - " . $check["mime"] . ".";
//         $uploadOk = 1;
//     } else {
//         // echo "File is not an image.";
//         $uploadOk = 0;
//     }
// }


// Check if file already exists
// if (file_exists($target_file)) {
//     // echo "Sorry, file already exists.";
//     $uploadOk = 0;
// }

// Check file size
// if ($_FILES["file"]["size"] > 500000) {
//     echo "Sorry, your file is too large.";
//     $uploadOk = 0;
// }

// Allow certain file formats
// if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
// && $imageFileType != "gif" ) {
//     echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
//     $uploadOk = 0;
// }

// Check if $uploadOk is set to 0 by an error
// if ($uploadOk == 0) {
//     // echo "Sorry, your file was not uploaded.";
//     echo "0";
// // if everything is ok, try to upload file
// } else {
    // if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
    //     // echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
    //     echo 'http://dantsai.com/_/uploads/' . $_FILES["file"]["name"];
    // } else {
    //     // echo "Sorry, there was an error uploading your file.";
    //     echo "0";
    // }
// }
?>
