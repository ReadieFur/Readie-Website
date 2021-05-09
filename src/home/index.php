<?php
    $title = 'Home | Readie\'s Repo';

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
    <div>
        <section id="splashTitleContainer">
            <div class="center">
                <!--Think of a different name other than readie-->
                <h1>Readie's repo</h1>
                <h4 class="light">The home for my projects and more</h4>
                <table>
                    
                </table>
            </div>
        </section>
        <!--add an about me here-->
        <section id="projects">
            <div class="leftRight">
                <h3>Projects</h3>
                <p id="ratelimitText">Rate limit</p>
            </div>
            <hr>
            <br>
            <!--Only show the pinned projects here, show the rest on the /projects page-->
            <table>
                <tbody id="pinnedProjects">
                    <!--<tr>
                        <td>
                            <a class="bottomStrip">
                                <div>
                                    <h3>TD1</h3>
                                    <p>
                                        Aliquam volutpat ligula eu sagittis congue. Fusce accumsan dolor vitae leo congue interdum. Ut at nunc vel arcu ornare sollicitudin. Proin non tristique elit. Praesent et massa rhoncus lectus semper rutrum. Vivamus elementum nisi enim, eget accumsan mi lacinia nec. Aliquam consectetur ante vitae enim sollicitudin accumsan. Pellentesque sodales elit sed risus suscipit, ac lacinia odio bibendum. Vivamus ut sapien sit amet neque maximus interdum nec non velit.
                                    </p>
                                    <div>
                                        <span>Language</span>
                                        <span>Stars</span>
                                        <span>Forks</span>
                                    </div>
                                </div>
                            </a>
                        </td>
                    </tr>-->
                </tbody>
            </table>
            <br>
            <div class="center x text">
                <a class="asButton" href="<?php echo $WEB_ROOT; ?>/projects/">View all</a>
            </div>
        </section>
    </div>
</body>
<footer id="footer"><?php echo execAndRead("{$SITE_ROOT}/assets/php/footer.php"); ?></footer>
</html>