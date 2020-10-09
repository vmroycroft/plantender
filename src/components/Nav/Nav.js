import React from 'react';
import { Breakpoint } from 'react-socks';

import logo from '../../assets/images/logo.svg';

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
				<nav className="flex justify-center items-end p-4">
					<img src={logo} alt="" className="w-16" />
					<h1 className="text-3xl text-gray-700">Plantender</h1>
				</nav>
			</Breakpoint>

			{/* Render on large and up screens */}
			<Breakpoint large up>
				<nav className="flex items-end p-4">
					<img src={logo} alt="" className="w-16" />
					<h1 className="text-3xl">Plantender</h1>
				</nav>
			</Breakpoint>
		</>
	);
}

export default Nav;
