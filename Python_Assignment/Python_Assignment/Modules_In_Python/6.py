import argparse

def cli_calculator():
    parser = argparse.ArgumentParser()
    parser.add_argument("a", type=float)
    parser.add_argument("b", type=float)
    parser.add_argument("op", choices=["add", "sub", "mul", "div"])
    args = parser.parse_args()

    ops = {
        "add": args.a + args.b,
        "sub": args.a - args.b,
        "mul": args.a * args.b,
        "div": args.a / args.b if args.b != 0 else "Error"
    }

    print(ops[args.op])

#python 6.py 10 5 mul
