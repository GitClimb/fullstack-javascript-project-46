## Difference calculator
[![Actions Status](https://github.com/GitClimb/fullstack-javascript-project-46/workflows/hexlet-check/badge.svg)](https://github.com/GitClimb/fullstack-javascript-project-46/actions)
<a href="https://codeclimate.com/github/GitClimb/fullstack-javascript-project-46/maintainability"><img src="https://api.codeclimate.com/v1/badges/4e01b2559dc1c7b2d502/maintainability" /></a>
<a href="https://codeclimate.com/github/GitClimb/fullstack-javascript-project-46/test_coverage"><img src="https://api.codeclimate.com/v1/badges/4e01b2559dc1c7b2d502/test_coverage" /></a>
[![Actions Status](https://github.com/GitClimb/fullstack-javascript-project-46/workflows/main/badge.svg)](https://github.com/GitClimb/fullstack-javascript-project-46/actions)

A difference calculator is a program that determines the difference between two data structures. 

Utility features:
- Support for different input formats: yaml, json;
- Report generation as plain text, stylish and json.

### Installation
You can install the utility by copying the Git repository and entering the command in the console -.

```
git@github.com:GitClimb/fullstack-javascript-project-46.git
```
After downloading the repository, go to the root folder of fullstack-javascript-project-46 and enter the `$ npm link` command in the console, which will in turn activate the installation (superuser privileges may be requested).

### Usage

```
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "stylish")
  -h, --help           display help for command
```

### Comparison of flat files (JSON)

- `$gendiff filepath1.json filepath2.json`

<a href="https://asciinema.org/a/nL96aECNAN4WJGhhJN1d3cVJB" target="_blank"><img src="https://asciinema.org/a/nL96aECNAN4WJGhhJN1d3cVJB.svg" /></a>

### Comparison of flat files (yaml)

- `$gendiff filepath1.yml filepath2.yml`

<a href="https://asciinema.org/a/9Lu7DhmmlZyxa3vYVptZh9Bsh" target="_blank"><img src="https://asciinema.org/a/9Lu7DhmmlZyxa3vYVptZh9Bsh.svg" /></a>

### Recursive comparison

- `$gendiff filepath1.json filepath2.yml`

<a href="https://asciinema.org/a/F3zTb3zERlgisnNkkelq6nTPh" target="_blank"><img src="https://asciinema.org/a/F3zTb3zERlgisnNkkelq6nTPh.svg" /></a>

### Flat Format

- `$gendiff -f plain filepath1.json filepath2.yml`

<a href="https://asciinema.org/a/5IHjGYeNekUukEWRbCr3YJjQL" target="_blank"><img src="https://asciinema.org/a/5IHjGYeNekUukEWRbCr3YJjQL.svg" /></a>

### Output to json

- `$gendiff -f json filepath1.json filepath2.yml`

<a href="https://asciinema.org/a/w6Tz2k5VerG3XlYcjdQZbvdc4" target="_blank"><img src="https://asciinema.org/a/w6Tz2k5VerG3XlYcjdQZbvdc4.svg" /></a>