interface IApi<RequestType, ResponseType> {
  execute(
    request: RequestType,
    response: ResponseType,
    next?: () => void
  ): Promise<unknown>;
}

export default IApi;
