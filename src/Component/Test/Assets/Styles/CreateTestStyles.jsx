import styled from 'styled-components';

export const CreateTestContainer = styled.section`
  background: #fff;
  padding: 2.2rem 3rem;
  box-shadow: 0px 5px 20px rgba(0, 65, 130, 0.15);
  border-radius: 4px;
  display: flex;
  width: 100%;
  justify-content: space-around;

  .CreateTest {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;

    h6 {
      margin-bottom: 1.2rem;
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
  justify-content: center;
  max-width: 100%;
  align-items: center;
  margin-top: 2rem;
`;

export const ButtonsContainerTwo = styled(ButtonsContainer)`
  max-width: 100%;
  margin-top: 1.5rem;
  justify-content: space-around;

  span {
    cursor: pointer;
  }
`;
