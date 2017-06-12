'use strict';
game.newLoopFromConstructor('fix', function(){  
    this.update = function() {
    //Отрисовка
    game.clear();
    camera.setPositionC(point(player.getPositionC().x, player.getPositionC().y));
    player.draw();
    OOP.drawArr(backGorund);
    OOP.drawArr(backGroundDecoration);
    OOP.drawArr(ground);
    OOP.drawArr(decorations);
    OOP.drawArr(ladders);
    //контроль
    if(key.isPress('F1') || (touch.isDown() && touch.isInObject(quickSave))) {
        checkPoint.playerSavedCheckPoint = true;
        saveCheckPointFunc();
    }
    //
    if((key.isDown('D') || key.isDown('RIGHT')) || (touch.isDown() && touch.isInObject(goRight)) && player.hide == false) {
    player.setFlip(0, 0);
    player.see = 60;
    playerMove.setFlip(0, 0);
        if((key.isDown('SHIFT') || (touch.isDown() && touch.isInObject(doIt))) && player.energy > 0) {
            player.speedX = 1.5;
            player.energy -= 1;
        } else player.speedX = 1;
    } else if((key.isDown('A') || key.isDown('LEFT') || (touch.isDown() && touch.isInObject(goLeft)) && player.hide == false)) {
    player.setFlip(1, 0);
    player.see = -60;
    playerMove.setFlip(1, 0);
        if((key.isDown('SHIFT') || (touch.isDown() && touch.isInObject(doIt))) && player.energy > 0) {
            player.speedX = -1.5;
            player.energy -= 1;
        } else player.speedX = -1;
    } else {
        player.speedX = 0;
    }
    //тачпад
    goLeft.setPositionCS(point (100, screenHeight - 100));
    goRight.setPositionCS(point (200, screenHeight - 100));
    goDown.setPositionCS(point (300, screenHeight - 100));
    jumpAndUp.setPositionCS(point (screenWidth - 200, screenHeight - 100));
    doIt.setPositionCS(point (screenWidth - 100, screenHeight - 100));
    quickSave.setPositionCS(point (screenWidth - 100, 50));
    goRight.draw();
    goLeft.draw();
    jumpAndUp.draw();
    goDown.draw();
    doIt.draw();
    quickSave.draw();
    //
}
});

game.newLoopFromConstructor('Level1', function(){  
try{
    playAudioFoneFunc();
}catch(e) {
    alert(e);
}
backGorund = setBackGroundFunc();
this.entry = function() {
    try{
    playAudioFoneFunc();
    }catch(e) {
        alert(e);
    }
    if(gameInPouse == false) {
    clearAllVarsFunc();
    setLevelFunc();
    playAudioFoneFunc();
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