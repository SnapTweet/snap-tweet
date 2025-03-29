import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  createTweet,
  likeTweet,
  deleteTweet,
} from "../../src/controllers/tweetController";
import Tweet, { ITweet } from "../../src/models/Tweet";

//TweetParams
interface TweetParams {
  id: string;
}

jest.mock("../../src/models/Tweet");
jest.mock("jsonwebtoken"); // Mock JWT

interface MockRequest extends Partial<Request> {
  headers: { authorization?: string };
  user?: { id: string; username: string };
  body: { content?: string };
  params: { id: string };
}

interface MockResponse extends Partial<Response> {
  status: jest.Mock;
  json: jest.Mock;
}

describe("Tweet Controller - Create Tweet (Protected Route)", () => {
  let req: MockRequest;
  let res: MockResponse;
  let token: string;

  beforeEach(() => {
    token = jwt.sign(
      { id: "67d73e21c093524a8079c3de", username: "testuser" },
      "mock_secret"
    );

    req = {
      headers: { authorization: `Bearer ${token}` },
      user: { id: "67d73e21c093524a8079c3de", username: "testuser" },
      body: { content: "Hello world!" },
      params: { id: "67d757be43cf1e57be3d6b73" }, // Mock tweet ID
    };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    jwt.verify = jest.fn(
      (
        token: string,
        secretOrPublicKey: string,
        callback: (err: Error | null, decoded: JwtPayload | undefined) => void
      ) => {
        callback(null, {
          id: "67d73e21c093524a8079c3de",
          username: "testuser",
        });
      }
    ) as jest.Mock;
  });

  it("✅ should create a tweet successfully", async () => {
    const mockTweet: ITweet = {
      _id: req.params.id,
      content: req.body.content,
      user: { _id: req.user?.id ?? "", username: req.user?.username ?? "" },
      createdAt: new Date(),
      likes: [],
    } as unknown as ITweet;

    (Tweet.create as jest.Mock).mockResolvedValue(mockTweet);

    await createTweet(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ _id: expect.any(String) })
    );
  });

  it("❌ should return 401 if no token is provided", async () => {
    req.headers.authorization = undefined;
    req.user = undefined;

    await createTweet(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
  });

  it("❌ should return 400 if tweet content is empty", async () => {
    req.body.content = "";

    await createTweet(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Content is required" });
  });

  it("❌ should return 500 if database fails while creating a tweet", async () => {
    (Tweet.create as jest.Mock).mockRejectedValue(new Error("Database Error"));

    await createTweet(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  });

  it("❌ should return 404 if tweet does not exist when liking", async () => {
    (Tweet.findById as jest.Mock).mockResolvedValue(null);

    await likeTweet(req as Request<{ id: string }>, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Tweet not found" });
  });

  it("❌ should return 403 if user is not the owner when deleting", async () => {
    const mockTweet = { _id: req.params!.id, user: "DIFFERENT_USER_ID" };
    (Tweet.findById as jest.Mock).mockResolvedValue(mockTweet);

    await deleteTweet(req as unknown as Request<TweetParams>, res as Response);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "Not authorized to delete this tweet",
    });
  });

  it("❌ should return 404 when trying to delete a non-existent tweet", async () => {
    (Tweet.findById as jest.Mock).mockResolvedValue(null);

    await deleteTweet(req as unknown as Request<TweetParams>, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Tweet not found" });
  });

  it("❌ should return 500 if database error occurs during tweet deletion", async () => {
    (Tweet.findById as jest.Mock).mockResolvedValue({
      _id: req.params!.id,
      user: req.user!.id,
    });
    (Tweet.prototype.deleteOne as jest.Mock).mockRejectedValue(
      new Error("DB error")
    );

    await deleteTweet(req as unknown as Request<TweetParams>, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Internal server error",
    });
  });

  it("✅ should unlike a tweet if already liked", async () => {
    const mockTweet = {
      _id: req.params!.id,
      likes: [req.user!.id],
      save: jest.fn().mockResolvedValue(true),
    };

    (Tweet.findById as jest.Mock).mockResolvedValue(mockTweet);

    await likeTweet(req as unknown as Request<TweetParams>, res as Response);

    expect(mockTweet.likes).toHaveLength(0); // User should be removed from likes
    expect(res.json).toHaveBeenCalledWith(mockTweet);
  });
});
