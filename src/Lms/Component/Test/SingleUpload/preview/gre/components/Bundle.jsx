import { Box, Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import React from 'react';
import Latex from '../../../../../../Utils/LatexViewer';
import {
  Table,
  Tr,
  Td,
  BundleCenter,
  TH,
} from '../../../../../../Assets/css/Preview/GreStyles';
// import Ellipse from "../../../../../../assets/icons/Ellipse.svg";
// import Ellipse from "../../../../../../Assets/icons/Ellipse.svg";
// /Assets/icons/Ellipse.svg
import Ellipse from '../../../../../../Assets/icons/Ellipse.svg';
import {
  ChoiceDiv,
  TopGrey,
  Center,
  BottomGrey,
  BundleTable,
  BundleDiv,
} from '../../../../../../Assets/css/Preview/GreStyles';

// import { ChoiceDiv } from "../../../../../../Assets/css/Preview/GreStyles";

const App = ({
  choices,
  bundleLength,
  selectedChoice,
  topText,
  question,
  bottomText,
}) => {
  var alphaOption = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
  ];
  var romanLetter = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'];

  // const renderHeader = () => {
  //   let arr = [];
  //   for (let i = 1; i <= bundleLength; i++) {
  //     arr.push(`blank (${romanLetter[i - 1]})`);
  //   }
  //   return arr;
  // };

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
    // console.log(arr);
    return arr;
  };

  let idxx = -1;

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
                        <img src={choice.choiceImage} alt='' />
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
                        <Latex math={choice.text || ''} />
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

  // console.log(topText, bottomText);
  return (
    <ChoiceDiv>
      {topText !== null && topText !== undefined && (
        <TopGrey>{topText}</TopGrey>
      )}

      <BundleCenter>
        <Typography variant='h5' color='textPrimary'>
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
