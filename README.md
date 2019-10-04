# Fear of the dark
## Game description
“Fear of the dark” is a classic 2D top view exploration game.
The player controls a small player making its way through a dungeon. 

The game alternates between two states: day and night.
Enemies, difficulty level, field of view changes between day and night. 

Game can be played as a 1 or 2 players. 

## Differences between 1 and 2 player gameplay
In two player mode, second player controls one of the foes in each room. 
Player cannot control final boss

## Goal of the game
Exploring the various rooms, the player will keep playing until it dies.
Rooms are procedurally generated.
Goal of the game is to explore as many rooms as possible.
When the player dies, the game ends. 
Every 5 rooms, the fifth room will have a boss fight 

## How does the game proceed

In each room the player will encounter a number of foes that will have to be killed prior to accessing the last room. 
Once the last foe is killed, a door opens and the player can access the next room.

Rooms will alternate between night and day. Cycle is not dependent on time. 
Entering a new room, time cycles.
 
Only exception is the final boss: final boss room is always “day”.
Killing a final boss, boss drops 1 heart. NO other power ups available 

## Differences between night and day
Enemies make more damage during the night. 
Enemies sprite change.
Field of view is limited to a circle of light at night. 

## Player stats
* Health: 5 heats
* Damage: 1 point dmg
* Weapon: sword


## Enemies description and damage inflicted 


| Day (dmg / life) | Night (dmg / life) | Weapon | Points awarded |
------------------| -------------------|-----------------|-----
| Worm (-1 / 1)    | Snake (-2 / 1)     | None / collision| +10 |
---|---|---|---
| Bird (-1/ 1) | Bat (-3 / 3) | Shoot seed / shoot seed | +15 |
---|---|---|---
| Dragon (-5 / 10) | NA | Shoot fire / collision | +100 |
---|---|---|---

## Development roadmap
### Version 0 (Random room generation)
* Room 1 is procedurally generated 
* Rooms have: walls, traps, two doors 
* Check that generated room is ‘correct’
* No ‘closed loop’ 
* Player can go from one side to the other of the room to access the exit door 

### Version 1 (MVP)
* Single room 
* Killing all enemies end game
* Worm enemies
* Single player
* Enemies chase player and attack player
* Player attacks enemies 
* Player enters from left door and exits through the right door. 
* Objects in the room prevent player / enemies from moving
* Traps: players can fall in a trap and die 

### Version 2 (Alpha version) 
* Bird enemies (shoot in direction of player)
* Bird enemies try to stay at fixed distance from player 
* Ability to enter a second room
* Transition animation between room 1 and 2
* Game remembers rooms and player can move back and forth between rooms
  * Enemies are respawned. 

### Version 3 (Beta version)
* Game alternates between night and day entering a new room
* 3 rooms (room 1, room 2, room 3) all procedurally generated. This room is a boss fight
* Map of explored dungeons

### Version 4 (Gamma version)
* Casual dungeon map. Doors can be on any wall

### Version 5 (Release version)
* Two player game 

### Nice to haves
* Pick between two characters 
* Rolling final credits
* Intro animated screen
* ‘Story’ text at the beginning of the game 


## User stories
### Version 0 (creating a random room)
1. Algorithm generates room 
2. Code needs to check if room is valid or “generate again’
3. No ‘closed loops by walls
4. Hero need to be able to go from one side to the other. 


| Good Room Layout | Bad Room Layout |
 --- | --- 




Version 1 (MVP)
UI
Player health loaded top of screen
Player has 5 hearts
If player is damaged, one heart is lost
Score set to zero

Starting the game
Player clicks anywhere on screen
First room is loaded 
In room: player (LHS middle of screen)
Rhs of the room 4 monsters appear

Moving the player around
Player presses ‘W’ character turn up and moves up
Player presses ‘A’ character turns left and moves left
Player presses ‘D’ character turns right and moves right
Player presses ‘S’ character turns down and moves down 
If the player hits a wall / player cannot move forward 

Attacking a foe
Player presses spacebar to use the sword
Sword direction depends on the direction the player if facing
Player cannot move while using the sword 
If there is a collision between foe and sword, foe is damaged
If foe health is zero, foe dies. 
Score is increased 

Foe chasing and attacking the player (worm)
Foe looks for where player is
Foe gets closer to player 
If foe collides with player, player is damaged 
Foe moves slower than player 

Player dies 
Player health is equal or less than zero
Player disappears from screen
Game over screen appears (‘YOU DIED’)
Player can start again the game 

Defeating a room
Last enemy is killed
Room score increases +1 
Door opens to the right
Player enters door and access the next room


Wireframe 
