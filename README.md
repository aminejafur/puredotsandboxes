# Pure Javascript Dots and Boxes Game (Moroccan 90's Style)

## The idea

<p align="center">
  <img width="600" height="300" src="https://www.cabaneaidees.com/wp-content/uploads/2014/07/pipopipette.jpg">
</p>

I remember when I used to spend hours playing this game with my friends, it was one of the popular games back then.

Last week I found my brother playing it with his friend, so I had the idea of building it as a multi player's online game.

If you try to google the dots and boxes game you will find many websites where you can play it and many other tutorials that show you how to build it by you own, but they are all using canvas and especially they are not keeping the vintage experience we had while playing it.

The design I used in my game belongs to a 90's book called "AL FAHD" in Arabic or "LE JAGUAR" in french, the same cover "image"  and paper lines style "CSS" we were playing on.

### Demo
You can check a [Codepen demo here](https://codepen.io/aminejafur/pen/dyGyaaJ).

## The game

![](https://github.com/aminejafur/puredotsandboxes/blob/master/preview.gif)

Choose a number of rows and lines from the top left side of the cover then click open, Each player takes turns drawing a side of one of the squares in the paper. Whoever closes a box (which draws the last side of it) will get an "X" with his color in the box and plays again.

`The winner is the one who has closed the greatest number of boxes.`

NB: the boxes located around the edges of the paper are closed at the third line and not at the fourth.

## Players

You can add or remove as many players you want from the following `Array`, please make sure to add a different `color` for each player and to keep the last value as `true` for the player that will be the first play and `false` to others.

```js

const Players = [
    new Player("Amine","#056305", 0, 0, true),
    new Player("Jhon","orange", 0, 0, false),
    // new Player("Peter","black", 0, 0, false),
    // new Player("Mario","#0FF", 0, 0, false),
    new Player("Felipe","#b70505", 0, 0, false)
    ];

 ```
 
 ## More
 
 You can read more about this game from [Wikipedia](https://en.wikipedia.org/wiki/Dots_and_Boxes)
