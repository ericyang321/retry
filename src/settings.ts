export type PayloadFunc = (payload?: any) => any;

export interface Settings {
  waitFor: number;
  maxTries: number;
  async: boolean;
  success?: PayloadFunc;
}

export const defaultSettings: Settings = {
  waitFor: 500,
  maxTries: 5,
  async: false,
  success: function() {},
};
