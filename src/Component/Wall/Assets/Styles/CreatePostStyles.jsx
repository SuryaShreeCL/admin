import styled from 'styled-components';

export const CreatePostContainer = styled.section`
  background: #fff;
  padding: 2rem;
  box-shadow: 0px 5px 20px rgba(0, 65, 130, 0.15);
  border-radius: 4px;
  display: flex;
  width: 100%;
  justify-content: space-around;

  .CreatePost {
    display: flex;
    flex-direction: column;
    width: 100%;

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
  justify-content: space-between;
  max-width: 80%;
`;
