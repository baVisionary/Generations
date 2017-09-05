class Person {
  constructor(generation, vertical) {
    this.generation = generation;
    this.vertical = vertical;
    this.nameGen = 0;
    this.eyes = possibleEyeColors[randomInt(0, possibleEyeColors.length - 1)];
    this.hair = possibleHairColors[randomInt(0, possibleHairColors.length - 1)];
  }

  report() {
    return `${this.name}${nameGenerations[this.nameGen]}: ${this.hair} hair ${this.eyes} eyes ${this.vertical.toFixed(1)}" vertical`;
  }

}

class Man extends Person {
  constructor(generation, vertical) {
    super(generation, vertical);
    this.gender = "male";
    this.name = manNames[randomInt(0, manNames.length - 1)];
  }
}

class Woman extends Person {
  constructor(generation, vertical) {
    super(generation, vertical);
    this.gender = "female"
    this.name = womanNames[randomInt(0, womanNames.length - 1)];
  }
}

var womanNames = [
  "Jane",
  "Lisa",
  "June",
  "Leslie",
  "Elizabeth",
  "Francine",
  "Alexis"
]

var manNames = [
  "Bob",
  "Frank",
  "Rick",
  "Henry",
  "Jonathan",
  "Edward",
  "Roderick"
]

var possibleEyeColors = [
  "Green",
  "Blue",
  "Black",
  "Brown",
  "Cerulean",
  "Hazel"
]

var possibleHairColors = [
  "Black",
  "Brown",
  "Blond",
  "Red"
]

var generations = [
  "Grandparents",
  "Parents",
  "Children",
  "Grandchildren",
  "Great grandchildren"
]

var nameGenerations = [
  "",
  " Jr.",
  ", III",
  ", IV",
  ", V"
]

// simple random function
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Parents {
  constructor(mom, dad) {
    this.mom = mom;
    this.dad = dad;
  }

  offspring(numberKids) {
    let kids = [];

    for (var k = 0; k < numberKids; k++) {
      var child = (randomInt(0,1) == 0) ? new Man(this.mom.generation + 1, 0) : new Woman(this.mom.generation + 1, 0);

      ["hair", "eyes"].forEach(phenotype => {
        let inheritParent = [this.mom, this.dad][randomInt(0, 1)];
        child[phenotype] = inheritParent[phenotype];
      })

      child.vertical = (this.mom.vertical + this.dad.vertical) / 2 * (1.15 - 0.30 * Math.random());
      if (child.name == this.dad.name) {
        child.nameGen = this.dad.nameGen + 1;
      }

      kids.push(child);
    }

    return kids;
  }

}

function breedXGens(progenitors, gens) {
  genX = progenitors;
  let jumpiest = progenitors.mom;
  
  for (var g = 0; g < gens; g++) {
    var summary = `${generations[genX.mom.generation]}: \n${genX.mom.report()} \n${genX.dad.report()} \nOffspring:`
    let children = genX.offspring(3);
    children.forEach((child, cIndex) => {
      summary += `\n${cIndex+1} - ${child.report()}`;
      if (child.vertical > jumpiest.vertical) {
        jumpiest = child;
      }
    })

    let newPre = document.createElement("pre");
    newPre.innerHTML = summary;
    document.getElementById("generations").appendChild(newPre);
    console.log(summary);


    if (g < gens - 1) {
      let newParent = prompt(`${summary}\nFollow which child?`) - 1;
      // let otherParentVert = parseFloat(prompt(`${children[newParent].report()} \nEnter other parents vertical?`));
      if (children[newParent].gender == "male") {
        otherParent = new Woman(children[newParent].generation, children[newParent].vertical);
        genX = new Parents(otherParent, children[newParent]);
      } else {
        otherParent = new Man(children[newParent].generation, children[newParent].vertical)
        genX = new Parents(children[newParent], otherParent);
      }
    }
  }
  let jumpiestText = `Jumpiest member is ${jumpiest.name} of the ${generations[genX.mom.generation]} generation with ${jumpiest.vertical.toFixed(1)}" vertical`;
  
  let newPre = document.createElement("pre");
  newPre.innerHTML = jumpiestText;
  document.getElementById("generations").appendChild(newPre);
  console.log(jumpiestText);
}

var grandParents = new Parents(new Woman(0, 22), new Man(0, 22));

breedXGens(grandParents, 5);
