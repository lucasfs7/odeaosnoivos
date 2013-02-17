<?php
header('Content-type: application/json');

$data = array();

function get_images($url) {
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
  $result = json_decode(curl_exec($ch));

  global $data;

  foreach ($result->data as $d) {
    $data[] = $d;
  }

  if (isset($result->pagination->next_url)) {
    get_images($result->pagination->next_url);
  } else {
    echo json_encode($data);
  }
}

get_images("https://api.instagram.com/v1/tags/OdeAosNoivos/media/recent?access_token=6342485.f59def8.ccbe5efec33b42ae81047565a0dec26b");