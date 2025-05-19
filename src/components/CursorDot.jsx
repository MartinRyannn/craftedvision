// import { useEffect, useState, useCallback } from "react";

// function CursorDot() {
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [cursorStyle, setCursorStyle] = useState({ 
//     color: "#00C78C", 
//     scale: 1 
//   });

//   const moveCursor = useCallback((e) => {
//     requestAnimationFrame(() => {
//       setPosition({ x: e.clientX, y: e.clientY });

//       const element = document.elementFromPoint(e.clientX, e.clientY);
//       if (element) {
//         const isInteractive = 
//           element.tagName === "BUTTON" || 
//           element.tagName === "A" || 
//           window.getComputedStyle(element).cursor === "pointer";

//         setCursorStyle(prev => {
//           const newScale = isInteractive ? 1.5 : 1;
//           if (prev.scale !== newScale) {
//             return { ...prev, scale: newScale };
//           }
//           return prev;
//         });
//       }
//     });
//   }, []);

//   useEffect(() => {
//     let frameId;
//     const throttledMove = (e) => {
//       cancelAnimationFrame(frameId);
//       frameId = requestAnimationFrame(() => moveCursor(e));
//     };

//     window.addEventListener("mousemove", throttledMove, { passive: true });
//     document.body.style.cursor = "none";

//     return () => {
//       window.removeEventListener("mousemove", throttledMove);
//       cancelAnimationFrame(frameId);
//       document.body.style.cursor = "auto";
//     };
//   }, [moveCursor]);

//   return (
//     <div
//       className="cursor-dot"
//       style={{
//         left: `${position.x}px`,
//         top: `${position.y}px`,
//         backgroundColor: cursorStyle.color,
//         transform: `translate(-50%, -50%) scale(${cursorStyle.scale})`,
//         transition: "transform 0.05s ease-out",
//         position: "fixed",
//         pointerEvents: "none",
//         zIndex: 9999
//       }}
//     />
//   );
// }

// export default CursorDot;