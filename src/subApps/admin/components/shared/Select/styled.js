import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const SelectContainer = styled.div`
  .css-1pcexqc-container {
    height: 32px;
    max-width: 220px;

    .css-bg1rzq-control {
      height: 32px;
      min-height: 32px;
      border-radius: 2px;

      border-color: ${({ error }) => error && 'tomato !important'};
    }

    .css-1szy77t-control {
      height: 32px;
      min-height: 32px;
      border-radius: 2px;

      box-shadow: none;
      border: 1px solid hsl(0,0%,80%);
      border-color: ${({ error }) => error && 'tomato !important'};
    }
  }

  .css-19bqh2r {
    fill: #545252;
    width: 17px;
  }

  .css-16pqwjk-indicatorContainer {
    padding: 0 4px 0 0;
  }

  .css-1thkkgx-indicatorContainer {
    padding: 0 4px 0 0;
  }

  .css-bgvzuu-indicatorSeparator {
    display: none;
  }
`;
