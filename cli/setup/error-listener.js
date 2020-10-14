function errorListener() {
  process.on("unhandledRejection", (err) => {
    console.error(err.stack || err);
    process.exit(1);
  });

  process.on("uncaughtException", (err) => {
    console.error(err.stack || err);
    process.exit(1);
  });
}

module.exports = errorListener;
