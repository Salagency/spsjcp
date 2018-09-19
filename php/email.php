<?php
  $subject_preferences = array(
      "input-charset" => $encoding,
      "output-charset" => $encoding,
      "line-length" => 76,
      "line-break-chars" => "\r\n"
  );


  $mail_to = 'jerry.salandy@hotmail.co.uk, spsjcp@gmail.com';
  $mail_subject = 'Carpark Ticket Created';
  $mail_message = 'Testing sending emails';


  $header = "Content-type: text/html; charset=utf-8";
  $header .= "From: spsjcp@gmail.com";
  $header .= "MIME-Version: 1.0 \r\n";
  $header .= "Content-Transfer-Encoding: 8bit \r\n";
  $header .= "Date: ".date("r (T)")." \r\n";
  $header .= iconv_mime_encode("Subject", $mail_subject, $subject_preferences);

  mail($mail_to, $mail_subject, $mail_message, $header);

  header("Location:http://new.ninestitch.com/thankyou.html");
?>
