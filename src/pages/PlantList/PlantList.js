import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Breakpoint } from 'react-socks';
import { parseISO } from 'date-fns';

import Plant from './Plant';

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
				watered
				fertilized
				fertilizeFrequency
			}
		}
	`;

	const { loading, error, data } = useQuery(PLANTS);

	let plants = [];
	if (data) {
		plants = data.plants.map((plant) => {
			return (
				<Plant
					key={plant.id}
					id={plant.id}
					name={plant.name}
					watered={plant.watered}
					fertilized={plant.fertilized ? plant.fertilized : null}
					fertilizeFrequency={
						plant.fertilizeFrequency ? plant.fertilizeFrequency : 0
					}
				/>
			);
		});

		// order by last watered
		plants.sort(
			(a, b) => parseISO(a.props.watered[0]) - parseISO(b.props.watered[0])
		);
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
				<div>{plants}</div>
			</Breakpoint>

			{/* Render on large and up screens */}
			<Breakpoint large up>
				<div className="px-12 py-6">{plants}</div>
			</Breakpoint>
		</>
	);
}

export default PlantList;
