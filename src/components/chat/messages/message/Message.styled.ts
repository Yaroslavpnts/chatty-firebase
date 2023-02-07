import styled from '@emotion/styled/macro';

interface MessageProps {
  owner: boolean;
}

export const MessageStyled = styled('div')<MessageProps>`
  display: flex;
  gap: 20px;
  flex-direction: ${(props) => (props.owner ? 'row-reverse' : 'row')};
  position: relative;

  /* div:last-of-type {
    max-width: calc(50% - 60px);
    position: relative;
    display: flex;
    flex-direction: column;

    img {
      max-width: 100%;
      max-height: 250px;
      object-fit: contain;
      cursor: pointer;
    }

    img ~ p {
      border-radius: 0px 0px 10px 10px;
    }

    @media screen and (max-width: 1250px) {
      max-width: calc(50% + 60px);
    }

    p {
      background-color: ${(props) => (props.owner ? '#F3EBE5' : '#230F00;')};
      color: ${(props) => (props.owner ? '#5C3315' : '#FFF')};
      border-radius: ${(props) => (props.owner ? '10px 0px 10px 10px' : '0px 10px 10px 10px')};
      padding: 4px 20px;
      max-width: max-content; 
      word-wrap: break-word;
      font-family: 'Mulish';

      @media screen and (max-width: 1064px) {
        padding: 3px 10px;
      }
    }
  } */
`;

export const MessageInfoStyled = styled('div')`
  display: flex;
  flex-direction: column;
  color: gray;
  font-weight: 300;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const MessageContentStyled = styled('div')<MessageProps>`
  max-width: calc(50% - 60px);
  display: flex;
  flex-direction: column;

  img {
    max-width: 100%;
    max-height: 250px;
    object-fit: contain;
    cursor: pointer;
  }

  img ~ p {
    border-radius: 0px 0px 10px 10px;
  }

  @media screen and (max-width: 1250px) {
    max-width: calc(50% + 60px);
  }

  p {
    background-color: ${(props) => (props.owner ? '#F3EBE5' : '#230F00;')};
    color: ${(props) => (props.owner ? '#5C3315' : '#FFF')};
    border-radius: ${(props) => (props.owner ? '10px 0px 10px 10px' : '0px 10px 10px 10px')};
    padding: 4px 20px;
    /* max-width: max-content; */
    word-wrap: break-word;
    font-family: 'Mulish';

    @media screen and (max-width: 1064px) {
      padding: 3px 10px;
    }
  }
`;

export const NewDateStyled = styled('div')`
  align-self: center;
  color: #fff;
  padding: 4.5px 10px;
  background: rgba(243, 235, 229, 0.2);
  border-radius: 10px;
`;
