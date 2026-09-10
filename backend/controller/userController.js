const fs = require('fs');
const path = require('path');

class User {
    
    userRegistration(name, password, age, interests, role)
    {
        const filePath = path.join(__dirname, "../model/userdata.json");

        const data = fs.readFileSync(filePath, "utf-8");
        //converts the data from filepath to javascript object/array
        const users = JSON.parse(data);

        //create new user
        const newUser = {
            id: users.length + 1,
            name: name,
            password: password,
            age: age,
            interests: interests,
            role: role
        }
        //add user to array
        users.push(newUser);

        //save back to JSON
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    }
    
    userLogin(username, password)
    {
        const filepath = path.join(__dirname, "../model/userdata.json");
        const data = fs.readFileSync(filepath, "utf-8");

        const users = JSON.parse(data);

        const user = users.find(user => 
            user.name === username && user.password === password
        );
        return user
    }
}

module.exports = User;