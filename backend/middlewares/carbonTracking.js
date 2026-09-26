import { co2 } from "@tgwf/co2";

const co2Emission = new co2({ model: 'swd' });

const carbonTracking = (req, res, next) => {
  let requestBytes = 0;
  let responseBytes = 0;

  try {
    if (req.body) {
      requestBytes += Buffer.byteLength(JSON.stringify(req.body), 'utf8');
    }
    if (req.query) {
      requestBytes += Buffer.byteLength(JSON.stringify(req.query), 'utf8');
    }
    if (req.headers) {
      requestBytes += Buffer.byteLength(JSON.stringify(req.headers), 'utf8');
    }
  } catch (e) {
    // Ignore JSON stringify errors
  }

  const originalWrite = res.write;
  const originalEnd = res.end;

  res.write = function (chunk, ...args) {
    if (chunk) {
      try {
        responseBytes += Buffer.byteLength(chunk, 'utf8');
      } catch (e) {}
    }
    return originalWrite.apply(res, [chunk, ...args]);
  };

  res.end = function (chunk, ...args) {
    if (chunk && (typeof chunk === 'string' || Buffer.isBuffer(chunk))) {
      try {
        responseBytes += Buffer.byteLength(chunk, 'utf8');
      } catch (e) {}
    }
    
    const totalBytes = requestBytes + responseBytes;
    const greenHost = false; // Set to true if hosted on a green host
    try {
      const emissions = co2Emission.perByte(totalBytes, greenHost);
      console.log(`[Carbon Tracking] URL: ${req.url} | Data transferred: ${totalBytes} bytes | Estimated CO2 emissions: ${emissions.toFixed(6)} grams`);
    } catch (e) {}
    
    return originalEnd.apply(res, [chunk, ...args]);
  };

  next();
};

export default carbonTracking;
