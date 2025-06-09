import logging

logging.basicConfig(filename='error.log', level=logging.ERROR)

try:
    1 / 0
except Exception as e:
    logging.error("Exception occurred", exc_info=True)
