import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import {
	add,
	format,
	formatDistanceToNow,
	formatISO,
	isBefore
} from 'date-fns';
import { Modal } from 'react-responsive-modal';
import DatePicker from 'react-datepicker';

import Button from '../../components/Button';

import waterImage from '../../assets/images/water.svg';
import fertilizeImage from '../../assets/images/fertilize.svg';

import 'react-responsive-modal/styles.css';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * A plant for the checklist.
 *
 * @component
 */
function Plant({ id, name, lastWatered, lastFertilized, fertilizeFrequency }) {
	const [isWaterModalOpen, setIsWaterModalOpen] = useState(false);
	const [isFertilizeModalOpen, setIsFertilizeModalOpen] = useState(false);

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

	/**
	 * Functions
	 */

	const capitalizeFirstLetter = (text) => {
		return text.charAt(0).toUpperCase() + text.slice(1);
	};

	/**
	 * Returns a string stating when the plant was last watered.
	 */
	const getLastWateredMessage = () => {
		const date = format(lastWatered, 'E MMM d, y');
		const howLongAgo = capitalizeFirstLetter(
			formatDistanceToNow(lastWatered, { addSuffix: true })
		);

		return (
			<>
				<img src={waterImage} alt="" className="inline-block w-4" />
				<span className="text-gray-700 ml-2 mr-8">{date}</span>
				{/* <span className="text-sm text-gray-500">Due in 5 days</span> */}
				<div className="text-sm text-gray-500 ml-6 -mt-1">{howLongAgo}</div>
			</>
		);
	};

	/**
	 * Returns a string stating when the plant was last fertilized.
	 */
	const getLastFertilizedMessage = () => {
		const date = format(lastFertilized, 'E MMM d, y');
		const howLongAgo = capitalizeFirstLetter(
			formatDistanceToNow(lastFertilized, { addSuffix: true })
		);
		const nextFertilize = formatDistanceToNow(
			add(lastFertilized, { days: fertilizeFrequency })
		);
		const nextFertilizeMessage =
			nextFertilize > new Date() ? 'Due in' : 'Overdue by';

		return (
			<>
				<img src={fertilizeImage} alt="" className="inline-block w-4" />
				<span className="text-gray-700 ml-2 mr-8">{date}</span>
				{fertilizeFrequency && (
					<span className="text-sm text-gray-500">
						{nextFertilizeMessage} {nextFertilize}
					</span>
				)}
				<div className="text-sm text-gray-500 ml-6 -mt-1">{howLongAgo}</div>
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
	const openWater = () => {
		setIsWaterModalOpen(true);
	};

	/**
	 *
	 */
	const openFertilize = () => {
		setIsFertilizeModalOpen(true);
	};

	/**
	 *
	 */
	const water = (date) => {
		waterPlant({ variables: { id, date: formatDate(date) } });
		setIsWaterModalOpen(false);
	};

	/**
	 *
	 */
	const fertilize = (date) => {
		fertilizePlant({ variables: { id, date: formatDate(date) } });
		setIsFertilizeModalOpen(false);
	};

	/**
	 * JSX
	 */

	return (
		<>
			<div className="border-b border-tan-300 p-4">
				<h3 className="text-xl text-gray-700 mb-2">{name}</h3>
				<div className="mb-2">{getLastWateredMessage()}</div>
				{lastFertilized && (
					<div className="mb-4">{getLastFertilizedMessage()}</div>
				)}
				<div className="text-center">
					<Button onClick={openWater} className="mr-4">
						Water
					</Button>
					{lastFertilized && (
						<Button onClick={openFertilize} variant="brown">
							Fertilize
						</Button>
					)}
				</div>
			</div>
			<Modal
				open={isWaterModalOpen}
				onClose={() => setIsWaterModalOpen(false)}
				center
			>
				<img src={waterImage} alt="" className="inline-block w-4" />
				<h2 className="inline-block text-lg ml-2 mb-6">{name}</h2>
				<Button className="block w-full mb-6" onClick={() => water(new Date())}>
					Today
				</Button>
				<DatePicker
					selected={lastWatered}
					onChange={(date) => water(date)}
					filterDate={(date) => isBefore(date, new Date())}
					inline
				/>
			</Modal>
			<Modal
				open={isFertilizeModalOpen}
				onClose={() => setIsFertilizeModalOpen(false)}
				center
			>
				<img src={fertilizeImage} alt="" className="inline-block w-4" />
				<h2 className="inline-block text-lg ml-2 mb-6">{name}</h2>
				<Button
					className="block w-full mb-6"
					onClick={() => fertilize(new Date())}
					variant="brown"
				>
					Today
				</Button>
				<DatePicker
					selected={lastFertilized}
					onChange={(date) => fertilize(date)}
					filterDate={(date) => isBefore(date, new Date())}
					inline
				/>
			</Modal>
		</>
	);
}

Plant.defaultProps = {
	lastFertilized: null,
	fertilizeFrequency: 0
};

Plant.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	lastWatered: PropTypes.instanceOf(Date).isRequired,
	lastFertilized: PropTypes.instanceOf(Date),
	fertilizeFrequency: PropTypes.number
};

export default Plant;
