import { ActionsType } from '../LogDiveData/actions';

type InferTypes<T> = T extends { [key: string]: infer U }
  ? U
  : never;
export type InferredActionsType = ReturnType<InferTypes<ActionsType>>;
