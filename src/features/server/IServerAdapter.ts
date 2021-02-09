interface IServerAdapter {
  instance: unknown;

  routes(): unknown;
  middlewares(): unknown;
  start(): unknown;
}

export default IServerAdapter;
