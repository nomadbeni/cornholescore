const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(match, 'inline application script exists');

const context = { navigator: {} };
vm.runInNewContext(
  match[1] + '\nglobalThis.rules = { getTeamBagCount, canAddBag, isRoundValid, getWinner };',
  context
);
const { getTeamBagCount, canAddBag, isRoundValid, getWinner } = context.rules;

test('a team can record up to four bags in one round', () => {
  const round = [0, 0, 0, 0];
  assert.equal(canAddBag(round, 0), true);
  round[0] = 3;
  assert.equal(canAddBag(round, 0), true);
  round[1] = 1;
  assert.equal(getTeamBagCount(round, 0), 4);
  assert.equal(canAddBag(round, 0), false);
});

test('the four-bag limit is independent for both teams', () => {
  const round = [2, 2, 0, 0];
  assert.equal(canAddBag(round, 0), false);
  assert.equal(canAddBag(round, 1), true);
  assert.equal(isRoundValid(round), true);
});

test('a round with more than four bags for either team is rejected', () => {
  assert.equal(isRoundValid([3, 2, 0, 0]), false);
  assert.equal(isRoundValid([0, 0, 1, 4]), false);
  assert.equal(isRoundValid([2, 2, 1, 3]), true);
});

test('winner is detected only when one team reaches the target and leads', () => {
  assert.equal(getWinner([21, 18], 21), 0);
  assert.equal(getWinner([17, 22], 21), 1);
  assert.equal(getWinner([20, 21], 21), 1);
});

test('a tied score at or above the target does not declare a winner', () => {
  assert.equal(getWinner([21, 21], 21), null);
  assert.equal(getWinner([25, 25], 21), null);
  assert.equal(getWinner([20, 20], 21), null);
});
