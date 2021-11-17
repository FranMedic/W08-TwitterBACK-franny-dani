const Tuit = require("../../database/models/tuit");
const { getTuits, getTuitById } = require("./tuiterControllers");

jest.mock("../../database/models/tuit");

describe("Given a getTuits function", () => {
  describe("When it receives an object res", () => {
    test("then it should invoke the method json ", async () => {
      const fakeTuits = [
        {
          text: "oleolehh lo caracoleehh",
          likes: 7,
          date: "2021-11-17T18:40:55.096Z",
          id: "61954cb7c24554beef209bc0",
        },
        {
          text: "Estamos probando un poquito como va esto",
          likes: 60000003,
          date: "2021-11-17T18:47:14.694Z",
          id: "61954e67604295c02c6b3095",
        },
      ];
      Tuit.find = jest.fn().mockResolvedValue(fakeTuits);
      const res = {
        json: jest.fn(),
      };

      await getTuits(null, res);

      expect(Tuit.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(fakeTuits);
    });
  });
});

describe("Given a getTuitById function", () => {
  describe("When it recieves a req with and id 10, a res object and a next function", () => {
    test("Then it should invoke Tuit.findById with a 10", async () => {
      Tuit.findById = jest.fn().mockResolvedValue({});
      const idTuit = 10;
      const req = {
        params: {
          idTuit,
        },
      };
      const res = {
        json: () => {},
      };
      const next = () => {};

      await getTuitById(req, res, next);

      expect(Tuit.findById).toHaveBeenCalledWith(idTuit);
    });
  });

  describe("And Tuit.findById rejects", () => {
    test("Then it should invoke next function with the error rejected", async () => {
      const error = {};
      Tuit.findById = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          idTuit: 0,
        },
      };
      const res = {};
      const next = jest.fn();

      await getTuitById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });

  describe("and Tuit.findById resolves to fakeTuit", () => {
    test("Then it should invoke res.json with the object fakeTuit", async () => {
      const idTuit = 10;
      const fakeTuit = {
        text: "oleolehh lo caracoleehh",
        likes: 7,
        date: "2021-11-17T18:40:55.096Z",
        id: "61954cb7c24554beef209bc0",
      };

      Tuit.findById = jest.fn().mockResolvedValue(fakeTuit);
      const req = {
        params: {
          idTuit,
        },
      };
      const res = {
        json: jest.fn(),
      };

      await getTuitById(req, res);

      expect(res.json).toHaveBeenCalledWith(fakeTuit);
    });
  });
});
