import React, { Component } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Image from "../../Asset/Images/leftpic.png";
import Grid from "@material-ui/core/Grid";
import CareerImage from "../../Asset/Images/cimg.png";
import "../../Asset/All.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Switch, Router } from "react-router-dom";
import $ from "jquery";
import Home from "./Home";
import FieldOfStudy from "./FieldOfStudy";
import CareerOption from "./CareerOption";
import Personality from "./Personality";
import CardView from "./CardView";
import CareerInterest from "./CareerInterest";
import CareerInterest1 from "./CareerInterest1";
import CareerInterest2 from "./CareerInterest2";
import Feedback from "./Feedback";
import College from "./College";
import RengineNew from "./RengineNew";
import PageComponent from "./PageComponent";
import { getQuestions } from "../../Actions/Questions";
import { connect } from "react-redux";
import CareerInterest3 from "./CareerInterest3";

export class RecHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 1,
    };
  }

  componentDidMount() {
    this.props.getQuestions();
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/Rengine/"
          render={(props) => (
            <PageComponent
              {...props}
              component={Home}
              sidecontainer={true}
              welcome={true}
              pageCount={1}
            />
          )}
        />
        <Route
          exact
          path="/Rengine/college"
          render={(props) => (
            <PageComponent
              {...props}
              component={College}
              sidecontainer={true}
              pageCount={2}
              prograssCount={1}
            />
          )}
        />
        <Route
          exac
          path="/Rengine/study"
          render={(props) => (
            <PageComponent
              {...props}
              component={FieldOfStudy}
              sidecontainer={true}
              pageCount={3}
              prograssCount={2}
            />
          )}
        />
        <Route
          exact
          path="/Rengine/careerOption"
          render={(props) => (
            <PageComponent
              {...props}
              component={CareerOption}
              sidecontainer={true}
              pageCount={4}
              prograssCount={3}
            />
          )}
        />
        <Route
          exact
          path="/Rengine/personality"
          render={(props) => (
            <PageComponent
              {...props}
              component={Personality}
              sidecontainer={true}
              pageCount={5}
              prograssCount={4}
            />
          )}
        />
        <Route
          exact
          path="/Rengine/careerInterest"
          render={(props) => (
            <PageComponent
              {...props}
              component={CareerInterest}
              sidecontainer={true}
              pageCount={6}
              prograssCount={5}
            />
          )}
        />
        <Route
          exact
          path="/Rengine/careerInterest1"
          render={(props) => (
            <PageComponent
              {...props}
              component={CareerInterest1}
              sidecontainer={true}
              pageCount={7}
              prograssCount={6}
            />
          )}
        />
        <Route
          exact
          path="/Rengine/careerInterest2"
          render={(props) => (
            <PageComponent
              {...props}
              component={CareerInterest2}
              sidecontainer={true}
              pageCount={8}
              prograssCount={7}
            />
          )}
        />
        <Route
          exact
          path="/Rengine/careerInterest3"
          render={(props) => (
            <PageComponent
              {...props}
              component={CareerInterest3}
              sidecontainer={true}
              pageCount={9}
              prograssCount={8}
            />
          )}
        />
        <Route
          exact
          path="/Rengine/careerTrack"
          render={(props) => (
            <PageComponent
              {...props}
              component={RengineNew}
              sidecontainer={false}
              pageCount={10}
            />
          )}
        />
        <Route
          exact
          path="/Rengine/feedback"
          render={(props) => (
            <PageComponent
              {...props}
              component={Feedback}
              sidecontainer={true}
              pageCount={11}
            />
          )}
        />
      </Switch>
    );
  }
}

const mapStateToprops = (state) => {
  return { QuestionList: state.QuestionsReducer.QuestionList };
};

export default connect(mapStateToprops, { getQuestions })(RecHome);
