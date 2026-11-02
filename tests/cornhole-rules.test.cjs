const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(match, 'inline application script exists');

const context = { navigator: {} };
vm.runInNewContext(
  match[1].split("document.getElementById('name1').addEventListener('input',saveState);")[0] +
    '\nglobalThis.rules = { getTeamBagCount, canAddBag, isRoundValid, getWinner, isValidRound, escapeHtml, undoLastRound, isValidArchivedMatch, t, WORDS };',
  context
);
const { getTeamBagCount, canAddBag, isRoundValid, getWinner, isValidRound, escapeHtml, undoLastRound, isValidArchivedMatch, t, WORDS } = context.rules;

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

test('saved round validation rejects malformed and over-limit data', () => {
  assert.equal(isValidRound([4, 0, 2, 2]), true);
  assert.equal(isValidRound([4, 1, 0, 0]), false);
  assert.equal(isValidRound([0, 0, 0, -1]), false);
  assert.equal(isValidRound([0, 0, 0, 1.5]), false);
  assert.equal(isValidRound([0, 0, 0]), false);
  assert.equal(isValidRound('not a round'), false);
});

test('team names are escaped before HTML rendering', () => {
  assert.equal(escapeHtml('<img src=x onerror=alert(1)>'), '&lt;img src=x onerror=alert(1)&gt;');
  assert.equal(escapeHtml("A&B \"team\""), 'A&amp;B &quot;team&quot;');
});

test('undo removes exactly the latest saved round', () => {
  const rounds = [[1, 0, 0, 0], [0, 1, 0, 0]];
  assert.equal(undoLastRound(rounds), true);
  assert.deepEqual(rounds, [[1, 0, 0, 0]]);
});

test('undo safely handles an empty or invalid history', () => {
  const rounds = [];
  assert.equal(undoLastRound(rounds), false);
  assert.equal(undoLastRound(null), false);
  assert.deepEqual(rounds, []);
});

test('completed match archive validation rejects malformed entries', () => {
  const valid = {
    date: '2026-11-02T10:00:00.000Z', mode: 'acl',
    team1: 'Red', team2: 'Blue', players1: ['A'], players2: ['B'],
    score1: 21, score2: 18, winner: 0, rounds: 8
  };
  assert.equal(isValidArchivedMatch(valid), true);
  assert.equal(isValidArchivedMatch({...valid, winner: 2}), false);
  assert.equal(isValidArchivedMatch({...valid, mode: 'unknown'}), false);
  assert.equal(isValidArchivedMatch({...valid, score1: '21'}), false);
  assert.equal(isValidArchivedMatch(null), false);
});

test('Hungarian and English UI dictionaries contain core labels', () => {
  assert.equal(WORDS.hu.match, 'Meccs');
  assert.equal(WORDS.en.match, 'Match');
  assert.equal(WORDS.hu.archive, 'Korábbi mérkőzések');
  assert.equal(WORDS.en.archive, 'Match history');
});

test('language lookup falls back to Hungarian for missing keys', () => {
  context.language = 'en';
  assert.equal(t('match'), 'Match');
  assert.equal(t('nonexistent-key'), 'nonexistent-key');
});
