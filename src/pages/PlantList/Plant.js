import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import {
	add,
	format,
	formatDistanceToNow,
	formatISO,
	isBefore,
	parseISO
} from 'date-fns';
import { Modal } from 'react-responsive-modal';
import DatePicker from 'react-datepicker';

import Button from 'components/Button';

import undoImage from 'assets/images/undo.svg';
import waterImage from 'assets/images/water.svg';
import fertilizeImage from 'assets/images/fertilize.svg';

import 'react-responsive-modal/styles.css';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './plant.module.css';

/**
 * A plant for the checklist.
 *
 * @component
 */
function Plant({ id, name, watered, fertilized, fertilizeFrequency }) {
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
					watered
					fertilized
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
					watered
					fertilized
				}
			}
		}
	`;

	const UNDO_WATER_PLANT = gql`
		mutation UndoWaterPlant($id: String!) {
			undoWaterPlant(id: $id) {
				success
				message
				plant {
					id
					name
					watered
					fertilized
				}
			}
		}
	`;

	const UNDO_FERTILIZE_PLANT = gql`
		mutation UndoFertilizePlant($id: String!) {
			undoFertilizePlant(id: $id) {
				success
				message
				plant {
					id
					name
					watered
					fertilized
				}
			}
		}
	`;

	const [waterPlant] = useMutation(WATER_PLANT);
	const [fertilizePlant] = useMutation(FERTILIZE_PLANT);
	const [undoWaterPlant] = useMutation(UNDO_WATER_PLANT);
	const [undoFertilizePlant] = useMutation(UNDO_FERTILIZE_PLANT);

	/**
	 * Functions
	 */

	const capitalizeFirstLetter = (text) => {
		return text.charAt(0).toUpperCase() + text.slice(1);
	};

	const getLastWateredDate = () => {
		return parseISO(watered[0]);
	};

	const getLastFertilizedDate = () => {
		return fertilized.length > 0 ? parseISO(fertilized[0]) : null;
	};

	/**
	 * Returns a string stating when the plant was last watered.
	 */
	const getLastWateredMessage = () => {
		const date = format(getLastWateredDate(), 'E MMM d, y');

		const howLongAgo = capitalizeFirstLetter(
			formatDistanceToNow(getLastWateredDate(), { addSuffix: true })
		);

		return (
			<>
				<img src={waterImage} alt="" className="inline-block w-4" />
				<span className="text-gray-700 ml-2 mr-8">{date}</span>
				<div className="text-sm text-gray-500 ml-6 -mt-1">{howLongAgo}</div>
			</>
		);
	};

	/**
	 * Returns a string stating when the plant was last fertilized.
	 */
	const getLastFertilizedMessage = () => {
		const date = format(getLastFertilizedDate(), 'E MMM d, y');

		const howLongAgo = capitalizeFirstLetter(
			formatDistanceToNow(getLastFertilizedDate(), { addSuffix: true })
		);

		const nextFertilize = add(getLastFertilizedDate(), {
			days: fertilizeFrequency
		});

		const nextFertilizeMessage =
			(nextFertilize > new Date() ? 'Due in ' : 'Overdue by ') +
			formatDistanceToNow(nextFertilize);

		return (
			<>
				<img src={fertilizeImage} alt="" className="inline-block w-4" />
				<span className="text-gray-700 ml-2 mr-8">{date}</span>
				{fertilizeFrequency && (
					<span className="text-sm text-gray-500">{nextFertilizeMessage}</span>
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
	 *
	 */
	const undoWater = () => {
		undoWaterPlant({ variables: { id } });
	};

	/**
	 *
	 */
	const undoFertilize = () => {
		undoFertilizePlant({ variables: { id } });
	};

	/**
	 * JSX
	 */

	return (
		<>
			<div className="border-b border-tan-300 p-4">
				<h3 className="text-xl text-gray-700 mb-2">{name}</h3>
				<div className="mb-2">{getLastWateredMessage()}</div>
				{fertilized.length > 0 && (
					<div className="mb-4">{getLastFertilizedMessage()}</div>
				)}
				<div className="text-center">
					<Button onClick={openWater} className="mr-4">
						Water
					</Button>
					{/* TODO Why does fertilizeFrequency && ... put a 0 where the button would go? */}
					{fertilizeFrequency !== 0 && (
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
				<Button
					className={styles.undo}
					variant="icon"
					onClick={() => undoWater()}
				>
					<img src={undoImage} alt="" />
				</Button>
				<Button className="block w-full mb-6" onClick={() => water(new Date())}>
					Today
				</Button>
				<DatePicker
					selected={getLastWateredDate()}
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
					variant="icon"
					className={styles.undo}
					onClick={() => undoFertilize()}
				>
					<img src={undoImage} alt="" />
				</Button>
				<Button
					className="block w-full mb-6"
					onClick={() => fertilize(new Date())}
					variant="brown"
				>
					Today
				</Button>
				<DatePicker
					selected={getLastFertilizedDate()}
					onChange={(date) => fertilize(date)}
					filterDate={(date) => isBefore(date, new Date())}
					inline
				/>
			</Modal>
		</>
	);
}

Plant.defaultProps = {
	fertilized: [],
	fertilizeFrequency: 0
};

Plant.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	watered: PropTypes.arrayOf(PropTypes.string).isRequired,
	fertilized: PropTypes.arrayOf(PropTypes.string),
	fertilizeFrequency: PropTypes.number
};

export default Plant;
