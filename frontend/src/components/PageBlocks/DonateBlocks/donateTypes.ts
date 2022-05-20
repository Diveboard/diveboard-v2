import React from 'react';

export type PlanType = '3/month' | '5/month' | 'custom';
export type ContentModeType = 'main' | 'plan' | 'success';

export type DonateFormProps = {
  planMode: PlanType
  setPlanMode: React.Dispatch<React.SetStateAction<PlanType>>
  contentMode: ContentModeType
  setContentMode: React.Dispatch<React.SetStateAction<ContentModeType>>
};

export type DonateMainProps = Pick<DonateFormProps, 'setContentMode' | 'setPlanMode'>;
export type PlanButtonsProps = Pick<DonateFormProps, 'planMode' | 'setPlanMode'>;
export type FormProps = Pick<DonateFormProps, 'planMode' | 'setContentMode'>;
