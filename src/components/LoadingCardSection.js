/**
 * External dependencies
 */
import React from 'react';
/**
 * Internal dependencies
 */
import { CardSection } from './CardSection';
import { Spinner } from './Spinner';

const LoadingCardSection = ( props ) => {
	if ( props.loading ) {
		return (
			<CardSection>
				<Spinner />
			</CardSection>
		);
	}

	return (
		<CardSection>
			{ props.children }
		</CardSection>
	);
};
export { LoadingCardSection };
