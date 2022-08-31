import React, { FC } from 'react';

type Props = {
  score: number
};

export const Score: FC<Props> = ({ score }) => {
  if (score > 5 || score < 0) {
    throw new Error('invalid score');
  }

  const filled = 20 * score;
  const empty = 100 - filled;

  return (
    <span>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`grad_${score}`}>
            <stop offset={`${filled}%`} stopColor="#FDC90D" />
            <stop offset={`${empty}%`} stopColor="white" />
          </linearGradient>
        </defs>
        <path fill={`url(#grad_${score})`} d="M12.6223 7.86929L17.2481 8.30758L13.7187 11.5369L13.2944 11.9251L13.4166 12.4872L14.4436 17.2076L10.5292 14.7655L10 14.4353L9.47073 14.7654L5.55559 17.2071L6.58241 12.4872L6.70468 11.9252L6.28039 11.5369L2.75157 8.30753L7.37745 7.86929L7.97941 7.81227L8.20855 7.25271L10.0001 2.8779L11.7912 7.25266L12.0204 7.81225L12.6223 7.86929ZM17.3345 8.26114C17.3345 8.26111 17.3345 8.26109 17.3345 8.26106L17.3345 8.26114Z" stroke="#FDC90D" strokeWidth="1" />
      </svg>
    </span>
  );
};
