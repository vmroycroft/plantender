import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BreakpointProvider } from 'react-socks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';

function App() {
	const client = new ApolloClient({
		uri: process.env.REACT_APP_WATERLOG_SERVER_URL,
		cache: new InMemoryCache()
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
