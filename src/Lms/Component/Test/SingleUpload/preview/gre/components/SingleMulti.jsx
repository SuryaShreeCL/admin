import { Box, FormControlLabel, Checkbox, Typography } from "@material-ui/core";
import React from "react";
import {
  BottomGrey,
  Center,
  TopGrey,
  Table,
  Tr,
  Td,
  ChoiceBox,
  ChoiceInnerBox,
  ChoiceDiv,
} from "../../../../../../Assets/css/Preview/GreStyles";
import {
  SingleSelect as Style,
  Div,
} from "../../../../../../Assets/css/Preview/TestComponent";
import Latex from "../../../../../../Utils/LatexViewer";
// import Ellipse from "../../../../../../assets/icons/Ellipse.svg";
import Ellipse from "../../../../../../Assets/icons/Ellipse.svg";

const SingleSelect = ({
  question,
  options,
  onSelect,
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
                        color="primary"
                        checked={selectedChoice.some(
                          selected => selected === choice.id
                        )}
                      />
                    }
                    label={
                      <Typography variant="h6" color="textPrimary">
                        <Latex math={choice.text || ""} />
                      </Typography>
                    }
                    onChange={onSelect}
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
                        color="primary"
                        checked={selectedChoice.some(
                          selected => selected === choice.id
                        )}
                      />
                    }
                    label={
                      <Typography variant="h6" color="textPrimary">
                        <Latex math={choice.text || ""} />
                      </Typography>
                    }
                    onChange={onSelect}
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
                  <Td
                    active={selectedChoice.indexOf(choice.id) > -1}
                    onClick={() => onSelect(choice)}
                  >
                    <img src={Ellipse} alt="" />
                    <img src={choice.choiceImage} alt="" />
                  </Td>
                </Tr>
              );
            else
              return (
                <Tr>
                  <Td
                    active={selectedChoice.indexOf(choice.id) > -1}
                    onClick={() => onSelect(choice)}
                  >
                    <img src={Ellipse} alt="" />
                    &nbsp;
                    <Latex math={choice.text || ""} />
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
        <Typography variant="h5" color="textPrimary">
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
