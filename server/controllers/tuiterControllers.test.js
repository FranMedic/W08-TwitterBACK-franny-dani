const Tuit = require("../../database/models/tuit");
const {
  getTuits,
  getTuitById,
  deleteTuit,
  createTuit,
} = require("./tuiterControllers");

jest.mock("../../database/models/tuit");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

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
      const id = 10;
      const req = {
        params: {
          id,
        },
      };
      const res = {
        json: () => {},
      };
      const next = () => {};

      await getTuitById(req, res, next);

      expect(Tuit.findById).toHaveBeenCalledWith(id);
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
      const id = 10;
      const fakeTuit = {
        text: "oleolehh lo caracoleehh",
        likes: 7,
        date: "2021-11-17T18:40:55.096Z",
        id: "61954cb7c24554beef209bc0",
      };

      Tuit.findById = jest.fn().mockResolvedValue(fakeTuit);
      const req = {
        params: {
          id,
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

describe("Given a deleteTuit function", () => {
  describe("When it receives a req with an id 10, a res object and a next function", () => {
    test("Then it should invoke Tuit.findByIdandDelete with the id 10", async () => {
      const id = 10;
      Tuit.findByIdAndDelete = jest.fn().mockResolvedValue({});
      const req = {
        params: {
          id,
        },
      };
      const res = {
        json: jest.fn(),
      };
      const next = () => {};

      await deleteTuit(req, res, next);

      expect(Tuit.findByIdAndDelete).toHaveBeenCalledWith(id);
    });
  });
  describe("And Tuit.findByIdAndDelete rejects", () => {
    test("Then it should invoke next function with the error rejected", async () => {
      const error = {};
      Tuit.findByIdAndDelete = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          id: 0,
        },
      };
      const res = {};
      const next = jest.fn();

      await deleteTuit(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });
  describe("and Tuit.findByIdAndDelete resolves and id undefined", () => {
    test("then it should invoke next function with the error created", async () => {
      const error = new Error("Tuit not found  (╯°□°）╯︵ ┻━┻");
      error.code = 404;
      Tuit.findByIdAndDelete = jest.fn();
      const req = {
        params: {
          id: 0,
        },
      };
      const res = {};
      const next = jest.fn();

      await deleteTuit(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
    });
  });
});

describe("Given a createTuit function", () => {
  describe("When it receives a req object with a body, a res objetc and with and a next function", () => {
    test("Then it should invoke the method json of res with the Robot.Create", async () => {
      const tuit = {
        text: "oleolehh lo caracoleehh",
        likes: 7,
        date: "2021-11-17T18:40:55.096Z",
        id: "61954cb7c24554beef209bc0",
      };

      const req = {
        body: tuit,
      };

      Tuit.create = jest.fn().mockResolvedValue(tuit);
      const res = mockResponse();
      const next = () => {};

      await createTuit(req, res, next);

      expect(Tuit.create).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(tuit);
    });
  });
  describe("And createTuit rejects", () => {
    test("Then it should invoke next function with the error rejected", async () => {
      const error = {};
      Tuit.create = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          id: 0,
        },
      };
      const res = {};
      const next = jest.fn();

      await createTuit(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });
});
