import IRouterResolverAdapter from '@/common/adapters/IRouterResolverAdapter';
interface IRouter {
  routes(routerResolverAdapter: IRouterResolverAdapter): Promise<void>;
}

export default IRouter;
