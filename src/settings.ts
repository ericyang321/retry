export interface Settings {
  waitFor: number;
  maxTries: number;
}

export const defaultSettings: Settings = {
  waitFor: 500,
  maxTries: 5,
};
