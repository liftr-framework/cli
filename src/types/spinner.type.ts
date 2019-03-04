export interface Spinner {
  spinner: string;
  color: string;
  text: string;
  stop: Function;
  succeed: Function;
  info: Function;
  warn: Function;
}
