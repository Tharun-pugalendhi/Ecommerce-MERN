// src/Pages/Blog.jsx
/* jshint esversion:6 */
import React from "react";
import styled from "styled-components";
import Kitchen3 from "../Components/Assets/shoping.jpeg";
import Kitchen2 from "../Components/Assets/Kitchen2.jpg";
import Kitchen1 from "../Components/Assets/Kitchen1.jpg";
import blog1 from "../Components/Assets/bg105.jpg";

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin: auto;
`;

const BlogSectionBackground = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 40px;
  background-image: url(${blog1});
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit;
    filter: blur(8px);
    opacity: 0.7;
  }
`;

const BlogSection = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  z-index: 1;

  max-width: 1200px; /* Increased max-width for content alignment */
  margin: 0 auto; /* Center the content within the block */

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const BlogImage = styled.img`
  width: 50%;
  border-radius: 10px;
  margin: ${(props) => (props.reverse ? "0 0 0 40px" : "0 40px 0 0")};

  @media (max-width: 768px) {
    width: 100%;
    margin: 0 0 20px 0;
  }
`;

const BlogContent = styled.div`
  width: 50%;
  text-align: left;
  font-size: 18px;
  line-height: 1.6;
  color: white;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Blog = () => {
  return (
    <BlogContainer>
      <BlogSectionBackground>
        <BlogSection>
          <BlogImage src={Kitchen3} alt="Kitchen" />
          <BlogContent>
            <h1>Welcome to Our Blog</h1>
            <p>
              In this blog, we share our love for fashion and everything
              style-related. From outfit inspiration to the latest trends, we
              cover it all. Discover fashion tips, style hacks, and much more.
              Stay tuned for our updates to elevate your wardrobe and express
              your unique style with confidence.{" "}
            </p>
          </BlogContent>
        </BlogSection>
      </BlogSectionBackground>

      <BlogSectionBackground>
        <BlogSection reverse>
          <BlogImage src={Kitchen1} alt="Kitchen" />
          <BlogContent>
            <h2>Our Style Essentials</h2>
            <p>
              Style is all about expressing your personality through the clothes
              you wear. It’s a roadmap to looking and feeling your best, guiding
              you step-by-step to create stunning outfits. From mastering the
              basics to exploring bold trends, understanding the essentials of
              fashion can help you build a versatile wardrobe. Whether you're
              new to fashion or looking to refine your style, our tips and
              tricks are here to make sure you’re always dressed to impress.
            </p>
          </BlogContent>
        </BlogSection>
      </BlogSectionBackground>

      <BlogSectionBackground>
        <BlogSection>
          <BlogImage src={Kitchen2} alt="Kitchen" />
          <BlogContent>
            <h2>Fashion Tips and Tricks</h2>
            <p>
              Start by organizing your wardrobe and accessories to create a
              streamlined and efficient dressing process. Invest in versatile
              pieces that can be mixed and matched to create a variety of
              outfits. Always choose clothes that fit well and complement your
              body shape for a polished look. To save time, plan your outfits
              ahead of time, especially for special occasions. Use layering to
              add depth and interest to your outfits and consider color
              coordination for a harmonious appearance. Keep your wardrobe tidy
              and regularly declutter to make room for new pieces. For added
              style, accessorize with statement pieces that reflect your
              personality and elevate your look.
            </p>
          </BlogContent>
        </BlogSection>
      </BlogSectionBackground>
    </BlogContainer>
  );
};

export default Blog;
