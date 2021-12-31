import styled from "styled-components";
import { IUsd } from "./Coin";

const PriceContainer = styled.div``;

const PricePercentBox = styled.div`
  margin-bottom: 10px;
  padding: 10px 15px;
  border-radius: 10px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5); ;
`;

interface PriceProps {
  price: IUsd | undefined;
}

const Price = ({ price }: PriceProps) => {
  return (
    <>
      <PriceContainer>
        <PricePercentBox>
          <span>percent_change_15m: {price?.percent_change_15m}%</span>
        </PricePercentBox>
        <PricePercentBox>
          <span>percent_change_30m: {price?.percent_change_30m}%</span>
        </PricePercentBox>
        <PricePercentBox>
          <span>percent_change_1h: {price?.percent_change_1h}%</span>
        </PricePercentBox>
        <PricePercentBox>
          <span>percent_change_6h: {price?.percent_change_6h}%</span>
        </PricePercentBox>
        <PricePercentBox>
          <span>percent_change_24h: {price?.percent_change_24h}%</span>
        </PricePercentBox>
      </PriceContainer>
    </>
  );
};

export default Price;
