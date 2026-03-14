const requestLogger = (req, res, next) => {
    const cambodiaTime = new Date().toLocaleString("en-GB", {
    timeZone: "Asia/Phnom_Penh",
  });
  console.log("New Request");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Time :",cambodiaTime);

  next(); // must be called
};

module.exports = requestLogger;
