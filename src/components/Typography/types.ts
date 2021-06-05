export type VarientType = 'default' | 'error' | 'disable';

export type StyledTypoType = {
  variant: VarientType;
};

export type TypographyType = Partial<StyledTypoType> & {
  children: React.ReactNode;
};
