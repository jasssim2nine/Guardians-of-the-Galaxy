﻿/// <reference path="managers/GameSounds.js" />
/// <reference path="managers/Sound.js" />
/// <reference path="Loader.js" />
var g_canvas;
var g_context;
var g_soundsLoaded;
var g_isChr;
var g_onscreenControls;
var g_paused;
var g_renderInterval;
var g_clockInterval;

var g_totalItems;
var g_itemsLoaded;

var g_background;
var g_foreground;

var g_ship;
var g_gameState;
var g_highScore;

var g_powerups;
var g_floatyText;
var g_projectiles;
var g_enemyProjectiles;
var g_enemies;
var g_afterEffects;
var g_rainbow;

var g_basicShotSound;
var g_laserShotSound;
var g_dinkSound;
var g_smallExplodeSound;
var g_bonusSound;
var g_explodeSound;
var g_artifact_chard_sound;
var g_double_sound;
var g_gem_sound;
var g_gun_sound;
var g_shot_sound;
var g_speed_sound;

var g_levelDirector;
var g_shotsFired;
var g_shotsRequired;
var g_accuracy;
var g_showAccuracy;
var g_enemiesDestroyed;


//
// main() is called once the game has loaded and the user has clicked
// on the "new game" button on the splash screen. This is a clean slate
// with no registered timers or event listeners.
//
function main() {
    var level_1_loop = document.getElementById("level_1_loop");
    var bossLoop = document.getElementById("boss_loop");

    //dbg("engine = " + navigator.userAgent, false);
    g_rainbow = new Array("yellow", "orange", "white", "red");

    document.addEventListener('keydown', keyDown, false);
    document.addEventListener('keyup', keyUp, false);

    if (g_basicShotSound == null) {

        g_basicShotSound = new Sound("basic_shot", 5);
        g_laserShotSound = new Sound("laser", 5);
        g_smallExplodeSound = new Sound("small_explode", 5);
        g_bonusSound = new Sound("bonus_sound", 4);
        g_explodeSound = new Sound("explode", 3);

        g_artifact_chard_sound = new Sound("artifact_chard_sound", 2);
        g_double_sound = new Sound("double_sound", 2);
        g_gem_sound = new Sound("gem_sound", 4);
        g_gun_sound = new Sound("gun_sound", 2);
        g_shot_sound = new Sound("shot_sound", 3);
        g_speed_sound = new Sound("speed_sound", 3);
    }

    g_highScore = 0;
    g_gameState = "setup";
    g_levelDirector = new LevelDirector();

    //
    // telling the level director to start will put the clock and
    // render loops on interval timers
    //
    g_levelDirector.startLevel();
}

//
// map a sound name to a global audio object
//
function lookupSound(name) {
    if (name == "double_sound")
        return g_double_sound;
    else if (name == "gem_sound")
        return g_gem_sound;
    else if (name == "gun_sound")
        return g_gun_sound;
    else if (name == "shot_sound")
        return g_shot_sound;
    else if (name == "speed_sound")
        return g_speed_sound;

    dbg("Failed sound lookup: " + name, false);

    return null;
}

//
// the level director will kick off an interval that calls
// this function every 100ms 
//
function clockLoop() {
    if (g_paused)
        return;

    g_levelDirector.myClock += 100;
    //dbg("Clock = " +  g_levelDirector.myClock, false);

    g_levelDirector.launchSorties();
    g_levelDirector.gameEvents();
}

//
// the LevelDirector will kick off an interval that calls this function
// which redraws the entire screen. that interval determines the game's
// fps.
//
function renderLoop() {
    if (g_paused)
        return;

    g_background.render();
    g_ship.render();

    var remainingPowerups = new Array();
    for (var i = 0; i < g_powerups.length; ++i) {
        if (g_powerups[i].render()) {
            remainingPowerups.push(g_powerups[i]);
        }
        else delete g_powerups[i];
    }
    delete g_powerups;
    g_powerups = remainingPowerups;

    var remainingText = new Array();
    for (var i = 0; i < g_floatyText.length; ++i) {
        if (g_floatyText[i].render()) {
            remainingText.push(g_floatyText[i]);
        }
        else delete g_floatyText[i];
    }
    delete g_floatyText;
    g_floatyText = remainingText;

    var remainingEnemies = new Array();
    for (var i = 0; i < g_enemies.length; ++i) {
        if (g_enemies[i].render()) {
            remainingEnemies.push(g_enemies[i]);
        }
        else delete g_enemies[i];
    }
    delete g_enemies;
    g_enemies = remainingEnemies;

    var remainingProjectiles = new Array();
    for (var i = 0; i < g_projectiles.length; ++i) {
        if (g_projectiles[i].render()) {
            remainingProjectiles.push(g_projectiles[i]);
        }
        else delete g_projectiles[i];
    }
    delete g_projectiles;
    g_projectiles = remainingProjectiles;

    var remainingEnemyProjectiles = new Array();
    for (var i = 0; i < g_enemyProjectiles.length; ++i) {
        if (g_enemyProjectiles[i].render()) {
            remainingEnemyProjectiles.push(g_enemyProjectiles[i]);
        }
        else delete g_enemyProjectiles[i];
    }
    delete g_enemyProjectiles;
    g_enemyProjectiles = remainingEnemyProjectiles;

    var remainingAfterEffects = new Array();
    for (var i = 0; i < g_afterEffects.length; ++i) {
        if (g_afterEffects[i].render()) {
            remainingAfterEffects.push(g_afterEffects[i]);
        }
        else delete g_afterEffects[i];
    }
    delete g_afterEffects;
    g_afterEffects = remainingAfterEffects;

    g_levelDirector.renderSpecialText();

    g_foreground.render();

      if ( g_onscreenControls )
      {
         var ox = 40;
         var oy = 300;
         var ow = 30;

         var tx = 8;
         var ty = 22;

         g_context.fillStyle = "yellow";
         g_context.strokeStyle = "yellow";
         g_context.strokeRect(ox,oy,ow,ow);
         g_context.strokeRect(ox-35,oy+35,ow,ow);
         g_context.strokeRect(ox+35,oy+35,ow,ow);
         g_context.strokeRect(ox,oy+70,ow,ow);
         g_context.strokeRect(ox+520,oy+35,ow,ow);
         g_context.strokeRect(ox+270,oy+35,ow,ow);

         g_context.fillText("U",ox+tx,oy+ty);
         g_context.fillText("L", ox-35+tx,oy+35+ty);
         g_context.fillText("R", ox+35+tx,oy+35+ty);
         g_context.fillText("D", ox+tx,oy+70+ty);
         g_context.fillText("Z",ox+520+tx,oy+35+ty);
         g_context.fillText("P",ox+270+tx,oy+35+ty);
      }

    g_ship.renderPowers();
}

//--------------------------- BEGIN MUSIC LOOPING FUNCTIONS-------------//

//
// no browser currently correctly implements the looping feature
// of the Autdio object yet, so we have to listen for the ended event
// on our background music and play it again
//
function start_level_1_loop(terminate) {
    var level_1_loop = document.getElementById("level_1_loop");

    if (terminate != undefined) {
        if (terminate.toString() == "boss") {
            level_1_loop.volume = 0;
            level_1_loop.removeEventListener("ended", l1_loopit, true);
            return;
        }
        else if (terminate.toString() == "gameover") {
            level_1_loop.removeEventListener("ended", l1_loopit, true);
            level_1_loop.pause();
            return;
        }
    }

    l1_loopit();
}

function l1_loopit() {
    var level_1_loop = document.getElementById("level_1_loop");
    level_1_loop.volume = 1;
    level_1_loop.play();
    level_1_loop.addEventListener("ended", l1_loopit, true);
}

function startBossLoop(terminate) {
    var bossLoop = document.getElementById("boss_loop");

    if (terminate != undefined && terminate.toString() == "end_boss") {
        bossLoop.volume = 0;
        bossLoop.removeEventListener("ended", bos_loopit, true);
        return;
    }

    bos_loopit();
}
function bos_loopit() {
    var bossLoop = document.getElementById("boss_loop");
    bossLoop.volume = 1;
    bossLoop.play();
    bossLoop.addEventListener("ended", bos_loopit, true);
}


function startLevel2Loop(terminate) {
    var penguinLoop = document.getElementById("level_2_loop");

    if (terminate != undefined && terminate.toString() == "terminate") {
        penguinLoop.volume = 0;
        penguinLoop.removeEventListener("ended", l2_loopit, true);
        return;
    }
    l2_loopit();
}

function l2_loopit() {
    var penguinLoop = document.getElementById("level_2_loop");
    penguinLoop.volume = 1;
    penguinLoop.play();
    penguinLoop.addEventListener("ended", l2_loopit, true);
}

//
// write message to debug area
//
function dbg(str, append) {
    var dbgObj = document.getElementById("dbg");
    dbgObj.innerHTML = append ? (dbgObj.innerHTML + str) : str;
}

//
// appends all game sounds to the document. called after the loading
// screen itself is loaded.  The GameSounds.php file does a base64_encode
// on the actual .ogg files residing on the server.  This is so the sound
// objects can be repeatedly re-initialized without a network hit. This
// is part of a workaround for Chrome because that browser does not 
// correctly re-play short audio sounds (which is just about every sound
// effect in the game)
//
function loadGameSounds() {
    var fileref = document.createElement('script')
    fileref.setAttribute("type", "text/javascript")
    fileref.setAttribute("src", "Scripts/managers/GameSounds.js")

    var agent = navigator.userAgent;
    if (agent.indexOf("MSIE") != -1) {
        //
        // IE9 does not support OGG so we have to load a special
        // version of the file that has MP3 encoded sound
        //
        //fileref.setAttribute("src", "GameSoundsIE9.js")
    }

    fileref.onload = function () { g_soundsLoaded = true; }

    document.getElementsByTagName("head")[0].appendChild(fileref)
}

function pause() {
    if (g_paused == null)
        g_paused = false;

    g_paused = !g_paused;

    if (g_paused)
        dbg("Game Paused", false);
    else
        dbg("", false);
}
