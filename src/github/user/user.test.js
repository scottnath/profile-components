import { describe, it } from 'node:test';
import assert from 'node:assert'

import { generateMockResponse } from '../helpers/testing.js';
import { fetchUser, parseFetchedUser, parseReposString, cleanUserContent, generateUserContent } from './content.js';
import { default as repoFreeCodeCamp } from '../fixtures/generated/repo--freeCodeCamp-freeCodeCamp.json' assert { type: 'json' };

import { default as userScottnath } from '../fixtures/generated/user--scottnath.json' assert { type: 'json' };
import { default as userSindresorhus } from '../fixtures/generated/user--sindresorhus.json' assert { type: 'json' };

describe('fetchUser', () => {
  it('Should accept a login and return a response', async (t) => {
      const fn = t.mock.method(global, 'fetch');
      const mockRes = {
        json: () => generateMockResponse(userScottnath, 'users'),
      };
      fn.mock.mockImplementationOnce(() => 
        Promise.resolve(mockRes)
      )
      
      const res = await fetchUser(userScottnath.login);
      assert.strictEqual(res.response, userScottnath);
      assert.strictEqual(fn.mock.calls[0].arguments[0], `https://api.github.com/users/${userScottnath.login}`);
  });
  it('Should handle missing user', async (t) => {
      const fn = t.mock.method(global, 'fetch');
      const mockContent = generateMockResponse({login: 'not-a-real-user'}, 'users', 404);
      const mockRes = {
        json: () => mockContent,
      };
      fn.mock.mockImplementationOnce(() => 
        Promise.resolve(mockRes)
      )
      
      const res = await fetchUser('not-a-real-user');
      assert.strictEqual(res.response, mockContent.response);
      assert.strictEqual(fn.mock.calls[0].arguments[0], `https://api.github.com/users/not-a-real-user`);
  });
})

describe('parseFetchedUser', () => {
  it('Should reduce user content', () => {
    const testUser = userSindresorhus;
    assert.deepEqual(parseFetchedUser(testUser), {
      login: testUser.login,
      name: testUser.name,
      username: testUser.login,
      avatar_url: testUser.avatar_url,
      bio: testUser.bio,
      following: testUser.following,
      followers: testUser.followers,
    });
  })
});

describe('parseReposString', () => {
  it('Should parse a string of repos full_names', () => {
    const testRepos = ['meow/purr', 'woof/sniff'];
    const testString = JSON.stringify(testRepos);
    const expected = testRepos.map(repo => {
      return {
        full_name: repo,
        fetch: true,
      }
    });
    assert.deepEqual(parseReposString(testString), expected);
  });
  it('Should parse a string of repos names, adding owner, or fail gracefully', () => {
    const testRepos = ['purr', 'sniff'];
    const testString = JSON.stringify(testRepos);
    const expected = testRepos.map(repo => {
      return {
        full_name: `meow/${repo}`,
        fetch: true,
        no_org: true,
      }
    });
    assert.deepEqual(parseReposString('gonna fail but return an array'), []);
    assert.deepEqual(parseReposString(testString), []);
    assert.deepEqual(parseReposString(testString, 'meow'), expected);
  });
});

describe('cleanUserContent', () => {
  it('Errors on missing content', () => {
    assert.deepEqual(cleanUserContent().error, 'Missing required attribute: `login` || `username`');
  });
  it('Adjusts for missing items', () => {
    assert.equal(cleanUserContent({username: 'meow'}).login, 'meow');
    assert.ok(cleanUserContent({username: 'meow'}).avatar_url.includes('data:image/png'));
  });
  it('Removes 0 values', () => {
    assert.equal(cleanUserContent({login: 'meow', followers: '1'}).followers, '1');
    assert.equal(cleanUserContent({login: 'meow', followers: '0'}).followers, undefined);
    assert.equal(cleanUserContent({login: 'meow', following: '1'}).following, '1');
    assert.equal(cleanUserContent({login: 'meow', following: '0'}).following, undefined);
  })
  it('Should convert a string of repos to an array', () => {
    const testRepos = ['meow/purr'];
    const testString = JSON.stringify(testRepos);
    const expected = testRepos.map(repo => {
      return {
        full_name: repo,
        fetch: true,
      }
    });
    assert.deepEqual(cleanUserContent({login: 'meow', repos: testString}).repositories, expected);
  });
});

describe('generateUserContent', () => {
  it('Errors on missing content', async () => {
    const res = await generateUserContent();
    assert.deepEqual(res.error, 'Missing required attribute: `login` || `username`');
  });
  it('Cleans without fetching', async () => {
    const res = await generateUserContent({username: 'meow'});
    assert.equal(res.username, 'meow');
    assert.equal(res.login, 'meow');
  });
  it('Fetches and fails', async (t) => {
    const fn = t.mock.method(global, 'fetch');
    const mockContent = generateMockResponse({login: 'meow'}, 'users', 404);
    const mockRes = {
      json: () => mockContent.response,
    };
    fn.mock.mockImplementationOnce(() => 
      Promise.resolve(mockRes)
    )
    
    const returned = await generateUserContent({login: 'meow'}, true);
    assert.equal(returned.error, 'Fetch Error: User "meow" not found');
  });
  it('Fetches and cleans', async (t) => {
    const testRepo = repoFreeCodeCamp;
    const expectedRepo = {
      full_name: testRepo.full_name,
      name: testRepo.name,
      description: testRepo.description,
      language: testRepo.language,
      forks_count: testRepo.forks_count,
      org: testRepo.organization.login,
      stargazers_count: testRepo.stargazers_count,
      subscribers_count: testRepo.subscribers_count,
    }
    const testUser = {
      ...userSindresorhus,
      followers: 0,
      username: userSindresorhus.login,
      login: undefined,
      repos: JSON.stringify([testRepo.full_name]),
    };
    const expected = {
      login: userSindresorhus.login,
      name: testUser.name,
      username: userSindresorhus.login,
      avatar_url: testUser.avatar_url,
      bio: testUser.bio,
      following: testUser.following,
      repositories: [expectedRepo]
    }
    const fn = t.mock.method(global,'fetch');
    const mockResUser = {
      json: () => generateMockResponse(testUser, 'users').response,
    };
    const mockResRepo = {
      json: () => generateMockResponse(repoFreeCodeCamp, 'repos').response,
    };
    fn.mock.mockImplementationOnce(async () => mockResUser, 0)
    fn.mock.mockImplementationOnce(async () => mockResRepo, 1)
    
    const returned = await generateUserContent({...testUser, avatar_url: undefined}, true, true);
    assert.deepEqual(returned, expected);
  });
});