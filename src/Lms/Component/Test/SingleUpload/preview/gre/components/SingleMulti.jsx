import { Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import React from 'react';
import {
  BottomGrey,
  Center,
  ChoiceBox,
  ChoiceDiv,
  ChoiceInnerBox,
  Table,
  Td,
  TopGrey,
  Tr,
} from '../../../../../../Assets/css/Preview/GreStyles';
import { SingleSelect as Style } from '../../../../../../Assets/css/Preview/TestComponent';
import Ellipse from '../../../../../../Assets/icons/Ellipse.svg';
import Latex from '../../../../../../Utils/LatexViewer';

const SingleSelect = ({
  question,
  options,
  selectedChoice,
  isMulti,
  description,
  imgUrl,
  isCalculator,
  topText,
  bottomText,
}) => {
  const { Question, OptionContainer, Option, OptionBox, OptionTitle } = Style;

  const renderChoices = () => {
    if (isMulti) {
      return (
        <ChoiceBox>
          <ChoiceInnerBox>
            {options.map((choice, index) => {
              if (choice.choiceImage)
                return (
                  <FormControlLabel
                    id={choice.id}
                    control={
                      <Checkbox
                        name={choice.id}
                        id={choice.id}
                        color='primary'
                        checked={selectedChoice.some(
                          selected => selected === choice.id
                        )}
                      />
                    }
                    label={
                      <Typography variant='h6' color='textPrimary'>
                        <Latex math={choice.text || ''} />
                      </Typography>
                    }
                  />
                );

              else
                return (
                  <FormControlLabel
                    id={choice.id}
                    control={
                      <Checkbox
                        name={choice.id}
                        id={choice.id}
                        color='primary'
                        checked={selectedChoice.some(
                          selected => selected === choice.id
                        )}
                      />
                    }

                    label={
                      <Typography variant='h6' color='textPrimary'>
                        <Latex math={choice.text || ''} />
                      </Typography>
                    }

                  />
                );
            })}
          </ChoiceInnerBox>
        </ChoiceBox>
      );

    } else {
      return (
        <Table>
          {options.map((choice, index) => {
            if (choice.choiceImage)
              return (
                <Tr>
                  <Td active={selectedChoice.indexOf(choice.id) > -1}>
                    <img src={Ellipse} alt='' />
                    <img src={choice.choiceImage} alt='' />
                  </Td>
                </Tr>
              );

            else
              return (
                <Tr>
                  <Td active={selectedChoice.indexOf(choice.id) > -1}>
                    <img src={Ellipse} alt='' />
                    &nbsp;
                    <Latex math={choice.text || ''} />
                  </Td>
                </Tr>
              );
          })}

        </Table>
      );
    }
  };

  return (

    <ChoiceDiv>
      {topText !== null && topText !== undefined && (
        <TopGrey>{topText}</TopGrey>
      )}
      

      <Center>
        <Typography variant='h5' color='textPrimary'>
          <Latex math={question} />
        </Typography>

        {renderChoices()}
      </Center>

      {bottomText !== null && bottomText !== undefined && (
        <BottomGrey>{bottomText}</BottomGrey>
      )}
    </ChoiceDiv>
  );
};

export default SingleSelect;
