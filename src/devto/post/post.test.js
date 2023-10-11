import { describe, it } from 'node:test';
import assert from 'node:assert'

import { fetchPost, fetchUserPosts, findPost, parseFetchedPost, cleanPostContent, generatePostContent } from './content.js';
import { generateMockResponse } from '../helpers/testing.js';

import { default as postDependabot } from '../fixtures/generated/post--dependabot.json' assert { type: 'json' };
import { default as postBugfix } from '../fixtures/generated/post--bugfix-multi-vite.json' assert { type: 'json' };


describe('fetchPost', () => {
  it('Should accept a post id and return a response', async (t) => {
    const fn = t.mock.method(global, 'fetch');
    const mockRes = {
      json: () => generateMockResponse(postDependabot, 'article'),
    };
    fn.mock.mockImplementationOnce(() => 
      Promise.resolve(mockRes)
    )
    
    const res = await fetchPost(postDependabot.id);
    assert.deepEqual(res, postDependabot);
    assert.strictEqual(fn.mock.calls[0].arguments[0], `https://dev.to/api/articles/${postDependabot.id}`);
  })
})
describe('fetchUserPosts', () => {
  it('Should accept a username and return a response', async (t) => {
    const fn = t.mock.method(global, 'fetch');
    const mockRes = {
      json: () => generateMockResponse([postDependabot, postBugfix], 'articles'),
    };
    fn.mock.mockImplementationOnce(() =>
      Promise.resolve(mockRes)
    )

    const res = await fetchUserPosts(postDependabot.user.username);
    assert.deepEqual(res, [postDependabot, postBugfix]);
    assert.strictEqual(fn.mock.calls[0].arguments[0], `https://dev.to/api/articles/latest?per_page=1000&username=${postDependabot.user.username}`);
  })
})

describe('findPost', () => {
  it('Should find the most popular post', () => {
    const testPosts = [
      {
        ...postDependabot,
        positive_reactions_count: 10
      }, 
      {
        ...postBugfix,
        positive_reactions_count: 20
      }
    ];
    assert.equal(findPost(testPosts).id, postBugfix.id);
  })
  it('Should find the latest post', () => {
    const testPosts = [
      {
        ...postDependabot,
        published_at: '1972-01-01T00:00:00Z'
      },
      {
        ...postBugfix,
        published_at: '2022-01-02T00:00:00Z'
      }
    ];
    assert.equal(findPost(testPosts, 'latest').id, postBugfix.id);
  })
})


describe('parseFetchedPost', () => {
  it('Should parse a post', () => {
    const testPost = postDependabot;
    assert.deepEqual(parseFetchedPost(testPost), {
      title: testPost.title,
      url: testPost.url,
      cover_image: testPost.cover_image,
      social_image: testPost.social_image,
    });
  })
})
describe('cleanPostContent', () => {
  it('Should confirm and clean post content', () => {
    const testPost = postDependabot;
    assert.deepEqual(cleanPostContent(testPost), {
      title: testPost.title,
      url: testPost.url,
      cover_image: testPost.cover_image,
      social_image: testPost.social_image,
    });
  })
  it('Error on missing content', () => {
    const testPost = {};
    assert.deepEqual(cleanPostContent(), {
      error: 'Post content is missing required data',
    });
  })
})
describe('generatePostContent', () => {
  it('Errors on missing content', async () => {
    const res = await generatePostContent();
    assert.deepEqual(res.error, 'Post content is missing required data');
  });
  it('Cleans without fetching', async () => {
    const testPost = postDependabot;
    const res = await generatePostContent(testPost);
    assert.deepEqual(res, {
      title: testPost.title,
      url: testPost.url,
      cover_image: testPost.cover_image,
      social_image: testPost.social_image,
    });
  });
  it('Errors before fetch on missing content', async () => {
    const res = await generatePostContent({}, true);
    assert.deepEqual(res.error, 'Post ID is required to fetch post content');
  });
  it('Fetches and fails', async (t) => {
    const testObj = {id: 1111};
    const fn = t.mock.method(global, 'fetch');
    const mockContent = generateMockResponse(testObj, 'article', 404);
    const mockRes = {
      json: () => mockContent,
    };
    fn.mock.mockImplementationOnce(() => 
      Promise.resolve(mockRes)
    )
    
    const returned = await generatePostContent(testObj, true);
    assert.equal(returned.error, `Fetch Error: Post "${testObj.id}" not found`);
  });
  it('Fetches and cleans', async (t) => {
    const testPost = postDependabot;
    const expected = {
      title: testPost.title,
      url: testPost.url,
      cover_image: testPost.cover_image,
      social_image: testPost.social_image,
    }
    const fn = t.mock.method(global, 'fetch');
    const mockRes = {
      json: () => testPost,
    };
    fn.mock.mockImplementationOnce(() => 
      Promise.resolve(mockRes)
    )
    
    const returned = await generatePostContent({id: testPost.id}, true);
    assert.deepEqual(returned, expected);
  });
});