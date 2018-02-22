'use strict';

let assert = require('assert');

let jobTypes = {
  pilot: 'MAV',
  mechanic: 'Repair Ship',
  commander: 'Main Ship',
  programmer: 'Any Ship!'
};

// Your code here
class Ship {
  constructor(name, type, ability){
    this.name = name;
    this.type = type;
    this.ability = ability;
    this.crew = [];
  }
  missionStatement() {
    if (this.crew) {
      return this.ability;
    } else {
      return "Can't perform a mission yet.";
    }
  }
}

class CrewMember {
  constructor(name, job, specialSkill) {
    this.name = name;
    this.job = job;
    this.specialSkill = specialSkill;
    this.ship = null;
  }
  enterShip(ship) {
     console.log(jobTypes[this.job])
     if (jobTypes[this.job]===ship.type){
       this.ship = ship;
       ship.crew.push(this);
       return `${this} has boarded ${ship.name}`;
     } else if (this.job === 'programmer') {
       this.ship = ship;
       ship.crew.push(this);
       return `${this} has boarded ${ship.name}`;
     } else {
       return `${this.name} is only authorized to board ${jobTypes[this.job]}.`;
     }
  }
}
let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
let crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
let crewMember3 = new CrewMember('Pvt. Hudson', 'mechanic', 'comic relief');
let crewMember4 = new CrewMember('Ray Arnold', 'programmer', 'biology');
let mav = new Ship('Mars Ascent Vehicle', 'MAV', "Ascend into low orbit");
let hermes = new Ship('Hermes', 'Main Ship', "Interplanetary Space Travel");
let sulaco = new Ship('Sulaco', 'Repair Ship', "I fix the ships!")
//tests
if (typeof describe === 'function'){
  describe('CrewMember', function(){
    it('should have a name, a job, a specialSkill and ship upon instantiation', function(){
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      assert.equal(crewMember1.name, 'Rick Martinez');
      assert.equal(crewMember1.job, 'pilot');
      assert.equal(crewMember1.specialSkill, 'chemistry');
      assert.equal(crewMember1.ship, null);
    });

    it('can enter a ship', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      crewMember1.enterShip(mav);
      assert.equal(crewMember1.ship, mav);
      assert.equal(mav.crew.length, 1);
      assert.equal(mav.crew[0], crewMember1);
    });
  });

  describe('Ship', function(){
    it('should have a name, a type, an ability and an empty crew upon instantiation', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      assert.equal(mav.name, 'Mars Ascent Vehicle');
      assert.equal(mav.type, 'MAV');
      assert.equal(mav.ability, 'Ascend into low orbit');
      assert.equal(mav.crew.length, 0);
    });

    it('can return a mission statement correctly', function(){
      let mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
      let crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
      let hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
      let crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
      assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
      assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");

      crewMember1.enterShip(mav);
      assert.equal(mav.missionStatement(), "Ascend into low orbit");

      crewMember2.enterShip(hermes);
      assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");
    });
  });
}
