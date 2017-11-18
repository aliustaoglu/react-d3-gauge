Simple but handy React Gauge control made with D3.
Props are self explanatory. "colors" props is an array and there will be as many sections as its length.

Extended the example of Jake Trent from https://codepen.io/jaketrent/.

#INSTALLATION and USAGE

> npm install -save react-d3-gauge

```javascript
import ReactD3Gauge from 'react-d3-gauge';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactD3Gauge
          needleColor="blue"
          colors={['green', 'yellow', 'orange', 'red']}
          width={400}
          percent={30}
        />
      </div>
    );
  }
}

export default App;

```

#SCREENSHOTS
![Gauge 1](https://raw.githubusercontent.com/aliustaoglu/react-d3-gauge/master/img/gauge-1.png)

![Gauge 1](https://raw.githubusercontent.com/aliustaoglu/react-d3-gauge/master/img/gauge-2.png)

![Gauge 1](https://raw.githubusercontent.com/aliustaoglu/react-d3-gauge/master/img/gauge-3.png)