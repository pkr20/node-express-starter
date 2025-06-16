let id = 0

function getId() {
  return ++id
}

let pets = [
  { id: getId(), age: 3, name: "Luna", type: "dog", adopted: false },
  { id: getId(), age: 2, name: "Milo", type: "cat", adopted: false },
  { id: getId(), age: 1, name: "Bubbles", type: "fish", adopted: false },
  { id: getId(), age: 5, name: "Coco", type: "parrot", adopted: false },
  { id: getId(), age: 15, name: "Bicho", type: "dog", adopted: true }
]

module.exports = {
  async find() {
    // SELECT * FROM "Pet"
    return pets
  },

  async findById(id) {
    // SELECT * FROM "Pet" WHERE id = 1
    return pets.find(p => p.id == id)
  },

  async create({ name, type, age }) {
    // INSERT INTO "Pet" (name, type, age) VALUES (...)
    const newPet = { id: getId(), name, type, age }
    pets.push(newPet)
    return newPet
  },

  async update(id, changes) {
    // UPDATE "Pet" SET ... WHERE id = 1
    const pet = pets.find(p => p.id == id)
    if (!pet) return null

    const updatedPet = { ...pet, ...changes }
    pets = pets.map(p => (p.id == id ? updatedPet : p))
    return updatedPet
  },

  async delete(id) {
    // DELETE FROM "Pet" WHERE id = 1
    const pet = pets.find(p => p.id == id)
    if (!pet) return null

    pets = pets.filter(p => p.id != id)
    return pet
  },
}
