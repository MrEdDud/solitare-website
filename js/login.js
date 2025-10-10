// JSON example
const person = {
    name: "Ed",
    age: 19,
    alive: true
}

const personStr = JSON.stringify(person)
const personObj = JSON.parse(personStr)

console.log(personStr)
console.log(personObj.age)