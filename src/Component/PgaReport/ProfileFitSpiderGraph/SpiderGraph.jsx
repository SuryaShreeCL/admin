import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  CenteredIcon,
  CenteredText,
  GraphHeader,
  RightContainer,
  Typo,
  useStyles,
} from '../../../Asset/StyledComponents/ProfileFitSpiderGraph';

function SpiderGraph({ isGenerate, graphData }) {
  const classes = useStyles();
  const getGraphData = graph => {
    if (
      graph.managementFit &&
      graph.intellectualAbilities &&
      graph.peopleSkills &&
      graph.mbaProgramFit &&
      graph.globalMindset
    ) {
      return {
        currentProfile: [
          graph.managementFit.currentProfile,
          graph.intellectualAbilities.globalMindset,
          graph.peopleSkills.globalMindset,
          graph.mbaProgramFit.globalMindset,
          graph.globalMindset.globalMindset,
        ],
        afterCompletingQuestionnaires: [
          graph.managementFit.afterCompletingQuestionnaires,
          graph.intellectualAbilities.afterCompletingQuestionnaires,
          graph.peopleSkills.afterCompletingQuestionnaires,
          graph.mbaProgramFit.afterCompletingQuestionnaires,
          graph.globalMindset.afterCompletingQuestionnaires,
        ],
        afterProfileBuilding: [
          graph.managementFit.afterProfileBuilding,
          graph.intellectualAbilities.afterProfileBuilding,
          graph.peopleSkills.afterProfileBuilding,
          graph.mbaProgramFit.afterProfileBuilding,
          graph.globalMindset.afterProfileBuilding,
        ],
      };
    } else return {};
  };

  const RadarData = ({
    currentProfile,
    afterCompletingQuestionnaires,
    afterProfileBuilding,
  }) => ({
    labels: [
      'Management fit',
      'Intellectual abilities',
      'People skills',
      'MBA Program fit',
      'Global Mindset',
    ],
    datasets: [
      {
        label: 'Current Profile',
        backgroundColor: 'rgba(255, 192, 0, .3)',
        borderColor: '#FFC000',
        pointBackgroundColor: 'rgba(255, 192, 0, .5)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#FFC000',
        data: currentProfile,
      },
      {
        label: 'After Completing Questionnaires',
        backgroundColor: 'rgba(20, 122, 214, .3)',
        borderColor: '#147AD6',
        pointBackgroundColor: 'rgba(20, 122, 214, .5)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#147AD6',
        data: afterCompletingQuestionnaires,
      },
      {
        label: 'After Profile Building',
        backgroundColor: 'rgba(236, 102, 102, .3)',
        borderColor: '#EC6666',
        pointBackgroundColor: 'rgba(236, 102, 102, .5)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#EC6666',
        data: afterProfileBuilding,
      },
    ],
  });

  const RadarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scale: {
      beginAtZero: true,
      ticks: {
        min: 0,
        max: 10,
        stepSize: 2,
      },
      angleLines: {
        color: 'rgba(255, 255, 255, .5)',
        lineWidth: 2,
      },
      gridLines: {
        color: 'rgba(255, 255, 255, .5)',
        circular: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'PROFILE GAP ANALYSIS (based on current profile)',
        align: 'start',
        color: '#649ecb',
        font: {
          size: 16,
        },
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 15,
          boxHeight: 15,
          usePointStyle: true,
          pointStyle: 'rectRounded',
          padding: 30,
          color: '#333333',
          font: {
            size: 14,
          },
        },
      },
    },
    elements: {
      point: {
        radius: 3,
      },
      line: {
        borderWidth: 1,
      },
    },
    scales: {
      r: {
        pointLabels: {
          padding: 15,
          color: '#333333',
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <RightContainer>
      <GraphHeader isBottom={isGenerate}>
        <Typo variant={'h6'} fontSize={'18px'}>
          {'Spider Graph'}
        </Typo>
      </GraphHeader>
      {isGenerate && graphData ? (
        <div className={classes.graphLayout}>
          <Radar
            id={'spider_graph'}
            data={RadarData(getGraphData(graphData))}
            options={RadarOptions}
            height={'370px'}
          />
        </div>
      ) : (
        <div>
          <CenteredIcon />
          <CenteredText>{'Spider graph is not generated'}</CenteredText>
        </div>
      )}
    </RightContainer>
  );
}

export default SpiderGraph;
