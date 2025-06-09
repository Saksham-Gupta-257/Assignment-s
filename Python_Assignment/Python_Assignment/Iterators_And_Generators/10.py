from contextlib import contextmanager

@contextmanager
def managed_file(name):
    f = open(name)
    try:
        yield f
    finally:
        f.close()

