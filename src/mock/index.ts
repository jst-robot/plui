import { Device, Experiment } from "./types";

export const initDevices = () => {
  const devices: Device[] = [
    {
      name: "プリンタ１",
      cap: 10,
      jobs: 0,
      time: 5,
    },
    {
      name: "プリンタ２",
      cap: 5,
      jobs: 0,
      time: 10,
    },
    {
      name: "大判プリンタ",
      cap: 1,
      jobs: 0,
      time: 60,
    },
  ];
  localStorage.setItem("devices", JSON.stringify(devices));
};

export const getDevices = async (): Promise<Device[]> => {
  const item = localStorage.getItem("devices");
  return item === null ? [] : (JSON.parse(item) as Device[]);
};

export const getDevice = async (query: string): Promise<Device | null> => {
  const devices = await getDevices();
  const match = devices.filter(({ name }) => name === query);
  return match.length === 0 ? null : match[0];
};

export const updateDevices = async (): Promise<void> => {
  const experiments = await getExperiments();
  const devices = (await getDevices()).map(({ name, cap, time }) => ({
    name,
    cap,
    jobs: experiments.filter(
      ({ device, status }) => device === name && status === "run"
    ).length,
    time,
  }));
  localStorage.setItem("devices", JSON.stringify(devices));
};

export const getExperiments = async (): Promise<Experiment[]> => {
  const item = localStorage.getItem("experiments");
  return item === null ? [] : (JSON.parse(item) as Experiment[]);
};

export const getExperiment = async (
  query: number
): Promise<Experiment | null> => {
  const experiments = await getExperiments();
  const match = experiments.filter(({ id }) => id === query);
  return match.length === 0 ? null : match[0];
};

export const updateExperiments = async (): Promise<void> => {
  const experiments = await Promise.all(
    (await getExperiments()).map(
      async (experiment): Promise<Experiment> => {
        const now = Date.now();

        if (now - experiment.submit < 2000) {
          return { ...experiment, status: "queue" };
        }

        const device = await getDevice(experiment.device);

        if (device === null) {
          return { ...experiment, status: "error" };
        }

        if (experiment.status === "queue") {
          if (device.jobs < device.cap) {
            return { ...experiment, start: now, status: "run" };
          }
          return experiment;
        }

        if (experiment.status === "run" && experiment.start) {
          if (now - experiment.start < device.time * 1000) {
            return experiment;
          }
          return { ...experiment, end: now, status: "done" };
        }

        if (experiment.status === "done") {
        }

        return experiment;
      }
    )
  );
  localStorage.setItem("experiments", JSON.stringify(experiments));
};

export const addExperiment = async (
  name: string,
  device: string,
  data?: Record<string, string | number | File>
) => {
  const before = await getExperiments();
  const after = [
    {
      id: before.length,
      name,
      device,
      submit: Date.now(),
      start: null,
      end: null,
      status: "queue",
    },
    ...before,
  ];
  localStorage.setItem("experiments", JSON.stringify(after));
};

export const clearExperiments = async (): Promise<void> => {
  localStorage.removeItem("experiments");
};
