import { describe, it } from 'node:test';
import assert from 'node:assert';

import { generateMockResponse } from '../helpers/testing.js';
import { fetchToot, fetchTootByUsername, parseFetchedToot, cleanTootContent, generateTootContent } from './content.js';
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

  it('Should return the first pinned toot if multiple are available for the user', async (t) => {
    const username = 'scottnath';
    const fn = t.mock.method(global, 'fetch');
    
    // Adjusting the content of the second and third toots to make them pinned
    const mockStatusesWithMultiplePinned = {
      ...searchScottnathStatuses,
      statuses: [
        searchScottnathStatuses.statuses[0],
        {
          ...searchScottnathStatuses.statuses[1],
          pinned: true
        },
        {
          ...searchScottnathStatuses.statuses[2],
          pinned: true
        }
      ]
    };
    const mockRes = {
      json: () => generateMockResponse(mockStatusesWithMultiplePinned).response,
    };
    fn.mock.mockImplementationOnce(() => 
      Promise.resolve(mockRes)
    );
  
    const res = await fetchTootByUsername(username);
    assert.deepEqual(res, mockStatusesWithMultiplePinned.statuses[1]);
    assert.strictEqual(fn.mock.calls[0].arguments[0], `${mastodonApi}?q=${username}&type=statuses`);
  });
  

  it('Should handle errors gracefully when fetching by username', async (t) => {
    const username = 'nonexistentUser';
    const fn = t.mock.method(global, 'fetch');
    const mockError = {
      error: `No toots found for ${username}`
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
  it('Should correctly parse a fetched toot', () => {
    const parsedToot = parseFetchedToot(tootFixture);
    assert.strictEqual(parsedToot.content, tootFixture.content);
    assert.strictEqual(parsedToot.favourites_count, tootFixture.favourites_count);
    assert.strictEqual(parsedToot.replies_count, tootFixture.replies_count);
    assert.strictEqual(parsedToot.reblogs_count, tootFixture.reblogs_count);
    assert.strictEqual(parsedToot.created_at, tootFixture.created_at);
    assert.strictEqual(parsedToot.url, tootFixture.url);
  });

  it('Should handle missing attributes gracefully', () => {
    const incompleteToot = {
      content: "This is a test toot without all attributes."
    };
    const parsedToot = parseFetchedToot(incompleteToot);
    assert.strictEqual(parsedToot.content, incompleteToot.content);
    assert.strictEqual(parsedToot.favourites_count, undefined);
    assert.strictEqual(parsedToot.replies_count, undefined);
    assert.strictEqual(parsedToot.reblogs_count, undefined);
    assert.strictEqual(parsedToot.created_at, undefined);
    assert.strictEqual(parsedToot.url, undefined);
  });
});

describe('cleanTootContent', () => {
  it('Should clean and validate toot content', async () => {})
  it('Should handle invalid content gracefully', async () => {})
});

describe('generateTootContent', () => {
  it('Should correctly parse provided content', async () => {
    const content = { ...tootFixture };
    const generatedContent = await generateTootContent(content);
    assert.deepStrictEqual(generatedContent, parseFetchedToot(content));
  });

  it('Should fetch toot by ID when fetch option is true', async (t) => {
    const fn = t.mock.method(global, 'fetch');
    const mockRes = {
      json: () => generateMockResponse(tootFixture).response,
    };
    fn.mock.mockImplementationOnce(() => Promise.resolve(mockRes));

    const content = { id: tootFixture.id };
    await generateTootContent(content, true);
    assert.strictEqual(fn.mock.calls[0].arguments[0], `${mastodonStatusApi}/${tootFixture.id}`);
  });

  it('Should fetch toot by username when fetch option is true and no ID is provided', async (t) => {
    const fn = t.mock.method(global, 'fetch');
    const mockRes = {
      json: () => generateMockResponse(searchScottnathStatuses).response,
    };
    fn.mock.mockImplementationOnce(() => Promise.resolve(mockRes));

    const content = { username: 'scottnath' };
    await generateTootContent(content, true);
    assert.strictEqual(fn.mock.calls[0].arguments[0], `${mastodonApi}?q=${content.username}&type=statuses`);
  });

  it('Should handle fetch errors gracefully', async () => {
    const content = { id: 'nonexistentID' };
    const generatedContent = await generateTootContent(content, true);
    assert.strictEqual(generatedContent.error.startsWith('Fetch Error:'), true);
  });

  it('Should merge fetched content with provided content', async (t) => {
    // Mock the global fetch function to return the tootFixture
    const fn = t.mock.method(global, 'fetch');
    const mockRes = {
      json: () => Promise.resolve(tootFixture),
    };
    fn.mock.mockImplementationOnce(() => Promise.resolve(mockRes));

    // Call the generateTootContent function with content and fetch set to true
    const content = {
      content: '<p>Some content</p>',
      favourites_count: 5,
      replies_count: 3,
      reblogs_count: 4,
      id: tootFixture.id,
    };
    const result = await generateTootContent(content, true);

    // Expected result is a merged version of tootFixture and content
    const expectedResult = parseFetchedToot({
      ...tootFixture,
      ...content,
    });

    // Assert that the result matches the expected result
    assert.deepStrictEqual(result, expectedResult);
  });
});

