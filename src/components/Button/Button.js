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
	if (variant === 'brown')
		return (
			<button
				type="button"
				onClick={onClick}
				// TODO Is there a better way to prevent the page from scrolling to the focused button?
				onMouseDown={(e) => e.preventDefault()}
				className={`${className} rounded-md py-2 px-4 text-white bg-brown-500 border-b-4 active:border-b-1 border-brown-700 focus:outline-none focus:shadow-outline`}
			>
				{children}
			</button>
		);

	return (
		<button
			type="button"
			onClick={onClick}
			// TODO Is there a better way to prevent the page from scrolling to the focused button?
			onMouseDown={(e) => e.preventDefault()}
			className={`${className} rounded-md py-2 px-4 text-white bg-blue-500 border-b-4 active:border-b-1 border-blue-700 focus:outline-none focus:shadow-outline`}
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
