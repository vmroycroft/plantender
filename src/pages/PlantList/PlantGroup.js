import React from 'react';
import PropTypes from 'prop-types';
import { parseISO } from 'date-fns';

import Plant from './Plant';

/**
 *
 *
 * @component
 */
function PlantGroup({ name, plants }) {
	const plantComponents = plants.map((plant) => {
		return (
			<Plant
				key={plant.id}
				id={plant.id}
				name={plant.name}
				lastWatered={parseISO(plant.lastWatered)}
			/>
		);
	});

	/**
	 * JSX
	 */

	return (
		<div>
			<h2 className="text-2xl">{name}</h2>
			{plantComponents}
		</div>
	);
}

PlantGroup.propTypes = {
	name: PropTypes.string.isRequired,
	plants: PropTypes.array.isRequired
};

export default PlantGroup;
