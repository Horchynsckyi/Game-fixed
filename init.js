var pjs = new PointJS('2D', 1000, 200);
pjs.system.initFullPage();
//
var log = pjs.system.log,
    game = pjs.game,
    point = pjs.vector.point,
    camera = pjs.camera,
    brush = pjs.brush,
    OOP = pjs.OOP,
    math = pjs.math,
    tiles = pjs.tiles;
pjs.system.setTitle('Dark forest');
game.setFPS(60);
//
var mouse = pjs.mouseControl.initMouseControl(),
    key = pjs.keyControl.initKeyControl(),
    touch = pjs.touchControl.initTouchControl();
//
//Узнаем ширину и высотку экрана пользователя
var screenWidth = game.getWH().w,
    screenHeight = game.getWH().h;
//
//Глобальные переменные игры
var gameInPouse = false,
    gameNewGame = true,
    //Проверка начинает ли игрок с быстрого сохранения
    StartWithCheckPoint = false,
    levelNumber = 1,
    //Переменная для счета отображения информации
    informationCounter = 0,
    //Проверка чтобы функция которая вибирает нужный уровень игры запускалась только 1 раз
    functionIsReady = false,
    //Объект в котором записываются все значения при быстром сохранении
    checkPoint = {
        x: 0,
        y: 0,
        starsToCompliteLevel: 0,
        stars: [],
        energy: 0,
        levelNumber: 1,
        levelComplite: 0,
        informationCounter: 0,
        playerSavedCheckPoint: false,
        startCounterCheckPointSaved: false,
        counterCheckPointSaved: 0,
        checkPointBeeSave: false,
    },
    //Игровые переменные
    backGorund = [],
    backGroundDecoration = [];
//
//Игрок
var player = game.newAnimationObject({
    animation: tiles.newImage('img/player.png').getAnimation(192, 63, 32, 35, 1),
    x : 0,
    y : 0,
    w : 31,
    h : 33,
    userData : {
        speedX: 0,
        speedY: 0,
        inGround: false,
        inLadder: false,
        hide: false,
        move: false,
        energy: 100,
        energyRegeneration: false,
        energyTimer: 0,
        levelComplite: 0,
        see: 60,
        hideLightValue: 0,
        hideBlackValue: 0,
    },
    visible: true
}),
    playerMove = game.newAnimationObject({
    animation: tiles.newImage('img/player.png').getAnimation(192, 63, 32, 35, 3),
    x: player.x,
    y: player.y,
    w: 31,
    h: 33,
    visible: true
});
//
//Массивы объектов игры и некоторые другие переменные
var walls = [],
    ground = [],
    ladders = [],
    decorations = [],
    hidingObjects = [],
    stars = [],
    eWolf = [],
    eWolfWalls =[],
    hideMod = false,
    informationValue = 0,
    levelComplitedAnimation,
    starsToCompliteLevel = 0,
    //Объект врага черьвя
    enemyWorm = game.newAnimationObject({
        animation: tiles.newImage('img/enemies/wormHide.png').getAnimation(0, 0, 32, 35, 1),
        x: 0,
        y: 0,
        w: 60,
        h: 30,
        userData: {
            inLevel: false,
            timeBlink: 0,
            timeCrawsOutAnimation: 0,
            timeHideAnimation: 0,
            randomHideTime: 0,
            setRandomHideTime: true,
            playCounter: 0,
            randomPosition: 0,
        }
    }),
    //Анимации черьвя
    enemyWormCrawsOutAnimation = tiles.newImage('img/enemies/worm.png').getAnimation(0, 0, 32, 35, 8),
    enemyWormStandAnimation = tiles.newImage('img/enemies/worm.png').getAnimation(4, 33, 32, 35, 6),
    enemyWormHideAnimation = tiles.newImage('img/enemies/worm.png').getAnimation(4, 64, 32, 35, 8),
    enemyWormUnderGroundAnimation = tiles.newImage('img/enemies/wormHide.png').getAnimation(0, 0, 32, 35, 1),
    //Волк
    //Звуки волков
    eWolfMoveRightHide = pjs.audio.newAudio("audio/eWolf/wolfMoveRight.mp3", 0.5),
    eWolfMoveLeftHide = pjs.audio.newAudio("audio/eWolf/wolfMoveLeft.mp3", 0.5),
    eWolfHuntingMode = pjs.audio.newAudio("audio/eWolf/wolfHuntingMode.mp3", 0.7),
    eWolfMoveRightBaysick = {
        "eWolfMoveRightBaysick1": pjs.audio.newAudio("audio/eWolf/wolfMoveRightBaysick1.mp3", 0),
        "eWolfMoveRightBaysick2": pjs.audio.newAudio("audio/eWolf/wolfMoveRightBaysick2.mp3", 0),
        "eWolfMoveRightBaysick3": pjs.audio.newAudio("audio/eWolf/wolfMoveRightBaysick3.mp3", 0),
    },
    eWolfMoveLeftBaysick = {
        "eWolfMoveLeftBaysick1": pjs.audio.newAudio("audio/eWolf/wolfMoveLeftBaysick1.mp3", 0),
        "eWolfMoveLeftBaysick2": pjs.audio.newAudio("audio/eWolf/wolfMoveLeftBaysick2.mp3", 0),
        "eWolfMoveLeftBaysick3": pjs.audio.newAudio("audio/eWolf/wolfMoveLeftBaysick3.mp3", 0),
    },
    enemyWolfTile = tiles.newImage("img/enemies/wolf.png").getAnimation(320, 96, 64, 30, 5),
    //Тайлы
    mapTile = pjs.tiles.newImage('img/Tiles.png'),
    starImage = 'Textures/Stars/starGold.png',
    foneMusick = pjs.audio.newAudio("audio/fone/foneMusick.mp3", 0.1),
    foneForestSong = pjs.audio.newAudio("audio/fone/foneForestSong.mp3", 0.2);
//
//Объекты для сенсорного экрана
var goRight = game.newImageObject({
    file: 'img/controll/right.png',
    w: 70,
    h: 70,
}),
    goLeft = game.newImageObject({
    file: 'img/controll/left.png',
    w: 70,
    h: 70,
}),jumpAndUp = game.newImageObject({
    file: 'img/controll/left.png',
    w: 70,
    h: 70,
}),goDown = game.newImageObject({
    file: 'img/controll/left.png',
    w: 70,
    h: 70,
}),doIt = game.newCircleObject({
    radius: 50,
    fillColor: 'white',
    strokeColor: 'grey',
    strokeWidth: 3,      
}),quickSave = game.newTextObject({
    text: 'Быстрое сохрание',
    size: 15,
    color: 'grey',
});
jumpAndUp.turn(90);
goDown.turn(270);
//setAllVars
var map = {
    width : 100,
    height : 100,
    image: mapTile,
    level: null,
    tile : {
        //Ground objects
        '1': point(121, 127.5),//Ground + wall
        '0': point(289, 287),//Ground
        '2': point(67, 80),//Level end
    }
},
//Objects for hide
    hideObjs = {
    width: 40,
    height: 40,
    image: mapTile,
    level: null,
    tile : {
        'w': point(240, 112),//Hide in shrab
        'u': point(100, 80),//Hide in Colums
    }
},
    starsMap = {
    width: 10,
    height: 10,
    level: null,
},
//Ladders
    ladder = {
    width : 40,
    height : 100,
    image: mapTile,
    level: null,
    tile : {
        //Ladders objects
        'r': point(24, 113),//Ladder1 right
        'l': point(24, 113),//ladder1 left
    }
},
//Decorations
    decoration = {
    width: 40,
    height: 40,
    level: null,
    tile: {
        //Decoration Objects
        'd': point(201, 104),//Decoration 1 'Information onject'
        'v': point(288, 247),//Decoration 2 'grass'
        '_': point(163, 100),//Decoration 3 'colum in ground'
        't': point(272, 97),//Decoration 4 'fir-tree'
        'm': point(415, 102),//Decoration 5 'boletuses'
        '|': point(128, 88),//Decoration 6 'Colum1'
    }
},
//Enemies
    enemiesMap = {
    w: 40,
    h: 20,
    level: null,
};
//Все объёкты в переменных
var groundChar1 = {
    animation: map.image.getAnimation(map.tile['1'].x, map.tile['1'].y, 32, 32, 1),
        x : null,
        y : null,
        w : map.width,
        h : map.height, 
        userData: {
            isGround: true,
        },
},groundChar0 = {
    animation: map.image.getAnimation(map.tile['0'].x, map.tile['0'].y, 32, 32, 1),
        x : null,
        y : null,
        w : map.width,
        h : map.height, 
},groundChar2 = {
    animation: map.image.getAnimation(map.tile['2'].x, map.tile['2'].y, 25, 30, 1),
        x : null,
        y : null,
        w : map.width,
        h : map.height, 
        userData: {
            isLevelEnd: false,
        }
},
//
    hideObjsCharW = {
    animation: hideObjs.image.getAnimation(hideObjs.tile['w'].x, hideObjs.tile['w'].y, 16, 15, 1),
        x : null,
        y : 60,
        w : hideObjs.width,
        h : hideObjs.height, 
},  hideObjsCharU = {
    animation: hideObjs.image.getAnimation(hideObjs.tile['u'].x, hideObjs.tile['u'].y, 25, 30, 1),
        x : null,
        y : 60,
        w : hideObjs.width,
        h : hideObjs.width, 
},
//
    starsCharS = {
        file: starImage,
        x : 40,
        y : 70,
        w : 20,
        h : 20, 
},
//
    ladderCharL = {
    animation: ladder.image.getAnimation(ladder.tile['l'].x, ladder.tile['l'].y, 16, 32, 1),
        x : null,
        y : null,
        w : ladder.width,
        h : ladder.height, 
},
    ladderCharR = {
    animation: ladder.image.getAnimation(ladder.tile['r'].x, ladder.tile['r'].y, 16, 32, 1),
        x : 60,
        y : null,
        w : ladder.width,
        h : ladder.height, 
},
//
    decorationCharD = { 
            animation: map.image.getAnimation(decoration.tile['d'].x, decoration.tile['d'].y, 16, 25, 1),
            x : null,
            y : 61,
            w : decoration.width,
            h : decoration.height, 
            userData: {
                isInformationObject: true,
                informationNumber: informationValue,
            }
},  decorationCharV = { 
        animation: map.image.getAnimation(decoration.tile['v'].x, decoration.tile['v'].y, 16, 8, 1),
        x : null,
        y : 60,
        w : decoration.width,
        h : decoration.height, 
},  decorationChar_ = { 
        animation: map.image.getAnimation(decoration.tile['_'].x, decoration.tile['_'].y, 25, 13, 1),
        x : null,
        y : 65,
        w : decoration.width + 40,
        h : decoration.height, 
},  decorationCharT = { 
        animation: map.image.getAnimation(decoration.tile['t'].x, decoration.tile['t'].y, 16, 31, 1),
        x : null,
        y : -20,
        w : decoration.width,
        h : decoration.height + 20, 
        scale: 2,
},  decorationCharM = { 
        animation: map.image.getAnimation(decoration.tile['m'].x, decoration.tile['m'].y, 16, 10, 1),
        x : null,
        y : 80,
        w : 16,
        h : 10, 
        scale: 2,
},  decorationCharI = { 
        animation: map.image.getAnimation(decoration.tile['|'].x, decoration.tile['|'].y, 10, 15, 1),
        x : null,
        y : 95,
        w : 10,
        h : 5, 
        scale: 2,
},
//Волк
    enemyCharW = {
          animation : enemyWolfTile,
          x : null,
          y : 70,
          w : 70, 
          h : 30, 
          delay: 10,
          userData: {
              speedX: 0,
              huntingMode: false,
              moveR: true,
              playWolfMoveRight: false,
              playWolfMoveLeft: false,
              playCounter: 0,
              audioMoveRightHide: eWolfMoveRightHide,
              audioMoveLeftHide: eWolfMoveLeftHide,
              audioHuntingMode: eWolfHuntingMode,
              audioMoveLeftBaysick: eWolfMoveLeftBaysick,
              audioMoveRightBaysick: eWolfMoveRightBaysick,
              playCounterBaysick: 0,
              volumeForMoveBaysick: 0,
              volumeFixerHide: 1,
          }
};






levelComplitedAnimation = map.image.getAnimation(67, 50, 25, 30, 1);