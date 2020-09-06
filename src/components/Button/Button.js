import React from 'react';
import PropTypes from 'prop-types';

/**
 * A button.
 *
 * @component
 */
function Button({ onClick, className, children }) {
	/**
	 * JSX
	 */

	return (
		<button
			type="button"
			onClick={onClick}
			className={`${className} py-3 px-8 rounded-full text-white bg-blue-500 focus:outline-none focus:shadow-outline`}
		>
			{children}
		</button>
	);
}

Button.defaultProps = {
	className: ''
};

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	children: PropTypes.string.isRequired,
	className: PropTypes.string
};

export default Button;
