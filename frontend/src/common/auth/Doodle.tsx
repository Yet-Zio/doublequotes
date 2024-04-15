import 'css-doodle';

const Doodle = () => {

  return (
    <css-doodle>
      {`
      @grid: 1 / 100vw 100vh / #0c0d0c;
      background-size: 200px 200px;
      background-image: @doodle(
        @grid: 3 / 100%;
        @size: 5px;
        font-size: 5px;
        color: hsl(@r58, 25%, 15%);
        box-shadow: @m3x5(
          calc(4em - @nx*1em) @ny(*1em)
            @p(@m3(currentColor), @m2(#0000)),
          calc(2em + @nx*1em) @ny(*1em)
            @lp
        );
      );
    `}
    </css-doodle>
  );
};

export default Doodle;
// 3e3d1f