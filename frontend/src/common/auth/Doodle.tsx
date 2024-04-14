import React from 'react';
import 'css-doodle';

const Doodle: React.FunctionComponent = () => {
  return (
    <css-doodle>
      {`
      @grid: 1 / 100vw 100vh;
      background-size: 100px 100px;
      background-image: url('/img/quotes-fill.png');
    `}
    </css-doodle>
  );
};

export default Doodle;