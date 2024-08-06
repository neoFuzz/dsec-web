[![Deploy game content to webhost](https://github.com/neoFuzz/dsec-web/actions/workflows/deploy-to-web.yml/badge.svg)](https://github.com/neoFuzz/dsec-web/actions/workflows/deploy-to-web.yml) [![Deploy JSDoc content to Pages](https://github.com/neoFuzz/dsec-web/actions/workflows/deploy-jsdoc.yml/badge.svg)](https://github.com/neoFuzz/dsec-web/actions/workflows/deploy-jsdoc.yml)

# Destruction Sector (HTML5)

Destruction Sector is an arcade/strategy science fiction tank war game.

It is a 3D game presented using a top-down style view with triangular tanks battling it out in randomly generated arenas.
Players can choose from multiple game modes, including Hostile and Teams mode, and can upgrade their tanks with
various enhancements.

It is a port from the Java-based version of a similar game.

## Play

You can play the game [here](https://fuzzserv01.fuzzserver.org/dsector/).

## Controls

Each tank controlled using a combination of six different keys: Forwards, backwards, turn left, turn right change
weapon, and fire.

### Player 1

| Action         | Key   |
|----------------|-------|
| Move forward:  | UP    |
| Move backward: | DOWN  |
| Rotate left:   | LEFT  |
| Rotate right:  | RIGHT |
| Fire weapon:   | Space |
| Change weapon: | C     |

## Game Play

The background is generated randomly at the beginning of each round and the Destruction Sector is viewed from above.
You can use to view the game from different perspectives as well.

### Main Option Screen

The main option screen allows configuration of human and robot players, number of rounds, and play mode. External USB
keyboards can be used for additional players if needed.

### Game Modes

#### Hostile Mode:

- Every player is the enemy of everyone else.
- Points and shopping credits are awarded based on the damage done.
- Maximum damage to a single tank without recharging shields is 100, yielding up to 600 credits.

#### Teams Mode:

- Players are grouped into two teams, each protecting a jewel.
- Personal scores and credits are earned similarly to Hostile Mode.
- Team score is based on the damage done to the enemy's jewel.

### Tank Upgrades

Upgrades are available in various categories such as fuel, metal, speed, and turn rate. Higher-level upgrades can be
purchased for a higher price.

### Robot Tanks

Different robot tanks have unique behaviors and combat styles, ranging from cautious prototypes to aggressive hunters.

### Scoring

#### Hostile Mode and Teams Mode:

- 1 point per unit of damage to a tank (up to 100 points per tank).
- 6 credits per unit of damage (up to 600 credits per tank).

#### Teams Mode Only:

- 1 point per unit of damage to the enemy jewel (up to 200 points).
- 6 credits per unit of damage to the enemy jewel (up to 1200 credits).
