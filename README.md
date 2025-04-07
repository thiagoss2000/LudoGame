# LudoGame

Ludo game developed in JavaScript using the functional programming paradigm

## 🚀 Getting Started

Open the destination folder in a terminal and run:

## For HTTPS  
git clone https://github.com/thiagoss2000/LudoGame.git

## Or for SSH  
git clone git@github.com:thiagoss2000/LudoGame.git

## Option without using git  
Download the files and extract them into the destination folder

## 🔧 Installing modules  
Inside the LudoGame folder, run:
npm install

### Execution  
npm start

The server will start by default on port 8000  
Access http://localhost:8000/ to play

### 📋 Prerequisites

📥 Installing Node.js

Download and install Node.js from the official website:  
🔗 https://nodejs.org/

## 🛠️ Built with

* [JavaScript]  
* [HTML5]  
* [CSS]  
* [Node.js]  
* [Express]  

## ✒️ Authors

* **Thiago** - *Initial Work* - [thiagoss2000](https://github.com/thiagoss2000)

## copyright project

# Game Instructions: Ludo

## Overview

Ludo is a board game for **2 to 4 players**. Each player chooses one of the **four available colors** (red, blue, green, and yellow) to represent their tokens.

The objective of the game is to move all **4 of a player's tokens** to the **center of the board** after completing a full lap, before the opponents do.

---

## Game Rules

### 1. Setup
- Each player chooses a color.
- All tokens start in the **base** (the player’s starting area).
- The turn order is determined by an initial dice roll, where **the number represents the player**.

### 2. Starting the Game
- To move a token from the base to the board, the player must roll a **6**.
- If the player **has no tokens on the board** and **does not roll a 6**, **the turn passes to the next player** clockwise.
- If the player rolls a 6 and already has tokens on the board, they may choose to **release a new token** or **move an existing one**.

### 3. Movement
- On each turn, the player rolls the die and moves one of their tokens according to the number rolled.
- Rolling a 6 grants **an additional turn**.

### 4. Capturing Tokens
- If a token lands on a space occupied by an opponent’s token, **the opponent’s token returns to its base** and must roll a 6 again to leave.
- **Starting spaces are protected**: opponent tokens cannot be captured on those spaces.

### 5. Completing the Lap
- When a token completes a full lap on the board, it enters the final track and must reach the **center of the board**.
- Moving into the center requires the exact number of spaces. If the die roll is greater than needed, the token does not move.

---

## Game Conditions

- It is not allowed to **intentionally skip a turn** if a valid move is possible.
- If **no move is possible**, the turn is automatically passed.
- The winner is the player who **gets all 4 of their tokens to the center of the board first**.

---

Have fun playing Ludo!
