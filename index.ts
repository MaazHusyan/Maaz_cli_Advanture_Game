#! user/bin/env/node

import chalk from "chalk";
import inquirer from "inquirer";

// Assigning Class to Player
class Player {
  name: string;
  health: number = 100;
  potions: number = 3;
  constructor(name: string) {
    this.name = name;
  }
  deductHealth() {
    this.health -= 25;
  }
  increaseHealth() {
    if (this.potions > 0) {
      this.health = 100;
      this.potions--; // Reduce the number of potions
      console.log(
        chalk.bold.yellowBright(`\nYour Health is Now ${this.health}\n `)
      );

      if (this.potions == 5) {
        console.log(chalk.bold.yellowBright(`You Have ${p1.potions} Left\n`));
      }
      if (this.potions == 4) {
        console.log(chalk.bold.yellowBright(`You Have ${p1.potions} Left\n`));
      }
      if (this.potions == 3) {
        console.log(chalk.bold.yellowBright(`You Have ${p1.potions} Left\n`));
      }
      if (this.potions == 2) {
        console.log(chalk.bold.yellowBright(`You Have ${p1.potions} Left\n`));
      }
      if (this.potions == 1) {
        console.log(chalk.bold.yellowBright(`You Have ${p1.potions} Left\n`));
      }
      if (this.potions == 0) {
        console.log(
          chalk.bold.yellowBright(
            `You Used All Potions, Defeat Enemy to get More...\n`
          )
        );
      }
    } else {
      console.log(chalk.bold.red("\nNo health potions left! \n"));
    }
  }
}

// Assigning Class to Opponent
class Opponent {
  name: string;
  health: number = 100;
  constructor(name: string) {
    this.name = name;
  }
  deductHealth() {
    this.health -= 20;
  }
  increaseHealth(amount: number) {
    this.health += amount;
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
  console.log(
    `\n \t ${chalk.bold.italic.green(
      myPlayer.name
    )} " VS " ${chalk.bold.italic.red(myOpponent.monsters)} \n`
  );

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

      // Player Damage Setting
      if (num < 1) {
        p1.deductHealth();
        console.log(
          chalk.bold.redBright(`\n${p1.name} Health is ${p1.health}\n`)
        );
        console.log(
          chalk.bold.greenBright(`${o1.name} Health is ${o1.health}\n`)
        );

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
        console.log(
          chalk.bold.greenBright(`${p1.name} Health is ${p1.health}\n`)
        );
        console.log(
          chalk.bold.redBright(`${o1.name} Health is ${o1.health}\n`)
        );

        // Opponent Taking Damage
        if (o1.health <= 0) {
          console.log(chalk.green(`***** ${myOpponent.monsters} Died *****`));
          console.log(`\t${chalk.bgBlue.bold(`***** Boss Fight *****`)}`);

          // Boss Fight
          o1.name = `Boss ${myOpponent.monsters}`;
          o1.health = 100; // Reset health for the boss
          o1.increaseHealth(100); // Boss gains additional 100 HP
          p1.health = 100;
          p1.potions += 3;

          do {
            let bossFight = await inquirer.prompt({
              name: "action",
              message: "You Have 3 Options You Select: ",
              type: "list",
              choices: ["Attack", "Use Potion", "Suicide"],
            });

            if (bossFight.action === "Attack") {
              num = Math.floor(Math.random() * 3);

              if (num < 1) {
                p1.deductHealth();
                console.log(
                  chalk.bold.redBright(`\n${p1.name} Health is ${p1.health}\n`)
                );
                console.log(
                  chalk.bold.greenBright(`${o1.name} Health is ${o1.health}\n`)
                );

                if (p1.health <= 0) {
                  console.log(chalk.red(`***** ${p1.name} You Lost *****\n`));
                  process.exit();
                }
              }

              if (num == 1) {
                console.log(chalk.bold.yellowBright("\nThe Attack Was Lost\n"));
              }

              if (num > 1) {
                o1.deductHealth();
                console.log(
                  chalk.bold.greenBright(`${p1.name} Health is ${p1.health}\n`)
                );
                console.log(
                  chalk.bold.redBright(`${o1.name} Health is ${o1.health}\n`)
                );

                if (o1.health <= 0) {
                  console.log(chalk.green(`***** You Win *****`));
                  process.exit();
                }
              }
            }

            if (bossFight.action === "Use Potion") {
              p1.increaseHealth();
            }

            if (bossFight.action === "Suicide") {
              console.log(
                chalk.bold.yellowBright(
                  `Suicide is forbidden and you're very Stupid `
                )
              );
              console.log(chalk.bold.redBright(`***** You Lost *****\n`));
              process.exit();
            }
          } while (true);
        }
      }
    }

    // Using Potion
    if (ask.options === "Use Potion") {
      p1.increaseHealth();
    }

    // Attempt Suicide
    if (ask.options === "Suicide") {
      console.log(
        chalk.bold.yellowBright(`Suicide is forbidden and you're very Stupid `)
      );
      console.log(chalk.bold.redBright(`***** You Lost *****\n`));
      process.exit();
    }
  } while (true);
}
// Choosing Opponent (Zombie)
if (myOpponent.monsters === "Zombie") {
  console.log(
    `\n \t ${chalk.bold.italic.green(
      myPlayer.name
    )} " VS " ${chalk.bold.italic.red(myOpponent.monsters)} \n`
  );

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

      // Player Damage Setting
      if (num < 1) {
        p1.deductHealth();
        console.log(
          chalk.bold.redBright(`\n${p1.name} Health is ${p1.health}\n`)
        );
        console.log(
          chalk.bold.greenBright(`${o1.name} Health is ${o1.health}\n`)
        );

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
        console.log(
          chalk.bold.greenBright(`${p1.name} Health is ${p1.health}\n`)
        );
        console.log(
          chalk.bold.redBright(`${o1.name} Health is ${o1.health}\n`)
        );

        // Opponent Taking Damage
        if (o1.health <= 0) {
          console.log(chalk.green(`***** ${myOpponent.monsters} Died *****`));
          console.log(`\t${chalk.bgBlue.bold(`***** Boss Fight *****`)}`);

          // Boss Fight
          o1.name = `Boss ${myOpponent.monsters}`;
          o1.health = 100; // Reset health for the boss
          o1.increaseHealth(100); // Boss gains additional 100 HP
          p1.health = 100;
          p1.potions += 3;

          do {
            let bossFight = await inquirer.prompt({
              name: "action",
              message: "You Have 3 Options You Select: ",
              type: "list",
              choices: ["Attack", "Use Potion", "Suicide"],
            });

            if (bossFight.action === "Attack") {
              num = Math.floor(Math.random() * 3);

              if (num < 1) {
                p1.deductHealth();
                console.log(
                  chalk.bold.redBright(`\n${p1.name} Health is ${p1.health}\n`)
                );
                console.log(
                  chalk.bold.greenBright(`${o1.name} Health is ${o1.health}\n`)
                );

                if (p1.health <= 0) {
                  console.log(chalk.red(`***** ${p1.name} You Lost *****\n`));
                  process.exit();
                }
              }

              if (num == 1) {
                console.log(chalk.bold.yellowBright("\nThe Attack Was Lost\n"));
              }

              if (num > 1) {
                o1.deductHealth();
                console.log(
                  chalk.bold.greenBright(`${p1.name} Health is ${p1.health}\n`)
                );
                console.log(
                  chalk.bold.redBright(`${o1.name} Health is ${o1.health}\n`)
                );

                if (o1.health <= 0) {
                  console.log(chalk.green(`***** You Win *****`));
                  process.exit();
                }
              }
            }

            if (bossFight.action === "Use Potion") {
              p1.increaseHealth();
            }

            if (bossFight.action === "Suicide") {
              console.log(
                chalk.bold.yellowBright(
                  `Suicide is forbidden and you're very Stupid `
                )
              );
              console.log(chalk.bold.redBright(`***** You Lost *****\n`));
              process.exit();
            }
          } while (true);
        }
      }
    }

    // Using Potion
    if (ask.options === "Use Potion") {
      p1.increaseHealth();
    }

    // Attempt Suicide
    if (ask.options === "Suicide") {
      console.log(
        chalk.bold.yellowBright(`Suicide is forbidden and you're very Stupid `)
      );
      console.log(chalk.bold.redBright(`***** You Lost *****\n`));
      process.exit();
    }
  } while (true);
}
// Choosing Opponent (Ender Dragon)
if (myOpponent.monsters === "Ender Dragon") {
  console.log(
    `\n \t ${chalk.bold.italic.green(
      myPlayer.name
    )} " VS " ${chalk.bold.italic.red(myOpponent.monsters)} \n`
  );
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
      console.log(
        chalk.bold.yellowBright(
          `\nYou Can't Kill A ${o1.name} Because It's Too Strong... `
        )
      );
      console.log(chalk.bold.red(`*** You're Dead ***`));
      process.exit();
    }
    // Drinking Potion
    if (ask.options === "Use Potion") {
      console.log(
        chalk.bold.yellowBright(
          `\nYou Cannot Do Anything About It Even Drinking Health Potions...\n`
        )
      );
    }
    // Attempt Suicide
    if (ask.options === "Suicide") {
      console.log(
        chalk.bold.yellowBright(
          `\nSuicide is Better Then Fighting ${o1.name} \n`
        )
      );
      console.log(chalk.bold.redBright(`***** You Lost *****\n`));
      process.exit();
    }
  } while (true);
}
