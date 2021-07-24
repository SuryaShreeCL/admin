import React from "react";
import Poor from "../../Asset/Images/poor.svg";
import Unhappy from "../../Asset/Images/unhappy.svg";
import Apathy from "../../Asset/Images/apathy.svg";
import Happy from "../../Asset/Images/happy.svg";
import Love from "../../Asset/Images/love.svg";
import '../../Asset/All.css'


export default class App extends React.Component {

  arr = [
    {
      image: Poor,
      value: 1,
      title: "Poor"
    },
    {
      image: Unhappy,
      value: 2,
      title: "Unhappy"
    },
    {
      image: Apathy,
      value: 3,
      title: "Apathy"
    },
    {
      image: Happy,
      value: 4,
      title: "Happy"
    },
    {
      image: Love,
      value: 5,
      title: "Love"
    }   
  ];
  render() {
    return (
      <div className="App">
        <div style={{ display: "flex", gridGap: 18 }}>
          {this.arr.map((item) => (
            <div
              className={
                this.props.rating !== item.value
                  ? "rating__item"
                  : "rating__item__active"
              }
              style={{textAlign:'center'}}
              onClick={() => {
                this.props.onClick(item)
              }}
            >
              <img src={item.image} width={55} alt={''} />
              <label>{item.title}</label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

