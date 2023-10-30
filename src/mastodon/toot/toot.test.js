import { describe, it } from 'node:test';
import assert from 'node:assert';

import { generateMockResponse } from '../helpers/testing.js';
import { fetchToot, fetchTootByUsername } from './content.js';
import { default as tootFixture} from '../fixtures/generated/toot--profile-components.json' assert { type: 'json' };
import { default as searchScottnathStatuses } from '../fixtures/generated/search--scottnath--statuses.json' assert { type: 'json' };

/** @ignore */
const mastodonApi = 'https://mastodon.social/api/v2/search';
const mastodonStatusApi = 'https://mastodon.social/api/v1/statuses';

describe('fetchToot', () => {
  it('Should fetch a specific toot using its status ID', async (t) => {
    const fn = t.mock.method(global, 'fetch');
    const mockRes = {
      json: () => generateMockResponse(tootFixture).response,
    };
    fn.mock.mockImplementationOnce(() => 
      Promise.resolve(mockRes)
    )
    

    const res = await fetchToot(tootFixture.id);
    assert.deepEqual(res, tootFixture);
    assert.strictEqual(fn.mock.calls[0].arguments[0], `${mastodonStatusApi}/${tootFixture.id}`);
  });
  it('Should handle errors gracefully', async (t) => {
    const badTootId = 'nonexistentID';
    const fn = t.mock.method(global, 'fetch');
    const mockContent = generateMockResponse({id: badTootId}, 'toot-id', 404);
    const mockRes = {
      json: () => mockContent,
    };
    fn.mock.mockImplementationOnce(() => 
      Promise.resolve(mockRes)
    );

    const res = await fetchToot(badTootId);
    assert.strictEqual(res.response.error, 'Record not found');
    assert.strictEqual(fn.mock.calls[0].arguments[0], `${mastodonStatusApi}/${badTootId}`);
  })
});
describe('fetchTootByUsername', () => {
  it('Should fetch the latest toot for a given username', async (t) => {
    const username = 'scottnath';
    const fn = t.mock.method(global, 'fetch');
    const mockRes = {
      json: () => generateMockResponse(searchScottnathStatuses).response,
    };
    fn.mock.mockImplementationOnce(() => 
      Promise.resolve(mockRes)
    );

    const res = await fetchTootByUsername(username);
    assert.deepEqual(res, searchScottnathStatuses.statuses[0]);
    assert.strictEqual(fn.mock.calls[0].arguments[0], `${mastodonApi}?q=${username}&type=statuses`);
  });

  it('Should return the pinned toot if available for the user', async (t) => {
    const username = 'userWithPinnedToot';
    const fn = t.mock.method(global, 'fetch');
    const mockResWithPinned = {
      ...tootFixture,
      pinned: true
    };
    const mockRes = {
      json: () => generateMockResponse(mockResWithPinned).response,
    };
    fn.mock.mockImplementationOnce(() => 
      Promise.resolve(mockRes)
    );

    const res = await fetchTootByUsername(username);
    assert.deepEqual(res, mockResWithPinned);
    assert.strictEqual(res.pinned, true);
  });

  it('Should handle errors gracefully when fetching by username', async (t) => {
    const username = 'nonexistentUser';
    const fn = t.mock.method(global, 'fetch');
    const mockError = {
      error: "User not found"
    };
    const mockRes = {
      json: () => generateMockResponse(mockError).response,
    };
    fn.mock.mockImplementationOnce(() => 
      Promise.resolve(mockRes)
    );

    const res = await fetchTootByUsername(username);
    assert.strictEqual(res.error, mockError.error);
  });
});

describe('parseFetchedToot', () => {
  it('Should correctly parse a fetched toot', async () => {})
  it('Should handle missing attributes gracefully', async () => {})
});

describe('cleanTootContent', () => {
  it('Should clean and validate toot content', async () => {})
  it('Should handle invalid content gracefully', async () => {})
});

describe('generateTootContent', () => {
  it('Should generate content for the toot HTML', async () => {})
  it('Should handle fetch option correctly', async () => {})
  it('Should merge fetched and provided content correctly', async () => {})
});
