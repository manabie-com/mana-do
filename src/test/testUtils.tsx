export const findByTestAttribute = (wrapper: any, value: string) => {
  return wrapper.find(`[data-test="${value}"]`);
};
