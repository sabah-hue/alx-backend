#!/usr/bin/python3
""" BaseCaching class
"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """  inherits from BaseCaching and is a caching system """

    MAX_ITEMS = 0

    def __init__(self):
        """initialize"""
        super().__init__()

    def put(self, key, item):
        """ Must assign to the dictionary self.cache_data
        the item value for the key key """
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """Must return the value in self.cache_data linked to key"""
        # return self.cache_data.get(key, None)
        if key in self.cache_data:
            return self.cache_data[key]
        else:
            return None
