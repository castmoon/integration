import { IAddRegisterModel } from '../../domain/usecases/add-register';

export const makeCreateOrder = (oportunities: any): IAddRegisterModel => {
  const object = {
    user_id: oportunities[0].user_id.id,
    owner_name: oportunities[0].owner_name,
    value: 0,
    currency: 'BRL',
    deal_date: new Date(),
  };
  oportunities.forEach((element) => {
    object.value += element.value;
  });

  return object;
};
