import Address from "./address";

describe("Address unit test", () => {


  it("should throw error when Street is empty", () => {
    expect(() => {
      new Address("",1,"06600-000", "Jandira");
    }).toThrowError("Street is required");
  });

  it("should throw error when Number is empty", () => {
    expect(() => {
      new Address("Rua Um", 0,"06600-000", "Jandira");
    }).toThrowError("Number is required");
  });

  it("should throw error when Zip is empty", () => {
    expect(() => {
      new Address("Rua Um", 1,"", "Jandira");
    }).toThrowError("Zip is required");
  });

  it("should throw error when City is empty", () => {
    expect(() => {
      new Address("Rua Um", 1,"06600-000", "");
    }).toThrowError("City is required");
  });

  it("should return a String Address", () => {
    const address = new Address("Rua Um", 1,"06600-000", "Jandira");
    expect(address.toString()).toBe("Rua Um, 1, 06600-000 Jandira");

    expect(address.street).toBe("Rua Um");
    expect(address.number).toBe(1);
    expect(address.zip).toBe("06600-000");
    expect(address.city).toBe("Jandira");

  });

})