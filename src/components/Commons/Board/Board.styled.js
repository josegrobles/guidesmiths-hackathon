import styled from 'styled-components';
import Board from './Board.component';

export default styled(Board)`
  .board-grid {
    display: grid;
    grid-template-columns: repeat(10, 20%);
    grid-template-rows: repeat(10, 20%);
    width: 100vw;
  }
`;
