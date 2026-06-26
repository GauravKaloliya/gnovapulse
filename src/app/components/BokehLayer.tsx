export default function BokehLayer() {
  const ORBS = [
    { size: 180, x: "15%", y: "20%", color: "rgba(255,153,50,0.06)", delay: "0s", dur: "14s" },
    { size: 240, x: "75%", y: "30%", color: "rgba(217,232,226,0.04)", delay: "-4s", dur: "18s" },
    { size: 160, x: "50%", y: "70%", color: "rgba(255,153,50,0.05)", delay: "-8s", dur: "16s" },
    { size: 200, x: "85%", y: "80%", color: "rgba(23,43,54,0.03)", delay: "-12s", dur: "20s" },
    { size: 140, x: "30%", y: "55%", color: "rgba(255,153,50,0.04)", delay: "-6s", dur: "12s" },
  ];

  const SHAPES = [
    { type: "circle", size: 40, x: "20%", y: "30%", dur: "18s", delay: "0s" },
    { type: "triangle", x: "70%", y: "25%", dur: "22s", delay: "-5s" },
    { type: "circle", size: 24, x: "40%", y: "75%", dur: "16s", delay: "-10s" },
    { type: "cross", size: 20, x: "80%", y: "65%", dur: "20s", delay: "-3s" },
    { type: "circle", size: 32, x: "10%", y: "85%", dur: "14s", delay: "-8s" },
  ];

  return (
    <>
      {/* 37. Floating Bokeh Orbs */}
      <div className="bokeh-layer" aria-hidden="true">
        {ORBS.map((orb, i) => (
          <div
            key={i}
            className="bokeh-orb"
            style={{
              width: orb.size,
              height: orb.size,
              top: orb.y,
              left: orb.x,
              background: orb.color,
              animation: `auroraDrift ${orb.dur} ease-in-out ${orb.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* 39. Floating Geometric Shapes */}
      <div className="bokeh-layer" aria-hidden="true" style={{ zIndex: 0 }}>
        {SHAPES.map((s, i) => {
          const animName = i % 3 === 0 ? "shapeFloat1" : i % 3 === 1 ? "shapeFloat2" : "shapeFloat3";
          const style: React.CSSProperties = {
            top: s.y,
            left: s.x,
            animation: `${animName} ${s.dur} ease-in-out ${s.delay} infinite`,
          };

          if (s.type === "circle") {
            Object.assign(style, {
              width: s.size,
              height: s.size,
            });
          } else if (s.type === "cross") {
            Object.assign(style, {
              width: s.size,
              height: s.size,
            });
          }

          return (
            <div
              key={i}
              className={`floating-shape floating-shape-${s.type}`}
              style={style}
              aria-hidden="true"
            />
          );
        })}
      </div>
    </>
  );
}
