import { Typography, Box } from "@material-ui/core";
import React from "react";
import {
  BottomGrey,
  BundleCenter,
  BundleDiv,
  ChoiceDiv,
  Table,
  Td,
  TH,
  TopGrey,
  Tr,
} from "../../../../../../Assets/css/Preview/GreStyles";
import Latex from "../../../../../../Utils/LatexViewer";

const App = ({
  choices,
  bundleLength,
  selectedChoice,
  topText,
  question,
  bottomText,
}) => {
  var alphaOption = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
  ];
  var romanLetter = ["i", "ii", "iii", "iv", "v", "vi", "vii"];

  const renderOptions = () => {
    let arr = [];
    for (let i = 1; i <= bundleLength; i++) {
      let choice = [];
      for (let j = 0; j < choices.length; j++) {
        if (choices[j].bundleNo === i) {
          choice.push(choices[j]);
        }
      }
      arr.push({
        bundleNo: i,
        choices: choice,
        head: `Blank (${romanLetter[i - 1]})`,
      });
    }
    return arr;
  };

  const renderChoices = () => {
    return (
      <BundleDiv>
        {renderOptions().map((item, i) => {
          let indx = 0;
          return (
            <Table>
              <tr>
                <TH>{item.head}</TH>
              </tr>
              {item.choices.map((choice, index) => {
                if (choice.choiceImage)
                  return (
                    <Tr>
                      <Td
                        active={selectedChoice.some(
                          selected =>
                            selected.bundleNo === item.bundleNo &&
                            selected.id === choice.id
                        )}
                      >
                        <img src={choice.choiceImage} alt="" />
                      </Td>
                    </Tr>
                  );
                else
                  return (
                    <Tr>
                      <Td
                        active={selectedChoice.some(
                          selected =>
                            selected.bundleNo === item.bundleNo &&
                            selected.id === choice.id
                        )}
                      >
                        <Latex math={choice.text || ""} />
                      </Td>
                    </Tr>
                  );
              })}
            </Table>
          );
        })}
      </BundleDiv>
    );
  };

  return (
    <ChoiceDiv>
      {topText !== null && topText !== undefined && (
        <TopGrey>{topText}</TopGrey>
      )}

      <BundleCenter>
        <Typography variant="h5" color="textPrimary">
          <Latex math={question} />
        </Typography>

        {renderChoices()}
      </BundleCenter>

      {bottomText !== null && bottomText !== undefined && (
        <BottomGrey>{bottomText}</BottomGrey>
      )}
    </ChoiceDiv>
  );
};

export default App;
