// JSON example
const person = {
    name: "Ed",
    age: 19,
    alive: true
}

const personStr = JSON.stringify(person)


localStorage["fake@email.com"] = personStr;

const personObj = JSON.parse(personStr)

console.log(personStr)
console.log(personObj.age)