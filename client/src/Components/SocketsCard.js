import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  background-color: #555;
`;

const SocketsCard = ({ sockets }) => {
  return (
    <div>
      {sockets.map(socket => {
        if (socket.isVisible && socket.plugHash) {
          const { description, hasIcon, icon, name } = socket.plugDefinitions.displayProperties;
          return (
            <React.Fragment key={socket.plugHash}>
              {hasIcon && <Img src={`https://www.bungie.net${icon}`} />}
              <p>{name}</p>
            </React.Fragment>
          )
        }
      })}
    </div>
  )
}

export default SocketsCard;