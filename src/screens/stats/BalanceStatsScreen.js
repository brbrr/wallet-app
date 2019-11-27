/**
 * External dependencies
 */
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { VictoryChart, VictoryAxis, VictoryArea, VictoryVoronoiContainer, VictoryTooltip } from 'victory-native';
import moment from 'moment';

// import process from 'process';

/**
 * Internal dependencies
 */
import ChartDataProvider from '../../utils/chart-data-provider';
import chartTheme from './chartTheme';

class StatsScreen extends Component {
	static navigationOptions = ( { navigation } ) => {
		return {
			title: 'Balance Stats',
		};
	};

	constructor( props ) {
		super( props );

		console.log( '!!!! StatsScreen' );

		this.dataProvider = new ChartDataProvider( props.stats, props );
	}

	renderChart1( data, domain ) {
		return (
			<VictoryChart
				// width={ 350 }
				height={ 200 }
				theme={ chartTheme }
				// scale={ { x: 'linear', y: 'log' } }
				containerComponent={ <VictoryVoronoiContainer /> }

			>
				<VictoryAxis tickCount={ 8 }
					style={ {
						ticks: { size: 0 },
						tickLabels: { fontSize: 10, padding: 5 },
					} }
				/>
				<VictoryAxis
					dependentAxis
					style={ {
						ticks: { size: 0 },
						tickLabels: { fontSize: 10, padding: 5 },
						axis: { stroke: null },
					} }
				/>
				<VictoryArea
					interpolation="basis"
					data={ data }
					domain={ domain }
					labelComponent={
						<VictoryTooltip
							style={ { fontSize: 10 } }
						/>
					}
					labels={ ( { datum } ) => {
						return `x: ${ datum.x }, y: ${ datum.y }`;
					} }
					style={
						{
							data: {
								stroke: '#00a78f',
								fill: '#8ee9d4',
								opacity: 0.5,
							},
							labels: { fontSize: 10 },
						}
					}
				/>
			</VictoryChart> );
	}

	getDomain( data ) {
		let min = data[ 0 ].y;
		let max = data[ 0 ].y;
		data.forEach( ( entry ) => {
			const balance = entry.y;
			min = balance < min ? balance : min;
			max = balance > max ? balance : max;
		} );

		let domain = { y: [ 0, max + ( 0.1 * max ) ] };
		if ( min < 0 ) {
			domain = { y: [ min - ( 0.1 * max ), max + ( 0.1 * max ) ] };
		}

		return domain;
	}

	render() {
		console.log( '##### 1 ', new Date() );

		// const dailyData = this.dataProvider.getDailyChartData( this.props.balanceTrend );
		const monthlyData = this.dataProvider.getMonthlyChartData( this.props.balanceTrend );

		console.log( '##### 1-1 ', new Date() );

		// const monthlyData = dailyData.filter( ( entry, idx ) => {
		// 	const isFits = moment( entry._date ).isSame( moment( entry._date ).endOf( 'month' ), 'day' ) ||
		// 	idx === ( dailyData.length - 1 );
		// 	return isFits;
		// } );

		// console.log( '##### 2 ', new Date() );

		// const domain = this.getDomain( dailyData );
		const monthlyDomain = this.getDomain( monthlyData );
		// console.log( '##### 3 ', new Date() );

		return (
			<ScrollView>
				<View style={ { flex: 1 } }>
					<Text>
						Balance Stats!
					</Text>
					{ /* { this.renderChart1( dailyData, domain ) } */ }
				</View>
				<View>
					{ this.renderChart1( monthlyData, monthlyDomain ) }
				</View>
			</ScrollView>
		);
	}
}

export const mapStateToProps = ( state ) => {
	const { records, accounts, categories, currencies, stats, balanceTrend } = state;
	return {
		records,
		accounts,
		categories,
		currencies,
		stats,
		balanceTrend,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( StatsScreen );

