import { describe, it } from 'node:test';
import assert from 'node:assert'

import * as content from './content.js';
import { parseFetchedPost } from '../post/content.js';
import { generateMockResponse } from '../helpers/testing.js';
import { stringify } from '../../utils/index.js';

import { default as userScottnath } from '../fixtures/generated/user--scottnath.json' assert { type: 'json' };
import { default as postBugfix } from '../fixtures/generated/post--bugfix-multi-vite.json' assert { type: 'json' };
import { default as postDependabot } from '../fixtures/generated/post--dependabot.json' assert { type: 'json' };


describe('fetchUser', () => {
  it('Should accept a user id and return a response', async (t) => {
    const fn = t.mock.method(global, 'fetch');
    const mockRes = {
      json: () => generateMockResponse(userScottnath, 'users').response,
    };
    fn.mock.mockImplementationOnce(() => 
      Promise.resolve(mockRes)
    )
    
    const res = await content.fetchUser(null, userScottnath.id);
    assert.deepEqual(res, userScottnath);
    assert.strictEqual(fn.mock.calls[0].arguments[0], `https://dev.to/api/users/${userScottnath.id}`);
  })
  it('Should accept a username and return a response', async (t) => {
    const noId = {...userScottnath, id: undefined};
    const fn = t.mock.method(global, 'fetch');
    const mockRes = {
      json: () => generateMockResponse(noId, 'users').response,
    };
    fn.mock.mockImplementationOnce(() => 
      Promise.resolve(mockRes)
    )
    
    const res = await content.fetchUser(noId.username);
    assert.deepEqual(res, noId);
    assert.strictEqual(fn.mock.calls[0].arguments[0], `https://dev.to/api/users/by_username?url=${noId.username}`);
  })
  it('Should handle missing user', async (t) => {
      const fn = t.mock.method(global, 'fetch');
      const mockContent = generateMockResponse({username: 'not-a-real-user'}, 'users', 404).response;
      const mockRes = {
        json: () => mockContent,
      };
      fn.mock.mockImplementationOnce(() => 
        Promise.resolve(mockRes)
      )
      
      const res = await content.fetchUser('not-a-real-user');
      assert.deepEqual(res, mockContent);
      assert.strictEqual(fn.mock.calls[0].arguments[0], `https://dev.to/api/users/by_username?url=not-a-real-user`);
  });
})
describe('parseFetchedUser', () => {
  it('Should parse a user', () => {
    const testUser = userScottnath;
    assert.deepEqual(content.parseFetchedUser(testUser), {
      username: testUser.username,
      name: testUser.name,
      summary: testUser.summary,
      joined_at: testUser.joined_at,
      profile_image: testUser.profile_image,
    });
  })
  it('Should require a username', () => {
    const testUser = userScottnath;
    assert.deepEqual(content.parseFetchedUser({
      ...testUser,
      username: ''
    }), {
      ...testUser,
      name: testUser.name,
      summary: testUser.summary,
      joined_at: testUser.joined_at,
      profile_image: testUser.profile_image,
      username: '',
      error: 'Username is required',
    });
  })
})

describe('parsePostString', () => {
  it('Should parse a stringified post', () => {
    const testString = JSON.stringify(postBugfix);
    assert.deepEqual(content.parsePostString(testString), postBugfix);
  });
  it('Should fail gracefully', () => {
    assert.deepEqual(content.parsePostString(postBugfix), postBugfix);
    assert.deepEqual(content.parsePostString('["postBugfix`]'), {});
  });
});

describe('cleanUserContent', () => {
  it('Adjusts for missing items', () => {
    const cleaned = content.cleanUserContent({username: 'meow'});
    assert.ok(cleaned.profile_image.includes('data:image/png'));
    assert.equal(cleaned.name, '@meow');
    assert.equal(cleaned.latest_post, undefined);
    assert.equal(cleaned.popular_post, undefined);
  });
  it('Parses post strings', () => {
    const cleaned = content.cleanUserContent({
      username: 'meow',
      latest_post: JSON.stringify(parseFetchedPost(postBugfix)),
      popular_post: JSON.stringify(parseFetchedPost(postDependabot)),
    });
    assert.deepEqual(cleaned.latest_post, parseFetchedPost(postBugfix));
    assert.deepEqual(cleaned.popular_post, parseFetchedPost(postDependabot));
  })
  it('Does not allow duplicate posts', () => {
    const cleaned = content.cleanUserContent({
      username: 'meow',
      latest_post: JSON.stringify(parseFetchedPost(postDependabot)),
      popular_post: JSON.stringify(parseFetchedPost(postDependabot)),
    });
    assert.deepEqual(cleaned.latest_post, parseFetchedPost(postDependabot));
    assert.deepEqual(cleaned.popular_post, undefined);
  });
});

describe('generateUserContent', () => {
  it('Errors on missing content', async () => {
    const res = await content.generateUserContent();
    assert.deepEqual(res.error, 'Username is required');
  });
  it('Cleans without fetching', async () => {
    const testUser = userScottnath;
    const resp = await content.generateUserContent(testUser);
    assert.deepEqual(resp, {
      username: testUser.username,
      name: testUser.name,
      summary: testUser.summary,
      joined_at: testUser.joined_at,
      profile_image: testUser.profile_image,
    });
  });
  it('Fetches and fails', async (t) => {
    const fn = t.mock.method(global, 'fetch');
    const mockContent = generateMockResponse({username: 'meow'}, 'users', 404).response;
    const mockRes = {
      json: () => mockContent,
    };
    fn.mock.mockImplementationOnce(() => 
      Promise.resolve(mockRes)
    )
    
    const returned = await content.generateUserContent({username: 'meow'}, true);
    assert.equal(returned.error, 'Fetch Error: User "meow" not found');
  });
  it('Fetches and cleans', async (t) => {
    const postLatest = {
      ...postDependabot,
      positive_reactions_count: 10,
      published_at: '2022-01-02T00:00:00Z'
    };
    const postLatestUserDefined = {
      title: 'meow article 1',
    };
    const postPopular = {
      ...postBugfix,
      positive_reactions_count: 20,
      published_at: '1972-01-01T00:00:00Z'
    };
    const postPopularUserDefined = {
      title: 'meow article 2',
    };
    const testUser = userScottnath;
    const expected = {
      username: testUser.username,
      name: testUser.name,
      summary: testUser.summary,
      joined_at: testUser.joined_at,
      profile_image: testUser.profile_image,
      post_count: 2,
      popular_post: {
        ...parseFetchedPost(postPopular),
        ...postPopularUserDefined
      },
      latest_post: {
        ...parseFetchedPost(postLatest),
        ...postLatestUserDefined
      },
    }
    const fn = t.mock.method(global,'fetch');
    const mockResUser = {
      json: () => generateMockResponse(testUser, 'users').response,
    };
    const mockResPosts = {
      json: () => generateMockResponse([postLatest, postPopular], 'articles').response,
    };
    fn.mock.mockImplementationOnce(async () => mockResUser, 0)
    fn.mock.mockImplementationOnce(async () => mockResPosts, 1)
    
    const returned = await content.generateUserContent({
      username: testUser.username,
      latest_post: stringify(postLatestUserDefined),
      popular_post: stringify(postPopularUserDefined),
    }, true);
    assert.deepEqual(returned, expected);
  });
  it('Fetches without posts', async (t) => {
    const postLatest = {
      ...postDependabot,
      positive_reactions_count: 10,
      published_at: '2022-01-02T00:00:00Z'
    };
    const postPopular = {
      ...postBugfix,
      positive_reactions_count: 20,
      published_at: '1972-01-01T00:00:00Z'
    };
    const testUser = userScottnath;
    const expected = {
      username: testUser.username,
      name: testUser.name,
      summary: testUser.summary,
      joined_at: testUser.joined_at,
      profile_image: testUser.profile_image,
      post_count: 2,
    }
    const fn = t.mock.method(global,'fetch');
    const mockResUser = {
      json: () => generateMockResponse(testUser, 'users').response,
    };
    const mockResPosts = {
      json: () => generateMockResponse([postLatest, postPopular], 'articles').response,
    };
    fn.mock.mockImplementationOnce(async () => mockResUser, 0)
    fn.mock.mockImplementationOnce(async () => mockResPosts, 1)
    
    const returned = await content.generateUserContent({username: testUser.username}, 'no-posts');
    assert.deepEqual(returned, expected);
  });
});