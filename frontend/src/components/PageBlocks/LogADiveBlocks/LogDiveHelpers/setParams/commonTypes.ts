export type InferTypes<T> = T extends { [Property in keyof T]: infer U }
  ? U
  : never;

export type PropertiesObjectType<Obj> = { [Property in keyof Obj]: Property };
export type GetPropertiesUnion<Obj> = InferTypes<PropertiesObjectType<Obj>>;
export type GetObjectType<K, O> = K extends keyof O ? O[K] :never;
