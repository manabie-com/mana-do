import theme from 'globalTheme';
import styled from 'styled-components';

const createMediaQueries = () => {
  let sizes = theme.responsive;
  let css = '';
  for (const key in sizes) {
    if (Object.prototype.hasOwnProperty.call(sizes, key)) {
      const element = sizes[key as keyof typeof sizes];
      css += `@media screen and (min-width: ${element}) {max-width: ${element};}`;
    }
  }
  return css;
};

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 0.8rem;

  ${createMediaQueries()}
`;

export default Container;
