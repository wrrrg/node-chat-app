const { generateMessage } = require("./message");
const expect = require("expect");

describe("generateMessage", () => {
  it("should generate the correct message object", () => {
    var from = "admin";
    var text = "test text";
    var test = generateMessage(from, text);

    expect(test.from).toBe("admin");
    expect(test.text).toBe("test text");
    expect(test.createdAt).toBeA("number");
  });
});
