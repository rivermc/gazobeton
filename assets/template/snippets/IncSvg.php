<?php
$output = str_replace("assets/template/images/","",$file);
$base_dir = $_SERVER['DOCUMENT_ROOT'] . '/assets/template/images';
include_once($base_dir.'/'. $output);