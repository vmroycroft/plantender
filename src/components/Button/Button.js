import React from 'react';
import PropTypes from 'prop-types';

/**
 * A button.
 *
 * @component
 */
function Button({ onClick, variant, className, children }) {
	/**
	 * JSX
	 */

	// TODO Figure out a better way to return the correct button variant
	if (variant === 'green')
		return (
			<button
				type="button"
				onClick={onClick}
				className={`${className} py-3 px-8 rounded-full text-white bg-green-500 focus:outline-none focus:shadow-outline`}
			>
				{children}
			</button>
		);

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
