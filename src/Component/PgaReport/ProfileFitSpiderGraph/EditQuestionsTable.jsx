import React from 'react';
import { ReactComponent as Info } from '../../../Asset/icons/info.svg';
import {
  ContentWrapper,
  customTheme,
  FillButtonButton,
  OptionView,
  StyledButton,
  StyledStaticTable,
  useStyles,
  Wrapper,
} from '../../../Asset/StyledComponents/ProfileFitSpiderGraph';

const OPTIONS = [
  {
    name: 'currentProfile',
    option: [0, 0.5, 1],
  },
  {
    name: 'afterCompletingQuestionnaires',
    option: [0, 0.5, 1],
  },
  {
    name: 'afterProfileBuilding',
    option: [0, 0.5, 1],
  },
];

function EditQuestionsTable({
  selectedValues,
  questionsList,
  handleInputChange,
  handleRemark,
  handleMouseOver,
  handleMouseLeave,
}) {
  const classes = useStyles();
  return (
    <div className={classes.editContainer}>
      <Wrapper>
        <ContentWrapper>
          {questionsList.length !== 0 && (
            <StyledStaticTable>
              <tr>
                <th>{'Questions'}</th>
                <th>{'Current Profile'}</th>
                <th>{'After completing Questionnaires'}</th>
                <th>{'After Profile Building'}</th>
                <th></th>
              </tr>
              {questionsList.map(
                ({ mbaSpiderQuestion, createdBy, remarkDate }, index) => {
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

                      {OPTIONS.map(({ name, option }) => (
                        <td>
                          <OptionView>
                            {option.map(value => (
                              <FillButtonButton
                                selected={selectedValues[index][name] === value}
                                onClick={() =>
                                  handleInputChange(index, name, value)
                                }
                              >
                                {value}
                              </FillButtonButton>
                            ))}
                          </OptionView>
                        </td>
                      ))}
                      <td>
                        <StyledButton
                          variant={'text'}
                          style={customTheme.palette.text}
                          width={'102px'}
                          padding={'0px'}
                          onClick={() =>
                            handleRemark(
                              index,
                              selectedValues[index]['remarks'],
                              createdBy,
                              remarkDate,
                              id
                            )
                          }
                        >
                          {selectedValues[index]['remarks']
                            ? 'Remark'
                            : 'Add Remark'}
                        </StyledButton>
                      </td>
                    </tr>
                  );
                }
              )}
            </StyledStaticTable>
          )}
        </ContentWrapper>
      </Wrapper>
    </div>
  );
}

export default EditQuestionsTable;
