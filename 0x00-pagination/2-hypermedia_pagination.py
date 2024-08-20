import csv
import math
from typing import List, Tuple, Dict


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """ takes two integer arguments and return a tuple"""
    a, b = (page - 1) * page_size, (page - 1) * page_size + page_size
    return (a, b)


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
        """ return the appropriate page of the dataset """
        assert type(page) == int and type(page_size) == int
        assert page > 0 and page_size > 0
        a, b = index_range(page, page_size)
        res = self.dataset()
        size = len(res)
        if a > size:
            return []
        return res[a:b]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """ returns a dictionary """
        a, b = index_range(page, page_size)
        pages = math.ceil(len(self.__dataset) / page_size)
        return {
            'page_size': len(self.get_page(page, page_size)),
            'page': page,
            'data': self.get_page(page, page_size),
            'next_page': page + 1 if b < len(self.__dataset) else None,
            'prev_page': page - 1 if a > 0 else None,
            'total_pages': pages
        }
