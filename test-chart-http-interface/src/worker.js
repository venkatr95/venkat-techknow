self.onmessage = function (event) {
  const buffer = event.data;

  if (buffer.byteLength % 4 !== 0) {
    throw new Error("Byte length of ArrayBuffer must be a multiple of 4");
  }

  const data = new Float32Array(buffer); // Process x and y coordinates
  self.postMessage({ data, length: data.length }, [data.buffer]);
};
