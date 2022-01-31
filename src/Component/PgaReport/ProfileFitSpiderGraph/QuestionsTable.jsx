import React from 'react';
import { ReactComponent as Info } from '../../../Asset/icons/info.svg';
import {
  customTheme,
  FillButtonButton,
  StyledButton,
  StyledTable,
  useStyles,
} from '../../../Asset/StyledComponents/ProfileFitSpiderGraph';

function QuestionsTable({ questionsList, handleMouseOver, handleMouseLeave }) {
  const classes = useStyles();
  return (
    <div className={classes.viewContainer}>
      {questionsList.length !== 0 && (
        <StyledTable>
          <thead>
            <tr>
              <th>{'Questions'}</th>
              <th>{'Current Profile'}</th>
              <th>{'After completing Questionnaires'}</th>
              <th>{'After Profile Building'}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {questionsList.map(
              ({
                mbaSpiderQuestion,
                currentProfile,
                afterCompletingQuestionnaires,
                afterProfileBuilding,
                remarks,
              }) => {
                const {
                  howToMeasure,
                  id,
                  question,
                  whereToMeasure,
                } = mbaSpiderQuestion;
                return (
                  <tr>
                    <td>
                      {question}
                      <Info
                        id={id}
                        cursor={'pointer'}
                        className={classes.infoStyle}
                        onMouseMove={e =>
                          handleMouseOver(whereToMeasure, howToMeasure, e)
                        }
                        onMouseLeave={handleMouseLeave}
                      />
                    </td>
                    <td>
                      <FillButtonButton selected={true} disabled>
                        {currentProfile}
                      </FillButtonButton>
                    </td>
                    <td>
                      <FillButtonButton selected={true} disabled>
                        {afterCompletingQuestionnaires}
                      </FillButtonButton>
                    </td>
                    <td>
                      <FillButtonButton selected={true} disabled>
                        {afterProfileBuilding}
                      </FillButtonButton>
                    </td>
                    <td>
                      <StyledButton
                        variant={'text'}
                        style={customTheme.palette.text}
                        width={'102px'}
                        padding={'0px'}
                        disabled
                      >
                        {remarks ? 'Remark' : 'Add Remark'}
                      </StyledButton>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </StyledTable>
      )}
    </div>
  );
}

export default QuestionsTable;
