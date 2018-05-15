const { generateMessage, generateLocationMessage } = require("./message");
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

describe("generateLocationMessage", () => {
  it("should generate the correct location object", () => {
    var from = "admin";
    var latitude = 50;
    var longitude = 60;

    var location = generateLocationMessage(from, latitude, longitude);

    expect(location.from).toBe("admin");
    expect(location.url)
      .toBeA("string")
      .toBe("https://www.google.com/maps?q=50,60");
    expect(location.createdAt)
      .toExist()
      .toBeA("number");
  });
});
