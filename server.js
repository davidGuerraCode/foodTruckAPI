const app = require('./src/app');
const PORT = process.env.PORT || 3000;

// TODO: Connect with DB

app.listen(PORT, console.log(`[+] Server running on port ${PORT}`));

process.on('unhandledRejection', error => {
  console.log(error.message);
  process.exit(1);
});
