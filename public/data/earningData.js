const earningData = [
  {
    UID: "001",
    name: "Lisa Johnson",
    email: "user@example.com",
    purchaseDate: "12/12/24", // Added Purchase Date
    plan: "Basic",
    amount: 9,
    endDate: "12/12/25", // End Date
    remainingDay: getRandomRemainingDays(), // Random remaining days between 1 and 60
    status: getRandomStatus(), // Random status (Active or Inactive)
  },
  {
    UID: "002",
    name: "Ethan Carter",
    email: "user@example.com",
    purchaseDate: "01/15/25", // Added Purchase Date
    plan: "Pro",
    amount: 19,
    endDate: "01/15/26",
    remainingDay: getRandomRemainingDays(),
    status: getRandomStatus(),
  },
  {
    UID: "003",
    name: "Maya Thompson",
    email: "user@example.com",
    purchaseDate: "02/02/25", // Added Purchase Date
    plan: "Premium",
    amount: 29,
    endDate: "02/02/26",
    remainingDay: getRandomRemainingDays(),
    status: getRandomStatus(),
  },
  {
    UID: "004",
    name: "Liam Rodriguez",
    email: "user@example.com",
    purchaseDate: "03/30/25", // Added Purchase Date
    plan: "Pro",
    amount: 14,
    endDate: "03/30/26",
    remainingDay: getRandomRemainingDays(),
    status: getRandomStatus(),
  },
  {
    UID: "005",
    name: "Sofia Patel",
    email: "user@example.com",
    purchaseDate: "04/10/25", // Added Purchase Date
    plan: "Premium",
    amount: 29,
    endDate: "04/10/26",
    remainingDay: getRandomRemainingDays(),
    status: getRandomStatus(),
  },
  {
    UID: "006",
    name: "Noah Kim",
    email: "user@example.com",
    purchaseDate: "05/05/25", // Added Purchase Date
    plan: "Basic",
    amount: 9,
    endDate: "05/05/26",
    remainingDay: getRandomRemainingDays(),
    status: getRandomStatus(),
  },
  {
    UID: "007",
    name: "Ava Martinez",
    email: "user@example.com",
    purchaseDate: "06/08/25", // Added Purchase Date
    plan: "Pro",
    amount: 14,
    endDate: "06/08/26",
    remainingDay: getRandomRemainingDays(),
    status: getRandomStatus(),
  },
  {
    UID: "008",
    name: "Oliver Brown",
    email: "user@example.com",
    purchaseDate: "07/22/25", // Added Purchase Date
    plan: "Basic",
    amount: 9,
    endDate: "07/22/26",
    remainingDay: getRandomRemainingDays(),
    status: getRandomStatus(),
  },
  {
    UID: "009",
    name: "Isabella Garcia",
    email: "user@example.com",
    purchaseDate: "08/14/25", // Added Purchase Date
    plan: "Pro",
    amount: 19,
    endDate: "08/14/26",
    remainingDay: getRandomRemainingDays(),
    status: getRandomStatus(),
  },
  {
    UID: "010",
    name: "Lucas Wilson",
    email: "user@example.com",
    purchaseDate: "09/25/25", // Added Purchase Date
    plan: "Premium",
    amount: 29,
    endDate: "09/25/26",
    remainingDay: getRandomRemainingDays(),
    status: getRandomStatus(),
  },
  {
    UID: "011",
    name: "Chloe Lee",
    email: "user@example.com",
    purchaseDate: "10/25/25", // Added Purchase Date
    plan: "Basic",
    amount: 9,
    endDate: "10/25/26",
    remainingDay: getRandomRemainingDays(),
    status: getRandomStatus(),
  },
  {
    UID: "012",
    name: "Mason Hall",
    email: "user@example.com",
    purchaseDate: "11/10/25", // Added Purchase Date
    plan: "Pro",
    amount: 14,
    endDate: "11/10/26",
    remainingDay: getRandomRemainingDays(),
    status: getRandomStatus(),
  },
  {
    UID: "013",
    name: "Zoe Young",
    email: "user@example.com",
    purchaseDate: "12/05/25", // Added Purchase Date
    plan: "Basic",
    amount: 9,
    endDate: "12/05/26",
    remainingDay: getRandomRemainingDays(),
    status: getRandomStatus(),
  },
  {
    UID: "014",
    name: "James White",
    email: "user@example.com",
    purchaseDate: "12/15/25", // Added Purchase Date
    plan: "Premium",
    amount: 29,
    endDate: "12/15/26",
    remainingDay: getRandomRemainingDays(),
    status: getRandomStatus(),
  },
  {
    UID: "015",
    name: "Olivia Green",
    email: "user@example.com",
    purchaseDate: "01/15/26", // Added Purchase Date
    plan: "Pro",
    amount: 19,
    endDate: "01/15/27",
    remainingDay: getRandomRemainingDays(),
    status: getRandomStatus(),
  },
  {
    UID: "016",
    name: "Liam Brown",
    email: "user@example.com",
    purchaseDate: "02/10/26", // Added Purchase Date
    plan: "Basic",
    amount: 9,
    endDate: "02/10/27",
    remainingDay: getRandomRemainingDays(),
    status: getRandomStatus(),
  },
  {
    UID: "017",
    name: "Sophia Taylor",
    email: "user@example.com",
    purchaseDate: "03/20/26", // Added Purchase Date
    plan: "Pro",
    amount: 14,
    endDate: "03/20/27",
    remainingDay: getRandomRemainingDays(),
    status: getRandomStatus(),
  },
  {
    UID: "018",
    name: "Aiden Roberts",
    email: "user@example.com",
    purchaseDate: "04/15/26", // Added Purchase Date
    plan: "Premium",
    amount: 29,
    endDate: "04/15/27",
    remainingDay: getRandomRemainingDays(),
    status: getRandomStatus(),
  },
  {
    UID: "019",
    name: "Charlotte Harris",
    email: "user@example.com",
    purchaseDate: "05/05/26", // Added Purchase Date
    plan: "Pro",
    amount: 14,
    endDate: "05/05/27",
    remainingDay: getRandomRemainingDays(),
    status: getRandomStatus(),
  },
  {
    UID: "020",
    name: "Ethan Wilson",
    email: "user@example.com",
    purchaseDate: "06/25/26", // Added Purchase Date
    plan: "Basic",
    amount: 9,
    endDate: "06/25/27",
    remainingDay: getRandomRemainingDays(),
    status: getRandomStatus(),
  },
];

// Function to generate random remaining days between 1 and 60
function getRandomRemainingDays() {
  return Math.floor(Math.random() * 60) + 1;
}

// Function to randomly assign status as Active or Inactive
function getRandomStatus() {
  return Math.random() > 0.5 ? "Active" : "Inactive";
}

export default earningData;
