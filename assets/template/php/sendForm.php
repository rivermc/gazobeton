<?php

$phone=trim($_POST["phone"]);
$phone=strip_tags($phone);
$email=trim($_POST["email"]);
$email=strip_tags($email);
$IDForm=trim($_POST["IDForm"]);
$IDForm=strip_tags($IDForm);
$theme=trim($_POST["theme"]);
$theme=strip_tags($theme);
$page=trim($_POST["page"]);
$page=strip_tags($page);
$policy=trim($_POST["policy"]);
$policy=strip_tags($policy);
$text=trim($_POST["text"]);
$text=strip_tags($text);

//-------------------------------------------------------------------------//
    // Send To Email //
//-------------------------------------------------------------------------//

if ( ($phone != '' OR email != '') AND $policy == 'on') {
  $emailTo = "web@2f-vsk.ru, info@gazobetonvspb.ru, strojka365@yandex.ru";
  $emailFrom ="info@gazobetonvspb.ru";

  $emailTitle = $theme;
  $emailTitle = iconv("utf-8","windows-1251",$emailTitle);
  $emailTitle = convert_cyr_string($emailTitle, "w", "k");

  $emailText="<html><head></head><body>";
  $emailText.="<b>Тема заявки:</b> {$theme}<br>";
  $emailText.="<b>Страница заявки:</b> {$page}<br>";
  if (!empty($phone)) {
    $emailText.="<b>Телефон:</b> {$phone}";
  }
  if (!empty($email)) {
    $emailText.="<b>Почта:</b> {$email}";
  }
  if (!empty($text)) {
    $emailText.="<b>Текст:</b> {$text}";
  }
  $emailText.="</body></html>";
  $emailText=iconv("utf-8","windows-1251",$emailText);
  $emailText=convert_cyr_string($emailText, "w", "k");

  $emailHeaders="MIME-Version: 1.0\r\n";
  $emailHeaders.="Content-Type: text/html; charset=koi8-r\r\n";
  $emailHeaders.="From: $emailFrom\r\n";

  mail($emailTo, $emailTitle, $emailText, $emailHeaders);

  $response = array(
    'success' => true
  );
  echo json_encode($response);
}
else {
  $response = array(
    'success' => false
  );
  echo json_encode($response);
}

?>