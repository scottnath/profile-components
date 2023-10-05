import { describe, it } from 'node:test';
import assert from 'node:assert'

import { fetchUser } from './content.js';
import { generateMockResponse } from '../utils/testing.js';

import { default as userScottnath } from '../fixtures/generated/user--scottnath.json' assert { type: 'json' };

describe('fetchUser', () => {
  it('Should accept a user id and return a response', async (t) => {
    const fn = t.mock.method(global, 'fetch');
    const mockRes = {
      json: () => generateMockResponse(userScottnath, 'users'),
    };
    fn.mock.mockImplementationOnce(() => 
      Promise.resolve(mockRes)
    )
    
    const res = await fetchUser(null, userScottnath.id);
    assert.deepEqual(res, userScottnath);
    assert.strictEqual(fn.mock.calls[0].arguments[0], `https://dev.to/api/users/${userScottnath.id}`);
  })
  it('Should accept a username and return a response', async (t) => {
    const noId = {...userScottnath, id: undefined};
    const fn = t.mock.method(global, 'fetch');
    const mockRes = {
      json: () => generateMockResponse(noId, 'users'),
    };
    fn.mock.mockImplementationOnce(() => 
      Promise.resolve(mockRes)
    )
    
    const res = await fetchUser(noId.username);
    assert.deepEqual(res, noId);
    assert.strictEqual(fn.mock.calls[0].arguments[0], `https://dev.to/api/users/by_username?url=${noId.username}`);
  })
  it('Should handle missing user', async (t) => {
      const fn = t.mock.method(global, 'fetch');
      const mockContent = generateMockResponse({username: 'not-a-real-user'}, 'users', 404);
      const mockRes = {
        json: () => mockContent,
      };
      fn.mock.mockImplementationOnce(() => 
        Promise.resolve(mockRes)
      )
      
      const res = await fetchUser('not-a-real-user');
      assert.deepEqual(res.response, mockContent.response);
      assert.strictEqual(fn.mock.calls[0].arguments[0], `https://dev.to/api/users/by_username?url=not-a-real-user`);
  });
})