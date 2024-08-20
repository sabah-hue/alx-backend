#!/usr/bin/env python3
"""
return a tuple of size two containing a start index and
an end index corresponding to the range of indexes to
return in a list for those particular pagination parameters.
"""
from typing import tuple


def index_range(page: int, page_size: int) -> tuple(int, int):
    """ takes two integer arguments and return a tuple"""
    a, b = (page - 1) * page_size, (page - 1) * page_size + page_size
    return a, b
