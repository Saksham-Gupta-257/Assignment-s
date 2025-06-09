import argparse

parser = argparse.ArgumentParser()

parser.add_argument("x", type=float)
parser.add_argument("y", type=float)
parser.add_argument("op", choices=["add", "sub", "mul", "div"])

args = parser.parse_args()

if args.op == "add":
    print(args.x + args.y)
elif args.op == "sub":
    print(args.x - args.y)
elif args.op == "mul":
    print(args.x * args.y)
elif args.op == "div":
    if args.y == 0:
        print("Error: Division by zero")
    else:
        print(args.x / args.y)
