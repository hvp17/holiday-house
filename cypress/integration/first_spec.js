describe("My First Test", function() {
  it("Visits the Main Page", function() {
    cy.visit("http://localhost:8888/index.php");
  });
});

describe("Log in", function() {
  it("Perform invalid login", function() {
    cy.visit("http://localhost:8888/login.php");
    cy.get("[name='txtEmail']").type("user@gmail.com");
    cy.get("[name='txtPassword']").type("1233456789");
    cy.get("#btnLogin").click();
    cy.get("#msgError").contains("Failed to login.");
  });

  it("Perform sucessfull login", function() {
    cy.visit("http://localhost:8888/login.php");
    cy.get("[name='txtEmail']").type("user@gmail.com");
    cy.get("[name='txtPassword']").type("123456789");
    cy.get("#btnLogin").click();
    cy.url().should("eq", "http://localhost:8888/index.php");
  });
});

describe("Listing a house", function() {
  //   it("Perform sucessfull login", function() {});

  it.only("Visits the Listing Page", function() {
    cy.visit("http://localhost:8888/login.php");
    cy.get("[name='txtEmail']").type("user@gmail.com");
    cy.get("[name='txtPassword']").type("123456789");
    cy.get("#btnLogin").click();
    cy.url().should("eq", "http://localhost:8888/index.php");
    cy.visit("http://localhost:8888/list-house.php");

    cy.get("#frmListHouse-p-0").scrollIntoView();
    cy.get("[name='txtTitle']").type("Nice house");
    cy.get("[name='txtPrice']").type("4593");
    cy.get("[name='txtDescription']").type("bla bla bla");
    cy.get(".btnNext")
      .eq(1)
      .click();

    cy.get("[name='txtAddress']").type("Nice house");
    cy.get("[name='txtHouseType']").select("Villa");
    cy.get("[name='txtRooms']").select("5 Rooms");
    cy.get(".btnNext")
      .eq(1)
      .click();

    cy.get("[name='txtFamily']").check();
    cy.get("[name='txtFamily']").uncheck();
    cy.get("[name='txtSmoker']").check();

    cy.get(".btnNext")
      .eq(1)
      .click();

    cy.get("[name='txtStartDate']").type("2019-05-01");
    cy.get("[name='txtEndDate']").type("2019-06-01");

    cy.get(".btnNext")
      .eq(1)
      .click();

    cy.upload_file("../fixtures/puppy.jpeg", "image/jpeg", "[name='image[]']");

    cy.get("a.btnNext")
      .eq(2)
      .click();
    cy.url().should("eq", "http://localhost:8888/properties.php");
  });
});
