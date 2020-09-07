import React from 'react';
import PropTypes from 'prop-types';

/**
 * A button.
 *
 * @component
 */
function Button({ onClick, variant, className, children }) {
	const bgColor = `bg-${variant}-500`;

	/**
	 * JSX
	 */

	return (
		<button
			type="button"
			onClick={onClick}
			className={`${className} ${bgColor} py-3 px-8 rounded-full text-white focus:outline-none focus:shadow-outline`}
		>
			{children}
		</button>
	);
}

Button.defaultProps = {
	variant: 'blue',
	className: ''
};

Button.propTypes = {
	children: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	variant: PropTypes.string,
	className: PropTypes.string
};

export default Button;
