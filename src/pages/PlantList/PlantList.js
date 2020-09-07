import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Breakpoint } from 'react-socks';

import PlantGroup from './PlantGroup';

/**
 * The plant watering list.
 *
 * @component
 */
function PlantList() {
	const PLANTS = gql`
		query GetPlants {
			plants {
				id
				name
				group
				lastWatered
				lastFertilized
			}
		}
	`;

	const { loading, error, data } = useQuery(PLANTS);

	let plantGroups = [];
	if (data) {
		// Get all unique plant group values (e.g. "Herbs", "Succulents", etc.)
		plantGroups = [
			...new Set(data.plants.map((plant) => plant.group))
		].map((group) => (
			<PlantGroup
				key={`group-${group}`}
				name={group}
				plants={data.plants.filter((plant) => plant.group === group)}
			/>
		));
	}

	/**
	 * JSX
	 */

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<>
			{/* Render on extra small, small, and medium screens */}
			<Breakpoint medium down>
				<div>{plantGroups}</div>
			</Breakpoint>

			{/* Render on large and up screens */}
			<Breakpoint large up>
				<div className="px-12 py-6">{plantGroups}</div>
			</Breakpoint>
		</>
	);
}

export default PlantList;
