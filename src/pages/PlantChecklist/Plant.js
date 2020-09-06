import React, { forwardRef } from 'react';
import { gql, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import { format, formatDistanceToNow, formatISO, isBefore } from 'date-fns';
import DatePicker from 'react-datepicker';

import Button from '../../components/Button';

import 'react-datepicker/dist/react-datepicker.css';

/**
 * A plant for the checklist.
 *
 * @component
 */
function Plant({ id, name, lastWatered }) {
	const WATER_PLANT = gql`
		mutation WaterPlant($id: String!, $date: String!) {
			waterPlant(id: $id, date: $date) {
				success
				message
				plant {
					id
					name
					lastWatered
				}
			}
		}
	`;

	const [waterPlant] = useMutation(WATER_PLANT);

	// see https://github.com/Hacker0x01/react-datepicker/issues/2104
	// TODO Fix eslint errors
	const DatePickerButton = forwardRef(({ onClick, text }, ref) => {
		return <Button onClick={onClick}>{text}</Button>;
	});

	/**
	 * Functions
	 */

	/**
	 * Returns a string stating when the plant was last watered.
	 */
	const getLastWateredMessage = () => {
		return `Last watered on ${format(
			lastWatered,
			'EEEE MMMM d, y'
		)} (${formatDistanceToNow(lastWatered, { addSuffix: true })})`;
	};

	/**
	 *
	 */
	const water = (date) => {
		// The time being passed from react-datepicker isn't 'now', so change it here
		const now = new Date();
		date.setHours(now.getHours());
		date.setMinutes(now.getMinutes());
		date.setSeconds(now.getSeconds());

		waterPlant({ variables: { id, date: formatISO(date) } });
	};

	/**
	 * JSX
	 */

	return (
		<div className="flex justify-between border-b border-tan-300 p-4">
			<div>
				<div>{name}</div>
				<div>{getLastWateredMessage()}</div>
			</div>
			<div>
				<DatePicker
					selected={lastWatered}
					onChange={(date) => water(date)}
					customInput={<DatePickerButton onClick={water} text="Water" />}
					filterDate={(date) => isBefore(date, new Date())}
					todayButton="Today"
					withPortal
				/>
			</div>
		</div>
	);
}

Plant.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	lastWatered: PropTypes.instanceOf(Date).isRequired
};

export default Plant;
