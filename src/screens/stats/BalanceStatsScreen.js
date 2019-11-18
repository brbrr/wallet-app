/**
 * External dependencies
 */
import React, { Component } from 'react';
import { Dimensions, View, Text } from 'react-native';
import { connect } from 'react-redux';
import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph,
	StackedBarChart,
} from 'react-native-chart-kit';

class StatsScreen extends Component {
	static navigationOptions = ( { navigation } ) => {
		return {
			title: 'Balance Stats',
		};
	};

	render() {
		return (
			<View>
				<Text>
        Balance Stats!
				</Text>
				<View>
					<Text>Bezier Line Chart</Text>
					<LineChart
						data={ {
							labels: [ 'January', 'February', 'March', 'April', 'May', 'June' ],
							datasets: [
								{
									data: [
										Math.random() * 100,
										Math.random() * 100,
										Math.random() * 100,
										Math.random() * 100,
										Math.random() * 100,
										Math.random() * 100,
									],
								},
							],
						} }
						width={ Dimensions.get( 'window' ).width } // from react-native
						height={ 220 }
						yAxisLabel={ '$' }
						yAxisSuffix={ 'k' }
						chartConfig={ {
							backgroundColor: '#e26a00',
							backgroundGradientFrom: '#fb8c00',
							backgroundGradientTo: '#ffa726',
							decimalPlaces: 2, // optional, defaults to 2dp
							color: ( opacity = 1 ) => `rgba(255, 255, 255, ${ opacity })`,
							labelColor: ( opacity = 1 ) => `rgba(255, 255, 255, ${ opacity })`,
							style: {
								borderRadius: 16,
							},
							propsForDots: {
								r: '6',
								strokeWidth: '2',
								stroke: '#ffa726',
							},
						} }
						bezier
						style={ {
							marginVertical: 8,
							borderRadius: 16,
						} }
					/>
				</View>
			</View>
		);
	}
}

export const mapStateToProps = ( state ) => {
	const { records, accounts, categories, currencies } = state;
	return {
		records,
		accounts,
		categories,
		currencies,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( StatsScreen );

