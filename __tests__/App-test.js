/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render, wait} from '@testing-library/react-native';

import App from '../App';
import {makeServer} from '../server';
import {Response} from 'miragejs';

let server;

beforeEach(() => {
  // Initialize server. If you'd like to make assertions against the requests that Pretender makes you can change trackRequests to true.
  server = makeServer({environment: 'test', trackRequests: true});
});

afterEach(() => {
  // Shutdown the server after each test case.
  server.shutdown();
});

it('renders the list of users from the server', async () => {
  // Add user data to the mirage db
  server.create('user', {name: 'Bob'});
  server.create('user', {name: 'Alice'});

  let {getByTestId} = render(<App />);

  await wait(() => expect(getByTestId('empty-users')).not.toBeEmpty());

  await wait(() => {
    // Verify the number of requests handled by pretender.
    let requests = server.pretender.handledRequests;

    expect(getByTestId('user-list')).not.toBeEmpty();
    expect(requests).toHaveLength(1);
  });
});

it('should handle server errors', async () => {
  let message = 'Internal Server error.';

  // Set a network error response on Mirage.
  server.get('/users', () => {
    return new Response(500, {}, {error: message});
  });

  let {getByTestId, debug} = render(<App />);

  await wait(() => expect(getByTestId('empty-users')).not.toBeEmpty());

  await wait(() => {
    expect(getByTestId('server-error')).not.toBeEmpty();
    expect(getByTestId('server-error-message')).toHaveTextContent(message);

    // Verify the number of requests handled by pretender.
    let requests = server.pretender.handledRequests;

    expect(requests).toHaveLength(1);
  });
});
