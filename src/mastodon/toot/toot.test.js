import { describe, it } from 'node:test';
import assert from 'node:assert';

import { generateMockResponse } from '../helpers/testing.js';
import { fetchToot } from './content.js';
import { default as tootFixture} from '../fixtures/generated/toot--profile-components.json' assert { type: 'json' };

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
  it('Should fetch the latest toot for a given username', async () => {})
  it('Should return the pinned toot if available for the user', async () => {})
  it('Should handle errors gracefully when fetching by username', async () => {})
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
