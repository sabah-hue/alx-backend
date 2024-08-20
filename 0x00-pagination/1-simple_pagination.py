import csv
import math
from typing import List


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
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
        pass

    def index_range(page, page_size):
        """ takes two integer arguments and return a tuple"""
        a, b = (page - 1) * page_size, (page - 1) * page_size + page_size
        return a, b

    def get_page(page=1: int, page_size=10: int) -> list:
        """ return the appropriate page of the dataset """
        assert page > 0 and page_size > 0
        a, b = index_range(page, page_size)
        res = self.dataset()
        size = len(res)
        if a > size:
            return []
        return res[a:b]
