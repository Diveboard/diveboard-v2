import React, { FC } from 'react';

type Props = {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  x?: number;
  y?: number;
};

export const MarginWrapper: FC<Props> = ({
  left = 0,
  right = 0,
  top = 0,
  bottom = 0,
  x = 0,
  y = 0,
  children,
}) => {
  const m = `${top}px ${right}px ${bottom}px ${left}px`;
  const mX = `0 ${x}px`;
  const mY = `${y}px 0`;
  // eslint-disable-next-line no-nested-ternary
  const margin = !x && !y ? m : x ? mX : mY;

  return (
    <div
      style={{
        margin,
        display: 'inline-block',
      }}
    >
      {children}
    </div>
  );
};
