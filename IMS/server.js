const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const server = require('http').createServer(app); // Create an HTTP server

const io = require('socket.io')(server, { // Initialize Socket.IO
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware setup
var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
const db = require("./app/models");
const Role = db.role;
var bcrypt = require("bcryptjs");
const User = db.user;
const UserRole = db.user_roles;
const statusUpdateRoutes = require('./app/routes/StatusUpdateRoutes');
const userInventoryRoutes = require('./app/routes/user-inventory.routes');

// Uncomment below lines to reset the database at every startup
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Db");
//   initial();
// });

// Normal database sync without reset
db.sequelize.sync();

// Test route
app.get("/", (req, res) => {
  res.json({ message: "InvSys Server Running..." });
});

app.use('/api', statusUpdateRoutes);
app.use('/api/user-inventory', userInventoryRoutes);

// Routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/item.routes")(app);
require("./app/routes/service.routes")(app);
require("./app/routes/user-role.routes")(app);
require("./app/routes/student-item-req.routes")(app);
require("./app/routes/student-service-req.routes")(app);
require("./app/routes/academic-item-req.routes")(app);
require("./app/routes/academic-service-req.routes")(app);
require("./app/routes/profile.routes")(app);
require("./app/routes/reviewed-item-req.routes")(app);
require("./app/routes/reviewed-service-req.routes")(app);
require("./app/routes/issued-aca-item.routes")(app);
require("./app/routes/issued-stud-item.routes")(app);
require("./app/routes/proceeded-aca-service.routes")(app);
require("./app/routes/proceeded-stud-service.routes")(app);
require("./app/routes/tracking.routes")(app); // Insert the tracking routes


// Ensure the path to academic-item-req.routes is correct and the file contains the route for updateStatus
require("./app/routes/academic-item-req.routes")(app); // Double-check this file for the correct route

// Set up Socket.IO
io.on('connection', (socket) => {
  console.log('A user connected');

  // Send initial data to the client
  sendDashboardData(socket);

  // Listen for events and update clients when data changes
  // Example: When a new academic item request is created
  db.academic_item_request.afterCreate((request) => {
    sendDashboardData(io);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Function to send dashboard data to connected clients
async function sendDashboardData(target) {
  // Fetch data from the database and send it to the clients
  // Example: Total requests, pending requests, issued requests, etc.
  const totalRequests = await db.academic_item_request.count();
  const pendingRequests = await db.academic_item_request.count({ where: { isIssued: '0' } });
  const issuedRequests = await db.issued_aca_item_request.count();
  const totalItems = await db.item.count();
  //const totalItems = await db.item.sum('quantity');
  const outOfStockItems = await db.item.count({ where: { quantity: 0 } });
  const deliveredItems = await db.academic_item_request.count({ where: { status: 'Delivered' } });

  const totalUsers = await db.user.count();
  const role2Users = await db.user_roles.count({ where: { roleId: 2 } });
  const role3Users = await db.user_roles.count({ where: { roleId: 3 } });

  target.emit('dashboard-data', {
    totalRequests, pendingRequests, issuedRequests,
    totalItems, outOfStockItems, deliveredItems,
    totalUsers, role2Users, role3Users

  });
}

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

// Function to create initial records such as roles and an admin user
function initial() {
  // Create roles
  Role.create({ id: 1, name: "admin" });
  Role.create({ id: 2, name: "non-academic" });
  Role.create({ id: 3, name: "academic" });
  Role.create({ id: 4, name: "student" });

  // Create an admin user
  User.create({
    username: "admin",
    password: bcrypt.hashSync("admin", 8),
  }).then(user => {
    // Assign admin role to the user
    UserRole.create({
      roleId: 1,
      username: user.username,
    });
  });
  

  // Optional: Add foreign key constraints if needed
  // sequelize.query("ALTER TABLE issued_aca_item_requests ADD FOREIGN KEY (requestId) REFERENCES academic_item_requests (requestId);");
  // sequelize.query("ALTER TABLE proceeded_aca_service_requests ADD FOREIGN KEY (requestId) REFERENCES academic_service_requests (requestId);");
  // sequelize.query("ALTER TABLE issued_stud_item_requests ADD FOREIGN KEY (requestId) REFERENCES reviewed_item_requests (requestId);");
  // sequelize.query("ALTER TABLE proceeded_stud_service_requests ADD FOREIGN KEY (requestId) REFERENCES reviewed_service_requests (requestId);");
}