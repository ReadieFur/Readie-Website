<?php
    global $WEB_ROOT;
    global $DOMAIN;
?>
<link rel="stylesheet" type="text/css" href="<?php echo $WEB_ROOT ?>/assets/css/header.css"/>
<section>
    <span class="bottomStripThin"></span>
    <div class="titleContainer">
        <a href="<?php echo $WEB_ROOT ?>/">
            <img class="small titleIcon" src="https://cdn-readie.global-gaming.co/images/team/members/readiecircle.png">
            <h3 class="title">Readie's Repo</h3>
        </a>
    </div>
    <div class="navigationContainer">
        <!--I should have the page scroll if the user is already on the main page, or I could move this to it's own page.-->
        <a href="<?php echo $WEB_ROOT ?>/projects/">Projects</a>
        <a href="<?php echo $WEB_ROOT ?>/socials/">Socials</a>
        <div class="naviDropdown">
            <a>Account +</a>
            <div class="dropdownContent">
                <div></div>
                <div class="bottomStrip">
                    <a id="accountButton">Managment</a>
                    <a id="darkMode">Dark Mode</a>
                </div>                
            </div>
        </div>
    </div>
</section>
<iframe id="accountContainer" src="//api-readie.global-gaming.<?php echo $DOMAIN[count($DOMAIN) - 1]; ?>/account/"></iframe>
<div id="alertBoxContainer">
    <div class="background"></div>
    <div id="alertBox">
        <input id="alertBoxTextBox" type="text">
        <p id="alerBoxText"></p>
        <p class="dismissText"><small>Click to dismiss this messaege.</small></p>
    </div>
</div>