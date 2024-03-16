import cors from 'cors';

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

export default cors(corsOptions);