import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native' 
import { LineChart, Grid,XAxis, YAxis } from 'react-native-svg-charts'
import { Circle, Line, Rect, Text, Defs, LinearGradient, Stop, G } from 'react-native-svg'
 
export default class App extends React.PureComponent {
 
  
    render() {

      const axesSvg = { fontSize: 10, fill: 'grey' };
      const verticalContentInset = { top: 10, bottom: 10 }
      const xAxisHeight = 30
 
        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
 
        const Gradient = () => (
          <Defs key={'gradient'}>
              <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                  <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'}/>
                  <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'}/>
              </LinearGradient>
          </Defs>
        )

        const HorizontalLine = (({ y }) => (
          <Line
              key={ 'zero-axis' }
              x1={ '0%' }
              x2={ '100%' }
              y1={ y(50) }
              y2={ y(50) }
              stroke={ 'grey' }
              strokeDasharray={ [ 4, 8 ] }
              strokeWidth={ 2 }
          />
        ))
      const CustomGrid = ({ x, y, data, ticks }) => (
        <G>
            {
                // Horizontal grid
                ticks.map(tick => (
                    <Line
                        key={ tick }
                        x1={ '0%' }
                        x2={ '100%' }
                        y1={ y(tick) }
                        y2={ y(tick) }
                        stroke={ 'rgba(0,0,0,0.2)' }
                    />
                ))
            }
            {
                // Vertical grid
                data.map((_, index) => (
                    <Line
                        key={ index }
                        y1={ '0%' }
                        y2={ '100%' }
                        x1={ x(index) }
                        x2={ x(index) }
                        stroke={ 'rgba(0,0,0,0.2)' }
                    />
                ))
            }
        </G>
    )

    const Tooltip = ({ x, y }) => (
      <G
          x={ x(5) - (75 / 2) }
          key={ 'tooltip' }
          onPress={ () => console.log('tooltip clicked') }
      >
          <G y={ 50 }>
              <Rect
                  height={ 40 }
                  width={ 75 }
                  stroke={ 'grey' }
                  fill={ 'white' }
                  ry={ 10 }
                  rx={ 10 }
              />
              <Text
                  x={ 75 / 2 }
                  dy={ 20 }
                  alignmentBaseline={ 'middle' }
                  textAnchor={ 'middle' }
                  stroke={ 'rgb(134, 65, 244)' }
              >
                  { `${data[5]}ºC` }
              </Text>
          </G>
          <G x={ 75 / 2 }>
              <Line
                  y1={ 50 + 40 }
                  y2={ y(data[ 5 ]) }
                  stroke={ 'grey' }
                  strokeWidth={ 2 }
              />
              <Circle
                  cy={ y(data[ 5 ]) }
                  r={ 6 }
                  stroke={ 'rgb(134, 65, 244)' }
                  strokeWidth={ 2 }
                  fill={ 'white' }
              />
          </G>
      </G>
  )

  return (
    <View style={styles.container}>
    <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
        <YAxis
            data={data}
            style={{ marginBottom: xAxisHeight }}
            contentInset={verticalContentInset}
            svg={axesSvg}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
            <LineChart
                style={{ flex: 1 }}
                data={data}
                contentInset={verticalContentInset}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
            >
                  <Grid/>
                  <Gradient/>
                  <HorizontalLine/>
                  <CustomGrid belowChart={true}/>
                  <Tooltip/>
            </LineChart>
            <XAxis
                style={{ marginHorizontal: -10, height: xAxisHeight }}
                data={data}
                formatLabel={(value, index) => index}
                contentInset={{ left: 10, right: 10 }}
                svg={axesSvg}
            />

        </View>
    </View>
    </View>
)
        
    }
 
}

const WIDTH = Dimensions.get('window').width - 30;

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    marginTop: 50,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:2,
    borderColor: 'gray',
    margin: 3
  
  }
})