/* jshint esversion:6 */
import React from "react";
import styled from "styled-components";

// Placeholder image import
import contacts from "../Components/Assets/contacts.gif"; // Replace with your actual image path

export default function Contact() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "99f4d976-1b1c-4a54-a450-2553963e8b09");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <Wrapper id="contact">
      <HeaderInfo>
        <h1 className="font40 extraBold" style={{ fontColor: "#674188" }}>
          Let's get in touch
        </h1>
        <br />
        <p className="font18" style={{ Color: "#C8A1E0" }}>
          Have any questions or need assistance? Reach out to us, and our
          dedicated team will be happy to help you with your inquiries.
        </p>
      </HeaderInfo>
      <Container>
        <FormWrapper>
          <form onSubmit={onSubmit}>
            <FormGroup>
              <InputField
                type="text"
                id="fname"
                name="fname"
                placeholder="Full Name"
              />
            </FormGroup>
            <FormGroup>
              <InputField
                type="number"
                id="number"
                name="number"
                placeholder="Phone Number"
              />
            </FormGroup>
            <FormGroup>
              <InputField
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
              />
            </FormGroup>

            <FormGroup>
              <TextareaField
                rows="4"
                id="message"
                name="message"
                placeholder="Message"
              />
            </FormGroup>
            <SubmitButton type="submit">Send Message</SubmitButton>
          </form>
          <ResultMessage>{result}</ResultMessage>
        </FormWrapper>
        <ImageWrapper>
          <img src={contacts} alt="Contact" />
        </ImageWrapper>
      </Container>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  width: 100%;
  padding: 50px 20px;
  color: #fff;
`;

const HeaderInfo = styled.div`
  text-align: center;
  font-family: Cake sans;
  margin-bottom: 30px;
  color: #c8a1e0;
  h1 {
    color: #674188;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  font-family: "Cake", sans-serif;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 30px;
  background: none;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  margin-top: 20px;
  text-align: left;

  @media (min-width: 768px) {
    margin-top: 0;
  }

  h1 {
    font-size: 24px;
    color: #fff;
    margin-bottom: 20px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const InputField = styled.input`
  border: none;
  outline: none;
  background: none;
  font-size: 16px;
  color: #fff;
  padding: 20px 10px 20px 5px;
  letter-spacing: 1px;
  margin-bottom: 20px;
  border-bottom: 2px solid #777;
  transition: border-bottom 0.5s ease;

  width: 100%;
  &:hover {
    border-bottom: 3px solid white;
  }
`;

const TextareaField = styled.textarea`
  border: none;
  outline: none;
  background: none;
  font-size: 16px;
  color: #fff;
  padding: 20px 10px 20px 5px;
  letter-spacing: 1px;
  margin-bottom: 20px;
  border-bottom: 2px solid #777;
  transition: border-bottom 0.5s ease;

  width: 100%;
  min-height: 150px;
  &:hover {
    border-bottom: 3px solid white;
  }
`;

const SubmitButton = styled.button`
  width: 70%;
  margin-left: 80px;
  background: rgb(31, 25, 25);
  background: #674188;
  // linear-gradient(310deg, rgba(31,25,25,1) 0%, rgba(59,97,55,1) 62%);*
  color: #ffffff;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #580cd2;
  }
`;

const ResultMessage = styled.span`
  display: block;
  margin-top: 15px;
  font-size: 16px;
  color: #fff;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin-top: 20px;

  @media (min-width: 768px) {
    margin-top: 0;
    margin-left: 20px;
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;
