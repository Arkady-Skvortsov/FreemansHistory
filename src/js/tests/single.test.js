let FrChoice = require("../singlePlayer")

describe("Frimans Choice:", () => {
	test("variable should be defined and type of boolean", () => {
		expect(FrChoice).toBeDefined()
		expect(FrChoice).toBeInstanceOf(Boolean)
	})

	test("variable not return null", () => {
		expect(FrChoice).not.toBeNull()
	})
})