const chai = require("chai");
const chaiHttp = require("chai-http");
const {
  BADREQUEST,
  OK,
  NOTACCEPTED,
  NOTFOUND,
} = require("../../api/constants");
const server = require("../../app");
const afterDelay = require("../util");

chai.use(chaiHttp);

const { expect } = chai;

const baseUrl = "/metric";

describe("Test POST /metric/:id ", () => {
  it("should return status code of 400 for invalid data", async () => {
    const response = await chai
      .request(server)
      .post(`${baseUrl}/visitor_count`)
      .send({});

    expect(response.status).to.be.equal(BADREQUEST);
  });

  it("should return status code of 400 for invalid value", async () => {
    const response = await chai
      .request(server)
      .post(`${baseUrl}/visitor_count`)
      .send({ value: "invalid" });

    expect(response.status).to.be.equal(BADREQUEST);
  });

  it("should return not accepted status code for not found route", async () => {
    const response = await chai
      .request(server)
      .post(`${baseUrl}/visitor_count/not_found`);

    expect(response.status).to.be.equal(NOTACCEPTED);
  });

  it("should post correctly and get sum", async () => {
    await chai
      .request(server)
      .post(`${baseUrl}/visitor_count`)
      .send({ value: 34 });

    await chai
      .request(server)
      .post(`${baseUrl}/visitor_count`)
      .send({ value: 24 });

    let response = await chai
      .request(server)
      .post(`${baseUrl}/another_metric`)
      .send({ value: 24 });

    expect(response.status).to.equal(OK);
    expect(response.body).to.be.empty;

    response = await chai.request(server).get(`${baseUrl}/visitor_count/sum`);

    expect(response.status).to.equal(OK);
    expect(response.body.value).to.equal(58);

    const anotherResponse = await chai
      .request(server)
      .get(`${baseUrl}/another_metric/sum`);

    expect(anotherResponse.status).to.equal(OK);
    expect(anotherResponse.body.value).to.equal(24);
  });

  it("should return 404 after metric has expired", async () => {
    return await afterDelay(async () => {
      response = await chai.request(server).get(`${baseUrl}/visitor_count/sum`);

      expect(response.status).to.equal(NOTFOUND);
    }, 1);
  });
});
