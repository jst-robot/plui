export type Status = "queue" | "run" | "error" | "done";

export interface Experiment {
  id: number;
  name: string;
  device: string;
  submit: number;
  start: number | null;
  end: number | null;
  status: Status;
}

export interface Device {
  name: string;
  cap: number;
  jobs: number;
  time: number;
}
