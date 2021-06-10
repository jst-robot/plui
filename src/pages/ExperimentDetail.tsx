import React, { useEffect, useState } from "react";

import { ExperimentStatusIcon } from "components/ExperimentStatusIcon";
import { Page } from "components/Page";
import { getExperiment } from "mock";
import { Experiment } from "mock/types";

import { Card, CardContent, Container, Typography } from "@material-ui/core";

interface ExperimentDetailProps {
  experiment_id: number;
}

export const ExperimentDetail = (props: ExperimentDetailProps) => {
  const [experiment, setExperiment] = useState<Experiment | null>(null);

  useEffect(() => {
    getExperiment(props.experiment_id).then(setExperiment);
    const handler = setInterval(() => {
      getExperiment(props.experiment_id).then(setExperiment);
    }, 1000);
    return () => clearInterval(handler);
  }, [props.experiment_id]);

  if (experiment === null) {
    return <Page>Not found</Page>;
  }

  return (
    <Page>
      <Container maxWidth="md">
        <Card>
          <CardContent>
            <Typography color="textSecondary">
              送信： {new Date(experiment.submit).toLocaleString()}
            </Typography>
            <Typography color="textSecondary">
              開始：
              {experiment.start && new Date(experiment.start).toLocaleString()}
            </Typography>
            <Typography color="textSecondary">
              終了：
              {experiment.end && new Date(experiment.end).toLocaleString()}
            </Typography>
            <Typography variant="h6">{experiment.name}</Typography>
            <Typography>{experiment.device}</Typography>
            <ExperimentStatusIcon status={experiment.status} />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default ExperimentDetail;
