<?php
    $title = 'Home | Readie';

    $WEB_ROOT;
    $SITE_ROOT;
    //This root page has to work a little differently, I do plan to remake this bit this soon.
    $DOCUMENT_ROOT = explode('/', $_SERVER["DOCUMENT_ROOT"]);
    array_pop($DOCUMENT_ROOT);
    $DOCUMENT_ROOT = implode('/', $DOCUMENT_ROOT);
    require_once "$DOCUMENT_ROOT/roots.php";
    require_once "$SITE_ROOT/assets/php/main.php";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?php echo execAndRead("{$SITE_ROOT}/assets/php/head.php"); ?>
    <link rel="stylesheet" href="./index.css">
    <script src="./index.js" type="module"></script>
</head>
<header id="header"><?php echo execAndRead("{$SITE_ROOT}/assets/php/header.php"); ?></header>
<body>
</body>
<footer id="footer"><?php echo execAndRead("{$SITE_ROOT}/assets/php/footer.php"); ?></footer>
</html>