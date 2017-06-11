game.newLoopFromConstructor('Level1', function(){  
backGorund = setBackGroundFunc();
this.entry = function() {
    if(gameInPouse == false) {
    clearAllVarsFunc();
    playAudioFoneFunc();
    setLevelFunc();
    }
    StartWithCheckPoint = false;
    gameInPouse = false;
}
this.update = function() {
    game.clear();
    setCameraPosirionFunc();
    controllFunc();
    saveCheckPointFunc();
    laddersFunc();
    informationFunc();
    hideFunc();
    starsFunc();
    gravitiFunc();
    levelEndFunc();
    wolfsFunc();
    eWormFunc();
    playerMoveFunc();
    energyRegenerationFunc();
    //Draw
    OOP.drawArr(backGorund);
    OOP.drawArr(backGroundDecoration);
    OOP.drawArr(ground);
    OOP.drawArr(decorations);
    OOP.drawArr(ladders);
    //Hide Mode
    if(!hideMod) {
    player.hideLightValue = 100;
    player.hideBlackValue = 30;
    OOP.drawArr(hidingObjects);
    player.draw();
    } else {
    player.see = player.see / 2;
    player.hideLightValue = 40;
    player.hideBlackValue = 1;
    player.draw();
    OOP.drawArr(hidingObjects);
    }
    OOP.drawArr(eWolf);
    OOP.drawArr(stars);
    enemyWorm.draw();
    playerMove.draw();
    brush.onContext(function(ctx) {
    var gradient = ctx.createRadialGradient(screenWidth / 2 + player.see, screenHeight / 2, player.hideLightValue, screenWidth / 2, screenHeight / 2, player.hideBlackValue);
    gradient.addColorStop(0, "black");
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, screenWidth, screenHeight);
  });
    brushObjectsFunc();
    tuchScreenFunc();
}
});