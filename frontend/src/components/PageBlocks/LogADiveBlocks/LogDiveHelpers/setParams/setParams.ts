import React from 'react';
import { GetObjectType, GetPropertiesUnion } from './commonTypes';

type NameTypeN<State> = GetPropertiesUnion<State> extends string? GetPropertiesUnion<State>: never;
type ParamTypeN<Name, State> = GetObjectType<Name, State>;
export const setParams = <StateType,
  >(
    state: StateType,
    setState: React.Dispatch<React.SetStateAction<StateType>>) => <
  NameType extends NameTypeN<StateType> >(
      name: NameType,
      param: ParamTypeN<NameType, StateType>,
    ) => {
      setState({
        ...state,
        [name]: param,
      });
    };
