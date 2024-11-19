// Initialize MongoDB with a default user and database
print('Initializing MongoDB...');

// Switch to the desired database
db = db.getSiblingDB('NutriWizard'); // Replace 'NutriWizard' with your desired database name

// Create a user with readWrite permissions
db.createUser({
    user: 'test', // Replace with your desired username
    pwd: 'test', // Replace with your desired password
    roles: [
        {
            role: 'readWrite',
            db: 'NutriWizard', // Ensure this matches the database name above
        },
    ],
});

// Optionally, create collections with default documents
db.createCollection('users');
db.createCollection('meals');
db.createCollection('menus');
db.createCollection('user_meals');

print('MongoDB initialization complete.');