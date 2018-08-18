# Reddit ProcGen Logo

My entry for the 2018 August entry in r/proceduralgeneration (See https://www.reddit.com/r/proceduralgeneration/comments/93ufbk/august_challenge_a_logo_for_this_subreddit)

## Getting Started

### Prerequisites

You'll need node.js installed on your system (I used v7.10.0) and npm to install the packages.

### Installing

```
git clone https://github.com/Gavin-Song/reddit-logo-procgen
cd reddit-logo-procgen
npm install
```

## Usage
Get help
```
node index.js --help
```
Generate 100 logos
```
node index.js --amount 100
```

Logos will be outputed in `/output` (Same folder as `index.js`) You can modify `config.js` to change some percentages.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
