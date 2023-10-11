import { describe, it } from 'node:test';
import assert from 'node:assert'

import { generateMockResponse } from '../helpers/testing.js';
import { fetchRepo, parseFetchedRepo, cleanRepoContent, generateRepoContent } from './content.js';
import { default as repoScottnathdotcom } from '../fixtures/generated/repo--scottnath-scottnath.com.json' assert { type: 'json' };
import { default as repoStorydocker } from '../fixtures/generated/repo--storydocker-storydocker.json' assert { type: 'json' };
import { default as repoFreeCodeCamp } from '../fixtures/generated/repo--freeCodeCamp-freeCodeCamp.json' assert { type: 'json' };

describe('fetchRepo', () => {
  it('Should accept a full_name and return a response', async (t) => {
      const fn = t.mock.method(global, 'fetch');
      const mockRes = {
        json: () => generateMockResponse(repoScottnathdotcom, 'repos'),
      };
      fn.mock.mockImplementationOnce(() => 
        Promise.resolve(mockRes)
      )
      
      const res = await fetchRepo(repoScottnathdotcom.full_name);
      assert.strictEqual(res.response, repoScottnathdotcom);
      assert.strictEqual(fn.mock.calls[0].arguments[0], `https://api.github.com/repos/${repoScottnathdotcom.full_name}`);
  });
  it('Should handle missing repos', async (t) => {
      const fn = t.mock.method(global, 'fetch');
      const mockContent = generateMockResponse({full_name: 'meow'}, 'repos', 404);
      const mockRes = {
        json: () => mockContent,
      };
      fn.mock.mockImplementationOnce(() => 
        Promise.resolve(mockRes)
      )
      
      const res = await fetchRepo('meow');
      assert.strictEqual(res.response, mockContent.response);
      assert.strictEqual(fn.mock.calls[0].arguments[0], `https://api.github.com/repos/meow`);
  });
})

describe('parseFetchedRepo', () => {
  it('Should know organization', () => {
    const testRepo = repoStorydocker;
    assert.deepEqual(parseFetchedRepo(testRepo), {
      description: testRepo.description,
      forks_count: testRepo.forks_count,
      full_name: testRepo.full_name,
      language: testRepo.language,
      name: testRepo.name,
      org: testRepo.organization.login,
      stargazers_count: testRepo.stargazers_count,
      subscribers_count: testRepo.subscribers_count,
    });
  })
  it('Should know owner', () => {
    const testRepo = repoScottnathdotcom;
    assert.deepEqual(parseFetchedRepo(testRepo), {
      description: testRepo.description,
      forks_count: testRepo.forks_count,
      full_name: testRepo.full_name,
      language: testRepo.language,
      name: testRepo.name,
      org: testRepo.owner.login,
      stargazers_count: testRepo.stargazers_count,
      subscribers_count: testRepo.subscribers_count,
    });
  })
  it('Should allow using just org', () => {
    const testRepo = repoStorydocker;
    testRepo.org = 'meow';
    assert.deepEqual(parseFetchedRepo(testRepo), {
      description: testRepo.description,
      forks_count: testRepo.forks_count,
      full_name: testRepo.full_name,
      language: testRepo.language,
      name: testRepo.name,
      org: 'meow',
      stargazers_count: testRepo.stargazers_count,
      subscribers_count: testRepo.subscribers_count,
    });
  })
});

describe('cleanRepoContent', () => {
  it('Errors on missing content', () => {
    assert.deepEqual(cleanRepoContent().error, 'Missing repo attribute: `full_name`');
  });
  it('Determines the correct repo org or name', () => {
    assert.equal(cleanRepoContent({full_name: 'meow/purr'}).name, 'purr');
    assert.equal(cleanRepoContent({full_name: 'meow/purr'}).org, 'meow');
  });
  it('Allows removing the org', () => {
    assert.equal(cleanRepoContent({full_name: 'meow/purr', org: 'meow'}, true).org, undefined);
  })
  it('Removes 0 values', () => {
    assert.equal(cleanRepoContent({full_name: 'meow/purr', forks_count: '1'}).forks_count, '1');
    assert.equal(cleanRepoContent({full_name: 'meow/purr', forks_count: '0'}).forks_count, undefined);
    assert.equal(cleanRepoContent({full_name: 'meow/purr', stargazers_count: '1'}).stargazers_count, '1');
    assert.equal(cleanRepoContent({full_name: 'meow/purr', stargazers_count: '0'}).stargazers_count, undefined);
    assert.equal(cleanRepoContent({full_name: 'meow/purr', subscribers_count: '1'}).subscribers_count, '1');
    assert.equal(cleanRepoContent({full_name: 'meow/purr', subscribers_count: '0'}).subscribers_count, undefined);
  })
});

describe('generateRepoContent', () => {
  it('Errors on missing content', async () => {
    const res = await generateRepoContent();
    assert.deepEqual(res.error, 'Missing repo attribute: `full_name`');
  });
  it('Cleans without fetching', async () => {
    const res = await generateRepoContent({full_name: 'meow/purr'});
    assert.equal(res.name, 'purr');
    assert.equal(res.org, 'meow');
  });
  it('Fetches and fails', async (t) => {
    const fn = t.mock.method(global, 'fetch');
    const mockContent = generateMockResponse({full_name: 'meow/purr'}, 'repos', 404);
    const mockRes = {
      json: () => mockContent.response,
    };
    fn.mock.mockImplementationOnce(() => 
      Promise.resolve(mockRes)
    )
    
    const returned = await generateRepoContent({full_name: 'meow/purr'}, true);
    assert.equal(returned.error, 'Fetch Error: Repo "meow/purr" not found');
  });
  it('Fetches and cleans', async (t) => {
    const testRepo = {
      ...repoFreeCodeCamp,
      org: 'meow',
      stargazers_count: '0'
    };
    const expected = {
      full_name: testRepo.full_name,
      name: testRepo.name,
      description: testRepo.description,
      language: testRepo.language,
      forks_count: testRepo.forks_count,
      subscribers_count: testRepo.subscribers_count,
    }
    const fn = t.mock.method(global, 'fetch');
    const mockRes = {
      json: () => generateMockResponse(testRepo, 'repos').response,
    };
    fn.mock.mockImplementationOnce(() => 
      Promise.resolve(mockRes)
    )
    
    const returned = await generateRepoContent(testRepo, true, true);
    assert.deepEqual(returned, expected);
  });
});