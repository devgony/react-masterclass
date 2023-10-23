import { useQuery } from "react-query";
import { IHistorical } from "./Chart";
import { fetchCoinHistory } from "../api";
import styled from "styled-components";
import { useMemo } from "react";

interface IPriceProps {
  coinId: string;
}

const GridColTwo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  text-align: center;
`;

function Price({ coinId }: IPriceProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <>
      {isLoading
        ? "Loading chart..."
        : data && (
            <GridColTwo>
              <GridChildren data={data} />
            </GridColTwo>
          )}
    </>
  );
}

export default Price;

interface IGridChildrenProps {
  data?: IHistorical[];
}
const GridChildren = ({ data }: IGridChildrenProps) => {
  if (data == undefined) {
    return <></>;
  }
  const last = data[data.length - 1];

  return (
    <>
      <p>open</p>
      <p>{last.open}</p>
      <p>high</p>
      <p>{last.high}</p>
      <p>low</p>
      <p>{last.low}</p>
      <p>close</p>
      <p>{last.close}</p>
    </>
  );
};
