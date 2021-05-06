<?php
    $title = 'Socials | Readie\'s Repo';

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
    <section>
        <h3>Socials</h3>
        <hr>
    </section>
    <section id="socialsList">
        <a class="asButton fill" href="https://global-gaming.co/discord/">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path d="M40 12s-4.586-3.59-10-4l-.488.977C34.406 10.176 36.652 11.89 39 14c-4.047-2.066-8.04-4-15-4-6.96 0-10.953 1.934-15 4 2.348-2.11 5.02-4.016 9.488-5.023L18 8c-5.68.535-10 4-10 4s-5.121 7.426-6 22c5.16 5.953 13 6 13 6l1.64-2.184C13.856 36.848 10.716 35.121 8 32c3.238 2.45 8.125 5 16 5s12.762-2.55 16-5c-2.715 3.121-5.855 4.848-8.64 5.816L33 40s7.84-.047 13-6c-.879-14.574-6-22-6-22zM17.5 30c-1.934 0-3.5-1.79-3.5-4s1.566-4 3.5-4 3.5 1.79 3.5 4-1.566 4-3.5 4zm13 0c-1.934 0-3.5-1.79-3.5-4s1.566-4 3.5-4 3.5 1.79 3.5 4-1.566 4-3.5 4z"/>
                </svg>
                <h3>Discord</h3>
                <h4>Readie#6594</h4>
            </div>
        </a>
        <a class="asButton fill" href="https://youtube.com/kofreadie/">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M23,9.71a8.5,8.5,0,0,0-.91-4.13,2.92,2.92,0,0,0-1.72-1A78.36,78.36,0,0,0,12,4.27a78.45,78.45,0,0,0-8.34.3,2.87,2.87,0,0,0-1.46.74c-.9.83-1,2.25-1.1,3.45a48.29,48.29,0,0,0,0,6.48,9.55,9.55,0,0,0,.3,2,3.14,3.14,0,0,0,.71,1.36,2.86,2.86,0,0,0,1.49.78,45.18,45.18,0,0,0,6.5.33c3.5.05,6.57,0,10.2-.28a2.88,2.88,0,0,0,1.53-.78,2.49,2.49,0,0,0,.61-1,10.58,10.58,0,0,0,.52-3.4C23,13.69,23,10.31,23,9.71ZM9.74,14.85V8.66l5.92,3.11C14,12.69,11.81,13.73,9.74,14.85Z"/>
                </svg>
                <h3>YouTube</h3>
                <h4>Readie</h4>
            </div>
        </a>
        <a class="asButton fill" href="https://twitch.tv/kof_readie/">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
                    <path d="M215.2 260.8h-58.7L117.4 300H78.3v-39.2H6.6V52.2L26.1 0h267.3v182.6l-78.2 78.2zm52.2-91.2V26.1H52.2v189.1h58.7v39.1l39.1-39.1h71.7l45.7-45.6z"/>
                    <path d="M195.6 78.3v78.3h26.1V78.3h-26.1zm-71.7 78.2H150V78.3h-26.1v78.2z"/>
                </svg>
                <h3>Twitch</h3>
                <h4>kof_readie</h4>
            </div>
        </a>
        <a class="asButton fill" href="https://github.com/kofreadie/">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z"/>
                </svg>
                <h3>GitHub</h3>
                <h4>kOFReadie</h4>
            </div>
        </a>
        <a class="asButton fill" href="https://global-gaming.co/">
            <div>
                <svg id="Panda" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 2000">
                    <title>Panda monochrome</title>
                    <g id="Features">
                        <g id="Mouth">
                            <g id="Teeth">
                                <path d="M1192.39,1415.18v0h0Z"/>
                                <path d="M1192.2,1416.4h0l0,.19Z"/>
                                <path d="M1242.48,1296.89l-.71-4.75-1.33-5.18-1.92-5.15-1.88-3.92-1.81-3.18-1.88-2.9-2.25-3.09-2-2.48-3.58-4-4.27-4.11-2.45-2.14-2.68-2.16-3.21-2.4-3.18-2.18-2.28-1.45-2.88-1.7-1.51-.81.87,3,1,4,.77,3.62.73,4.51.47,4.58.15,5.9-.32,5.08-.63,4.34-1.08,4.6-1.16,3.58-1.67,4-2.72,5s-2.38,3.55-2.56,3.79-2.26,2.85-2.26,2.85l-3.72,4-3.13,2.87-3.94,3.15-4.14,2.87-4.45,2.68-4.58,2.43-3.85,1.82-4.35,1.84-4.06,1.54-3.72,1.28-1.5.48-4.11,1.23-9.3,2.35-5.66,1.15-7,1.16-5.58.71-4.46.43-2.65.11h-44.42l-8-1.13-6.43-1.13-4.69-.94-4.5-1-5.6-1.36-5.38-1.43-8.95-2.64-7.5-2.44-7.17-2.55-5.65-2.15-3.55-1.43-3.76-1.57-2.62-1.15-3.08-1.41-3.08,1.41-2.62,1.15-3.76,1.57-3.55,1.43-5.65,2.15-7.17,2.55-7.49,2.44-9,2.64-5.38,1.43-5.6,1.36-4.5,1-4.69.94L924,1335.2l-8,1.13H871.58l-2.65-.11-4.46-.43-5.58-.71-7-1.16-5.66-1.15-9.3-2.35-4.11-1.23-1.5-.48-3.72-1.28-4.06-1.54-4.35-1.84-3.85-1.82-4.58-2.43-4.45-2.68-4.14-2.87-3.94-3.15-3.13-2.87-3.72-4s-2.08-2.61-2.26-2.85-2.56-3.79-2.56-3.79l-2.72-5-1.67-4-1.16-3.58-1.08-4.6-.63-4.34-.32-5.08.15-5.9.47-4.58.73-4.51.77-3.62,1-4,.87-3-1.5.81-2.89,1.7-2.28,1.45-3.17,2.18-3.22,2.4-2.67,2.16-2.46,2.14-4.27,4.11-3.58,4-2,2.48-2.25,3.09-1.88,2.9-1.81,3.18-1.88,3.92-1.92,5.15-1.33,5.18-.71,4.75-.23,6,.3,4.51,1,5.9,1.29,4.81,1.64,4.63,2.42,5.45,3.22,5.92,3.05,4.8,4.94,6.73,7.53,8.75,7.63,7.7,7,6.39,3.33,2.83,6.95,43.91,0,.27h0c0,.2.08.49.14.86l.08.52,0-.3.23,1.46-.05-.34.12.77c0,.23.07.47.11.72l.36,2.25-.06-.37c.07.43.14.89.22,1.38l0-.2.16,1-.06-.37c.12.74.24,1.54.38,2.4l.1.65-.05-.32c.09.54.18,1.11.27,1.7l.23,1.43-.12-.73c.28,1.73.58,3.67.92,5.82l-.05-.29.42,2.64-.05-.33c.09.54.17,1.08.26,1.65l0-.31.16,1,0-.27c0,.2.06.41.1.61l.08.55-.06-.37c.09.53.17,1.06.26,1.61l0-.23.09.57,0-.2c.13.81.26,1.64.4,2.5,9.92,62.72,54,152,54,152,48,57.33,141.16,64,141.16,64s93.16-6.67,141.16-64c0,0,44.09-89.28,54-152,.14-.86.27-1.69.4-2.5l0,.22.1-.62a2,2,0,0,1,0,.26c.09-.55.17-1.08.26-1.61,0,.16-.05.31-.08.46l.15-1c0-.1,0-.2,0-.3l0,.13.12-.76,0,.2c.09-.57.17-1.11.26-1.65l0,.12.14-.85c0-.1,0-.19,0-.29l.18-1.12,0,.12c.06-.36.11-.71.17-1.06l.2-1.28c0-.29.09-.6.14-.88l0,.16.15-.91v0l0-.15.46-2.94c-.11.67-.21,1.35-.32,2q.29-1.84.54-3.42l.2-1.26v0l.2-1.29c.1-.65.2-1.25.29-1.8l0-.23,0,.14c0-.15,0-.29.07-.44l.1-.62,0,.24c0-.22.07-.44.1-.64l.12-.74c0-.29.09-.56.13-.81,0,.16-.06.36-.09.53l.14-.86.08-.53,0,.12.13-.81v-.07l.14-.89,0-.16v-.12l6.93-43.83,3.33-2.83,7-6.39,7.64-7.7,7.52-8.75,4.94-6.73,3-4.8,3.22-5.92,2.42-5.45,1.64-4.63,1.29-4.81,1-5.9.3-4.51Zm-141.94,267.78s.33,23.5-71.67,44.33H960c-72-20.83-71.67-44.33-71.67-44.33v-29.84c0-10.5,15.67-41,19.17-42s22.33,55,22.33,55l5.5-16.5c18.34,24.5,57.5,25.34,57.5,25.34H996s39.17-.84,57.5-25.34l5.5,16.5s18.83-56,22.33-55,19.17,31.5,19.17,42ZM1137.12,1447l-26-59.67v17.34c-10.67-5.34-114.84-7.67-114.84-7.67h-3.45s-104.16,2.33-114.83,7.67v-17.34L852,1447s-30-30.67-38-75c0,0,117,20.67,178.83-13h3.45c61.84,33.67,178.84,13,178.84,13C1167.12,1416.33,1137.12,1447,1137.12,1447Z"/>
                            </g>
                        </g>
                        <g id="Nose">
                            <path id="Nose-2" data-name="Nose" d="M992.83,1217.5s-33.83,3-98.83,3-12.34-79.5,98.83-79.5,167.17,79.5,100.67,79.5C1093.5,1220.5,1000.83,1219.67,992.83,1217.5Z"/>
                            <path id="Upper_Nose" data-name="Upper Nose" d="M1150.46,1154.59s-52.84-70.36-155.33-72v0l-1.82,0-1.81,0v0c-102.49,1.63-155.33,72-155.33,72,54.48-38.6,143.4-43.5,157.14-44C1007.06,1111.09,1096,1116,1150.46,1154.59Z"/>
                        </g>
                        <path id="Forhead" d="M1091,828.63s-102.5,190-243.5,2.7C847.5,831.33,973.5,966.75,1091,828.63Z"/>
                    </g>
                    <g id="Accents">
                        <g id="Right_Side" data-name="Right Side">
                            <path d="M560.63,1243.31c0,.32,0,.63-.07,1C560.58,1243.94,560.6,1243.62,560.63,1243.31Z"/>
                            <path d="M561.08,1237.26l-.2,2.59C561,1239,561,1238.11,561.08,1237.26Z"/>
                            <path d="M560.88,1239.85c-.08,1.13-.17,2.29-.25,3.46C560.71,1242.2,560.8,1241,560.88,1239.85Z"/>
                            <path d="M560.3,1247.76c-.12,1.65-.24,3.21-.35,4.67C560.07,1250.89,560.18,1249.33,560.3,1247.76Z"/>
                            <path d="M561.26,1234.78c-.06.81-.12,1.63-.18,2.48C561.14,1236.45,561.2,1235.63,561.26,1234.78Z"/>
                            <path d="M560.3,1247.74v0Z"/>
                            <path d="M561.4,1232.88c0,.56-.08,1.13-.13,1.71C561.32,1234,561.36,1233.46,561.4,1232.88Z"/>
                            <path d="M560.4,1246.41l-.1,1.33C560.33,1247.29,560.37,1246.85,560.4,1246.41Z"/>
                            <path d="M560.52,1244.71l-.06.84Z"/>
                            <path d="M560.46,1245.55l-.06.86Z"/>
                            <path d="M560.56,1244.26c0,.15,0,.3,0,.45Z"/>
                            <path d="M561.27,1234.59v0Z"/>
                            <path d="M562.11,1223.36l0,.38Z"/>
                            <path d="M562.06,1224v0Z"/>
                            <path d="M562.08,1223.74l0,.25Z"/>
                            <path d="M562.12,1223.22v0Z"/>
                            <path d="M562.12,1223.19v0Z"/>
                            <path d="M561.81,1227.33c0,.72-.1,1.43-.16,2.13C561.71,1228.69,561.76,1228,561.81,1227.33Z"/>
                            <path d="M561.49,1231.69l-.09,1.19Z"/>
                            <path d="M561.65,1229.46c0,.7-.1,1.44-.16,2.23C561.54,1231,561.6,1230.22,561.65,1229.46Z"/>
                            <path d="M562,1224.41c0,.72-.13,1.71-.22,2.92C561.88,1226.38,562,1225.4,562,1224.41Z"/>
                            <path d="M562.05,1224.13l0,.28Z"/>
                            <path d="M562.13,1223.13v0Z"/>
                            <path d="M558.61,1270.53l0,.28Z"/>
                            <path d="M558.67,1269.65l-.06.88C558.63,1270.27,558.65,1270,558.67,1269.65Z"/>
                            <path d="M558.74,1268.8l-.07.85C558.69,1269.39,558.71,1269.11,558.74,1268.8Z"/>
                            <path d="M558.59,1270.81l0,.31Z"/>
                            <path d="M897,942.5c33.33,88.83-47.17,79.33-47.17,79.33C821.67,1012.17,695.5,919,695.5,919c26-74.5,96.75-142,96.75-142l-4.5,2.11-3,1.47-2.11,1.09-3,1.63-1.28.71-2.5,1.41-1.62.94-2.13,1.27L770,788.9l-1.7,1.06-2.8,1.79-1.77,1.17-1.92,1.28-2.12,1.46-3.08,2.17-1.9,1.37-3.41,2.53L749.71,803l-4.24,3.33-2.24,1.81-2.18,1.79-2.19,1.85-2.15,1.83L735.09,815l-1.54,1.36-1.42,1.27-2.08,1.89-2.32,2.14L726,823.28l-1.6,1.53-2.6,2.52-1.93,1.9-1.92,1.92-1.94,2-1.87,1.92-2,2.11-2.34,2.49-2.58,2.8-1.7,1.88L703.07,847l-1.93,2.2L699,851.73l-1.71,2-2,2.39-1.72,2.07-1.86,2.28-2.93,3.64-2.71,3.44-2.31,3-2.88,3.8-2.49,3.37-2,2.81-2.38,3.35L671.75,887l-2,2.89-3.91,5.9-1.41,2.2-1.78,2.88h-5.59l-2.51-.8-3.2-1-2.33-.65-2.54-.65-2.93-.7-4.42-.92-3.89-.68-4-.57-4-.43-3.67-.27-3.87-.15h-4.46l-5,.25-3.62.34-3.72.49-6.34,1.21-4.58,1.18-3.36,1-2.76,1-2.42.93-2.71,1.14-3.58,1.68-4.26,2.26-2.59,1.52-3.21,2-2.76,1.93-2.55,1.9-2.64,2.13-2.33,2-2.26,2.07-2.54,2.46-3.26,3.44-2.11,2.39L544,930.6l-2.41,3.13-1.6,2.2-2.29,3.36-3.08,4.93-2.94,5.26-.88,1.72-1.44,3-.82,1.84-1,2.5v14.17H533l11.91-4.11,1.13-.39,1.36-.47,1-.36,1.24-.42.2,1.51.68,5,.76,5.09,1.18,7.36,1.23,6.88,2.1,10.6,1.38,6.27,1.6,6.73,1.14,4.5,1.7,6.25,2.24,7.62,1.69,5.32,1.2,3.58,1.23,3.48,1.49,4.06,1.2,3.09.78,1.94,1.52,3.66.9,2.07.76,1.68,1.1,2.35.59,1.23.71,1.43.79,1.55,1.08,2,.62,1.09.36.62.23.37v8.38l-1.07,1.22-2.82,3.56-2.11,3-2.86,4.54-2.76,5.09-1.45,3-1.83,4.25-1.81,4.86-1.32,4-1.25,4.41-.42,1.58-.9,3.83-1,4.74-.43,2.38-.61,3.92-.64,4.92-.34,3.17-.35,4.12-.29,4.56-.08,1.69-.08,1.92v15.22l.09,2.32.27,5.38.62,8.07.19,2,.24,2.26.25,2.32.25,2.08.27,2.14.89,6.26,1.55,9.15,1.78,8.47c8.12-109.55,46.62-112.63,46.62-112.63,75.08,57.5,249.75-30.25,249.75-30.25C1023,1068.5,897,942.5,897,942.5ZM603.75,958.88s11.5,87,58.88,108.75C662.63,1067.63,598.83,1062.08,603.75,958.88Zm53.58,85.29c16.84,14,104.84,14.16,104.84,14.16C679.83,1082.67,657.33,1044.17,657.33,1044.17Zm60.17,38.5s-42.67,22.5-76.83-8.17C640.67,1074.5,668,1090.33,717.5,1082.67Zm-44,23s42,2.29,118.67-39.27C792.17,1066.4,743.5,1119.33,673.5,1105.67Zm45.3-64.92s-64.47-14.45-64.47-52.94c0,0-1-13.89,42-3.38,37.42,8.64,76.37,27.22,106.65,56.32Z"/>
                            <path d="M558.56,1271.12c0,.38,0,.61,0,.67Z"/>
                            <path d="M558.84,1267.43c0,.51-.07,1-.1,1.37C558.77,1268.38,558.8,1267.93,558.84,1267.43Z"/>
                            <path d="M558.52,1271.79Z"/>
                            <path d="M559.51,1258.33l0,.35Z"/>
                            <path d="M559.69,1256l0,.57Z"/>
                            <path d="M559.65,1256.54l-.06.8Z"/>
                            <path d="M559.59,1257.34c0,.33-.05.66-.08,1C559.54,1258,559.56,1257.68,559.59,1257.34Z"/>
                            <path d="M559.76,1255.07c0,.31,0,.61-.07.9C559.71,1255.68,559.73,1255.38,559.76,1255.07Z"/>
                            <path d="M559.4,1259.89c-.07,1-.14,1.85-.2,2.69C559.26,1261.72,559.33,1260.82,559.4,1259.89Z"/>
                            <path d="M560,1252.43c-.06.89-.13,1.78-.19,2.64C559.82,1254.23,559.88,1253.35,560,1252.43Z"/>
                            <path d="M559.2,1262.58c-.14,1.83-.26,3.48-.36,4.85C558.93,1266.14,559.05,1264.53,559.2,1262.58Z"/>
                            <path d="M559.49,1258.68l-.09,1.21Z"/>
                        </g>
                        <g id="Left_Side" data-name="Left Side">
                            <path d="M1874,322.5s-10.17-1.33-29,6.17c0,0-63.17-197.84-303.75-179.42,0,0-78.58,221.81-178.58,284.38,0,0-150.8-44.61-368.17-1.11-217.37-43.5-368.17,1.11-368.17,1.11-100-62.57-178.58-284.38-178.58-284.38C207.17,130.83,144,328.67,144,328.67c-18.83-7.5-29-6.17-29-6.17C14.37,588.36,158.5,633,158.5,633v14.25c-12.5.5-10.75,8.25-10.75,8.25,13.5,25,129.5,19.63,129.5,19.63-16.37,25.25-17.08,38.37-17.08,38.37C280.83,714,282,716,282,716c-197.62,200.39-35.25,531.75-35.25,531.75,14.25-2.25,15.5-5.75,15.5-5.75,103.25,286,284.58,318.83,284.58,317.33V1531.5c5.84-4.67,71.55,11.13,71.55,11.13,44,54.95,119.62,154.87,124.29,154.87s11.83-9,11.83-9c106,148.48,214.68,153.46,240,152.42,25.32,1,134-3.94,240-152.42,0,0,7.17,9,11.83,9s80.25-99.92,124.3-154.87c0,0,65.7-15.8,71.54-11.13v27.83c0,1.5,181.33-31.33,284.58-317.33,0,0,1.25,3.5,15.5,5.75,0,0,162.37-331.36-35.25-531.75,0,0,1.17-2,21.83-2.5,0,0-.7-13.12-17.08-38.37,0,0,116,5.37,129.5-19.63,0,0,1.75-7.75-10.75-8.25V633S1974.63,588.36,1874,322.5ZM199.88,435.44H166.94C140.21,581.21,255,619.92,255,619.92c-165-19.59-104.62-228.5-104.62-228.5h27.45C192.51,295.17,265.75,265,265.75,265,198.5,344.5,199.88,435.44,199.88,435.44Zm1481.51-103s4.91,151.41-125.75,202.75l-30.25-21.75S1654.3,463.17,1681.39,332.42Zm-1376.14-.17c27.08,130.75,156,181,156,181L431,535C300.33,483.67,305.25,332.25,305.25,332.25Zm7.35,802.68-23.25,41.25s-96.44-298.66,97.84-482H365s90.09-191.87,446.5-216.08c0,0-268.67,36.66-380,188h34s-193.67,144.66-157.33,432L332.35,1079s28.92,202.38,126.38,347.77C458.73,1426.74,341.35,1329.05,312.6,1134.93ZM744,1540l-1.5,52.25c-95-90.09-77-258.92-77-258.92-.17,161.67,65.75,203.42,65.75,203.42l11.25-49.25C786.67,1689.33,916,1743.63,916,1743.63,786,1716.25,744,1540,744,1540Zm500.14,52.42-1.5-52.25s-42,176.25-172,203.62c0,0,129.33-54.29,173.5-256.12l11.25,49.25s65.91-41.75,65.75-203.42C1321.14,1333.5,1339.08,1502.32,1244.14,1592.42Zm136.53-198.59,18.66-49.16s-81.16-35.34-111.25-55.5c0,0,.67,122.33-40.95,154.33,0,0-5.13-33.67-23.8-60.75,0,0,38.92,290.5-231.2,333.38,0,0-244.3-16-232.71-330.55,0,0-11.67,10.67-20.67,57.42,0,0-26.75-6.5-42-153.75l-107,55.75,16.92,50.67s-146-68-170-302.67c0,0-8-11.33-18,84.67,0,0-17.34-28-10-282,0,0-14,4-24.67,14,0,0-5.33-327.67,332.67-157.5,0,0-61.09-94.25-173.54-110,0,0,220.87-217.13,449.54-149.13,0,0,210.33-70,450.83,148.5,0,0-111.5,12.17-173,110.83,0,0,318.17-178.66,331.17,157.34,0,0-20.67-15.17-24.92-17,0,0,11.79,193.45-7.81,286.25,0,0,0-38.05-16.81-85.13C1552.13,1093.75,1538.33,1301.67,1380.67,1393.83Zm316.61-217.48L1674,1135.1c-28.75,194.12-146.12,291.81-146.12,291.81,97.46-145.4,126.37-347.77,126.37-347.77l24.17,19.16c36.33-287.33-157.33-432-157.33-432h34c-111.34-151.33-380-188-380-188,356.41,24.22,446.5,216.09,446.5,216.09h-22.17C1793.73,877.69,1697.28,1176.35,1697.28,1176.35Zm34.36-556.27s114.79-38.7,88.06-184.48h-32.94s1.38-90.93-65.87-170.43c0,0,73.24,30.17,87.91,126.41h27.46S1896.64,600.5,1731.64,620.08Z"/>
                            <path d="M1329.3,901.5l-192.88,120.58h-22.09S1066.25,1017,1086.5,942c0,0-118,130,47,138,0,0,293.17,169.33,302.83-115.83l24.8,8.46V959S1425.61,864.67,1329.3,901.5Zm-39,83.1c43-10.51,42,3.38,42,3.38,0,38.48-64.46,52.94-64.46,52.94h-84.2C1213.91,1011.82,1252.87,993.23,1290.29,984.6Zm39,59.73s-22.5,38.5-104.83,14.17C1224.47,1058.5,1312.47,1058.33,1329.3,1044.33Zm-134.83,22.23c76.67,41.57,118.67,39.27,118.67,39.27C1243.14,1119.5,1194.47,1066.56,1194.47,1066.56Zm74.67,16.27c49.5,7.67,76.83-8.16,76.83-8.16C1311.8,1105.33,1269.14,1082.83,1269.14,1082.83Zm54.87-15c47.38-21.71,58.88-108.75,58.88-108.75C1387.8,1062.25,1324,1067.79,1324,1067.79Z"/>
                        </g>
                    </g>
                </svg>
                <h3>Global Gaming</h3>
                <h4>Online community</h4>
            </div>
        </a>
        <a class="asButton fill" href="https://instagram.com/readie_xv/">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.3,7.3,0,0,0-2.43.47A4.78,4.78,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.78,4.78,0,0,0,1.77,1.15,7.3,7.3,0,0,0,2.43.47C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.3,7.3,0,0,0,2.43-.47,4.7,4.7,0,0,0,1.77-1.15,4.85,4.85,0,0,0,1.16-1.77,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.06,3.06,0,0,1-.75,1.15,3.19,3.19,0,0,1-1.15.75,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.73,5.73,0,0,1,6.1,19.8,3.27,3.27,0,0,1,5,19.05a3,3,0,0,1-.74-1.15A5.54,5.54,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.54,5.54,0,0,1,4.21,6.1,3,3,0,0,1,5,5,3.14,3.14,0,0,1,6.1,4.2,5.73,5.73,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34A3.06,3.06,0,0,1,19.05,5,3.06,3.06,0,0,1,19.8,6.1,5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16ZM12,6.87A5.13,5.13,0,1,0,17.14,12,5.12,5.12,0,0,0,12,6.87Zm0,8.46A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z"/>
                </svg>
                <h3>Instagram</h3>
                <h4>readie_xv</h4>
            </div>
        </a>
        <a class="asButton fill" href="https://ko-fi.com/kofreadie">
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M2.608,19.5c0,0,8.267-0.023,11.966-0.048c2.438-0.418,2.683-2.517,2.658-3.663c4.352,0.235,7.422-2.777,6.649-6.784C23.108,4.998,19.022,4.5,19.022,4.5H0.723c-0.604,0-0.679,0.783-0.679,0.783s-0.082,7.184-0.022,11.596C0.186,19.257,2.608,19.5,2.608,19.5z M17.31,7.373h1.77c0,0,1.971,0.541,1.971,2.588c0,1.877-0.985,2.616-2.059,2.958c-0.928,0.114-1.682,0.027-1.682,0.027V7.373z M4.265,8.766C5.216,7.775,7.27,7.701,8.628,9.165c0,0,1.565-1.748,3.468-0.945c1.904,0.804,1.832,2.953,0.723,4.229c-1.246,1.425-4.011,3.9-4.011,3.9s-0.121,0.117-0.31,0.023c-0.076-0.056-0.108-0.088-0.108-0.088c-0.443-0.432-3.368-2.991-4.034-3.878C3.647,11.459,3.315,9.757,4.265,8.766z"/>
            </svg>
                <h3>Ko-Fi</h3>
                <h4>kOFReadie</h4>
            </div>
        </a>
    </section>
</body>
<footer id="footer"><?php echo execAndRead("{$SITE_ROOT}/assets/php/footer.php"); ?></footer>
</html>