import { useEffect, useRef, useState } from "react";
import "./App.css";

const worker = new Worker(new URL("./worker.js", import.meta.url), {
  type: "module",
});

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [inputValue, setInputValue] = useState("10000");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const controllerRef = useRef<AbortController | null>(null);
  const totalPoints = useRef(0);
  const receivedPoints = useRef(0);

  const canvasWidth = 800;
  const canvasHeight = 600;

  const [logMessages, setLogMessages] = useState<string[]>([]);
  let startTime: number | null = null;
  let endTime: number | null = null;

  const addLogMessage = (message: string) => {
    setLogMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    worker.onmessage = (event) => {
      const points = new Float32Array(event.data.data);
      const length = event.data.length;
      receivedPoints.current += length / 2;

      const progress = (receivedPoints.current / totalPoints.current) * 100;
      setProgress(progress);

      const context = canvasRef.current?.getContext("2d");
      if (!context) return;

      context.strokeStyle = "yellow"; // yellow trace
      context.lineWidth = 1;
      context.beginPath();

      for (let i = 0; i < points.length; i += 2) {
        const x = points[i] * canvasWidth;
        const y = points[i + 1] * canvasHeight;

        if (i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }

      context.stroke();
    };
  }, [canvasRef]);

  const drawGrid = (step = 0.1) => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;

    context.strokeStyle = "#ccc";
    context.lineWidth = 0.5;

    // X axis
    for (let x = 0; x <= 1; x += step) {
      const xPos = x * canvasWidth;
      context.beginPath();
      context.moveTo(xPos, 0);
      context.lineTo(xPos, canvasHeight);
      context.stroke();
    }

    // Y Axis
    for (let y = 0; y <= 1; y += step) {
      const yPos = y * canvasHeight;
      context.beginPath();
      context.moveTo(0, yPos);
      context.lineTo(canvasWidth, yPos);
      context.stroke();
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      context?.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      drawGrid();
    }
    setLogMessages([]);

    addLogMessage("Rendering started");
    startTime = performance.now();
    console.log("Rendering started at:", startTime);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    const count = parseInt(inputValue) || 1000000;
    totalPoints.current = count;
    receivedPoints.current = 0;
    setProgress(0);
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:3000/api/data?count=${count}`, {
        signal: controller.signal,
        method: "GET",
      });
      const reader = res.body?.getReader();
      const readChunk = () => {
        reader?.read().then(({ done, value }) => {
          if (done) {
            setLoading(false);
            endTime = performance.now();
            addLogMessage(
              `Rendering completed in ${(endTime! - startTime!).toFixed(3)} ms`
            );
            console.log("Rendering ended at:", endTime);
            return;
          }
          if (value) {
            worker.postMessage(value.buffer, [value.buffer]);
          }
          readChunk();
        });
      };
      readChunk();
    } catch (error) {
      if (controller.signal.aborted) {
        console.log("Request aborted");
      } else {
        console.error("Error fetching points:", error);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ padding: "1rem" }}>
        <form onSubmit={handleSubmit}>
          <label>
            Number of points:
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              style={{ marginLeft: "0.5rem" }}
            />
          </label>
          <button type="submit" style={{ marginLeft: "0.5rem" }}>
            Generate Points
          </button>
          <button
            type="button"
            onClick={() => {
              if (controllerRef.current) {
                controllerRef.current.abort();
                setLoading(false);
                setLogMessages([]); // Clear all logs

                const canvas = canvasRef.current;
                if (canvas) {
                  const context = canvas.getContext("2d");
                  context?.clearRect(0, 0, canvas.width, canvas.height);
                }
                addLogMessage("Rendering stopped");
              }
            }}
            style={{ marginLeft: "0.5rem" }}
          >
            Stop
          </button>
        </form>
        {loading && <p>Loading...{Math.min(progress, 100).toFixed(1)}%</p>}
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          style={{ border: "1px solid black", marginTop: "1rem" }}
        />
        <div style={{ marginTop: "1rem", color: "gray" }}>
          {logMessages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
