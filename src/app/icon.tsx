import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#120D0A",
          border: "1px solid #50382B",
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontFamily: "Georgia, serif",
            color: "#B4976A",
            fontStyle: "italic",
          }}
        >
          F
        </span>
      </div>
    ),
    { ...size }
  );
}
