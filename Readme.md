### Games Using React and Redux

#### Memory Game

Sixteen squares displayed: click to reveal their colour. Two colours shown
at once, for 3 seconds before reverting.

Selecting 2 boxes with same colour causes the boxes to retain their colour.

Solve all 16 boxes in as few clicks as possible.

Use your memory to track boxes colours.


On mobile / smaller screens where scrolling is required to see all boxes,
CSS styling reveals a number from 1 to 16 inside each box to make the game more
playable.

Solved boxes use CSS styling to reveal the CSS name of the colour.



#### Flag Game

A country's flag is shown, with 4 options for the country's name.

Select the correct name to reveal some data about that country:
* Population
* Language(s)
* Continent
* Capital City


Additional feature with Flag Game where URL parameters are parsed for
country choices so I can link to specific flags and specific country choices.

See the main index page for "Hardest Flag to Hand Draw",
or "Best Geometric Flag", etc.

**NOTE**

Slovakia's flag has an issue, it is missing height and width attributes,
and fails to display inside the game:

http://ronaldbarnes.ca:3000/flag-game/204

It **can** be viewed by loading directly into browser:

https://flagcdn.com/sk.svg



#### Redux

These 2 games were independent projects, but I wanted to preserve their state
when switching between them.

So, I "lifted state" via Redux as a proof of concept.


####

TODO

Re-style to more modern header and index.

Implement CSS grid on Memory Game.

Remove Todo List API project link from header.


![MemoryGame-screenshot](https://user-images.githubusercontent.com/36019446/169620995-77c709ea-6179-4b0d-8573-58d8cf876673.png)
