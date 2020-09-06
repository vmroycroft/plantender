import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Breakpoint } from 'react-socks';
import { parseISO } from 'date-fns';

import Plant from './Plant';

/**
 * The weekly plant checklist.
 *
 * @component
 */
function PlantChecklist() {
	const PLANTS = gql`
		query GetPlants {
			plants {
				id
				name
				lastWatered
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
					lastWatered={parseISO(plant.lastWatered)}
				/>
			);
		});
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
				<form>
					<div>{plants}</div>
				</form>
			</Breakpoint>

			{/* Render on large and up screens */}
			<Breakpoint large up>
				<form>
					<div className="px-12 py-6">{plants}</div>
				</form>
			</Breakpoint>
		</>
	);
}

export default PlantChecklist;
