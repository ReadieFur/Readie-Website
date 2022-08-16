<?php
    $title = 'Project | Readie\'s Repo';

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
    <link rel="stylesheet" href="./project.css">
    <script src="https://cdn-readie.global-gaming.co/resources/scripts/marked/marked-2.0.3.min.js"></script>
    <script src="./project.js" type="module"></script>
</head>
<header id="header"><?php echo execAndRead("{$SITE_ROOT}/assets/php/header.php"); ?></header>
<body>
    <section id="projectContainer">
        <!--I'd like to add a lot more to the page but due to the limited number of API requests you get per hour, even with caching I fear that too many API calls will be made-->
        <div class="leftRight">
            <h3 id="title">Project</h3>
            <p id="ratelimitText">Rate limit</p>
        </div>
        <hr>
        <table id="mainContainer">
            <tbody>
                <tr>
                    <td>
                        <p id="description" class="light">Description</p>
                    </td>
                    <td>
                        <div id="links" class="joinButtons">
                            <a id="projectHome" class="asButton">Project home</a>
                            <a id="githubSource" class="asButton">Github source</a>
                        </div>
                        <!--<p>Latest release</p>--> <!--https://api.github.com/repos/ReadieFur/BSDataPuller/releases-->
                        <p id="license">License</p>
                        <span id="language" class="light">Language</span>
                        <span id="stars" class="light">Stars</span>
                        <span id="forks" class="light">Forks</span>
                        <p id="updatedAt" class="light">Updated at</p>
                    </td>
                </tr>
            </tbody>
        </table>
        <table id="readmeContainer">
            <tbody>
                <tr>
                    <th>
                        <h4 id="readme">README.md</h4>
                    </th>
                </tr>
                <tr>
                    <td>
                        <div id="readmeContents"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</body>
<footer id="footer"><?php echo execAndRead("{$SITE_ROOT}/assets/php/footer.php"); ?></footer>
</html>