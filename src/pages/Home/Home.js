import React from 'react';
import { Breakpoint } from 'react-socks';

import Nav from 'components/Nav';
import PlantList from 'pages/PlantList';

/**
 * The Home page displays...
 *
 * @component
 * @category Pages
 */
function Home() {
	/**
	 * JSX
	 */

	return (
		<>
			{/* Render on extra small, small, and medium screens */}
			<Breakpoint medium down>
				<div className="h-screen">
					<Nav />
					<PlantList />
				</div>
			</Breakpoint>

			{/* Render on large and up screens */}
			<Breakpoint large up>
				<div className="bg-white">
					<Nav />
					<PlantList />
				</div>
			</Breakpoint>
		</>
	);
}

export default Home;
