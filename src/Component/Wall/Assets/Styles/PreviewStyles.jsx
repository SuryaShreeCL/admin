import styled from 'styled-components';

export const PreviewContainer = styled.section``;

export const Frame = styled.div`
  position: relative;
  height: 770px;

  img {
    max-height: 100%;
  }
`;

export const Post = styled.div`
  position: absolute;
  top: 70px;
  left: 40px;
  max-width: 300px;
  min-width: 300px;
  background: #ffffff;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  border-radius: 4px;

  .Poster {
    img {
      max-width: 100%;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
  }
  .CaptionContainer {
    padding: 0.5rem 0.7rem;
    max-height: 200px;
    overflow: hidden;

    p {
      margin: 0;
    }
  }

  .TopBar {
    display: flex;
    padding: 0.5rem 0.7rem;
    margin-top: 10px;
    position: relative;
    align-items: center;
    justify-content: flex-start;
  }

  .BottomBar {
    display: flex;
    padding: 0.5rem 0.7rem;
    position: relative;
    align-items: center;
    justify-content: flex-end;
    /* border-bottom: 1px solid lightgrey; */

    .digits {
      margin-left: 5px;
    }

    .commentIcon {
      position: absolute;
      left: 80px;
    }

    .redirectionBtn {
      text-decoration: none;
      background: linear-gradient(89.33deg, #067fdc 30.67%, #5cd3dc 96.74%);
      border-radius: 26px;
      padding: 6px 20px;
      color: #ffff;
    }
  }
`;
