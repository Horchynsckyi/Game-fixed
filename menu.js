function Menu() {
mouse.initMouseControl();
//Объекты меню
var startNew = game.newTextObject({
    text: 'Начать новую игру',
    size: 30,
    color: '#ffffff',
    positionC: camera.getPositionC(100, 0),
});
var startWithCheckPoint = game.newTextObject({
    text: 'Начать с точки быстрого сохранения',
    size: 25,
    color: 'red',
    x: 0,
    y: screenHeight / 2 + 50,
});
//Центрируем Начать с точки быстого сохранения
startWithCheckPoint.x = screenWidth / 2 - OOP.getTextWidth(startWithCheckPoint) / 2;
    this.draw = function() {
        game.clear();
        startNew.draw();
        startWithCheckPoint.draw();
    };
    this.update = function() {
        //Запускаем новую игру
        if(mouse.isPeekObject('LEFT', startNew) || (touch.isDown() && touch.isInObject(startNew))){
            levelNumber = 1;
            game.startLoop('Level1');
        }
        //Если игрок сохранялся разрешаем исользование загрузки
        if(checkPoint.checkPointBeeSave) startWithCheckPoint.color = 'green';
        if(checkPoint.checkPointBeeSave == true && (mouse.isPeekObject('LEFT', startWithCheckPoint) || (touch.isDown() && touch.isInObject(startWithCheckPoint)))){
            startWithCheckPointFunc();
        }
    }
};
var menu = new Menu();
game.newLoop('menu', function() {
menu.draw();
menu.update();
});