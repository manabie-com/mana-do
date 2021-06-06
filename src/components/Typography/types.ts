export type TypographyVariantType = 'default' | 'error' | 'disable';

export type StyledTypoType = {
  variant: TypographyVariantType;
};

export type TypographyType = Partial<StyledTypoType> & {
  children: React.ReactNode;
};
