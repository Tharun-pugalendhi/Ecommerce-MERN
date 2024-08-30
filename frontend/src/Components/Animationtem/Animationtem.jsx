/* jshint esversion:6 */
import React, { useState, useEffect, useRef } from "react";
import { TweenLite, Circ } from "gsap";
import "./Animationtem.css"; // Import the CSS file for the header and canvas
import { Link } from "react-router-dom";

const HeroTexts = [
  "Elevate style with every stitch.",
  "Stitch Your Style.",
  "Let's shop.",
];

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const handleTyping = () => {
      const currentText = HeroTexts[currentIndex];
      const length = currentText.length;

      if (!isDeleting && typingIndex <= length) {
        setDisplayedText(currentText.substring(0, typingIndex));
        setTypingIndex((prev) => prev + 1);
      } else if (isDeleting && typingIndex >= 0) {
        setDisplayedText(currentText.substring(0, typingIndex));
        setTypingIndex((prev) => prev - 1);
      }

      if (typingIndex === length + 1) {
        setIsDeleting(true);
        setTimeout(() => {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % HeroTexts.length);
          setTypingIndex(0); // Reset typing index for the new sentence
        }, 2000); // Pause before deleting
      } else if (typingIndex === -1) {
        setIsDeleting(false);
        setTypingIndex(0); // Reset typing index after deleting
      }
    };

    const interval = setInterval(() => {
      handleTyping();
    }, 100); // Typing speed

    return () => clearInterval(interval);
  }, [currentIndex, isDeleting, typingIndex]);

  const canvasRef = useRef(null);
  const largeHeaderRef = useRef(null);
  const ctxRef = useRef(null);
  const pointsRef = useRef([]);
  const targetRef = useRef({ x: 0, y: 0 });
  const animateHeaderRef = useRef(true);
  const widthRef = useRef(window.innerWidth);
  const heightRef = useRef(window.innerHeight);

  useEffect(() => {
    const initHeader = () => {
      widthRef.current = window.innerWidth;
      heightRef.current = window.innerHeight;
      targetRef.current = { x: widthRef.current / 2, y: heightRef.current / 2 };

      largeHeaderRef.current.style.height = `${heightRef.current}px`;

      const canvas = canvasRef.current;
      canvas.width = widthRef.current;
      canvas.height = heightRef.current;
      ctxRef.current = canvas.getContext("2d");

      const points = [];
      for (let x = 0; x < widthRef.current; x += widthRef.current / 20) {
        for (let y = 0; y < heightRef.current; y += heightRef.current / 20) {
          const px = x + (Math.random() * widthRef.current) / 20;
          const py = y + (Math.random() * heightRef.current) / 20;
          const p = { x: px, originX: px, y: py, originY: py };
          points.push(p);
        }
      }

      points.forEach((p1) => {
        const closest = [];
        points.forEach((p2) => {
          if (p1 !== p2) {
            let placed = false;
            for (let k = 0; k < 5; k++) {
              if (!placed) {
                if (closest[k] === undefined) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }

            for (let k = 0; k < 5; k++) {
              if (!placed) {
                if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }
          }
        });
        p1.closest = closest;
      });

      points.forEach((point) => {
        const c = new Circle(
          point,
          2 + Math.random() * 2,
          "rgba(88,44,23,255)"
        );
        point.circle = c;
        shiftPoint(point);
      });

      pointsRef.current = points;
    };

    const addListeners = () => {
      if (!("ontouchstart" in window)) {
        window.addEventListener("mousemove", mouseMove);
      }
      window.addEventListener("scroll", scrollCheck);
      window.addEventListener("resize", resize);
    };

    const mouseMove = (e) => {
      const posx =
        e.pageX ||
        e.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft;
      const posy =
        e.pageY ||
        e.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop;
      targetRef.current.x = posx;
      targetRef.current.y = posy;
    };

    const scrollCheck = () => {
      animateHeaderRef.current = document.body.scrollTop <= heightRef.current;
    };

    const resize = () => {
      widthRef.current = window.innerWidth;
      heightRef.current = window.innerHeight;
      largeHeaderRef.current.style.height = `${heightRef.current}px`;
      canvasRef.current.width = widthRef.current;
      canvasRef.current.height = heightRef.current;
    };

    const animate = () => {
      if (animateHeaderRef.current) {
        ctxRef.current.clearRect(0, 0, widthRef.current, heightRef.current);
        pointsRef.current.forEach((point) => {
          if (Math.abs(getDistance(targetRef.current, point)) < 4000) {
            point.active = 0.3;
            point.circle.active = 0.6;
          } else if (Math.abs(getDistance(targetRef.current, point)) < 20000) {
            point.active = 0.1;
            point.circle.active = 0.3;
          } else if (Math.abs(getDistance(targetRef.current, point)) < 40000) {
            point.active = 0.02;
            point.circle.active = 0.1;
          } else {
            point.active = 0;
            point.circle.active = 0;
          }

          drawLines(point);
          point.circle.draw();
        });
      }
      requestAnimationFrame(animate);
    };

    const shiftPoint = (p) => {
      TweenLite.to(p, 1 + 1 * Math.random(), {
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: Circ.easeInOut,
        onComplete: () => {
          shiftPoint(p);
        },
      });
    };

    const drawLines = (p) => {
      if (!p.active) return;
      p.closest.forEach((closestPoint) => {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(p.x, p.y);
        ctxRef.current.lineTo(closestPoint.x, closestPoint.y);
        ctxRef.current.strokeStyle = `rgba(156,217,249,${p.active})`;
        ctxRef.current.stroke();
      });
    };

    class Circle {
      constructor(pos, rad, color) {
        this.pos = pos;
        this.radius = rad;
        this.color = color;
      }

      draw() {
        if (!this.active) return;
        ctxRef.current.beginPath();
        ctxRef.current.arc(
          this.pos.x,
          this.pos.y,
          this.radius,
          0,
          2 * Math.PI,
          false
        );
        ctxRef.current.fillStyle = `rgba(255,255,255,${this.active})`;
        ctxRef.current.fill();
      }
    }

    const getDistance = (p1, p2) => {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    };

    initHeader();
    animate();
    addListeners();

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("scroll", scrollCheck);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="header-container" id="home">
      <div id="large-header">
        <div className="canvas-wrapper" ref={largeHeaderRef}>
          <div className="flexCenter">
            <div>
              <h1 className="head">Welcome to thread</h1>
              <div className="overlay">
                <p className="overlay-text">
                  {displayedText.split(" ").map((word, index) => (
                    <span
                      key={index}
                      className={
                        word === "ES" ||
                        word === "EthicSecur" ||
                        word === "SofTec," ||
                        word === "SofTec's" ||
                        word === "SofTec."
                          ? "highlight"
                          : ""
                      }
                    >
                      {word}{" "}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>

          <canvas className="canvas" ref={canvasRef}></canvas>
          <div className="overlay">
            <div className="hero-latest-btn">
              <Link to="/product">Let's shop</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
