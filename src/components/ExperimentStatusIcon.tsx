import React, { ReactElement } from "react";

import { Status } from "mock/types";

import {
  faCheckCircle,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import {
  faExclamationCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StatusIcon: { [key in Status]: ReactElement } = {
  queue: <FontAwesomeIcon icon={faPaperPlane} />,
  run: <FontAwesomeIcon icon={faSpinner} pulse />,
  error: <FontAwesomeIcon icon={faExclamationCircle} />,
  done: <FontAwesomeIcon icon={faCheckCircle} />,
};

interface ExperimentStatusIconProps {
  status: Status;
}

export const ExperimentStatusIcon = (props: ExperimentStatusIconProps) => {
  console.log(props.status);
  return StatusIcon[props.status];
};
