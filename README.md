# Sordle Words

Word bank for Sordle.

Play the game [sordle.iambrian.com](sordle.iambrian.com).

## API

**List of all words:**
https://iambrian.com/sordle-words/5.json

**Individual word file:**
https://iambrian.com/sordle-words/5/aargh.json

**Indexed word file:**
https://iambrian.com/sordle-words/5/0.json

## Usage

**Get a list of words:**

```javascript
const words = await fetch('https://iambrian.com/sordle-words/5.json').then((r) => r.json());
```

**Get a single word:**

```javascript
const word = await fetch('https://iambrian.com/sordle-words/5/aargh.json').then((r) => r.json());
```

**Get a random word:**

```javascript
// Pick a random index (0-7433)
const randomIndex = Math.floor(Math.random() * 7434);

// Get the word file in one request
const word = await fetch(`https://iambrian.com/sordle-words/5/${randomIndex}.json`).then((r) => r.json());
```

## Stats

Total words: 7434
