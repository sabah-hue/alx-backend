#!/usr/bin/env python3
import csv
import math
from typing import List, Tuple
""" modele"""


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """ takes two integer arguments and return a tuple"""
    a, b = (page - 1) * page_size, (page - 1) * page_size + page_size
    return (a, b)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        """ init """
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """ return the appropriate page of the dataset """
        assert type(page) == int and type(page_size) == int
        assert page > 0 and page_size > 0
        a, b = index_range(page, page_size)
        res = self.dataset()
        size = len(res)
        if a > size:
            return []
        return res[a:b]
