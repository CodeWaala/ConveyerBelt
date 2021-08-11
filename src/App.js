import "./App.css";
import * as React from "react";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stations: [
        { id: 0, itemCount: 0 },
        { id: 1, itemCount: 0 },
        { id: 2, itemCount: 0 },
        { id: 3, itemCount: 0 },
        { id: 4, itemCount: 0 },
        { id: 5, itemCount: 0 },
        { id: 6, itemCount: 0 },
        { id: 7, itemCount: 0 },
        { id: 8, itemCount: 0 },
        { id: 9, itemCount: 0 }
      ],
      items: []
    };
    this.putAnItemOnConveyerBelt = this.putAnItemOnConveyerBelt.bind(this);
    this.moveAnItemFromConveyerBeltToAStation = this.moveAnItemFromConveyerBeltToAStation.bind(
      this
    );
  }

  render() {
    const { stations, items } = this.state;
    return (
      <div className="App">
        <header className="App-header">Conveyor Belt Simulator</header>
        <div className="ConveyorBelt-container">
          <div className="ConveyorBelt">
            {items.map(({ type, x }, index) => {
              return (
                <div
                  className="Package"
                  key={`${type}${index}`}
                  style={{ position: "absolute", left: x }}
                >
                  {type}
                </div>
              );
            })}
            <div className="Gear"></div>
            <div className="Gear right"></div>
          </div>
          <div className="StationsContainer">
            {stations.map(({ id, itemCount }) => {
              return (
                <div className="AStation" key={id}>
                  <div>{`Station number: ${id}`}</div>
                  <div>Item Count: {itemCount}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.startPuttingItemsOnConveyerBelt();
    this.startMovingItemsFromConveyerBeltToAStation();
  }

  componentWillUnmount() {
    this.stopPuttingItemsOnConveyerBelt();
    this.stopMovingItemsFromConveyerBeltToAStation();
  }

  getRandomInteger(max = 10) {
    return Math.floor(Math.random() * max);
  }

  startPuttingItemsOnConveyerBelt() {
    this.addItemInterval = setInterval(this.putAnItemOnConveyerBelt, 1000);
  }

  stopPuttingItemsOnConveyerBelt() {
    clearInterval(this.addItemInterval);
  }

  startMovingItemsFromConveyerBeltToAStation() {
    this.removeItemInterval = setInterval(
      this.moveAnItemFromConveyerBeltToAStation,
      1000
    );
  }

  stopMovingItemsFromConveyerBeltToAStation() {
    clearInterval(this.removeItemInterval);
  }

  putAnItemOnConveyerBelt() {
    const { items } = this.state;
    const newItem = {};
    newItem.type = this.getRandomInteger();
    newItem.x = 0;
    const newItems = [...items, newItem];
    this.setState({ items: newItems });
    this.moveItems();
  }

  moveItems() {
    const { items } = this.state;
    const newItems = items.map(anItem => {
      return { ...anItem, x: anItem.x + 100 };
    }); // move item by 100 px.
    this.setState({ items: newItems });
  }

  // belt is full if there are 10 items on it.
  isConveyerBeltFull() {
    const { items } = this.state;
    return items.length >= 10;
  }

  moveAnItemFromConveyerBeltToAStation() {
    if (this.isConveyerBeltFull()) {
      // if belt full then move the item on the front of the belt
      const { items, stations } = this.state;
      const { type } = items[0];

      const newStations = stations.map(aStation => {
        const { id, itemCount } = aStation;
        if (id === type) {
          // move to proper station type
          return { ...aStation, itemCount: itemCount + 1 };
        }

        return aStation;
      });

      this.setState({ items: items.slice(1), stations: newStations });
    }
  }
}

export default App;
