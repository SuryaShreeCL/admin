import styled from 'styled-components';

export const FileHeaderContainer = styled.section`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  justify-content: space-between;
  align-items: center;

  .img-container {
    margin-right: 1rem;
    max-height: 300px;

    img {
      border-radius: 4px;
    }
  }
  .img-details {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    height: 60px;

    .img-progress,
    .img-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
  }
`;
