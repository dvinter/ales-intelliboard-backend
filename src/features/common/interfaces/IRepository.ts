interface IRepository<T> {
  findAll?(model: T): Promise<unknown>;
  findOne?(model: T, id: string | number): Promise<unknown>;
}

export default IRepository;
