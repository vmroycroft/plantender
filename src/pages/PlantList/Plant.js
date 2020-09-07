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
function Plant({ id, name, lastWatered, lastFertilized }) {
	// TODO Put GraphQL queries and mutations in their own folder
	const WATER_PLANT = gql`
		mutation WaterPlant($id: String!, $date: String!) {
			waterPlant(id: $id, date: $date) {
				success
				message
				plant {
					id
					name
					lastWatered
					lastFertilized
				}
			}
		}
	`;

	const FERTILIZE_PLANT = gql`
		mutation FertilizePlant($id: String!, $date: String!) {
			fertilizePlant(id: $id, date: $date) {
				success
				message
				plant {
					id
					name
					lastWatered
					lastFertilized
				}
			}
		}
	`;

	const [waterPlant] = useMutation(WATER_PLANT);
	const [fertilizePlant] = useMutation(FERTILIZE_PLANT);

	// see https://github.com/Hacker0x01/react-datepicker/issues/2104
	// TODO Fix eslint errors
	const DatePickerButton = forwardRef(
		({ text, onClick, variant, className }, ref) => {
			return (
				<Button onClick={onClick} variant={variant} className={className}>
					{text}
				</Button>
			);
		}
	);

	/**
	 * Functions
	 */

	/**
	 * Returns a string stating when the plant was last watered.
	 */
	const getLastWateredMessage = () => {
		const date = format(lastWatered, 'EEEE MMMM d, y');
		const howLongAgo = formatDistanceToNow(lastWatered, { addSuffix: true });

		return (
			<>
				Last <span className="text-blue-500">watered</span> on {date} (
				{howLongAgo})
			</>
		);
	};

	/**
	 * Returns a string stating when the plant was last fertilized.
	 */
	const getLastFertilizedMessage = () => {
		const date = format(lastFertilized, 'EEEE MMMM d, y');
		const howLongAgo = formatDistanceToNow(lastFertilized, { addSuffix: true });

		return (
			<>
				Last <span className="text-green-500">fertilized</span> on {date} (
				{howLongAgo})
			</>
		);
	};

	/**
	 * Changes the time of the date to 'now' and formats it as an ISO string.
	 */
	const formatDate = (date) => {
		// The time being passed from react-datepicker isn't 'now', so change it here
		const now = new Date();
		date.setHours(now.getHours());
		date.setMinutes(now.getMinutes());
		date.setSeconds(now.getSeconds());

		return formatISO(date);
	};

	/**
	 *
	 */
	const water = (date) => {
		waterPlant({ variables: { id, date: formatDate(date) } });
	};

	/**
	 *
	 */
	const fertilize = (date) => {
		fertilizePlant({ variables: { id, date: formatDate(date) } });
	};

	/**
	 * JSX
	 */

	return (
		<div className="flex justify-between border-b border-tan-300 p-4">
			<div>
				<h3 className="text-lg mb-2">{name}</h3>
				<div className="text-sm mb-2">{getLastWateredMessage()}</div>
				<div className="text-sm">{getLastFertilizedMessage()}</div>
			</div>
			<div>
				<DatePicker
					selected={lastWatered}
					onChange={(date) => water(date)}
					customInput={<DatePickerButton className="mb-4" text="Water" />}
					filterDate={(date) => isBefore(date, new Date())}
					todayButton="Today"
					withPortal
				/>
				<DatePicker
					selected={lastFertilized}
					onChange={(date) => fertilize(date)}
					customInput={<DatePickerButton text="Fertilize" variant="green" />}
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
	lastWatered: PropTypes.instanceOf(Date).isRequired,
	lastFertilized: PropTypes.instanceOf(Date).isRequired
};

export default Plant;
