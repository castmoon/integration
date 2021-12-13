export interface IController {
  handle(): Promise<any>;
}
