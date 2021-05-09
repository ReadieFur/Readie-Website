<?php
    $title = 'Projects | Readie\'s Repo';

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
    <link rel="stylesheet" href="./projects.css">
    <script src="./projects.js" type="module"></script>
</head>
<header id="header"><?php echo execAndRead("{$SITE_ROOT}/assets/php/header.php"); ?></header>
<body>
    <section id="reposList">
        <div class="leftRight">
            <h4>Projects&nbsp;<span id="ratelimitText" class="p light">Rate limit</span></h4>
            <form id="search">
                <!--Can't have the space between these two elements here, I could make a workaround for this but I can't be arsed.-->
                <input id="searchText" type="text" placeholder="Search"><input class="asButton" type="submit" value="Search">
            </form>
        </div>
        <hr>
        <table id="repos">
            <tbody>
                <tr>
                    <th class="projectColumn">Project</th>
                    <th class="descriptionColumn">Description</th>
                    <th class="detailsColumn">Details</th>
                </tr>
            </tbody>
            <tbody>
                <!--<tr class="listItem">
                    <td class="projectColumn"><h4>BSDataPuller</h4></td>
                    <td class="descriptionColumn">Gathers data about the current map you are playing to then be sent out over a websocket for other software to use, e.g. A web overlay like BSDP-Overlay. This mod works with multi PC setups!</td>
                    <td class="detailsColumn">
                        <p class="license">License</p>
                        <span class="language light">Language</span>
                        <span class="stars light">Stars</span>
                        <span class="forks light">Forks</span>
                        <p class="updatedAt light">Updated at</p>
                    </td>
                </tr>-->
            </tbody>
        </table>
        <div id="pages" class="joinButtons">
            <!--<button class="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>-->
        </div>
        <br>
        <p id="resultsText">Showing results: 0-0 of 0</p>
    </section>
</body>
<footer id="footer"><?php echo execAndRead("{$SITE_ROOT}/assets/php/footer.php"); ?></footer>
</html>