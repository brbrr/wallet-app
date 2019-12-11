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

		this.dataProvider = new ChartDataProvider( props.stats, props.state );
	}

	renderChart1( data, domain, tickFormat = ( t ) => moment( t ).format( 'MMM' ), tickCount = 8, tickValues = null ) {
		return (
			<VictoryChart
				// width={ 350 }
				height={ 200 }
				theme={ chartTheme }
				containerComponent={ <VictoryVoronoiContainer /> }

			>
				<VictoryAxis
					scale={ { x: 'time' } }
					// tickCount={ tickCount }
					tickFormat={ tickFormat }
					tickValues={ tickValues }
					style={ {
						ticks: { size: 0 },
						tickLabels: { fontSize: 8, padding: 5 },
					} }
				/>

				<VictoryAxis
					dependentAxis
					tickFormat={ ( t ) => `${ Math.round( t / 1000 ) }k` }
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
		const values = data.map( ( e ) => e.y );
		const min = Math.min( ...values );
		const max = Math.max( ...values );

		let domain = { y: [ 0, max + ( 0.1 * max ) ] };
		if ( max < 0 ) {
			domain = { y: [ min - ( 0.1 * max ), 0 ] };
		} else if ( min < 0 ) {
			domain = { y: [ min - ( 0.1 * max ), max + ( 0.1 * max ) ] };
		}

		return domain;
	}

	render() {
		console.log( 'before:', new Date() );
		const dailyData = this.dataProvider.getDailyChartData( moment().subtract( 1, 'months' ).startOf( 'month' ) );
		const monthlyData = this.dataProvider.getMonthlyChartData();
		console.log( 'after:', new Date() );

		const domain = this.getDomain( dailyData );
		const monthlyDomain = this.getDomain( monthlyData );

		return (
			<ScrollView>
				<View style={ { flex: 1 } }>
					<Text>
						Balance Stats!
					</Text>
					{ this.renderChart1( dailyData, domain, ( t ) => moment( t ).format( 'DD.MM' ), 8, dailyData.map( ( e ) => e.x ).filter( ( d, i ) => i % 4 === 0 ) ) }
				</View>
				<View>
					{ this.renderChart1( monthlyData, monthlyDomain ) }
				</View>
			</ScrollView>
		);
	}
}

export const mapStateToProps = ( state ) => {
	return {
		state,
	};
};

export const mapDispatchToProps = ( dispatch ) => {
	return {};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( StatsScreen );

