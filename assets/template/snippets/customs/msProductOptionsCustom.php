<?php
/** @var modX $modx */
/** @var array $scriptProperties */

$tpl = $modx->getOption('tpl', $scriptProperties, 'tpl.msOptions');
$limit = $modx->getOption('limit', $scriptProperties, '');
if (!empty($input) && empty($product)) {
    $product = $input;
}

$product = !empty($product) && $product != $modx->resource->id
    ? $modx->getObject('msProduct', array('id' => $product))
    : $modx->resource;
if (!($product instanceof msProduct)) {
    return "[msProductOptions] The resource with id = {$product->id} is not instance of msProduct.";
}

$ignoreOptions = array_map('trim', explode(',', $modx->getOption('ignoreOptions', $scriptProperties, '')));
$onlyOptions = array_map('trim', explode(',', $modx->getOption('onlyOptions', $scriptProperties, '')));
$sort_key = array_map('trim', explode(',', $modx->getOption('sort_key', $scriptProperties, '')));
$groups = !empty($groups)
    ? array_map('trim', explode(',', $groups))
    : array();
/** @var msProductData $data */
if ($data = $product->getOne('Data')) {
    $optionKeys = $data->getOptionKeys();
}
if (empty($optionKeys)) {
    return '';
}
$productData = $product->loadOptions();

$options = array();
foreach ($optionKeys as $key) {
    // Filter by key
    if (!empty($onlyOptions) && $onlyOptions[0] != '' && !in_array($key, $onlyOptions)) {
        continue;
    } elseif (in_array($key, $ignoreOptions)) {
        continue;
    }
    $option = array();
    foreach ($productData as $dataKey => $dataValue) {
        $dataKey = explode('.', $dataKey);
        if ($dataKey[0] == $key && (count($dataKey) > 1)) {
            $option[$dataKey[1]] = $dataValue;
        }
    }
    $option['value'] = $product->get($key);

    // Filter by groups
    $skip = !empty($groups) && !in_array($option['category'], $groups) && !in_array($option['category_name'], $groups);
    if ($skip || empty($option['value'])) {
        continue;
    }
    $options[$key] = $option;
}

    // sorting options
    if ($sort_key) {
      $sort = explode(",", $sort_key);
      $sort = array_flip($sort);
      uksort($options, function($a, $b) use ($sort) {
          return $sort[$a] < $sort[$b] ? -1 : 1;
      });
    }
    // limit options
    if ($limit) {
      $options = array_slice($options, 0, $limit);
    }


/** @var pdoTools $pdoTools */
$pdoTools = $modx->getService('pdoTools');

$options_arr = array_replace_recursive($scriptProperties, array('options' => $options));
return $pdoTools->getChunk($tpl, $options_arr);