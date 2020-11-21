import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BreakpointProvider } from 'react-socks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from 'pages/Home';

function App() {
	// TODO This replaces the old array with the new array, but is there a better way to do this?
	// See https://www.apollographql.com/docs/react/caching/cache-configuration/#generating-unique-identifiers
	// See https://www.apollographql.com/docs/react/caching/cache-field-behavior/#merging-non-normalized-objects
	const cache = new InMemoryCache({
		typePolicies: {
			Plant: {
				fields: {
					watered: {
						// always prefer incoming over existing data
						merge: false
					},
					fertilized: {
						// always prefer incoming over existing data
						merge: false
					}
				}
			}
		}
	});

	const client = new ApolloClient({
		cache,
		uri: process.env.REACT_APP_PLANTENDER_SERVER_URL
	});

	return (
		<ApolloProvider client={client}>
			<BreakpointProvider>
				<Router>
					<Switch as="main">
						<Route exact path="/">
							<Home />
						</Route>
					</Switch>
				</Router>
			</BreakpointProvider>
		</ApolloProvider>
	);
}

export default App;
