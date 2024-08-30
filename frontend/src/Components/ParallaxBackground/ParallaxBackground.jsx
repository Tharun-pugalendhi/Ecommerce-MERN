import React from "react";
import { Parallax } from "react-parallax";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: 75vh; // Adjust height for tablets
  }

  @media (max-width: 480px) {
    min-height: 50vh; // Adjust height for mobile devices
  }
`;

const Content = styled.div`
  width: 100%;
  padding: 0px;
  display: flex;
  justify-content: center;
`;

const bgImageStyle = {
  width: "100%",
  height: "100%", // Ensure the image covers the height of the container
  backgroundSize: "cover",
  backgroundPosition: "center center",
};

const ParallaxBackground = ({ image, children }) => {
  return (
    <Parallax bgImage={image} strength={500} bgImageStyle={bgImageStyle}>
      <Container>
        <Content>{children}</Content>
      </Container>
    </Parallax>
  );
};

export default ParallaxBackground;
