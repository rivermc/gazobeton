<?php
if ($modx->event->name == 'pdoToolsOnFenomInit') {
    $fenom->addModifier('merge_array', function ($_opts, $opts) use ($modx) {
        return array_replace_recursive($_opts, $opts);
    });
}