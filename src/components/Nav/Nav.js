import React from 'react';
import { Breakpoint } from 'react-socks';

import logo from '../../assets/images/rain-tracker-logo.svg';

/**
 * The top navbar.
 *
 * @component
 */
function Nav() {
	/**
	 * JSX
	 */

	return (
		<>
			{/* Render on extra small, small, and medium screens */}
			<Breakpoint medium down>
				<nav className="flex items-center bg-tan-200 p-4">
					<img src={logo} alt="" className="pr-4 w-16" />
					<h1 className="text-xl">Waterlog</h1>
				</nav>
			</Breakpoint>

			{/* Render on large and up screens */}
			<Breakpoint large up>
				<nav className="flex items-center p-8">
					<img src={logo} alt="" className="pr-4 w-32" />
					<h1 className="text-4xl">Waterlog</h1>
				</nav>
			</Breakpoint>
		</>
	);
}

export default Nav;
