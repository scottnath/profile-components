import { describe, it } from 'node:test';
import assert from 'node:assert';

import { generateMockResponse } from '../helpers/testing.js';
import { fetchUser, fetchUserByUsername, parseFetchedUser, cleanUserContent, generateUserContent } from './content.js';
import { default as userFixture} from '../fixtures/generated/account--scottnath.json' assert { type: 'json' };
import { default as searchScottnathAccounts } from '../fixtures/generated/search--scottnath--accounts.json' assert { type: 'json' };

/** @ignore */
const mastodonApi = 'https://mastodon.social/api/v2/search';
const mastodonAccountsApi = 'https://mastodon.social/api/v1/accounts';

describe('fetchUser', () => {
  
  it('Should accept a user id and return a response', async (t) => {
    const fn = t.mock.method(global, 'fetch');
    const mockRes = {
      json: () => Promise.resolve(userMastodonMock),
    };
    fn.mock.mockImplementationOnce(() => Promise.resolve(mockRes));
    
    const res = await fetchUser(userMastodonMock.id);
    assert.deepStrictEqual(res, userMastodonMock);
    assert.strictEqual(fn.mock.calls[0].arguments[0], `${mastodonAccountsApi}/${userMastodonMock.id}`);
  });

  it('Should handle missing user', async (t) => {
    const fn = t.mock.method(global, 'fetch');
    const mockRes = {
      json: () => Promise.resolve({ error: 'User not found' }),
      status: 404
    };
    fn.mock.mockImplementationOnce(() => Promise.resolve(mockRes));
    
    const res = await fetchUser('not-a-real-user-id');
    assert.strictEqual(res.error, 'User not found');
    assert.strictEqual(fn.mock.calls[0].arguments[0], `${mastodonAccountsApi}/not-a-real-user-id`);
  });
    
});
describe('fetchUserByUsername', () => {

  it('Should accept a username and return a response', async (t) => {
    const fn = t.mock.method(global, 'fetch');
    const mockRes = {
      json: () => Promise.resolve({ accounts: [userMastodonMock] }),
    };
    fn.mock.mockImplementationOnce(() => Promise.resolve(mockRes));
    
    const res = await fetchUserByUsername(userMastodonMock.username);
    assert.deepStrictEqual(res, userMastodonMock);
    assert.strictEqual(fn.mock.calls[0].arguments[0], `${mastodonApi}?q=${userMastodonMock.username}&type=accounts`);
  });

  it('Should handle missing user by username', async (t) => {
    const fn = t.mock.method(global, 'fetch');
    const mockRes = {
      json: () => Promise.resolve({ accounts: [] }),
    };
    fn.mock.mockImplementationOnce(() => Promise.resolve(mockRes));
    
    const res = await fetchUserByUsername('not-a-real-username');
    assert.strictEqual(res.error, 'User not found');
    assert.strictEqual(fn.mock.calls[0].arguments[0], `${mastodonApi}?q=not-a-real-username&type=accounts`);
  });

});
describe('parseFetchedUser', () => {

  it('Should correctly parse a Mastodon user object', () => {
    const sampleUser = {
      id: '12345',
      username: 'sampleUser',
      acct: 'sampleUser@mastodon.social',
      url: 'https://mastodon.social/@sampleUser',
      display_name: 'Sample User',
      note: 'A sample user on Mastodon',
      avatar: 'https://mastodon.social/sample-avatar.jpg',
      avatar_static: 'https://mastodon.social/sample-avatar-static.jpg',
      header: 'https://mastodon.social/sample-header.jpg',
      header_static: 'https://mastodon.social/sample-header-static.jpg',
      bot: false,
      group: false,
      created_at: '2022-01-01T00:00:00Z',
      last_status_at: '2022-01-10T00:00:00Z',
      statuses_count: 100,
      followers_count: 200,
      following_count: 50,
      // Additional attributes not needed for our component
      some_extra_attribute: 'extra_value',
      another_extra_attribute: 'another_value'
    };

    const parsedUser = parseFetchedUser(sampleUser);
    assert.deepStrictEqual(parsedUser, {
      id: sampleUser.id,
      username: sampleUser.username,
      acct: sampleUser.acct,
      url: sampleUser.url,
      display_name: sampleUser.display_name,
      note: sampleUser.note,
      avatar: sampleUser.avatar,
      avatar_static: sampleUser.avatar_static,
      header: sampleUser.header,
      header_static: sampleUser.header_static,
      bot: sampleUser.bot,
      group: sampleUser.group,
      created_at: sampleUser.created_at,
      last_status_at: sampleUser.last_status_at,
      statuses_count: sampleUser.statuses_count,
      followers_count: sampleUser.followers_count,
      following_count: sampleUser.following_count
    });
  });

  it('Should handle an empty or undefined user object', () => {
    const parsedUser = parseFetchedUser();
    assert.deepStrictEqual(parsedUser, {});
  });

  it('Should handle a user with missing data points and zero counts', () => {
    const incompleteUser = {
      id: '67890',
      username: 'incompleteUser',
      acct: 'incompleteUser@mastodon.social',
      url: 'https://mastodon.social/@incompleteUser',
      display_name: 'Incomplete User',
      note: 'A user with missing data points',
      avatar: 'https://mastodon.social/sample-avatar.jpg',
      avatar_static: 'https://mastodon.social/sample-avatar-static.jpg',
      bot: false,
      group: false,
      created_at: '2022-01-01T00:00:00Z',
      statuses_count: 0,
      followers_count: 0,
      following_count: 0
    };

    const parsedUser = parseFetchedUser(incompleteUser);
    assert.deepStrictEqual(parsedUser, {
      id: incompleteUser.id,
      username: incompleteUser.username,
      acct: incompleteUser.acct,
      url: incompleteUser.url,
      display_name: incompleteUser.display_name,
      note: incompleteUser.note,
      avatar: incompleteUser.avatar,
      avatar_static: incompleteUser.avatar_static,
      bot: incompleteUser.bot,
      group: incompleteUser.group,
      created_at: incompleteUser.created_at,
      statuses_count: incompleteUser.statuses_count,
      followers_count: incompleteUser.followers_count,
      following_count: incompleteUser.following_count
    });
  });

});