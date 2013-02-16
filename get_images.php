<?php
header('Content-type: application/json');
$url = "https://api.instagram.com/v1/tags/snow/media/recent?access_token=6342485.f59def8.ccbe5efec33b42ae81047565a0dec26b";
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);

$result = json_decode(curl_exec($ch));
echo json_encode($result->data);