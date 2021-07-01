import styled from 'styled-components';

export const PreviewContainer = styled.section`
  max-width: 500px;
`;

export const Frame = styled.div`
  position: relative;
  height: 770px;
  width: 400px;

  img {
    max-height: 100%;
  }
`;

export const Post = styled.div`
  position: absolute;
  top: 70px;
  left: 40px;
  max-width: 300px;
  background: #ffffff;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  .Poster {
    img {
      max-width: 100%;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
  }
  .CaptionContainer {
    padding: 0.5rem;
    max-height: 200px;
    overflow: hidden;
  }

  .BottomBar {
    display: flex;
    padding: 0.5rem 1rem;
    position: relative;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid lightgrey;

    .digits {
      margin-left: 5px;
    }

    .commentIcon {
      position: absolute;
      left: 80px;
    }
  }
`;
