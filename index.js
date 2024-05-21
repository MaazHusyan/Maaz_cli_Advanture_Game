import chalk from "chalk";
import inquirer from "inquirer";
// Assigning Class to Player
class Player {
    constructor(name) {
        this.health = 100;
        this.potions = 3;
        this.name = name;
    }
    deductHealth() {
        let health = this.health - 25;
        this.health = health;
    }
    increaseHealth() {
        if (this.potions > 0) {
            this.health = 100;
            this.potions--; // Reduce the number of potions
            console.log(chalk.bold.yellowBright(`\nYour Health is Now ${this.health}\n `));
            if (this.potions == 2) {
                console.log(chalk.bold.yellowBright(`You Have 2 Potions Left\n`));
            }
            if (this.potions == 1) {
                console.log(chalk.bold.yellowBright(`You Have 1 Potions Left\n`));
            }
            if (this.potions == 0) {
                console.log(chalk.bold.yellowBright(`You Use All Potions\n`));
            }
        }
        else {
            console.log(chalk.bold.red("\nNo health potions left! \n"));
        }
    }
}
// Assigning Class to Opponent
class Opponent {
    constructor(name) {
        this.health = 100;
        this.name = name;
    }
    deductHealth() {
        let health = this.health - 20;
        this.health = health;
    }
}
// Player Information
let myPlayer = await inquirer.prompt([
    {
        name: "name",
        message: "Enter Player Name: ",
        type: "input",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return chalk.red.bold("*Enter player Name*");
        },
    },
]);
// Opponent Information
let myOpponent = await inquirer.prompt([
    {
        name: "monsters",
        message: "Select Your Opponent: ",
        type: "list",
        choices: ["Skeleton", "Zombie", "Ender Dragon"],
    },
]);
// Gathering Data
let p1 = new Player(myPlayer.name);
let o1 = new Opponent(myOpponent.monsters);
// Choosing Opponent (Skeleton)
if (myOpponent.monsters === "Skeleton") {
    console.log(`\n \t ${chalk.bold.italic.green(myPlayer.name)} " VS " ${chalk.bold.italic.red(myOpponent.monsters)} \n`);
    // Starting do-while loop
    do {
        // Choosing Options
        let ask = await inquirer.prompt([
            {
                name: "options",
                message: "You Have 3 Options You Select: ",
                type: "list",
                choices: ["Attack", "Use Potion", "Suicide"],
            },
        ]);
        // Setting the Play Ground
        if (ask.options === "Attack") {
            let num = Math.floor(Math.random() * 3);
            // Here Player Damage Setting
            if (num < 1) {
                p1.deductHealth();
                console.log(chalk.bold.redBright(`\n${p1.name} Health is ${p1.health}\n`));
                console.log(chalk.bold.greenBright(`${o1.name} Health is ${o1.health}\n`));
                if (p1.health <= 0) {
                    console.log(chalk.red(`***** ${p1.name} You Lost *****\n`));
                    process.exit();
                }
            }
            // Wasting Time
            if (num == 1) {
                console.log(chalk.bold.yellowBright("\nThe Attack Was Lost\n"));
            }
            if (num > 1) {
                o1.deductHealth();
                console.log(chalk.bold.greenBright(`${p1.name} Health is ${p1.health}\n`));
                console.log(chalk.bold.redBright(`${o1.name} Health is ${o1.health}\n`));
                // Here Opponent Taking Damage
                if (o1.health == 0) {
                    console.log(chalk.green(`***** ${myOpponent.monsters} Died *****`));
                    console.log(chalk.green(`***** You Win *****\n`));
                    process.exit();
                }
            }
        }
        // Using Potion
        if (ask.options === "Use Potion") {
            p1.increaseHealth();
        }
        // Attempt Suicide
        if (ask.options === "Suicide") {
            console.log(chalk.bold.yellowBright(`Suicide is forbidden and you're very Stupid `));
            console.log(chalk.bold.redBright(`***** You Lost *****\n`));
            process.exit();
        }
    } while (true);
}
// Choosing Opponent (Zombie)
if (myOpponent.monsters === "Zombie") {
    console.log(`\n \t ${chalk.bold.italic.green(myPlayer.name)} " VS " ${chalk.bold.italic.red(myOpponent.monsters)} \n`);
    // Starting do-while loop
    do {
        // Choosing Options
        let ask = await inquirer.prompt([
            {
                name: "options",
                message: "You Have 3 Options You Select: ",
                type: "list",
                choices: ["Attack", "Use Potion", "Suicide"],
            },
        ]);
        // Setting the Play Ground
        if (ask.options === "Attack") {
            let num = Math.floor(Math.random() * 3);
            // Here Player Damage Setting
            if (num < 1) {
                p1.deductHealth();
                console.log(chalk.bold.redBright(`\n${p1.name} Health is ${p1.health}\n`));
                console.log(chalk.bold.greenBright(`${o1.name} Health is ${o1.health}\n`));
                if (p1.health <= 0) {
                    console.log(chalk.red(`***** ${p1.name} You Lost *****\n`));
                    process.exit();
                }
            }
            // Wasting Time
            if (num == 1) {
                console.log(chalk.bold.yellowBright("\nThe Attack Was Lost\n"));
            }
            if (num > 1) {
                o1.deductHealth();
                console.log(chalk.bold.greenBright(`${p1.name} Health is ${p1.health}\n`));
                console.log(chalk.bold.redBright(`${o1.name} Health is ${o1.health}\n`));
                // Here Opponent Taking Damage
                if (o1.health == 0) {
                    console.log(chalk.green(`***** ${myOpponent.monsters} Died *****`));
                    console.log(chalk.green(`***** You Win *****\n`));
                    process.exit();
                }
            }
        }
        // Using Potion
        if (ask.options === "Use Potion") {
            p1.increaseHealth();
        }
        // Attempt Suicide
        if (ask.options === "Suicide") {
            console.log(chalk.bold.yellowBright(`Suicide is forbidden and you're very Stupid `));
            console.log(chalk.bold.redBright(`***** You Lost *****\n`));
            process.exit();
        }
    } while (true);
}
// Choosing Opponent (Ender Dragon)
if (myOpponent.monsters === "Ender Dragon") {
    console.log(`\n \t ${chalk.bold.italic.green(myPlayer.name)} " VS " ${chalk.bold.italic.red(myOpponent.monsters)} \n`);
    // Starting do-while loop
    do {
        // Choosing Options
        let ask = await inquirer.prompt([
            {
                name: "options",
                message: "You Have 3 Options You Select: ",
                type: "list",
                choices: ["Attack", "Use Potion", "Suicide"],
            },
        ]);
        // Setting the Play Ground
        if (ask.options === "Attack") {
            console.log(chalk.bold.yellowBright(`\nYou Can't Kill A ${o1.name} Because It's Too Strong And It's Stupid To Fight It And You're so Dumn:  ${p1.name}`));
            console.log(chalk.bold.red(`*** You're Dead ***`));
            process.exit();
        }
        // Drinking Potion
        if (ask.options === "Use Potion") {
            console.log(chalk.bold.yellowBright(`\nYou Cannot Do Anything About It Even Drinking Health Potions\n`));
        }
        // Attempt Suicide
        if (ask.options === "Suicide") {
            console.log(chalk.bold.yellowBright(`\nSuicide is Better Then Fighting ${o1.name} \n`));
            console.log(chalk.bold.redBright(`***** You Lost *****\n`));
            process.exit();
        }
    } while (true);
}
