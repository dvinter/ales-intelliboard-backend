import IController from '@/common/interfaces/IController';

interface IRouterResolverAdapter {
  GET(controller?: IController): Promise<unknown>;
  POST(controller?: IController): Promise<unknown>;
}

export default IRouterResolverAdapter;
