import express from "express";
import compression from "compression";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(compression());

app.get("/api/data", async (req, res) => {
  const count = parseInt(req.query.count) || 1000;
  const CHUNK_SIZE = 100_000;

  const stream = async function* () {
    for (let offset = 0; offset < count; offset += CHUNK_SIZE) {
      const size = Math.min(CHUNK_SIZE, count - offset);
      // console.log(size);
      const buffer = new Float32Array(size * 2);
      for (let i = 0; i < size; i++) {
        buffer[i * 2] = i / size; // x
        buffer[i * 2 + 1] = i % 2 === 0 ? 1 : 0; // y
      }
      // console.log(
      //   `Buffer size: ${buffer.byteLength}, Offset: ${offset}, Size: ${size}`
      // ); // Log buffer details
      if (buffer.byteLength % 4 !== 0) {
        const paddedBuffer = new Uint8Array(
          Math.ceil(buffer.byteLength / 4) * 4
        );
        paddedBuffer.set(new Uint8Array(buffer.buffer));
        yield Buffer.from(paddedBuffer.buffer);
      } else {
        yield Buffer.from(buffer.buffer);
      }
    }
  };
  res.setHeader("Content-Type", "application/octet-stream");
  for await (const chunk of stream()) {
    res.write(chunk);
  }
  res.end();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
