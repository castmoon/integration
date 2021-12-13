import { IAddOrder } from '../../domain/usecases/add-order';

export class CreateOrderService implements IAddOrder {
  async execute(): Promise<boolean> {
    return true;
  }
}
