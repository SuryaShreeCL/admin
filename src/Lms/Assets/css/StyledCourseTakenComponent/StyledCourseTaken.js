import styled from "styled-components";

export const CourseContainer = styled.div`
  min-height: 672px;
  background: #ffffff;
  box-shadow: 0px 0px 7px rgba(183, 222, 255, 0.5);
  border-radius: 16px;
`;

export const CourseTabs = styled.div`
  min-height: 56px;
  position: relative;
  z-index: 1;
`;

export const CourseTabsDuplicateCard = styled.div`
  height: 50px;
  width: 100%;
  background: #1093ff;
  box-shadow: 0px 0px 7px rgb(183 222 255 / 50%);
  border-radius: 4px;
  position: absolute;
  top: 0;
  z-index: -1;
`;

export const TaskTabs = styled.div`
  height: 100%;
  background: #fafafa;
  width: 210px;
`;
