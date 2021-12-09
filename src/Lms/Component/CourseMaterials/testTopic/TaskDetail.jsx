import { Box, Grid } from "@material-ui/core";
import _ from "lodash";
import QueryString from "qs";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { TaskContainer } from "../../../assets/css/StyledComponent";
import RocketIcon from "../../../assets/icons/BlueRocket.svg";
import BookmarkIcon from "../../../assets/icons/Bookmarks.svg";
import {
  getNotesWithTask,
  getTopic,
  getTopicDetail,
  pauseTask,
  updateCompletedTask,
} from "../../../redux/action/Dashboard";
import { AddBookmarks } from "../../../redux/action/Practice";
import { routePaths } from "../../../routes/RoutePath";
import BreadCrumbs from "../../../utils/BreadCrumbs";
import DialogComponent from "../../../utils/components/DialogComponent";
import LeftCard from "./LeftCard";
import RightCard from "./RightCard";
import TaskTitleCard from "./TaskTitleCard";
import simulateMouseClick from "../../../utils/methods/SimulateMouseClick";

class TaskDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskId: "",
      topicDetail: null,
      selectedStep: null,
      currentStatus: "",
      isBookmarked: false,
      dialogOpen: false,
      notesPopup: false,
      commentBoxOpen: false,
      noteData: [],
      menuAnchorEl: null,
      editNoteError: false,
      editableId: null,
      boosterDialog: false,
      currenElement: null,
      loading: false,
    };
    this.timer = null;
    this.time = 0;
    this.handleGeneralClick = this.handleGeneralClick.bind(this);
  }

  timerFunction = (operation, item) => {
    if (operation === "start") {
      this.timer = setInterval(() => {
        this.time = this.time + 1;
      }, 1000);
    } else if (operation === "stop") {
      clearInterval(this.timer);
      this.setState({ time: 0 });
      this.timer = null;
    }
  };

  componentDidMount() {
    window.document.addEventListener("click", this.handleGeneralClick, true);

    window.scrollTo(0, 0);

    const { topicId, taskId, type } = QueryString.parse(
      this.props.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );

    if (!taskId)
      this.props.getTopicDetail(topicId, "", type, response => {
        for (let i = 0; i < response.data.tasks.length; i++) {
          if (
            response.data.tasks[i].status === "TODO" ||
            response.data.tasks[i].status === "PROGRESS"
          ) {
            this.props.getNotesWithTask(response.data.tasks[i].id);

            return this.setState({
              topicDetail: response,
              selectedStep: response.data.tasks[i].id,
              currentStatus: response.data.tasks[i].status,
              isBookmarked: response.data.tasks[i].isBookmarked,
            });
          }
        }
        this.setState({
          selectedStep: response.data.tasks[0].id,
          topicDetail: response,
        });
      });
    else
      this.props.getTopicDetail(topicId, taskId, type, response => {
        for (let i = 0; i < response.data.tasks.length; i++) {
          if (response.data.tasks[i].id === taskId) {
            this.props.getNotesWithTask(taskId);

            return this.setState({
              topicDetail: response,
              selectedStep: taskId,
              currentStatus: response.data.tasks[i].status,
              isBookmarked: response.data.tasks[i].isBookmarked,
            });
          }
        }
      });

    this.timerFunction("start");
  }

  componentDidUpdate(prevProps) {
    const { topicId, taskId, type } = QueryString.parse(
      this.props.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );
    const notes = this.props.notes.data;

    if (prevProps.notes.data !== notes) {
      this.setState({ noteData: notes });
    }
  }

  componentWillUnmount() {
    const { topicId, type } = QueryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    this.timerFunction("stop");
    let obj = {
      taskId: this.state.selectedStep,
      time: this.time,
      type: type ? type.toUpperCase() : "NORMAL",
    };
    this.props.pauseTask(obj, () => {});

    window.document.removeEventListener("click", this.handleGeneralClick, true);
  }

  handleGeneralClick(e) {
    const { boost } = QueryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });

    const clsName = e.target.className.baseVal || e.target.className;
    if (boost && _.isString(clsName) && clsName.indexOf("on-boost-mode") > -1) {
      e.preventDefault();
      e.target.onclick = null;
      e.stopPropagation();
      this.setState({ boosterDialog: true, currenElement: e.target });
    }
  }

  handleLeftCardClick = e => {
    const { topicId, type } = QueryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });

    let obj = {
      taskId: this.state.selectedStep,
      time: this.time,
      type: type ? type.toUpperCase() : "NORMAL",
    };

    this.props.pauseTask(obj, res => {
      if (res.success) {
        return this.props.getTopicDetail(
          topicId,
          e.target.id,
          type,
          response => {
            for (let i = 0; i < response.data.tasks.length; i++) {
              if (response.data.tasks[i].id === e.target.id) {
                this.setState({
                  topicDetail: response,
                  currentStatus: response.data.tasks[i].status,
                });
              }
            }
          }
        );
      }
    });

    this.setState({ selectedStep: e.target.id });

    this.timerFunction("stop");

    //---------- Restarting the timer --------------
    this.time = 0;
    this.timerFunction("start");
  };

  handleReadClick = () => {
    this.setState({ loading: true });
    const { topicId, type, boost } = QueryString.parse(
      this.props.location.search,
      {
        ignoreQueryPrefix: true,
      }
    );

    let obj = {
      taskId: this.state.selectedStep,
      time: this.time,
      type: type ? type.toUpperCase() : "NORMAL",
    };

    this.timerFunction("stop");

    this.props.updateCompletedTask(obj, type, res => {
      if (res.success) {
        for (let i = 0; i < this.state.topicDetail.data.tasks.length; i++) {
          if (
            this.state.topicDetail.data.tasks[i].id === this.state.selectedStep
          ) {
            continue;
          }
          if (
            this.state.topicDetail.data.tasks[i].status === "TODO" ||
            this.state.topicDetail.data.tasks[i].status === "PROGRESS"
          ) {
            return this.props.getTopicDetail(
              topicId,
              this.state.topicDetail.data.tasks[i].id,
              type,
              response => {
                this.setState({
                  selectedStep: this.state.topicDetail.data.tasks[i].id,
                  currentStatus: this.state.topicDetail.data.tasks[i].status,
                  topicDetail: response,
                  loading: false,
                });
              }
            );
          }
        }

        if (boost)
          this.props.history.push(
            `${routePaths.dashboard.diagnosticEngine}?topicId=${topicId}`
          );
        else
          this.props.getTopicDetail(
            topicId,
            this.state.selectedStep,
            type,
            response => {
              this.setState({
                topicDetail: response,
                loading: false,
              });
            }
          );
      }
    });

    //---------- Restarting the timer --------------
    this.time = 0;
    this.timerFunction("start");
  };

  handleBookmarkClick = () => {
    if (this.state.isBookmarked) {
      this.setState({ dialogOpen: true });
    } else this.handleButton2Click();
  };

  handleButton2Click = () => {
    const currentTask = this.state.topicDetail.data.tasks
      .filter(item => item.id === this.state.selectedStep)
      .pop();

    let bookmarkData = { id: currentTask.id, type: "task" };
    this.props.AddBookmarks(bookmarkData, response => {
      if (response.success) {
        this.setState({
          isBookmarked: response.data.isBookmarked,
          // isBookmarked: response.data.isBookmarked,
          dialogOpen: false,
        });
      }
    });
  };

  menu = [
    {
      name: "edit",
      text: "Edit",
    },
    {
      name: "delete",
      text: "Delete",
    },
  ];

  handleNotesIconClick = () => {
    this.setState({ notesPopup: !this.state.notesPopup });
  };

  handleMenuItem = name => {
    const { noteId, notes, highlightText } = this.state;
    this.setState({ menuAnchorEl: null });
    if (name === "edit") {
      this.setState({ editableId: noteId });
    }
    if (name === "delete") {
      const taskId = this.props.taskContents.id;
      this.props.removeNote(taskId, noteId, response => {
        if (response.success) {
          this.props.getNotesWithTask(taskId);
          this.setState({
            noteId: null,
            editableId: null,
          });
        }
      });
    }
    if (name === "resize") {
      const { subjectId, conceptId, id } = this.props.topics.data;
      this.props.history.push(
        `${routePaths.dashboard.notes}?subjectId=${subjectId}&conceptId=${conceptId}&topicId=${id}`
      );
    }
    if (name === "addNotes") {
      this.setState({ addNotesPopupOpen: true });
    }
    if (name === "notesSave" && notes.trim().length !== 0) {
      const taskId = this.props.taskContents.id;
      var notesData = { data: highlightText, notes: notes };
      this.props.addNotes(taskId, notesData, respone => {
        if (respone.success) {
          this.props.getNotesWithTask(taskId);
          this.setState({
            addNotesPopupOpen: false,
            highlightText: "",
            notes: "",
          });
        }
      });
    }
  };

  render() {
    const { taskId } = QueryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    const { t } = this.props;
    const leftCardProps = {
      location: this.props.location,
      history: this.props.history,
      topicResponse: this.props.topics && this.props.topics.data,
      selectedStep: this.state.selectedStep,
      handleLeftCardClick: this.handleLeftCardClick,
      t: t,
    };

    const notesPops = {
      data: this.state.noteData,
      menu: this.menu,
      noteData: this.state.noteData,
      menuAnchorEl: this.state.menuAnchorEl,
      editNoteError: this.state.editNoteError,
      editableId: this.state.editableId,
      commentBoxOpen: this.state.notesPopup,
      onCloseClick: this.handleNotesIconClick,
      handleMenuItem: this.handleMenuItem,
      t: t,
    };

    const rightCardProps = {
      content:
        this.props.topics &&
        this.props.topics.data.contents
          .filter(item => item.id === this.state.selectedStep && item)
          .pop(),
      handleReadClick: this.handleReadClick,
      currentStatus: this.state.currentStatus,
      handleBookmarkClick: this.handleBookmarkClick,
      isBookmarked: this.state.isBookmarked,
      handleNotesIconClick: this.handleNotesIconClick,
      notesPops: notesPops,
      t: t,
      loading: this.state.loading,
    };

    return (
      <TaskContainer>
        <Box paddingBottom={2}>
          <BreadCrumbs
            topics={this.state.topicDetail}
            goBack={() => this.props.history.push(routePaths.dashboard.subject)}
            backEvent={false}
          />
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <TaskTitleCard
              topicResponse={this.props.topics && this.props.topics.data}
              t={this.props.t}
            />
          </Grid>
          <Grid item xs={3}>
            <LeftCard {...leftCardProps} />
          </Grid>

          <Grid item xs={9}>
            <RightCard {...rightCardProps} />
          </Grid>
        </Grid>

        {/* Popup components */}
        <DialogComponent
          open={this.state.dialogOpen}
          dialogContent={{
            icon: <img src={BookmarkIcon} />,
            title: t(`Are you sure you want remove bookmark?`),
            button1: t("Cancel"),
            button2: t("Yes"),
          }}
          handleButton2Click={this.handleButton2Click}
          handleButton1Click={() => this.setState({ dialogOpen: false })}
        />
        <DialogComponent
          open={this.state.boosterDialog}
          dialogContent={{
            icon: <img src={RocketIcon} />,
            title: t(`You are current on the track to boost your score`),
            body: t("Try pushing your limits to give your best"),
            button1: t("Quit for now"),
            button2: t("Continue"),
          }}
          handleButton1Click={() => {
            window.document.removeEventListener(
              "click",
              this.handleGeneralClick,
              true
            );
            simulateMouseClick(this.state.currenElement);
          }}
          handleButton2Click={() => this.setState({ boosterDialog: false })}
        />
      </TaskContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    topics: state.dashboardReducer.topicDetails,
    notes: state.DashBoardReducer.taskNotes,
  };
};

export default connect(mapStateToProps, {
  updateCompletedTask,
  getTopic,
  pauseTask,
  getTopicDetail,
  AddBookmarks,
  getNotesWithTask,
})(withRouter(withTranslation()(TaskDetail)));
