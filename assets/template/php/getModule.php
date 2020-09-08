<?php


function string2KeyedArray($string, $delimiter = ',', $kv = '=>') {
  if ($a = explode($delimiter, $string)) { // create parts
    foreach ($a as $s) { // each part
      if ($s) {
        if ($pos = strpos($s, $kv)) { // key/value delimiter
          $ka[trim(substr($s, 0, $pos))] = trim(substr($s, $pos + strlen($kv)));
        } else { // key delimiter not found
          $ka[] = trim($s);
        }
      }
    }
    return $ka;
  }
}

// Если запрос не AJAX или не передано действие, выходим
if ($_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest' || empty($_REQUEST['action'])) {exit();}


$action = $_REQUEST['action'];
$chunk = $_REQUEST['chunk'];
$params = $_REQUEST['params'];
$delimiter = $_REQUEST['delimiter'];


define('MODX_API_MODE', true);
require_once dirname(dirname(dirname(dirname(__FILE__)))).'/index.php';
$modx->getService('error','error.modError');
$modx->getRequest();
$modx->setLogLevel(modX::LOG_LEVEL_ERROR);
$modx->setLogTarget('FILE');
$modx->error->message = null;


/** @var array $scriptProperties */
/** @var pdoFetch $pdoFetch */
$pdoTools = $modx->getService('pdoTools');
/*
$modx->log(1, print_r($action, 1));
$modx->log(1, print_r($chunk, 1));
$modx->log(1, print_r($params, 1));
$modx->log(1, print_r($delimiter, 1));
*/


if (!is_array($params)) {
  $params = string2KeyedArray($params, $delimiter);
}

switch ($action) {
    case 'Chunk':
        if ($params != '') {
           $output = $pdoTools->getChunk($chunk, $params);
        }
        else {
            $output = $pdoTools->getChunk($chunk);
        }
        break;
    case 'Snippet':
        if ($params != '') {
           $output = $pdoTools->runSnippet($chunk, $params);
        }
        else {
            $output = $pdoTools->runSnippet($chunk);
        }
        break;
}

@session_write_close();
exit($output);