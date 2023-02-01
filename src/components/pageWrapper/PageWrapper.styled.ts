import { styled } from '@mui/material';

export const PageStyled = styled('div')`
  height: 100vh;
  background: linear-gradient(128.55deg, #5c3315 1.54%, rgba(92, 51, 21, 0.63) 117.33%);

  padding-top: 35px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  position: relative;
  overflow: hidden;
`;

export const TopCircle = styled('span')`
  position: absolute;
  width: 600px;
  height: 600px;
  left: -294px;
  top: -273px;
  background: radial-gradient(24.64% 24.64% at 50% 50%, #88654c 0%, rgba(118, 90, 70, 0.34) 100%);
  box-shadow: 6px 4px 42px #886a54;
  border-radius: 50%;
  border: 1px solid #6d492f;
`;
export const BotCircle = styled('span')`
  position: absolute;
  width: 600px;
  height: 600px;
  right: -322px;
  bottom: -313px;
  background: linear-gradient(168.81deg, #886a54 3.07%, rgba(157, 127, 104, 0) 96.93%);
  filter: drop-shadow(-36px -5px 42px #6f4b30);
  border-radius: 50%;
  border: 1px solid #6f4b30;
`;
