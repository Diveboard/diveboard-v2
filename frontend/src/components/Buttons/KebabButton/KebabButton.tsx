import React, { FC } from 'react';

import classes from './KebabButton.module.scss';

type Props = {
  children?: React.ReactNode;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
};

const KebabButton: FC<Props> = ({
  className,
  disabled = false,
  onClick,
  children,
}) => (
  <button
    className={`${classes[className]} ${classes.button}`}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

export default KebabButton;
