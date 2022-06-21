import styled from "styled-components";

export const CreatePostContainer = styled.section`
  background: #fff;
  padding: 2.2rem 3rem;
  box-shadow: 0px 5px 20px rgba(0, 65, 130, 0.15);
  border-radius: 4px;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;

  .CreatePost {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    margin-bottom: 1.5rem;

    form {
      width: 100%;
    }

    h5 {
      margin-top: 1.5rem;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }

    .select-category {
      font-size: 1rem;
      max-width: 70%;
    }
  }
`;

export const BackHandlerContainer = styled.section`
  display: flex;
  padding: 1rem 0;
  margin-top: -2rem;

  h5 {
    margin-left: 0.6rem;
  }
`;

export const ButtonsContainer = styled.section`
  display: flex;
  justify-content: space-around;
  max-width: 100%;
  align-items: center;
  margin-top: 1rem;

  .btnscontainer: {
    justifycontent: "flex-end !important";
  }
`;

export const ButtonsContainerTwo = styled(ButtonsContainer)`
  max-width: 100%;
  margin-top: 1.5rem;
  justify-content: space-around;

  span {
    cursor: pointer;
  }
`;

export const VideoPlayerDiv = styled.div`
  width: 768px;
  height: 432px;
  margin: 0 auto;
  padding-top: 8px;
`;
